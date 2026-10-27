import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(_req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, configured: false, evaluations: [] });
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("evaluations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, evaluations: data || [] });
  } catch (err: unknown) {
    console.error("Evaluations GET error:", err);
    return NextResponse.json({ error: "Failed to fetch evaluations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      applicationId,
      evaluatorName,
      innovation,
      feasibility,
      impact,
      scalability,
      viability,
      justifications,
      comments,
      evidenceReferences,
    } = body;

    // 1. Validate application ID
    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    // 2. Validate 5-Pillar scores (0-20 each)
    const scores = [innovation, feasibility, impact, scalability, viability];
    for (const s of scores) {
      if (typeof s !== "number" || s < 0 || s > 20) {
        return NextResponse.json(
          { error: "Each of the 5 evaluation pillars must be a valid number between 0 and 20." },
          { status: 400 }
        );
      }
    }

    const total = innovation + feasibility + impact + scalability + viability;

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        configured: false,
        message: "Evaluation verified and recorded in session state.",
        scorecard: {
          applicationId,
          evaluatorName: evaluatorName || "Technical Evaluation Board",
          innovation,
          feasibility,
          impact,
          scalability,
          viability,
          total,
          justifications: justifications || {},
          comments: comments || "",
          evidenceReferences: evidenceReferences || "",
          evaluatedAt: new Date().toISOString(),
        },
      });
    }

    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    let evaluatorId: string | null = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        evaluatorId = user.id;
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        if (profile && !["evaluator", "admin"].includes(profile.role)) {
          return NextResponse.json({ error: "Unauthorized: Only certified Evaluators or Administrators can submit evaluation scorecards." }, { status: 403 });
        }
      }
    }

    if (!evaluatorId) {
      return NextResponse.json({ error: "Authentication required to submit evaluation." }, { status: 401 });
    }

    const { data: evalRecord, error } = await supabase
      .from("evaluations")
      .upsert(
        {
          application_id: applicationId,
          evaluator_id: evaluatorId,
          evaluator_name: evaluatorName || "Certified Technical Evaluator",
          innovation_score: innovation,
          feasibility_score: feasibility,
          impact_score: impact,
          scalability_score: scalability,
          viability_score: viability,
          total_score: total,
          justifications: justifications || {},
          comments: comments || "",
          evidence_references: evidenceReferences || "",
          status: "submitted",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "application_id, evaluator_id" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update application status to Evaluated
    await supabase.from("applications").update({ status: "Evaluated" }).eq("id", applicationId);

    // Audit log
    await supabase.from("audit_logs").insert({
      actor_user_id: evaluatorId,
      actor_name: evaluatorName || "Technical Evaluator",
      actor_role: "evaluator",
      action: "EVALUATION_SUBMITTED",
      details: `Awarded 5-pillar score of ${total}/100 to application ${applicationId}.`,
      badge: "Evaluation",
      entity_type: "evaluation",
      entity_id: evalRecord.id,
    });

    return NextResponse.json({ success: true, evaluation: evalRecord });
  } catch (err: unknown) {
    console.error("Evaluation POST error:", err);
    return NextResponse.json({ error: "Failed to submit evaluation" }, { status: 500 });
  }
}

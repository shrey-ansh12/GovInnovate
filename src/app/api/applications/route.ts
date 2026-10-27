import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, configured: false, applications: [] });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, applications: data || [] });
  } catch (err: unknown) {
    console.error("Applications GET error:", err);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      challengeId,
      startupName,
      solutionOverview,
      proposedCost,
      deploymentTime,
      proposalSummary,
      trlLevel,
      localContentPercentage,
      patentsCount,
      evidenceLinks,
    } = body;

    // 1. Validation
    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID is required." }, { status: 400 });
    }
    if (!startupName || !solutionOverview) {
      return NextResponse.json({ error: "Startup name and solution overview are required." }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;

    if (!isSupabaseConfigured()) {
      const generatedId = `APP-WQ-10${Math.floor(10 + Math.random() * 90)}`;
      return NextResponse.json({
        success: true,
        configured: false,
        message: "Application validated and registered in local sandbox session.",
        application: {
          id: generatedId,
          challengeId,
          startupName,
          solutionOverview,
          proposedCost: proposedCost || "₹28,50,000",
          deploymentTime: deploymentTime || "14 Calendar Days",
          proposalSummary: proposalSummary || solutionOverview,
          trlLevel: trlLevel || 7,
          localContentPercentage: localContentPercentage || 65,
          patentsCount: patentsCount || 1,
          evidenceLinks: evidenceLinks || [],
          status: "Submitted",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
          appliedDate: new Date().toISOString().slice(0, 10),
        },
      });
    }

    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    let startupUserId: string | null = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        startupUserId = user.id;
      }
    }

    if (!startupUserId) {
      return NextResponse.json({ error: "Authentication required to submit proposal." }, { status: 401 });
    }

    // Check duplicate application
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("challenge_id", challengeId)
      .eq("startup_user_id", startupUserId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Duplicate application: Your startup has already submitted an active bid for this challenge." },
        { status: 409 }
      );
    }

    const generatedId = `APP-WQ-10${Math.floor(10 + Math.random() * 90)}`;

    const { data: newApp, error } = await supabase
      .from("applications")
      .insert({
        id: generatedId,
        challenge_id: challengeId,
        startup_user_id: startupUserId,
        startup_name: startupName,
        proposal_summary: proposalSummary || solutionOverview,
        proposed_solution: solutionOverview,
        proposed_cost: proposedCost || "₹28,50,000",
        deployment_time: deploymentTime || "14 Calendar Days",
        trl_level: trlLevel || 7,
        local_content_percentage: localContentPercentage || 65.0,
        patents_count: patentsCount || 1,
        evidence_links: evidenceLinks || [],
        status: "Submitted",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Application submission DB error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Audit log
    await supabase.from("audit_logs").insert({
      actor_user_id: startupUserId,
      actor_name: startupName,
      actor_role: "startup",
      action: "APPLICATION_SUBMITTED",
      details: `Application ${generatedId} submitted for challenge ${challengeId}.`,
      badge: "Procurement",
      entity_type: "application",
      entity_id: generatedId,
    });

    return NextResponse.json({ success: true, application: newApp });
  } catch (err: unknown) {
    console.error("Application POST error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

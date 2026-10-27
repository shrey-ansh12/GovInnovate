import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        configured: false,
        challenges: [],
      });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    const { data, error } = await supabase
      .from("government_challenges")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching challenges:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      configured: true,
      challenges: data || [],
    });
  } catch (err: unknown) {
    console.error("Challenges GET error:", err);
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      department,
      ministry,
      category,
      budget,
      pilotDuration,
      problemStatement,
      summary,
      expectedOutcomes,
      technicalThresholds,
      targetLocations,
      scaleLocations,
      status,
    } = body;

    // 1. Server-side Field Validation
    if (!title || title.trim().length < 5) {
      return NextResponse.json({ error: "Challenge title is required and must be at least 5 characters." }, { status: 400 });
    }
    if (!department || !ministry) {
      return NextResponse.json({ error: "Department and Ministry are mandatory fields." }, { status: 400 });
    }
    if (!problemStatement || problemStatement.trim().length < 20) {
      return NextResponse.json({ error: "A detailed problem statement (minimum 20 characters) is required." }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;

    // 2. Database persistence
    if (!isSupabaseConfigured()) {
      const generatedId = `CH-${new Date().getFullYear()}-0${Math.floor(Math.random() * 90 + 10)}`;
      return NextResponse.json({
        success: true,
        configured: false,
        message: "Challenge validated successfully. Saved to local sandbox state (Supabase not configured).",
        challenge: {
          id: generatedId,
          title,
          department,
          ministry,
          category: category || "Civic Tech",
          budget: budget || "₹25,00,000",
          pilotDuration: pilotDuration || "90 Days",
          problemStatement,
          summary: summary || title,
          expectedOutcomes: expectedOutcomes || [],
          technicalThresholds: technicalThresholds || [],
          targetLocations: targetLocations || 5,
          scaleLocations: scaleLocations || 50,
          status: status || "Open",
          applicationsCount: 0,
          matchedCount: 0,
        },
      });
    }

    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    // Verify user role if token exists
    let creatorId: string | null = null;
    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        creatorId = user.id;
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        if (profile && !["government", "admin"].includes(profile.role)) {
          return NextResponse.json({ error: "Unauthorized: Only verified Government officials or Administrators can create challenges." }, { status: 403 });
        }
      }
    }

    const challengeId = `CH-${new Date().getFullYear()}-0${Math.floor(Math.random() * 90 + 10)}`;

    const { data: createdChallenge, error } = await supabase
      .from("government_challenges")
      .insert({
        id: challengeId,
        title,
        problem_statement: problemStatement,
        department_name: department,
        ministry,
        category: category || "Civic Tech",
        budget: budget || "₹25,00,000",
        pilot_duration: pilotDuration || "90 Days",
        summary: summary || title,
        expected_outcomes: expectedOutcomes || [],
        technical_thresholds: technicalThresholds || [],
        target_locations: targetLocations || 5,
        scale_locations: scaleLocations || 50,
        status: status || "published",
        created_by: creatorId,
      })
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Insert Audit Trail
    await supabase.from("audit_logs").insert({
      actor_user_id: creatorId,
      actor_name: department,
      actor_role: "government",
      action: "CHALLENGE_CREATED",
      details: `Procurement Challenge "${title}" published under GFR 2017 sandbox rules.`,
      badge: "Procurement",
      entity_type: "challenge",
      entity_id: challengeId,
    });

    return NextResponse.json({
      success: true,
      configured: true,
      challenge: createdChallenge,
    });
  } catch (err: unknown) {
    console.error("Challenge creation error:", err);
    return NextResponse.json({ error: "Internal server error creating challenge." }, { status: 500 });
  }
}

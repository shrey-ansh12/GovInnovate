import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role, fullName, organizationName, designation, identifier, sector, city } = body;

    // 1. Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }
    if (!fullName || !organizationName) {
      return NextResponse.json({ error: "Full name and organization name are mandatory." }, { status: 400 });
    }

    // 2. Strict Role Policy enforcement
    if (role === "admin") {
      return NextResponse.json({ error: "Administrator roles cannot be self-assigned." }, { status: 403 });
    }

    const assignedRole = ["startup", "government", "evaluator"].includes(role) ? role : "startup";
    // Startups can self-register; Govt & Evaluators start as pending_verification
    const verificationStatus = assignedRole === "startup" ? "verified" : "pending_verification";

    // 3. Database operation
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        mockMode: true,
        message: "Supabase credentials are not configured in environment variables. Running in safe sandbox mode.",
        user: {
          id: `USR-${Date.now().toString().slice(-6)}`,
          email,
          role: assignedRole,
          name: fullName,
          organization: organizationName,
          designation: designation || (assignedRole === "startup" ? "Founder" : "Official"),
          identifier: identifier || (assignedRole === "startup" ? "DPIIT-PENDING" : "GOV-PENDING"),
          verificationStatus,
        },
      });
    }

    const supabase = getSupabaseServerClient();

    // Create auth user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: assignedRole,
          organization_name: organizationName,
        },
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || "Failed to create user account." }, { status: 400 });
    }

    const userId = authData.user.id;

    // Create Profile record
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      email,
      organization_name: organizationName,
      role: assignedRole,
      designation: designation || (assignedRole === "startup" ? "Founder" : "Officer"),
      identifier: identifier || "",
      verification_status: verificationStatus,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
    }

    // If Startup, create startup_profiles record
    if (assignedRole === "startup") {
      await supabase.from("startup_profiles").insert({
        user_id: userId,
        startup_name: organizationName,
        dpiit_number: identifier || `DPIIT-${Math.floor(10000 + Math.random() * 90000)}`,
        founder_name: fullName,
        description: `${sector || "Civic Tech"} startup focusing on municipal innovation.`,
        industry: sector || "CleanTech & Water",
        location: city || "New Delhi, India",
        trl_level: 7,
        local_content_percentage: 65.0,
        patents_count: 1,
        verification_status: "verified",
      });
    }

    // Insert Audit Log
    await supabase.from("audit_logs").insert({
      actor_user_id: userId,
      actor_name: fullName,
      actor_role: assignedRole,
      action: "USER_REGISTERED",
      details: `User ${fullName} registered with role ${assignedRole} (${verificationStatus}).`,
      badge: "Security",
      entity_type: "user",
      entity_id: userId,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        role: assignedRole,
        name: fullName,
        organization: organizationName,
        designation,
        identifier,
        verificationStatus,
      },
    });
  } catch (err: unknown) {
    console.error("Registration route error:", err);
    return NextResponse.json({ error: "Internal server error during registration." }, { status: 500 });
  }
}

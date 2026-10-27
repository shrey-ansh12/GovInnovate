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

    let authUser: { id: string; email?: string } | null = null;
    let authErrorMsg: string | null = null;

    // If service role key is available, use admin.createUser to auto-confirm email
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
            role: assignedRole,
            organization_name: organizationName,
          },
        });
        if (!adminError && adminData.user) {
          authUser = adminData.user;
        } else if (adminError) {
          authErrorMsg = adminError.message;
        }
      } catch (adminErr) {
        console.warn("Admin createUser fallback to standard signUp:", adminErr);
      }
    }

    // Standard signUp if admin createUser was not applicable or didn't run
    if (!authUser) {
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
        let friendly = authError?.message || authErrorMsg || "Failed to create user account.";
        if (friendly.includes("Database error saving new user")) {
          friendly = "Supabase Auth trigger conflict: Run DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users; in Supabase SQL Editor.";
        }
        return NextResponse.json({ error: friendly, raw: authError?.message }, { status: 400 });
      }

      authUser = authData.user;
    }

    const userId = authUser.id;

    // Create or Upsert Profile record
    const { error: profileError } = await supabase.from("profiles").upsert({
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

    // If Startup, create or upsert startup_profiles record
    if (assignedRole === "startup") {
      try {
        await supabase.from("startup_profiles").upsert({
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
      } catch (stErr) {
        console.warn("Startup profile upsert error:", stErr);
      }
    }

    // Insert Audit Log (best-effort)
    try {
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
    } catch (auditErr) {
      console.warn("Audit log insert skipped:", auditErr);
    }

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

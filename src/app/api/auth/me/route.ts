import { NextRequest, NextResponse } from "next/server";
import { getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ authenticated: false, message: "Database not configured" });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;

    if (!token) {
      return NextResponse.json({ authenticated: false, error: "No authentication token provided" }, { status: 401 });
    }

    const supabase = getSupabaseUserClient(token);
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ authenticated: false, error: "Invalid session token" }, { status: 401 });
    }

    // Fetch verified profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role || "startup",
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          organization: user.user_metadata?.organization_name || "Organization",
          verificationStatus: "pending_verification",
        },
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.full_name,
        organization: profile.organization_name,
        designation: profile.designation,
        identifier: profile.identifier,
        verificationStatus: profile.verification_status,
      },
    });
  } catch (err: unknown) {
    console.error("Auth check error:", err);
    return NextResponse.json({ authenticated: false, error: "Failed to verify session" }, { status: 500 });
  }
}

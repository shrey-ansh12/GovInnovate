import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ configured: false, id });
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("government_challenges")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, challenge: data });
  } catch (err: unknown) {
    console.error("Single challenge GET error:", err);
    return NextResponse.json({ error: "Failed to fetch challenge" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const allowedStatuses = ["draft", "published", "Reviewing", "Shortlisted", "closed", "archived"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid challenge status." }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, configured: false, id, status });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    const { data, error } = await supabase
      .from("government_challenges")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, challenge: data });
  } catch (err: unknown) {
    console.error("Challenge update error:", err);
    return NextResponse.json({ error: "Failed to update challenge" }, { status: 500 });
  }
}

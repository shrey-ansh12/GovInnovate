import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const allowed = ["Submitted", "Eligibility Verified", "Shortlisted", "Evaluated", "Rejected"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, configured: false, id, status });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
    const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

    const { data, error } = await supabase
      .from("applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Insert Audit Trail
    await supabase.from("audit_logs").insert({
      action: "APPLICATION_STATUS_UPDATED",
      details: `Application ${id} status moved to "${status}".`,
      badge: "Procurement",
      actor_name: "Government Authority",
      actor_role: "government",
      entity_type: "application",
      entity_id: id,
    });

    return NextResponse.json({ success: true, application: data });
  } catch (err: unknown) {
    console.error("Application PATCH error:", err);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

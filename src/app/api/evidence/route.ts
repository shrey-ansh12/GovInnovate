import { NextRequest, NextResponse } from "next/server";
import { listEvidenceRecords } from "@/lib/evidenceStore";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pilotId = searchParams.get("pilotId") || undefined;
    const milestoneId = searchParams.get("milestoneId") || undefined;

    const records = await listEvidenceRecords({ pilotId, milestoneId });

    return NextResponse.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (err: any) {
    console.error("Evidence listing error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to list evidence records" },
      { status: 500 }
    );
  }
}

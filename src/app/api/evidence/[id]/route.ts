import { NextRequest, NextResponse } from "next/server";
import { getEvidenceRecord } from "@/lib/evidenceStore";
import { getEvidenceFromBlockchain } from "@/lib/blockchain/evidenceRegistryService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Evidence ID required" }, { status: 400 });
    }

    const record = await getEvidenceRecord(id);
    if (!record) {
      return NextResponse.json({ success: false, error: "Evidence not found" }, { status: 404 });
    }

    const onChain = await getEvidenceFromBlockchain(id);

    return NextResponse.json({
      success: true,
      evidenceRecord: record,
      blockchainRecord: onChain,
    });
  } catch (err: any) {
    console.error("Evidence get error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to retrieve evidence record" },
      { status: 500 }
    );
  }
}

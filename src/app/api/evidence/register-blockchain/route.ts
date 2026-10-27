import { NextRequest, NextResponse } from "next/server";
import { getEvidenceRecord, saveEvidenceRecord } from "@/lib/evidenceStore";
import { registerEvidenceOnBlockchain } from "@/lib/blockchain/evidenceRegistryService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { evidenceId } = body;

    if (!evidenceId) {
      return NextResponse.json(
        { success: false, error: "Evidence ID is required for registration" },
        { status: 400 }
      );
    }

    const record = await getEvidenceRecord(evidenceId);
    if (!record) {
      return NextResponse.json(
        { success: false, error: `Evidence ID ${evidenceId} not found in database` },
        { status: 404 }
      );
    }

    const onChainResult = await registerEvidenceOnBlockchain(
      record.id,
      record.pilotId,
      record.fileHash
    );

    if (!onChainResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: onChainResult.error || "Blockchain registration failed",
          isSimulated: onChainResult.isSimulated,
        },
        { status: 400 }
      );
    }

    // Update database record
    record.blockchainStatus = "Registered On Blockchain";
    record.blockchainTxHash = onChainResult.txHash;
    record.blockchainBlockNumber = onChainResult.blockNumber;
    record.blockchainTimestamp = onChainResult.timestamp;
    record.blockchainSigner = onChainResult.signer;
    record.isSimulatedBlockchain = onChainResult.isSimulated;

    await saveEvidenceRecord(record);

    return NextResponse.json({
      success: true,
      message: `Evidence ${evidenceId} successfully committed to blockchain ledger.`,
      blockchainStatus: record.blockchainStatus,
      txHash: record.blockchainTxHash,
      timestamp: record.blockchainTimestamp,
      signer: record.blockchainSigner,
      isSimulated: record.isSimulatedBlockchain,
    });
  } catch (err: any) {
    console.error("Manual blockchain registration error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to commit record to blockchain" },
      { status: 500 }
    );
  }
}

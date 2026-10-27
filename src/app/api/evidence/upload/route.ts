import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getEvidenceRecord, saveEvidenceRecord } from "@/lib/evidenceStore";
import { registerEvidenceOnBlockchain } from "@/lib/blockchain/evidenceRegistryService";
import { EvidenceRecord, EvidenceVersion } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const requestedEvidenceId = (formData.get("evidenceId") as string)?.trim();
    const pilotId = (formData.get("pilotId") as string)?.trim() || "PILOT-WQ-2026-01";
    const milestoneId = (formData.get("milestoneId") as string)?.trim() || undefined;
    const category = (formData.get("category") as string)?.trim() || "Milestone Deliverable";
    const uploadedBy = (formData.get("uploadedBy") as string)?.trim() || "Authorized Submitter";
    const uploadedByRole = ((formData.get("uploadedByRole") as string)?.trim() || "startup") as any;
    const autoRegisterBlockchain = formData.get("autoRegisterBlockchain") !== "false";

    // 1. Validation
    if (!file) {
      return NextResponse.json(
        { success: false, error: "Missing document file in upload payload" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: "Uploaded file is empty (0 bytes)" },
        { status: 400 }
      );
    }

    // 2. Read bytes and compute SHA-256 strictly on server
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const computedHash = crypto.createHash("sha256").update(buffer).digest("hex").toLowerCase();

    // 3. Check for existing record to support versioning
    const evidenceId = requestedEvidenceId || `EVID-${Date.now().toString().slice(-6)}`;
    const existing = await getEvidenceRecord(evidenceId);

    const nowIso = new Date().toISOString().replace("T", " ").slice(0, 19);

    let recordToSave: EvidenceRecord;

    if (existing) {
      // If the file hash is unchanged, no need to bump version
      if (existing.fileHash.toLowerCase() === computedHash) {
        return NextResponse.json({
          success: true,
          message: "Document already registered with identical SHA-256 hash.",
          evidenceRecord: existing,
          unchanged: true,
        });
      }

      // Preserve previous version in versionHistory
      const previousVersionEntry: EvidenceVersion = {
        version: existing.version,
        fileHash: existing.fileHash,
        originalFilename: existing.originalFilename,
        fileSizeBytes: existing.fileSizeBytes,
        uploadedAt: existing.uploadedAt,
        uploadedBy: existing.uploadedBy,
        blockchainTxHash: existing.blockchainTxHash,
        blockchainBlockNumber: existing.blockchainBlockNumber,
        blockchainTimestamp: existing.blockchainTimestamp,
      };

      const updatedHistory = [...(existing.versionHistory || []), previousVersionEntry];
      const newVersion = existing.version + 1;

      recordToSave = {
        ...existing,
        originalFilename: file.name,
        fileSizeBytes: file.size,
        fileHash: computedHash,
        version: newVersion,
        uploadedAt: nowIso,
        uploadedBy,
        uploadedByRole,
        blockchainStatus: "Pending Registration",
        blockchainTxHash: undefined,
        blockchainBlockNumber: undefined,
        blockchainTimestamp: undefined,
        versionHistory: updatedHistory,
      };
    } else {
      // Brand new evidence record (Version 1)
      recordToSave = {
        id: evidenceId,
        pilotId,
        milestoneId,
        category,
        originalFilename: file.name,
        fileSizeBytes: file.size,
        fileHash: computedHash,
        version: 1,
        uploadedAt: nowIso,
        uploadedBy,
        uploadedByRole,
        blockchainStatus: "Pending Registration",
        versionHistory: [
          {
            version: 1,
            fileHash: computedHash,
            originalFilename: file.name,
            fileSizeBytes: file.size,
            uploadedAt: nowIso,
            uploadedBy,
          },
        ],
      };
    }

    // 4. Optionally register on blockchain
    if (autoRegisterBlockchain) {
      try {
        const onChainResult = await registerEvidenceOnBlockchain(
          recordToSave.id,
          recordToSave.pilotId,
          recordToSave.fileHash
        );

        if (onChainResult.success) {
          recordToSave.blockchainStatus = "Registered On Blockchain";
          recordToSave.blockchainTxHash = onChainResult.txHash;
          recordToSave.blockchainBlockNumber = onChainResult.blockNumber;
          recordToSave.blockchainTimestamp = onChainResult.timestamp;
          recordToSave.blockchainSigner = onChainResult.signer;
          recordToSave.isSimulatedBlockchain = onChainResult.isSimulated;

          // Update latest history entry with txHash
          const lastIndex = recordToSave.versionHistory.length - 1;
          if (lastIndex >= 0) {
            recordToSave.versionHistory[lastIndex].blockchainTxHash = onChainResult.txHash;
            recordToSave.versionHistory[lastIndex].blockchainBlockNumber = onChainResult.blockNumber;
            recordToSave.versionHistory[lastIndex].blockchainTimestamp = onChainResult.timestamp;
          }
        } else {
          recordToSave.blockchainStatus = "Blockchain Unavailable";
          recordToSave.notes = onChainResult.error;
        }
      } catch (bcErr: any) {
        console.warn("Blockchain registration encountered error:", bcErr.message);
        recordToSave.blockchainStatus = "Blockchain Unavailable";
      }
    }

    // 5. Persist to storage
    const saved = await saveEvidenceRecord(recordToSave);

    return NextResponse.json({
      success: true,
      message: `Evidence successfully hashed (SHA-256: ${computedHash.slice(0, 16)}...) and registered.`,
      evidenceRecord: saved,
      legalDisclaimer:
        "CRITICAL SAFE HARBOR: A matching SHA-256 hash confirms cryptographic byte integrity only. It does NOT prove legal validity, commercial genuineness, or statutory procurement qualification.",
    });
  } catch (error: any) {
    console.error("Evidence upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process evidence upload" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getEvidenceRecord } from "@/lib/evidenceStore";
import { getEvidenceFromBlockchain } from "@/lib/blockchain/evidenceRegistryService";
import { EvidenceVerificationResponse, VerificationResultStatus } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fileBuffer: Buffer | null = null;
    let evidenceId = "";
    let suppliedFileHash = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      evidenceId = (formData.get("evidenceId") as string)?.trim() || "";

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      }
    } else {
      const json = await req.json().catch(() => ({}));
      evidenceId = json.evidenceId?.trim() || "";
      suppliedFileHash = json.fileHash?.trim()?.toLowerCase() || "";
    }

    if (!evidenceId) {
      return NextResponse.json(
        {
          status: "RECORD_NOT_FOUND" as VerificationResultStatus,
          message: "Evidence ID is mandatory for verification.",
          computedHash: "",
          isDatabaseMatch: false,
          isBlockchainMatch: false,
          failureReason: "Evidence ID was not supplied in request.",
          legalNotice:
            "A matching SHA-256 hash confirms cryptographic byte integrity only. It does not certify legal validity or eligibility.",
          verificationTimestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 1. Calculate current file hash strictly on server
    let computedHash = "";
    if (fileBuffer) {
      computedHash = crypto.createHash("sha256").update(fileBuffer).digest("hex").toLowerCase();
    } else if (suppliedFileHash) {
      computedHash = suppliedFileHash;
    } else {
      return NextResponse.json(
        {
          status: "RECORD_NOT_FOUND" as VerificationResultStatus,
          message: "No document file was provided to recalculate the SHA-256 hash.",
          computedHash: "",
          isDatabaseMatch: false,
          isBlockchainMatch: false,
          failureReason: "Missing file payload to verify.",
          legalNotice:
            "A matching SHA-256 hash confirms cryptographic byte integrity only. It does not certify legal validity or eligibility.",
          verificationTimestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 2. Retrieve database record
    const dbRecord = await getEvidenceRecord(evidenceId);

    if (!dbRecord) {
      const response: EvidenceVerificationResponse = {
        status: "RECORD_NOT_FOUND",
        message: `No verification record found in database for Evidence ID: ${evidenceId}`,
        computedHash,
        isDatabaseMatch: false,
        isBlockchainMatch: false,
        failureReason: `No database record exists for evidence identifier '${evidenceId}'.`,
        verificationTimestamp: new Date().toISOString(),
        legalNotice:
          "IMPORTANT SAFE HARBOR: Verification requires an authentic baseline record. Never rely on unindexed documents.",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const databaseHash = dbRecord.fileHash.toLowerCase();
    const isDatabaseMatch = computedHash === databaseHash;

    // 3. Query on-chain record
    const blockchainRecord = await getEvidenceFromBlockchain(evidenceId);
    const blockchainHash = blockchainRecord.documentHash?.toLowerCase();
    const isBlockchainMatch = blockchainRecord.found && Boolean(blockchainHash && computedHash === blockchainHash);

    // 4. Formulate verification status
    let status: VerificationResultStatus;
    let message: string;
    let failureReason: string | undefined;

    if (isDatabaseMatch && (!blockchainRecord.found || isBlockchainMatch)) {
      status = "INTEGRITY_VERIFIED";
      message = `Document byte-stream integrity verified against recorded SHA-256 hash (${computedHash.slice(0, 16)}...).`;
    } else {
      status = "INTEGRITY_MISMATCH";
      if (!isDatabaseMatch) {
        failureReason = `Computed hash (${computedHash.slice(0, 16)}...) differs from recorded database hash (${databaseHash.slice(0, 16)}...). File has been modified or corrupted.`;
      } else if (blockchainRecord.found && !isBlockchainMatch) {
        failureReason = `Computed hash matches database but differs from blockchain immutable record (${blockchainHash?.slice(0, 16)}...). Database tampering or unsynchronized version detected.`;
      }
      message = failureReason || "Integrity verification failed.";
    }

    const response: EvidenceVerificationResponse = {
      status,
      message,
      computedHash,
      databaseHash,
      blockchainHash,
      isDatabaseMatch,
      isBlockchainMatch,
      evidenceRecord: dbRecord,
      verificationTimestamp: new Date().toISOString(),
      blockchainDetails: {
        isRegistered: blockchainRecord.found,
        network: blockchainRecord.isSimulated ? "GovInnovate Sandbox (Simulated Hardhat)" : "EVM Blockchain",
        contractAddress: process.env.BLOCKCHAIN_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        txHash: dbRecord.blockchainTxHash,
        timestamp: blockchainRecord.timestamp || dbRecord.blockchainTimestamp,
        signer: blockchainRecord.submittedBy || dbRecord.blockchainSigner,
        isSimulated: blockchainRecord.isSimulated,
      },
      failureReason,
      legalNotice:
        "CRITICAL NOTICE: A matching SHA-256 hash proves only that the current file matches the recorded bytes. It does NOT prove that the original document is legally valid, authentic, or factually correct, and must NEVER be used as the sole basis for determining startup eligibility or awarding a government contract.",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    console.error("Evidence verify API error:", err);
    return NextResponse.json(
      {
        status: "RECORD_NOT_FOUND" as VerificationResultStatus,
        message: err.message || "Failed to execute integrity verification",
        computedHash: "",
        isDatabaseMatch: false,
        isBlockchainMatch: false,
        failureReason: err.message,
        verificationTimestamp: new Date().toISOString(),
        legalNotice:
          "A matching SHA-256 hash confirms cryptographic byte integrity only. It does not certify legal validity or eligibility.",
      },
      { status: 500 }
    );
  }
}

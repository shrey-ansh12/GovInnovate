import { EvidenceRecord, EvidenceVersion } from "@/types";
import { getSupabaseServerClient, isSupabaseConfigured } from "./supabaseServer";

// Seeded evidence records for demonstration
const initialDemoRecords: EvidenceRecord[] = [
  {
    id: "EVID-WQ-2026-001",
    pilotId: "PILOT-WQ-2026-01",
    milestoneId: "M-01",
    category: "Technical Audit & Lab Benchmarking",
    originalFilename: "WaterTestingLab_Benchmarking_Audit.pdf",
    fileSizeBytes: 1468006,
    fileHash: "e8b2a1c49f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192",
    version: 1,
    uploadedAt: "2026-10-06 11:30:00",
    uploadedBy: "AquaSense Technologies Pvt Ltd",
    uploadedByRole: "startup",
    blockchainStatus: "Registered On Blockchain",
    blockchainTxHash: "0x8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
    blockchainBlockNumber: 1048201,
    blockchainTimestamp: 1791279000,
    blockchainSigner: "0x892410aBcDeF1234567890abcdef123456789012",
    isSimulatedBlockchain: true,
    versionHistory: [
      {
        version: 1,
        fileHash: "e8b2a1c49f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192",
        originalFilename: "WaterTestingLab_Benchmarking_Audit.pdf",
        fileSizeBytes: 1468006,
        uploadedAt: "2026-10-06 11:30:00",
        uploadedBy: "AquaSense Technologies Pvt Ltd",
        blockchainTxHash: "0x8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
        blockchainBlockNumber: 1048201,
        blockchainTimestamp: 1791279000,
      },
    ],
    notes: "Baseline spectrophotometric sensor calibration verified against State Water Lab standard solutions.",
  },
  {
    id: "EVID-WQ-2026-002",
    pilotId: "PILOT-WQ-2026-01",
    milestoneId: "M-02",
    category: "Milestone Deliverable",
    originalFilename: "Site10_SensorTelemetry_TelemetryAudit.pdf",
    fileSizeBytes: 2936012,
    fileHash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
    version: 1,
    uploadedAt: "2026-10-20 14:15:00",
    uploadedBy: "AquaSense Technologies Pvt Ltd",
    uploadedByRole: "startup",
    blockchainStatus: "Registered On Blockchain",
    blockchainTxHash: "0x4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
    blockchainBlockNumber: 1048202,
    blockchainTimestamp: 1792496100,
    blockchainSigner: "0x892410aBcDeF1234567890abcdef123456789012",
    isSimulatedBlockchain: true,
    versionHistory: [
      {
        version: 1,
        fileHash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
        originalFilename: "Site10_SensorTelemetry_TelemetryAudit.pdf",
        fileSizeBytes: 2936012,
        uploadedAt: "2026-10-20 14:15:00",
        uploadedBy: "AquaSense Technologies Pvt Ltd",
        blockchainTxHash: "0x4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
        blockchainBlockNumber: 1048202,
        blockchainTimestamp: 1792496100,
      },
    ],
    notes: "Continuous IoT telemetry logs for 10 municipal distribution pumping stations across 14 consecutive calendar days.",
  },
];

// In-Memory map for demo/sandbox mode
const inMemoryEvidenceStore = new Map<string, EvidenceRecord>();
initialDemoRecords.forEach(r => inMemoryEvidenceStore.set(r.id, r));

export async function getEvidenceRecord(evidenceId: string): Promise<EvidenceRecord | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("evidence_records")
        .select("*, evidence_versions(*)")
        .eq("id", evidenceId)
        .maybeSingle();

      if (error) {
        console.error("Supabase getEvidenceRecord error:", error);
      } else if (data) {
        return {
          id: data.id,
          pilotId: data.pilot_id,
          milestoneId: data.milestone_id,
          category: data.category,
          originalFilename: data.original_filename,
          fileSizeBytes: Number(data.file_size_bytes),
          fileHash: data.file_hash,
          version: data.version,
          uploadedAt: data.uploaded_at,
          uploadedBy: data.uploaded_by || "Authorized Submitter",
          uploadedByRole: data.uploaded_by_role || "startup",
          blockchainStatus: data.blockchain_status,
          blockchainTxHash: data.blockchain_tx_hash,
          blockchainBlockNumber: data.blockchain_block_number ? Number(data.blockchain_block_number) : undefined,
          blockchainTimestamp: data.blockchain_timestamp ? new Date(data.blockchain_timestamp).getTime() / 1000 : undefined,
          blockchainSigner: data.blockchain_signer,
          isSimulatedBlockchain: Boolean(data.is_simulated_blockchain),
          notes: data.notes,
          versionHistory: (data.evidence_versions || []).map((v: any) => ({
            version: v.version,
            fileHash: v.file_hash,
            originalFilename: v.original_filename,
            fileSizeBytes: Number(v.file_size_bytes),
            uploadedAt: v.uploaded_at,
            uploadedBy: v.uploaded_by || "Authorized Submitter",
            blockchainTxHash: v.blockchain_tx_hash,
            blockchainBlockNumber: v.blockchain_block_number ? Number(v.blockchain_block_number) : undefined,
            blockchainTimestamp: v.blockchain_timestamp ? new Date(v.blockchain_timestamp).getTime() / 1000 : undefined,
          })),
        };
      }
    } catch (err) {
      console.warn("Falling back to in-memory evidence store:", err);
    }
  }

  return inMemoryEvidenceStore.get(evidenceId) || null;
}

export async function listEvidenceRecords(filter?: { pilotId?: string; milestoneId?: string }): Promise<EvidenceRecord[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      let query = supabase.from("evidence_records").select("*, evidence_versions(*)");
      if (filter?.pilotId) {
        query = query.eq("pilot_id", filter.pilotId);
      }
      if (filter?.milestoneId) {
        query = query.eq("milestone_id", filter.milestoneId);
      }
      const { data, error } = await query.order("uploaded_at", { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          pilotId: d.pilot_id,
          milestoneId: d.milestone_id,
          category: d.category,
          originalFilename: d.original_filename,
          fileSizeBytes: Number(d.file_size_bytes),
          fileHash: d.file_hash,
          version: d.version,
          uploadedAt: d.uploaded_at,
          uploadedBy: d.uploaded_by || "Authorized Submitter",
          uploadedByRole: d.uploaded_by_role || "startup",
          blockchainStatus: d.blockchain_status,
          blockchainTxHash: d.blockchain_tx_hash,
          blockchainBlockNumber: d.blockchain_block_number ? Number(d.blockchain_block_number) : undefined,
          blockchainTimestamp: d.blockchain_timestamp ? new Date(d.blockchain_timestamp).getTime() / 1000 : undefined,
          blockchainSigner: d.blockchain_signer,
          isSimulatedBlockchain: Boolean(d.is_simulated_blockchain),
          notes: d.notes,
          versionHistory: (d.evidence_versions || []).map((v: any) => ({
            version: v.version,
            fileHash: v.file_hash,
            originalFilename: v.original_filename,
            fileSizeBytes: Number(v.file_size_bytes),
            uploadedAt: v.uploaded_at,
            uploadedBy: v.uploaded_by || "Authorized Submitter",
            blockchainTxHash: v.blockchain_tx_hash,
            blockchainBlockNumber: v.blockchain_block_number ? Number(v.blockchain_block_number) : undefined,
            blockchainTimestamp: v.blockchain_timestamp ? new Date(v.blockchain_timestamp).getTime() / 1000 : undefined,
          })),
        }));
      }
    } catch (err) {
      console.warn("Error listing from supabase, using in-memory:", err);
    }
  }

  let results = Array.from(inMemoryEvidenceStore.values());
  if (filter?.pilotId) {
    results = results.filter(r => r.pilotId === filter.pilotId);
  }
  if (filter?.milestoneId) {
    results = results.filter(r => r.milestoneId === filter.milestoneId);
  }
  return results.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export async function saveEvidenceRecord(record: EvidenceRecord): Promise<EvidenceRecord> {
  // Always update in-memory cache for fast local retrieval
  inMemoryEvidenceStore.set(record.id, record);

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("evidence_records").upsert({
        id: record.id,
        pilot_id: record.pilotId,
        milestone_id: record.milestoneId,
        category: record.category,
        original_filename: record.originalFilename,
        file_size_bytes: record.fileSizeBytes,
        file_hash: record.fileHash,
        version: record.version,
        uploaded_at: record.uploadedAt,
        uploaded_by_role: record.uploadedByRole,
        blockchain_status: record.blockchainStatus,
        blockchain_tx_hash: record.blockchainTxHash,
        blockchain_block_number: record.blockchainBlockNumber,
        blockchain_timestamp: record.blockchainTimestamp ? new Date(record.blockchainTimestamp * 1000).toISOString() : null,
        blockchain_signer: record.blockchainSigner,
        is_simulated_blockchain: record.isSimulatedBlockchain,
        notes: record.notes,
      });

      // Insert version record
      await supabase.from("evidence_versions").upsert({
        evidence_id: record.id,
        version: record.version,
        file_hash: record.fileHash,
        original_filename: record.originalFilename,
        file_size_bytes: record.fileSizeBytes,
        uploaded_at: record.uploadedAt,
        blockchain_tx_hash: record.blockchainTxHash,
        blockchain_block_number: record.blockchainBlockNumber,
        blockchain_timestamp: record.blockchainTimestamp ? new Date(record.blockchainTimestamp * 1000).toISOString() : null,
      });
    } catch (err) {
      console.warn("Failed to persist to Supabase:", err);
    }
  }

  return record;
}

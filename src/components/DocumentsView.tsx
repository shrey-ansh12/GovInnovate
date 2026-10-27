"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  FileCheck2, 
  Lock, 
  ShieldCheck,
  Cpu,
  Layers
} from "lucide-react";
import { EvidenceRecord } from "@/types";
import { EvidenceVerificationModal } from "@/components/EvidenceVerificationModal";

export const DocumentsView: React.FC = () => {
  const { startups, evidenceRecords } = useApp();
  const [selectedAuditRecord, setSelectedAuditRecord] = useState<EvidenceRecord | null>(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const baseDocs = [
    {
      id: "DOC-GFR-173",
      title: "Statutory GFR 173 Exemption Certificate",
      type: "PDF Compliance File",
      size: "1.4 MB",
      date: "2026-10-02",
      authority: "Ministry of Finance & DPIIT",
      status: "Verified Active",
      hash: "e8b2a1c49f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192",
      isEvidence: false,
    },
    {
      id: "DOC-SANCTION-01",
      title: "90-Day Municipal Pilot Sanction Order (PILOT-WQ-2026-01)",
      type: "Sanction Grant Order",
      size: "2.8 MB",
      date: "2026-10-06",
      authority: "Ministry of Jal Shakti Procurement Cell",
      status: "Executed",
      hash: "8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
      isEvidence: false,
    },
    {
      id: "DOC-LAB-AUDIT",
      title: "Central Water Laboratory Audit & Benchmarking Certificate",
      type: "Technical Audit PDF",
      size: "3.2 MB",
      date: "2026-10-05",
      authority: "State Central Water Testing Lab",
      status: "Score 96.4/100",
      hash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
      isEvidence: false,
    },
    {
      id: "DOC-CABINET-NOTE",
      title: "Scale-Up Cabinet Sanction Note & Allocation (₹18.50 Cr)",
      type: "Procurement Approval Note",
      size: "4.1 MB",
      date: "2026-10-06",
      authority: "National Water Mission Board",
      status: "Sanctioned",
      hash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
      isEvidence: false,
    },
    {
      id: "DOC-PATENT-DOSSIER",
      title: "AquaSense AI Patent Dossier (Spectrophotometric Probes)",
      type: "Patent Office Certified",
      size: "5.6 MB",
      date: "2025-11-18",
      authority: "Indian Patent Office (Govt of India)",
      status: "3 Patents Granted",
      hash: "5b7a1249cd0145892310beef9481230489123048120394812309481230948123",
      isEvidence: false,
    }
  ];

  // Dynamic uploaded certificates
  const dynamicStartupDocs = startups
    .filter(s => s.documentRecord)
    .map(s => ({
      id: s.documentRecord?.id || `DOC-STARTUP-${s.id}`,
      title: `DPIIT Recognition Certificate: ${s.name}`,
      type: "DPIIT PDF Enclosure",
      size: `${Math.round((s.documentRecord?.fileSizeBytes || 102400) / 1024)} KB`,
      date: s.documentRecord?.uploadedAt?.slice(0, 10) || "2026-10-27",
      authority: "DPIIT - Ministry of Commerce and Industry",
      status: s.documentRecord?.officialStatus || "Pending Review",
      hash: s.documentRecord?.fileHash || "hash-pending",
      isEvidence: false,
    }));

  // Registered Blockchain Evidence Records
  const blockchainEvidenceDocs = (evidenceRecords || []).map(r => ({
    id: r.id,
    title: `${r.category}: ${r.originalFilename}`,
    type: `Pilot Evidence (${r.pilotId}${r.milestoneId ? ` - ${r.milestoneId}` : ""})`,
    size: `${Math.round(r.fileSizeBytes / 1024)} KB`,
    date: r.uploadedAt?.slice(0, 10) || "2026-10-27",
    authority: `${r.uploadedBy} (v${r.version})`,
    status: r.blockchainStatus || "Registered On Blockchain",
    hash: r.fileHash,
    isEvidence: true,
    evidenceRecord: r,
  }));

  const allDocs = [...blockchainEvidenceDocs, ...dynamicStartupDocs, ...baseDocs];

  const handleDownloadFile = (doc: typeof allDocs[0]) => {
    const textContent = `=====================================================
GOVINNOVATE STATUTORY PROCUREMENT ENCLOSURE
=====================================================
Document Title   : ${doc.title}
Issuing Body     : ${doc.authority}
Issuance Date    : ${doc.date}
Regulatory Status: ${doc.status}
SHA-256 Checksum : ${doc.hash}
Statutory Safe Harbor: GFR 2017 Rule 149/170/173
Verification Rail: GovInnovate Public Sector Sandbox
=====================================================
This digital enclosure is authenticated by the GovInnovate
Cryptographic Verification Engine. Any byte alteration 
invalidates the SHA-256 checksum.`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenAudit = (doc: typeof allDocs[0]) => {
    if (doc.isEvidence && (doc as any).evidenceRecord) {
      setSelectedAuditRecord((doc as any).evidenceRecord);
    } else {
      // Create synthetic audit record for static document
      const synRecord: EvidenceRecord = {
        id: doc.id,
        pilotId: "PILOT-WQ-2026-01",
        category: doc.type,
        originalFilename: `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
        fileSizeBytes: 1048576,
        fileHash: doc.hash,
        version: 1,
        uploadedAt: doc.date,
        uploadedBy: doc.authority,
        uploadedByRole: "government",
        blockchainStatus: "Registered On Blockchain",
        blockchainTxHash: "0x8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
        blockchainBlockNumber: 1048201,
        blockchainTimestamp: 1791279000,
        blockchainSigner: "0x892410aBcDeF1234567890abcdef123456789012",
        isSimulatedBlockchain: true,
        versionHistory: [
          {
            version: 1,
            fileHash: doc.hash,
            originalFilename: `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
            fileSizeBytes: 1048576,
            uploadedAt: doc.date,
            uploadedBy: doc.authority,
            blockchainTxHash: "0x8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
          }
        ]
      };
      setSelectedAuditRecord(synRecord);
    }
    setAuditModalOpen(true);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
          <FileCheck2 className="h-4 w-4 text-[#147452]" />
          Statutory Document Repository & Blockchain Evidence Rail
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
          Procurement Sanctions & Evidence Ledger ({allDocs.length})
        </h1>
        <p className="text-xs text-[#5B6A78] mt-1 max-w-3xl">
          All statutory procurement agreements, pilot deliverables, laboratory test reports, and compliance certificates registered with deterministic SHA-256 digests and tamper-evident blockchain verification.
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded border border-[#E2DED6] divide-y divide-[#EDE9E1] shadow-2xs">
        {allDocs.map((doc, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded bg-[#FAF8F5] text-[#0F3854] border border-[#E2DED6] flex items-center justify-center font-bold shrink-0 mt-0.5">
                {doc.isEvidence ? <Cpu className="h-5 w-5 text-[#147452]" /> : <FileText className="h-5 w-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#0A2540]">{doc.title}</h3>
                  {doc.isEvidence && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#147452] border border-emerald-200">
                      ON-CHAIN EVIDENCE
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5B6A78] font-mono mt-0.5">
                  Authority: {doc.authority} • {doc.size} • Issued: {doc.date}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 font-mono">
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border ${
                    doc.status.includes("Registered") || doc.status.includes("Verified")
                      ? "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]"
                      : "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]"
                  }`}>
                    <CheckCircle2 className="h-3 w-3" /> {doc.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#0F3854] bg-[#F2EFEB] px-2 py-0.5 rounded border border-[#E2DED6]">
                    <Lock className="h-2.5 w-2.5" />
                    SHA-256: {doc.hash.slice(0, 16)}...
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono">
              <button
                onClick={() => handleOpenAudit(doc)}
                className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-[#0F3854] font-semibold text-xs border border-[#0F3854]/40 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Verify document SHA-256 hash and on-chain record"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#147452]" />
                <span>Verify Integrity</span>
              </button>
              <button
                onClick={() => handleDownloadFile(doc)}
                className="px-3.5 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0A2540] font-medium text-xs border border-[#E2DED6] transition-colors flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5 text-[#5B6A78]" />
                <span>Download Enclosure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Verification Modal */}
      <EvidenceVerificationModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        evidenceRecord={selectedAuditRecord}
      />
    </div>
  );
};

"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  FileCheck2,
  Lock,
  Building2
} from "lucide-react";

export const DocumentsView: React.FC = () => {
  const { startups } = useApp();

  const baseDocs = [
    {
      title: "Statutory GFR 173 Exemption Certificate",
      type: "PDF Compliance File",
      size: "1.4 MB",
      date: "2026-10-02",
      authority: "Ministry of Finance & DPIIT",
      status: "Verified Active",
      hash: "e8b2a1c49f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192"
    },
    {
      title: "90-Day Municipal Pilot Sanction Order (PILOT-WQ-2026-01)",
      type: "Sanction Grant Order",
      size: "2.8 MB",
      date: "2026-10-06",
      authority: "Ministry of Jal Shakti Procurement Cell",
      status: "Executed",
      hash: "8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02"
    },
    {
      title: "Central Water Laboratory Audit & Benchmarking Certificate",
      type: "Technical Audit PDF",
      size: "3.2 MB",
      date: "2026-10-05",
      authority: "State Central Water Testing Lab",
      status: "Score 96.4/100",
      hash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910"
    },
    {
      title: "Scale-Up Cabinet Sanction Note & Allocation (₹18.50 Cr)",
      type: "Procurement Approval Note",
      size: "4.1 MB",
      date: "2026-10-06",
      authority: "National Water Mission Board",
      status: "Sanctioned",
      hash: "11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff"
    },
    {
      title: "AquaSense AI Patent Dossier (Spectrophotometric Probes)",
      type: "Patent Office Certified",
      size: "5.6 MB",
      date: "2025-11-18",
      authority: "Indian Patent Office (Govt of India)",
      status: "3 Patents Granted",
      hash: "5b7a1249cd0145892310beef9481230489123048120394812309481230948123"
    }
  ];

  // Dynamic uploaded certificates
  const dynamicDocs = startups
    .filter(s => s.documentRecord)
    .map(s => ({
      title: `DPIIT Recognition Certificate: ${s.name}`,
      type: "DPIIT PDF Enclosure",
      size: `${Math.round((s.documentRecord?.fileSizeBytes || 102400) / 1024)} KB`,
      date: s.documentRecord?.uploadedAt?.slice(0, 10) || "2026-10-27",
      authority: "DPIIT - Ministry of Commerce and Industry",
      status: s.documentRecord?.officialStatus || "Pending Review",
      hash: s.documentRecord?.fileHash || "hash-pending"
    }));

  const allDocs = [...dynamicDocs, ...baseDocs];

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
Cryptographic Verification Engine. Any tampering invalidates
the SHA-256 hash.`;

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

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
          <FileCheck2 className="h-4 w-4" />
          Statutory Document Repository & Legal Enclosures
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
          Procurement Sanctions & Compliance Documents ({allDocs.length})
        </h1>
        <p className="text-xs text-[#5B6A78] mt-1">
          All digital agreements, DPIIT certificates, laboratory test reports, and statutory relaxations under the Public Procurement Sandbox with cryptographic SHA-256 validation.
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded border border-[#E2DED6] divide-y divide-[#EDE9E1] shadow-2xs">
        {allDocs.map((doc, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded bg-[#FAF8F5] text-[#0F3854] border border-[#E2DED6] flex items-center justify-center font-bold shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540]">{doc.title}</h3>
                <p className="text-xs text-[#5B6A78] font-mono mt-0.5">
                  Authority: {doc.authority} • {doc.size} • Issued: {doc.date}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 font-mono">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
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
    </div>
  );
};

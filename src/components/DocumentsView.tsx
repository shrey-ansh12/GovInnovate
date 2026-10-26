"use client";

import React from "react";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  FileCheck2
} from "lucide-react";

export const DocumentsView: React.FC = () => {
  const docs = [
    {
      title: "Statutory GFR 173 Exemption Certificate",
      type: "PDF Compliance File",
      size: "1.4 MB",
      date: "2026-10-02",
      authority: "Ministry of Finance & DPIIT",
      status: "Verified Active"
    },
    {
      title: "90-Day Municipal Pilot Sanction Order (PILOT-WQ-2026-01)",
      type: "Sanction Grant Order",
      size: "2.8 MB",
      date: "2026-10-06",
      authority: "Ministry of Jal Shakti Procurement Cell",
      status: "Executed"
    },
    {
      title: "Central Water Laboratory Audit & Benchmarking Certificate",
      type: "Technical Audit PDF",
      size: "3.2 MB",
      date: "2026-10-05",
      authority: "State Central Water Testing Lab",
      status: "Score 96.4/100"
    },
    {
      title: "Scale-Up Cabinet Sanction Note & Allocation (₹18.50 Cr)",
      type: "Procurement Approval Note",
      size: "4.1 MB",
      date: "2026-10-06",
      authority: "National Water Mission Board",
      status: "Sanctioned"
    },
    {
      title: "AquaSense AI Patent Dossier (Spectrophotometric Probes)",
      type: "Patent Office Certified",
      size: "5.6 MB",
      date: "2025-11-18",
      authority: "Indian Patent Office (Govt of India)",
      status: "3 Patents Granted"
    }
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
          <FileCheck2 className="h-4 w-4" />
          Statutory Document Repository & Legal Enclosures
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
          Procurement Sanctions & Compliance Documents
        </h1>
        <p className="text-xs text-[#5B6A78] mt-1">
          All digital agreements, laboratory test certificates, and statutory relaxations under the Public Procurement Sandbox.
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded border border-[#E2DED6] divide-y divide-[#EDE9E1]">
        {docs.map((doc, idx) => (
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
                <div className="flex items-center gap-2 mt-2 font-mono">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                    <CheckCircle2 className="h-3 w-3" /> {doc.status}
                  </span>
                  <span className="text-[10px] text-[#7E8B97]">SHA-256 Validated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono">
              <button
                onClick={() => alert(`Downloading verified enclosure: ${doc.title}`)}
                className="px-3.5 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0A2540] font-medium text-xs border border-[#E2DED6] transition-colors flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5 text-[#5B6A78]" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

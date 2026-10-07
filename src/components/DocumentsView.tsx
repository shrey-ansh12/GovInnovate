"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Layers,
  FileCheck2,
  Lock
} from "lucide-react";

export const DocumentsView: React.FC = () => {
  const docs = [
    {
      title: "Statutory GFR 149/170 Exemption Certificate",
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <FileCheck2 className="h-4 w-4" />
          Statutory Document Repository & Legal Enclosures
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Procurement Sanctions & Compliance Documents
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          All digital agreements, laboratory test certificates, and statutory relaxations under the Public Procurement Sandbox.
        </p>

      </div>

      {/* Documents List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {docs.map((doc, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authority: {doc.authority} • {doc.size} • Issued: {doc.date}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3" /> {doc.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">SHA-256 Validated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => alert(`Simulating secure download for: ${doc.title}`)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

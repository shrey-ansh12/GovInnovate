"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  AlertCircle,
  Award
} from "lucide-react";

export const ValidationReport: React.FC = () => {
  const { pilot, setActiveView, approveProcurementAction } = useApp();

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Official Government Validation Header */}
      <div className="bg-white rounded border border-[#E2DED6] p-8 mb-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EBF6F0] text-[#147452] px-2.5 py-0.5 rounded border border-[#C2E5D2]">
                Empirical Validation Certificate
              </span>
              <span className="text-xs font-mono text-[#5B6A78]">Doc Ref: GOV-VAL-2026-WQ90</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight mt-2">
              90-Day Sandbox Pilot Performance Validation
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              Issued by: National Water Mission Technical Board & Independent Water Testing Laboratory
            </p>
          </div>

          <div className="text-right shrink-0 font-mono">
            <span className="text-xs text-[#5B6A78]">Validation Score</span>
            <div className="text-4xl font-bold text-[#147452]">
              {pilot.overallScore} <span className="text-lg text-[#5B6A78]">/ 100</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="my-4 p-3 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Legal Disclaimer:</strong> Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval.
          </span>
        </div>

        {/* Certificate Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#EDE9E1] text-xs font-mono">
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Vendor Startup</span>
            <p className="font-bold text-[#0A2540] mt-0.5">AquaSense AI Innovations</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Sanction Order</span>
            <p className="font-bold text-[#0A2540] mt-0.5">{pilot.id}</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Sites Evaluated</span>
            <p className="font-bold text-[#0A2540] mt-0.5">5 Municipal Intake Zones</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Audit Status</span>
            <p className="font-bold text-[#147452] mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Target Met
            </p>
          </div>
        </div>

        {/* Technical Recommendation Box */}
        <div className="mt-6 p-6 rounded bg-[#0F3854] text-white border border-[#1D4E72] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Technical Committee Validation Assessment
            </h3>
          </div>
          <p className="text-sm font-bold text-emerald-300 mb-2 font-mono">
            ✓ Demonstrated Technical Feasibility for Scale Consideration
          </p>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Based on 90-day continuous field deployment across 5 municipal distribution plants, AquaSense AI exceeded all SLA benchmarks. Zero consumable chemical overhead, 99.8% sensor uptime, and verified 2.8-minute alert latency justify consideration for commercial expansion to 50 municipal zones, subject to competent-authority sanction under applicable procurement rules.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-[#1D4E72]">
            <div>
              <span className="text-slate-300">Validated Annual Cost Savings: </span>
              <strong className="text-white">₹1.12 Crore/year across 5 plants</strong>
            </div>
            <div>
              <span className="text-slate-300">Lab Correlation Metric: </span>
              <strong className="text-emerald-300">98.2% correlation with NABL tests</strong>
            </div>
          </div>
        </div>

        {/* Validation Committee Sign-Off */}
        <div className="mt-8 pt-6 border-t border-[#EDE9E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#5B6A78]">
            <p className="font-bold text-[#0A2540]">Authorized Panel Signatures:</p>
            <p>1. Dr. Rajeshwar Sharma, Director, National Water Mission</p>
            <p>2. Prof. Vinod Nair, Technical Evaluation Board Chairman</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView("documents")}
              className="px-4 py-2 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#141F2B] font-semibold text-xs border border-[#E2DED6] transition-colors flex items-center gap-1.5 font-mono"
            >
              <FileText className="h-4 w-4 text-[#5B6A78]" />
              <span>Compliance Documents</span>
            </button>
            <button
              onClick={approveProcurementAction}
              className="px-5 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs"
            >
              <span>Proceed to Scale-Up Recommendation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

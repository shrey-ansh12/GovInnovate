"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileSignature
} from "lucide-react";

export const ProcurementRecommendation: React.FC = () => {
  const { approveProcurementAction } = useApp();

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Official Government Recommendation Card */}
      <div className="bg-white rounded border border-[#E2DED6] p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider bg-[#F2EFEB] text-[#0F3854] px-2.5 py-0.5 rounded border border-[#E2DED6]">
                Statutory Procurement Recommendation
              </span>
              <span className="text-xs font-mono text-[#5B6A78]">GFR Rule 173 / Special Sandbox Safe Harbor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight mt-2">
              Direct Commercial Procurement Sanction Note
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              For: AI-Based Water Quality Monitoring Expansion to 50 Municipal Zones
            </p>
          </div>

          <div className="text-right shrink-0 font-mono">
            <span className="text-xs text-[#5B6A78]">Commercial Sanction Value</span>
            <div className="text-3xl font-semibold text-[#0A2540]">₹18.50 Crore</div>
          </div>
        </div>

        {/* Legal & Procurement Justification */}
        <div className="mt-6 space-y-6">
          <div className="bg-[#FAF8F5] rounded p-6 border border-[#E2DED6] space-y-3 text-xs text-[#141F2B]">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0A2540] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#147452]" />
              Legal Framework & Exemption Justification
            </h3>
            <p className="leading-relaxed">
              Pursuant to the <strong>Startup-Friendly Public Procurement Guidelines (GFR 2017 Rule 173)</strong> and the successful completion of the 90-day sandbox pilot under Sanction Order PILOT-WQ-2026-01:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 font-mono text-[#5B6A78]">
              <li>
                <strong className="text-[#141F2B]">Proprietary Optical Technology:</strong> The contractor (AquaSense AI) holds 3 patents on reagent-free submerged sensors, eliminating continuous consumable tender overheads.
              </li>
              <li>
                <strong className="text-[#141F2B]">Sandbox Performance Benchmark:</strong> Exceeded all 5 service level agreements (SLAs), achieving 99.8% sensor uptime and 2.8-minute alert latency against the 5-minute requirement.
              </li>
              <li>
                <strong className="text-[#141F2B]">Value for Public Money:</strong> Generates quantified taxpayer savings of ₹4.8 Crore per annum once fully deployed across 50 municipal wards.
              </li>
            </ul>
          </div>

          {/* Allocation Breakdown */}
          <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded border border-[#E2DED6] bg-white">
              <p className="text-[#5B6A78] uppercase text-[10px]">Phase 1 Sandbox</p>
              <p className="text-lg font-semibold text-[#0A2540] mt-1">₹28.50 Lakhs</p>
              <p className="text-[11px] text-[#147452] mt-1">5 Sites Completed</p>
            </div>
            <div className="p-4 rounded border-2 border-[#0F3854] bg-[#FAF8F5]">
              <p className="text-[#0F3854] uppercase text-[10px] font-semibold">Phase 2 Scale-Up</p>
              <p className="text-lg font-semibold text-[#0A2540] mt-1">₹18.50 Crore</p>
              <p className="text-[11px] text-[#0F3854] mt-1">50 Municipal Wards</p>
            </div>
            <div className="p-4 rounded border border-[#E2DED6] bg-white">
              <p className="text-[#5B6A78] uppercase text-[10px]">Delivery Window</p>
              <p className="text-lg font-semibold text-[#0A2540] mt-1">6 Calendar Months</p>
              <p className="text-[11px] text-[#5B6A78] mt-1">Staggered Deployment</p>
            </div>
          </div>
        </div>

        {/* Approval Actions */}
        <div className="mt-8 pt-6 border-t border-[#EDE9E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5B6A78]">
            <FileSignature className="h-4 w-4 text-[#147452]" />
            <span>Approved by Joint Secretary & Financial Advisor, Ministry of Jal Shakti</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={approveProcurementAction}
              className="px-6 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-2 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Issue Commercial Scale-Up Sanction (50 Locations)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

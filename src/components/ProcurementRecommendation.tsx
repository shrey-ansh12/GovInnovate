"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  Building2, 
  TrendingUp,
  CreditCard,
  FileSignature
} from "lucide-react";

export const ProcurementRecommendation: React.FC = () => {
  const { challenge, approveProcurementAction, setActiveView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Official Government Recommendation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Statutory Procurement Recommendation
              </span>
              <span className="text-xs text-slate-400">GFR Rule 149 / Special Sandbox Pathway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Direct Commercial Procurement Sanction Note
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              For: AI-Based Water Quality Monitoring Expansion to 50 Municipal Zones
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-slate-500">Commercial Sanction Value</span>
            <div className="text-3xl font-extrabold text-blue-700">₹18.50 Crore</div>
          </div>
        </div>

        {/* Legal & Procurement Justification */}
        <div className="mt-6 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Legal Framework & Exemption Justification
            </h3>
            <p className="leading-relaxed">
              Pursuant to the <strong>Startup-Friendly Public Procurement Guidelines (GFR 2017)</strong> and the successful completion of the 90-day sandbox pilot under Sanction Order PILOT-WQ-2026-01:
            </p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>
                <strong>Proprietary Optical Technology:</strong> The contractor (AquaSense AI) holds 3 patents on reagent-free submerged sensors, eliminating continuous consumable tender overheads.
              </li>
              <li>
                <strong>Sandbox Performance Benchmark:</strong> Exceeded all 5 service level agreements (SLAs), achieving 99.8% sensor uptime and 2.8-minute alert latency against the 5-minute requirement.
              </li>
              <li>
                <strong>Value for Public Money:</strong> Generates quantified taxpayer savings of ₹4.8 Crore per annum once fully deployed across 50 municipal wards.
              </li>
            </ul>
          </div>

          {/* Allocation Breakdown */}
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <p className="text-slate-400 uppercase font-bold text-[10px]">Phase 1 Sandbox</p>
              <p className="text-lg font-bold text-slate-900 mt-1">₹28.50 Lakhs</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">5 Sites Completed</p>
            </div>
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
              <p className="text-blue-600 uppercase font-bold text-[10px]">Phase 2 Scale-Up</p>
              <p className="text-lg font-bold text-blue-900 mt-1">₹18.50 Crore</p>
              <p className="text-[11px] text-blue-700 font-semibold mt-1">50 Municipal Wards</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <p className="text-slate-400 uppercase font-bold text-[10px]">Delivery Window</p>
              <p className="text-lg font-bold text-slate-900 mt-1">6 Calendar Months</p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">Staggered Deployment</p>
            </div>
          </div>
        </div>

        {/* Approval Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <FileSignature className="h-4 w-4 text-emerald-600" />
            <span>Approved by Joint Secretary & Financial Advisor, Ministry of Jal Shakti</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={approveProcurementAction}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Issue Commercial Scale-Up Sanction (50 Locations)
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

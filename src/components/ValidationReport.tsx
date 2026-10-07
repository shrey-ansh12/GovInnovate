"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  FileCheck2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Award,
  Layers,
  Scale
} from "lucide-react";

export const ValidationReport: React.FC = () => {
  const { pilot, challenge, setActiveView, approveProcurementAction } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Official Government Validation Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                Official Pilot Validation Certificate
              </span>
              <span className="text-xs text-slate-400">Doc Ref: GOV-VAL-2026-WQ90</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
              90-Day Sandbox Pilot Performance Validation
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Issued by: National Water Mission Technical Board & Independent Water Testing Laboratory
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-slate-500">Validation Score</span>
            <div className="text-4xl font-extrabold text-emerald-600">
              {pilot.overallScore} <span className="text-lg text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Vendor Startup</span>
            <p className="font-bold text-slate-900 mt-0.5">AquaSense AI Innovations</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Sanction Order</span>
            <p className="font-bold text-slate-900 mt-0.5">{pilot.id}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Sites Evaluated</span>
            <p className="font-bold text-slate-900 mt-0.5">5 Municipal Intake Zones</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Audit Status</span>
            <p className="font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Target Met
            </p>
          </div>
        </div>

        {/* AI Recommendation Box */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-300">
              AI Procurement Recommendation Verdict
            </h3>
          </div>
          <p className="text-base font-bold text-emerald-300 mb-2">
            ✓ Strongly Recommended for Direct Commercial Scale-Up Procurement
          </p>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Based on 90-day continuous field deployment across 5 municipal distribution plants, AquaSense AI exceeded all SLA benchmarks. Zero consumable chemical overhead, 99.8% sensor uptime, and verified 2.8-minute alert latency justify immediate commercial expansion to 50 municipal zones under Rule 149 of General Financial Rules.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-indigo-800">
            <div>
              <span className="text-slate-400">Validated Annual Cost Savings: </span>
              <strong className="text-white">₹1.12 Crore/year per 5 plants</strong>
            </div>
            <div>
              <span className="text-slate-400">Projected Scale-Up ROI: </span>
              <strong className="text-emerald-400">460% return across 36 months</strong>
            </div>
          </div>
        </div>

        {/* Validation Committee Sign-Off */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <p className="font-semibold text-slate-800">Panel Signatures:</p>
            <p>1. Dr. Rajeshwar Sharma, Director, National Water Mission</p>
            <p>2. Prof. Vinod Nair, Evaluation Board Chairman</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView("documents")}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-4 w-4" />
              Download Signed PDF
            </button>
            <button
              onClick={approveProcurementAction}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              Proceed to Procurement Recommendation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

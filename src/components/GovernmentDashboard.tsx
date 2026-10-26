"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Sparkles, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText
} from "lucide-react";

export const GovernmentDashboard: React.FC = () => {
  const { challenge, applications, setActiveView } = useApp();

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner / Hero */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Building2 className="h-4 w-4" />
            National Jal Shakti Innovation Command Center • Rule 173 Rails
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Government Department Procurement Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Monitor startup innovation pipelines, trigger AI problem decompositions, review scored bids, supervise 90-day sandbox pilots, and sanction direct scale-up orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView("create_challenge")}
            className="px-5 py-2.5 rounded bg-white text-[#0F3854] font-medium text-xs hover:bg-slate-100 flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="h-4 w-4 text-[#0F3854]" />
            <span>Create New Innovation Challenge</span>
          </button>
          <button
            onClick={() => setActiveView("audit_trail")}
            className="px-4 py-2.5 rounded bg-transparent hover:bg-white/10 text-white font-medium text-xs border border-white/30 transition-colors flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-emerald-300" />
            <span>Vigilance & Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded border border-[#E2DED6]">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">Active Challenges</div>
          <div className="text-2xl font-semibold text-[#0A2540]">1 Challenge</div>
          <div className="text-[11px] text-[#0F3854] font-medium mt-1 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F3854]"></span> 12 Startups Matched
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-[#E2DED6]">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">Applications In Review</div>
          <div className="text-2xl font-semibold text-[#0F3854]">{applications.length} Proposals</div>
          <div className="text-[11px] text-[#147452] font-medium mt-1 flex items-center gap-1 font-mono">
            <ShieldCheck className="h-3 w-3" /> DPIIT Verified Bidders
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-[#E2DED6]">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">90-Day Sandbox Pilot</div>
          <div className="text-2xl font-semibold text-[#147452]">Day 90 / 90</div>
          <div className="text-[11px] text-[#147452] font-medium mt-1 flex items-center gap-1 font-mono">
            <CheckCircle2 className="h-3 w-3" /> Score: 96.4/100 (Exceeded)
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-[#E2DED6]">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">Scale-Up Expansion</div>
          <div className="text-2xl font-semibold text-[#0A2540]">5 → 50 Sites</div>
          <div className="text-[11px] text-[#5B6A78] font-mono mt-1">
            ₹18.5 Cr Budget Approved
          </div>
        </div>
      </div>

      {/* Featured Challenge Lifecycle Pipeline Card */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] px-2.5 py-0.5 rounded">
                Active Flagship Sandbox
              </span>
              <span className="text-xs font-mono text-[#5B6A78]">ID: {challenge.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0A2540] mt-2">
              {challenge.title}
            </h2>
            <p className="text-xs text-[#5B6A78] mt-1">
              {challenge.department} • Budget: {challenge.budget}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className="px-4 py-2 text-xs font-medium rounded bg-[#F2EFEB] text-[#0F3854] hover:bg-[#EDE9E1] border border-[#E2DED6] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#147452]" />
              <span>View 12 AI Matches</span>
            </button>
            <button
              onClick={() => setActiveView("pilot_management")}
              className="px-4 py-2 text-xs font-medium rounded bg-[#0F3854] text-white hover:bg-[#1D4E72] transition-colors flex items-center gap-1.5"
            >
              <span>Manage Pilot Sandbox</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Procurement Step by Step Visual Bar */}
        <div className="mt-8">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-4">
            End-to-End Procurement Lifecycle Progression
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { num: 1, label: "Challenge Created", view: "create_challenge", done: true },
              { num: 2, label: "AI Matching (94%)", view: "ai_startup_matches", done: true },
              { num: 3, label: "Startup Applied", view: "application_review", done: true },
              { num: 4, label: "DPIIT Verified", view: "application_review", done: true },
              { num: 5, label: "Evaluator Scored", view: "evaluation_scorecard", done: true },
              { num: 6, label: "90-Day Pilot (5 Sites)", view: "pilot_management", done: true },
              { num: 7, label: "Lab Validation", view: "validation_report", done: true },
              { num: 8, label: "Scale-Up (50 Sites)", view: "scale_up", done: challenge.status === "Scale-Up" || challenge.status === "Procurement Approved" },
            ].map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveView(step.view as any)}
                className={`p-3 rounded border text-center cursor-pointer transition-all hover:border-[#0F3854] ${
                  step.done 
                    ? "bg-[#FAF8F5] border-[#0F3854] text-[#0A2540]" 
                    : "bg-[#F2EFEB] border-[#E2DED6] text-[#7E8B97]"
                }`}
              >
                <div className={`w-5 h-5 mx-auto rounded-full text-[10px] font-mono font-bold flex items-center justify-center mb-1.5 ${
                  step.done ? "bg-[#0F3854] text-white" : "bg-[#E2DED6] text-[#5B6A78]"
                }`}>
                  {step.done ? "✓" : step.num}
                </div>
                <p className="text-[11px] font-medium leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Pilot Metrics Snippet */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 pt-6 border-t border-[#EDE9E1]">
          <div className="p-4 rounded bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-semibold text-[#5B6A78]">Selected Pilot Vendor</span>
            <p className="text-sm font-semibold text-[#0A2540] mt-1">AquaSense AI Innovations Pvt Ltd</p>
            <p className="text-xs text-[#147452] font-mono mt-0.5">DPIIT-REC-89241-DL (TRL-8 Probes)</p>
          </div>

          <div className="p-4 rounded bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-semibold text-[#5B6A78]">Pilot Locations Status</span>
            <p className="text-sm font-semibold text-[#0A2540] mt-1">5 Municipal Reservoirs Live</p>
            <p className="text-xs text-[#0F3854] font-mono mt-0.5">99.8% Hardware Telemetry Uptime</p>
          </div>

          <div className="p-4 rounded bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-semibold text-[#5B6A78]">Commercial Next Step</span>
            <p className="text-sm font-semibold text-[#0A2540] mt-1">Direct Procurement Sanction</p>
            <p className="text-xs text-[#0A2540] font-mono mt-0.5">₹18.5 Cr State Rollout Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

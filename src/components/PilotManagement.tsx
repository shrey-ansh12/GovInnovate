"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Activity, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Sparkles
} from "lucide-react";

export const PilotManagement: React.FC = () => {
  const { pilot, setActiveView, approveValidationAction } = useApp();

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
              <Activity className="h-4 w-4" />
              90-Day Municipal Pilot Sandbox • Live Hardware Telemetry
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {pilot.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-mono">
              Contractor: <strong className="text-white">AquaSense AI Innovations</strong> | Sites: <strong className="text-white">5 Municipal Reservoirs</strong> | Health Score: <strong className="text-emerald-300">{pilot.overallScore} / 100</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView("kpi_monitoring")}
              className="w-full sm:w-auto px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 flex items-center justify-center gap-2 transition-colors"
            >
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              <span>Live Sensor Telemetry</span>
            </button>
            <button
              onClick={approveValidationAction}
              className="w-full sm:w-auto px-5 py-2 rounded bg-white hover:bg-slate-100 text-[#0F3854] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-[#147452]" />
              <span>Proceed to Validation Report</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar of the 90 days */}
        <div className="mt-8 pt-6 border-t border-[#1D4E72]">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-mono">
            <span>Pilot Sandbox Day: <strong className="text-white">Day 90 of 90 (Completed)</strong></span>
            <span className="text-emerald-300 font-semibold">Phase: Empirical Validation Completed</span>
          </div>
          <div className="h-2 w-full bg-[#0A2540] rounded overflow-hidden border border-[#1D4E72]">
            <div className="h-full bg-emerald-400 rounded w-full"></div>
          </div>
        </div>
      </div>

      {/* 5 Pilot Deployment Locations */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-[#0A2540] mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#0F3854]" />
          5 Active Municipal Sandbox Monitoring Sites
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "Ward 12 Intake Pump", ph: "7.2 pH", turb: "1.1 NTU", status: "Nominal", lead: "0.001 mg/L" },
            { name: "Central River Canal #4", ph: "7.4 pH", turb: "1.8 NTU", status: "Nominal", lead: "0.002 mg/L" },
            { name: "North Municipal Tank", ph: "7.1 pH", turb: "0.9 NTU", status: "Nominal", lead: "0.001 mg/L" },
            { name: "East Industrial Border", ph: "7.6 pH", turb: "2.1 NTU", status: "Flagged & Neutralized", lead: "0.004 mg/L" },
            { name: "South Distribution Gate", ph: "7.3 pH", turb: "1.3 NTU", status: "Nominal", lead: "0.001 mg/L" },
          ].map((site, i) => (
            <div key={i} className="bg-white rounded border border-[#E2DED6] p-4 space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-[10px] uppercase font-semibold text-[#5B6A78]">Site 0{i+1}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#147452]"></span>
              </div>
              <h3 className="text-xs font-semibold text-[#0A2540] truncate">{site.name}</h3>
              <div className="text-[11px] font-mono text-[#5B6A78] space-y-0.5 pt-1 border-t border-[#EDE9E1]">
                <div className="flex justify-between"><span>pH:</span> <strong className="text-[#141F2B]">{site.ph}</strong></div>
                <div className="flex justify-between"><span>Turb:</span> <strong className="text-[#141F2B]">{site.turb}</strong></div>
                <div className="flex justify-between"><span>Heavy Metals:</span> <strong className="text-[#147452]">{site.lead}</strong></div>
              </div>
              <div className="text-[10px] font-mono text-[#147452] bg-[#EBF6F0] border border-[#C2E5D2] p-1 rounded text-center">
                {site.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilot Milestones and Payouts */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded border border-[#E2DED6] p-6">
          <h2 className="text-base font-semibold text-[#0A2540] mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#147452]" />
            Pilot Milestone Completion & Direct Treasury Disbursements
          </h2>

          <div className="space-y-4">
            {pilot.milestones.map((milestone, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded bg-[#FAF8F5] border border-[#E2DED6] gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#0A2540]">{milestone.name}</h3>
                    <p className="text-[11px] font-mono text-[#5B6A78] mt-0.5">Due: {milestone.dueDate} • Verified by On-Site Nodal Officer</p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <p className="text-xs font-semibold text-[#0A2540]">{milestone.payout}</p>
                  <span className="text-[10px] font-medium text-[#147452] bg-[#EBF6F0] border border-[#C2E5D2] px-2 py-0.5 rounded">
                    PFMS Disbursed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: AI Recommendation Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                AI Pilot Validation Verdict
              </h3>
            </div>
            <div className="p-3 bg-white/10 rounded border border-white/20 text-emerald-300 text-xs font-mono font-semibold mb-3">
              ✓ {pilot.aiPilotRecommendation.verdict}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AI verified that AquaSense probes maintained 99.8% uptime with zero chemical refills, saving an estimated ₹1.12 Cr/year across pilot zones.
            </p>
            <div className="text-xs font-mono space-y-2 pt-2 border-t border-[#1D4E72]">
              <div className="flex justify-between">
                <span className="text-slate-300">Model Confidence:</span>
                <span className="font-semibold text-emerald-300">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Cost-Benefit:</span>
                <span className="font-semibold text-white">{pilot.aiPilotRecommendation.costBenefitRatio}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("validation_report")}
            className="w-full py-2.5 rounded bg-white hover:bg-slate-100 border border-[#E2DED6] text-[#0F3854] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Comprehensive Validation Report</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

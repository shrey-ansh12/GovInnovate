"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Activity, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  Layers, 
  FileCheck2,
  Building2,
  Sparkles
} from "lucide-react";

export const PilotManagement: React.FC = () => {
  const { pilot, challenge, setActiveView, approveValidationAction } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              <Activity className="h-4 w-4" />
              90-Day Municipal Pilot Sandbox • Live Hardware Telemetry
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {pilot.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Contractor: <strong>AquaSense AI Innovations</strong> | Deployment Sites: <strong>5 Municipal Intake Reservoirs</strong> | Overall Pilot Health: <strong className="text-emerald-400">{pilot.overallScore} / 100</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView("kpi_monitoring")}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Live Sensor Telemetry
            </button>
            <button
              onClick={approveValidationAction}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              Proceed to Validation Report (96.4 Score)
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar of the 90 days */}
        <div className="mt-8 pt-6 border-t border-indigo-900/80">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-medium">
            <span>Pilot Sandbox Day: <strong>Day 90 of 90 (Completed)</strong></span>
            <span className="text-emerald-400 font-bold">Phase: Validation Completed</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* 5 Pilot Deployment Locations */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
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
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Site 0{i+1}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 truncate">{site.name}</h3>
              <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                <div className="flex justify-between"><span>pH Level:</span> <strong>{site.ph}</strong></div>
                <div className="flex justify-between"><span>Turbidity:</span> <strong>{site.turb}</strong></div>
                <div className="flex justify-between"><span>Lead / Hg:</span> <strong className="text-emerald-700">{site.lead}</strong></div>
              </div>
              <div className="text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded text-center font-medium">
                {site.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilot Milestones and Payouts */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Pilot Milestone Completion & Direct Treasury Disbursements
          </h2>

          <div className="space-y-4">
            {pilot.milestones.map((milestone, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{milestone.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Due: {milestone.dueDate} • Verified by On-Site Nodal Officer</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-slate-900">{milestone.payout}</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    PFMS Disbursed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: AI Recommendation Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
                AI Pilot Validation Verdict
              </h3>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              ✓ {pilot.aiPilotRecommendation.verdict}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AI verified that AquaSense probes maintained 99.8% uptime with zero chemical refills, saving an estimated ₹1.12 Cr/year across pilot zones.
            </p>
            <div className="text-xs space-y-2 pt-2 border-t border-indigo-900">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Confidence</span>
                <span className="font-bold text-emerald-400">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cost-Benefit Ratio</span>
                <span className="font-bold text-sky-300">{pilot.aiPilotRecommendation.costBenefitRatio}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("validation_report")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            Open Comprehensive Validation Report <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

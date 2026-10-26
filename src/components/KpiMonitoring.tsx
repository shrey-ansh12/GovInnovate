"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2
} from "lucide-react";

export const KpiMonitoring: React.FC = () => {
  const { pilot, setActiveView } = useApp();
  const [selectedKpi, setSelectedKpi] = useState<string>(pilot.kpis[0].id);

  const activeKpi = pilot.kpis.find(k => k.id === selectedKpi) || pilot.kpis[0];

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
            <Activity className="h-4 w-4" />
            Continuous IoT Telemetry & Benchmarking
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
            Real-Time Pilot KPI Performance Engine
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Data aggregated from 15 submersible HydroGuard optical sensors across 5 municipal distribution plants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("validation_report")}
            className="px-4 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Proceed to Validation Report</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {pilot.kpis.map((kpi) => {
          const isSelected = kpi.id === selectedKpi;
          return (
            <div
              key={kpi.id}
              onClick={() => setSelectedKpi(kpi.id)}
              className={`p-5 rounded border cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#FAF8F5] border-[#0F3854] ring-1 ring-[#0F3854]"
                  : "bg-white border-[#E2DED6] hover:border-[#0F3854]"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                <span className="text-[#5B6A78] truncate">{kpi.metric.slice(0, 20)}...</span>
                <span className="text-[#147452] bg-[#EBF6F0] border border-[#C2E5D2] px-1.5 py-0.5 rounded text-[10px]">
                  {kpi.status}
                </span>
              </div>

              <div className="text-2xl font-semibold text-[#0A2540] mt-1 font-mono">
                {kpi.current}
              </div>

              <div className="text-xs text-[#5B6A78] mt-1 font-mono">
                Target: <strong className="text-[#141F2B]">{kpi.target}</strong>
              </div>

              {/* Sparkline Visual Simulation */}
              <div className="mt-3 flex items-end gap-1 h-8 pt-1">
                {kpi.trend.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all ${
                      isSelected ? "bg-[#0F3854]" : "bg-[#EDE9E1]"
                    }`}
                    style={{ height: `${Math.min(100, Math.max(20, (val / Math.max(...kpi.trend)) * 100))}%` }}
                    title={`Day observation: ${val}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed KPI Analysis Card */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded border border-[#E2DED6] p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE9E1]">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-[#5B6A78]">Detailed Telemetry Focus</span>
              <h2 className="text-lg font-semibold text-[#0A2540] mt-0.5">{activeKpi.metric}</h2>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-[#5B6A78]">Benchmark Target: {activeKpi.target}</span>
              <p className="text-sm font-semibold text-[#147452]">Current: {activeKpi.current} (Surpassed)</p>
            </div>
          </div>

          {/* Expanded Trend Visualization */}
          <div className="mt-6">
            <h4 className="text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-3">
              90-Day Telemetry Trend by Milestone Epoch
            </h4>
            <div className="bg-[#FAF8F5] rounded p-6 border border-[#E2DED6]">
              <div className="grid grid-cols-5 gap-4 text-center">
                {activeKpi.trend.map((val, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-32 flex items-end justify-center">
                      <div
                        className="w-10 rounded-t bg-[#0F3854] transition-all"
                        style={{ height: `${Math.min(100, Math.max(25, (val / Math.max(...activeKpi.trend)) * 100))}%` }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-[#0A2540]">{val} {activeKpi.unit}</p>
                      <p className="text-[10px] text-[#5B6A78] font-mono">Day {(idx + 1) * 18}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EDE9E1] flex items-center justify-between text-xs text-[#5B6A78] font-mono">
            <span>Verified by Independent State Central Water Lab on 2026-10-05</span>
            <span className="font-semibold text-[#147452]">Audit Status: Zero Discrepancies</span>
          </div>
        </div>

        {/* Right Column: AI Validation Insights */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300">
                AI Regulatory Validation Check
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All 5 telemetry parameters satisfy Central Pollution Control Board (CPCB) drinking water standards and BIS IS 10500:2012 thresholds.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-400">Response Speed</span>
                <span className="text-emerald-300 font-semibold">2.8m vs 5.0m Target</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-400">Sensor Uptime</span>
                <span className="text-emerald-300 font-semibold">99.8% (Target 98.0%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-400">False Positives</span>
                <span className="text-emerald-300 font-semibold">0.3% (Target &lt; 2.0%)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("validation_report")}
            className="w-full py-3 rounded bg-white border border-[#E2DED6] hover:bg-[#F2EFEB] text-[#0F3854] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Review Formal Validation Report</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

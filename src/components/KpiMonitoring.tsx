"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  BarChart, 
  RotateCw,
  SlidersHorizontal,
  FileCheck2
} from "lucide-react";

export const KpiMonitoring: React.FC = () => {
  const { pilot, setActiveView } = useApp();
  const [selectedKpi, setSelectedKpi] = useState<string>(pilot.kpis[0].id);

  const activeKpi = pilot.kpis.find(k => k.id === selectedKpi) || pilot.kpis[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <Activity className="h-4 w-4" />
            Continuous IoT Telemetry & Benchmarking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Real-Time Pilot KPI Performance Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data aggregated from 15 submersible HydroGuard optical sensors across 5 municipal distribution plants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("validation_report")}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            Proceed to Validation Report
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
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="text-slate-500 truncate">{kpi.metric.slice(0, 20)}...</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                  {kpi.status}
                </span>
              </div>

              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {kpi.current}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                Target: <strong className="text-slate-700">{kpi.target}</strong>
              </div>

              {/* Sparkline Visual Simulation */}
              <div className="mt-3 flex items-end gap-1 h-8 pt-1">
                {kpi.trend.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all ${
                      isSelected ? "bg-blue-600" : "bg-slate-300"
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
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Detailed Telemetry Focus</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeKpi.metric}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Benchmark Target: {activeKpi.target}</span>
              <p className="text-base font-extrabold text-emerald-600">Current: {activeKpi.current} (Surpassed)</p>
            </div>
          </div>

          {/* Expanded Trend Visualization */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">
              90-Day Telemetry Trend by Milestone Epoch
            </h4>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="grid grid-cols-5 gap-4 text-center">
                {activeKpi.trend.map((val, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="h-32 flex items-end justify-center">
                      <div
                        className="w-10 rounded-t-lg bg-gradient-to-t from-blue-700 to-sky-400 transition-all shadow-sm"
                        style={{ height: `${Math.min(100, Math.max(25, (val / Math.max(...activeKpi.trend)) * 100))}%` }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">{val} {activeKpi.unit}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Day {(idx + 1) * 18}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Verified by Independent State Central Water Lab on 2026-10-05</span>
            <span className="font-bold text-emerald-700">Audit Status: Zero Discrepancies</span>
          </div>
        </div>

        {/* Right Column: AI Validation Insights */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
                AI Regulatory Validation Check
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All 5 telemetry parameters satisfy Central Pollution Control Board (CPCB) drinking water standards and BIS IS 10500:2012 thresholds.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-400">Response Speed</span>
                <span className="text-emerald-400 font-bold">2.8m vs 5.0m Target</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-400">Sensor Uptime</span>
                <span className="text-emerald-400 font-bold">99.8% (Target 98.0%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-400">False Positives</span>
                <span className="text-emerald-400 font-bold">0.3% (Target &lt; 2.0%)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("validation_report")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            Review Formal Validation Report <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

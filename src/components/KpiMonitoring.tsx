"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle,
  Edit3,
  X,
  CheckCircle2
} from "lucide-react";
import { PilotKPI } from "@/types";

export const KpiMonitoring: React.FC = () => {
  const { pilot, setActiveView, updateKpiActualAction, role } = useApp();
  const [selectedKpiId, setSelectedKpiId] = useState<string>(pilot.kpis[0]?.id || "kpi-1");

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingKpi, setEditingKpi] = useState<PilotKPI | null>(null);
  const [actualValInput, setActualValInput] = useState("");
  const [statusInput, setStatusInput] = useState<"Ahead" | "On Track" | "Needs Attention">("Ahead");

  const activeKpi = pilot.kpis.find(k => k.id === selectedKpiId) || pilot.kpis[0];

  const handleOpenEdit = (kpi: PilotKPI) => {
    setEditingKpi(kpi);
    setActualValInput(kpi.current);
    setStatusInput(kpi.status);
    setEditModalOpen(true);
  };

  const handleSaveKpi = () => {
    if (!editingKpi) return;
    updateKpiActualAction(pilot.id, editingKpi.id, actualValInput, statusInput);
    setEditModalOpen(false);
  };

  // Identify risk KPIs
  const riskKpis = pilot.kpis.filter(k => k.status === "Needs Attention");

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
            <Activity className="h-4 w-4" />
            Continuous IoT Telemetry & Benchmarking
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
            Target vs Actual Pilot KPI Performance
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Aggregated telemetry from {pilot.locationsCount} municipal sensor arrays evaluated against baseline targets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("validation_report")}
            className="px-4 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Proceed to Validation Report</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* MILESTONE / KPI RISK ALERTS */}
      {riskKpis.length > 0 && (
        <div className="mb-8 p-4 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-[#8A5B0B] mt-0.5" />
          <div>
            <div className="font-bold text-sm">KPI Performance Risk Alert</div>
            <p className="mt-0.5">
              {riskKpis.length} metric(s) currently flagged as &quot;Needs Attention&quot;. On-site calibration or sensor realignment required before final validation audit.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {pilot.kpis.map((kpi) => {
          const isSelected = kpi.id === selectedKpiId;
          const isAhead = kpi.status === "Ahead";
          const isAttention = kpi.status === "Needs Attention";

          return (
            <div
              key={kpi.id}
              onClick={() => setSelectedKpiId(kpi.id)}
              className={`p-5 rounded border cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#FAF8F5] border-[#0F3854] ring-1 ring-[#0F3854]"
                  : "bg-white border-[#E2DED6] hover:border-[#0F3854]"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                <span className="text-[#5B6A78] truncate max-w-[120px]">{kpi.metric}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isAhead 
                    ? "text-[#147452] bg-[#EBF6F0] border border-[#C2E5D2]" 
                    : isAttention 
                    ? "text-red-700 bg-red-50 border border-red-200" 
                    : "text-[#8A5B0B] bg-[#FEF7EA] border border-[#F6E1B9]"
                }`}>
                  {kpi.status}
                </span>
              </div>

              <div className="text-2xl font-bold text-[#0A2540] mt-1 font-mono">
                {kpi.current}
              </div>

              <div className="text-xs text-[#5B6A78] mt-1 font-mono flex items-center justify-between">
                <span>Target: <strong className="text-[#141F2B]">{kpi.target}</strong></span>
              </div>

              {/* Sparkline Visual Simulation */}
              <div className="mt-3 flex items-end gap-1 h-8 pt-1">
                {kpi.trend.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all ${
                      isSelected ? "bg-[#0F3854]" : "bg-[#EDE9E1]"
                    }`}
                    style={{ height: `${Math.min(100, Math.max(20, (val / Math.max(...kpi.trend, 1)) * 100))}%` }}
                    title={`Epoch observation: ${val}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed KPI Analysis Card */}
      {activeKpi && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded border border-[#E2DED6] p-6">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#EDE9E1] gap-3">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-[#5B6A78]">Target vs Submitted Telemetry Focus</span>
                <h2 className="text-lg font-bold text-[#0A2540] mt-0.5">{activeKpi.metric}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right font-mono">
                  <span className="text-xs text-[#5B6A78] block">Target: {activeKpi.target}</span>
                  <span className="text-sm font-bold text-[#147452]">Actual: {activeKpi.current} ({activeKpi.status})</span>
                </div>
                
                {/* Button to update actual results */}
                <button
                  onClick={() => handleOpenEdit(activeKpi)}
                  className="px-3 py-1.5 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Update actual telemetry measurement"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Update Reading</span>
                </button>
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
                          style={{ height: `${Math.min(100, Math.max(25, (val / Math.max(...activeKpi.trend, 1)) * 100))}%` }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-[#0A2540]">{val} {activeKpi.unit}</p>
                        <p className="text-[10px] text-[#5B6A78] font-mono">Day {(idx + 1) * 18}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE9E1] flex flex-wrap items-center justify-between text-xs text-[#5B6A78] font-mono gap-2">
              <span>Verified against parallel NABL central water laboratory audit titrations</span>
              <span className="font-semibold text-[#147452]">Status: Empirical Threshold Satisfied</span>
            </div>
          </div>

          {/* Right Column: Regulatory & Standards Check */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300">
                  Statutory Standards Verification
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Telemetry streams are correlated with BIS IS 10500:2012 drinking water standards and Central Pollution Control Board (CPCB) monitoring protocols.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                  <span className="text-slate-400">Target Benchmark</span>
                  <span className="text-white">{activeKpi.target}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                  <span className="text-slate-400">Actual Submitted</span>
                  <span className="text-emerald-300 font-bold">{activeKpi.current}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                  <span className="text-slate-400">Last Telemetry Sync</span>
                  <span className="text-slate-200">{activeKpi.lastUpdated || "2026-10-25"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView("validation_report")}
              className="w-full py-3 rounded bg-white border border-[#E2DED6] hover:bg-[#F2EFEB] text-[#0F3854] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Review Formal Validation Report</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* EDIT READING MODAL */}
      {editModalOpen && editingKpi && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-[#E2DED6] max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-[#0F3854]" />
                <h3 className="text-base font-bold text-[#0A2540]">Update Telemetry Reading</h3>
              </div>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="text-[#5B6A78] hover:text-[#141F2B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs font-mono text-[#5B6A78]">
              Metric: <strong className="text-[#0A2540]">{editingKpi.metric}</strong> (Target: {editingKpi.target})
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Actual Submitted Reading:</label>
              <input
                type="text"
                value={actualValInput}
                onChange={(e) => setActualValInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white"
                placeholder="e.g. 2.8 mins, 99.8%"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#141F2B] block">Performance Status:</label>
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white"
              >
                <option value="Ahead">Ahead of Target</option>
                <option value="On Track">On Track</option>
                <option value="Needs Attention">Needs Attention (Risk Alert)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#EDE9E1] flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-xs font-medium text-[#5B6A78]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKpi}
                className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white text-xs font-bold"
              >
                Save Telemetry & Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

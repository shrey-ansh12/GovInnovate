"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck
} from "lucide-react";

export const ScaleUp: React.FC = () => {
  const { challenge, executeScaleUpAction, setActiveView } = useApp();
  const [isExecuted, setIsExecuted] = useState(challenge.status === "Scale-Up");

  const handleExecute = () => {
    executeScaleUpAction();
    setIsExecuted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
              <TrendingUp className="h-4 w-4" />
              Innovation Scale-Up Phase • 10x Commercial Expansion
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Scaling from 5 Pilot Sites to 50 Municipal Zones
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-mono">
              Procurement Sanction: <strong className="text-white">₹18.50 Crore</strong> | Vendor: <strong className="text-white">AquaSense AI Innovations Pvt Ltd</strong> | Timeline: <strong className="text-white">6 Months Rollout</strong>
            </p>
          </div>

          <div className="shrink-0 font-mono">
            {!isExecuted ? (
              <button
                onClick={handleExecute}
                className="px-6 py-3 rounded bg-white hover:bg-slate-100 text-[#0F3854] font-semibold text-xs flex items-center gap-2 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                <span>Sanction 50-Location Rollout Work Order</span>
              </button>
            ) : (
              <div className="px-5 py-2.5 rounded bg-white/10 border border-white/20 text-emerald-300 font-medium text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Scale-Up Work Order Formally Released</span>
              </div>
            )}
          </div>
        </div>

        {/* 10x Scale Stat Counter */}
        <div className="mt-8 pt-6 border-t border-[#1D4E72] grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div>
            <span className="text-[10px] uppercase text-slate-300">Pilot Locations</span>
            <div className="text-2xl font-semibold text-white mt-0.5">5 Sites</div>
            <p className="text-[11px] text-emerald-300">100% Validated</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-300">Commercial Rollout</span>
            <div className="text-2xl font-semibold text-slate-100 mt-0.5">50 Zones</div>
            <p className="text-[11px] text-slate-300">Across 3 Districts</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-300">Citizens Protected</span>
            <div className="text-2xl font-semibold text-white mt-0.5">4.2 Million</div>
            <p className="text-[11px] text-emerald-300">Potable Coverage</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-300">Annual Public Savings</span>
            <div className="text-2xl font-semibold text-emerald-300 mt-0.5">₹4.8 Cr / yr</div>
            <p className="text-[11px] text-slate-300">Reagent & Labor</p>
          </div>
        </div>
      </div>

      {/* 50 Zone Distribution Grid Visualizer */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0A2540] flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#0F3854]" />
              50 Municipal Wards & Water Distribution Zones
            </h2>
            <p className="text-xs text-[#5B6A78] mt-0.5">
              Live deployment tracking across District Central, Industrial Belt, and Rural Intake corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#5B6A78]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#147452]"></span> 5 Pilot Active (Gold)
            </span>
            <span className="flex items-center gap-1.5 text-[#5B6A78]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F3854]"></span> 45 Scheduled Expansion
            </span>
          </div>
        </div>

        {/* 50 Interactive Site Blocks */}
        <div className="mt-6 grid grid-cols-5 sm:grid-cols-10 gap-2.5 font-mono">
          {Array.from({ length: 50 }).map((_, idx) => {
            const isPilotSite = idx < 5;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                  isPilotSite
                    ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452] font-semibold"
                    : isExecuted
                    ? "bg-[#FAF8F5] border-[#0F3854] text-[#0A2540]"
                    : "bg-[#FAF8F5] border-[#E2DED6] text-[#7E8B97]"
                }`}
                title={`Ward Zone ${idx + 1}: ${isPilotSite ? "Pilot Site (Active 90 Days)" : "Scale-Up Target"}`}
              >
                <div className="text-[9px] uppercase text-[#7E8B97]">Zone</div>
                <div className="text-sm font-semibold">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div>
                <div className="text-[9px] mt-0.5 font-medium truncate">
                  {isPilotSite ? "✓ Live" : isExecuted ? "Deploying" : "Queued"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion & Vigilance Footer */}
      <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Complete Innovation Procurement Lifecycle Finalized
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Challenge created → AI matching (94%) → Bid evaluated (95/100) → 90-day pilot → Validation (96.4) → Scale-up (50 sites). Every milestone is cryptographically recorded in the immutable audit trail.
          </p>
        </div>

        <button
          onClick={() => setActiveView("audit_trail")}
          className="px-5 py-2.5 rounded bg-white hover:bg-slate-100 text-[#0F3854] font-medium text-xs transition-colors flex items-center gap-2 shrink-0 font-mono"
        >
          <span>View Full Audit Trail</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

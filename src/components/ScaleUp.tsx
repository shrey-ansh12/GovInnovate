"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ExternalLink,
  Award
} from "lucide-react";

export const ScaleUp: React.FC = () => {
  const { challenge, executeScaleUpAction, setActiveView } = useApp();
  const [isExecuted, setIsExecuted] = useState(challenge.status === "Scale-Up");

  const handleExecute = () => {
    executeScaleUpAction();
    setIsExecuted(true);
    // Fire celebratory confetti for reaching 10x Scale
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
              <TrendingUp className="h-4 w-4" />
              Innovation Scale-Up Phase • 10x Commercial Expansion
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Scaling from 5 Pilot Sites to 50 Municipal Zones
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Procurement Sanction: <strong>₹18.50 Crore</strong> | Vendor: <strong>AquaSense AI Innovations Pvt Ltd</strong> | Timeline: <strong>6 Months Rollout</strong>
            </p>
          </div>

          <div className="shrink-0">
            {!isExecuted ? (
              <button
                onClick={handleExecute}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <CheckCircle2 className="h-4 w-4" />
                Sanction 50-Location Rollout Work Order
              </button>
            ) : (
              <div className="px-5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Scale-Up Work Order Formally Released
              </div>
            )}
          </div>
        </div>

        {/* 10x Scale Stat Counter */}
        <div className="mt-8 pt-6 border-t border-indigo-900/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Pilot Locations</span>
            <div className="text-2xl font-bold text-white mt-0.5">5 Sites</div>
            <p className="text-[11px] text-emerald-400">100% Validated</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Commercial Rollout</span>
            <div className="text-2xl font-bold text-sky-300 mt-0.5">50 Zones</div>
            <p className="text-[11px] text-slate-300">Across 3 Districts</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Citizens Protected</span>
            <div className="text-2xl font-bold text-white mt-0.5">4.2 Million</div>
            <p className="text-[11px] text-emerald-400">Potable Supply Coverage</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Annual Public Savings</span>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">₹4.8 Cr / yr</div>
            <p className="text-[11px] text-slate-300">Reagent & Labor Savings</p>
          </div>
        </div>
      </div>

      {/* 50 Zone Distribution Grid Visualizer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              50 Municipal Wards & Water Distribution Zones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live deployment tracking across District Central, Industrial Belt, and Rural Intake corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 5 Pilot Active (Gold Standard)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 45 Scheduled Expansion
            </span>
          </div>
        </div>

        {/* 50 Interactive Site Blocks */}
        <div className="mt-6 grid grid-cols-5 sm:grid-cols-10 gap-2.5">
          {Array.from({ length: 50 }).map((_, idx) => {
            const isPilotSite = idx < 5;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all hover:scale-105 cursor-pointer ${
                  isPilotSite
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                    : isExecuted
                    ? "bg-blue-50/70 border-blue-200 text-blue-900"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
                title={`Ward Zone ${idx + 1}: ${isPilotSite ? "Pilot Site (Active 90 Days)" : "Scale-Up Target"}`}
              >
                <div className="text-[10px] uppercase font-bold text-slate-400">Zone</div>
                <div className="text-sm font-extrabold">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div>
                <div className="text-[9px] mt-0.5 font-semibold truncate">
                  {isPilotSite ? "✓ Live" : isExecuted ? "Deploying" : "Queued"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion & Vigilance Footer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Complete Innovation Procurement Lifecycle Finalized
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Challenge created → AI matching (94%) → Bid evaluated (95/100) → 90-day pilot → Validation (96.4) → Scale-up (50 sites). Every single milestone is recorded in the immutable audit trail.
          </p>
        </div>

        <button
          onClick={() => setActiveView("audit_trail")}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-2 shrink-0"
        >
          View Full Audit Trail <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

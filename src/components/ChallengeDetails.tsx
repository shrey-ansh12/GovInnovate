"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Users, 
  FileText,
  ShieldCheck
} from "lucide-react";

export const ChallengeDetails: React.FC = () => {
  const { challenge, setActiveView, setRole } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Challenge ID: {challenge.id}
              </span>
              <span className="text-xs text-slate-400">Category: {challenge.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {challenge.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {challenge.department} • {challenge.ministry}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              View 12 AI Matched Startups
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Challenge Attributes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Pilot Budget</span>
            <p className="text-base font-bold text-blue-700 mt-0.5">{challenge.budget}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Pilot Duration</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">{challenge.pilotDuration}</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Initial Sites</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">{challenge.targetLocations} Pilot Sites</p>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-bold text-[10px]">Scale Potential</span>
            <p className="text-base font-bold text-emerald-600 mt-0.5">{challenge.scaleLocations} Expansion Wards</p>
          </div>
        </div>

        {/* Problem Statement & Quantifiable Outcomes */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Departmental Problem Statement
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {challenge.problemStatement}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Mandatory Quantifiable Key Results (Pilot SLAs)
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {challenge.expectedOutcomes.map((outcome, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight
} from "lucide-react";

export const ChallengeDetails: React.FC = () => {
  const { challenge, setActiveView } = useApp();

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="bg-white rounded border border-[#E2DED6] p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider bg-[#F2EFEB] text-[#0F3854] px-2.5 py-0.5 rounded border border-[#E2DED6]">
                Challenge ID: {challenge.id}
              </span>
              <span className="text-xs font-mono text-[#5B6A78]">Category: {challenge.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight mt-2">
              {challenge.title}
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              {challenge.department} • {challenge.ministry}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-2 transition-colors font-mono"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>View 12 AI Matched Startups</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Challenge Attributes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#EDE9E1] text-xs font-mono">
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Pilot Budget</span>
            <p className="text-base font-semibold text-[#0A2540] mt-0.5">{challenge.budget}</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Pilot Duration</span>
            <p className="text-base font-semibold text-[#0A2540] mt-0.5">{challenge.pilotDuration}</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Initial Sites</span>
            <p className="text-base font-semibold text-[#0A2540] mt-0.5">{challenge.targetLocations} Pilot Sites</p>
          </div>
          <div>
            <span className="text-[#5B6A78] uppercase text-[10px]">Scale Potential</span>
            <p className="text-base font-semibold text-[#147452] mt-0.5">{challenge.scaleLocations} Expansion Wards</p>
          </div>
        </div>

        {/* Problem Statement & Quantifiable Outcomes */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-2">
              Departmental Problem Statement
            </h3>
            <p className="text-xs text-[#141F2B] leading-relaxed bg-[#FAF8F5] p-4 rounded border border-[#E2DED6]">
              {challenge.problemStatement}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-2">
              Mandatory Quantifiable Key Results (Pilot SLAs)
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {challenge.expectedOutcomes.map((outcome, idx) => (
                <div key={idx} className="p-3.5 rounded border border-[#E2DED6] bg-white flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#147452] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#141F2B] leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

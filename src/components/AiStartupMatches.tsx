"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  SlidersHorizontal,
  Check,
  X
} from "lucide-react";

export const AiStartupMatches: React.FC = () => {
  const { startups, challenge, setActiveView, applyToChallengeAction, setRole } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<"All" | "High Match (>80%)" | "DPIIT Verified">("All");

  const filtered = startups.filter(s => {
    if (selectedFilter === "High Match (>80%)") return s.matchScore >= 80;
    if (selectedFilter === "DPIIT Verified") return s.isDpiitVerified;
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 mb-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
              <SlidersHorizontal className="h-4 w-4 text-[#147452]" />
              Rule-Based Eligibility & Tech Matching Engine
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540] tracking-tight">
              Matched Startups for: {challenge.title}
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              Objective evaluation across 4 deterministic rules: Sector Alignment, TRL Maturity (≥7), Local Content % (≥50%), and DPIIT Registry Verification.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedFilter("All")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "All" ? "bg-[#0F3854] text-white font-semibold" : "bg-[#F2EFEB] text-[#141F2B] hover:bg-[#EDE9E1]"}`}
            >
              All ({startups.length})
            </button>
            <button
              onClick={() => setSelectedFilter("High Match (>80%)")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "High Match (>80%)" ? "bg-[#0F3854] text-white font-semibold" : "bg-[#F2EFEB] text-[#141F2B] hover:bg-[#EDE9E1]"}`}
            >
              High Match (≥80%)
            </button>
            <button
              onClick={() => setSelectedFilter("DPIIT Verified")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "DPIIT Verified" ? "bg-[#147452] text-white font-semibold" : "bg-[#F2EFEB] text-[#141F2B] hover:bg-[#EDE9E1]"}`}
            >
              DPIIT Verified
            </button>
          </div>
        </div>
      </div>

      {/* Startups List */}
      <div className="space-y-6">
        {filtered.map((startup) => {
          const isTopMatch = startup.matchScore >= 90;

          return (
            <div
              key={startup.id}
              className={`bg-white rounded border transition-all p-6 ${
                isTopMatch 
                  ? "border-2 border-[#0F3854]" 
                  : "border-[#E2DED6] hover:border-[#0F3854]"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#EDE9E1]">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-[#0A2540]">{startup.name}</h2>
                    {startup.isDpiitVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                        <ShieldCheck className="h-3 w-3" />
                        DPIIT: {startup.dpiitNumber}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        DPIIT Pending
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#5B6A78] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      Inc. {startup.incorporationYear}
                    </span>
                    <span className="text-[10px] font-mono text-[#5B6A78] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      {startup.location}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78]">{startup.tagline}</p>
                </div>

                {/* Match Score Gauge */}
                <div className="flex items-center gap-4 bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] shrink-0 font-mono">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0A2540]">
                      {startup.matchScore}%
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-[#5B6A78]">
                      Rule Score
                    </div>
                  </div>
                  <div className="w-24 bg-[#E2DED6] h-1.5 rounded overflow-hidden">
                    <div
                      className="h-full bg-[#147452] rounded"
                      style={{ width: `${startup.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Explainable Match Rule Breakdown */}
              <div className="py-4 border-b border-[#EDE9E1]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2">
                  Explainable Rule Criteria Matrix
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className={`p-2.5 rounded border flex items-center justify-between ${
                    startup.matchBreakdown?.sectorMatch ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]" : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                    <span>Sector Match</span>
                    {startup.matchBreakdown?.sectorMatch ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>

                  <div className={`p-2.5 rounded border flex items-center justify-between ${
                    startup.trlLevel >= 7 ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]" : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                    <span>TRL Level ({startup.trlLevel})</span>
                    {startup.trlLevel >= 7 ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>

                  <div className={`p-2.5 rounded border flex items-center justify-between ${
                    startup.localContentPercentage >= 50 ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]" : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                    <span>Local Content ({startup.localContentPercentage}%)</span>
                    {startup.localContentPercentage >= 50 ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>

                  <div className={`p-2.5 rounded border flex items-center justify-between ${
                    startup.isDpiitVerified ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]" : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}>
                    <span>DPIIT Status</span>
                    {startup.isDpiitVerified ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              {/* Match Reasons & Tech Overview */}
              <div className="grid md:grid-cols-2 gap-6 pt-5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2">
                    Rule Match Drivers & Eligibility Qualifications
                  </h4>
                  <ul className="space-y-1.5">
                    {startup.matchReasons.map((reason, i) => (
                      <li key={i} className="text-xs text-[#141F2B] flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#147452] shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {startup.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-[#FAF8F5] text-[#5B6A78] border border-[#E2DED6] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Risk Detection & Actions */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className={`h-3.5 w-3.5 ${startup.riskAnalysis.level === 'Low' ? 'text-[#147452]' : 'text-amber-600'}`} />
                    Risk Assessment (Level: {startup.riskAnalysis.level})
                  </h4>
                  <div className="bg-[#FAF8F5] p-3 rounded border border-[#E2DED6] text-xs text-[#5B6A78] space-y-1">
                    {startup.riskAnalysis.factors.map((factor, idx) => (
                      <p key={idx} className="leading-relaxed">• {factor}</p>
                    ))}
                    <p className="text-[11px] font-mono text-[#141F2B] mt-2 pt-2 border-t border-[#EDE9E1]">
                      Patents: <strong className="text-[#0A2540]">{startup.patents} Indian Patents</strong> | Readiness: <strong className="text-[#0A2540]">TRL-{startup.trlLevel}</strong>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <button
                      onClick={() => setActiveView("startup_profile")}
                      className="text-xs font-mono font-semibold text-[#0F3854] hover:underline flex items-center gap-1"
                    >
                      <span>View Startup Profile</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setRole("startup");
                        applyToChallengeAction(startup.id);
                      }}
                      className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Apply for Pilot as {startup.name.split(" ")[0]}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

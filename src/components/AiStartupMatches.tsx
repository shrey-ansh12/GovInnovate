"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Filter,
  Building,
  Cpu,
  FileText
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              AI Semantic Matching Engine • 12 Startups Discovered
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Matched Startups for: {challenge.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Filtered against national DPIIT startup database, CPCB hardware benchmarks, and verified patent portfolios.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilter("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "All" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              All (4)
            </button>
            <button
              onClick={() => setSelectedFilter("High Match (>80%)")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "High Match (>80%)" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              High Match (94% Top)
            </button>
            <button
              onClick={() => setSelectedFilter("DPIIT Verified")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "DPIIT Verified" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
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
              className={`bg-white rounded-2xl border transition-all p-6 ${
                isTopMatch 
                  ? "border-blue-400 shadow-md ring-1 ring-blue-400/30" 
                  : "border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{startup.name}</h2>
                    {startup.isDpiitVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <ShieldCheck className="h-3 w-3" />
                        DPIIT Verified: {startup.dpiitNumber}
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Inc. {startup.incorporationYear}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {startup.location}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{startup.tagline}</p>
                </div>

                {/* Match Score Gauge */}
                <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-blue-700">
                      {startup.matchScore}%
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      AI Match Score
                    </div>
                  </div>
                  <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        startup.matchScore >= 90 ? "bg-emerald-500" : startup.matchScore >= 70 ? "bg-blue-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${startup.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Match Reasons & Tech Overview */}
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    AI Match Drivers & Qualifications
                  </h4>
                  <ul className="space-y-1.5">
                    {startup.matchReasons.map((reason, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {startup.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Risk Detection & Products */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className={`h-3.5 w-3.5 ${startup.riskAnalysis.level === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`} />
                    AI Risk & Technical Assessment (Risk: {startup.riskAnalysis.level})
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    {startup.riskAnalysis.factors.map((factor, idx) => (
                      <p key={idx} className="leading-relaxed">• {factor}</p>
                    ))}
                    <p className="text-[11px] text-slate-400 mt-2">
                      Patents Filed: <strong className="text-slate-700">{startup.patents} Indian Patents</strong> | Readiness: <strong className="text-slate-700">TRL-8 Field Proven</strong>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <button
                      onClick={() => setActiveView("startup_profile")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Inspect Full Tech Dossier <ExternalLink className="h-3.5 w-3.5" />
                    </button>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setRole("startup");
                          applyToChallengeAction(startup.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        Apply for Pilot as {startup.name.split(" ")[0]}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
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

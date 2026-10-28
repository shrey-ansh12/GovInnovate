"use client";

import { Challenge } from "@/types";
import React, { useMemo } from "react";
import { useApp, ActiveView } from "@/context/AppContext";
import { calculateStartupMatch } from "@/lib/matchingEngine";

import { 
  Building2, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Scale,
  Award,
  Blocks,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  Globe,
  LogOut
} from "lucide-react";

export const GovernmentDashboard: React.FC = () => {
  const { challenge, challenges, selectChallenge, applications, startups, pilot, setActiveView, logoutUser, currentUser } = useApp();

  const approvedMilestonesCount = pilot.milestones.filter(m => m.status === "Approved").length;

  const lifecycleSteps: { num: number; label: string; view: ActiveView; done: boolean }[] = [
    { num: 1, label: "Challenge Created", view: "create_challenge", done: true },
    { num: 2, label: "Rule-Based Matching", view: "ai_startup_matches", done: true },
    { num: 3, label: "Bids & Shortlisting", view: "application_review", done: true },
    { num: 4, label: "5-Pillar Evaluation", view: "evaluation_scorecard", done: true },
    { num: 5, label: "Pilot Monitoring", view: "pilot_management", done: true },
    { num: 6, label: "Scale Decision", view: "scale_up", done: challenge.status === "Scale-Up Approved" || challenge.status === "Further Review" || challenge.status === "Rejected" },
  ];

  // Top matching startups for the currently selected challenge
  const topMatchedForActiveChallenge = useMemo(() => {
    return [...startups]
      .filter(s => s.matchScore >= 80)
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [startups]);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8 font-sans space-y-6">
      {/* Top Banner / Hero */}
      <div className="bg-[#0F3854] text-white rounded-xl p-6 sm:p-8 border border-[#1D4E72] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Building2 className="h-4 w-4" />
            Public Procurement Innovation Desk • GFR Sandbox Rails
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Government Department Procurement Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Publish procurement challenges, review DPIIT startup bids, perform side-by-side comparisons, oversee 90-day sandbox pilots, and record scale decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView("create_challenge")}
            className="px-5 py-2.5 rounded-lg bg-white text-[#0F3854] font-bold text-xs hover:bg-slate-100 flex items-center gap-2 transition-colors shadow-2xs"
          >
            <PlusCircle className="h-4 w-4 text-[#0F3854]" />
            <span>Create New Challenge</span>
          </button>
          <button
            onClick={() => setActiveView("ai_startup_matches")}
            className="px-4 py-2.5 rounded-lg bg-[#147452] hover:bg-[#0f583e] text-white font-semibold text-xs border border-emerald-400/30 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span>AI Startup Matches ({startups.length})</span>
          </button>
          <button
            onClick={() => setActiveView("audit_trail")}
            className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-white/10 text-white font-semibold text-xs border border-white/30 transition-colors flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-emerald-300" />
            <span>Vigilance Audit Trail</span>
          </button>
          {currentUser && (
            <button
              onClick={logoutUser}
              className="px-3.5 py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold text-xs border border-red-400/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from Government Workspace"
            >
              <LogOut className="h-4 w-4 text-red-300" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary KPI Row (Data-driven from state) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveView("ai_startup_matches")}
          className="bg-white p-5 rounded-xl border border-[#E2DED6] shadow-2xs cursor-pointer hover:border-[#0F3854] transition-colors"
          title="Click to browse startup directory and matches"
        >
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">Active Challenge</div>
          <div className="text-2xl font-bold text-[#0A2540] truncate">{challenge.status}</div>
          <div className="text-[11px] text-[#0F3854] font-semibold mt-1 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F3854]"></span> {topMatchedForActiveChallenge.length} High Matches Available &rarr;
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2DED6] shadow-2xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">Proposals Submitted</div>
          <div className="text-2xl font-bold text-[#0F3854]">{applications.length} Bids</div>
          <div className="text-[11px] text-[#147452] font-semibold mt-1 flex items-center gap-1 font-mono">
            <ShieldCheck className="h-3 w-3" /> DPIIT Recognized
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2DED6] shadow-2xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">Milestones Verified</div>
          <div className="text-2xl font-bold text-[#147452]">{approvedMilestonesCount} / {pilot.milestones.length}</div>
          <div className="text-[11px] text-[#147452] font-semibold mt-1 flex items-center gap-1 font-mono">
            <CheckCircle2 className="h-3 w-3" /> Score: {pilot.overallScore} / 100
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2DED6] shadow-2xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">Pilot Locations</div>
          <div className="text-2xl font-bold text-[#0A2540]">{pilot.locationsCount} Sites</div>
          <div className="text-[11px] text-[#5B6A78] font-mono mt-1">
            Expansion Target: {pilot.scaleLocationsCount || 50} Zones
          </div>
        </div>
      </div>

      {/* 2B. ALL PUBLISHED CHALLENGES LIST */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 mb-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE9E1] pb-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0A2540]">
              Active Procurement Challenges ({challenges.length})
            </h2>
            <p className="text-xs text-[#5B6A78] mt-0.5">
              Live tenders published in the National Innovation Sandbox. Select any challenge to immediately view distinct matching startups.
            </p>
          </div>
          <button
            onClick={() => setActiveView("create_challenge")}
            className="px-3.5 py-2 rounded bg-[#0F3854] text-white hover:bg-[#1D4E72] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <span>+ Create New Challenge</span>
          </button>
        </div>

        <div className="space-y-3">
          {challenges.map((c: Challenge) => {
            const isSelected = c.id === challenge.id;
            const bidsCount = applications.filter(a => a.challengeId === c.id).length;
            const matchedCount = startups.filter(s => calculateStartupMatch(s, c).matchScore >= 80).length;

            return (
              <div
                key={c.id}
                onClick={() => selectChallenge(c.id)}
                className={`p-4 rounded border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isSelected 
                    ? "bg-[#FAF8F5] border-[#0F3854] ring-2 ring-[#0F3854]/30 shadow-xs" 
                    : "bg-white border-[#E2DED6] hover:border-[#0F3854]"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] uppercase">
                      {c.status || "published"}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0F3854]">{c.id}</span>
                    <span className="text-xs text-[#5B6A78]">• {c.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0A2540]">{c.title}</h3>
                  <p className="text-xs text-[#5B6A78]">
                    {c.department} ({c.ministry}) • Allocation: <strong className="text-[#0A2540]">{c.budget}</strong> • Pilot Duration: {c.pilotDuration}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-emerald-600" />
                      {matchedCount} Startups Matched (≥80%)
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">
                      {bidsCount} Bids Submitted
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectChallenge(c.id);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                      isSelected 
                        ? "bg-[#0F3854] text-white border-[#0F3854] shadow-xs" 
                        : "bg-white hover:bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]"
                    }`}
                  >
                    {isSelected ? "Active Tender ✓" : "Select Challenge"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectChallenge(c.id);
                      setActiveView("ai_startup_matches");
                    }}
                    className="px-3 py-1.5 rounded bg-[#147452] hover:bg-[#0f583e] text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors"
                    title="Inspect matched startups for this challenge"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
                    <span>View Matches ({matchedCount}) →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2C. DEDICATED INLINE AI MATCHED STARTUPS PANEL */}
      <div className="bg-white rounded-xl border-2 border-[#147452]/40 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE9E1]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#147452] uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4 text-[#147452]" />
              AI Matching Engine • Top Ranked Candidates for Active Challenge
            </div>
            <h2 className="text-xl font-bold text-[#0A2540]">
              Matching Startups for: {challenge.title}
            </h2>
            <p className="text-xs text-[#5B6A78] mt-0.5">
              Category: <strong className="text-[#0F3854]">{challenge.category}</strong> • Department: {challenge.department} ({challenge.ministry})
            </p>
          </div>
          <button
            onClick={() => setActiveView("ai_startup_matches")}
            className="px-4 py-2 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
          >
            <span>Open Full Match Directory & Filters ({startups.length})</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Grid of Top Matching Startups for this challenge */}
        {topMatchedForActiveChallenge.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#5B6A78]">
            No high-match startups found for this challenge threshold.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {topMatchedForActiveChallenge.map((s) => (
              <div 
                key={s.id} 
                className="p-4 rounded-lg border border-[#E2DED6] hover:border-[#0F3854] bg-[#FAF8F5] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      {s.matchScore}% Match
                    </span>
                    <span className="text-[10px] font-mono text-[#5B6A78]">
                      TRL-{s.trlLevel || 7} • {s.localContentPercentage || 60}% Domestic
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0A2540]">{s.name}</h4>
                  <div className="text-[10px] font-mono text-[#0F3854] bg-white border border-[#E2DED6] px-1.5 py-0.5 rounded inline-block mt-1">
                    {s.sector?.split(";")[0]?.trim()}
                  </div>
                  <p className="text-xs text-[#5B6A78] line-clamp-2 mt-2 leading-relaxed">
                    {s.potentialUseCase || s.publicCapabilitySummary || s.tagline}
                  </p>
                  <div className="mt-2.5 p-2 rounded bg-white border border-[#EDE9E1] text-[11px] text-[#147452] font-mono">
                    <span className="font-bold block text-[10px] uppercase text-[#0F3854]">Match Rationale:</span>
                    <span className="line-clamp-2">{s.matchReasons?.[0] || "Strong sector alignment"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE9E1] flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-[#5B6A78]">
                    {s.isDpiitVerified ? (
                      <span className="text-emerald-700 font-semibold">✓ DPIIT Verified</span>
                    ) : s.isPublicDirectoryEntry ? (
                      <span className="text-sky-700 font-semibold">Public Profile</span>
                    ) : (
                      "Self-reported"
                    )}
                  </span>
                  <button
                    onClick={() => setActiveView("ai_startup_matches")}
                    className="text-[#0F3854] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Challenge Lifecycle Pipeline Card */}
      <div className="bg-white rounded-xl border border-[#E2DED6] p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#EDE9E1] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] px-2.5 py-0.5 rounded">
                Active Sandbox Track
              </span>
              <span className="text-xs font-mono text-[#5B6A78]">ID: {challenge.id}</span>
              {challenge.blockchainTx && (
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <Blocks className="h-3 w-3" /> Block #{challenge.blockNumber || 10842}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] mt-2">
              {challenge.title}
            </h2>
            <p className="text-xs text-[#5B6A78] mt-1">
              {challenge.department} ({challenge.ministry}) • Budget: <strong className="text-[#0A2540]">{challenge.budget}</strong> • Category: <strong className="text-[#0F3854]">{challenge.category}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("application_review")}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#FAF8F5] text-[#0A2540] hover:bg-[#E2DED6] transition-colors border border-[#E2DED6] shadow-2xs"
            >
              Review Proposals ({applications.length})
            </button>
            <button
              onClick={() => setActiveView("pilot_management")}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F3854] text-white hover:bg-[#1D4E72] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Manage Pilot Sandbox</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Procurement Step by Step Visual Bar */}
        <div className="mt-8">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-4">
            End-to-End Procurement Lifecycle Progression
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {lifecycleSteps.map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveView(step.view)}
                className={`p-3 rounded-lg border text-center cursor-pointer transition-all hover:border-[#0F3854] ${
                  step.done 
                    ? "bg-[#FAF8F5] border-[#0F3854] text-[#0A2540]" 
                    : "bg-[#F2EFEB] border-[#E2DED6] text-[#7E8B97]"
                }`}
              >
                <div className={`w-5 h-5 mx-auto rounded-full text-[10px] font-mono font-bold flex items-center justify-center mb-1.5 ${
                  step.done ? "bg-[#0F3854] text-white" : "bg-[#E2DED6] text-[#5B6A78]"
                }`}>
                  {step.done ? "✓" : step.num}
                </div>
                <p className="text-[11px] font-semibold leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Pilot Metrics Snippet */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 pt-6 border-t border-[#EDE9E1]">
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#5B6A78]">Contractor Startup</span>
            <p className="text-sm font-bold text-[#0A2540] mt-1">{topMatchedForActiveChallenge[0]?.name || "AquaSense AI Innovations Pvt Ltd"}</p>
            <p className="text-xs text-[#147452] font-mono mt-0.5">{topMatchedForActiveChallenge[0]?.dpiitNumber || "DPIIT-REC-89241-DL"} (TRL-{topMatchedForActiveChallenge[0]?.trlLevel || 8})</p>
          </div>

          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#5B6A78]">Pilot Telemetry Uptime</span>
            <p className="text-sm font-bold text-[#0A2540] mt-1">{challenge.targetLocations || 5} Intake Monitoring Sites</p>
            <p className="text-xs text-[#0F3854] font-mono mt-0.5">99.8% Hardware Uptime</p>
          </div>

          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E2DED6]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#5B6A78]">Next Step</span>
            <p className="text-sm font-bold text-[#0A2540] mt-1">Competent Authority Review</p>
            <p className="text-xs text-[#0A2540] font-mono mt-0.5">Status: {challenge.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

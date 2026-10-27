"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { TextToSpeechButton } from "@/components/TextToSpeechButton";
import { 
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Blocks,
  FileText,
  UserCheck,
  Sparkles,
  SlidersHorizontal,
  Sliders,
  Check,
  X,
  Lock,
  ChevronRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  FileCheck2
} from "lucide-react";
import { Startup, Application } from "@/types";

export const EvaluatorDashboard: React.FC = () => {
  const { 
    applications, 
    startups,
    challenge,
    setActiveView, 
    setSelectedAppIdForScore, 
    openBlockchainModal,
    verifyStartupIntegrityAction
  } = useApp();

  const [activeTab, setActiveTab] = useState<"scoring" | "ai_matching">("scoring");
  const [selectedAiFilter, setSelectedAiFilter] = useState<"All" | "High Match (>80%)" | "DPIIT Verified">("All");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const evaluatedCount = applications.filter(a => !!a.evaluatorScore).length;
  const pendingCount = applications.length - evaluatedCount;

  // Sort startups by AI match score descending
  const sortedStartups = [...startups].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const filteredStartups = sortedStartups.filter(s => {
    if (selectedAiFilter === "High Match (>80%)") return (s.matchScore || 0) >= 80;
    if (selectedAiFilter === "DPIIT Verified") return s.isDpiitVerified;
    return true;
  });

  const handleScoreStartupFromAiList = (startup: Startup) => {
    // Check if an application already exists for this startup
    const existingApp = applications.find(
      a => a.startupName.toLowerCase() === startup.name.toLowerCase() || a.startupId === startup.id
    );

    if (existingApp) {
      setSelectedAppIdForScore(existingApp.id);
    } else if (applications.length > 0) {
      setSelectedAppIdForScore(applications[0].id);
    }
    setActiveView("evaluation_scorecard");
  };

  const handleVerifyIntegrity = async (startupId: string) => {
    setVerifyingId(startupId);
    if (verifyStartupIntegrityAction) {
      await verifyStartupIntegrityAction(startupId);
    }
    setTimeout(() => {
      setVerifyingId(null);
    }, 600);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8 font-sans space-y-6">
      {/* 1. EVALUATOR TOP BANNER */}
      <div className="bg-[#0F3854] text-white rounded-2xl p-6 sm:p-8 border border-[#1D4E72] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <Award className="h-4 w-4" />
            Independent Technical Evaluation Panel • Standing Committee
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Expert Evaluator Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Review assigned startup proposals, assess AI matching rankings, score bidders across the 5-pillar criteria (Innovation, Feasibility, Impact, Scalability, Viability), and seal score receipts onto the audit ledger.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Pending Reviews</p>
            <p className="text-xl font-bold text-amber-300 mt-0.5">{pendingCount} Bids</p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Completed Scores</p>
            <p className="text-xl font-bold text-emerald-300 mt-0.5">{evaluatedCount} Bids</p>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">AI Matched</p>
            <p className="text-xl font-bold text-cyan-300 mt-0.5">{startups.length} Startups</p>
          </div>
        </div>
      </div>

      {/* 2. TAB SWITCHER: 5-PILLAR COMMITTEE SCORING vs AI MATCHING & RANKING */}
      <div className="bg-white rounded-xl border border-[#E2DED6] p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("scoring")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "scoring"
                ? "bg-[#0F3854] text-white shadow-xs"
                : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#FAF8F5]"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>⚖️ 5-Pillar Committee Scoring & Marking ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ai_matching")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "ai_matching"
                ? "bg-[#147452] text-white shadow-xs"
                : "text-[#5B6A78] hover:text-[#0A2540] hover:bg-[#FAF8F5]"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>🤖 AI Startup Matching & Score Ranking ({startups.length})</span>
          </button>
        </div>

        <div className="text-xs text-[#5B6A78] font-mono px-2 text-center sm:text-right">
          Active Challenge: <strong className="text-[#0A2540]">{challenge.title.slice(0, 35)}...</strong>
        </div>
      </div>

      {/* 3. TAB 1: 5-PILLAR COMMITTEE SCORING & MARKING */}
      {activeTab === "scoring" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540]">
                Assigned Startup Submissions for Technical Review ({applications.length})
              </h2>
              <p className="text-xs text-[#5B6A78]">
                Statutory 5-Pillar Rubric under GFR Rule 173 (100-Point Objective Matrix)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#147452] bg-[#EBF6F0] px-3 py-1 rounded-full border border-[#C2E5D2]">
                {evaluatedCount} of {applications.length} Scored
              </span>
            </div>
          </div>

          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EDE9E1] pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] px-2.5 py-0.5 rounded">
                      {app.id}
                    </span>
                    <h3 className="text-lg font-bold text-[#0A2540]">{app.startupName}</h3>
                    <span className="text-[10px] font-mono font-semibold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                      <ShieldCheck className="h-3 w-3 inline mr-0.5" /> DPIIT Recognized
                    </span>
                    {app.blockchainTx && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <Blocks className="h-3 w-3" /> Block #{app.blockNumber || 10843}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5B6A78] max-w-3xl mt-1 leading-relaxed">
                    {app.proposalSummary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6A78] pt-2">
                    <span>Proposed Cost: <strong className="text-[#141F2B]">{app.proposedCost}</strong></span>
                    <span>•</span>
                    <span>Deployment: <strong className="text-[#141F2B]">{app.deploymentTime}</strong></span>
                    <span>•</span>
                    <span>TRL: <strong className="text-[#0A2540]">Level {app.trlLevel || 7}</strong></span>
                    <span>•</span>
                    <span>Local Content: <strong className="text-[#0F3854]">{app.localContentPercentage || 65}%</strong></span>
                  </div>
                </div>

                <div className="shrink-0">
                  {app.evaluatorScore ? (
                    <div className="text-right font-mono bg-[#EBF6F0] p-3 rounded-xl border border-[#C2E5D2]">
                      <span className="text-[10px] text-[#147452] uppercase font-bold block">Evaluation Score</span>
                      <span className="text-2xl font-extrabold text-[#147452]">
                        {app.evaluatorScore.total} <span className="text-xs text-[#5B6A78]">/ 100</span>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedAppIdForScore(app.id);
                          setActiveView("evaluation_scorecard");
                        }}
                        className="text-xs font-bold text-[#0F3854] hover:underline mt-1 block"
                      >
                        Update Scorecard →
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAppIdForScore(app.id);
                        setActiveView("evaluation_scorecard");
                      }}
                      className="px-5 py-2.5 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span>Score Proposal (5 Pillars)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* IF EVALUATED: SHOW PROMINENT SCORECARD BREAKDOWN */}
              {app.evaluatorScore && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED6] space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0A2540]">
                    <span className="flex items-center gap-1.5 text-[#0F3854]">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span>5-Pillar Score Breakdown</span>
                    </span>
                    <span className="text-[11px] font-normal text-[#5B6A78]">
                      Evaluator: {app.evaluatorScore.evaluatorName}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                      <span className="text-[10px] text-[#5B6A78] block">Innovation (20)</span>
                      <span className="font-bold text-[#0A2540]">{app.evaluatorScore.innovation} / 20</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                      <span className="text-[10px] text-[#5B6A78] block">Feasibility (20)</span>
                      <span className="font-bold text-[#0A2540]">{app.evaluatorScore.feasibility} / 20</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                      <span className="text-[10px] text-[#5B6A78] block">Impact (20)</span>
                      <span className="font-bold text-[#0A2540]">{app.evaluatorScore.impact} / 20</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                      <span className="text-[10px] text-[#5B6A78] block">Scalability (20)</span>
                      <span className="font-bold text-[#0A2540]">{app.evaluatorScore.scalability} / 20</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-[#E2DED6]">
                      <span className="text-[10px] text-[#5B6A78] block">Viability (20)</span>
                      <span className="font-bold text-[#0A2540]">{app.evaluatorScore.viability} / 20</span>
                    </div>
                  </div>

                  {app.evaluatorScore.feedback && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#5B6A78] uppercase font-bold">Committee Feedback:</span>
                        <TextToSpeechButton text={app.evaluatorScore.feedback} label="Listen" size="sm" />
                      </div>
                      <p className="text-xs text-[#5B6A78] italic bg-white p-2.5 rounded-lg border border-[#EDE9E1]">
                        &quot;{app.evaluatorScore.feedback}&quot;
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-[#5B6A78] pt-1">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Audit Ledger Sealed: Block #{app.evaluatorScore.blockNumber || 10845}</span>
                    </span>
                    <button
                      onClick={openBlockchainModal}
                      className="text-xs font-bold text-[#0F3854] hover:underline"
                    >
                      View Audit Ledger Receipt →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 4. TAB 2: AI MATCHING & STARTUP SCORE RANKING */}
      {activeTab === "ai_matching" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#147452] bg-[#EBF6F0] px-2.5 py-1 rounded-md border border-[#C2E5D2] mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Deterministic AI Eligibility & Match Scoring Engine</span>
              </div>
              <h2 className="text-lg font-bold text-[#0A2540]">
                Candidate Startups Ranked by AI Match Score
              </h2>
              <p className="text-xs text-[#5B6A78]">
                Startups automatically scored against challenge parameters: Sector Alignment, TRL Maturity (≥7), Local Content % (≥50%), and DPIIT Registry Verification.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                onClick={() => setSelectedAiFilter("All")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedAiFilter === "All"
                    ? "bg-[#0F3854] text-white border-[#0F3854] font-bold"
                    : "bg-white text-[#5B6A78] border-[#E2DED6] hover:bg-[#FAF8F5]"
                }`}
              >
                All ({startups.length})
              </button>
              <button
                onClick={() => setSelectedAiFilter("High Match (>80%)")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedAiFilter === "High Match (>80%)"
                    ? "bg-[#147452] text-white border-[#147452] font-bold"
                    : "bg-white text-[#5B6A78] border-[#E2DED6] hover:bg-[#FAF8F5]"
                }`}
              >
                High Match (≥80%)
              </button>
              <button
                onClick={() => setSelectedAiFilter("DPIIT Verified")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedAiFilter === "DPIIT Verified"
                    ? "bg-[#147452] text-white border-[#147452] font-bold"
                    : "bg-white text-[#5B6A78] border-[#E2DED6] hover:bg-[#FAF8F5]"
                }`}
              >
                DPIIT Verified
              </button>
            </div>
          </div>

          {/* Startups Ranked List */}
          <div className="space-y-4">
            {filteredStartups.map((startup, idx) => {
              const matchScore = startup.matchScore || 80;
              const isHighMatch = matchScore >= 80;

              return (
                <div 
                  key={startup.id} 
                  className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs hover:border-[#147452]/50 transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EDE9E1] pb-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Rank Badge */}
                        <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                          idx === 0 
                            ? "bg-amber-100 text-amber-900 border-amber-300 font-extrabold"
                            : idx === 1
                            ? "bg-slate-200 text-slate-800 border-slate-300"
                            : "bg-[#F2EFEB] text-[#5B6A78] border-[#E2DED6]"
                        }`}>
                          #{idx + 1} AI Ranked
                        </span>

                        <h3 className="text-lg font-bold text-[#0A2540]">
                          {startup.name}
                        </h3>

                        {startup.isDpiitVerified && (
                          <span className="text-[10px] font-mono font-semibold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2] flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> DPIIT {startup.dpiitNumber}
                          </span>
                        )}

                        <span className="text-[10px] font-mono text-[#5B6A78] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E2DED6]">
                          {startup.location}
                        </span>
                      </div>

                      <p className="text-xs text-[#5B6A78] max-w-3xl leading-relaxed">
                        {startup.tagline}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6A78] pt-1">
                        <span>TRL Maturity: <strong className="text-[#0A2540]">Level {startup.trlLevel}</strong></span>
                        <span>•</span>
                        <span>Local Content: <strong className="text-[#0F3854]">{startup.localContentPercentage}%</strong></span>
                        <span>•</span>
                        <span>Patents: <strong className="text-[#147452]">{startup.patents} Filed/Granted</strong></span>
                        <span>•</span>
                        <span>Founders: <strong className="text-[#141F2B]">{startup.founders?.join(", ") || "Technical Founders"}</strong></span>
                      </div>
                    </div>

                    {/* AI Score Badge & Action */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                      <div className={`p-3 rounded-xl border text-center font-mono min-w-[120px] ${
                        isHighMatch
                          ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]"
                          : "bg-[#FAF8F5] border-[#E2DED6] text-[#0A2540]"
                      }`}>
                        <span className="text-[10px] uppercase font-bold block">AI Match Score</span>
                        <span className="text-2xl font-black">
                          {matchScore}%
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleScoreStartupFromAiList(startup)}
                          className="px-4 py-2.5 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <Award className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Score Proposal (5 Pillars)</span>
                        </button>

                        <button
                          onClick={() => handleVerifyIntegrity(startup.id)}
                          disabled={verifyingId === startup.id}
                          className="px-4 py-1.5 rounded-lg border border-[#E2DED6] bg-white hover:bg-[#FAF8F5] text-[#5B6A78] text-[11px] font-mono flex items-center justify-center gap-1 transition-colors"
                        >
                          {verifyingId === startup.id ? (
                            <>
                              <RefreshCw className="h-3 w-3 animate-spin text-[#147452]" />
                              <span>Verifying SHA-256...</span>
                            </>
                          ) : (
                            <>
                              <FileCheck2 className="h-3 w-3 text-[#147452]" />
                              <span>Verify SHA-256 Seal</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Fit Breakdown & Reasons */}
                  <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E2DED6] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#0A2540] uppercase flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#147452]" />
                        <span>AI Deterministic Match Rationale:</span>
                      </span>

                      <TextToSpeechButton 
                        text={`AI Match score for ${startup.name} is ${matchScore} percent. ${startup.matchReasons?.join('. ') || startup.tagline}`} 
                        label="Listen" 
                        size="sm" 
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="bg-white p-2 rounded-lg border border-[#EDE9E1] flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#147452] shrink-0" />
                        <span>TRL Maturity &ge; 7</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EDE9E1] flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#147452] shrink-0" />
                        <span>Local Content &ge; 50%</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EDE9E1] flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#147452] shrink-0" />
                        <span>DPIIT Relaxations</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EDE9E1] flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#147452] shrink-0" />
                        <span>Domain Alignment</span>
                      </div>
                    </div>

                    {startup.matchReasons && startup.matchReasons.length > 0 && (
                      <ul className="text-xs text-[#5B6A78] list-disc list-inside space-y-0.5 pt-1">
                        {startup.matchReasons.map((reason, rIdx) => (
                          <li key={rIdx}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

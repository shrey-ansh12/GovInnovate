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
  X,
  Lock,
  RefreshCw,
  FileCheck2,
  AlertOctagon
} from "lucide-react";
import { Startup } from "@/types";

export const AiStartupMatches: React.FC = () => {
  const { 
    startups, 
    challenge, 
    setActiveView, 
    applyToChallengeAction, 
    setRole,
    verifyStartupIntegrityAction,
    clearTamperFlagAction,
    flagStartupForReviewAction,
    role
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<"All" | "High Match (>80%)" | "DPIIT Verified" | "Flagged for Review">("All");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [auditModalStartup, setAuditModalStartup] = useState<Startup | null>(null);

  const filtered = startups.filter(s => {
    if (selectedFilter === "High Match (>80%)") return s.matchScore >= 80;
    if (selectedFilter === "DPIIT Verified") return s.isDpiitVerified;
    if (selectedFilter === "Flagged for Review") return s.tamperStatus === "FLAGGED_FOR_REVIEW";
    return true;
  });

  const handleVerifyIntegrity = async (startupId: string) => {
    setVerifyingId(startupId);
    await verifyStartupIntegrityAction(startupId);
    setTimeout(() => {
      setVerifyingId(null);
    }, 600);
  };

  const handleClearFlag = async (startupId: string) => {
    await clearTamperFlagAction(startupId);
    setAuditModalStartup(null);
  };

  const handleFlagForReview = (startupId: string) => {
    const reason = prompt("Enter vigilance review rationale:", "Unverified change in TRL / Local Content metrics outside formal audit.");
    if (reason) {
      flagStartupForReviewAction(startupId, reason);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 mb-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
              <SlidersHorizontal className="h-4 w-4 text-[#147452]" />
              Dynamic Eligibility & Cryptographic Matching Engine
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540] tracking-tight">
              Matched Startups for: {challenge.title}
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              Objective evaluation across 4 deterministic rules: Sector Alignment, TRL Maturity (≥7), Local Content % (≥50%), and DPIIT Registry Verification with SHA-256 tamper detection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
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
            <button
              onClick={() => setSelectedFilter("Flagged for Review")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "Flagged for Review" ? "bg-red-700 text-white font-semibold" : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"}`}
            >
              Flagged for Review ({startups.filter(s => s.tamperStatus === "FLAGGED_FOR_REVIEW").length})
            </button>
          </div>
        </div>
      </div>

      {/* Startups List */}
      <div className="space-y-6">
        {filtered.map((startup) => {
          const isTopMatch = startup.matchScore >= 90;
          const isFlagged = startup.tamperStatus === "FLAGGED_FOR_REVIEW";
          const isVerifying = verifyingId === startup.id;

          return (
            <div
              key={startup.id}
              className={`bg-white rounded border transition-all p-6 ${
                isFlagged
                  ? "border-2 border-red-500 bg-red-50/20"
                  : isTopMatch 
                  ? "border-2 border-[#0F3854]" 
                  : "border-[#E2DED6] hover:border-[#0F3854]"
              }`}
            >
              {/* VIGILANCE ALERT BANNER (If Flagged for Review) */}
              {isFlagged && (
                <div className="mb-4 p-3.5 rounded bg-red-100 border border-red-300 text-xs text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                  <div className="flex items-start gap-2.5">
                    <AlertOctagon className="h-4 w-4 shrink-0 text-red-700 mt-0.5" />
                    <div>
                      <strong className="text-red-950 font-bold uppercase tracking-wide">
                        [FLAGGED FOR REVIEW • SHA-256 INTEGRITY ALERT]
                      </strong>
                      <p className="text-[11px] text-red-800 mt-0.5">
                        {startup.tamperAuditNote || "Cryptographic SHA-256 hash divergence detected between registered genesis parameters and current record."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setAuditModalStartup(startup)}
                      className="px-3 py-1 bg-red-800 hover:bg-red-900 text-white rounded text-xs font-semibold"
                    >
                      Inspect Audit Trail
                    </button>
                  </div>
                </div>
              )}

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

                    {/* SHA-256 Integrity Badge */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isFlagged
                        ? "bg-red-100 text-red-800 border-red-300 font-bold animate-pulse"
                        : "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]"
                    }`}>
                      <Lock className="h-3 w-3" />
                      {isFlagged ? "SHA-256 Mismatch Flagged" : `SHA-256: ${startup.canonicalHash?.slice(0, 8)}...`}
                    </span>

                    <span className="text-[10px] font-mono text-[#5B6A78] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      Inc. {startup.incorporationYear}
                    </span>
                    <span className="text-[10px] font-mono text-[#5B6A78] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      {startup.location}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78]">{startup.tagline}</p>
                </div>

                {/* Match Score Gauge & Quick Verify */}
                <div className="flex items-center gap-4 bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] shrink-0 font-mono">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0A2540]">
                      {startup.matchScore}%
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-[#5B6A78]">
                      Dynamic Fit
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
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78]">
                    Explainable Rule Criteria Matrix
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerifyIntegrity(startup.id)}
                      disabled={isVerifying}
                      className="text-[11px] font-mono font-semibold text-[#0F3854] hover:underline inline-flex items-center gap-1"
                      title="Recompute and compare current fields against genesis hash"
                    >
                      <RefreshCw className={`h-3 w-3 ${isVerifying ? "animate-spin" : ""}`} />
                      <span>{isVerifying ? "Verifying..." : "Verify Record Hash"}</span>
                    </button>
                    {role === "government" && !isFlagged && (
                      <button
                        onClick={() => handleFlagForReview(startup.id)}
                        className="text-[11px] font-mono text-red-700 hover:underline"
                      >
                        [Flag for Review]
                      </button>
                    )}
                  </div>
                </div>

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
                    Dynamic Rule Match Drivers & Qualifications
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

      {/* INSPECT AUDIT & RE-ANCHOR MODAL */}
      {auditModalStartup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#E2DED6] max-w-2xl w-full p-6 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <div className="flex items-center gap-2 text-red-800 font-bold">
                <AlertOctagon className="h-5 w-5 text-red-600" />
                <span>Vigilance Integrity Audit: {auditModalStartup.name}</span>
              </div>
              <button 
                onClick={() => setAuditModalStartup(null)}
                className="text-[#7E8B97] hover:text-[#141F2B]"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-red-50 p-3 rounded border border-red-200 text-red-900">
                <strong>Discrepancy Note:</strong>
                <p className="mt-1">{auditModalStartup.tamperAuditNote}</p>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded border border-[#E2DED6] space-y-1.5">
                <div>
                  <span className="text-[#7E8B97]">Genesis / Recorded Hash:</span>
                  <p className="font-bold text-[#0A2540] break-all">{auditModalStartup.canonicalHash || "Unrecorded"}</p>
                </div>
                <div>
                  <span className="text-[#7E8B97]">Current Computed SHA-256 Hash:</span>
                  <p className="font-bold text-red-700 break-all">{auditModalStartup.currentHash || "Diverged"}</p>
                </div>
              </div>

              {auditModalStartup.documentRecord && (
                <div className="bg-[#FAF8F5] p-3 rounded border border-[#E2DED6] space-y-1">
                  <span className="font-bold text-[#0A2540]">Associated Document Check:</span>
                  <p>Document: {auditModalStartup.documentRecord.fileName}</p>
                  <p>Extracted Entity: {auditModalStartup.documentRecord.extractedEntityName}</p>
                  <p>Extracted DPIIT Number: {auditModalStartup.documentRecord.extractedDpiitNumber}</p>
                  <p>Name Similarity: {auditModalStartup.documentRecord.nameSimilarityScore}%</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDE9E1]">
              <button
                onClick={() => setAuditModalStartup(null)}
                className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-[#5B6A78] hover:bg-[#F2EFEB]"
              >
                Close
              </button>
              {role === "government" && (
                <button
                  onClick={() => handleClearFlag(auditModalStartup.id)}
                  className="px-4 py-2 rounded bg-[#147452] hover:bg-[#0f583e] text-white font-bold"
                >
                  Verify Alterations & Re-Anchor Hash
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

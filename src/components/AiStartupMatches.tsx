"use client";

import React, { useState, useMemo } from "react";
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
  AlertOctagon,
  Search,
  Globe,
  Filter
} from "lucide-react";
import { Startup } from "@/types";

function isValidExternalUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

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

  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "High Match (>80%)" | "DPIIT Verified" | "Public Directory (Imported)" | "Flagged for Review"
  >("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [auditModalStartup, setAuditModalStartup] = useState<Startup | null>(null);

  // Derive unique sectors for filter dropdown
  const availableSectors = useMemo(() => {
    const set = new Set<string>();
    startups.forEach(s => {
      if (s.sector) {
        s.sector.split(";").forEach(sec => {
          const clean = sec.trim();
          if (clean.length > 0) set.add(clean);
        });
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [startups]);

  const filtered = useMemo(() => {
    return startups.filter(s => {
      // 1. Primary Tab Filter
      if (selectedFilter === "High Match (>80%)" && s.matchScore < 80) return false;
      if (selectedFilter === "DPIIT Verified" && !s.isDpiitVerified) return false;
      if (selectedFilter === "Public Directory (Imported)" && !s.isPublicDirectoryEntry) return false;
      if (selectedFilter === "Flagged for Review" && s.tamperStatus !== "FLAGGED_FOR_REVIEW") return false;

      // 2. Sector Filter
      if (selectedSector !== "All") {
        if (!s.sector || !s.sector.toLowerCase().includes(selectedSector.toLowerCase())) {
          return false;
        }
      }

      // 3. Search Query Filter (name, product, capabilities, tags, use cases)
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const searchCorpus = [
          s.name,
          s.tagline,
          s.sector || "",
          s.productOrSolution || "",
          s.publicCapabilitySummary || "",
          s.potentialUseCase || "",
          (s.techStack || []).join(" "),
          (s.matchTags || []).join(" ")
        ].join(" ").toLowerCase();

        if (!searchCorpus.includes(q)) return false;
      }

      return true;
    });
  }, [startups, selectedFilter, selectedSector, searchQuery]);

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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
              <SlidersHorizontal className="h-4 w-4 text-[#147452]" />
              Dynamic Eligibility & Cryptographic Matching Engine
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540] tracking-tight">
              Matched Startups for: {challenge.title}
            </h1>
            <p className="text-xs text-[#5B6A78] mt-1">
              Objective evaluation across 4 statutory criteria: Sector Alignment, TRL Readiness (≥7), Domestic Local Content (≥50%), and DPIIT Registry Verification with SHA-256 integrity detection.
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
              DPIIT Verified ({startups.filter(s => s.isDpiitVerified).length})
            </button>
            <button
              onClick={() => setSelectedFilter("Public Directory (Imported)")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "Public Directory (Imported)" ? "bg-sky-800 text-white font-semibold" : "bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100"}`}
            >
              Public Directory ({startups.filter(s => s.isPublicDirectoryEntry).length})
            </button>
            <button
              onClick={() => setSelectedFilter("Flagged for Review")}
              className={`px-3 py-1.5 rounded transition-colors ${selectedFilter === "Flagged for Review" ? "bg-red-700 text-white font-semibold" : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"}`}
            >
              Flagged ({startups.filter(s => s.tamperStatus === "FLAGGED_FOR_REVIEW").length})
            </button>
          </div>
        </div>

        {/* Search & Sector Filters Bar */}
        <div className="mt-5 pt-4 border-t border-[#EDE9E1] grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-8 relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-[#5B6A78]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, capability keywords (e.g. OCR, extraction, biometrics, KYC, tampering)..."
              className="w-full pl-9 pr-8 py-2 rounded border border-[#E2DED6] bg-[#FAF8F5] text-[#0A2540] placeholder:text-[#5B6A78] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-[#5B6A78] hover:text-[#0A2540]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#5B6A78] shrink-0" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2 px-2.5 rounded border border-[#E2DED6] bg-[#FAF8F5] text-[#0A2540] font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
            >
              <option value="All">All Sectors ({startups.length})</option>
              {availableSectors.filter(s => s !== "All").map((sec, idx) => (
                <option key={idx} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary Results */}
        {(searchQuery || selectedSector !== "All" || selectedFilter !== "All") && (
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#5B6A78] font-mono">
            <span>Showing {filtered.length} of {startups.length} startup profiles</span>
            <button
              onClick={() => {
                setSelectedFilter("All");
                setSearchQuery("");
                setSelectedSector("All");
              }}
              className="text-[#0F3854] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Startups List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="bg-white rounded border border-[#E2DED6] p-12 text-center text-[#5B6A78] space-y-2">
            <p className="font-semibold text-sm text-[#0A2540]">No startups match your current search and filter criteria.</p>
            <p className="text-xs">Try clearing the search query or selecting &quot;All Sectors&quot;.</p>
            <button
              onClick={() => {
                setSelectedFilter("All");
                setSearchQuery("");
                setSelectedSector("All");
              }}
              className="mt-3 px-4 py-2 bg-[#0F3854] text-white rounded text-xs font-semibold"
            >
              View All Startups
            </button>
          </div>
        ) : (
          filtered.map((startup) => {
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
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-[#0A2540]">{startup.name}</h2>
                      
                      {/* HONEST VERIFICATION BADGES */}
                      {startup.isDpiitVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                          <ShieldCheck className="h-3 w-3" />
                          DPIIT Verified: {startup.dpiitNumber}
                        </span>
                      ) : startup.isPublicDirectoryEntry ? (
                        <span 
                          className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200"
                          title={startup.dataNotes || "Published company claim; requires direct validation"}
                        >
                          <Globe className="h-3 w-3 text-sky-600" />
                          {startup.verificationStatusNote || startup.verificationStage || "Public Profile Located"}
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

                      {startup.sector && (
                        <span className="text-[10px] font-mono text-[#0F3854] bg-[#EBF6F0]/60 border border-[#C2E5D2] px-2 py-0.5 rounded">
                          {startup.sector.split(";")[0]?.trim()}
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

                    {/* CLICKABLE SOURCE & WEBSITE LINKS */}
                    <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px]">
                      {isValidExternalUrl(startup.website) && (
                        <a
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#0F3854] hover:text-[#147452] hover:underline"
                          title={`Open ${startup.name} official website in a new tab`}
                        >
                          <Globe className="h-3 w-3" />
                          <span>Official Website</span>
                          <ExternalLink className="h-2.5 w-2.5 text-[#5B6A78]" />
                        </a>
                      )}

                      {isValidExternalUrl(startup.evidenceSourceUrl) && (
                        <a
                          href={startup.evidenceSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#147452] hover:underline"
                          title={`Open primary evidence source (${startup.sourceType || "Public Registry"}) in a new tab`}
                        >
                          <FileCheck2 className="h-3 w-3" />
                          <span>Primary Evidence Source</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}

                      {startup.sourceType && (
                        <span className="text-[10px] text-[#5B6A78]">
                          • Source: {startup.sourceType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Match Score Gauge & Quick Verify */}
                  <div className="flex items-center gap-4 bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] shrink-0 font-mono">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#0A2540]">
                        {startup.matchScore}%
                      </div>
                      <div className="text-[10px] uppercase font-semibold text-[#5B6A78]" title="System-generated relevance estimate">
                        Relevance Fit*
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

                {/* PUBLIC CAPABILITY SUMMARY & USE CASE (Real Dataset Feature) */}
                {(startup.publicCapabilitySummary || startup.potentialUseCase) && (
                  <div className="my-4 p-3.5 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs space-y-2">
                    {startup.potentialUseCase && (
                      <div>
                        <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#0F3854] block">
                          Potential GovInnovate Use Case:
                        </span>
                        <p className="text-[#141F2B] font-medium mt-0.5 leading-relaxed">{startup.potentialUseCase}</p>
                      </div>
                    )}
                    {startup.publicCapabilitySummary && (
                      <div className="pt-2 border-t border-[#EDE9E1]">
                        <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#5B6A78] block">
                          Public Capability Summary:
                        </span>
                        <p className="text-[#5B6A78] mt-0.5 leading-relaxed">{startup.publicCapabilitySummary}</p>
                      </div>
                    )}
                  </div>
                )}

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
                      <span>Sector / Capability</span>
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

                    {/* Match Tags & Tech Stack */}
                    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {startup.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-[#FAF8F5] text-[#5B6A78] border border-[#E2DED6] px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                      {startup.matchTags && startup.matchTags.filter(t => !startup.techStack.includes(t)).map((tag, idx) => (
                        <span key={`tag-${idx}`} className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Risk Detection & Actions */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2 flex items-center gap-1.5">
                      <AlertTriangle className={`h-3.5 w-3.5 ${startup.riskAnalysis.level === 'Low' ? 'text-[#147452]' : 'text-amber-600'}`} />
                      Assessment & Verification Notes (Level: {startup.riskAnalysis.level})
                    </h4>
                    <div className="bg-[#FAF8F5] p-3 rounded border border-[#E2DED6] text-xs text-[#5B6A78] space-y-1">
                      {startup.riskAnalysis.factors.map((factor, idx) => (
                        <p key={idx} className="leading-relaxed">• {factor}</p>
                      ))}
                      {startup.dataNotes && (
                        <p className="text-[11px] font-mono text-amber-800 pt-1 border-t border-[#EDE9E1]">
                          <strong>Reviewer Note:</strong> {startup.dataNotes}
                        </p>
                      )}
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
          })
        )}
      </div>

      {/* Disclaimers Footnote */}
      <div className="mt-8 text-center text-[11px] text-[#5B6A78] font-mono">
        *Relevance scores and match drivers are system-generated algorithmic estimates based on keyword and technical criteria fit, not verified guarantees of procurement award. Public claims require independent departmental validation.
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

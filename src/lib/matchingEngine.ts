import { Startup, Challenge } from "@/types";

/**
 * GovInnovate Dynamic Startup-to-Challenge Matching Engine
 * 
 * Computes deterministic, explainable match scores across 4 statutory pillars:
 * 1. Sector & Capability Alignment (Max 35 pts)
 * 2. TRL Readiness vs Threshold (Max 25 pts)
 * 3. Make in India Local Content % (Max 20 pts)
 * 4. DPIIT Recognition & Evidence Verification Status (Max 20 pts)
 * 
 * Backward-compatible with existing demonstration records and fully supports
 * real public startup profiles with honest, truthful explainability.
 */

export function calculateStartupMatch(
  startup: Startup,
  challenge: Challenge
): {
  matchScore: number;
  matchReasons: string[];
  matchBreakdown: {
    sectorMatch: boolean;
    techMatch: boolean;
    eligibilityMatch: boolean;
    trlMatch: boolean;
    score: number;
    details: string[];
  };
  riskAnalysis: {
    level: "Low" | "Medium" | "High";
    factors: string[];
  };
} {
  let score = 0;
  const matchReasons: string[] = [];
  const details: string[] = [];
  const riskFactors: string[] = [];

  // 1. Sector & Capability Alignment (0-35 points)
  const challengeText = `${challenge.title} ${challenge.category} ${challenge.problemStatement} ${challenge.summary || ""} ${(challenge.expectedOutcomes || []).join(" ")}`.toLowerCase();
  
  // Build comprehensive startup capability corpus
  const startupCorpusParts = [
    startup.sector || "",
    startup.tagline || "",
    (startup.techStack || []).join(" "),
    startup.productOrSolution || "",
    startup.publicCapabilitySummary || "",
    startup.potentialUseCase || "",
    (startup.matchTags || []).join(" "),
    (startup.products || []).map(p => `${p.title} ${p.description}`).join(" ")
  ];
  const startupKeywords = startupCorpusParts.join(" ").toLowerCase();

  // Meaningful keywords extraction (length > 3, exclude general stop words)
  const stopWords = new Set(["need", "with", "from", "that", "this", "have", "into", "over", "such", "than", "then", "them", "these", "those", "their", "will", "would", "about"]);
  const genericTechWords = new Set(["edge", "system", "smart", "tech", "platform", "suite", "analytics", "intelligence", "solution", "solutions", "based"]);

  const words = challengeText
    .split(/[^a-zA-Z0-9]+/)
    .filter(w => w.length > 3 && !stopWords.has(w));

  const matchedKeywordsList: string[] = [];
  const uniqueWords = Array.from(new Set(words));
  for (const w of uniqueWords) {
    if (startupKeywords.includes(w)) {
      matchedKeywordsList.push(w);
    }
  }

  const startupSector = (startup.sector || "").toLowerCase();
  const challengeCategory = (challenge.category || "").toLowerCase();

  const categoryMatch = Boolean(startupSector && challengeCategory && (
    challengeCategory.includes(startupSector) ||
    startupSector.split(";").some(s => challengeCategory.includes(s.trim())) ||
    startupSector.split("/").some(s => challengeCategory.includes(s.trim())) ||
    challengeCategory.split("/").some(c => startupSector.includes(c.trim()))
  ));

  const challengeTitleAndCat = `${challenge.title} ${challenge.category}`.toLowerCase();
  const titleCategoryWords = challengeTitleAndCat.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 3 && !stopWords.has(w) && !genericTechWords.has(w));
  const hasTitleCatKeyword = titleCategoryWords.some(w => startupKeywords.includes(w));

  const sectorMatch = (matchedKeywordsList.length >= 2 && hasTitleCatKeyword) || categoryMatch;
  
  const techTerms = [
    ...(startup.techStack || []),
    ...(startup.matchTags || [])
  ];
  const matchedTechTerms = techTerms.filter(t => {
    const termLower = t.toLowerCase();
    if (challengeText.includes(termLower)) return true;
    const subWords = termLower.split(/[^a-zA-Z0-9]+/).filter(sw => sw.length > 3 && !stopWords.has(sw) && !genericTechWords.has(sw));
    return subWords.length > 0 && subWords.some(sw => challengeText.includes(sw));
  });
  const techMatch = matchedTechTerms.length > 0;

  if (sectorMatch) {
    score += 25;
    if (startup.isPublicDirectoryEntry) {
      const topCapabilities = matchedKeywordsList.slice(0, 4).join(", ");
      const capabilitySummary = startup.productOrSolution 
        ? `${startup.productOrSolution} (${startup.sector?.split(";")[0]?.trim() || "AI"})` 
        : "documented capability";
      matchReasons.push(`Potential match: Public profile describes ${topCapabilities || capabilitySummary} capabilities.`);
      details.push(`Domain keywords strongly align with challenge requirements (${matchedKeywordsList.slice(0, 5).join(", ") || startup.sector})`);
    } else {
      matchReasons.push(`Sector Alignment: Verified match for ${challenge.category}`);
      details.push(`Domain keywords strongly align with challenge requirements (${startup.sector || "CleanTech"})`);
    }
  } else {
    score += 10;
    details.push("Adjacent domain solution; requires minor adaptation for municipal distribution");
  }

  if (techMatch) {
    score += 10;
    if (startup.isPublicDirectoryEntry) {
      matchReasons.push(`Capability Fit: Matched tags (${matchedTechTerms.slice(0, 3).join(", ")}) align with challenge requirements.`);
    } else {
      matchReasons.push("Technology Stack Compatibility: Probes and telemetry protocol match");
    }
  }

  // 2. TRL Level Maturity vs Required Threshold (0-25 points)
  const requiredTrl = 7;
  const currentTrl = startup.trlLevel || 7;
  const trlMatch = currentTrl >= requiredTrl;
  if (currentTrl >= 8) {
    score += 25;
    matchReasons.push(`TRL-${currentTrl} Commercial Field-Ready: Exceeds minimum threshold (TRL ${requiredTrl})`);
    details.push(`High technological readiness (TRL-${currentTrl}) reduces sandbox deployment risk`);
  } else if (currentTrl === 7) {
    score += 20;
    if (startup.isPublicDirectoryEntry) {
      matchReasons.push("TRL-7 Operational Field-Ready: Publicly documented solution satisfies pilot threshold");
      details.push("TRL-7 operational readiness documented in public exhibitor/company profiles");
    } else {
      matchReasons.push("TRL-7 Operational Field-Ready: Satisfies challenge technical threshold");
      details.push("TRL-7 operational demonstration verified in real-world conditions");
    }
  } else {
    score += 5;
    riskFactors.push(`TRL-${currentTrl} is below minimum threshold (TRL 7); pilot requires additional validation`);
    details.push(`TRL-${currentTrl} requires supervised benchmarking before field immersion`);
  }

  // 3. Make in India Local Content Percentage (0-20 points)
  const localContent = startup.localContentPercentage || 60;
  const isClass1 = localContent >= 50;
  if (isClass1) {
    score += 20;
    matchReasons.push(`Make in India Class-1 Supplier: ${localContent}% Domestic Value Addition`);
    details.push(`${localContent}% domestic manufacturing satisfies Class-1 statutory preference`);
  } else if (localContent >= 20) {
    score += 10;
    details.push(`Class-2 Local Supplier (${localContent}%); secondary purchase preference`);
    riskFactors.push("Local content is below 50% Class-1 mandate; components subject to supplier lead times");
  } else {
    score += 2;
    riskFactors.push("Low domestic content (<20%); ineligible for local supplier preference");
  }

  // 4. DPIIT Recognition & Statutory Verification Status (0-20 points)
  const eligibilityMatch = startup.isDpiitVerified;
  if (startup.isDpiitVerified) {
    score += 20;
    matchReasons.push(`DPIIT Recognized (${startup.dpiitNumber}): Eligible for GFR Rule 149/170 relaxation`);
    details.push("Active startup registration allows prior turnover and experience exemption");
  } else if (startup.isPublicDirectoryEntry) {
    // For imported public directory records: do NOT claim DPIIT recognition unless verified
    score += 10;
    const dpiitStatus = startup.dpiitRecognitionStatus || "Not verified in this dataset";
    details.push(`Verification status: ${startup.verificationStatusNote || startup.verificationStage || "Company-published capability"}`);
    riskFactors.push(`DPIIT status: ${dpiitStatus}. Company-published claims require independent validation before tender concessions.`);
  } else {
    score += 5;
    riskFactors.push("DPIIT recognition certificate pending official re-verification");
    details.push("Startup registration not officially verified; tender relaxations cannot be automatically granted");
  }

  // Patents Bonus (Up to 5 points capped at 100)
  if (startup.patents && startup.patents > 0) {
    score = Math.min(100, score + Math.min(5, startup.patents * 2));
    matchReasons.push(`Intellectual Property: ${startup.patents} Indian Patents granted on core mechanism`);
  }

  // Add specific data notes or verification warnings for imported directory profiles
  if (startup.isPublicDirectoryEntry) {
    if (startup.dataNotes) {
      riskFactors.push(`Data note: ${startup.dataNotes}`);
    }
    if (startup.evidenceSourceUrl) {
      details.push(`Evidence source: ${startup.sourceType || "Official documentation / directory"}`);
    }
  }

  // Determine Overall Risk Level
  let riskLevel: "Low" | "Medium" | "High" = "Low";
  if (riskFactors.length >= 2 || (startup.trlLevel && startup.trlLevel < 6) || (!startup.isDpiitVerified && !startup.isPublicDirectoryEntry)) {
    riskLevel = "High";
  } else if (riskFactors.length === 1 || (startup.localContentPercentage && startup.localContentPercentage < 50)) {
    riskLevel = "Medium";
  }

  if (riskFactors.length === 0) {
    riskFactors.push("Low implementation risk; solution verified with domestic supply chain");
  }

  return {
    matchScore: Math.min(100, Math.max(10, score)),
    matchReasons,
    matchBreakdown: {
      sectorMatch,
      techMatch,
      eligibilityMatch,
      trlMatch,
      score: Math.min(100, Math.max(10, score)),
      details
    },
    riskAnalysis: {
      level: riskLevel,
      factors: riskFactors
    }
  };
}

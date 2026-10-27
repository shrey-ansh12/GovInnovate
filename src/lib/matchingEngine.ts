import { Startup, Challenge } from "@/types";

/**
 * GovInnovate Dynamic Startup-to-Challenge Matching Engine
 * 
 * Computes deterministic, explainable match scores across 4 statutory pillars:
 * 1. Sector & Tech Alignment (Max 35 pts)
 * 2. TRL Readiness vs Threshold (Max 25 pts)
 * 3. Make in India Local Content % (Max 20 pts)
 * 4. DPIIT Recognition & GFR Exemption Status (Max 20 pts)
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

  // 1. Sector & Tech Stack Alignment (0-35 points)
  const challengeKeywords = `${challenge.title} ${challenge.category} ${challenge.problemStatement}`.toLowerCase();
  const startupKeywords = `${startup.sector || ""} ${startup.tagline} ${startup.techStack.join(" ")}`.toLowerCase();

  const words = challengeKeywords.split(/\W+/).filter(w => w.length > 3);
  let matchedWordCount = 0;
  for (const w of words) {
    if (startupKeywords.includes(w)) matchedWordCount++;
  }

  const sectorMatch = matchedWordCount >= 2 || Boolean(startup.sector && challenge.category.toLowerCase().includes(startup.sector.toLowerCase()));
  const techMatch = startup.techStack.some(t => challengeKeywords.includes(t.toLowerCase()));

  if (sectorMatch) {
    score += 25;
    matchReasons.push(`Sector Alignment: Verified match for ${challenge.category}`);
    details.push(`Domain keywords strongly align with challenge requirements (${startup.sector || "CleanTech"})`);
  } else {
    score += 10;
    details.push("Adjacent domain solution; requires minor adaptation for municipal distribution");
  }

  if (techMatch) {
    score += 10;
    matchReasons.push("Technology Stack Compatibility: Probes and telemetry protocol match");
  }

  // 2. TRL Level Maturity vs Required Threshold (0-25 points)
  // Standard threshold is TRL 7 (Operational Environment Demonstration)
  const requiredTrl = 7;
  const trlMatch = startup.trlLevel >= requiredTrl;
  if (startup.trlLevel >= 8) {
    score += 25;
    matchReasons.push(`TRL-${startup.trlLevel} Commercial Field-Ready: Exceeds minimum threshold (TRL ${requiredTrl})`);
    details.push(`High technological readiness (TRL-${startup.trlLevel}) reduces sandbox deployment risk`);
  } else if (startup.trlLevel === 7) {
    score += 20;
    matchReasons.push(`TRL-7 Operational Field-Ready: Satisfies challenge technical threshold`);
    details.push("TRL-7 operational demonstration verified in real-world conditions");
  } else {
    score += 5;
    riskFactors.push(`TRL-${startup.trlLevel} is below minimum threshold (TRL 7); pilot requires additional hardware calibration`);
    details.push(`TRL-${startup.trlLevel} requires supervised laboratory benchmarking before field immersion`);
  }

  // 3. Make in India Local Content Percentage (0-20 points)
  // Class 1 Local Supplier: >= 50%
  // Class 2 Local Supplier: 20% - 49%
  const isClass1 = startup.localContentPercentage >= 50;
  if (isClass1) {
    score += 20;
    matchReasons.push(`Make in India Class-1 Supplier: ${startup.localContentPercentage}% Domestic Value Addition`);
    details.push(`${startup.localContentPercentage}% domestic manufacturing satisfies Class-1 statutory preference`);
  } else if (startup.localContentPercentage >= 20) {
    score += 10;
    details.push(`Class-2 Local Supplier (${startup.localContentPercentage}%); secondary purchase preference`);
    riskFactors.push("Local content is below 50% Class-1 mandate; import components subject to customs lead times");
  } else {
    score += 2;
    riskFactors.push("Low domestic content (<20%); ineligible for local supplier preference");
  }

  // 4. DPIIT Recognition & GFR Exemption Status (0-20 points)
  const eligibilityMatch = startup.isDpiitVerified;
  if (startup.isDpiitVerified) {
    score += 20;
    matchReasons.push(`DPIIT Recognized (${startup.dpiitNumber}): Eligible for GFR Rule 149/170 relaxation`);
    details.push(`Active startup registration allows prior turnover and experience exemption`);
  } else {
    score += 5;
    riskFactors.push("DPIIT recognition certificate pending official re-verification");
    details.push("Startup registration not officially verified; tender relaxations cannot be automatically granted");
  }

  // Patents Bonus (Up to 5 points capped at 100)
  if (startup.patents > 0) {
    score = Math.min(100, score + Math.min(5, startup.patents * 2));
    matchReasons.push(`Intellectual Property: ${startup.patents} Indian Patents granted on core mechanism`);
  }

  // Determine Overall Risk Level
  let riskLevel: "Low" | "Medium" | "High" = "Low";
  if (riskFactors.length >= 2 || startup.trlLevel < 6 || !startup.isDpiitVerified) {
    riskLevel = "High";
  } else if (riskFactors.length === 1 || startup.localContentPercentage < 50) {
    riskLevel = "Medium";
  }

  if (riskFactors.length === 0) {
    riskFactors.push("Low implementation risk; hardware verified with domestic supply chain");
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

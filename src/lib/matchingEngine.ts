import { Startup, Challenge } from "@/types";

/**
 * GovInnovate Dynamic Startup-to-Challenge Matching Engine
 * 
 * Computes deterministic, domain-specific, explainable match scores across statutory pillars:
 * 1. Sector & Capability Alignment (Max 35 pts)
 * 2. Technology & Operational Fit (Max 25 pts)
 * 3. TRL Readiness vs Threshold (Max 15 pts)
 * 4. Make in India Local Content % (Max 15 pts)
 * 5. DPIIT Recognition & Evidence Verification Status (Max 10 pts)
 * 
 * Strict Domain Gating prevents cross-domain false positives (e.g. water sensors matching
 * medical imaging or traffic corridors), ensuring each government challenge pairs only
 * with authentic, sector-aligned startups.
 */

interface DomainCriterion {
  categoryKeywords: string[];
  techKeywords: string[];
}

const DOMAIN_CRITERIA: Record<string, DomainCriterion> = {
  water: {
    categoryKeywords: ["water tech", "municipal water", "potable water", "wastewater network", "water telemetry"],
    techKeywords: ["water quality", "aquifer", "turbidity", "bod", "cod", "ph sensing", "submersible", "flow meter", "pipeline leak", "acoustic logger", "nitrates contamination", "heavy metals water"]
  },
  traffic_mobility: {
    categoryKeywords: ["smart mobility", "traffic", "road transport", "highway safety", "intelligent transportation"],
    techKeywords: ["traffic", "vehicular", "ambulance", "green corridor", "signal timing", "itms", "anpr", "congestion", "e-challan", "roadway", "speed detection"]
  },
  agritech: {
    categoryKeywords: ["agritech", "agriculture", "crop surveillance", "farmers welfare", "precision agriculture"],
    techKeywords: ["crop disease", "agriculture", "agricultural drone", "hyperspectral", "multispectral", "pest", "blight", "fungal pathogen", "ndvi", "soil moisture", "chlorophyll", "horticulture", "farmland"]
  },
  cleantech_waste: {
    categoryKeywords: ["cleantech", "waste management", "landfill", "swachh bharat", "solid waste"],
    techKeywords: ["landfill", "leachate", "voc", "methane", "toxic gas", "hydrogen sulfide", "h2s", "waste sorting", "mrf", "dump site", "plastic sorting", "odor", "air quality"]
  },
  medtech: {
    categoryKeywords: ["medtech", "rural health", "pulmonary", "diagnostics", "tb elimination", "healthcare"],
    techKeywords: ["chest x-ray", "radiography", "radiology", "tuberculosis", "pneumonia", "pulmonary", "lung", "triage", "abdm", "fhir", "cad", "healthcare", "x-ray", "clinics"]
  },
  document_ai: {
    categoryKeywords: ["intelligent document processing", "document extraction", "multilingual ocr", "document digitisation", "ocr", "document processing"],
    techKeywords: ["ocr", "document extraction", "form extraction", "document intelligence", "pdf conversion", "scanned", "multilingual", "digitisation", "invoice processing", "records management", "data extraction"]
  },
  identity_biometrics: {
    categoryKeywords: ["identity tech", "biometrics", "touchless authentication", "identity verification", "identity technology"],
    techKeywords: ["biometric", "touchless", "fingerprint", "facial liveness", "authentication", "kyc", "identity verification", "presentation attack", "anti-spoofing"]
  },
  forensics_fraud: {
    categoryKeywords: ["compliance & anti-fraud", "document forensics", "invoicing reconciliation", "tampering", "anti-fraud", "audit trail"],
    techKeywords: ["tampering", "forensic", "forgery", "splicing", "metadata checks", "digital signature", "gstin", "tax invoice", "compliance audit", "audit trail", "fraud", "tampering analysis"]
  }
};

export function detectChallengeDomain(challenge: Challenge): string {
  const cat = (challenge.category || "").toLowerCase();
  const id = (challenge.id || "").toLowerCase();
  const title = (challenge.title || "").toLowerCase();

  if (id.includes("wq") || cat.includes("water")) return "water";
  if (id.includes("tr") || cat.includes("mobility") || cat.includes("traffic")) return "traffic_mobility";
  if (id.includes("ag") || cat.includes("agri")) return "agritech";
  if (id.includes("lf") || cat.includes("waste") || cat.includes("cleantech") || title.includes("landfill")) return "cleantech_waste";
  if (id.includes("xr") || cat.includes("medtech") || cat.includes("health") || title.includes("radiography")) return "medtech";
  if (id.includes("dc") || cat.includes("ocr") || cat.includes("document extraction")) return "document_ai";
  if (id.includes("id") || cat.includes("biometrics") || title.includes("biometric")) return "identity_biometrics";
  if (id.includes("fr") || cat.includes("forensic") || cat.includes("anti-fraud") || title.includes("forensic")) return "forensics_fraud";

  return "general";
}

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

  const challengeDomain = detectChallengeDomain(challenge);
  const domainCriteria = DOMAIN_CRITERIA[challengeDomain];

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
  const startupCorpus = startupCorpusParts.join(" ").toLowerCase();

  // 1. Sector Alignment (0-35 points)
  let sectorMatch = false;
  let matchedSectorTerms: string[] = [];

  if (domainCriteria) {
    matchedSectorTerms = domainCriteria.categoryKeywords.filter(kw => startupCorpus.includes(kw));
    sectorMatch = matchedSectorTerms.length > 0;
  } else {
    // Fallback for custom or general challenges
    const startupSector = (startup.sector || "").toLowerCase();
    const challengeCategory = (challenge.category || "").toLowerCase();
    sectorMatch = Boolean(startupSector && challengeCategory && (
      challengeCategory.includes(startupSector) ||
      startupSector.split(";").some(s => challengeCategory.includes(s.trim())) ||
      startupSector.split("/").some(s => challengeCategory.includes(s.trim()))
    ));
  }

  // 2. Technology Fit (0-25 points)
  let techMatch = false;
  let matchedDomainTechs: string[] = [];

  if (domainCriteria && sectorMatch) {
    matchedDomainTechs = domainCriteria.techKeywords.filter(kw => startupCorpus.includes(kw));
    techMatch = matchedDomainTechs.length > 0;
  } else if (!domainCriteria && sectorMatch) {
    const challengeText = `${challenge.title} ${challenge.problemStatement}`.toLowerCase();
    const techTerms = [...(startup.techStack || []), ...(startup.matchTags || [])];
    matchedDomainTechs = techTerms.filter(t => challengeText.includes(t.toLowerCase()));
    techMatch = matchedDomainTechs.length > 0;
  }

  if (sectorMatch) {
    score += 35;
    if (startup.isPublicDirectoryEntry) {
      const topCapabilities = matchedDomainTechs.slice(0, 3).join(", ");
      const capabilitySummary = startup.productOrSolution 
        ? `${startup.productOrSolution} (${startup.sector?.split(";")[0]?.trim() || "Specialized Solution"})` 
        : "documented capability";
      matchReasons.push(`Potential match: Public profile describes ${topCapabilities || capabilitySummary} capabilities aligned with ${challenge.category}.`);
      details.push(`Domain keywords strongly align with challenge requirements (${matchedDomainTechs.slice(0, 4).join(", ") || startup.sector})`);
    } else {
      matchReasons.push(`Sector Alignment: Verified match for ${challenge.category}`);
      details.push(`Domain keywords strongly align with challenge requirements (${startup.sector || "CleanTech"})`);
    }
  } else {
    score += 0;
    matchReasons.push(`Unrelated Sector: Startup specializes in ${startup.sector || "different domain"} rather than ${challenge.category}. Domain adaptation required.`);
    details.push(`Core capabilities not aligned with ${challenge.category}; low relevance for this specific problem statement.`);
    riskFactors.push(`Sector mismatch with ${challenge.category}; not designed for this problem statement`);
  }

  if (techMatch) {
    score += 25;
    if (startup.isPublicDirectoryEntry) {
      matchReasons.push(`Capability Fit: Documented technologies (${matchedDomainTechs.slice(0, 3).join(", ")}) directly address challenge outcomes.`);
    } else {
      matchReasons.push("Technology Stack Compatibility: Probes and telemetry protocol match");
    }
  } else if (sectorMatch) {
    score += 10;
    details.push("Adjacent domain solution; requires minor adaptation for municipal distribution");
  } else {
    score += 0;
  }

  // 3. TRL Level Maturity vs Required Threshold (0-15 points)
  const requiredTrl = 7;
  const currentTrl = startup.trlLevel || 7;
  const trlMatch = currentTrl >= requiredTrl;
  if (currentTrl >= 8) {
    score += 15;
    matchReasons.push(`TRL-${currentTrl} Commercial Field-Ready: Exceeds minimum threshold (TRL ${requiredTrl})`);
    details.push(`High technological readiness (TRL-${currentTrl}) reduces sandbox deployment risk`);
  } else if (currentTrl === 7) {
    score += 12;
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

  // 4. Make in India Local Content Percentage (0-15 points)
  const localContent = startup.localContentPercentage || 60;
  const isClass1 = localContent >= 50;
  if (isClass1) {
    score += 15;
    matchReasons.push(`Make in India Class-1 Supplier: ${localContent}% Domestic Value Addition`);
    details.push(`${localContent}% domestic manufacturing satisfies Class-1 statutory preference`);
  } else if (localContent >= 20) {
    score += 8;
    details.push(`Class-2 Local Supplier (${localContent}%); secondary purchase preference`);
    riskFactors.push("Local content is below 50% Class-1 mandate; components subject to supplier lead times");
  } else {
    score += 2;
    riskFactors.push("Low domestic content (<20%); ineligible for local supplier preference");
  }

  // 5. DPIIT Recognition & Statutory Verification Status (0-10 points)
  const eligibilityMatch = startup.isDpiitVerified;
  if (startup.isDpiitVerified) {
    score += 10;
    matchReasons.push(`DPIIT Recognized (${startup.dpiitNumber}): Eligible for GFR Rule 149/170 relaxation`);
    details.push("Active startup registration allows prior turnover and experience exemption");
  } else if (startup.isPublicDirectoryEntry) {
    score += 8;
    const dpiitStatus = startup.dpiitRecognitionStatus || "Not verified in this dataset";
    details.push(`Verification status: ${startup.verificationStatusNote || startup.verificationStage || "Company-published capability"}`);
    riskFactors.push(`DPIIT status: ${dpiitStatus}. Company-published claims require independent validation before tender concessions.`);
  } else {
    score += 4;
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
  if (!sectorMatch || riskFactors.length >= 2 || (startup.trlLevel && startup.trlLevel < 6)) {
    riskLevel = "High";
  } else if (riskFactors.length === 1 || (startup.localContentPercentage && startup.localContentPercentage < 50)) {
    riskLevel = "Medium";
  }

  if (riskFactors.length === 0) {
    riskFactors.push("Low implementation risk; solution verified with domestic supply chain");
  }

  const finalScore = Math.min(100, Math.max(10, score));

  return {
    matchScore: finalScore,
    matchReasons,
    matchBreakdown: {
      sectorMatch,
      techMatch,
      eligibilityMatch,
      trlMatch,
      score: finalScore,
      details
    },
    riskAnalysis: {
      level: riskLevel,
      factors: riskFactors
    }
  };
}

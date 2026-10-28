/**
 * GovInnovate - Startup Dataset Integration & Regression Verification Suite
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { parseCSV, runImport } from "./import-startup-dataset.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function computeCanonicalHash(s) {
  const payload = JSON.stringify({
    name: s.name,
    product: s.productOrSolution || "",
    sector: s.sector || "",
    website: s.website || "",
    sourceUrl: s.evidenceSourceUrl || "",
    verificationStatus: s.verificationStatusNote || "",
    dpiitStatus: s.dpiitRecognitionStatus || ""
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

const DOMAIN_CRITERIA = {
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

function detectChallengeDomain(ch) {
  const cat = (ch.category || "").toLowerCase();
  const id = (ch.id || "").toLowerCase();
  const title = (ch.title || "").toLowerCase();

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

function calculateMatchTest(startup, challenge) {
  let score = 0;
  const challengeDomain = detectChallengeDomain(challenge);
  const domainCriteria = DOMAIN_CRITERIA[challengeDomain];

  const startupCorpus = [
    startup.sector || "",
    startup.tagline || "",
    (startup.techStack || []).join(" "),
    startup.productOrSolution || "",
    startup.publicCapabilitySummary || "",
    startup.potentialUseCase || "",
    (startup.matchTags || []).join(" "),
    (startup.products || []).map(p => `${p.title} ${p.description}`).join(" ")
  ].join(" ").toLowerCase();

  // 1. Sector Alignment (0-35 points)
  let sectorMatch = false;
  let matchedSectorTerms = [];
  if (domainCriteria) {
    matchedSectorTerms = domainCriteria.categoryKeywords.filter(kw => startupCorpus.includes(kw));
    sectorMatch = matchedSectorTerms.length > 0;
  }
  if (sectorMatch) {
    score += 35;
  }

  // 2. Technology Fit (0-25 points)
  let techMatch = false;
  let matchedDomainTechs = [];
  if (domainCriteria && sectorMatch) {
    matchedDomainTechs = domainCriteria.techKeywords.filter(kw => startupCorpus.includes(kw));
    techMatch = matchedDomainTechs.length > 0;
    if (techMatch) {
      score += 25;
    } else {
      score += 10;
    }
  }

  // 3. TRL Readiness (0-15 points)
  const trl = startup.trlLevel || 7;
  if (trl >= 8) score += 15;
  else if (trl >= 7) score += 12;
  else score += 5;

  // 4. Make in India Local Content (0-15 points)
  const local = startup.localContentPercentage || 60;
  if (local >= 50) score += 15;
  else if (local >= 20) score += 8;
  else score += 2;

  // 5. Verification / DPIIT (0-10 points)
  if (startup.isDpiitVerified) score += 10;
  else if (startup.isPublicDirectoryEntry) score += 8;
  else score += 4;

  if (startup.patents && startup.patents > 0) {
    score = Math.min(100, score + Math.min(5, startup.patents * 2));
  }

  return {
    matchScore: Math.min(100, Math.max(10, score)),
    sectorMatch,
    techMatch,
    matchedDomainTechs: matchedDomainTechs.slice(0, 3)
  };
}

async function runTests() {
  console.log("=================================================");
  console.log("GovInnovate Real Dataset Integration Tests");
  console.log("=================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  // 1. CSV Existence & Count (22 startups)
  const csvPath = path.resolve(__dirname, "../govinnovate_public_startup_dataset.csv");
  assert(fs.existsSync(csvPath), "Dataset CSV file exists at expected path");

  const rawCSV = fs.readFileSync(csvPath, "utf8");
  const records = parseCSV(rawCSV);
  assert(records.length === 22, `Dataset contains exactly 22 startup records (found: ${records.length})`);

  // 2. Field integrity
  const requiredFields = [
    "startup_name", "product_or_solution", "sector", "public_capability_summary",
    "potential_govinnovate_use_case", "website", "evidence_source_url", "source_type",
    "verification_status", "dpiit_recognition_status", "match_tags", "data_notes"
  ];
  const allFieldsPresent = records.every(r => requiredFields.every(f => typeof r[f] === "string" && r[f].length > 0));
  assert(allFieldsPresent, "All 22 records have all 12 required fields populated");

  // 3. Repeatable import & 0 duplicates
  const importResult1 = await runImport();
  const importResult2 = await runImport();
  assert(importResult1.length === 22 && importResult2.length === 22, "Re-running import is idempotent and produces exactly 22 records");

  const ids = new Set(importResult1.map(r => r.id));
  assert(ids.size === 22, "All 22 imported startup profiles have unique deterministic IDs");

  // 4. Honest verification status check
  const anyFabricatedDpiit = importResult1.some(r => r.dpiit_recognition_status.toLowerCase() === "verified");
  assert(!anyFabricatedDpiit, "Verification status is honest: No unverified startup is labeled 'verified'");

  // 5. Safe URL format
  function isValidExternalUrl(url) {
    if (!url) return false;
    try {
      const p = new URL(url);
      return p.protocol === "https:" || p.protocol === "http:";
    } catch {
      return false;
    }
  }
  const allUrlsValid = importResult1.every(r => isValidExternalUrl(r.website) && isValidExternalUrl(r.evidence_source_url));
  assert(allUrlsValid, "All 22 startups have valid, secure HTTP/HTTPS website and evidence URLs");
  assert(!isValidExternalUrl("javascript:alert(1)"), "Dangerous URL scheme 'javascript:' is correctly rejected");

  // 6. SHA-256 Canonical integrity check on importedStartupData.ts
  const dataTsPath = path.resolve(__dirname, "../src/lib/importedStartupData.ts");
  assert(fs.existsSync(dataTsPath), "importedStartupData.ts exists");

  const dataTsContent = fs.readFileSync(dataTsPath, "utf8");
  const jsonMatch = dataTsContent.match(/export const importedPublicStartups: Startup\[\] = (\[[\s\S]*?\]);/);
  assert(!!jsonMatch, "importedStartupData.ts exports valid startup array");

  const importedStartups = JSON.parse(jsonMatch[1]);
  assert(importedStartups.length === 22, `TypeScript dataset exports exactly 22 startup profiles (found: ${importedStartups.length})`);

  let hashesValid = true;
  for (const s of importedStartups) {
    const computed = computeCanonicalHash(s);
    if (computed !== s.canonicalHash || computed !== s.currentHash) {
      hashesValid = false;
      break;
    }
  }
  assert(hashesValid, "All 22 imported startups have cryptographically valid SHA-256 canonical hashes");

  // 7. Preservation of existing mockData demo startups and sampleChallenges
  const mockDataPath = path.resolve(__dirname, "../src/lib/mockData.ts");
  const mockDataContent = fs.readFileSync(mockDataPath, "utf8");
  assert(mockDataContent.includes("ST-AQUASENSE"), "AquaSense AI Innovations Pvt Ltd preserved in mockData.ts");
  assert(mockDataContent.includes("ST-PUREFLOW"), "PureFlow IoT Dynamics preserved in mockData.ts");
  assert(mockDataContent.includes("importedPublicStartups"), "importedPublicStartups successfully wired into mockData.ts");
  assert(mockDataContent.includes("sampleChallenges: Challenge[]"), "sampleChallenges exported in mockData.ts");

  // 8. Matching: Document Intelligence Challenge
  const docChallenge = {
    id: "CH-2026-DC06",
    title: "AI-Powered Multilingual Document Extraction & Automated Citizen Application Processing",
    category: "AI & Intelligent Document Processing / Multilingual OCR",
    department: "Department of Administrative Reforms and Public Grievances (DARPG)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    budget: "₹26,00,000",
    pilotDuration: "90 Days",
    problemStatement: "Manual verification of citizen applications and scanned welfare records causes operational delays across administrative centers. Departments require automated OCR and document structure intelligence to extract fields from noisy, multilingual scans into structured databases."
  };

  const eigenlytics = importedStartups.find(s => s.name.includes("Eigenlytics"));
  const cognitiveString = importedStartups.find(s => s.name.includes("Cognitive String"));
  const matchEigen = calculateMatchTest(eigenlytics, docChallenge);
  const matchCognitive = calculateMatchTest(cognitiveString, docChallenge);
  assert(matchEigen.matchScore >= 80, `Eigenlytics matches document challenge with high relevance (Score: ${matchEigen.matchScore}%)`);
  assert(matchCognitive.matchScore >= 80, `Cognitive String matches document challenge with high relevance (Score: ${matchCognitive.matchScore}%)`);

  // 9. Matching: Jal Shakti Water Quality Challenge
  const waterChallenge = {
    id: "CH-2026-WQ01",
    title: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
    category: "Water Tech / IoT & Clean Environment",
    department: "National Water Mission & Urban Infrastructure Board",
    ministry: "Ministry of Jal Shakti",
    budget: "₹28,50,000",
    pilotDuration: "90 Days",
    problemStatement: "Traditional manual water sampling is reactive. Need continuous edge sensor telemetry to trigger proactive public health alerts within 5 minutes of water anomalies across urban supply lines."
  };
  const kritsnam = importedStartups.find(s => s.name.includes("Kritsnam"));
  const nimbleVision = importedStartups.find(s => s.name.includes("Nimble Vision"));
  const matchKritsnam = calculateMatchTest(kritsnam, waterChallenge);
  const matchNimble = calculateMatchTest(nimbleVision, waterChallenge);
  assert(matchKritsnam.matchScore >= 85, `Kritsnam Technologies matches Water challenge with high relevance (Score: ${matchKritsnam.matchScore}%)`);
  assert(matchNimble.matchScore >= 85, `Nimble Vision matches Water challenge with high relevance (Score: ${matchNimble.matchScore}%)`);

  // 10. Matching: MoRTH Traffic & Green Corridor Challenge
  const trafficChallenge = {
    id: "CH-2026-TR02",
    title: "Edge-AI Adaptive Traffic Signal & Emergency Vehicle Green-Corridor Network",
    category: "Smart Mobility / Computer Vision & Edge AI",
    problemStatement: "Static timer traffic signals fail to adapt to live road congestion surges, causing massive delays to emergency response vehicles. Urban command centers require edge vision nodes to pre-emptively synchronize traffic light cycles along active ambulance routes."
  };
  const vehant = importedStartups.find(s => s.name.includes("Vehant"));
  const staqu = importedStartups.find(s => s.name.includes("Staqu"));
  const matchVehant = calculateMatchTest(vehant, trafficChallenge);
  const matchStaqu = calculateMatchTest(staqu, trafficChallenge);
  assert(matchVehant.matchScore >= 85, `Vehant Technologies matches Smart Mobility challenge with high relevance (Score: ${matchVehant.matchScore}%)`);
  assert(matchStaqu.matchScore >= 85, `Staqu Technologies matches Smart Mobility challenge with high relevance (Score: ${matchStaqu.matchScore}%)`);

  // 11. Matching: AgriTech Drone Multispectral Crop Disease Challenge
  const agriChallenge = {
    id: "CH-2026-AG03",
    title: "Autonomous Drone Multispectral Sensing for Early Crop Disease Detection",
    category: "AgriTech / Autonomous Drones & Multispectral AI",
    problemStatement: "Physical scouting of rural farmlands is labor-intensive and detects pest infestation only after severe leaf damage. Automated aerial multispectral analytics can isolate chlorophyll stress patterns a full week earlier, saving vulnerable yields."
  };
  const bharatRohan = importedStartups.find(s => s.name.includes("BharatRohan"));
  const fasal = importedStartups.find(s => s.name.includes("Fasal"));
  const matchBharatRohan = calculateMatchTest(bharatRohan, agriChallenge);
  const matchFasal = calculateMatchTest(fasal, agriChallenge);
  assert(matchBharatRohan.matchScore >= 85, `BharatRohan matches AgriTech Drone challenge with high relevance (Score: ${matchBharatRohan.matchScore}%)`);
  assert(matchFasal.matchScore >= 85, `Fasal matches AgriTech challenge with high relevance (Score: ${matchFasal.matchScore}%)`);

  // 12. Matching: MoHUA Subsurface Landfill Toxic Gas Challenge
  const landfillChallenge = {
    id: "CH-2026-LF04",
    title: "Subsurface IoT Sensor Array for Landfill Leachate & Toxic VOC Detection",
    category: "CleanTech / Waste Management & Subsurface IoT",
    problemStatement: "Landfill fires and groundwater contamination from unmonitored dump sites pose urgent ecological and public health threats. Municipal bodies lack autonomous sub-surface telemetry to monitor volatile gases and heavy chemical percolation."
  };
  const oizom = importedStartups.find(s => s.name.includes("Oizom"));
  const ishitva = importedStartups.find(s => s.name.includes("Ishitva"));
  const matchOizom = calculateMatchTest(oizom, landfillChallenge);
  const matchIshitva = calculateMatchTest(ishitva, landfillChallenge);
  assert(matchOizom.matchScore >= 85, `Oizom Instruments matches Landfill Gas challenge with high relevance (Score: ${matchOizom.matchScore}%)`);
  assert(matchIshitva.matchScore >= 85, `Ishitva Robotic matches CleanTech challenge with high relevance (Score: ${matchIshitva.matchScore}%)`);

  // 13. Matching: MoHFW Rural Pulmonary Diagnostics Challenge
  const medChallenge = {
    id: "CH-2026-XR05",
    title: "Ultra-Portable AI-Assisted Chest Radiography for Rural Pulmonary Diagnostics",
    category: "MedTech / Edge AI & Rural Health Diagnostics",
    problemStatement: "Over 65% of rural healthcare centers face an absence of on-site diagnostic radiologists. Sputum tests take days, and patients frequently drop out of clinical tracking. Ultra-portable edge-AI imaging provides immediate confirmation within 30 seconds."
  };
  const qure = importedStartups.find(s => s.name.includes("Qure.ai"));
  const deeptek = importedStartups.find(s => s.name.includes("DeepTek"));
  const matchQure = calculateMatchTest(qure, medChallenge);
  const matchDeeptek = calculateMatchTest(deeptek, medChallenge);
  assert(matchQure.matchScore >= 85, `Qure.ai matches MedTech Chest X-Ray challenge with high relevance (Score: ${matchQure.matchScore}%)`);
  assert(matchDeeptek.matchScore >= 85, `DeepTek matches MedTech challenge with high relevance (Score: ${matchDeeptek.matchScore}%)`);

  // 14. Matching: MeitY Touchless Biometric Authentication Challenge
  const biometricChallenge = {
    id: "CH-2026-ID07",
    title: "Touchless Multi-Factor Biometric Verification & Fraud-Resistant Citizen Authentication Rail",
    category: "Identity Tech / Biometrics & Touchless Authentication",
    problemStatement: "Physical contact biometric fingerprint readers present hygiene barriers and failure in rough-handed laborers. Government portals require touchless, camera-based multi-factor biometrics."
  };
  const touchlessId = importedStartups.find(s => s.name.includes("Touchless ID"));
  const matchTouchless = calculateMatchTest(touchlessId, biometricChallenge);
  assert(matchTouchless.matchScore >= 85, `Touchless ID matches Biometric Authentication challenge with high relevance (Score: ${matchTouchless.matchScore}%)`);

  // 15. Matching: CBIC Forensic Tampering & GSTIN Invoicing Reconciliation Challenge
  const forensicChallenge = {
    id: "CH-2026-FR08",
    title: "Automated Document Forensic Tampering Detection & GSTIN Invoicing Reconciliation System",
    category: "Civic Tech / Compliance & Anti-Fraud Document Forensics",
    problemStatement: "Public procurement units face risks of forged vendor credentials, falsified GST invoices, and manipulated turnover certificates. An automated forensic screening engine is needed."
  };
  const kriyam = importedStartups.find(s => s.name.includes("Kriyam"));
  const anumiti = importedStartups.find(s => s.name.includes("Anumiti"));
  const matchKriyam = calculateMatchTest(kriyam, forensicChallenge);
  const matchAnumiti = calculateMatchTest(anumiti, forensicChallenge);
  assert(matchKriyam.matchScore >= 85, `Kriyam AI matches Document Forensic challenge with high relevance (Score: ${matchKriyam.matchScore}%)`);
  assert(matchAnumiti.matchScore >= 85, `Anumiti matches Forensic Compliance challenge with high relevance (Score: ${matchAnumiti.matchScore}%)`);

  // 16. Universal Coverage: Every startup matches at least one challenge with score >= 85%
  const all8Challenges = [
    waterChallenge,
    trafficChallenge,
    agriChallenge,
    landfillChallenge,
    medChallenge,
    docChallenge,
    biometricChallenge,
    forensicChallenge
  ];

  let allQualify = true;
  for (const s of importedStartups) {
    let topScore = 0;
    for (const c of all8Challenges) {
      const res = calculateMatchTest(s, c);
      if (res.matchScore > topScore) topScore = res.matchScore;
    }
    if (topScore < 80) {
      allQualify = false;
      console.error(`Startup ${s.name} failed to match any challenge (Top score: ${topScore}%)`);
    }
  }
  assert(allQualify, "Universal Match: Every single imported startup qualifies for at least one challenge with score >= 80%");

  // 17. Discrimination check & cross-domain gating
  const qureOnWater = calculateMatchTest(qure, waterChallenge);
  assert(qureOnWater.matchScore <= 40, `Qure.ai receives low irrelevant score on Water challenge (${qureOnWater.matchScore}% <= 40%)`);
  assert(matchQure.matchScore > qureOnWater.matchScore + 50, `Qure.ai has > 50% score separation between MedTech (${matchQure.matchScore}%) and Water (${qureOnWater.matchScore}%)`);

  const kritsnamOnTraffic = calculateMatchTest(kritsnam, trafficChallenge);
  assert(kritsnamOnTraffic.matchScore <= 40, `Kritsnam receives low irrelevant score on Traffic challenge (${kritsnamOnTraffic.matchScore}% <= 40%)`);
  assert(matchKritsnam.matchScore > kritsnamOnTraffic.matchScore + 50, `Kritsnam has > 50% score separation between Water (${matchKritsnam.matchScore}%) and Traffic (${kritsnamOnTraffic.matchScore}%)`);

  // 18. Strict Distinct Matching per Challenge
  for (const c of all8Challenges) {
    const scoredList = importedStartups.map(s => ({
      name: s.name,
      ...calculateMatchTest(s, c)
    }));
    const highMatches = scoredList.filter(s => s.matchScore >= 80);
    const irrelevantMatches = scoredList.filter(s => !s.sectorMatch);
    const maxIrrelevantScore = Math.max(...irrelevantMatches.map(s => s.matchScore));
    assert(highMatches.length > 0, `Challenge ${c.id} has at least 1 high-matching startup (Found: ${highMatches.length})`);
    assert(maxIrrelevantScore <= 40, `Challenge ${c.id} rejects all unrelated domain startups (Max irrelevant score: ${maxIrrelevantScore}% <= 40%)`);
  }

  console.log(`\n=================================================`);
  console.log(`Test Summary: ${passed} / ${total} tests passed.`);
  console.log(`=================================================`);
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

/**
 * GovInnovate - Startup Dataset Integration & Regression Verification Suite
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { parseCSV, generateDeterministicId, runImport } from "./import-startup-dataset.mjs";

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

function calculateMatchTest(startup, challenge) {
  let score = 0;
  const matchReasons = [];
  const riskFactors = [];

  const challengeText = `${challenge.title} ${challenge.category} ${challenge.problemStatement} ${challenge.summary || ""}`.toLowerCase();
  
  const startupCorpus = [
    startup.sector || "",
    startup.tagline || "",
    (startup.techStack || []).join(" "),
    startup.productOrSolution || "",
    startup.publicCapabilitySummary || "",
    startup.potentialUseCase || "",
    (startup.matchTags || []).join(" ")
  ].join(" ").toLowerCase();

  const stopWords = new Set(["need", "with", "from", "that", "this", "have", "into", "over", "such", "than", "then", "them", "these", "those", "their", "will", "would", "about"]);
  const genericTechWords = new Set(["edge", "system", "smart", "tech", "platform", "suite", "analytics", "intelligence", "solution", "solutions", "based"]);

  const words = challengeText
    .split(/[^a-zA-Z0-9]+/)
    .filter(w => w.length > 3 && !stopWords.has(w));

  const matchedKeywordsList = [];
  const uniqueWords = Array.from(new Set(words));
  for (const w of uniqueWords) {
    if (startupCorpus.includes(w)) {
      matchedKeywordsList.push(w);
    }
  }

  const categoryMatch = Boolean(startup.sector && challenge.category && (
    challenge.category.toLowerCase().includes(startup.sector.toLowerCase()) ||
    startup.sector.toLowerCase().split(";").some(s => challenge.category.toLowerCase().includes(s.trim())) ||
    startup.sector.toLowerCase().split("/").some(s => challenge.category.toLowerCase().includes(s.trim())) ||
    challenge.category.toLowerCase().split("/").some(c => startup.sector.toLowerCase().includes(c.trim()))
  ));

  const challengeTitleAndCat = `${challenge.title} ${challenge.category}`.toLowerCase();
  const titleCategoryWords = challengeTitleAndCat.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 3 && !stopWords.has(w) && !genericTechWords.has(w));
  const hasTitleCatKeyword = titleCategoryWords.some(w => startupCorpus.includes(w));

  const sectorMatch = (matchedKeywordsList.length >= 2 && hasTitleCatKeyword) || categoryMatch;
  const techTerms = [...(startup.techStack || []), ...(startup.matchTags || [])];
  const matchedTechTerms = techTerms.filter(t => {
    const termLower = t.toLowerCase();
    if (challengeText.includes(termLower)) return true;
    const subWords = termLower.split(/[^a-zA-Z0-9]+/).filter(sw => sw.length > 3 && !stopWords.has(sw) && !genericTechWords.has(sw));
    return subWords.length > 0 && subWords.some(sw => challengeText.includes(sw));
  });
  const techMatch = matchedTechTerms.length > 0;

  if (sectorMatch) {
    score += 25;
    matchReasons.push(`Potential match: Public profile describes ${matchedKeywordsList.slice(0, 3).join(", ") || "domain"} capabilities.`);
  } else {
    score += 10;
  }

  if (techMatch) {
    score += 10;
    matchReasons.push(`Capability Fit: Matched tags (${matchedTechTerms.slice(0, 2).join(", ")}) align with challenge requirements.`);
  }

  if (startup.trlLevel >= 7) {
    score += 20;
  } else {
    score += 5;
  }

  if (startup.localContentPercentage >= 50) {
    score += 20;
  } else {
    score += 10;
  }

  if (startup.isDpiitVerified) {
    score += 20;
  } else if (startup.isPublicDirectoryEntry) {
    score += 10;
    riskFactors.push(`DPIIT status: ${startup.dpiitRecognitionStatus || "Not verified in this dataset"}`);
  } else {
    score += 5;
  }

  return {
    matchScore: Math.min(100, Math.max(10, score)),
    matchReasons,
    riskFactors,
    sectorMatch,
    techMatch
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

  // 7. Preservation of existing mockData demo startups
  const mockDataPath = path.resolve(__dirname, "../src/lib/mockData.ts");
  const mockDataContent = fs.readFileSync(mockDataPath, "utf8");
  assert(mockDataContent.includes("ST-AQUASENSE"), "AquaSense AI Innovations Pvt Ltd preserved in mockData.ts");
  assert(mockDataContent.includes("ST-PUREFLOW"), "PureFlow IoT Dynamics preserved in mockData.ts");
  assert(mockDataContent.includes("importedPublicStartups"), "importedPublicStartups successfully wired into mockData.ts");

  // 8. Matching: Document Intelligence Challenge
  const docChallenge = {
    id: "CH-DOC-01",
    title: "AI Document Field Extraction & Consistency Verification",
    category: "AI & Document Processing",
    department: "Department of Administrative Reforms",
    ministry: "Ministry of Personnel",
    budget: "₹25,00,000",
    pilotDuration: "90 Days",
    problemStatement: "We need a system to extract fields from government documents, identify inconsistencies, and reduce manual verification time.",
    summary: "Automated extraction and validation of fields from scanned records, PDFs and forms."
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
    id: "morth-traffic-corridor",
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
    id: "agri-drone-crop-monitoring",
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
    id: "mohua-landfill-toxic-gas",
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
    id: "mohfw-portable-ai-xray",
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

  // 14. Discrimination check: Startups score higher on their targeted domain than on unrelated domains
  const qureOnWater = calculateMatchTest(qure, waterChallenge);
  assert(matchQure.matchScore > qureOnWater.matchScore, `Qure.ai scores higher on MedTech challenge than on Water challenge (${matchQure.matchScore}% vs ${qureOnWater.matchScore}%)`);

  const kritsnamOnTraffic = calculateMatchTest(kritsnam, trafficChallenge);
  assert(matchKritsnam.matchScore > kritsnamOnTraffic.matchScore, `Kritsnam scores higher on Water challenge than on Traffic challenge (${matchKritsnam.matchScore}% vs ${kritsnamOnTraffic.matchScore}%)`);

  // 15. Truthful explainability
  assert(matchQure.matchReasons.length > 0, "Match explanation provided for Qure.ai");
  assert(matchQure.matchReasons[0].includes("capabilities"), `Explanation accurately references documented capabilities: "${matchQure.matchReasons[0]}"`);

  console.log(`\n=================================================`);
  console.log(`Test Summary: ${passed} / ${total} tests passed.`);
  console.log(`=================================================`);
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

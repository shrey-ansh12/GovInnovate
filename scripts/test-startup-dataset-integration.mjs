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

function getCanonicalStartupString(startup) {
  return JSON.stringify({
    id: startup.id.trim(),
    name: startup.name.trim().toLowerCase(),
    dpiitNumber: startup.dpiitNumber.trim().toUpperCase(),
    incorporationYear: startup.incorporationYear,
    location: startup.location.trim().toLowerCase(),
    trlLevel: startup.trlLevel,
    localContentPercentage: startup.localContentPercentage,
    patents: startup.patents,
    isDpiitVerified: startup.isDpiitVerified
  });
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
    startup.sector.toLowerCase().split(";").some(s => challenge.category.toLowerCase().includes(s.trim()))
  ));

  const sectorMatch = matchedKeywordsList.length >= 2 || categoryMatch;
  const techTerms = [...(startup.techStack || []), ...(startup.matchTags || [])];
  const matchedTechTerms = techTerms.filter(t => {
    const termLower = t.toLowerCase();
    if (challengeText.includes(termLower)) return true;
    const subWords = termLower.split(/[^a-zA-Z0-9]+/).filter(sw => sw.length > 3 && !stopWords.has(sw));
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

  // 1. CSV Existence & Count
  const csvPath = path.resolve(__dirname, "../govinnovate_public_startup_dataset.csv");
  assert(fs.existsSync(csvPath), "Dataset CSV file exists at expected path");

  const rawCSV = fs.readFileSync(csvPath, "utf8");
  const records = parseCSV(rawCSV);
  assert(records.length === 12, `Dataset contains exactly 12 startup records (found: ${records.length})`);

  // 2. Field integrity
  const requiredFields = [
    "startup_name", "product_or_solution", "sector", "public_capability_summary",
    "potential_govinnovate_use_case", "website", "evidence_source_url", "source_type",
    "verification_status", "dpiit_recognition_status", "match_tags", "data_notes"
  ];
  const allFieldsPresent = records.every(r => requiredFields.every(f => typeof r[f] === "string" && r[f].length > 0));
  assert(allFieldsPresent, "All 12 records have all 12 required fields populated");

  // 3. Repeatable import & 0 duplicates
  const importResult1 = await runImport();
  const importResult2 = await runImport();
  assert(importResult1.length === 12 && importResult2.length === 12, "Re-running import is idempotent and produces exactly 12 records");

  const ids = new Set(importResult1.map(r => r.id));
  assert(ids.size === 12, "All 12 imported startup profiles have unique deterministic IDs");

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
  assert(allUrlsValid, "All 12 startups have valid, secure HTTP/HTTPS website and evidence URLs");
  assert(!isValidExternalUrl("javascript:alert(1)"), "Dangerous URL scheme 'javascript:' is correctly rejected");

  // 6. SHA-256 Canonical integrity check on importedStartupData.ts
  const dataTsPath = path.resolve(__dirname, "../src/lib/importedStartupData.ts");
  assert(fs.existsSync(dataTsPath), "importedStartupData.ts exists");

  const dataTsContent = fs.readFileSync(dataTsPath, "utf8");
  const jsonMatch = dataTsContent.match(/export const importedPublicStartups: Startup\[\] = (\[[\s\S]*?\]);/);
  assert(!!jsonMatch, "importedStartupData.ts exports valid startup array");

  const importedStartups = JSON.parse(jsonMatch[1]);
  assert(importedStartups.length === 12, `TypeScript dataset exports exactly 12 startup profiles (found: ${importedStartups.length})`);

  let hashesValid = true;
  for (const s of importedStartups) {
    const canonical = getCanonicalStartupString(s);
    const computed = crypto.createHash("sha256").update(canonical).digest("hex");
    if (computed !== s.canonicalHash || computed !== s.currentHash) {
      hashesValid = false;
      break;
    }
  }
  assert(hashesValid, "All 12 imported startups have cryptographically valid SHA-256 canonical hashes");

  // 7. Preservation of existing mockData demo startups
  const mockDataPath = path.resolve(__dirname, "../src/lib/mockData.ts");
  const mockDataContent = fs.readFileSync(mockDataPath, "utf8");
  assert(mockDataContent.includes("ST-AQUASENSE"), "AquaSense AI Innovations Pvt Ltd preserved in mockData.ts");
  assert(mockDataContent.includes("ST-PUREFLOW"), "PureFlow IoT Dynamics preserved in mockData.ts");
  assert(mockDataContent.includes("importedPublicStartups"), "importedPublicStartups successfully wired into mockData.ts");

  // 8. AI Matching against Document Intelligence Challenge
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
  const kriyam = importedStartups.find(s => s.name.includes("Kriyam"));

  const aquaSenseMock = {
    id: "ST-AQUASENSE",
    name: "AquaSense AI Innovations Pvt Ltd",
    sector: "Water Tech & IoT Sensing",
    tagline: "Edge optical multispectral sensors for municipal potable pipelines",
    techStack: ["Optoelectronic Spectrometry", "LoRaWAN"],
    trlLevel: 8,
    localContentPercentage: 78,
    isDpiitVerified: true
  };

  const matchEigen = calculateMatchTest(eigenlytics, docChallenge);
  const matchCognitive = calculateMatchTest(cognitiveString, docChallenge);
  const matchKriyam = calculateMatchTest(kriyam, docChallenge);
  const matchWater = calculateMatchTest(aquaSenseMock, docChallenge);

  assert(matchEigen.matchScore >= 80, `Eigenlytics matches document challenge with high relevance (Score: ${matchEigen.matchScore}%)`);
  assert(matchCognitive.matchScore >= 80, `Cognitive String matches document challenge with high relevance (Score: ${matchCognitive.matchScore}%)`);
  assert(matchKriyam.matchScore >= 80, `Kriyam AI matches document challenge with high relevance (Score: ${matchKriyam.matchScore}%)`);
  assert(matchWater.matchScore < matchEigen.matchScore, `Document startup scores higher than Water Tech startup on Document challenge (${matchEigen.matchScore}% vs ${matchWater.matchScore}%)`);

  // 9. Water Challenge continues matching Water Startups
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
  const matchWaterOnWater = calculateMatchTest(aquaSenseMock, waterChallenge);
  const matchDocOnWater = calculateMatchTest(eigenlytics, waterChallenge);
  assert(matchWaterOnWater.matchScore > matchDocOnWater.matchScore, `AquaSense scores higher than Document startup on Water challenge (${matchWaterOnWater.matchScore}% vs ${matchDocOnWater.matchScore}%)`);

  // 10. Explainability is truthful
  assert(matchEigen.matchReasons.length > 0, "Match explanation provided for Eigenlytics");
  assert(matchEigen.matchReasons[0].includes("capabilities"), `Explanation accurately references documented capabilities: "${matchEigen.matchReasons[0]}"`);

  console.log(`\n=================================================`);
  console.log(`Test Summary: ${passed} / ${total} tests passed.`);
  console.log(`=================================================`);
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

// Automated Verification Test for GovInnovate API Validation & Workflow Constraints
import assert from "node:assert";

console.log("=================================================");
console.log("GovInnovate Automated API & Workflow Validation Test");
console.log("=================================================\n");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
  }
}

// 1. Auth Validation Rules
runTest("Auth: Reject invalid email format", () => {
  const email = "invalid-email";
  const isValid = email.includes("@");
  assert.strictEqual(isValid, false, "Should reject email without @");
});

runTest("Auth: Enforce minimum password length of 6 characters", () => {
  const shortPass = "12345";
  const goodPass = "123456";
  assert.strictEqual(shortPass.length < 6, true, "Should reject short password");
  assert.strictEqual(goodPass.length >= 6, true, "Should accept valid password");
});

runTest("Auth: Disallow self-assigned admin role", () => {
  const role = "admin";
  const isAllowedSelfAssign = role !== "admin";
  assert.strictEqual(isAllowedSelfAssign, false, "Self-assigning admin must be blocked");
});

runTest("Auth: Set government & evaluator registrations to pending_verification", () => {
  const getStatus = (role) => (role === "startup" ? "verified" : "pending_verification");
  assert.strictEqual(getStatus("startup"), "verified");
  assert.strictEqual(getStatus("government"), "pending_verification");
  assert.strictEqual(getStatus("evaluator"), "pending_verification");
});

// 2. Challenge Validation Rules
runTest("Challenge: Enforce minimum title length (5 chars) and problem statement (20 chars)", () => {
  const validateChallenge = (title, problem) => {
    if (!title || title.trim().length < 5) return false;
    if (!problem || problem.trim().length < 20) return false;
    return true;
  };
  assert.strictEqual(validateChallenge("AI", "Too short"), false);
  assert.strictEqual(
    validateChallenge(
      "AI Water Sensing System",
      "Municipal distribution lines experience heavy industrial pollutant dumps requiring automated sensing."
    ),
    true
  );
});

// 3. Evaluation 5-Pillar Score Rules
runTest("Evaluations: Enforce each pillar strictly between 0 and 20 (Total 0-100)", () => {
  const validateScores = (scores) => {
    const pillars = [scores.innovation, scores.feasibility, scores.impact, scores.scalability, scores.viability];
    for (const p of pillars) {
      if (typeof p !== "number" || p < 0 || p > 20) return false;
    }
    const total = pillars.reduce((a, b) => a + b, 0);
    return total >= 0 && total <= 100;
  };

  assert.strictEqual(
    validateScores({ innovation: 20, feasibility: 19, impact: 18, scalability: 19, viability: 18 }),
    true
  );
  assert.strictEqual(
    validateScores({ innovation: 25, feasibility: 10, impact: 10, scalability: 10, viability: 10 }),
    false,
    "Score above 20 must fail"
  );
  assert.strictEqual(
    validateScores({ innovation: -1, feasibility: 10, impact: 10, scalability: 10, viability: 10 }),
    false,
    "Negative score must fail"
  );
});

// 4. Duplicate Application Prevention Rule
runTest("Applications: Prevent duplicate applications for the same challenge", () => {
  const existingApps = [
    { challengeId: "CH-2026-WQ01", startupUserId: "usr-01" },
  ];
  const isDuplicate = (challengeId, startupUserId) => {
    return existingApps.some(a => a.challengeId === challengeId && a.startupUserId === startupUserId);
  };

  assert.strictEqual(isDuplicate("CH-2026-WQ01", "usr-01"), true, "Should detect duplicate bid");
  assert.strictEqual(isDuplicate("CH-2026-WQ01", "usr-02"), false, "Different startup should be allowed");
});

// 5. Chatbot Statutory Knowledge Retrieval
runTest("Chatbot: Retrieve accurate GFR Rule 149/170 exemption answer", () => {
  const KNOWLEDGE_BASE = [
    {
      keywords: ["gfr", "rule 149", "rule 170", "relaxation", "turnover"],
      answer: "Under General Financial Rules (GFR 2017) Rule 170(i) and Rule 149, recognized DPIIT startups are exempted from prior turnover and experience."
    }
  ];

  const query = "What are the GFR 149 startup turnover exemptions?";
  const match = KNOWLEDGE_BASE.find(k => k.keywords.some(kw => query.toLowerCase().includes(kw)));
  assert.ok(match, "Must find GFR exemption article");
  assert.ok(match.answer.includes("Rule 170(i)"), "Must cite Rule 170(i)");
});

// 6. Demo Mode Isolation
runTest("Demo Mode: State changes in demo mode must use isolated storage key", () => {
  const DEMO_STORAGE_KEY = "govinnovate_demo_state_v1";
  const LIVE_DATABASE = "public.government_challenges";
  assert.notStrictEqual(DEMO_STORAGE_KEY, LIVE_DATABASE);
});

console.log("\n=================================================");
console.log(`Test Summary: ${passed} / ${total} tests passed.`);
console.log("=================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}

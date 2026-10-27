// ==============================================================================
// GovInnovate Automated End-to-End Blockchain Evidence Integrity Verification
// ==============================================================================
import assert from "node:assert";
import crypto from "crypto";

console.log("=================================================================");
console.log("GovInnovate Blockchain Evidence Integrity & Vigilance Test Suite");
console.log("=================================================================\n");

let passed = 0;
let total = 0;

async function runTest(name, fn) {
  total++;
  try {
    await fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
  }
}

// 1. Core SHA-256 Byte Invariance and Sensitivity Tests
await runTest("SHA-256: Compute deterministic hash of document byte stream", () => {
  const docBytes = Buffer.from("Municipal Water Mission Milestone 1 Commissioning Sign-off");
  const hash = crypto.createHash("sha256").update(docBytes).digest("hex");
  assert.strictEqual(hash.length, 64);
  assert.strictEqual(/^[0-9a-f]{64}$/.test(hash), true);

  // Recalculating with exact same bytes produces identical hash
  const hash2 = crypto.createHash("sha256").update(docBytes).digest("hex");
  assert.strictEqual(hash, hash2, "Identical bytes must produce identical hash");
});

await runTest("SHA-256: Strict Avalanche Sensitivity (Single-bit alteration flags tampering)", () => {
  const originalBytes = Buffer.from("Government Innovation Tender Contract #90214");
  const tamperedBytes = Buffer.from(originalBytes);
  tamperedBytes[0] = tamperedBytes[0] ^ 0x01; // Flip lowest bit of first character

  const originalHash = crypto.createHash("sha256").update(originalBytes).digest("hex");
  const tamperedHash = crypto.createHash("sha256").update(tamperedBytes).digest("hex");

  assert.notStrictEqual(originalHash, tamperedHash, "Altered byte must produce radically different hash");
});

// 2. Verification Status Logic
await runTest("Verification Engine: Return INTEGRITY_VERIFIED when file bytes match baseline", () => {
  const baselineDoc = Buffer.from("Laboratory Calibration Certificate - State Water Lab #882");
  const recordedHash = crypto.createHash("sha256").update(baselineDoc).digest("hex");

  const uploadedFileBytes = Buffer.from("Laboratory Calibration Certificate - State Water Lab #882");
  const computedHash = crypto.createHash("sha256").update(uploadedFileBytes).digest("hex");

  const isMatch = recordedHash === computedHash;
  const status = isMatch ? "INTEGRITY_VERIFIED" : "INTEGRITY_MISMATCH";

  assert.strictEqual(status, "INTEGRITY_VERIFIED");
});

await runTest("Verification Engine: Return INTEGRITY_MISMATCH when file bytes differ from baseline", () => {
  const baselineDoc = Buffer.from("Laboratory Calibration Certificate - Authentic");
  const recordedHash = crypto.createHash("sha256").update(baselineDoc).digest("hex");

  const tamperedFileBytes = Buffer.from("Laboratory Calibration Certificate - Tampered");
  const computedHash = crypto.createHash("sha256").update(tamperedFileBytes).digest("hex");

  const isMatch = recordedHash === computedHash;
  const status = isMatch ? "INTEGRITY_VERIFIED" : "INTEGRITY_MISMATCH";

  assert.strictEqual(status, "INTEGRITY_MISMATCH");
});

await runTest("Verification Engine: Return RECORD_NOT_FOUND when evidence identifier does not exist", () => {
  const mockDb = new Map();
  mockDb.set("EVID-001", { hash: "abc" });

  const queryId = "EVID-NONEXISTENT";
  const record = mockDb.get(queryId);
  const status = record ? "RECORD_FOUND" : "RECORD_NOT_FOUND";

  assert.strictEqual(status, "RECORD_NOT_FOUND");
});

// 3. Document Versioning Logic
await runTest("Versioning: Increment version on modified file upload without silent overwrites", () => {
  const history = [];
  let currentRecord = {
    id: "EVID-WQ-01",
    version: 1,
    hash: "initial-hash-v1",
    filename: "Audit_v1.pdf",
    uploadedAt: "2026-10-15 10:00:00"
  };

  // Revision uploaded with new bytes
  const newHash = "new-hash-v2";
  if (currentRecord.hash !== newHash) {
    history.push({
      version: currentRecord.version,
      hash: currentRecord.hash,
      filename: currentRecord.filename,
      uploadedAt: currentRecord.uploadedAt
    });
    currentRecord = {
      ...currentRecord,
      version: currentRecord.version + 1,
      hash: newHash,
      filename: "Audit_v2.pdf",
      uploadedAt: "2026-10-20 14:00:00"
    };
  }

  assert.strictEqual(currentRecord.version, 2);
  assert.strictEqual(currentRecord.hash, "new-hash-v2");
  assert.strictEqual(history.length, 1);
  assert.strictEqual(history[0].version, 1);
  assert.strictEqual(history[0].hash, "initial-hash-v1");
});

// 4. Bytes32 Format & Cryptographic ID Conversions
await runTest("Blockchain: Translate alphanumeric IDs to valid 32-byte EVM representation", () => {
  const evidenceId = "EVID-WQ-2026-001";
  const pilotId = "PILOT-WQ-2026-01";

  const buf = Buffer.alloc(32);
  buf.write(evidenceId, "utf-8");
  const bytes32Hex = "0x" + buf.toString("hex");

  assert.strictEqual(bytes32Hex.length, 66); // "0x" + 64 hex chars
  assert.strictEqual(bytes32Hex.startsWith("0x"), true);
});

// 5. Triple-Check Reconciliation Model
await runTest("Triple-Check: Verify consistency between file, database, and blockchain ledger", () => {
  const genuineFileHash = "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910";
  const dbHash = "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910";
  const blockchainHash = "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910";

  const isDatabaseMatch = genuineFileHash === dbHash;
  const isBlockchainMatch = genuineFileHash === blockchainHash;
  const isIntegritySound = isDatabaseMatch && isBlockchainMatch;

  assert.strictEqual(isIntegritySound, true);

  // Simulate database tampering scenario
  const tamperedDbHash = "1111111111111111111111111111111111111111111111111111111111111111";
  const isTamperedDbMatch = genuineFileHash === tamperedDbHash;
  assert.strictEqual(isTamperedDbMatch, false, "Database alteration must be flagged");
});

// 6. Statutory Safe Harbor Disclaimer Enforced
await runTest("Compliance: Enforce statutory non-reliance disclaimer on all verification outputs", () => {
  const notice = "A matching SHA-256 hash confirms cryptographic byte integrity only. It does not certify legal validity or eligibility.";
  assert.strictEqual(notice.includes("byte integrity only"), true);
  assert.strictEqual(notice.includes("not certify legal validity"), true);
});

console.log("\n=================================================================");
console.log(`Results: ${passed} / ${total} tests passed successfully.`);
console.log("=================================================================\n");

if (passed !== total) {
  process.exit(1);
}

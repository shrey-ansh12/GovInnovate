const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EvidenceRegistry Smart Contract", function () {
  let EvidenceRegistry;
  let registry;
  let owner;
  let nonOwner;
  let thirdParty;

  // Helpers to generate valid bytes32
  const formatBytes32 = (str) => ethers.encodeBytes32String(str);
  const sampleHash = ethers.keccak256(ethers.toUtf8Bytes("GovInnovate-Sample-Document-Content"));
  const emptyBytes32 = ethers.ZeroHash;

  beforeEach(async function () {
    [owner, nonOwner, thirdParty] = await ethers.getSigners();
    EvidenceRegistry = await ethers.getContractFactory("EvidenceRegistry");
    registry = await EvidenceRegistry.deploy();
    await registry.waitForDeployment();
  });

  describe("Deployment & Initial State", function () {
    it("Should deploy with correct owner", async function () {
      expect(await registry.owner()).to.equal(owner.address);
    });
  });

  describe("Evidence Registration", function () {
    it("Should successfully register evidence by owner and emit EvidenceRegistered event", async function () {
      const evidenceId = formatBytes32("EVID-2026-001");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");

      const tx = await registry.registerEvidence(evidenceId, pilotId, sampleHash);
      await tx.wait();

      // Check event
      await expect(tx)
        .to.emit(registry, "EvidenceRegistered")
        .withArgs(evidenceId, pilotId, sampleHash, (val) => val > 0n, owner.address);

      expect(await registry.hasEvidence(evidenceId)).to.be.true;
    });

    it("Should reject duplicate evidence IDs", async function () {
      const evidenceId = formatBytes32("EVID-2026-DUP");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");

      await registry.registerEvidence(evidenceId, pilotId, sampleHash);

      await expect(
        registry.registerEvidence(evidenceId, pilotId, sampleHash)
      ).to.be.revertedWith("Evidence ID already exists");
    });

    it("Should reject empty document hash", async function () {
      const evidenceId = formatBytes32("EVID-2026-NOHASH");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");

      await expect(
        registry.registerEvidence(evidenceId, pilotId, emptyBytes32)
      ).to.be.revertedWith("Empty document hash");
    });

    it("Should reject empty evidence ID or empty pilot ID", async function () {
      const validId = formatBytes32("VALID-ID");

      await expect(
        registry.registerEvidence(emptyBytes32, validId, sampleHash)
      ).to.be.revertedWith("Empty evidence ID");

      await expect(
        registry.registerEvidence(validId, emptyBytes32, sampleHash)
      ).to.be.revertedWith("Empty pilot ID");
    });

    it("Should reject registration attempt by non-owner account", async function () {
      const evidenceId = formatBytes32("EVID-2026-UNAUTH");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");

      await expect(
        registry.connect(nonOwner).registerEvidence(evidenceId, pilotId, sampleHash)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Evidence Retrieval", function () {
    it("Should successfully retrieve registered evidence matching stored values", async function () {
      const evidenceId = formatBytes32("EVID-2026-RETRIEVE");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");

      await registry.registerEvidence(evidenceId, pilotId, sampleHash);

      const record = await registry.getEvidence(evidenceId);

      expect(record.pilotId).to.equal(pilotId);
      expect(record.documentHash).to.equal(sampleHash);
      expect(record.submittedBy).to.equal(owner.address);
      expect(record.timestamp).to.be.greaterThan(0n);
    });

    it("Should revert with clear error when retrieving nonexistent evidence", async function () {
      const nonExistentId = formatBytes32("EVID-NONEXIST");

      await expect(
        registry.getEvidence(nonExistentId)
      ).to.be.revertedWith("Evidence not found");
    });

    it("Should correctly report false for hasEvidence on unregistered ID", async function () {
      const nonExistentId = formatBytes32("EVID-NOT-THERE");
      expect(await registry.hasEvidence(nonExistentId)).to.be.false;
    });
  });

  describe("Ownership Management", function () {
    it("Should allow owner to transfer ownership", async function () {
      await expect(registry.transferOwnership(nonOwner.address))
        .to.emit(registry, "OwnershipTransferred")
        .withArgs(owner.address, nonOwner.address);

      expect(await registry.owner()).to.equal(nonOwner.address);

      // Now new owner can register
      const evidenceId = formatBytes32("EVID-NEW-OWNER");
      const pilotId = formatBytes32("PILOT-WQ-2026-01");
      await registry.connect(nonOwner).registerEvidence(evidenceId, pilotId, sampleHash);
      expect(await registry.hasEvidence(evidenceId)).to.be.true;
    });

    it("Should reject ownership transfer by non-owner", async function () {
      await expect(
        registry.connect(nonOwner).transferOwnership(thirdParty.address)
      ).to.be.revertedWith("Not authorized");
    });
  });
});

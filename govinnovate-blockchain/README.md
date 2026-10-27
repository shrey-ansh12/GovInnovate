# GovInnovate Blockchain Evidence Registry & Document Integrity Engine

Welcome to the **GovInnovate Blockchain Evidence Integrity Rail**. This subsystem provides tamper-evident, decentralized verification for startup compliance documents and municipal pilot milestone evidence.

---

## 1. Architectural Rationale: Why SHA-256 & Why Blockchain?

### A. Why SHA-256 Checksums?
In public sector innovation sandboxes, government departments require verifiable assurance that laboratory test reports, sensor telemetry logs, DPIIT recognition certificates, and milestone deliverables have not been altered after submission.

* **Deterministic & Collision-Resistant:** Any input byte stream produces a unique 64-character hexadecimal digest (256 bits).
* **Strict Avalanche Effect:** Altering even a single bit in a 50-page PDF document completely scrambles the output hash, immediately flagging unauthorized alterations.
* **Backend Byte Calculation:** GovInnovate calculates the SHA-256 hash strictly on the backend using the raw uploaded file buffer. Checksums provided by client browsers are never trusted.

> **CRITICAL LEGAL NOTICE & SAFE HARBOR:**  
> A matching SHA-256 hash proves that the current file matches the recorded byte stream. It does **NOT** prove that the original document is legally valid, authentic, or factually correct. Never use a matching hash as the sole basis for determining startup eligibility or awarding a government contract.

---

### B. Why Blockchain in Addition to a Database?
While a relational database (PostgreSQL / Supabase) stores metadata and version history, centralized databases are mutable: an administrator or compromised backend service could alter records unnoticed.

* **Decentralized Immutability:** Committing the document's SHA-256 hash to an EVM smart contract ensures that no party—neither the startup nor the department—can rewrite or forge past deliverables.
* **Triple-Check Reconciliation:** When verifying evidence, GovInnovate performs a triple check:
  1. Recalculates the SHA-256 hash from current file bytes.
  2. Compares against the recorded database baseline.
  3. Compares against the immutable smart contract record on-chain.
  If any value diverges, the platform flags `INTEGRITY_MISMATCH`.

---

### C. Data Privacy: On-Chain vs. Off-Chain Separation

To protect sensitive intellectual property, proprietary sensor source code, and confidential government records:

| Stored Off-Chain (Database / Storage) | Stored On-Chain (`EvidenceRegistry.sol`) |
| :--- | :--- |
| Full PDF / raw document bytes | 32-byte SHA-256 document digest (`bytes32`) |
| Startup trade secrets & proprietary algorithms | Unique Evidence ID (`bytes32`) |
| Private cloud storage URLs | Associated Pilot ID (`bytes32`) |
| Evaluator internal scoring rationales | Block timestamp (`uint256`) |
| Personally Identifiable Information (PII) | Submitting wallet address (`address`) |

**Zero Private Data Rule:** No documents, names, or URLs are ever transmitted in smart contract calls or emitted in blockchain events.

---

## 2. Smart Contract Overview: `EvidenceRegistry.sol`

Located at `govinnovate-blockchain/contracts/EvidenceRegistry.sol`:

* **`registerEvidence(bytes32 evidenceId, bytes32 pilotId, bytes32 documentHash)`**:  
  Restricted to the authorized operator (`onlyOwner`). Enforces non-zero IDs, non-zero hashes, and prevents duplicate registration of existing evidence IDs. Emits `EvidenceRegistered`.
* **`getEvidence(bytes32 evidenceId)`**:  
  Read-only view function retrieving `(pilotId, documentHash, timestamp, submittedBy)`. Reverts with `"Evidence not found"` if nonexistent.
* **`hasEvidence(bytes32 evidenceId)`**:  
  Utility function to query registration state without reverting.
* **`transferOwnership(address newOwner)`**:  
  Permits transferring administrative control to a multi-sig or governance DAO.

### Prototype Limitations
* **Access Control:** The contract uses single-key `onlyOwner` access control. In a full production deployment, multi-signature authority (e.g., Gnosis Safe) or role-based access control (OpenZeppelin `AccessControl` with separate `REGISTRAR_ROLE` and `ADMIN_ROLE`) should be implemented.
* **Fee Sponsorship:** Transactions require gas. In production, an Account Abstraction (ERC-4337) Paymaster or meta-transaction relayer should sponsor gas fees for government operators.

---

## 3. Getting Started & Local Development

### Prerequisites
* Node.js v20+ or v24+
* npm v10+

### Installation
Navigate to the blockchain workspace:
```bash
cd govinnovate-blockchain
npm.cmd install
```

### Compile Smart Contracts
```bash
npx.cmd hardhat compile
```

### Run Automated Unit Tests
```bash
npx.cmd hardhat test
```
*Tests verify successful registration, event emission, duplicate ID rejection, zero-hash rejection, unauthorized registration protection, and nonexistent lookup reverts.*

---

## 4. Local Demonstration & Hackathon Mode

The GovInnovate platform includes an automated local demonstration mode that operates without requiring external blockchain funding or testnet faucets:

### Option A: Local Hardhat Node
1. Start the local node:
   ```bash
   cd govinnovate-blockchain
   npx.cmd hardhat node
   ```
2. Deploy the contract:
   ```bash
   npx.cmd hardhat run scripts/deploy.js --network localhost
   ```
3. Copy the deployed contract address (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`) to `GovInnovate/.env.local`.

### Option B: In-Memory Simulated Sandbox (Zero-Config Hackathon Mode)
If no local node is running, the backend transparently activates `SimulatedBlockchainRegistry`:
* Simulates smart contract registration with deterministic state and collision prevention.
* Clearly marks all records with `[DEMO SIMULATED LEDGER]` badges.
* Supports interactive tampering tests in the UI where altering a single byte triggers `INTEGRITY_MISMATCH`.

---

## 5. Connecting the Backend

In `GovInnovate/.env.local` (or `.env`):
```env
# Execution mode: "live" or "simulated"
BLOCKCHAIN_MODE=simulated

# JSON-RPC Provider URL
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545

# Deployed EvidenceRegistry Contract Address
BLOCKCHAIN_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Server-side operator private key (Hardhat Account #0 default)
BLOCKCHAIN_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

## 6. Optional Testnet Deployment (Ethereum Sepolia)

To deploy to public Ethereum Sepolia:

1. Obtain a Sepolia RPC endpoint (e.g., from Alchemy or Infura).
2. Obtain a small amount of testnet Sepolia ETH from a public faucet (e.g., Google Cloud Web3 Faucet or Sepolia PoW Faucet).
3. Set the following environment variables in `govinnovate-blockchain/.env`:
   ```env
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
   ```
4. Deploy the contract:
   ```bash
   npx.cmd hardhat run scripts/deploy.js --network sepolia
   ```
5. Update `GovInnovate/.env.local` with the resulting Sepolia contract address and RPC URL.

> **SECURITY REMINDER:** Never commit `.env` or private keys to source control. Never use a mainnet account or real cryptocurrency funds.

---

## 7. Status Reference Guide

| Status Label | Color | Meaning |
| :--- | :--- | :--- |
| `Pending Registration` | Amber | Document uploaded and hashed; awaiting blockchain inclusion. |
| `Registered On Blockchain` | Emerald | SHA-256 digest committed and confirmed on ledger. |
| `Integrity Verified` | Green | Recalculated file bytes match database and on-chain records. |
| `Integrity Mismatch` | Red | File bytes differ from recorded hash. Unauthorized modification flagged. |
| `Record Not Found` | Slate | No baseline record exists for the provided identifier. |
| `Blockchain Unavailable` | Yellow | Remote RPC error; operating on local fallback. |

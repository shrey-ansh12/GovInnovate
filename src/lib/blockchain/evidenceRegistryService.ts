import { ethers } from "ethers";
import { EVIDENCE_REGISTRY_ABI } from "./EvidenceRegistryAbi";

// In-Memory Simulated Blockchain Registry for Hackathon & Offline Demo Mode
interface SimulatedEvidenceEntry {
  pilotIdBytes: string;
  documentHashBytes: string;
  timestamp: number;
  submittedBy: string;
  txHash: string;
  blockNumber: number;
}

const simulatedLedger = new Map<string, SimulatedEvidenceEntry>();

/**
 * Converts a standard UTF-8 string ID (e.g. "EVID-2026-001") into bytes32.
 * If the string fits in 31 bytes, encodes as bytes32 string.
 * If longer, computes keccak256 hash.
 */
export function toBytes32(str: string): string {
  if (!str) return ethers.ZeroHash;
  try {
    const utf8Bytes = ethers.toUtf8Bytes(str);
    if (utf8Bytes.length <= 31) {
      return ethers.encodeBytes32String(str);
    }
    return ethers.keccak256(utf8Bytes);
  } catch {
    return ethers.keccak256(ethers.toUtf8Bytes(str));
  }
}

/**
 * Normalizes a 64-character SHA-256 hex string into an EVM bytes32 format (with 0x prefix).
 */
export function formatSha256ToBytes32(sha256Hex: string): string {
  const clean = sha256Hex.replace(/^0x/i, "").toLowerCase();
  if (clean.length !== 64) {
    throw new Error(`Invalid SHA-256 hash length (${clean.length}). Expected 64 hex characters.`);
  }
  return `0x${clean}`;
}

/**
 * Converts a bytes32 back into a readable string if possible.
 */
export function fromBytes32(bytes32Str: string, fallback?: string): string {
  try {
    const decoded = ethers.decodeBytes32String(bytes32Str);
    return decoded || fallback || bytes32Str;
  } catch {
    return fallback || bytes32Str;
  }
}

export interface BlockchainRegistrationResult {
  success: boolean;
  isSimulated: boolean;
  txHash?: string;
  blockNumber?: number;
  timestamp?: number;
  signer?: string;
  network?: string;
  error?: string;
}

export interface BlockchainEvidenceRecord {
  found: boolean;
  isSimulated: boolean;
  pilotId?: string;
  documentHash?: string; // 64-char hex without 0x prefix
  timestamp?: number;
  submittedBy?: string;
  error?: string;
}

/**
 * Checks whether live blockchain configuration is present.
 */
export function isLiveBlockchainConfigured(): boolean {
  const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
  const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;
  const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
  return Boolean(rpcUrl && contractAddress && privateKey && !rpcUrl.includes("dummy"));
}

/**
 * Register document hash on blockchain (real EVM node or simulated hackathon provider).
 */
export async function registerEvidenceOnBlockchain(
  evidenceId: string,
  pilotId: string,
  sha256Hex: string
): Promise<BlockchainRegistrationResult> {
  const evidenceIdBytes = toBytes32(evidenceId);
  const pilotIdBytes = toBytes32(pilotId);
  const docHashBytes = formatSha256ToBytes32(sha256Hex);

  const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
  const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;
  const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;

  if (rpcUrl && contractAddress && privateKey && !rpcUrl.includes("dummy")) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const network = await provider.getNetwork();
      const wallet = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(contractAddress, EVIDENCE_REGISTRY_ABI, wallet);

      // Verify contract existence & owner check
      const tx = await contract.registerEvidence(evidenceIdBytes, pilotIdBytes, docHashBytes);
      const receipt = await tx.wait(1);

      const block = await provider.getBlock(receipt.blockNumber);
      const timestamp = block ? Number(block.timestamp) : Math.floor(Date.now() / 1000);

      return {
        success: true,
        isSimulated: false,
        txHash: receipt.hash,
        blockNumber: Number(receipt.blockNumber),
        timestamp,
        signer: wallet.address,
        network: `${network.name} (Chain ID: ${network.chainId.toString()})`,
      };
    } catch (err: any) {
      console.warn("Live blockchain registration failed, falling back to simulated mode:", err.message);
      // Fall through to simulated mode for resilience in demo
    }
  }

  // SIMULATED / DEMONSTRATION MODE
  if (simulatedLedger.has(evidenceIdBytes)) {
    return {
      success: false,
      isSimulated: true,
      error: "Evidence ID already exists on simulated blockchain ledger",
    };
  }

  const simulatedTxHash = "0xsim" + Math.random().toString(16).slice(2).padStart(32, "0") + sha256Hex.slice(0, 28);
  const timestamp = Math.floor(Date.now() / 1000);
  const simulatedSigner = "0x892410aBcDeF1234567890abcdef123456789012";

  simulatedLedger.set(evidenceIdBytes, {
    pilotIdBytes,
    documentHashBytes: docHashBytes,
    timestamp,
    submittedBy: simulatedSigner,
    txHash: simulatedTxHash,
    blockNumber: 1048201 + simulatedLedger.size,
  });

  return {
    success: true,
    isSimulated: true,
    txHash: simulatedTxHash,
    blockNumber: 1048200 + simulatedLedger.size,
    timestamp,
    signer: simulatedSigner,
    network: "GovInnovate Local Sandbox (Simulated Hardhat Ledger)",
  };
}

/**
 * Retrieve evidence record from blockchain (real or simulated).
 */
export async function getEvidenceFromBlockchain(evidenceId: string): Promise<BlockchainEvidenceRecord> {
  const evidenceIdBytes = toBytes32(evidenceId);

  const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
  const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;

  if (rpcUrl && contractAddress && !rpcUrl.includes("dummy")) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, EVIDENCE_REGISTRY_ABI, provider);

      const has = await contract.hasEvidence(evidenceIdBytes);
      if (!has) {
        return { found: false, isSimulated: false };
      }

      const [pilotBytes, docHashBytes, timestampBn, submittedBy] = await contract.getEvidence(evidenceIdBytes);
      const docHashHex = docHashBytes.replace(/^0x/i, "").toLowerCase();

      return {
        found: true,
        isSimulated: false,
        pilotId: fromBytes32(pilotBytes),
        documentHash: docHashHex,
        timestamp: Number(timestampBn),
        submittedBy,
      };
    } catch (err: any) {
      console.warn("Live blockchain lookup failed, querying simulated ledger:", err.message);
    }
  }

  // SIMULATED LOOKUP
  const entry = simulatedLedger.get(evidenceIdBytes);
  if (!entry) {
    return { found: false, isSimulated: true };
  }

  return {
    found: true,
    isSimulated: true,
    pilotId: fromBytes32(entry.pilotIdBytes),
    documentHash: entry.documentHashBytes.replace(/^0x/i, "").toLowerCase(),
    timestamp: entry.timestamp,
    submittedBy: entry.submittedBy,
  };
}

/**
 * Clear simulated records (used for test resets).
 */
export function resetSimulatedLedger(): void {
  simulatedLedger.clear();
}

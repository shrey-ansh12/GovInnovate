"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  FileCheck2, 
  Copy, 
  Check, 
  AlertTriangle, 
  X, 
  Layers, 
  ExternalLink,
  RefreshCw,
  Cpu,
  Lock,
  FileText
} from "lucide-react";
import { EvidenceRecord, EvidenceVerificationResponse } from "@/types";

interface EvidenceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceRecord: EvidenceRecord | null;
  onRefreshRecord?: (updated: EvidenceRecord) => void;
}

export const EvidenceVerificationModal: React.FC<EvidenceVerificationModalProps> = ({
  isOpen,
  onClose,
  evidenceRecord,
  onRefreshRecord,
}) => {
  const [activeTab, setActiveTab] = useState<"verify" | "history">("verify");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<EvidenceVerificationResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [tamperModeActive, setTamperModeActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen || !evidenceRecord) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunVerification = async (tamper: boolean = false) => {
    setIsVerifying(true);
    setTamperModeActive(tamper);
    try {
      let body: any;
      let headers: any = {};

      if (selectedFile) {
        const formData = new FormData();
        if (tamper) {
          // Intentionally tamper file bytes
          const arrayBuffer = await selectedFile.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          if (bytes.length > 10) {
            bytes[10] = bytes[10] ^ 0xff; // Flip bits at byte 10
          }
          const tamperedBlob = new Blob([bytes], { type: selectedFile.type });
          formData.append("file", tamperedBlob, selectedFile.name);
        } else {
          formData.append("file", selectedFile);
        }
        formData.append("evidenceId", evidenceRecord.id);
        body = formData;
      } else {
        // Use recorded hash, or if tampering, simulate a 1-character altered hash
        headers["Content-Type"] = "application/json";
        const hashToTest = tamper 
          ? (evidenceRecord.fileHash.slice(0, -2) + "ff") 
          : evidenceRecord.fileHash;
        body = JSON.stringify({
          evidenceId: evidenceRecord.id,
          fileHash: hashToTest,
        });
      }

      const res = await fetch("/api/evidence/verify", {
        method: "POST",
        headers,
        body,
      });

      const data: EvidenceVerificationResponse = await res.json();
      setVerificationResult(data);
    } catch (err: any) {
      console.error("Verification call error:", err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-[#D5D0C7] max-w-2xl w-full p-6 space-y-5 my-8 text-left">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#EDE9E1]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4 text-[#147452]" />
              Cryptographic Integrity Verification Engine
            </div>
            <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <span>Evidence Audit:</span>
              <span className="font-mono text-base font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#0F3854] border border-slate-200">
                {evidenceRecord.id}
              </span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-[#5B6A78] hover:text-[#141F2B] p-1 rounded hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EDE9E1] text-xs font-semibold">
          <button
            onClick={() => setActiveTab("verify")}
            className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "verify"
                ? "border-[#0F3854] text-[#0F3854]"
                : "border-transparent text-[#5B6A78] hover:text-[#141F2B]"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Triple-Check Integrity
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-[#0F3854] text-[#0F3854]"
                : "border-transparent text-[#5B6A78] hover:text-[#141F2B]"
            }`}
          >
            <Layers className="h-4 w-4" />
            Version History ({evidenceRecord.versionHistory?.length || 1})
          </button>
        </div>

        {activeTab === "verify" ? (
          <div className="space-y-4">
            {/* Metadata Summary Banner */}
            <div className="bg-[#FAF8F5] rounded border border-[#E2DED6] p-4 text-xs font-mono space-y-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[#5B6A78]">Associated Pilot:</span>{" "}
                  <strong className="text-[#0A2540]">{evidenceRecord.pilotId}</strong>
                </div>
                <div>
                  <span className="text-[#5B6A78]">Milestone:</span>{" "}
                  <strong className="text-[#0A2540]">{evidenceRecord.milestoneId || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[#5B6A78]">Original File:</span>{" "}
                  <span className="text-[#0A2540] font-semibold truncate block sm:inline">
                    {evidenceRecord.originalFilename}
                  </span>
                </div>
                <div>
                  <span className="text-[#5B6A78]">File Size / Version:</span>{" "}
                  <strong className="text-[#0A2540]">
                    {Math.round(evidenceRecord.fileSizeBytes / 1024)} KB (v{evidenceRecord.version})
                  </strong>
                </div>
              </div>
            </div>

            {/* SHA-256 Checksum Cards */}
            <div className="space-y-2.5">
              {/* Database Hash Card */}
              <div className="p-3 rounded border border-slate-200 bg-slate-50 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-semibold text-[#5B6A78] uppercase text-[10px] flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-[#0F3854]" />
                    1. Database-Recorded SHA-256 Checksum
                  </span>
                  <button
                    onClick={() => copyToClipboard(evidenceRecord.fileHash, "dbHash")}
                    className="text-[#0F3854] hover:underline flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedKey === "dbHash" ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    {copiedKey === "dbHash" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="font-mono text-[11px] text-[#0A2540] break-all bg-white p-2 rounded border border-slate-200 select-all">
                  {evidenceRecord.fileHash}
                </div>
              </div>

              {/* Blockchain Hash Card */}
              <div className="p-3 rounded border border-slate-200 bg-slate-50 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-semibold text-[#5B6A78] uppercase text-[10px] flex items-center gap-1">
                    <Cpu className="h-3.5 w-3.5 text-[#0F3854]" />
                    2. Blockchain-Recorded SHA-256 Checksum
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      evidenceRecord.blockchainStatus === "Registered On Blockchain"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {evidenceRecord.blockchainStatus}
                    </span>
                    {evidenceRecord.blockchainTxHash && (
                      <button
                        onClick={() => copyToClipboard(evidenceRecord.blockchainTxHash!, "txHash")}
                        className="text-[#0F3854] hover:underline flex items-center gap-1 text-[11px] font-mono"
                      >
                        {copiedKey === "txHash" ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        {copiedKey === "txHash" ? "Copied Tx" : "Copy Tx"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#0A2540] break-all bg-white p-2 rounded border border-slate-200 select-all">
                  {evidenceRecord.fileHash}
                </div>
                {evidenceRecord.blockchainTxHash && (
                  <div className="mt-1.5 text-[10px] font-mono text-[#5B6A78] flex items-center justify-between">
                    <span>Tx Hash: <code className="text-[#0A2540]">{evidenceRecord.blockchainTxHash.slice(0, 24)}...</code></span>
                    {evidenceRecord.isSimulatedBlockchain && (
                      <span className="text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                        [DEMO SIMULATED LEDGER]
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Re-Upload or Live File Input */}
            <div className="p-3 rounded border border-dashed border-[#B8B0A2] bg-[#FAF8F5] text-xs space-y-2">
              <label className="font-mono font-semibold text-[#141F2B] block">
                Optional: Upload physical file to recalculate hash byte-by-byte:
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#0F3854] file:text-white hover:file:bg-[#1D4E72]"
              />
              {selectedFile && (
                <div className="text-[11px] font-mono text-emerald-700">
                  Ready to test with uploaded file: <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => handleRunVerification(false)}
                disabled={isVerifying}
                className="px-4 py-2 rounded bg-[#147452] hover:bg-[#0f583e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isVerifying ? "animate-spin" : ""}`} />
                <span>Execute Cryptographic Integrity Verification</span>
              </button>

              <button
                onClick={() => handleRunVerification(true)}
                disabled={isVerifying}
                className="px-3.5 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
                title="Simulates altering 1 byte in the file to demonstrate tamper detection"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Simulate Byte Tamper</span>
              </button>
            </div>

            {/* Verification Result Banner */}
            {verificationResult && (
              <div className={`p-4 rounded border text-xs space-y-2 ${
                verificationResult.status === "INTEGRITY_VERIFIED"
                  ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {verificationResult.status === "INTEGRITY_VERIFIED" ? (
                    <>
                      <ShieldCheck className="h-5 w-5 text-[#147452]" />
                      <span>INTEGRITY_VERIFIED: File Bytes Exactly Match Baseline Hash</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-5 w-5 text-red-600" />
                      <span>INTEGRITY_MISMATCH: Cryptographic Checksum Divergence Detected</span>
                    </>
                  )}
                </div>

                <p className="font-mono text-xs">{verificationResult.message}</p>

                <div className="font-mono text-[11px] space-y-1 pt-1 border-t border-black/10">
                  <div>Computed Hash : <code className="font-bold">{verificationResult.computedHash}</code></div>
                  {verificationResult.databaseHash && (
                    <div>Recorded Hash : <code>{verificationResult.databaseHash}</code></div>
                  )}
                  {verificationResult.blockchainHash && (
                    <div>On-Chain Hash : <code>{verificationResult.blockchainHash}</code></div>
                  )}
                </div>

                {tamperModeActive && (
                  <div className="mt-2 p-2 rounded bg-red-100/70 border border-red-300 text-[11px] font-sans">
                    <strong>Vigilance Simulation Note:</strong> File bytes were altered. Because SHA-256 is avalanche-sensitive, altering even a single bit completely changes the hash, reliably flagging unauthorized manipulation.
                  </div>
                )}
              </div>
            )}

            {/* Mandatory Statutory Safe Harbor Notice */}
            <div className="p-3 rounded bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <strong className="font-semibold">Statutory Safe Harbor & Legal Disclaimer:</strong>
                <p className="mt-0.5">
                  A matching SHA-256 hash confirms cryptographic byte integrity only. It proves that the verified file is byte-for-byte identical to the recorded upload. It does <strong>NOT</strong> prove that the original document is legally valid, authentic, or factually correct, and must <strong>never</strong> be used as the sole basis for determining startup eligibility or awarding a government contract.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Version History Tab */
          <div className="space-y-3">
            <p className="text-xs text-[#5B6A78]">
              GovInnovate strictly preserves document version history. If a document changes, a new immutable version is registered instead of silently overwriting the previous verification record.
            </p>

            <div className="space-y-2">
              {(evidenceRecord.versionHistory || []).map((hist, i) => (
                <div key={i} className="p-3 rounded border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-[#0A2540]">
                      Version {hist.version} {hist.version === evidenceRecord.version ? "(Current Active)" : "(Archived)"}
                    </span>
                    <span className="text-[#5B6A78]">{hist.uploadedAt}</span>
                  </div>
                  <div className="text-[11px] text-[#5B6A78]">
                    File: <strong className="text-[#0A2540]">{hist.originalFilename}</strong> ({Math.round(hist.fileSizeBytes / 1024)} KB)
                  </div>
                  <div className="font-mono text-[10px] text-[#0A2540] break-all bg-white p-1.5 rounded border border-slate-200">
                    SHA-256: {hist.fileHash}
                  </div>
                  {hist.blockchainTxHash && (
                    <div className="text-[10px] font-mono text-[#147452]">
                      On-Chain Tx: {hist.blockchainTxHash.slice(0, 32)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#EDE9E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-[#141F2B] transition-colors"
          >
            Close Audit Modal
          </button>
        </div>
      </div>
    </div>
  );
};

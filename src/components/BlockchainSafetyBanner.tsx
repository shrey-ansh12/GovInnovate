"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, Blocks, ArrowRight, Lock } from "lucide-react";

interface BlockchainSafetyBannerProps {
  className?: string;
}

export const BlockchainSafetyBanner: React.FC<BlockchainSafetyBannerProps> = ({ className = "" }) => {
  const { openBlockchainModal, challenge, applications } = useApp();

  const totalAnchors = 1 + applications.length + applications.filter(a => !!a.evaluatorScore).length;

  return (
    <div className={`w-full bg-gradient-to-r from-[#0F3854] via-[#14476b] to-[#0F3854] text-white rounded-xl p-4 sm:p-4.5 border border-[#1D4E72] shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-white">
                Blockchain Data Safety Rails Implemented
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 uppercase">
                Smart Contract Active
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
              Every challenge, startup bid, and 5-pillar evaluator score is cryptographically sealed via <code className="font-mono text-emerald-200">EvidenceRegistry.sol</code> with SHA-256 hashing to guarantee zero retroactive tampering.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] text-slate-300 uppercase">On-Chain Anchors</span>
            <span className="font-bold text-emerald-300">{totalAnchors} Sealed Proofs</span>
          </div>
          <button
            onClick={openBlockchainModal}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
            title="Open Blockchain Explorer & Proofs"
          >
            <Blocks className="h-4 w-4" />
            <span>Verify Blockchain Ledger</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

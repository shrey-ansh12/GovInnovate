"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Clock, 
  Lock
} from "lucide-react";

export const AuditTrail: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterType, setFilterType] = useState<string>("All");

  const filteredLogs = auditLogs.filter(log => {
    if (filterType === "All") return true;
    return log.badge === filterType;
  });

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Security":
        return "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]";
      case "AI Decision":
        return "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]";
      case "Procurement":
        return "bg-[#FAF8F5] text-[#0A2540] border-[#0F3854]";
      case "Evaluation":
        return "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]";
      case "Payment":
        return "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]";
      default:
        return "bg-[#FAF8F5] text-[#5B6A78] border-[#E2DED6]";
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
            <Lock className="h-4 w-4 text-[#147452]" />
            Vigilance & Accountability Ledger • GFR Rule 173 Compliance
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
            Tamper-Evident Procurement Audit Trail
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Every AI recommendation, tender evaluation, scoring change, and treasury disbursement is timestamped.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {["All", "AI Decision", "Procurement", "Evaluation", "Security", "Payment"].map((b) => (
            <button
              key={b}
              onClick={() => setFilterType(b)}
              className={`px-3 py-1.5 rounded transition-all ${
                filterType === b
                  ? "bg-[#0F3854] text-white"
                  : "bg-white border border-[#E2DED6] text-[#5B6A78] hover:bg-[#F2EFEB]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white rounded border border-[#E2DED6] overflow-hidden">
        <div className="p-4 bg-[#FAF8F5] border-b border-[#EDE9E1] text-xs font-mono font-semibold text-[#5B6A78] grid grid-cols-12 gap-2 uppercase tracking-wider">
          <span className="col-span-3">Timestamp / Actor</span>
          <span className="col-span-3">Action Type</span>
          <span className="col-span-4">Audit Details & Cryptographic Hash</span>
          <span className="col-span-2 text-right">Category</span>
        </div>

        <div className="divide-y divide-[#EDE9E1]">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-[#FAF8F5] transition-colors grid grid-cols-12 gap-2 items-center text-xs">
              {/* Actor & Time */}
              <div className="col-span-3 font-mono">
                <p className="font-semibold text-[#0A2540] truncate">{log.user}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#5B6A78] mt-0.5">
                  <Clock className="h-3 w-3" />
                  {log.timestamp}
                </div>
              </div>

              {/* Action Name */}
              <div className="col-span-3 font-mono">
                <span className="text-[11px] font-semibold text-[#0F3854] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E2DED6]">
                  {log.action}
                </span>
                <p className="text-[10px] text-[#7E8B97] mt-0.5">Role: {log.role}</p>
              </div>

              {/* Details */}
              <div className="col-span-4 text-[#5B6A78] leading-relaxed pr-2">
                <p>{log.details}</p>
                <span className="font-mono text-[9px] text-[#7E8B97]">hash: {log.id}-verified</span>
              </div>

              {/* Badge */}
              <div className="col-span-2 text-right font-mono">
                <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${getBadgeStyle(log.badge)}`}>
                  {log.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

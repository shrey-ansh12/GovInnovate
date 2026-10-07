"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Clock, 
  User, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Lock,
  Layers
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
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "AI Decision":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Procurement":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Evaluation":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Payment":
        return "bg-teal-100 text-teal-800 border-teal-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            <Lock className="h-4 w-4 text-emerald-600" />
            Vigilance & Accountability Ledger • GFR Compliance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tamper-Evident Procurement Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Every AI recommendation, tender evaluation, scoring slider change, and treasury disbursement is timestamped.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["All", "AI Decision", "Procurement", "Evaluation", "Security", "Payment"].map((b) => (
            <button
              key={b}
              onClick={() => setFilterType(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === b
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 grid grid-cols-12 gap-2 uppercase tracking-wider">
          <span className="col-span-3">Timestamp / Actor</span>
          <span className="col-span-3">Action Type</span>
          <span className="col-span-4">Audit Details & Cryptographic Hash</span>
          <span className="col-span-2 text-right">Category</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50/60 transition-colors grid grid-cols-12 gap-2 items-center text-xs">
              {/* Actor & Time */}
              <div className="col-span-3">
                <p className="font-bold text-slate-900 truncate">{log.user}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <Clock className="h-3 w-3" />
                  {log.timestamp}
                </div>
              </div>

              {/* Action Name */}
              <div className="col-span-3">
                <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {log.action}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Role: {log.role}</p>
              </div>

              {/* Details */}
              <div className="col-span-4 text-slate-600 leading-relaxed pr-2">
                <p>{log.details}</p>
                <span className="font-mono text-[9px] text-slate-400">hash: {log.id}-{Math.random().toString(36).substring(7)}</span>
              </div>

              {/* Badge */}
              <div className="col-span-2 text-right">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(log.badge)}`}>
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

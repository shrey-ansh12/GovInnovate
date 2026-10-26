"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Clock, 
  Lock,
  Search,
  Filter,
  ShieldCheck,
  Building2,
  Rocket,
  Award
} from "lucide-react";

export const AuditTrail: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("All");
  const [filterRole, setFilterRole] = useState<string>("All");

  const filteredLogs = auditLogs.filter(log => {
    // Search query filter
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = filterType === "All" || log.badge === filterType;

    // Role filter
    const matchesRole = filterRole === "All" || log.role === filterRole;

    return matchesSearch && matchesCategory && matchesRole;
  });

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Security":
        return "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]";
      case "Matching":
        return "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]";
      case "Procurement":
        return "bg-[#FAF8F5] text-[#0A2540] border-[#0F3854]";
      case "Evaluation":
        return "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]";
      case "Milestone":
        return "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]";
      case "Payment":
        return "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]";
      case "Decision":
        return "bg-[#EBF6F0] text-[#147452] border-[#147452] font-bold";
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
            Vigilance & Accountability Ledger • GFR Rule 173 Guidelines
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
            Searchable Procurement Audit Trail ({filteredLogs.length} Entries)
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Immutable log of challenge publishing, eligibility checks, 5-pillar evaluations, milestone evidence reviews, and scale decisions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7E8B97]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actor, action, or keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#E2DED6] bg-white focus:outline-none focus:border-[#0F3854]"
          />
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-white rounded border border-[#E2DED6]">
        {/* Role Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[#7E8B97] mr-1">Role:</span>
          {["All", "government", "startup", "evaluator"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                filterRole === r
                  ? "bg-[#0F3854] text-white font-semibold"
                  : "bg-[#FAF8F5] text-[#5B6A78] hover:bg-[#F2EFEB]"
              }`}
            >
              {r === "All" ? "All Roles" : r}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[#7E8B97] mr-1">Category:</span>
          {["All", "Procurement", "Evaluation", "Milestone", "Decision", "Matching", "Security", "Payment"].map((b) => (
            <button
              key={b}
              onClick={() => setFilterType(b)}
              className={`px-2.5 py-1 rounded transition-all text-xs ${
                filterType === b
                  ? "bg-[#0F3854] text-white font-semibold"
                  : "bg-[#FAF8F5] border border-[#E2DED6] text-[#5B6A78] hover:bg-[#F2EFEB]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white rounded border border-[#E2DED6] overflow-hidden shadow-2xs">
        <div className="p-4 bg-[#FAF8F5] border-b border-[#EDE9E1] text-xs font-mono font-semibold text-[#5B6A78] grid grid-cols-12 gap-2 uppercase tracking-wider">
          <span className="col-span-3">Timestamp / Actor</span>
          <span className="col-span-3">Action Type</span>
          <span className="col-span-4">Audit Details</span>
          <span className="col-span-2 text-right">Category</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#5B6A78]">
            No audit records matching your search or filters.
          </div>
        ) : (
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
                  <span className="font-mono text-[9px] text-[#7E8B97]">ID: {log.id}</span>
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
        )}
      </div>
    </div>
  );
};

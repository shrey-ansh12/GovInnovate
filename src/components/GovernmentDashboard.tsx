"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Sparkles, 
  PlusCircle, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ExternalLink,
  ChevronRight,
  BarChart3,
  Users,
  Target
} from "lucide-react";

export const GovernmentDashboard: React.FC = () => {
  const { challenge, applications, pilot, setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
            <Building2 className="h-4 w-4" />
            National Jal Shakti Innovation Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Government Department Procurement Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Monitor startup innovation pipelines, trigger AI problem decompositions, review scored bids, supervise 90-day sandbox pilots, and sanction direct scale-up orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveView("create_challenge")}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Innovation Challenge
          </button>
          <button
            onClick={() => setActiveView("audit_trail")}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-sky-300" />
            Vigilance & Audit Trail
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Active Challenges</div>
          <div className="text-2xl font-extrabold text-slate-900">1 Challenge</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> 12 Startups Matched
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Applications In Review</div>
          <div className="text-2xl font-extrabold text-blue-700">{applications.length} Proposals</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> DPIIT Verified Bidders
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">90-Day Sandbox Pilot</div>
          <div className="text-2xl font-extrabold text-emerald-700">Day 90 / 90</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Score: 96.4/100 (Exceeded)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Scale-Up Expansion</div>
          <div className="text-2xl font-extrabold text-indigo-700">5 → 50 Sites</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            ₹18.5 Cr Budget Approved
          </div>
        </div>
      </div>

      {/* Featured Challenge Lifecycle Pipeline Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Active Flagship Sandbox
              </span>
              <span className="text-xs text-slate-400">ID: {challenge.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {challenge.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {challenge.department} • Budget: {challenge.budget}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("ai_startup_matches")}
              className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              View 12 AI Matches
            </button>
            <button
              onClick={() => setActiveView("pilot_management")}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              Manage Pilot Sandbox
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Procurement Step by Step Visual Bar */}
        <div className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            End-to-End Procurement Lifecycle Progression
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { num: 1, label: "Challenge Created", view: "create_challenge", done: true },
              { num: 2, label: "AI Matching (94%)", view: "ai_startup_matches", done: true },
              { num: 3, label: "Startup Applied", view: "application_review", done: true },
              { num: 4, label: "DPIIT Verified", view: "application_review", done: true },
              { num: 5, label: "Evaluator Scored", view: "evaluation_scorecard", done: true },
              { num: 6, label: "90-Day Pilot (5 Sites)", view: "pilot_management", done: true },
              { num: 7, label: "Lab Validation", view: "validation_report", done: true },
              { num: 8, label: "Scale-Up (50 Sites)", view: "scale_up", done: challenge.status === "Scale-Up" || challenge.status === "Procurement Approved" },
            ].map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveView(step.view as any)}
                className={`p-3 rounded-2xl border text-center cursor-pointer transition-all hover:scale-[1.03] ${
                  step.done 
                    ? "bg-blue-50/80 border-blue-200 text-blue-900 shadow-xs" 
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                <div className={`w-6 h-6 mx-auto rounded-full text-xs font-bold flex items-center justify-center mb-1.5 ${
                  step.done ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  {step.done ? "✓" : step.num}
                </div>
                <p className="text-[11px] font-bold leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Pilot Metrics Snippet */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Selected Pilot Vendor</span>
            <p className="text-sm font-bold text-slate-900 mt-1">AquaSense AI Innovations Pvt Ltd</p>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">DPIIT-REC-89241-DL (TRL-8 Probes)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Pilot Locations Status</span>
            <p className="text-sm font-bold text-slate-900 mt-1">5 Municipal Reservoirs Live</p>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">99.8% Hardware Telemetry Uptime</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Commercial Next Step</span>
            <p className="text-sm font-bold text-slate-900 mt-1">Direct Procurement Sanction</p>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">₹18.5 Cr State Rollout Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

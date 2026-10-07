"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, 
  Send, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target, 
  ShieldAlert,
  Building2,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";

export const CreateChallenge: React.FC = () => {
  const { createChallengeAction, setActiveView } = useApp();

  const [rawProblem, setRawProblem] = useState(
    "Our municipal water pipelines experience sudden industrial pollutant dumps and heavy metal contamination. Lab testing takes 24-48 hours which is too slow. We need an automated IoT or AI sensing solution to detect contamination spikes within 5 minutes across 5 pilot sites, with zero false positives, before expanding city-wide."
  );

  const [department, setDepartment] = useState("National Water Mission & Urban Infrastructure Board");
  const [ministry, setMinistry] = useState("Ministry of Jal Shakti");
  const [category, setCategory] = useState("Water Tech / IoT & Clean Environment");
  const [budget, setBudget] = useState("₹2.40 Crore (Scale Allocation: ₹18.5 Cr)");
  const [pilotDuration, setPilotDuration] = useState("90 Days");
  const [targetLocations, setTargetLocations] = useState(5);
  const [scaleLocations, setScaleLocations] = useState(50);

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGeneratedDecomposition, setAiGeneratedDecomposition] = useState<{
    structuredTitle: string;
    summary: string;
    problemStatement: string;
    expectedOutcomes: string[];
    technicalThresholds: string[];
  } | null>({
    structuredTitle: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
    summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with AI telemetry.",
    problemStatement: "Traditional manual water sampling is reactive, intermittent, and vulnerable to undetected industrial contamination spills. Municipal bodies need continuous edge-AI sensor telemetry to trigger proactive public health alerts within 4 minutes of water anomalies across urban supply lines.",
    expectedOutcomes: [
      "Sub-5 minute latency for heavy metal / chemical surge detection",
      "99.2%+ sensor uptime in harsh submerged conditions",
      "Zero false-positive panic triggers on organic particulate fluctuations",
      "Seamless integration with state municipal command dashboards via open REST/MQTT APIs"
    ],
    technicalThresholds: [
      "CPCB / IS 10500:2012 compliance benchmark",
      "DPIIT startup recognition with relaxation under GFR Rule 149/170",
      "Local value addition ≥ 50% (Make in India Class-1 mandate)"
    ]
  });

  const handleAiDecompose = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setAiGeneratedDecomposition({
        structuredTitle: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
        summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with AI telemetry.",
        problemStatement: rawProblem,
        expectedOutcomes: [
          "Sub-5 minute latency for chemical and bacterial surge detection",
          "99.2%+ sensor uptime in submerged conditions without manual reagents",
          "Zero false-positive panic triggers on organic particulate fluctuations",
          "Direct dispatch of telemetry data to State Water SCADA System"
        ],
        technicalThresholds: [
          "CPCB & BIS IS 10500:2012 Drinking Water standards compliant",
          "Edge-computing capability to withstand cellular drops",
          "IP68 waterproof industrial rating for submersible probes"
        ]
      });
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChallengeAction({
      title: aiGeneratedDecomposition?.structuredTitle || "AI-Based Water Quality Monitoring System",
      department,
      ministry,
      category,
      budget,
      pilotDuration,
      summary: aiGeneratedDecomposition?.summary || "",
      problemStatement: aiGeneratedDecomposition?.problemStatement || rawProblem,
      expectedOutcomes: aiGeneratedDecomposition?.expectedOutcomes || [],
      targetLocations,
      scaleLocations,
      matchedCount: 12,
      applicationsCount: 4
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
          <Building2 className="h-4 w-4" />
          Government Department Sandbox Portal
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Innovation Challenge with AI Decomposition
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Enter your department’s raw operational problem. The GovInnovate AI engine translates colloquial requirements into a standardized public procurement challenge with quantifiable KPIs and statutory startup relaxation criteria.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Department & Ministry
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                placeholder="Department name"
              />
              <input
                type="text"
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                placeholder="Ministry name"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Departmental Problem Statement (Colloquial / Raw)
              </label>
              <button
                type="button"
                onClick={handleAiDecompose}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {isAiGenerating ? "Synthesizing with AI..." : "Re-run AI Generator"}
              </button>
            </div>
            <textarea
              rows={5}
              value={rawProblem}
              onChange={(e) => setRawProblem(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 leading-relaxed"
              placeholder="Describe what challenge your department is facing..."
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Tip: Include constraints such as location count, target response time, or specific contaminant classes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3 py-2 font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Pilot Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3 py-2 font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Pilot Sandbox Duration
              </label>
              <input
                type="text"
                value={pilotDuration}
                onChange={(e) => setPilotDuration(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 px-3 py-2 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Initial Pilot Sites
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetLocations}
                  onChange={(e) => setTargetLocations(Number(e.target.value))}
                  className="w-24 text-xs font-bold rounded-xl border border-slate-300 px-3 py-2"
                />
                <span className="text-xs text-slate-500">municipal wards / intake points</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Scale-Up Target
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={scaleLocations}
                  onChange={(e) => setScaleLocations(Number(e.target.value))}
                  className="w-24 text-xs font-bold rounded-xl border border-slate-300 px-3 py-2"
                />
                <span className="text-xs text-slate-500">zones across state</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="h-4 w-4" />
            Publish Challenge & Run AI Startup Matcher (12 Matched)
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Card: AI Decomposition Output Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-800/60">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span className="text-xs font-bold tracking-wider uppercase text-sky-300">
                  AI Challenge Generator Engine
                </span>
              </div>
              <span className="text-[10px] bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-400/30 text-sky-200">
                LLM Decomposer Active
              </span>
            </div>

            {aiGeneratedDecomposition && (
              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Standardized Challenge Title</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {aiGeneratedDecomposition.structuredTitle}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Procurement Objective Summary</p>
                  <p className="text-slate-300 leading-relaxed mt-0.5">
                    {aiGeneratedDecomposition.summary}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Quantifiable Technical Outcomes
                  </p>
                  <ul className="space-y-1.5">
                    {aiGeneratedDecomposition.expectedOutcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-indigo-900/80">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Regulatory & Statutory Relaxations (GFR 2017)
                  </p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {aiGeneratedDecomposition.technicalThresholds.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Help Card */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-amber-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              Automated DPIIT & GFR Exemption Applied
            </div>
            <p className="text-amber-800 leading-relaxed">
              Startups applying to this sandbox will automatically be granted prior experience and turnover exemptions under GFR 149/170, encouraging innovative deep-tech participation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

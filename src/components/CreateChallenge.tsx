"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Building2,
  SlidersHorizontal,
  AlertCircle
} from "lucide-react";

export const CreateChallenge: React.FC = () => {
  const { createChallengeAction, role, setRole } = useApp();

  const [rawProblem, setRawProblem] = useState(
    "Our municipal water distribution lines experience sudden industrial pollutant dumps and heavy metal contamination. Lab testing takes 24-48 hours which is too slow. We need an automated IoT sensing solution to detect contamination spikes within 5 minutes across 5 pilot sites, with zero false positives, before expanding city-wide."
  );

  const [department, setDepartment] = useState("National Water Mission & Urban Infrastructure Board");
  const [ministry, setMinistry] = useState("Ministry of Jal Shakti");
  const [category, setCategory] = useState("Water Tech / IoT & Clean Environment");
  const [budget, setBudget] = useState("₹28,50,000 (Pilot Phase Allocation • Scalable subject to approval)");
  const [pilotDuration, setPilotDuration] = useState("90 Days");
  const [targetLocations, setTargetLocations] = useState(5);
  const [scaleLocations, setScaleLocations] = useState(50);

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [structuredDecomposition, setStructuredDecomposition] = useState<{
    structuredTitle: string;
    summary: string;
    problemStatement: string;
    expectedOutcomes: string[];
    technicalThresholds: string[];
  } | null>({
    structuredTitle: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
    summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with edge telemetry.",
    problemStatement: "Traditional manual water sampling is reactive, intermittent, and vulnerable to undetected industrial contamination spills. Municipal bodies need continuous edge sensor telemetry to trigger proactive public health alerts within 5 minutes of water anomalies across urban supply lines.",
    expectedOutcomes: [
      "Sub-5 minute latency for heavy metal / chemical surge detection",
      "98.0%+ sensor uptime in harsh submerged conditions",
      "Under 2.0% false-positive rate on organic particulate fluctuations",
      "Standard integration with municipal command dashboards via REST/MQTT APIs"
    ],
    technicalThresholds: [
      "Minimum TRL 7 (Operational environment demonstration)",
      "Domestic Local Content ≥ 50% (Make in India Class-1 mandate)",
      "Reagent-free or low-maintenance probe design",
      "DPIIT startup recognition with relaxation subject to tender conditions"
    ]
  });

  const handleDecompose = async () => {
    setIsSynthesizing(true);
    try {
      const res = await fetch("/api/ai/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawProblem,
          department,
          ministry
        })
      });

      if (res.ok) {
        const data = await res.json();
        setStructuredDecomposition({
          structuredTitle: data.structuredTitle || "Automated Public Challenge Solution",
          summary: data.summary || "",
          problemStatement: data.problemStatement || rawProblem,
          expectedOutcomes: data.expectedOutcomes || [],
          technicalThresholds: data.technicalThresholds || []
        });
      }
    } catch (err) {
      console.warn("AI decomposition fetch failed:", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChallengeAction({
      title: structuredDecomposition?.structuredTitle || "AI-Based Water Quality Monitoring System",
      department,
      ministry,
      category,
      budget,
      pilotDuration,
      summary: structuredDecomposition?.summary || "",
      problemStatement: structuredDecomposition?.problemStatement || rawProblem,
      expectedOutcomes: structuredDecomposition?.expectedOutcomes || [],
      technicalThresholds: structuredDecomposition?.technicalThresholds || [],
      targetLocations,
      scaleLocations,
      matchedCount: 4,
      applicationsCount: 0
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-2">
          <Building2 className="h-4 w-4" />
          Government Procurement Desk • GFR 2017 Sandbox Framework
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
          Create & Publish Procurement Challenge
        </h1>
        <p className="text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
          Specify your department&apos;s operational bottleneck. The structured decomposition engine translates requirements into verifiable technical thresholds, expected outcomes, and rule-based matching criteria.
        </p>
      </div>

      {/* Role Notice */}
      {role !== "government" && (
        <div className="mb-6 p-4 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              You are currently viewing in <strong>{role}</strong> mode. Publishing a challenge requires the <strong>government</strong> role.
            </span>
          </div>
          <button
            onClick={() => setRole("government")}
            className="font-bold underline ml-2"
          >
            Switch to Government
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 bg-white rounded border border-[#E2DED6] p-6 space-y-6 shadow-2xs">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2">
              Procuring Department & Ministry
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] px-3 py-2.5 bg-[#FAF8F5] focus:bg-white text-[#141F2B]"
                placeholder="Department name"
              />
              <input
                type="text"
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] px-3 py-2.5 bg-[#FAF8F5] focus:bg-white text-[#141F2B]"
                placeholder="Ministry name"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78]">
                Problem Statement & Operational Context
              </label>
              <button
                type="button"
                onClick={handleDecompose}
                disabled={isSynthesizing}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3854] hover:underline"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#147452]" />
                {isSynthesizing ? "Synthesizing..." : "Format Specifications"}
              </button>
            </div>
            <textarea
              rows={5}
              value={rawProblem}
              onChange={(e) => setRawProblem(e.target.value)}
              className="w-full text-xs rounded border border-[#E2DED6] p-3.5 bg-[#FAF8F5] focus:bg-white text-[#141F2B] leading-relaxed"
              placeholder="Describe what challenge your department is facing..."
            />
            <p className="text-[11px] text-[#5B6A78] mt-1.5 font-mono">
              Specify constraints such as target location count, required alert latency, or sensor specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Pilot Phase Allocation
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Pilot Duration
              </label>
              <input
                type="text"
                value={pilotDuration}
                onChange={(e) => setPilotDuration(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#EDE9E1] font-mono text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Initial Pilot Sites
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetLocations}
                  onChange={(e) => setTargetLocations(Number(e.target.value))}
                  className="w-20 text-xs font-bold rounded border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
                />
                <span className="text-[11px] text-[#5B6A78]">intake points</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Proposed Scale-Up Target
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={scaleLocations}
                  onChange={(e) => setScaleLocations(Number(e.target.value))}
                  className="w-20 text-xs font-bold rounded border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
                />
                <span className="text-[11px] text-[#5B6A78]">zones (conditional)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 px-6 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <Send className="h-4 w-4" />
            <span>Publish Challenge & Run Rule-Based Matching Engine</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Card: Decomposition Output Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D4E72]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-100">
                  Structured Specification Preview
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-emerald-300">
                Rule-Ready
              </span>
            </div>

            {structuredDecomposition && (
              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Formal Challenge Title</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {structuredDecomposition.structuredTitle}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Objective Summary</p>
                  <p className="text-slate-300 leading-relaxed mt-0.5">
                    {structuredDecomposition.summary}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Quantifiable Target Outcomes
                  </p>
                  <ul className="space-y-1.5">
                    {structuredDecomposition.expectedOutcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#1D4E72]">
                  <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Rule-Based Eligibility Thresholds
                  </p>
                  <ul className="space-y-1 text-slate-300 text-[11px] font-mono">
                    {structuredDecomposition.technicalThresholds.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Statutory Disclaimer Card */}
          <div className="bg-[#FEF7EA] rounded p-4 border border-[#F6E1B9] text-[#8A5B0B] text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <ShieldAlert className="h-4 w-4 text-[#8A5B0B]" />
              Statutory Procurement Notice
            </div>
            <p className="leading-relaxed">
              Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval. Startup relaxations for experience and turnover apply subject to tender conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

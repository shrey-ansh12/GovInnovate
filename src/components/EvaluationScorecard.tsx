"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  FileText, 
  AlertTriangle,
  Info
} from "lucide-react";

export const EvaluationScorecard: React.FC = () => {
  const { applications, evaluateApplicationAction, setActiveView } = useApp();
  const app = applications.find(a => a.startupId === "ST-AQUASENSE") || applications[0];

  const [scores, setScores] = useState({
    innovation: 19,
    feasibility: 19,
    impact: 20,
    scalability: 19,
    cost: 18,
    security: 19,
  });

  const [feedback, setFeedback] = useState(
    "AquaSense AI's reagent-free optical spectrophotometer provides breakthrough field telemetry for urban potable water lines. The zero consumables requirement removes heavy operational recurring expenses. Sub-3 minute edge inferencing latency reliably meets municipal safety targets. Recommend immediate 90-day sandbox pilot."
  );

  const totalScore = scores.innovation + scores.feasibility + scores.impact + scores.scalability + scores.cost + scores.security;
  // Total is out of 120 (6 criteria x 20), normalize or keep out of 100
  const normalizedOutOf100 = Math.round((totalScore / 120) * 100);

  const handleScoreChange = (pillar: keyof typeof scores, val: number) => {
    setScores(prev => ({ ...prev, [pillar]: val }));
  };

  const handleSubmitScore = () => {
    evaluateApplicationAction(app.id, {
      ...scores,
      feedback,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
          <Award className="h-4 w-4" />
          Expert Technical Evaluation Board • Multi-Pillar Scoring
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Scorecard: {app.startupName}
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Evaluate bidder against objective innovation criteria. Verified DPIIT exemptions are automatically factored into qualification checks.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: 6 Scoring Criteria Sliders */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Technical Due Diligence Matrix (Max 20 Points per Pillar)
            </h2>
            <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
              Normalized: {normalizedOutOf100} / 100
            </span>
          </div>

          <div className="space-y-5">
            {/* 1. Innovation */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>1. Deep-Tech Innovation & Patents (20%)</span>
                <span className="text-blue-700">{scores.innovation} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Reagent-free optical spectrophotometer with 3 granted patents.</p>
            </div>

            {/* 2. Feasibility */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>2. Technical Feasibility & TRL Maturity (20%)</span>
                <span className="text-blue-700">{scores.feasibility} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.feasibility}
                onChange={(e) => handleScoreChange("feasibility", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">TRL-8 field validated in Karnataka urban water boards.</p>
            </div>

            {/* 3. Impact */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>3. Citizen Public Health Impact (20%)</span>
                <span className="text-blue-700">{scores.impact} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Prevents widespread chemical poisoning via real-time alerts.</p>
            </div>

            {/* 4. Scalability */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>4. Architectural & Production Scalability (20%)</span>
                <span className="text-blue-700">{scores.scalability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => handleScoreChange("scalability", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Ready for 50-location rollout in under 30 calendar days.</p>
            </div>

            {/* 5. Cost */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>5. Commercial Cost-Effectiveness (20%)</span>
                <span className="text-blue-700">{scores.cost} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.cost}
                onChange={(e) => handleScoreChange("cost", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Eliminates ₹42L/year recurring consumable reagent costs.</p>
            </div>

            {/* 6. Security */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>6. Cyber & Sensor Telemetry Security (20%)</span>
                <span className="text-blue-700">{scores.security} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.security}
                onChange={(e) => handleScoreChange("security", Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">AES-256 hardware encrypted MQTT telemetry over private APN.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Evaluator Technical Feedback & Pilot Recommendation
            </label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-300 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleSubmitScore}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit Formal Scorecard ({normalizedOutOf100}/100) & Recommend Shortlist
          </button>
        </div>

        {/* Right Column: AI Risk Summary & Proposal Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              AI Proposal Summary & Highlights
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-4">
              "{app.proposalSummary}"
            </p>
            <div className="space-y-2">
              {app.aiProposalHighlights?.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              DPIIT Statutory Verification Active
            </div>
            <p className="leading-relaxed">
              Certificate <strong className="text-emerald-950">{app.startupId === "ST-AQUASENSE" ? "DPIIT-REC-89241-DL" : "Verified"}</strong> verified by national portal. Exempted from prior turnover thresholds under GFR 149/170.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Awarded Score:</span>
              <span className="text-xl font-extrabold text-amber-400">{normalizedOutOf100} / 100</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Evaluator: Prof. Vinod Nair (Chairman, Technical Water Mission Panel)
            </div>
            <button
              onClick={() => setActiveView("application_review")}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              Return to Committee Shortlist Queue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

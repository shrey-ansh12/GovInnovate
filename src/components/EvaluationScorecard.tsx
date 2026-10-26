"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight
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
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-2">
          <Award className="h-4 w-4" />
          Expert Technical Evaluation Board • Multi-Pillar Scoring Rubric
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
          Application Scorecard: {app.startupName}
        </h1>
        <p className="text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
          Evaluate bidder against objective innovation criteria. Verified DPIIT exemptions are automatically factored into qualification checks.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: 6 Scoring Criteria Sliders */}
        <div className="lg:col-span-7 bg-white rounded border border-[#E2DED6] p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE9E1]">
            <h2 className="text-base font-semibold text-[#0A2540]">
              Technical Due Diligence Matrix (Max 20 Points per Pillar)
            </h2>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">
              Normalized: {normalizedOutOf100} / 100
            </span>
          </div>

          <div className="space-y-5">
            {/* 1. Innovation */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>1. Deep-Tech Innovation & Patents (20%)</span>
                <span className="text-[#0F3854]">{scores.innovation} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">Reagent-free optical spectrophotometer with 3 granted patents.</p>
            </div>

            {/* 2. Feasibility */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>2. Technical Feasibility & TRL Maturity (20%)</span>
                <span className="text-[#0F3854]">{scores.feasibility} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.feasibility}
                onChange={(e) => handleScoreChange("feasibility", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">TRL-8 field validated in Karnataka urban water boards.</p>
            </div>

            {/* 3. Impact */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>3. Citizen Public Health Impact (20%)</span>
                <span className="text-[#0F3854]">{scores.impact} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">Prevents widespread chemical poisoning via real-time alerts.</p>
            </div>

            {/* 4. Scalability */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>4. Architectural & Production Scalability (20%)</span>
                <span className="text-[#0F3854]">{scores.scalability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => handleScoreChange("scalability", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">Ready for 50-location rollout in under 30 calendar days.</p>
            </div>

            {/* 5. Cost */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>5. Commercial Cost-Effectiveness (20%)</span>
                <span className="text-[#0F3854]">{scores.cost} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.cost}
                onChange={(e) => handleScoreChange("cost", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">Eliminates ₹42L/year recurring consumable reagent costs.</p>
            </div>

            {/* 6. Security */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#0A2540] mb-1.5 font-mono">
                <span>6. Cyber & Sensor Telemetry Security (20%)</span>
                <span className="text-[#0F3854]">{scores.security} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.security}
                onChange={(e) => handleScoreChange("security", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <p className="text-[11px] text-[#5B6A78] mt-1">AES-256 hardware encrypted MQTT telemetry over private APN.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDE9E1]">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-2">
              Evaluator Technical Feedback & Pilot Recommendation
            </label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full text-xs rounded border border-[#E2DED6] p-3 text-[#141F2B] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
            />
          </div>

          <button
            onClick={handleSubmitScore}
            className="w-full py-3 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Submit Formal Scorecard ({normalizedOutOf100}/100) & Recommend Shortlist
          </button>
        </div>

        {/* Right Column: AI Risk Summary & Proposal Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0F3854]" />
              AI Proposal Summary & Highlights
            </h3>
            <p className="text-xs text-[#5B6A78] leading-relaxed bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] mb-4 font-mono">
              &quot;{app.proposalSummary}&quot;
            </p>
            <div className="space-y-2">
              {app.aiProposalHighlights?.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#141F2B]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#147452] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EBF6F0] rounded border border-[#C2E5D2] p-5 text-xs text-[#147452] space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-[#147452]" />
              DPIIT Statutory Verification Active
            </div>
            <p className="leading-relaxed">
              Certificate <strong className="text-[#0A2540]">{app.startupId === "ST-AQUASENSE" ? "DPIIT-REC-89241-DL" : "Verified"}</strong> verified by national portal. Exempted from prior turnover thresholds under GFR 173.
            </p>
          </div>

          <div className="bg-[#0F3854] text-white rounded p-5 border border-[#1D4E72] space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">Total Awarded Score:</span>
              <span className="text-xl font-semibold text-emerald-300">{normalizedOutOf100} / 100</span>
            </div>
            <div className="text-[11px] text-slate-300 font-sans">
              Evaluator: Prof. Vinod Nair (Chairman, Technical Water Mission Panel)
            </div>
            <button
              onClick={() => setActiveView("application_review")}
              className="w-full py-2.5 bg-white text-[#0F3854] hover:bg-slate-100 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Return to Committee Shortlist Queue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

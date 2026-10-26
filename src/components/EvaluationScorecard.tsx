"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  FileText
} from "lucide-react";
import { EvaluatorScore } from "@/types";

export const EvaluationScorecard: React.FC = () => {
  const { 
    applications, 
    evaluateApplicationAction, 
    setActiveView,
    role,
    setRole
  } = useApp();

  const app = applications.find(a => a.status === "Shortlisted") || applications[0];

  const [scores, setScores] = useState({
    innovation: 19,
    feasibility: 19,
    impact: 20,
    scalability: 19,
    viability: 18,
  });

  const [justifications, setJustifications] = useState({
    innovation: "Reagent-free optical spectrophotometer with 3 granted patents removes costly consumables.",
    feasibility: "Demonstrated TRL-8 field maturity in Karnataka urban water boards with standard flange mounts.",
    impact: "Sub-3 minute edge telemetry directly prevents widespread civic distribution of contaminated water.",
    scalability: "Standardized hardware architecture readily deploys across 50+ district intake hubs.",
    viability: "78% domestic local content and reasonable ₹28.5L budget provide clear public value-for-money."
  });

  const [evidenceReferences, setEvidenceReferences] = useState(
    "CPCB Lab Test Report #CPCB-2025-0819 & IIT Madras Optical Calibration Certificate #IITM-2024-C92"
  );

  const [feedback, setFeedback] = useState(
    "AquaSense AI demonstrates verified TRL-8 readiness, robust zero-reagent optics, and outstanding edge response latency. Strongly recommended for the 5-location sandbox pilot."
  );

  const totalScore = scores.innovation + scores.feasibility + scores.impact + scores.scalability + scores.viability;

  const handleScoreChange = (pillar: keyof typeof scores, val: number) => {
    setScores(prev => ({ ...prev, [pillar]: val }));
  };

  const handleJustificationChange = (pillar: keyof typeof justifications, text: string) => {
    setJustifications(prev => ({ ...prev, [pillar]: text }));
  };

  const handleSubmitScore = () => {
    const fullScore: EvaluatorScore = {
      ...scores,
      total: totalScore,
      justifications,
      evidenceReferences,
      feedback,
      evaluatorName: "Prof. Vinod Nair (Chairman, Technical Evaluation Board)",
      evaluatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
    };

    evaluateApplicationAction(app.id, fullScore);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-2">
          <Award className="h-4 w-4" />
          Technical Evaluation Board • 5-Pillar Structured Scoring Matrix
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
          Application Scorecard: {app.startupName}
        </h1>
        <p className="text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
          Score bidder across the five statutory pillars (0-20 points each, 100 points total). Each score requires an evidence-backed written justification.
        </p>
      </div>

      {/* Role Notice */}
      {role !== "evaluator" && (
        <div className="mb-6 p-4 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              You are currently viewing in <strong>{role}</strong> mode. Submitting official scores requires the <strong>evaluator</strong> role.
            </span>
          </div>
          <button
            onClick={() => setRole("evaluator")}
            className="font-bold underline ml-2"
          >
            Switch to Evaluator
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: 5 Scoring Criteria Sliders & Justifications */}
        <div className="lg:col-span-8 bg-white rounded border border-[#E2DED6] p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE9E1]">
            <h2 className="text-base font-bold text-[#0A2540]">
              5-Pillar Due Diligence Matrix (0–20 Points Each)
            </h2>
            <span className="text-sm font-mono font-bold px-3 py-1 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">
              Total Score: {totalScore} / 100
            </span>
          </div>

          <div className="space-y-6">
            {/* 1. Innovation */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#0A2540]">1. Innovation & Novelty (Max 20)</span>
                <span className="font-bold text-[#0F3854] text-sm bg-white px-2 py-0.5 rounded border border-[#E2DED6]">{scores.innovation} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <div>
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase block mb-1">Written Justification:</label>
                <input
                  type="text"
                  value={justifications.innovation}
                  onChange={(e) => handleJustificationChange("innovation", e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-white text-[#141F2B]"
                  placeholder="Justification for innovation score..."
                />
              </div>
            </div>

            {/* 2. Feasibility */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#0A2540]">2. Feasibility & TRL Maturity (Max 20)</span>
                <span className="font-bold text-[#0F3854] text-sm bg-white px-2 py-0.5 rounded border border-[#E2DED6]">{scores.feasibility} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.feasibility}
                onChange={(e) => handleScoreChange("feasibility", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <div>
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase block mb-1">Written Justification:</label>
                <input
                  type="text"
                  value={justifications.feasibility}
                  onChange={(e) => handleJustificationChange("feasibility", e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-white text-[#141F2B]"
                  placeholder="Justification for feasibility score..."
                />
              </div>
            </div>

            {/* 3. Impact */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#0A2540]">3. Public Health / Civic Impact (Max 20)</span>
                <span className="font-bold text-[#0F3854] text-sm bg-white px-2 py-0.5 rounded border border-[#E2DED6]">{scores.impact} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <div>
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase block mb-1">Written Justification:</label>
                <input
                  type="text"
                  value={justifications.impact}
                  onChange={(e) => handleJustificationChange("impact", e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-white text-[#141F2B]"
                  placeholder="Justification for impact score..."
                />
              </div>
            </div>

            {/* 4. Scalability */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#0A2540]">4. Scalability & Replication (Max 20)</span>
                <span className="font-bold text-[#0F3854] text-sm bg-white px-2 py-0.5 rounded border border-[#E2DED6]">{scores.scalability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => handleScoreChange("scalability", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <div>
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase block mb-1">Written Justification:</label>
                <input
                  type="text"
                  value={justifications.scalability}
                  onChange={(e) => handleJustificationChange("scalability", e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-white text-[#141F2B]"
                  placeholder="Justification for scalability score..."
                />
              </div>
            </div>

            {/* 5. Viability */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-[#0A2540]">5. Viability, Cost & Local Content (Max 20)</span>
                <span className="font-bold text-[#0F3854] text-sm bg-white px-2 py-0.5 rounded border border-[#E2DED6]">{scores.viability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.viability}
                onChange={(e) => handleScoreChange("viability", Number(e.target.value))}
                className="w-full h-1.5 bg-[#EDE9E1] rounded accent-[#0F3854] cursor-pointer"
              />
              <div>
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase block mb-1">Written Justification:</label>
                <input
                  type="text"
                  value={justifications.viability}
                  onChange={(e) => handleJustificationChange("viability", e.target.value)}
                  className="w-full text-xs p-2 rounded border border-[#E2DED6] bg-white text-[#141F2B]"
                  placeholder="Justification for viability score..."
                />
              </div>
            </div>
          </div>

          {/* Evidence References */}
          <div className="pt-4 border-t border-[#EDE9E1]">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">
              Evidence Document Citations & Test Report IDs
            </label>
            <input
              type="text"
              value={evidenceReferences}
              onChange={(e) => setEvidenceReferences(e.target.value)}
              className="w-full text-xs rounded border border-[#E2DED6] p-2.5 text-[#141F2B] bg-[#FAF8F5]"
              placeholder="e.g. CPCB Lab Report ID, NABL Cert Number, etc."
            />
          </div>

          {/* Overall Comments */}
          <div className="pt-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-1">
              Overall Technical Recommendation & Committee Feedback
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full text-xs rounded border border-[#E2DED6] p-3 text-[#141F2B] bg-[#FAF8F5] focus:bg-white"
            />
          </div>

          <button
            onClick={handleSubmitScore}
            className="w-full py-3 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Submit 5-Pillar Scorecard ({totalScore}/100) & Record in Audit Log
          </button>
        </div>

        {/* Right Column: Applicant Summary & Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0F3854]" />
              Applicant Proposal Summary
            </h3>
            <div className="text-xs text-[#5B6A78] leading-relaxed bg-[#FAF8F5] p-3 rounded border border-[#E2DED6]">
              {app.proposalSummary}
            </div>
            
            <div className="space-y-2 text-xs font-mono pt-2">
              <div className="flex justify-between py-1 border-b border-[#EDE9E1]">
                <span className="text-[#7E8B97]">TRL Readiness:</span>
                <span className="font-bold text-[#0A2540]">Level {app.trlLevel || 8}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EDE9E1]">
                <span className="text-[#7E8B97]">Local Content:</span>
                <span className="font-bold text-[#0F3854]">{app.localContentPercentage || 78}% (Class 1)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EDE9E1]">
                <span className="text-[#7E8B97]">Patents Granted:</span>
                <span className="font-bold text-[#0A2540]">{app.patentsCount || 3}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7E8B97]">Proposed Pilot Cost:</span>
                <span className="font-bold text-[#0A2540]">{app.proposedCost}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#EBF6F0] rounded border border-[#C2E5D2] p-5 text-xs text-[#147452] space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4 text-[#147452]" />
              DPIIT Relaxation Status
            </div>
            <p className="leading-relaxed">
              Certificate <strong className="text-[#0A2540]">DPIIT-REC-89241-DL</strong> verified. Turnover and experience relaxations apply subject to applicable procurement rules and performance criteria.
            </p>
          </div>

          <div className="bg-[#0F3854] text-white rounded p-5 border border-[#1D4E72] space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">Awarded Total:</span>
              <span className="text-2xl font-bold text-emerald-300">{totalScore} / 100</span>
            </div>
            <div className="text-[11px] text-slate-300 font-sans">
              Evaluator: Prof. Vinod Nair (Chairman, Technical Evaluation Board)
            </div>
            <button
              onClick={() => setActiveView("application_review")}
              className="w-full py-2.5 bg-white text-[#0F3854] hover:bg-slate-100 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Return to Review Queue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

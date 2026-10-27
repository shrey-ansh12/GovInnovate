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
    setRole,
    currentUser,
    selectedAppIdForScore,
    setSelectedAppIdForScore
  } = useApp();

  const app = applications.find(a => a.id === selectedAppIdForScore) || applications[0];

  const [scores, setScores] = useState({
    innovation: app.evaluatorScore?.innovation ?? 18,
    feasibility: app.evaluatorScore?.feasibility ?? 18,
    impact: app.evaluatorScore?.impact ?? 19,
    scalability: app.evaluatorScore?.scalability ?? 18,
    viability: app.evaluatorScore?.viability ?? 18,
  });

  const [justifications, setJustifications] = useState({
    innovation: app.evaluatorScore?.justifications.innovation || "Innovative technological design aligns with departmental operational requirements.",
    feasibility: app.evaluatorScore?.justifications.feasibility || "Demonstrated TRL maturity and robust implementation plan across designated field sites.",
    impact: app.evaluatorScore?.justifications.impact || "High direct civic benefit and rapid anomaly prevention for target public beneficiaries.",
    scalability: app.evaluatorScore?.justifications.scalability || "Modular architecture readily scales to district and municipal wide infrastructure.",
    viability: app.evaluatorScore?.justifications.viability || "High local content percentage and value-for-money cost allocation conform to GFR standards."
  });

  const [evidenceReferences, setEvidenceReferences] = useState(
    app.evaluatorScore?.evidenceReferences || "Technical Dossier, Lab Benchmarking Certificate, and DPIIT Registration Enclosure"
  );

  const [feedback, setFeedback] = useState(
    app.evaluatorScore?.feedback || `Proposal submitted by ${app.startupName} demonstrates sound technical readiness and viable pilot methodology.`
  );

  // Sync state when selected application changes
  React.useEffect(() => {
    if (app && app.evaluatorScore) {
      setScores({
        innovation: app.evaluatorScore.innovation,
        feasibility: app.evaluatorScore.feasibility,
        impact: app.evaluatorScore.impact,
        scalability: app.evaluatorScore.scalability,
        viability: app.evaluatorScore.viability
      });
      setJustifications(app.evaluatorScore.justifications);
      setEvidenceReferences(app.evaluatorScore.evidenceReferences || "");
      setFeedback(app.evaluatorScore.feedback);
    }
  }, [app?.id]);

  if (!app) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 font-sans text-center">
        <div className="max-w-md mx-auto bg-white rounded border border-[#E2DED6] p-8 shadow-xs">
          <Award className="h-10 w-10 text-[#7E8B97] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#0A2540]">No Applications Ready for Evaluation</h2>
          <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">
            There are currently no startup applications submitted for evaluation in the live database. You can explore the full evaluation flow in Demo Mode or submit a bid from the Startup Dashboard.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
              className="px-4 py-2 rounded bg-[#0F3854] text-white text-xs font-semibold hover:bg-[#1D4E72]"
            >
              Go to Startup Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      evaluatorName: currentUser?.name || "Prof. Vinod Nair (Chairman, Technical Evaluation Board)",
      evaluatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
    };

    evaluateApplicationAction(app.id, fullScore);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
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

        {/* Application Selector */}
        <div className="bg-white p-3 rounded border border-[#E2DED6] font-mono text-xs shrink-0 shadow-2xs">
          <label className="block text-[#5B6A78] uppercase text-[10px] font-bold mb-1">Select Candidate Proposal:</label>
          <select
            value={app.id}
            onChange={(e) => setSelectedAppIdForScore(e.target.value)}
            className="p-2 rounded border border-[#E2DED6] bg-[#FAF8F5] text-[#0A2540] font-bold text-xs"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.startupName} ({a.evaluatorScore ? `${a.evaluatorScore.total}/100` : "Pending"})
              </option>
            ))}
          </select>
        </div>
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
            {/* Pillar 1: Innovation */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">Pillar 1: Innovation & IP Defense</span>
                  <p className="text-[11px] text-[#5B6A78]">Novelty, patent defensibility, and technological differentiation.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854]">{scores.innovation} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", Number(e.target.value))}
                className="w-full accent-[#0F3854]"
              />
              <textarea
                rows={2}
                value={justifications.innovation}
                onChange={(e) => handleJustificationChange("innovation", e.target.value)}
                placeholder="Evaluator's technical justification for Innovation score..."
                className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-white focus:outline-none"
              />
            </div>

            {/* Pillar 2: Technical Feasibility */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">Pillar 2: Technical Feasibility & TRL</span>
                  <p className="text-[11px] text-[#5B6A78]">TRL validation, environmental resilience, and field demonstration history.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854]">{scores.feasibility} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.feasibility}
                onChange={(e) => handleScoreChange("feasibility", Number(e.target.value))}
                className="w-full accent-[#0F3854]"
              />
              <textarea
                rows={2}
                value={justifications.feasibility}
                onChange={(e) => handleJustificationChange("feasibility", e.target.value)}
                placeholder="Evaluator's technical justification for Feasibility score..."
                className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-white focus:outline-none"
              />
            </div>

            {/* Pillar 3: Civic & Public Impact */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">Pillar 3: Public Health & SLA Impact</span>
                  <p className="text-[11px] text-[#5B6A78]">Contamination detection speed, citizen protection, and operational cost savings.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854]">{scores.impact} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", Number(e.target.value))}
                className="w-full accent-[#0F3854]"
              />
              <textarea
                rows={2}
                value={justifications.impact}
                onChange={(e) => handleJustificationChange("impact", e.target.value)}
                placeholder="Evaluator's technical justification for Public Impact score..."
                className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-white focus:outline-none"
              />
            </div>

            {/* Pillar 4: Scalability */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">Pillar 4: Scalability & Interoperability</span>
                  <p className="text-[11px] text-[#5B6A78]">Ease of expanding from 5 pilot sites to 50+ municipal wards; REST/MQTT compliance.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854]">{scores.scalability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => handleScoreChange("scalability", Number(e.target.value))}
                className="w-full accent-[#0F3854]"
              />
              <textarea
                rows={2}
                value={justifications.scalability}
                onChange={(e) => handleJustificationChange("scalability", e.target.value)}
                placeholder="Evaluator's technical justification for Scalability score..."
                className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-white focus:outline-none"
              />
            </div>

            {/* Pillar 5: Commercial Viability & Make in India */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">Pillar 5: Commercial Viability & Domestic Content</span>
                  <p className="text-[11px] text-[#5B6A78]">Public budget fit, Class-1 domestic local supplier adherence (&gt;50%), lifecycle cost.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854]">{scores.viability} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.viability}
                onChange={(e) => handleScoreChange("viability", Number(e.target.value))}
                className="w-full accent-[#0F3854]"
              />
              <textarea
                rows={2}
                value={justifications.viability}
                onChange={(e) => handleJustificationChange("viability", e.target.value)}
                placeholder="Evaluator's technical justification for Viability score..."
                className="w-full text-xs rounded border border-[#E2DED6] p-2 bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Evidence, Qualitative Remarks & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0F3854]" />
              Evidence References
            </h3>
            <div>
              <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                Verified Lab Test / Field Trial Citations
              </label>
              <textarea
                rows={3}
                value={evidenceReferences}
                onChange={(e) => setEvidenceReferences(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] p-2.5 bg-[#FAF8F5] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                Committee Qualitative Remarks
              </label>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full text-xs rounded border border-[#E2DED6] p-2.5 bg-[#FAF8F5] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmitScore}
              className="w-full py-3 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Sign & Submit Scorecard ({totalScore}/100)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

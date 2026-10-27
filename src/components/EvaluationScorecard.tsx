"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  FileText,
  ArrowLeft,
  Sparkles,
  Sliders
} from "lucide-react";
import { EvaluatorScore } from "@/types";
import { TextToSpeechButton } from "@/components/TextToSpeechButton";

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
    innovation: app?.evaluatorScore?.innovation ?? 18,
    feasibility: app?.evaluatorScore?.feasibility ?? 18,
    impact: app?.evaluatorScore?.impact ?? 19,
    scalability: app?.evaluatorScore?.scalability ?? 18,
    viability: app?.evaluatorScore?.viability ?? 18,
  });

  const [justifications, setJustifications] = useState({
    innovation: app?.evaluatorScore?.justifications?.innovation || "Innovative technological design aligns with departmental operational requirements.",
    feasibility: app?.evaluatorScore?.justifications?.feasibility || "Demonstrated TRL maturity and robust implementation plan across designated field sites.",
    impact: app?.evaluatorScore?.justifications?.impact || "High direct civic benefit and rapid anomaly prevention for target public beneficiaries.",
    scalability: app?.evaluatorScore?.justifications?.scalability || "Modular architecture readily scales to district and municipal wide infrastructure.",
    viability: app?.evaluatorScore?.justifications?.viability || "High local content percentage and value-for-money cost allocation conform to GFR standards."
  });

  const [evidenceReferences, setEvidenceReferences] = useState(
    app?.evaluatorScore?.evidenceReferences || "Technical Dossier, Lab Benchmarking Certificate, and DPIIT Registration Enclosure"
  );

  const [feedback, setFeedback] = useState(
    app?.evaluatorScore?.feedback || (app ? `Proposal submitted by ${app.startupName} demonstrates sound technical readiness and viable pilot methodology.` : "")
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotif, setSuccessNotif] = useState(false);

  // Sync state when selected application changes
  useEffect(() => {
    if (app) {
      if (app.evaluatorScore) {
        setScores({
          innovation: app.evaluatorScore.innovation,
          feasibility: app.evaluatorScore.feasibility,
          impact: app.evaluatorScore.impact,
          scalability: app.evaluatorScore.scalability,
          viability: app.evaluatorScore.viability
        });
        setJustifications({
          innovation: app.evaluatorScore.justifications?.innovation || "Innovative technological design aligns with departmental operational requirements.",
          feasibility: app.evaluatorScore.justifications?.feasibility || "Demonstrated TRL maturity and robust implementation plan across designated field sites.",
          impact: app.evaluatorScore.justifications?.impact || "High direct civic benefit and rapid anomaly prevention for target public beneficiaries.",
          scalability: app.evaluatorScore.justifications?.scalability || "Modular architecture readily scales to district and municipal wide infrastructure.",
          viability: app.evaluatorScore.justifications?.viability || "High local content percentage and value-for-money cost allocation conform to GFR standards."
        });
        setEvidenceReferences(app.evaluatorScore.evidenceReferences || "");
        setFeedback(app.evaluatorScore.feedback);
      } else {
        // Fresh proposal to mark
        setScores({
          innovation: 18,
          feasibility: 17,
          impact: 19,
          scalability: 17,
          viability: 18
        });
        setJustifications({
          innovation: "Novel technical approach meeting departmental performance parameters.",
          feasibility: "Demonstrated prototype and testing data conform to designated deployment parameters.",
          impact: "Significant expected civic and operational impact on water quality indices.",
          scalability: "Architecture accommodates scaling across municipal zones.",
          viability: "Procurement cost breakdown adheres to GFR Rule 173 guidelines."
        });
        setEvidenceReferences("Technical proposal document, lab verification certificates, DPIIT recognition letter.");
        setFeedback(`Preliminary evaluation for ${app.startupName}: Meets core technical thresholds for 90-day sandbox pilot.`);
      }
    }
  }, [app?.id]);

  if (!app) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 font-sans text-center">
        <div className="max-w-md mx-auto bg-white rounded-xl border border-[#E2DED6] p-8 shadow-xs">
          <Award className="h-10 w-10 text-[#7E8B97] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#0A2540]">No Applications Ready for Evaluation</h2>
          <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">
            There are currently no startup applications submitted for evaluation. You can submit a bid from the Startup Dashboard or switch back to the Evaluator Workspace.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveView("evaluator_dashboard")}
              className="px-4 py-2 rounded-lg bg-[#0F3854] text-white text-xs font-semibold hover:bg-[#1D4E72]"
            >
              Back to Evaluator Workspace
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

  const handleSubmitScore = async () => {
    setIsSubmitting(true);
    const fullScore: EvaluatorScore = {
      ...scores,
      total: totalScore,
      justifications,
      evidenceReferences,
      feedback,
      evaluatorName: currentUser?.name || "Prof. Vinod Nair (Chairman, Technical Evaluation Board)",
      evaluatedAt: new Date().toISOString().replace("T", " ").slice(0, 19)
    };

    await evaluateApplicationAction(app.id, fullScore);
    setIsSubmitting(false);
    setSuccessNotif(true);
    setTimeout(() => {
      setActiveView("evaluator_dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8 font-sans space-y-6">
      {/* Return to Evaluator Panel Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView("evaluator_dashboard")}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#FAF8F5] text-[#0A2540] border border-[#E2DED6] transition-colors shadow-2xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Evaluator Workspace</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#5B6A78]">Candidate:</span>
          <span className="font-bold text-[#0A2540] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E2DED6]">
            {app.id} • {app.startupName}
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {successNotif && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-bold">
              5-Pillar Scorecard ({totalScore}/100) successfully sealed and recorded on the audit ledger! Redirecting...
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2DED6] p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
              <Award className="h-4 w-4 text-[#8A5B0B]" />
              Technical Evaluation Board • 5-Pillar Structured Scoring Matrix
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540] tracking-tight">
              Scoring Application: {app.startupName}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
              Mark the bidder across the 5 statutory pillars (0–20 points each, 100 points total). Each score requires an evidence-backed rationale to ensure vigilance compliance under GFR Rule 173.
            </p>
          </div>

          {/* Application Selector */}
          <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E2DED6] font-mono text-xs shrink-0 shadow-2xs">
            <label className="block text-[#5B6A78] uppercase text-[10px] font-bold mb-1">Switch Candidate Proposal:</label>
            <select
              value={app.id}
              onChange={(e) => setSelectedAppIdForScore(e.target.value)}
              className="p-2 rounded border border-[#E2DED6] bg-white text-[#0A2540] font-bold text-xs"
            >
              {applications.map(a => (
                <option key={a.id} value={a.id}>
                  {a.id} - {a.startupName} ({a.evaluatorScore ? `${a.evaluatorScore.total}/100` : "Pending"})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Scoring Criteria Sliders & Justifications */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E2DED6] p-6 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE9E1]">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#0F3854]" />
              <h2 className="text-base font-bold text-[#0A2540]">
                5-Pillar Evaluation Criteria (0–20 Points Each)
              </h2>
            </div>
            <span className="text-sm font-mono font-bold px-3 py-1 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded-lg">
              Total Score: {totalScore} / 100
            </span>
          </div>

          <div className="space-y-5">
            {/* Pillar 1: Innovation */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">1. Innovation & IP Defensibility (20 Pts)</span>
                  <p className="text-[11px] text-[#5B6A78]">Patent defense, algorithm differentiation, and novelty.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854] bg-white px-2.5 py-0.5 rounded border border-[#E2DED6]">
                  {scores.innovation} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", Number(e.target.value))}
                className="w-full accent-[#0F3854] cursor-pointer"
              />
              <textarea
                rows={2}
                value={justifications.innovation}
                onChange={(e) => handleJustificationChange("innovation", e.target.value)}
                placeholder="Technical justification for Innovation score..."
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
              />
            </div>

            {/* Pillar 2: Technical Feasibility */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">2. Technical Feasibility & TRL (20 Pts)</span>
                  <p className="text-[11px] text-[#5B6A78]">TRL validation, environmental resilience, hardware durability.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854] bg-white px-2.5 py-0.5 rounded border border-[#E2DED6]">
                  {scores.feasibility} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.feasibility}
                onChange={(e) => handleScoreChange("feasibility", Number(e.target.value))}
                className="w-full accent-[#0F3854] cursor-pointer"
              />
              <textarea
                rows={2}
                value={justifications.feasibility}
                onChange={(e) => handleJustificationChange("feasibility", e.target.value)}
                placeholder="Technical justification for Feasibility score..."
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
              />
            </div>

            {/* Pillar 3: Civic & Public Impact */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">3. Public Health & Civic Impact (20 Pts)</span>
                  <p className="text-[11px] text-[#5B6A78]">Contamination detection latency, citizen safety, SLA fulfillment.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854] bg-white px-2.5 py-0.5 rounded border border-[#E2DED6]">
                  {scores.impact} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", Number(e.target.value))}
                className="w-full accent-[#0F3854] cursor-pointer"
              />
              <textarea
                rows={2}
                value={justifications.impact}
                onChange={(e) => handleJustificationChange("impact", e.target.value)}
                placeholder="Technical justification for Public Impact score..."
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
              />
            </div>

            {/* Pillar 4: Scalability */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">4. Scalability & System Integration (20 Pts)</span>
                  <p className="text-[11px] text-[#5B6A78]">Ease of expanding from 5 pilot sites to 50+ municipal wards; API/MQTT compliance.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854] bg-white px-2.5 py-0.5 rounded border border-[#E2DED6]">
                  {scores.scalability} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => handleScoreChange("scalability", Number(e.target.value))}
                className="w-full accent-[#0F3854] cursor-pointer"
              />
              <textarea
                rows={2}
                value={justifications.scalability}
                onChange={(e) => handleJustificationChange("scalability", e.target.value)}
                placeholder="Technical justification for Scalability score..."
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
              />
            </div>

            {/* Pillar 5: Commercial Viability & Make in India */}
            <div className="space-y-2 p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED6]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0F3854]">5. Commercial Viability & Make-in-India (20 Pts)</span>
                  <p className="text-[11px] text-[#5B6A78]">Budget alignment, Class-1 domestic supplier adherence (&gt;50%), lifecycle maintenance.</p>
                </div>
                <span className="text-base font-bold font-mono text-[#0F3854] bg-white px-2.5 py-0.5 rounded border border-[#E2DED6]">
                  {scores.viability} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.viability}
                onChange={(e) => handleScoreChange("viability", Number(e.target.value))}
                className="w-full accent-[#0F3854] cursor-pointer"
              />
              <textarea
                rows={2}
                value={justifications.viability}
                onChange={(e) => handleJustificationChange("viability", e.target.value)}
                placeholder="Technical justification for Viability score..."
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F3854]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Evidence, Qualitative Remarks & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2DED6] p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0F3854]" />
              Evidence References
            </h3>
            <div>
              <label className="block text-[11px] font-mono text-[#5B6A78] uppercase mb-1">
                Verified Lab Test & Field Trial Citations
              </label>
              <textarea
                rows={3}
                value={evidenceReferences}
                onChange={(e) => setEvidenceReferences(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono text-[#5B6A78] uppercase">
                  Committee Qualitative Remarks
                </label>
                <TextToSpeechButton text={feedback} label="Listen" size="sm" />
              </div>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2DED6] p-2.5 bg-[#FAF8F5] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmitScore}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#0F3854] hover:bg-[#1D4E72] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{isSubmitting ? "Sealing on Audit Ledger..." : `Sign & Submit Scorecard (${totalScore}/100)`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

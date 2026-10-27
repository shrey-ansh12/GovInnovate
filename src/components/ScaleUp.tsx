"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import { 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  FileText, 
  XCircle, 
  Clock, 
  AlertCircle,
  Building2,
  Award,
  DollarSign
} from "lucide-react";
import { FinalDecision } from "@/types";

export const ScaleUp: React.FC = () => {
  const { 
    challenge, 
    pilot, 
    applications, 
    recordFinalDecisionAction, 
    setActiveView, 
    role, 
    setRole 
  } = useApp();

  const [decisionType, setDecisionType] = useState<"Scale-Up" | "Further Review" | "Rejected">(
    pilot.finalDecision?.type || "Scale-Up"
  );
  const [decisionReason, setDecisionReason] = useState<string>(
    pilot.finalDecision?.reason || 
    "All 5 pilot site telemetry KPIs exceeded government SLA thresholds with 99.8% sensor uptime, verified sub-3 minute detection latency, and zero reagent consumables. Satisfies value-for-money and technical feasibility requirements under GFR guidelines."
  );
  const [targetLocations, setTargetLocations] = useState<number>(pilot.scaleLocationsCount || 50);

  const [isDecisionSubmitted, setIsDecisionSubmitted] = useState<boolean>(!!pilot.finalDecision);

  const selectedApp = applications.find(a => a.status === "Shortlisted" || a.status === "Pilot Active") || applications[0];

  const handleRecordDecision = () => {
    const decision: FinalDecision = {
      type: decisionType,
      reason: decisionReason,
      decidedBy: "Dr. Rajeshwar Sharma, IAS (Director, Procurement & Innovation)",
      decidedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      targetLocations: decisionType === "Scale-Up" ? targetLocations : undefined,
      scaleBudget: decisionType === "Scale-Up" ? "₹18.50 Crore (Illustrative Allocation)" : undefined
    };

    recordFinalDecisionAction(pilot.id, decision);
    setIsDecisionSubmitted(true);

    if (decisionType === "Scale-Up") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans print:p-0 print:m-0">
      {/* Top Banner (Hidden in print) */}
      <div className="bg-[#0F3854] text-white rounded p-6 sm:p-8 mb-8 border border-[#1D4E72] shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
              <TrendingUp className="h-4 w-4" />
              Pilot Outcome Review • Competent Authority Sanction Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Executive Pilot Evaluation & Final Decision
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-mono">
              Challenge: <strong className="text-white">{challenge.title}</strong> | Contractor: <strong className="text-white">{selectedApp.startupName}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintReport}
              className="px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Printer className="h-4 w-4 text-emerald-300" />
              <span>Print / Download PDF Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Notice */}
      {role !== "government" && (
        <div className="mb-6 p-4 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              You are currently viewing in <strong>{role}</strong> mode. Recording a scale-up or rejection decision requires the <strong>government</strong> role.
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

      {/* DECISION RECORDING DESK (GOV ONLY) (Hidden in print) */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 sm:p-8 mb-8 shadow-2xs print:hidden">
        <div className="pb-4 border-b border-[#EDE9E1] mb-6">
          <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F3854]" />
            Record Competent Authority Decision
          </h2>
          <p className="text-xs text-[#5B6A78] mt-0.5">
            Decisions are permanently logged in the timestamped audit log subject to GFR and departmental procurement rules.
          </p>
        </div>

        <div className="space-y-6">
          {/* Decision Type Selector */}
          <div>
            <label className="text-xs font-mono font-bold text-[#141F2B] block mb-2">
              Select Decision Verdict:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                  decisionType === "Scale-Up" 
                    ? "bg-[#EBF6F0] border-[#147452] ring-1 ring-[#147452]" 
                    : "bg-[#FAF8F5] border-[#E2DED6] hover:border-[#147452]"
                }`}
              >
                <input
                  type="radio"
                  name="decisionVerdict"
                  checked={decisionType === "Scale-Up"}
                  onChange={() => setDecisionType("Scale-Up")}
                  className="mt-0.5 accent-[#147452]"
                />
                <div>
                  <div className="font-bold text-xs text-[#147452] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Scale-Up Approval
                  </div>
                  <p className="text-[11px] text-[#5B6A78] mt-1">
                    Sanction phased commercial expansion to municipal wards under GFR pilot rails.
                  </p>
                </div>
              </label>

              <label 
                className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                  decisionType === "Further Review" 
                    ? "bg-[#FEF7EA] border-[#8A5B0B] ring-1 ring-[#8A5B0B]" 
                    : "bg-[#FAF8F5] border-[#E2DED6] hover:border-[#8A5B0B]"
                }`}
              >
                <input
                  type="radio"
                  name="decisionVerdict"
                  checked={decisionType === "Further Review"}
                  onChange={() => setDecisionType("Further Review")}
                  className="mt-0.5 accent-[#8A5B0B]"
                />
                <div>
                  <div className="font-bold text-xs text-[#8A5B0B] flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Further Review Required
                  </div>
                  <p className="text-[11px] text-[#5B6A78] mt-1">
                    Request extended telemetry observations or supplemental testing before scale decision.
                  </p>
                </div>
              </label>

              <label 
                className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                  decisionType === "Rejected" 
                    ? "bg-red-50 border-red-600 ring-1 ring-red-600" 
                    : "bg-[#FAF8F5] border-[#E2DED6] hover:border-red-600"
                }`}
              >
                <input
                  type="radio"
                  name="decisionVerdict"
                  checked={decisionType === "Rejected"}
                  onChange={() => setDecisionType("Rejected")}
                  className="mt-0.5 accent-red-600"
                />
                <div>
                  <div className="font-bold text-xs text-red-700 flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" />
                    Pilot Concluded (No Scale)
                  </div>
                  <p className="text-[11px] text-[#5B6A78] mt-1">
                    Conclude sandbox pilot without commercial scale-up with recorded deficiencies.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Scale Locations if Scale-Up */}
          {decisionType === "Scale-Up" && (
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] flex flex-wrap items-center justify-between gap-4">
              <div>
                <label className="text-xs font-mono font-bold text-[#141F2B] block">
                  Proposed Scale-Up Deployment Locations:
                </label>
                <p className="text-[11px] text-[#5B6A78]">
                  Expansion wards across district municipal distribution network.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={targetLocations}
                  onChange={(e) => setTargetLocations(Number(e.target.value))}
                  className="w-24 text-sm font-mono font-bold p-2 rounded border border-[#E2DED6] bg-white text-center"
                />
                <span className="text-xs font-mono text-[#5B6A78]">Municipal Zones</span>
              </div>
            </div>
          )}

          {/* Mandatory Rationale */}
          <div>
            <label className="text-xs font-mono font-bold text-[#141F2B] block mb-1">
              Statutory Rationale & Administrative Justification:
            </label>
            <textarea
              rows={3}
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              className="w-full text-xs p-3 rounded border border-[#E2DED6] bg-[#FAF8F5] focus:bg-white text-[#141F2B]"
              placeholder="Provide clear reasons grounded in verified pilot KPIs, lab correlation, and value-for-money..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-[#EDE9E1]">
            <button
              onClick={handleRecordDecision}
              className="px-6 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Record Decision in Immutable Audit Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* FORMAL PRINTABLE / DOWNLOADABLE PILOT EVALUATION REPORT */}
      <div className="bg-white rounded border border-[#E2DED6] p-8 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Report Header */}
        <div className="border-b-2 border-[#0F3854] pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase text-[#0F3854] tracking-wider">
                Government of India • Ministry of Jal Shakti
              </div>
              <h2 className="text-2xl font-bold text-[#0A2540] mt-1">
                Official Pilot Evaluation & Statutory Sanction Report
              </h2>
              <div className="text-xs text-[#5B6A78] font-mono mt-1">
                Report Ref: GOV-VAL-2026-WQ90 • Generated: {new Date().toISOString().slice(0, 10)}
              </div>
            </div>

            <div className="text-right font-mono hidden sm:block">
              <span className="text-[10px] text-[#7E8B97] uppercase block">Benchmark Result</span>
              <span className="text-3xl font-bold text-[#147452]">{pilot.overallScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Challenge & Startup Profiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-[#EDE9E1] text-xs font-mono">
          <div>
            <span className="text-[#7E8B97] uppercase text-[10px]">Challenge ID</span>
            <p className="font-bold text-[#0A2540] mt-0.5">{challenge.id}</p>
          </div>
          <div>
            <span className="text-[#7E8B97] uppercase text-[10px]">Vendor Startup</span>
            <p className="font-bold text-[#0A2540] mt-0.5">{selectedApp.startupName}</p>
          </div>
          <div>
            <span className="text-[#7E8B97] uppercase text-[10px]">DPIIT Recognition & Status</span>
            <p className="font-bold text-[#147452] mt-0.5">
              {selectedApp.documentRecord?.extractedDpiitNumber || "DPIIT-REC-89241-DL"} (Verified)
            </p>
          </div>
          <div>
            <span className="text-[#7E8B97] uppercase text-[10px]">TRL Readiness / Local Content</span>
            <p className="font-bold text-[#0A2540] mt-0.5">TRL Level {selectedApp.trlLevel || 8} • {selectedApp.localContentPercentage || 78}%</p>
          </div>
        </div>

        {/* Cryptographic Record Integrity Banner in Passport */}
        <div className="py-4 px-4 my-4 rounded bg-[#FAF8F5] border border-[#E2DED6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#147452]" />
            <span>
              <strong>Cryptographic Integrity Passport:</strong> Startup Profile SHA-256 Genesis Signature Verified.
            </span>
          </div>
          <div className="text-[11px] text-[#5B6A78]">
            Document Hash: <code className="text-[#0F3854] font-bold">{selectedApp.documentRecord?.fileHash ? selectedApp.documentRecord.fileHash.slice(0, 16) + "..." : "4a82b901ecfa4219..."}</code>
          </div>
        </div>

        {/* 5-Pillar Evaluator Scores Breakdown */}
        <div className="py-6 border-b border-[#EDE9E1]">
          <h3 className="text-xs font-mono font-bold uppercase text-[#0F3854] tracking-wider mb-3">
            1. Technical Evaluation Board 5-Pillar Scorecard
          </h3>
          {selectedApp.evaluatorScore ? (
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2 text-center font-mono">
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="text-[10px] text-[#7E8B97]">Innovation</div>
                  <div className="text-sm font-bold text-[#0F3854]">{selectedApp.evaluatorScore.innovation} / 20</div>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="text-[10px] text-[#7E8B97]">Feasibility</div>
                  <div className="text-sm font-bold text-[#0F3854]">{selectedApp.evaluatorScore.feasibility} / 20</div>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="text-[10px] text-[#7E8B97]">Impact</div>
                  <div className="text-sm font-bold text-[#0F3854]">{selectedApp.evaluatorScore.impact} / 20</div>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="text-[10px] text-[#7E8B97]">Scalability</div>
                  <div className="text-sm font-bold text-[#0F3854]">{selectedApp.evaluatorScore.scalability} / 20</div>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] border border-[#E2DED6]">
                  <div className="text-[10px] text-[#7E8B97]">Viability</div>
                  <div className="text-sm font-bold text-[#0F3854]">{selectedApp.evaluatorScore.viability} / 20</div>
                </div>
              </div>

              <div className="text-xs text-[#5B6A78] space-y-1 pt-2 font-mono">
                <div><strong>Evaluation Justification:</strong> {selectedApp.evaluatorScore.feedback}</div>
                {selectedApp.evaluatorScore.evidenceReferences && (
                  <div><strong>Evidence Document Citations:</strong> {selectedApp.evaluatorScore.evidenceReferences}</div>
                )}
                <div><strong>Evaluator:</strong> {selectedApp.evaluatorScore.evaluatorName}</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-mono">Pending committee score</div>
          )}
        </div>

        {/* Target vs Actual KPI Telemetry */}
        <div className="py-6 border-b border-[#EDE9E1]">
          <h3 className="text-xs font-mono font-bold uppercase text-[#0F3854] tracking-wider mb-3">
            2. Empirical Pilot KPI Telemetry (Target vs Actual)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-[#E2DED6] bg-[#FAF8F5]">
                  <th className="p-2 text-[#7E8B97]">Metric Indicator</th>
                  <th className="p-2 text-[#7E8B97]">Target Threshold</th>
                  <th className="p-2 text-[#7E8B97]">Actual Submitted Reading</th>
                  <th className="p-2 text-[#7E8B97]">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE9E1]">
                {pilot.kpis.map((kpi) => (
                  <tr key={kpi.id}>
                    <td className="p-2 font-bold text-[#0A2540]">{kpi.metric}</td>
                    <td className="p-2 text-[#5B6A78]">{kpi.target}</td>
                    <td className="p-2 font-bold text-[#147452]">{kpi.current}</td>
                    <td className="p-2">
                      <span className="text-[#147452] bg-[#EBF6F0] px-1.5 py-0.5 rounded text-[10px]">
                        {kpi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milestone Verification & Demo Payments */}
        <div className="py-6 border-b border-[#EDE9E1]">
          <h3 className="text-xs font-mono font-bold uppercase text-[#0F3854] tracking-wider mb-3">
            3. Milestone Evidence Deliverables & Disbursements
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {pilot.milestones.map((m) => (
              <div key={m.id} className="p-2.5 rounded bg-[#FAF8F5] border border-[#E2DED6] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <strong className="text-[#0A2540]">{m.name}</strong>
                  <div className="text-[11px] text-[#5B6A78]">Evidence: {m.evidenceDescription || "Standard deliverables verified."}</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#0A2540]">{m.payout}</span>
                  <div className="text-[10px] text-[#147452]">
                    {m.paymentRef || "Demo Payment Reference (Simulated)"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Decision Outcome */}
        <div className="pt-6">
          <h3 className="text-xs font-mono font-bold uppercase text-[#0F3854] tracking-wider mb-2">
            4. Recorded Administrative Decision
          </h3>
          
          <div className={`p-4 rounded border font-mono text-xs ${
            (pilot.finalDecision?.type || decisionType) === "Scale-Up"
              ? "bg-[#EBF6F0] border-[#C2E5D2] text-[#147452]"
              : (pilot.finalDecision?.type || decisionType) === "Further Review"
              ? "bg-[#FEF7EA] border-[#F6E1B9] text-[#8A5B0B]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            <div className="font-bold text-sm mb-1 flex items-center justify-between">
              <span>Decision: {pilot.finalDecision?.type || decisionType}</span>
              <span className="text-[11px] text-[#5B6A78] font-normal">
                {pilot.finalDecision?.decidedAt || new Date().toISOString().slice(0, 10)}
              </span>
            </div>
            <div className="leading-relaxed">
              <strong>Recorded Rationale:</strong> {pilot.finalDecision?.reason || decisionReason}
            </div>
            {(pilot.finalDecision?.targetLocations || targetLocations) && (
              <div className="mt-2 pt-2 border-t border-black/10">
                <strong>Expansion Scope:</strong> {pilot.finalDecision?.targetLocations || targetLocations} Municipal Distribution Zones
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#EDE9E1] grid grid-cols-2 gap-4 text-xs font-mono text-[#5B6A78]">
            <div>
              <div className="font-bold text-[#0A2540]">Technical Authority Sign-Off:</div>
              <div className="mt-1">Prof. Vinod Nair</div>
              <div className="text-[11px] text-[#7E8B97]">Chairman, Technical Evaluation Board</div>
            </div>
            <div>
              <div className="font-bold text-[#0A2540]">Procuring Officer Sanction:</div>
              <div className="mt-1">Dr. Rajeshwar Sharma, IAS</div>
              <div className="text-[11px] text-[#7E8B97]">Director (Procurement), National Water Mission</div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-center text-[#7E8B97] font-mono">
            * Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval.
          </div>
        </div>
      </div>
    </div>
  );
};

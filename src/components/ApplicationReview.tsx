"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Scale, 
  X, 
  AlertTriangle,
  ExternalLink,
  SlidersHorizontal,
  Lock,
  AlertOctagon,
  FileCheck2,
  UserCheck,
  XCircle,
  FileText
} from "lucide-react";

export const ApplicationReview: React.FC = () => {
  const { 
    applications, 
    startups,
    verifyEligibilityAction, 
    shortlistApplicationAction, 
    createPilotAction, 
    setActiveView,
    setRole,
    role,
    officialReviewDpiitAction,
    setSelectedAppIdForScore
  } = useApp();

  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [reviewModalApp, setReviewModalApp] = useState<any | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState("");

  // Match application with startup for rich data comparison
  const enrichedApplications = applications.map(app => {
    const startup = startups.find(s => s.id === app.startupId);
    return {
      ...app,
      startup
    };
  });

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            Tender Applications & Shortlisting Queue
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
            Review Submitted Startup Proposals ({applications.length})
          </h1>
          <p className="text-xs text-[#5B6A78] mt-1">
            Review DPIIT eligibility, inspect 5-pillar technical scores, compare candidates side-by-side, and sanction sandbox pilots.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Side-by-Side Comparison Button */}
          <button
            onClick={() => setCompareModalOpen(true)}
            className="px-4 py-2 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs"
          >
            <Scale className="h-4 w-4 text-[#0F3854]" />
            <span>Side-by-Side Comparison</span>
          </button>

          <button
            onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
            className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Score as Evaluator</span>
          </button>
        </div>
      </div>

      {/* Role Notice if not Government */}
      {role !== "government" && (
        <div className="mb-6 p-3.5 rounded bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>
              You are currently viewing in <strong>{role}</strong> mode. Shortlisting and commissioning pilots require the <strong>government</strong> role.
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

      {/* Applications Cards */}
      <div className="space-y-6">
        {enrichedApplications.map((app) => {
          const isAquaSense = app.startupId === "ST-AQUASENSE";

          return (
            <div
              key={app.id}
              className={`bg-white rounded border p-6 transition-all ${
                app.status === "Shortlisted" || app.status === "Pilot Active" 
                  ? "border-2 border-[#0F3854]" 
                  : "border-[#E2DED6]"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#EDE9E1] gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-medium text-[#0F3854] bg-[#FAF8F5] border border-[#E2DED6] px-2 py-0.5 rounded">
                      ID: {app.id}
                    </span>
                    <h2 className="text-lg font-bold text-[#0A2540]">{app.startupName}</h2>
                    {app.dpiitVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                        <ShieldCheck className="h-3 w-3" /> DPIIT Recognized
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        Verification Pending
                      </span>
                    )}

                    {/* SHA-256 Vigilance Status */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
                      app.startup?.tamperStatus === "FLAGGED_FOR_REVIEW"
                        ? "bg-red-100 text-red-800 border-red-300 font-bold"
                        : "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]"
                    }`}>
                      <Lock className="h-3 w-3" />
                      {app.startup?.tamperStatus === "FLAGGED_FOR_REVIEW" ? "SHA-256 Divergence Flagged" : "SHA-256 Verified"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] font-mono mt-1">
                    Applied: {app.appliedDate} • TRL: Level {app.trlLevel || 7} • Local Content: {app.localContentPercentage || 65}% • Patents: {app.patentsCount || 1}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className={`text-xs px-2.5 py-1 rounded border font-semibold ${
                    app.status === "Shortlisted" || app.status === "Pilot Active"
                      ? "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]"
                      : app.status === "Evaluated"
                      ? "bg-[#FEF7EA] text-[#8A5B0B] border-[#F6E1B9]"
                      : "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]"
                  }`}>
                    Status: {app.status}
                  </span>
                </div>
              </div>

              {/* Document Verification & SHA-256 Inspection Strip */}
              {app.startup?.documentRecord && (
                <div className="my-3 p-3 rounded bg-[#FAF8F5] border border-[#E2DED6] text-[11px] font-mono flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#0F3854]" />
                    <span className="font-semibold text-[#0A2540]">{app.startup.documentRecord.fileName}</span>
                    <span className="text-[#7E8B97]">| SHA-256: {app.startup.documentRecord.fileHash.slice(0, 12)}...</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      app.startup.documentRecord.preliminaryStatus === "Passed"
                        ? "bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      Preliminary: {app.startup.documentRecord.preliminaryStatus}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      app.startup.documentRecord.officialStatus === "Officially Verified"
                        ? "bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      Official: {app.startup.documentRecord.officialStatus}
                    </span>
                    {app.startup.documentRecord.nameSimilarityScore !== undefined && (
                      <span className="text-[10px] text-[#5B6A78]">
                        Entity Match: {app.startup.documentRecord.nameSimilarityScore}%
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Proposal Overview & Score Comparison */}
              <div className="grid md:grid-cols-2 gap-6 pt-5">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B6A78] mb-1">
                      Proposed Solution Architecture
                    </h4>
                    <p className="text-xs text-[#141F2B] leading-relaxed bg-[#FAF8F5] p-3 rounded border border-[#E2DED6]">
                      {app.solutionOverview}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#5B6A78]">
                    <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#E2DED6]">
                      <span className="block text-[10px] uppercase text-[#7E8B97]">Proposed Budget</span>
                      <strong className="text-[#0A2540] text-sm">{app.proposedCost}</strong>
                    </div>
                    <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#E2DED6]">
                      <span className="block text-[10px] uppercase text-[#7E8B97]">Deployment Lead Time</span>
                      <strong className="text-[#0A2540] text-sm">{app.deploymentTime}</strong>
                    </div>
                  </div>

                  {app.evidenceLinks && app.evidenceLinks.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-mono text-[#5B6A78] uppercase mb-1">Submitted Evidence Documents:</div>
                      <div className="flex flex-wrap gap-2">
                        {app.evidenceLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-[#0F3854] hover:underline inline-flex items-center gap-1 bg-[#F2EFEB] px-2 py-0.5 rounded border border-[#E2DED6]"
                          >
                            <span>Doc Reference #{idx + 1}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Score & Committee Actions */}
                <div className="flex flex-col justify-between space-y-4">
                  {app.evaluatorScore ? (
                    <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DED6] text-xs text-[#0A2540] space-y-2">
                      <div className="flex items-center justify-between font-semibold font-mono pb-2 border-b border-[#EDE9E1]">
                        <span className="flex items-center gap-1.5 text-[#0F3854]">
                          <Award className="h-4 w-4" />
                          5-Pillar Committee Score
                        </span>
                        <span className="text-base text-[#147452] font-bold">
                          {app.evaluatorScore.total} / 100
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1 text-[10px] font-mono text-center pt-1">
                        <div className="bg-white p-1 rounded border border-[#E2DED6]">
                          <div className="text-[#7E8B97]">Inn</div>
                          <div className="font-bold text-[#0F3854]">{app.evaluatorScore.innovation}/20</div>
                        </div>
                        <div className="bg-white p-1 rounded border border-[#E2DED6]">
                          <div className="text-[#7E8B97]">Feas</div>
                          <div className="font-bold text-[#0F3854]">{app.evaluatorScore.feasibility}/20</div>
                        </div>
                        <div className="bg-white p-1 rounded border border-[#E2DED6]">
                          <div className="text-[#7E8B97]">Imp</div>
                          <div className="font-bold text-[#0F3854]">{app.evaluatorScore.impact}/20</div>
                        </div>
                        <div className="bg-white p-1 rounded border border-[#E2DED6]">
                          <div className="text-[#7E8B97]">Scal</div>
                          <div className="font-bold text-[#0F3854]">{app.evaluatorScore.scalability}/20</div>
                        </div>
                        <div className="bg-white p-1 rounded border border-[#E2DED6]">
                          <div className="text-[#7E8B97]">Viab</div>
                          <div className="font-bold text-[#0F3854]">{app.evaluatorScore.viability}/20</div>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#5B6A78] italic pt-1">
                        &quot;{app.evaluatorScore.feedback}&quot;
                      </p>
                      <div className="text-[10px] font-mono text-[#7E8B97]">
                        Evaluated by: {app.evaluatorScore.evaluatorName}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] text-xs text-[#5B6A78] flex items-center justify-between">
                      <span>Evaluator scoring pending for this proposal</span>
                      <button
                        onClick={() => { 
                          setSelectedAppIdForScore(app.id);
                          setRole("evaluator"); 
                          setActiveView("evaluation_scorecard"); 
                        }}
                        className="text-xs font-semibold text-[#0F3854] hover:underline"
                      >
                        Score Now →
                      </button>
                    </div>
                  )}

                  {/* Procurement & Verification Decision Workflow Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {/* Official Government Verification Sign-Off */}
                    {role === "government" && (
                      <>
                        {app.startup?.documentRecord?.officialStatus !== "Officially Verified" ? (
                          <button
                            onClick={() => officialReviewDpiitAction(app.startupId, true)}
                            className="px-3.5 py-2 rounded bg-[#147452] hover:bg-[#0f583e] text-white font-medium text-xs flex items-center gap-1 transition-colors"
                            title="Sign-off official verification under GFR guidelines"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>Official Verify DPIIT</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-[#147452] bg-[#EBF6F0] px-2.5 py-1 rounded border border-[#C2E5D2] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Officially Verified by Gov Officer
                          </span>
                        )}

                        {app.startup?.documentRecord?.officialStatus !== "Rejected" && app.status !== "Shortlisted" && (
                          <button
                            onClick={() => {
                              const reason = prompt("Enter verification rejection reason:", "Entity mismatch / Invalid certificate credentials");
                              if (reason) officialReviewDpiitAction(app.startupId, false, reason);
                            }}
                            className="px-3 py-2 rounded bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs font-medium transition-colors"
                          >
                            Reject Cert
                          </button>
                        )}
                      </>
                    )}

                    {app.status !== "Shortlisted" && app.status !== "Pilot Active" && (
                      <button
                        onClick={() => shortlistApplicationAction(app.id)}
                        className="px-3.5 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors"
                      >
                        Shortlist for Pilot
                      </button>
                    )}

                    {(app.status === "Shortlisted" || app.status === "Pilot Active" || isAquaSense) && (
                      <button
                        onClick={() => createPilotAction()}
                        className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Commission 90-Day Pilot Sandbox</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIDE-BY-SIDE COMPARISON MODAL */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#E2DED6] max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EDE9E1] flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-[#0F3854]" />
                <h3 className="text-xl font-bold text-[#0A2540]">
                  Side-by-Side Candidate Comparison
                </h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-1 rounded text-[#5B6A78] hover:text-[#141F2B] hover:bg-[#F2EFEB]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2DED6] bg-[#FAF8F5]">
                      <th className="p-3 font-mono font-semibold text-[#5B6A78] uppercase w-1/4">Evaluation Attribute</th>
                      {enrichedApplications.map(app => (
                        <th key={app.id} className="p-3 font-bold text-[#0A2540] text-sm">
                          {app.startupName}
                          <div className="font-mono text-[10px] text-[#7E8B97] font-normal">{app.id}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE9E1]">
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">DPIIT Registration</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3">
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                            <CheckCircle2 className="h-3 w-3" /> Verified (Active)
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Technology Readiness (TRL)</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 font-bold text-[#0A2540]">
                          TRL Level {app.trlLevel || 7}
                          <span className="text-[10px] text-[#7E8B97] block font-normal font-mono">
                            {app.trlLevel && app.trlLevel >= 8 ? "Commercial Deployment Ready" : "Field Prototype"}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Domestic Local Content %</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 font-mono font-bold text-[#0F3854]">
                          {app.localContentPercentage || 65}% (Class-I Supplier)
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Patents & IP Rights</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 font-mono font-semibold text-[#0A2540]">
                          {app.patentsCount || 1} Granted Patents
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">5-Pillar Score (Total / 100)</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3">
                          {app.evaluatorScore ? (
                            <span className="text-base font-bold text-[#147452]">
                              {app.evaluatorScore.total} / 100
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">Pending Evaluation</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Proposed Pilot Cost</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 font-mono font-bold text-[#0A2540]">
                          {app.proposedCost}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Deployment Lead Time</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 font-mono text-[#5B6A78]">
                          {app.deploymentTime}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Reagent / Consumable Requirement</td>
                      <td className="p-3 text-xs text-[#147452] font-semibold">
                        Zero Reagents (Optical Spectrophotometry)
                      </td>
                      <td className="p-3 text-xs text-[#5B6A78]">
                        Standard Buoy Telemetry (Surface physical params)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#5B6A78]">Procurement Committee Action</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3">
                          {app.status === "Shortlisted" || app.status === "Pilot Active" ? (
                            <span className="font-mono text-xs text-[#147452] font-bold">Shortlisted Candidate</span>
                          ) : (
                            <button
                              onClick={() => {
                                shortlistApplicationAction(app.id);
                                setCompareModalOpen(false);
                              }}
                              className="px-3 py-1.5 rounded bg-[#0F3854] text-white text-xs font-semibold hover:bg-[#1D4E72]"
                            >
                              Select as Preferred
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs text-[#5B6A78]">
                <strong>Procurement Assessment Summary:</strong> AquaSense AI Innovations demonstrates higher technical readiness (TRL-8 vs TRL-7), 78% local content, 3 granted patents, and an objective score of 95/100, fulfilling all statutory requirements for the 5-location sandbox pilot.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#EDE9E1] flex justify-end bg-[#FAF8F5]">
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-[#0A2540] text-xs font-semibold hover:bg-[#F2EFEB]"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

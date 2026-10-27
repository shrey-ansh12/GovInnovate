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
    role
  } = useApp();

  const [compareModalOpen, setCompareModalOpen] = useState(false);

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
            Review Bids & Select Pilot Partner
          </h1>
          <p className="text-sm text-[#5B6A78] mt-1 max-w-2xl leading-relaxed">
            Review DPIIT eligibility, inspect 5-pillar technical scores, compare candidates side-by-side, and sanction sandbox pilots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Side-by-Side Comparison Button */}
          {enrichedApplications.length > 0 && (
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-2 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs"
            >
              <Scale className="h-4 w-4 text-[#0F3854]" />
              <span>Side-by-Side Comparison ({enrichedApplications.length})</span>
            </button>
          )}

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
        {enrichedApplications.length === 0 && (
          <div className="bg-white rounded border border-[#E2DED6] p-12 text-center">
            <Building2 className="h-10 w-10 text-[#7E8B97] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0A2540]">No Startup Applications Yet</h3>
            <p className="text-xs text-[#5B6A78] max-w-md mx-auto mt-1">
              When eligible DPIIT-recognized startups submit bid proposals for this challenge, they will appear here for 5-pillar technical scoring and side-by-side comparison.
            </p>
          </div>
        )}

        {enrichedApplications.map((app) => {
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
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#7E8B97] font-semibold">{app.id}</span>
                    <span className="text-[#E2DED6]">•</span>
                    <span className="text-xs text-[#5B6A78] font-mono">Submitted: {app.appliedDate}</span>
                    <span className="text-[#E2DED6]">•</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded border border-[#C2E5D2]">
                      <CheckCircle2 className="h-3 w-3" /> DPIIT Recognized
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2540] mt-1">{app.startupName}</h3>
                  <p className="text-xs text-[#5B6A78] mt-0.5">{app.solutionOverview}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E8B97] block">Tender Status</span>
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                      app.status === "Shortlisted" || app.status === "Pilot Active"
                        ? "bg-[#0F3854] text-white"
                        : app.status === "Evaluated"
                        ? "bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]"
                        : "bg-[#F2EFEB] text-[#5B6A78]"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proposal Overview & Score Comparison */}
              <div className="grid md:grid-cols-3 gap-6 my-5">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#7E8B97] mb-2 font-semibold">
                    Technical Readiness & IP
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#141F2B]">
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">TRL Level:</span>
                      <span className="font-bold font-mono">TRL {app.trlLevel || 7}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">Domestic Local Content:</span>
                      <span className="font-bold font-mono text-[#0F3854]">{app.localContentPercentage || 65}% (Class-I)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">Patents / IP:</span>
                      <span className="font-mono">{app.patentsCount || 1} Granted Patents</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#7E8B97] mb-2 font-semibold">
                    Commercial Proposal
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#141F2B]">
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">Proposed Cost:</span>
                      <span className="font-bold font-mono text-[#0A2540]">{app.proposedCost}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">Deployment Timeline:</span>
                      <span className="font-mono">{app.deploymentTime}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[#5B6A78]">Prior Turnover Status:</span>
                      <span className="text-[11px] text-[#147452] font-semibold">Exempt under GFR 170</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#7E8B97] mb-2 font-semibold">
                    5-Pillar Scorecard
                  </h4>
                  {app.evaluatorScore ? (
                    <div className="p-3 rounded bg-[#FAF8F5] border border-[#E2DED6] space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#0A2540]">Total Score:</span>
                        <span className="text-base text-[#147452]">{app.evaluatorScore.total} / 100</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-[10px] font-mono pt-1 text-center">
                        <div>
                          <div className="text-[#7E8B97]">Inn</div>
                          <div className="font-bold">{app.evaluatorScore.innovation}</div>
                        </div>
                        <div>
                          <div className="text-[#7E8B97]">Feas</div>
                          <div className="font-bold">{app.evaluatorScore.feasibility}</div>
                        </div>
                        <div>
                          <div className="text-[#7E8B97]">Imp</div>
                          <div className="font-bold">{app.evaluatorScore.impact}</div>
                        </div>
                        <div>
                          <div className="text-[#7E8B97]">Scal</div>
                          <div className="font-bold">{app.evaluatorScore.scalability}</div>
                        </div>
                        <div>
                          <div className="text-[#7E8B97]">Viab</div>
                          <div className="font-bold">{app.evaluatorScore.viability}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs text-[#5B6A78] flex items-center justify-between">
                      <span>Awaiting Evaluation Score</span>
                      <button
                        onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
                        className="text-[11px] text-[#0F3854] font-semibold underline"
                      >
                        Score Now
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EDE9E1] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {app.status === "Submitted" && (
                    <button
                      onClick={() => verifyEligibilityAction(app.id)}
                      className="px-3.5 py-1.5 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4 text-[#147452]" />
                      <span>Verify DPIIT Eligibility</span>
                    </button>
                  )}

                  {app.status !== "Shortlisted" && app.status !== "Pilot Active" && (
                    <button
                      onClick={() => shortlistApplicationAction(app.id)}
                      className="px-3.5 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span>Shortlist for Pilot</span>
                    </button>
                  )}

                  {(app.status === "Shortlisted" || app.status === "Pilot Active") && (
                    <button
                      onClick={() => createPilotAction()}
                      className="px-4 py-2 rounded bg-[#147452] hover:bg-[#0E593D] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
                    >
                      <span>Sanction 90-Day Sandbox Pilot</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#5B6A78]">
                  <span>Subject to GFR 2017 Procurement Guidelines</span>
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
                      <td className="p-3 font-mono text-[#5B6A78]">Technical Approach Overview</td>
                      {enrichedApplications.map(app => (
                        <td key={app.id} className="p-3 text-xs text-[#141F2B]">
                          {app.solutionOverview || "Continuous IoT edge sensing telemetry"}
                        </td>
                      ))}
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
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#EDE9E1] flex items-center justify-between">
              <span className="text-[11px] text-[#5B6A78]">
                Decisions must adhere to competent-authority approval and GFR 2017 rules.
              </span>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-4 py-2 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] font-semibold text-xs"
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

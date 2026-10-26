"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export const LandingPage: React.FC = () => {
  const { setActiveView, setRole, openAuthModal } = useApp();

  return (
    <div className="bg-[#FAF8F5] text-[#141F2B] font-sans min-h-screen">
      {/* 3. CIVIC EDITORIAL HERO SECTION */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 pt-14 pb-14 border-b border-[#E2DED6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2EFEB] border border-[#E2DED6] text-xs text-[#0F3854] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span>
              <span>General Financial Rules (GFR) 2017 • Rule 173 Exemption Rails</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#0A2540] leading-[1.12] tracking-tight">
              Empowering Public Sector Missions Through Verified Startup Innovation.
            </h1>

            <p className="text-lg sm:text-[19px] text-[#5B6A78] leading-relaxed max-w-3xl font-normal">
              GovInnovate establishes a legal safe-harbor infrastructure for government agencies to co-create, test, and scale proven deep-tech solutions from DPIIT-registered startups within 90-day sandbox pilot parameters—without audit ambiguity or traditional restrictive tender hurdles.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setRole("government");
                  setActiveView("kpi_monitoring");
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded bg-[#0F3854] text-white text-[14px] font-medium hover:bg-[#1D4E72] transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">query_stats</span>
                <span>Review Live Jal Shakti Pilot</span>
              </button>

              <button
                onClick={() => {
                  setRole("government");
                  setActiveView("create_challenge");
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded bg-white text-[#0A2540] text-[14px] font-medium border border-[#E2DED6] hover:bg-[#F2EFEB] transition-colors"
              >
                <span className="material-symbols-outlined text-[19px] text-[#5B6A78]">folder_open</span>
                <span>Officer Problem Desk</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#5B6A78] font-normal">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#147452] text-[16px]">check</span>
                Zero Prior Turnover Bar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#147452] text-[16px]">check</span>
                CAG Pre-Cleared Safe Harbor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#147452] text-[16px]">check</span>
                Direct GeM Scale Authorization
              </span>
            </div>
          </div>

          {/* Right Column: Clean Civic Factsheet / Abstract */}
          <div className="lg:col-span-4 bg-white border border-[#E2DED6] p-6 rounded space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0F3854]">Sandbox Brief 2025</span>
              <span className="text-[11px] font-mono text-[#147452] font-medium px-2 py-0.5 rounded bg-[#EBF6F0] border border-[#C2E5D2]">
                Active Pilot Track
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-[#5B6A78]">
                <span className="font-medium text-[#141F2B] block mb-0.5">Procurement Speed</span>
                Traditional tender cycle is reduced from 18 months to 90 days of measured empirical sandbox validation.
              </div>
              <div className="text-xs text-[#5B6A78]">
                <span className="font-medium text-[#141F2B] block mb-0.5">Statutory Authorization</span>
                Department of Expenditure circular allows direct onboarding of DPIIT startups scoring &gt;90 on sandbox bench tests.
              </div>
              <div className="text-xs text-[#5B6A78]">
                <span className="font-medium text-[#141F2B] block mb-0.5">Public Financial Integrity</span>
                Automated milestone tranches hosted via PFMS API ledger with automated telemetry audits.
              </div>
            </div>

            <div className="pt-3 border-t border-[#EDE9E1] text-xs font-mono flex items-center justify-between text-[#141F2B]">
              <span>Active Pilots: <strong className="text-[#0A2540] font-semibold">142 States/Districts</strong></span>
              <button 
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }} 
                className="text-[#0F3854] hover:underline font-medium"
              >
                Read Framework →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY TRUST INDICATORS RIBBON */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 border-b border-[#E2DED6]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-l-2 border-[#0F3854] pl-4 space-y-1">
            <div className="text-3xl font-semibold tracking-tight text-[#0A2540]">90 Days</div>
            <div className="text-xs font-medium text-[#141F2B] uppercase font-mono tracking-wider">Sandbox Velocity</div>
            <p className="text-xs text-[#5B6A78]">Structured validation window vs 18-month statutory tender cycles.</p>
          </div>

          <div className="border-l-2 border-[#0F3854] pl-4 space-y-1">
            <div className="text-3xl font-semibold tracking-tight text-[#0A2540]">94%</div>
            <div className="text-xs font-medium text-[#141F2B] uppercase font-mono tracking-wider">Neural Match</div>
            <p className="text-xs text-[#5B6A78]">Semantic alignment across 14,000+ patent and DPIIT registries.</p>
          </div>

          <div className="border-l-2 border-[#0F3854] pl-4 space-y-1">
            <div className="text-3xl font-semibold tracking-tight text-[#0A2540]">10x</div>
            <div className="text-xs font-medium text-[#141F2B] uppercase font-mono tracking-wider">Direct Scale-Up</div>
            <p className="text-xs text-[#5B6A78]">Automated expansion from 5 pilot nodes directly to 50 municipal zones.</p>
          </div>

          <div className="border-l-2 border-[#147452] pl-4 space-y-1">
            <div className="text-3xl font-semibold tracking-tight text-[#147452]">GFR 173</div>
            <div className="text-xs font-medium text-[#141F2B] uppercase font-mono tracking-wider">Zero Audit Penalty</div>
            <p className="text-xs text-[#5B6A78]">CAG-compliant statutory exemption for pre-qualification turnovers.</p>
          </div>
        </div>
      </section>

      {/* 5. 3 MULTI-STAKEHOLDER SERVICE HUBS */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]" id="gateways">
        <div className="max-w-2xl mb-10 space-y-2">
          <div className="text-xs font-mono font-medium uppercase text-[#0F3854] tracking-wider">Ecosystem Architecture</div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">Dedicated Operational Portals</h2>
          <p className="text-sm text-[#5B6A78] leading-relaxed">
            Choose your sovereign stakeholder portal to access tailored compliance rails, evaluation rubrics, and automated sanction pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service Hub 1: Government Departments */}
          <div className="bg-white border border-[#E2DED6] rounded p-7 flex flex-col justify-between hover:border-[#0F3854] transition-colors">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-[11px] font-mono text-[#5B6A78] uppercase tracking-wider">Portal 01</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F2EFEB] text-[#141F2B]">SLA: 48 Hrs Match</span>
              </div>
              <div>
                <div className="text-xs font-mono text-[#0F3854] font-medium uppercase mb-1">Problem Owners & Buyers</div>
                <h3 className="text-xl font-semibold text-[#0A2540]">Government Departments</h3>
                <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">
                  Post operational departmental bottlenecks in simple civic prose. Our neural pipeline builds standard pilot briefs and identifies verified startups ready for deployment.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-[#141F2B] pt-3 border-t border-[#EDE9E1]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>AI Challenge Brief & KPI specification generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>Real-time pilot sensor audit and dashboard view</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>GeM automated direct procurement purchase order release</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EDE9E1]">
              <button
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#0F3854] text-white text-xs font-medium hover:bg-[#1D4E72] transition-colors"
              >
                <span>Enter Departmental Desk</span>
                <span className="material-symbols-outlined text-[15px]">east</span>
              </button>
            </div>
          </div>

          {/* Service Hub 2: DPIIT Startups */}
          <div className="bg-white border-2 border-[#0F3854] rounded p-7 flex flex-col justify-between relative shadow-xs">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-[11px] font-mono text-[#0F3854] font-medium uppercase tracking-wider">Portal 02 • Core Track</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">Rule 173 Active</span>
              </div>
              <div>
                <div className="text-xs font-mono text-[#0F3854] font-medium uppercase mb-1">DPIIT Verified Innovators</div>
                <h3 className="text-xl font-semibold text-[#0A2540]">Startups & Innovators</h3>
                <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">
                  Compete directly in central and municipal problem spaces without balance-sheet or 3-year turnover prerequisites. Secure paid 90-day sandbox pilots with pre-authorized scale.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-[#141F2B] pt-3 border-t border-[#EDE9E1]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>Auto-sync with DPIIT Startup India credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>Objective semantic matching against open briefs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>Milestone escrow disbursements via PFMS direct rails</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EDE9E1]">
              <button
                onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#0A2540] text-white text-xs font-medium hover:bg-[#141F2B] transition-colors"
              >
                <span>Apply as DPIIT Startup</span>
                <span className="material-symbols-outlined text-[15px]">east</span>
              </button>
            </div>
          </div>

          {/* Service Hub 3: Technical Evaluators */}
          <div className="bg-white border border-[#E2DED6] rounded p-7 flex flex-col justify-between hover:border-[#0F3854] transition-colors">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-[11px] font-mono text-[#5B6A78] uppercase tracking-wider">Portal 03</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F2EFEB] text-[#141F2B]">Blind Consensus</span>
              </div>
              <div>
                <div className="text-xs font-mono text-[#0F3854] font-medium uppercase mb-1">Independent Peer Review</div>
                <h3 className="text-xl font-semibold text-[#0A2540]">Technical Evaluators</h3>
                <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">
                  Evaluate sandbox candidate submissions across structured 6-pillar technical rubrics, examine verified bench logs, and authorize pilot progression with sovereign cryptographic signing.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-[#141F2B] pt-3 border-t border-[#EDE9E1]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>6-pillar double-blind scoring rubric matrix</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>Automated novelty and patent overlap verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#147452] mt-0.5">check_circle</span>
                  <span>SHA-256 e-Sign token approval ledger records</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#EDE9E1]">
              <button
                onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#F2EFEB] border border-[#E2DED6] text-[#141F2B] text-xs font-medium hover:bg-[#EDE9E1] transition-colors"
              >
                <span>Evaluator Desk (DSC Token)</span>
                <span className="material-symbols-outlined text-[15px]">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE JAL SHAKTI WATER PILOT CASE STUDY */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]" id="interactive-showcase">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#0F3854] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#147452]"></span>
              <span>Verified Case Study • Ref #JS-2025-08</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">
              Ministry of Jal Shakti IoT Water Quality Pilot
            </h2>
            <p className="text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
              Full sandbox lifecycle demonstration: Automated matching of AquaSense Labs (94% patent overlap), 90-day multi-plant bench testing, live turbidity telemetry verification, and pre-authorized ₹4.2 Cr scale-up sanction.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#141F2B] bg-white border border-[#E2DED6] px-3 py-1.5 rounded">
            <span>Current Status:</span>
            <span className="text-[#147452] font-semibold">Day 42 of 90 • Active Telemetry</span>
          </div>
        </div>

        {/* 6-Stage Clean Horizontal Progression Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          <div 
            onClick={() => { setRole("government"); setActiveView("create_challenge"); }}
            className="cursor-pointer bg-white border border-[#E2DED6] hover:border-[#0F3854] p-3.5 rounded text-xs space-y-1 transition-all"
          >
            <div className="font-mono text-[10px] text-[#5B6A78] uppercase">Stage 01</div>
            <div className="font-semibold text-[#0A2540]">Problem Logged</div>
            <div className="text-[11px] text-[#5B6A78]">Jal Shakti turbidity gap</div>
            <div className="text-[10px] font-mono text-[#147452] font-medium pt-1">Cleared • Rule 173</div>
          </div>

          <div 
            onClick={() => setActiveView("ai_startup_matches")}
            className="cursor-pointer bg-white border border-[#E2DED6] hover:border-[#0F3854] p-3.5 rounded text-xs space-y-1 transition-all"
          >
            <div className="font-mono text-[10px] text-[#5B6A78] uppercase">Stage 02</div>
            <div className="font-semibold text-[#0A2540]">Neural Sourcing</div>
            <div className="text-[11px] text-[#5B6A78]">AquaSense identified</div>
            <div className="text-[10px] font-mono text-[#0F3854] font-medium pt-1">94% Semantic Match</div>
          </div>

          <div 
            onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
            className="cursor-pointer bg-white border border-[#E2DED6] hover:border-[#0F3854] p-3.5 rounded text-xs space-y-1 transition-all"
          >
            <div className="font-mono text-[10px] text-[#5B6A78] uppercase">Stage 03</div>
            <div className="font-semibold text-[#0A2540]">Evaluator Jury</div>
            <div className="text-[11px] text-[#5B6A78]">6-Pillar Consensus</div>
            <div className="text-[10px] font-mono text-[#0A2540] font-semibold pt-1">Score: 95 / 100</div>
          </div>

          <div 
            onClick={() => setActiveView("pilot_management")}
            className="cursor-pointer bg-white border-2 border-[#0F3854] p-3.5 rounded text-xs space-y-1 bg-[#F2EFEB]"
          >
            <div className="font-mono text-[10px] text-[#0F3854] font-semibold uppercase flex items-center justify-between">
              <span>Stage 04</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span>
            </div>
            <div className="font-semibold text-[#0A2540]">90-Day Pilot</div>
            <div className="text-[11px] text-[#141F2B]">5 water treatment plants</div>
            <div className="text-[10px] font-mono text-[#0F3854] font-semibold pt-1">Day 42/90 (46.7%)</div>
          </div>

          <div 
            onClick={() => setActiveView("validation_report")}
            className="cursor-pointer bg-white border border-[#E2DED6] hover:border-[#0F3854] p-3.5 rounded text-xs space-y-1 transition-all"
          >
            <div className="font-mono text-[10px] text-[#5B6A78] uppercase">Stage 05</div>
            <div className="font-semibold text-[#0A2540]">Automated Audit</div>
            <div className="text-[11px] text-[#5B6A78]">Bench vs Lab Assay</div>
            <div className="text-[10px] font-mono text-[#5B6A78] pt-1">Target: &gt;95.0% Accuracy</div>
          </div>

          <div 
            onClick={() => setActiveView("scale_up")}
            className="cursor-pointer bg-white border border-[#E2DED6] hover:border-[#0F3854] p-3.5 rounded text-xs space-y-1 transition-all"
          >
            <div className="font-mono text-[10px] text-[#5B6A78] uppercase">Stage 06</div>
            <div className="font-semibold text-[#0A2540]">GeM Scale-Up</div>
            <div className="text-[11px] text-[#5B6A78]">50 Distribution Zones</div>
            <div className="text-[10px] font-mono text-[#0A2540] font-semibold pt-1">Sanction PO: ₹4.2 Cr</div>
          </div>
        </div>

        {/* Telemetry Data Ledger & Escrow Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Clean Tabular Ledger (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E2DED6] rounded p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#147452]"></span>
                <span className="text-xs font-mono font-semibold text-[#0A2540] uppercase">
                  Telemetry Ledger • Site Alpha-5 (Delhi Jal Board)
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#5B6A78]">Polling rate: 500ms</span>
            </div>

            {/* Metric Summary Blocks */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#F2EFEB] p-3 rounded border border-[#EDE9E1]">
                <div className="text-[10px] font-mono uppercase text-[#5B6A78]">Turbidity Accuracy</div>
                <div className="text-xl font-semibold text-[#0A2540] mt-1">98.2%</div>
                <div className="text-[11px] text-[#147452] font-medium mt-0.5">+1.8% vs Lab Gold</div>
              </div>

              <div className="bg-[#F2EFEB] p-3 rounded border border-[#EDE9E1]">
                <div className="text-[10px] font-mono uppercase text-[#5B6A78]">Sensor Latency</div>
                <div className="text-xl font-semibold text-[#0A2540] mt-1">1.4s</div>
                <div className="text-[11px] text-[#0F3854] font-medium mt-0.5">Real-time edge compute</div>
              </div>

              <div className="bg-[#F2EFEB] p-3 rounded border border-[#EDE9E1]">
                <div className="text-[10px] font-mono uppercase text-[#5B6A78]">Telemetry Uptime</div>
                <div className="text-xl font-semibold text-[#0A2540] mt-1">99.98%</div>
                <div className="text-[11px] text-[#147452] font-medium mt-0.5">Zero packet drops</div>
              </div>
            </div>

            {/* Clean Ledger Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE9E1] text-[#5B6A78] font-mono uppercase text-[10px]">
                    <th className="py-2">Time (IST)</th>
                    <th className="py-2">Sensor NTU</th>
                    <th className="py-2">Lab Reference</th>
                    <th className="py-2">Variance</th>
                    <th className="py-2 text-right">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE9E1] font-mono">
                  <tr>
                    <td className="py-2.5 text-[#141F2B]">14:00:22</td>
                    <td className="py-2.5 font-semibold text-[#0A2540]">0.38 NTU</td>
                    <td className="py-2.5 text-[#5B6A78]">0.39 NTU</td>
                    <td className="py-2.5 text-[#147452]">-0.01</td>
                    <td className="py-2.5 text-right">
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">Pass</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-[#141F2B]">13:30:00</td>
                    <td className="py-2.5 font-semibold text-[#0A2540]">0.42 NTU</td>
                    <td className="py-2.5 text-[#5B6A78]">0.41 NTU</td>
                    <td className="py-2.5 text-[#147452]">+0.01</td>
                    <td className="py-2.5 text-right">
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">Pass</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-[#141F2B]">13:00:15</td>
                    <td className="py-2.5 font-semibold text-[#0A2540]">0.35 NTU</td>
                    <td className="py-2.5 text-[#5B6A78]">0.36 NTU</td>
                    <td className="py-2.5 text-[#147452]">-0.01</td>
                    <td className="py-2.5 text-right">
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">Pass</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-[#141F2B]">12:30:40</td>
                    <td className="py-2.5 font-semibold text-[#0A2540]">0.40 NTU</td>
                    <td className="py-2.5 text-[#5B6A78]">0.40 NTU</td>
                    <td className="py-2.5 text-[#147452]">0.00</td>
                    <td className="py-2.5 text-right">
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] rounded">Pass</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EDE9E1] flex items-center justify-between text-xs text-[#5B6A78]">
              <span>Threshold Requirement: &lt; 0.50 NTU</span>
              <button 
                onClick={() => setActiveView("kpi_monitoring")}
                className="text-[#0F3854] hover:underline font-medium font-mono text-[11px]"
              >
                View Full Live Telemetry →
              </button>
            </div>
          </div>

          {/* Financial Escrow & Legal Safe Harbor Status (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Escrow Ledger Card */}
            <div className="bg-white border border-[#E2DED6] rounded p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-xs font-mono font-semibold uppercase text-[#0F3854]">PFMS Escrow Safe Ledger</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F2EFEB] text-[#141F2B]">Sanction #PFMS-JS-89</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#EDE9E1]">
                  <span className="text-[#5B6A78]">Total Pilot Grant:</span>
                  <span className="font-mono font-semibold text-[#0A2540]">₹25,00,000</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EDE9E1]">
                  <span className="text-[#5B6A78]">Tranche 1 (Hardware Setup):</span>
                  <span className="font-mono text-[#147452] font-semibold">₹10,00,000 [Disbursed]</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EDE9E1]">
                  <span className="text-[#5B6A78]">Tranche 2 (Day 45 Uptime 99%):</span>
                  <span className="font-mono text-[#0A2540] font-semibold">₹10,00,000 [Auto-release in 3d]</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5B6A78]">Tranche 3 (Final KPI Report):</span>
                  <span className="font-mono text-[#5B6A78]">₹5,00,000 [Escrow Locked]</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-[#5B6A78] leading-relaxed">
                All disbursements are executed programmatically via Public Financial Management System (PFMS) API based on sensor cryptographic signatures, preventing administrative payment delays.
              </div>
            </div>

            {/* Scale-Up Mandate Card */}
            <div className="bg-[#F2EFEB] border border-[#E2DED6] rounded p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A2540]">
                <span className="material-symbols-outlined text-[17px] text-[#0F3854]">verified</span>
                <span>Scale-Up Pre-Authorization Mandate</span>
              </div>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Subject to achieving ≥95% accuracy over 90 days, GFR 173 triggers direct purchase authorization for 50 municipal water treatment sites without secondary public tender.
              </p>
              <button
                onClick={() => setActiveView("scale_up")}
                className="mt-2 text-xs font-mono font-semibold text-[#0F3854] hover:underline flex items-center gap-1"
              >
                Inspect Scale-Up Sanction Order →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REGULATORY SAFE HARBOR DIGEST & FAQ ACCORDION */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]" id="safe-harbor">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Digest Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono font-medium uppercase text-[#0F3854] tracking-wider">Statutory Safe Harbor</div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2540] tracking-tight">Legal Protection for Procuring Officers</h2>
            <p className="text-sm text-[#5B6A78] leading-relaxed">
              Public procurement guidelines often create hesitation around startup engagement. The GovInnovate framework is backed by explicit circulars from the Department of Expenditure (DoE) and Central Vigilance Commission (CVC).
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 bg-white border border-[#E2DED6] rounded">
                <div className="font-semibold text-[#0A2540] mb-0.5">Rule 173(i) • Prior Turnover Waiver</div>
                <div className="text-[#5B6A78]">Eliminates turnover and past performance conditions for all DPIIT recognized entities.</div>
              </div>
              <div className="p-3.5 bg-white border border-[#E2DED6] rounded">
                <div className="font-semibold text-[#0A2540] mb-0.5">GeM Rule 149 Special Dispensation</div>
                <div className="text-[#5B6A78]">Allows direct contract sanction on the Government e-Marketplace following successful bench validation.</div>
              </div>
              <div className="p-3.5 bg-white border border-[#E2DED6] rounded">
                <div className="font-semibold text-[#0A2540] mb-0.5">Auditable Consensus Ledger</div>
                <div className="text-[#5B6A78]">Double-blind technical scoring files are cryptographically sealed to ensure CAG compliance.</div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Frequently Asked Questions for Public Officers</h3>

            <details className="group bg-white border border-[#E2DED6] rounded p-4 cursor-pointer" open>
              <summary className="flex items-center justify-between font-medium text-sm text-[#0A2540] list-none">
                <span>Are procuring officers protected from retrospective CAG audit objections?</span>
                <span className="material-symbols-outlined text-[18px] text-[#5B6A78] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] pt-3">
                Yes. Every sandbox challenge operates under Department of Expenditure OM No. F.20/2/2014-PPD(Pt.), which explicitly exempts pilot sandboxes from standard L1 commercial bidding requirements, provided the pilot grant does not exceed statutory threshold limits and technical scoring is auditable.
              </div>
            </details>

            <details className="group bg-white border border-[#E2DED6] rounded p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-medium text-sm text-[#0A2540] list-none">
                <span>How is intellectual property (IP) protected during sandbox pilots?</span>
                <span className="material-symbols-outlined text-[18px] text-[#5B6A78] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] pt-3">
                Startups retain 100% of underlying intellectual property, algorithms, and source patents. The participating government department receives a non-exclusive operational usage license for the duration of the pilot and pre-negotiated commercial pricing tiers upon scale-up.
              </div>
            </details>

            <details className="group bg-white border border-[#E2DED6] rounded p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-medium text-sm text-[#0A2540] list-none">
                <span>What happens if a startup fails to meet the pilot KPI benchmarks?</span>
                <span className="material-symbols-outlined text-[18px] text-[#5B6A78] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] pt-3">
                Pilots are strictly compartmentalized. If agreed sensor, uptime, or output accuracy targets are not achieved by Day 90, the pilot cleanly concludes with an objective empirical failure report. Unreleased PFMS escrow tranches automatically revert to the department without financial penalties or litigation risk for either party.
              </div>
            </details>

            <details className="group bg-white border border-[#E2DED6] rounded p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-medium text-sm text-[#0A2540] list-none">
                <span>Can state undertakings and municipal corporations participate directly?</span>
                <span className="material-symbols-outlined text-[18px] text-[#5B6A78] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] pt-3">
                Yes. Municipal corporations, smart cities missions, state PSUs, and autonomous bodies can onboard challenges directly via their official email domain and designated nodal officer credentials.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 8. REFINED EDITORIAL CALL TO ACTION */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16">
        <div className="bg-[#0F3854] text-white rounded p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono font-medium uppercase text-emerald-400 tracking-wider">
              National Pilot Acceleration Programme
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Draft an innovation pilot brief in under 15 minutes.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Transform departmental bottlenecks into legally insulated pilot procurement frameworks. Built with automated AI startup matching and full statutory safe harbors.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setRole("government");
                setActiveView("create_challenge");
              }}
              className="px-5 py-3 rounded bg-white text-[#0F3854] text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Draft Department Challenge
            </button>
            <button
              onClick={() => {
                setActiveView("kpi_monitoring");
              }}
              className="px-5 py-3 rounded bg-transparent border border-white/30 text-white text-xs font-medium hover:bg-white/10 transition-colors"
            >
              View Active Telemetry Logs
            </button>
          </div>
        </div>
      </section>

      {/* 9. CIVIC FOOTER WITH COMPLIANCE STAMPS */}
      <footer className="bg-white border-t border-[#E2DED6] pt-12 pb-8 text-[#141F2B]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8">
          {/* Top Compliance Ribbon */}
          <div className="pb-10 border-b border-[#E2DED6]">
            <div className="text-[11px] font-mono text-[#5B6A78] uppercase tracking-wider mb-4">
              Interoperable Sovereign Architecture & Compliance Standards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-[#FAF8F5] border border-[#E2DED6] rounded flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#0F3854] text-white flex items-center justify-center font-bold text-xs">NIC</span>
                <div>
                  <div className="text-xs font-semibold text-[#0A2540]">National Informatics Centre</div>
                  <div className="text-[10px] text-[#5B6A78]">Tier-IV Sovereign Cloud</div>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E2DED6] rounded flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#0F3854] text-white flex items-center justify-center font-bold text-xs">DL</span>
                <div>
                  <div className="text-xs font-semibold text-[#0A2540]">DigiLocker Integration</div>
                  <div className="text-[10px] text-[#5B6A78]">DPIIT Registry Sync</div>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E2DED6] rounded flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#0F3854] text-white flex items-center justify-center font-bold text-xs">GeM</span>
                <div>
                  <div className="text-xs font-semibold text-[#0A2540]">GeM Direct Bridge</div>
                  <div className="text-[10px] text-[#5B6A78]">v4.2 API Automated Procurement</div>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E2DED6] rounded flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#0F3854] text-white flex items-center justify-center font-bold text-xs">PFMS</span>
                <div>
                  <div className="text-xs font-semibold text-[#0A2540]">PFMS Escrow Ledger</div>
                  <div className="text-[10px] text-[#5B6A78]">Milestone Disbursals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0F3854] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                </div>
                <span className="font-semibold text-[#0A2540] text-sm">GovInnovate Bharat</span>
              </div>
              <p className="text-[#5B6A78] leading-relaxed">
                National public innovation sandbox platform enabling seamless 90-day pilot deployments and procurement exemptions under GFR 2017 Rule 173 for recognized DPIIT startups.
              </p>
            </div>

            <div>
              <div className="font-mono uppercase font-semibold text-[#0A2540] mb-3">Statutory Framework</div>
              <ul className="space-y-2 text-[#5B6A78]">
                <li><button onClick={() => setActiveView("documents")} className="hover:text-[#0F3854] hover:underline text-left">General Financial Rules (GFR) 2017</button></li>
                <li><button onClick={() => setActiveView("documents")} className="hover:text-[#0F3854] hover:underline text-left">Manual for Procurement of Goods 2022</button></li>
                <li><button onClick={() => setActiveView("documents")} className="hover:text-[#0F3854] hover:underline text-left">DPIIT Startup Exemption Order 2016</button></li>
                <li><button onClick={() => setActiveView("documents")} className="hover:text-[#0F3854] hover:underline text-left">GeM Special Dispensation Clause</button></li>
              </ul>
            </div>

            <div>
              <div className="font-mono uppercase font-semibold text-[#0A2540] mb-3">Digital Public Rails</div>
              <ul className="space-y-2 text-[#5B6A78]">
                <li><button onClick={() => setActiveView("pilot_management")} className="hover:text-[#0F3854] hover:underline text-left">Public Financial Management System</button></li>
                <li><button onClick={() => setActiveView("startup_profile")} className="hover:text-[#0F3854] hover:underline text-left">DigiLocker DPIIT Credential Registry</button></li>
                <li><button onClick={() => setActiveView("scale_up")} className="hover:text-[#0F3854] hover:underline text-left">GeM Direct API Bridge (v4.2)</button></li>
                <li><button onClick={() => setActiveView("ai_startup_matches")} className="hover:text-[#0F3854] hover:underline text-left">National AI Neural Match Engine</button></li>
              </ul>
            </div>

            <div>
              <div className="font-mono uppercase font-semibold text-[#0A2540] mb-3">Audit & Compliance</div>
              <ul className="space-y-2 text-[#5B6A78]">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span> WCAG 2.1 AAA Accessibility Compliant</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span> CERT-IN Audited Data Pipeline</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span> Tamper-Proof SHA-256 Ledger</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span> Tier-IV NIC Sovereign Cloud</li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-6 border-t border-[#E2DED6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B6A78]">
            <div>© 2025 GovInnovate • National Public Procurement & Innovation Sandbox.</div>
            <div className="flex items-center gap-4">
              <span>Citizen & Officer Helpline: <strong>1800-GOV-INNOVATE</strong></span>
              <span>•</span>
              <button onClick={() => setActiveView("documents")} className="hover:underline">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => setActiveView("documents")} className="hover:underline">Terms of Pilot</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

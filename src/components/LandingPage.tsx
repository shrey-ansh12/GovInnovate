"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Compass, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  BarChart3, 
  Building2, 
  Rocket, 
  Award, 
  AlertCircle 
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setActiveView, setRole, challenge } = useApp();

  const scrollToWorkflow = () => {
    const el = document.getElementById("visual-workflow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#141F2B] font-sans min-h-screen">
      {/* STATUTORY COMPLIANCE BANNER */}
      <div className="bg-[#FEF7EA] border-b border-[#F0D598] py-2 px-6">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between text-xs text-[#8A5B0B]">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#8A5B0B]" />
            <span>
              <strong>Statutory Safe-Harbor Notice:</strong> Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval.
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[11px] font-medium bg-white/80 px-2 py-0.5 rounded border border-[#E2DED6]">
            Sandbox Prototype v2.4
          </span>
        </div>
      </div>

      {/* HERO SECTION WITH RIGHT SIDE PROJECT IMAGE */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 pt-12 pb-14 border-b border-[#E2DED6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Summary & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2EFEB] border border-[#E2DED6] text-xs text-[#0F3854] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#147452]"></span>
              <span>Public Sector Sandbox Framework • DPIIT Aligned</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#0A2540] leading-[1.12] tracking-tight">
              A Transparent Procurement-to-Pilot Platform for Startups.
            </h1>

            <p className="text-base sm:text-lg text-[#5B6A78] leading-relaxed max-w-2xl">
              Bridging public sector challenges with verified startup innovations. Transform civic procurement from rigid multi-year tenders into transparent 90-day sandbox pilots with empirical validation, structured milestone tracking, and complete audit clarity.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setRole("government");
                  setActiveView("gov_dashboard");
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-[#0F3854] text-white text-[15px] font-semibold hover:bg-[#1D4E72] shadow-sm transition-all"
              >
                <span>Explore Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={scrollToWorkflow}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded bg-white text-[#0A2540] text-[15px] font-semibold border border-[#E2DED6] hover:bg-[#F2EFEB] transition-all"
              >
                <span>View Workflow</span>
                <Layers className="h-4 w-4 text-[#5B6A78]" />
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#5B6A78] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                Subject to GFR & Approval
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                DPIIT Startup Relaxations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                Evidence-Linked Milestones
              </span>
            </div>
          </div>

          {/* Right Column: Project-Related Civic Infrastructure Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-[#E2DED6] bg-white shadow-md">
              {/* Clean Realistic Civic IoT / Infrastructure Photo */}
              <div className="relative h-[320px] sm:h-[370px] w-full bg-[#0F3854] overflow-hidden">
                <img
                  src="/hero-civic.jpg"
                  alt="Public Sector Water & Environmental Sensor Innovation Sandbox"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Civic Descriptor */}
              <div className="p-4 bg-white border-t border-[#EDE9E1] flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="font-bold text-[#0A2540]">Public Innovation Sandbox Infrastructure</div>
                  <div className="text-[11px] text-[#5B6A78]">Municipal Sensor Telemetry & Field Validation Rails</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2] text-[10px] font-bold uppercase shrink-0">
                  Verified Rails
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE BENEFITS */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]">
        <div className="mb-10">
          <div className="text-xs font-mono font-semibold uppercase text-[#0F3854] tracking-wider mb-2">Platform Capabilities</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">Four Pillars of Sandbox Procurement</h2>
          <p className="text-sm text-[#5B6A78] mt-2 max-w-2xl">
            Engineered to overcome common public procurement bottlenecks while guaranteeing statutory transparency and audit readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between hover:border-[#0F3854] transition-all group shadow-2xs">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded bg-[#F2EFEB] text-[#0F3854] flex items-center justify-center group-hover:bg-[#0F3854] group-hover:text-white transition-colors">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">1. Startup Discovery</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Explainable, rule-based matching evaluates sector alignment, TRL level (≥7), local content percentage, and DPIIT recognition without opaque black-box claims.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#EDE9E1] text-[11px] font-mono text-[#147452] font-semibold">
              Rule-Based Match Engine
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between hover:border-[#0F3854] transition-all group shadow-2xs">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded bg-[#F2EFEB] text-[#0F3854] flex items-center justify-center group-hover:bg-[#0F3854] group-hover:text-white transition-colors">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">2. Structured Evaluation</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Multi-attribute technical scoring across 5 distinct pillars (Innovation, Feasibility, Impact, Scalability, Viability) with required written justifications and evidence references.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#EDE9E1] text-[11px] font-mono text-[#0F3854] font-semibold">
              5-Pillar Rubric (100 Pts)
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between hover:border-[#0F3854] transition-all group shadow-2xs">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded bg-[#F2EFEB] text-[#0F3854] flex items-center justify-center group-hover:bg-[#0F3854] group-hover:text-white transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">3. Milestone-Based Monitoring</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Real-time pilot telemetry, startup evidence submission, and formal approval/rejection gates. Automated risk alerts detect overdue milestones or lagging KPIs.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#EDE9E1] text-[11px] font-mono text-[#8A5B0B] font-semibold">
              Evidence-Linked Gates
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between hover:border-[#0F3854] transition-all group shadow-2xs">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded bg-[#F2EFEB] text-[#0F3854] flex items-center justify-center group-hover:bg-[#0F3854] group-hover:text-white transition-colors">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">4. Transparent Audit Trails</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Immutable, timestamped audit log capturing user roles, criteria evaluations, milestone decisions, and simulated payment references for complete scrutiny.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#EDE9E1] text-[11px] font-mono text-[#0F3854] font-semibold">
              Timestamped Audit History
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL WORKFLOW PIPELINE */}
      <section id="visual-workflow" className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]">
        <div className="mb-10">
          <div className="text-xs font-mono font-semibold uppercase text-[#0F3854] tracking-wider mb-2">End-to-End Governance</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">The 6-Stage Sandbox Workflow</h2>
          <p className="text-sm text-[#5B6A78] mt-2">
            Click on any phase to jump directly into the interactive workflow demonstration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Step 1 */}
          <div 
            onClick={() => { setRole("government"); setActiveView("create_challenge"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#0F3854] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#0F3854] bg-[#F2EFEB] px-2 py-0.5 rounded">01</span>
              <Building2 className="h-4 w-4 text-[#5B6A78] group-hover:text-[#0F3854]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Challenge</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">Gov creates and publishes procurement problem statement.</p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#147452] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded">02</span>
              <Rocket className="h-4 w-4 text-[#5B6A78] group-hover:text-[#147452]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Application</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">Startup updates profile and submits pilot proposal with credentials.</p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#8A5B0B] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#8A5B0B] bg-[#FEF7EA] px-2 py-0.5 rounded">03</span>
              <Award className="h-4 w-4 text-[#5B6A78] group-hover:text-[#8A5B0B]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Evaluation</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">Technical panel scores proposal across 5 pillars with written justifications.</p>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => { setRole("government"); setActiveView("pilot_management"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#0F3854] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#0F3854] bg-[#F2EFEB] px-2 py-0.5 rounded">04</span>
              <Layers className="h-4 w-4 text-[#5B6A78] group-hover:text-[#0F3854]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Pilot</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">90-day sandbox pilot launched with milestones, KPIs, and evidence gates.</p>
          </div>

          {/* Step 5 */}
          <div 
            onClick={() => { setRole("government"); setActiveView("kpi_monitoring"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#0F3854] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#0F3854] bg-[#F2EFEB] px-2 py-0.5 rounded">05</span>
              <BarChart3 className="h-4 w-4 text-[#5B6A78] group-hover:text-[#0F3854]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Validation</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">Target vs actual KPI telemetry compared against independent lab audits.</p>
          </div>

          {/* Step 6 */}
          <div 
            onClick={() => { setRole("government"); setActiveView("scale_up"); }}
            className="bg-white border border-[#E2DED6] hover:border-[#147452] rounded p-5 cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#147452] bg-[#EBF6F0] px-2 py-0.5 rounded">06</span>
              <FileText className="h-4 w-4 text-[#5B6A78] group-hover:text-[#147452]" />
            </div>
            <h4 className="font-bold text-sm text-[#0A2540] mb-1">Decision</h4>
            <p className="text-[11px] text-[#5B6A78] leading-snug">Recorded administrative decision: Scale-Up, Further Review, or Concluded.</p>
          </div>
        </div>
      </section>

      {/* 3 STAKEHOLDER PORTAL CARDS */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-16 border-b border-[#E2DED6]">
        <div className="mb-10">
          <div className="text-xs font-mono font-semibold uppercase text-[#0F3854] tracking-wider mb-2">Role-Based Workspaces</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">Dedicated User Roles</h2>
          <p className="text-sm text-[#5B6A78] mt-2">
            Switch between authenticated stakeholder views to explore respective capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gov Desk */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-xs font-mono text-[#0F3854] font-bold">GOVERNMENT</span>
                <span className="text-[11px] font-mono text-[#5B6A78]">Role: government</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Procurement Officers</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Create challenges, review eligible startup applications, perform side-by-side candidate comparisons, sanction sandbox pilots, and record scale-up decisions.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => { setRole("government"); setActiveView("gov_dashboard"); }}
                className="w-full py-2.5 px-4 rounded bg-[#0F3854] text-white text-xs font-semibold hover:bg-[#1D4E72] transition-colors"
              >
                Enter Government Portal →
              </button>
            </div>
          </div>

          {/* Startup Hub */}
          <div className="bg-white border-2 border-[#147452] rounded p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-xs font-mono text-[#147452] font-bold">STARTUP</span>
                <span className="text-[11px] font-mono text-[#5B6A78]">Role: startup</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Innovators & Founders</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Maintain profile with DPIIT credentials, browse matched civic challenges, submit technical proposals, and upload milestone evidence for disbursement approval.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => { setRole("startup"); setActiveView("startup_dashboard"); }}
                className="w-full py-2.5 px-4 rounded bg-[#147452] text-white text-xs font-semibold hover:bg-[#0f583e] transition-colors"
              >
                Enter Startup Workspace →
              </button>
            </div>
          </div>

          {/* Evaluator Panel */}
          <div className="bg-white border border-[#E2DED6] rounded p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
                <span className="text-xs font-mono text-[#8A5B0B] font-bold">EVALUATOR</span>
                <span className="text-[11px] font-mono text-[#5B6A78]">Role: evaluator</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Technical Committee</h3>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Objective scoring across Innovation, Feasibility, Impact, Scalability, and Viability. Review milestone evidence submissions and validate field laboratory results.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => { setRole("evaluator"); setActiveView("evaluation_scorecard"); }}
                className="w-full py-2.5 px-4 rounded bg-[#8A5B0B] text-white text-xs font-semibold hover:bg-[#6c4708] transition-colors"
              >
                Enter Evaluation Panel →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ILLUSTRATIVE CASE STUDY SECTION (BELOW MAIN CONTENT) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-14 border-b border-[#E2DED6]">
        <div className="bg-white border border-[#E2DED6] rounded p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EDE9E1]">
            <div>
              <span className="text-xs font-mono font-bold text-[#0F3854] uppercase tracking-wider">Illustrative Sandbox Case Study</span>
              <h3 className="text-xl font-bold text-[#0A2540] mt-1">{challenge.title}</h3>
            </div>
            <span className="px-3 py-1 rounded text-xs font-mono font-medium bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
              Benchmark Scenario
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#141F2B]">Department & Scope</div>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                {challenge.department} ({challenge.ministry}). 90-day sandbox pilot across {challenge.targetLocations} municipal intake stations.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#141F2B]">Selected Startup Solution</div>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                AquaSense AI Innovations — Submersible spectrophotometric sensors measuring BOD, COD, and heavy metals in under 3 minutes with zero chemical reagents.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#141F2B]">Demonstrated Outcomes</div>
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Achieved 99.8% sensor uptime, alert latency reduced to 2.8 minutes, and 98.2% correlation with certified NABL lab titrations.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#EDE9E1] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#5B6A78]">
              * Data displayed represents illustrative benchmark results configured for testing the GovInnovate verification pipeline.
            </div>
            <button
              onClick={() => { setRole("government"); setActiveView("kpi_monitoring"); }}
              className="text-xs font-bold text-[#0F3854] hover:underline"
            >
              View Pilot KPI Telemetry →
            </button>
          </div>
        </div>
      </section>

      {/* STATUTORY NOTES & FAQS */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-8 py-14">
        <div className="max-w-3xl space-y-6">
          <div>
            <div className="text-xs font-mono font-semibold uppercase text-[#0F3854] tracking-wider mb-2">Regulatory Reference</div>
            <h3 className="text-2xl font-bold text-[#0A2540]">Statutory Clarifications & FAQs</h3>
          </div>

          <div className="space-y-3">
            <details className="bg-white border border-[#E2DED6] rounded p-4 group">
              <summary className="font-semibold text-sm text-[#0A2540] cursor-pointer list-none flex items-center justify-between">
                <span>Does GovInnovate permit direct procurement without tenders?</span>
                <span className="text-[#5B6A78] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] mt-3">
                No. Procurement decisions are always subject to applicable GFR, GeM rules, departmental procurement policies, and competent-authority approval. GovInnovate provides a structured sandbox environment to validate early-stage solutions before formal procurement or scale-up decisions are considered by authorized committees.
              </div>
            </details>

            <details className="bg-white border border-[#E2DED6] rounded p-4 group">
              <summary className="font-semibold text-sm text-[#0A2540] cursor-pointer list-none flex items-center justify-between">
                <span>How are startup relaxations applied?</span>
                <span className="text-[#5B6A78] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] mt-3">
                In accordance with Department of Expenditure guidelines and DPIIT notifications, prior turnover and prior experience criteria may be relaxed for recognized startups, provided the startup meets technical capability, quality, and performance criteria specified by the procuring department.
              </div>
            </details>

            <details className="bg-white border border-[#E2DED6] rounded p-4 group">
              <summary className="font-semibold text-sm text-[#0A2540] cursor-pointer list-none flex items-center justify-between">
                <span>How does the 5-pillar evaluation process operate?</span>
                <span className="text-[#5B6A78] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pt-3 text-xs text-[#5B6A78] leading-relaxed border-t border-[#EDE9E1] mt-3">
                Shortlisted applications are scored across Innovation (0-20), Feasibility (0-20), Impact (0-20), Scalability (0-20), and Viability (0-20). Evaluators must submit written justifications and cite verifiable evidence for each pillar to ensure total accountability.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FAF8F5] border-t border-[#E2DED6] py-10 px-6 sm:px-8 text-xs text-[#5B6A78]">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-bold text-sm text-[#0A2540]">GovInnovate</div>
            <div className="text-[11px] text-[#7E8B97] mt-0.5">National Public Innovation Sandbox Prototype</div>
          </div>
          <div className="text-[11px] text-[#7E8B97] text-right">
            <span>Sustainathon 2.0 • Civic Technology Track</span>
            <div className="mt-0.5">Procurement decisions subject to GFR and competent-authority sanction.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

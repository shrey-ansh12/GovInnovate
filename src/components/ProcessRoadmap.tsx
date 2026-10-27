"use client";

import React, { useState } from "react";
import { useApp, ActiveView } from "@/context/AppContext";
import { 
  Building2, 
  Rocket, 
  Award, 
  Layers, 
  BarChart3, 
  FileCheck2, 
  ArrowRight, 
  Info, 
  CheckCircle2,
  ChevronDown,
  Sparkles
} from "lucide-react";

interface StepConfig {
  num: string;
  title: string;
  stakeholder: "Government" | "Startup" | "Evaluator" | "Govt & Startup" | "Startup & Evaluator";
  role: "government" | "startup" | "evaluator";
  targetView: ActiveView;
  shortDesc: string;
  fullDesc: string;
  legalAnchor: string;
}

export const PROCESS_STEPS: StepConfig[] = [
  {
    num: "01",
    title: "Challenge Formulation",
    stakeholder: "Government",
    role: "government",
    targetView: "create_challenge",
    shortDesc: "Gov defines problem statement, thresholds & budget",
    fullDesc: "Department identifies civic procurement bottleneck, specifies operational TRL requirements (TRL >= 7), sets sandbox budget, and publishes the challenge for startup discovery.",
    legalAnchor: "GFR 2017 Innovation Safe-Harbor"
  },
  {
    num: "02",
    title: "Startup Application",
    stakeholder: "Startup",
    role: "startup",
    targetView: "startup_dashboard",
    shortDesc: "DPIIT startups submit technical bids with relaxations",
    fullDesc: "Recognized DPIIT startups review requirements, leverage GFR Rule 170(i) turnover relaxations, and submit technical proposals with prototype specs.",
    legalAnchor: "DPIIT Startup Exemption Order"
  },
  {
    num: "03",
    title: "5-Pillar Evaluation",
    stakeholder: "Evaluator",
    role: "evaluator",
    targetView: "evaluation_scorecard",
    shortDesc: "Independent panel scores Innovation, Feasibility & Impact",
    fullDesc: "Standing technical committee evaluates proposals across 5 objective pillars (Innovation 25%, Feasibility 25%, Impact 20%, Scalability 15%, Viability 15%) with evidence citations.",
    legalAnchor: "GFR Rule 173 Guidelines"
  },
  {
    num: "04",
    title: "90-Day Sandbox Pilot",
    stakeholder: "Govt & Startup",
    role: "government",
    targetView: "pilot_management",
    shortDesc: "Live deployment across real municipal intake stations",
    fullDesc: "Department sanctions 90-day sandbox pilot with structured milestone gates. IoT sensors, edge hardware, and telemetry are deployed in live municipal environments.",
    legalAnchor: "Sandbox Operational Rails"
  },
  {
    num: "05",
    title: "Evidence & KPI Validation",
    stakeholder: "Startup & Evaluator",
    role: "startup",
    targetView: "kpi_monitoring",
    shortDesc: "Telemetry & field data verified with lab audits",
    fullDesc: "Startup uploads cryptographically hashed milestone evidence (telemetry logs, photos, test runs). Independent NABL-accredited labs compare target vs actual KPIs.",
    legalAnchor: "Cryptographic SHA-256 Audit Trail"
  },
  {
    num: "06",
    title: "Scale-Up Procurement",
    stakeholder: "Government",
    role: "government",
    targetView: "scale_up",
    shortDesc: "Empirical success sanctions departmental rollout",
    fullDesc: "Based on empirical sandbox results, competent authority records formal procurement sanction: scale-up deployment across 50+ zones, further review, or conclusion.",
    legalAnchor: "GeM & GFR Regular Procurement Transition"
  }
];

interface ProcessRoadmapProps {
  variant?: "compact-bar" | "full-cards" | "stepper";
  className?: string;
}

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({
  variant = "full-cards",
  className = ""
}) => {
  const { activeView, setActiveView, setRole, challenge } = useApp();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getActiveStepIndex = (): number => {
    switch (activeView) {
      case "create_challenge":
      case "ai_startup_matches":
      case "challenge_details":
        return 0;
      case "startup_profile":
      case "startup_dashboard":
      case "application_review":
        return 1;
      case "evaluation_scorecard":
      case "evaluator_dashboard":
        return 2;
      case "pilot_management":
        return 3;
      case "kpi_monitoring":
      case "validation_report":
      case "documents":
        return 4;
      case "scale_up":
      case "procurement_recommendation":
        return 5;
      default:
        return 0;
    }
  };

  const activeIndex = getActiveStepIndex();

  const handleStepClick = (step: StepConfig) => {
    setRole(step.role);
    setActiveView(step.targetView);
  };

  // Compact bar variant for headers
  if (variant === "compact-bar") {
    return (
      <div className={`flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none ${className}`}>
        {PROCESS_STEPS.map((step, idx) => {
          const isCurrent = idx === activeIndex;
          const isDone = idx < activeIndex;

          return (
            <React.Fragment key={step.num}>
              <button
                onClick={() => handleStepClick(step)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all shrink-0 ${
                  isCurrent
                    ? "bg-white text-[#0F3854] font-bold shadow-xs border border-white"
                    : isDone
                    ? "bg-white/10 text-emerald-300 hover:bg-white/20"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                title={`${step.title} (${step.stakeholder}): ${step.shortDesc}`}
              >
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? "bg-[#0F3854] text-white"
                    : isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-white/20 text-slate-200"
                }`}>
                  {isDone ? "✓" : step.num}
                </span>
                <span className="font-sans font-medium">{step.title}</span>
                <span className="text-[9px] opacity-70 hidden lg:inline">({step.stakeholder.split(" ")[0]})</span>
              </button>
              {idx < PROCESS_STEPS.length - 1 && (
                <span className="text-slate-500 text-[10px] shrink-0">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Full visual cards layout for the Dashboard Hub / Landing
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2DED6] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F3854]">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Clear 6-Step Sandbox Process</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] mt-0.5">
            How Procurement-to-Pilot Works
          </h2>
        </div>
        <div className="text-xs text-[#5B6A78] flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Click any step to jump directly to that phase</span>
        </div>
      </div>

      {/* Grid of 6 Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {PROCESS_STEPS.map((step, idx) => {
          const isCurrent = idx === activeIndex;
          const isDone = idx < activeIndex;
          const isExpanded = expandedStep === step.num;

          const getBadgeColor = (stakeholder: string) => {
            if (stakeholder.includes("Government")) return "bg-[#F2EFEB] text-[#0F3854] border-[#E2DED6]";
            if (stakeholder.includes("Startup")) return "bg-[#EBF6F0] text-[#147452] border-[#C2E5D2]";
            return "bg-[#FEF7EA] text-[#8A5B0B] border-[#F0D598]";
          };

          return (
            <div
              key={step.num}
              className={`rounded-lg border p-4 flex flex-col justify-between transition-all group bg-white shadow-2xs ${
                isCurrent 
                  ? "border-[#0F3854] ring-2 ring-[#0F3854]/10 bg-[#FAF8F5]" 
                  : "border-[#E2DED6] hover:border-[#0F3854]"
              }`}
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                    isCurrent 
                      ? "bg-[#0F3854] text-white" 
                      : isDone 
                      ? "bg-emerald-600 text-white" 
                      : "bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6]"
                  }`}>
                    {isDone ? "✓" : step.num}
                  </span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getBadgeColor(step.stakeholder)}`}>
                    {step.stakeholder}
                  </span>
                </div>

                {/* Step Title & Description */}
                <h3 className="font-bold text-sm text-[#0A2540] mb-1 group-hover:text-[#0F3854] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5B6A78] leading-relaxed">
                  {step.shortDesc}
                </p>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#EDE9E1] text-[11px] text-[#5B6A78] space-y-1.5 animate-in fade-in duration-150">
                    <p className="leading-normal">{step.fullDesc}</p>
                    <div className="font-mono text-[10px] text-[#147452] font-semibold">
                      § {step.legalAnchor}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Jump Button */}
              <div className="pt-3 mt-3 border-t border-[#EDE9E1] flex items-center justify-between gap-1">
                <button
                  onClick={() => handleStepClick(step)}
                  className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                    isCurrent 
                      ? "text-[#0F3854] underline" 
                      : "text-[#5B6A78] group-hover:text-[#0F3854]"
                  }`}
                >
                  <span>Go to Phase</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedStep(isExpanded ? null : step.num);
                  }}
                  className="text-[10px] font-mono text-[#7E8B97] hover:text-[#0A2540] p-1"
                  title="Toggle details"
                >
                  <Info className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

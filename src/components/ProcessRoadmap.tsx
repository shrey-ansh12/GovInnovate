"use client";

import React from "react";
import { useApp, ActiveView } from "@/context/AppContext";
import { 
  Building2, 
  Rocket, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface StepConfig {
  num: number;
  title: string;
  who: string;
  role: "government" | "startup" | "evaluator";
  targetView: ActiveView;
  desc: string;
}

export const PROCESS_STEPS: StepConfig[] = [
  {
    num: 1,
    title: "Post Challenge",
    who: "Government",
    role: "government",
    targetView: "create_challenge",
    desc: "Defines public problem statement, budget & technical thresholds."
  },
  {
    num: 2,
    title: "Submit Bids",
    who: "Startup",
    role: "startup",
    targetView: "startup_dashboard",
    desc: "DPIIT startups submit technical proposals with tender relaxations."
  },
  {
    num: 3,
    title: "5-Pillar Score",
    who: "Evaluator",
    role: "evaluator",
    targetView: "evaluation_scorecard",
    desc: "Standing committee grades Innovation, Feasibility & Impact (0-100 pts)."
  },
  {
    num: 4,
    title: "90-Day Pilot",
    who: "Govt & Startup",
    role: "government",
    targetView: "pilot_management",
    desc: "Live field test with structured milestone gates & escrow payouts."
  },
  {
    num: 5,
    title: "Validate KPIs",
    who: "Evaluator",
    role: "evaluator",
    targetView: "kpi_monitoring",
    desc: "Real IoT sensor telemetry & NABL lab tests confirm performance."
  },
  {
    num: 6,
    title: "Scale Procurement",
    who: "Government",
    role: "government",
    targetView: "scale_up",
    desc: "Successful pilot sanctions full departmental rollout on GeM."
  }
];

interface ProcessRoadmapProps {
  variant?: "compact-bar" | "full-cards";
  className?: string;
}

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({
  variant = "full-cards",
  className = ""
}) => {
  const { activeView, setActiveView, setRole } = useApp();

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
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all shrink-0 ${
                  isCurrent
                    ? "bg-white text-[#0F3854] font-bold shadow-xs"
                    : isDone
                    ? "bg-white/10 text-emerald-300 hover:bg-white/20 font-medium"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                title={`Stage ${step.num}: ${step.title} (${step.who}) - ${step.desc}`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? "bg-[#0F3854] text-white"
                    : isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-white/20 text-slate-200"
                }`}>
                  {isDone ? "✓" : step.num}
                </span>
                <span>{step.title}</span>
              </button>
              {idx < PROCESS_STEPS.length - 1 && (
                <span className="text-slate-500 text-xs shrink-0">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Full clean visual cards layout for the Dashboard Hub
  return (
    <div className={`bg-white rounded-2xl border border-[#E2DED6] p-6 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE9E1] pb-4 mb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#147452] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Simple 6-Step Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A2540] mt-0.5">
            How Procurement-to-Pilot Works
          </h2>
        </div>
        <span className="text-xs text-[#5B6A78] font-medium bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E2DED6]">
          Click any step to jump straight to that stage
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {PROCESS_STEPS.map((step, idx) => {
          const isCurrent = idx === activeIndex;
          const isDone = idx < activeIndex;

          const getBadgeColor = (who: string) => {
            if (who.includes("Government")) return "bg-[#F2EFEB] text-[#0F3854]";
            if (who.includes("Startup")) return "bg-[#EBF6F0] text-[#147452]";
            return "bg-[#FEF7EA] text-[#8A5B0B]";
          };

          return (
            <div
              key={step.num}
              onClick={() => handleStepClick(step)}
              className={`rounded-xl p-4 flex flex-col justify-between transition-all cursor-pointer border relative group ${
                isCurrent
                  ? "bg-[#FAF8F5] border-[#0F3854] ring-2 ring-[#0F3854]/20 shadow-xs"
                  : "bg-white border-[#E2DED6] hover:border-[#0F3854]/60 hover:shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center ${
                    isDone 
                      ? "bg-emerald-600 text-white" 
                      : isCurrent 
                      ? "bg-[#0F3854] text-white" 
                      : "bg-[#F2EFEB] text-[#0F3854]"
                  }`}>
                    {isDone ? "✓" : step.num}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getBadgeColor(step.who)}`}>
                    {step.who}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#0A2540] group-hover:text-[#0F3854] transition-colors mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5B6A78] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EDE9E1] flex items-center justify-between text-xs font-bold text-[#0F3854]">
                <span className="group-hover:translate-x-0.5 transition-transform">Go to Stage</span>
                <ChevronRight className="h-4 w-4 text-[#5B6A78] group-hover:text-[#0F3854]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

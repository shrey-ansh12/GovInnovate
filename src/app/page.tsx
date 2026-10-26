"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { NavigationBar } from "@/components/NavigationBar";
import { LandingPage } from "@/components/LandingPage";
import { GovernmentDashboard } from "@/components/GovernmentDashboard";
import { StartupDashboard } from "@/components/StartupDashboard";
import { EvaluatorDashboard } from "@/components/EvaluatorDashboard";
import { CreateChallenge } from "@/components/CreateChallenge";
import { ChallengeDetails } from "@/components/ChallengeDetails";
import { AiStartupMatches } from "@/components/AiStartupMatches";
import { StartupProfile } from "@/components/StartupProfile";
import { ApplicationReview } from "@/components/ApplicationReview";
import { EvaluationScorecard } from "@/components/EvaluationScorecard";
import { PilotManagement } from "@/components/PilotManagement";
import { KpiMonitoring } from "@/components/KpiMonitoring";
import { ValidationReport } from "@/components/ValidationReport";
import { ProcurementRecommendation } from "@/components/ProcurementRecommendation";
import { ScaleUp } from "@/components/ScaleUp";
import { DocumentsView } from "@/components/DocumentsView";
import { NotificationsView } from "@/components/NotificationsView";
import { AuditTrail } from "@/components/AuditTrail";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case "landing":
        return <LandingPage />;
      case "gov_dashboard":
        return <GovernmentDashboard />;
      case "startup_dashboard":
        return <StartupDashboard />;
      case "evaluator_dashboard":
        return <EvaluatorDashboard />;
      case "create_challenge":
        return <CreateChallenge />;
      case "challenge_details":
        return <ChallengeDetails />;
      case "ai_startup_matches":
        return <AiStartupMatches />;
      case "startup_profile":
        return <StartupProfile />;
      case "application_review":
        return <ApplicationReview />;
      case "evaluation_scorecard":
        return <EvaluationScorecard />;
      case "pilot_management":
        return <PilotManagement />;
      case "kpi_monitoring":
        return <KpiMonitoring />;
      case "validation_report":
        return <ValidationReport />;
      case "procurement_recommendation":
        return <ProcurementRecommendation />;
      case "scale_up":
        return <ScaleUp />;
      case "documents":
        return <DocumentsView />;
      case "notifications":
        return <NotificationsView />;
      case "audit_trail":
        return <AuditTrail />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141F2B] flex flex-col font-sans">
      <NavigationBar />
      <AuthModal />
      <main className="flex-1">
        {renderActiveView()}
      </main>
      {activeView !== "landing" && (
        <footer className="bg-[#0F3854] border-t border-[#1D4E72] text-slate-300 py-6 px-6 text-xs">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-white">GovInnovate Sandbox Prototype</span> • Transparent Procurement-to-Pilot Rails
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-300 font-mono text-[11px]">
              <span>DPIIT Startup Framework</span>
              <span>•</span>
              <span>Proposed Treasury Integration</span>
              <span>•</span>
              <span>GFR Rule 173 Guidelines</span>
            </div>
          </div>
          <div className="max-w-[1360px] mx-auto mt-2 pt-2 border-t border-white/10 text-[11px] text-slate-400 text-center">
            Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval.
          </div>
        </footer>
      )}
    </div>
  );
}

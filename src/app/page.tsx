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
              <span className="font-semibold text-white">GovInnovate Sandbox Platform</span> • GFR 2017 Rule 173 Statutory Safe Harbor
            </div>
            <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
              <span>DPIIT Verification Bridge</span>
              <span>•</span>
              <span>PFMS Milestone Escrow</span>
              <span>•</span>
              <span>Tier-IV NIC Sovereign Hosting</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

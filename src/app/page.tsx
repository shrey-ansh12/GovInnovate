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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <NavigationBar />
      <AuthModal />
      <main className="flex-1">
        {renderActiveView()}
      </main>
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white">GovInnovate Sandbox Platform</span> • Startup-Friendly Public Procurement Mechanism
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>GFR 2017 Start-up Exemption Framework</span>
            <span>•</span>
            <span>DPIIT Bridge Integration</span>
            <span>•</span>
            <span>PFMS Milestone Direct Credit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

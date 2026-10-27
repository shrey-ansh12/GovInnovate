"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";
import { 
  Building2, 
  Rocket, 
  Award, 
  X, 
  CheckCircle2, 
  Lock, 
  Mail, 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  KeyRound, 
  Loader2 
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalMode, authModalRole } = useApp();

  if (!authModalOpen) return null;

  return (
    <AuthModalInner
      key={`${authModalMode}-${authModalRole}`}
      initialMode={authModalMode}
      initialRole={authModalRole}
    />
  );
};

interface AuthModalInnerProps {
  initialMode: "signin" | "signup";
  initialRole: UserRole;
}

const AuthModalInner: React.FC<AuthModalInnerProps> = ({ initialMode, initialRole }) => {
  const { 
    closeAuthModal, 
    setAuthModalRole,
    registerStartupAction,
    registerGovOfficerAction,
    loginUser,
    appMode,
    isLiveDbConnected,
    signInReal,
    signUpReal,
    resetPasswordReal
  } = useApp();

  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Startup Form State
  const [startupName, setStartupName] = useState("");
  const [dpiitNumber, setDpiitNumber] = useState("");
  const [founderName, setFounderName] = useState("");
  const [startupEmail, setStartupEmail] = useState("");
  const [sector, setSector] = useState("CleanTech & Water");
  const [city, setCity] = useState("New Delhi");
  const [startupPassword, setStartupPassword] = useState("");

  // Officer Form State
  const [officerName, setOfficerName] = useState("");
  const [designation, setDesignation] = useState("Director (Procurement)");
  const [ministry, setMinistry] = useState("Ministry of Jal Shakti");
  const [officerEmail, setOfficerEmail] = useState("");
  const [officerId, setOfficerId] = useState("");
  const [officerPassword, setOfficerPassword] = useState("");

  // Evaluator Form State
  const [evaluatorName, setEvaluatorName] = useState("");
  const [evaluatorInstitution, setEvaluatorInstitution] = useState("IIT Delhi / Technical Evaluation Board");
  const [evaluatorEmail, setEvaluatorEmail] = useState("");
  const [evaluatorPassword, setEvaluatorPassword] = useState("");

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Forgot Password State
  const [resetEmail, setResetEmail] = useState("");

  const handleStartupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!startupName || !founderName || !startupEmail) {
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }

    if (appMode === "real" && isLiveDbConnected) {
      if (!startupPassword || startupPassword.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      setLoading(true);
      const res = await signUpReal({
        email: startupEmail,
        password: startupPassword,
        role: "startup",
        fullName: founderName,
        organizationName: startupName,
        designation: "Founder & CEO",
        identifier: dpiitNumber || `DPIIT-${Math.floor(10000 + Math.random() * 90000)}`,
        sector,
        city
      });
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || "Failed to register startup account.");
      }
    } else {
      registerStartupAction({
        name: startupName,
        dpiitNumber: dpiitNumber || `DIPP-${Math.floor(10000 + Math.random() * 90000)}`,
        founderName,
        email: startupEmail,
        sector,
        city
      });
    }
  };

  const handleOfficerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!officerName || !officerEmail) {
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }

    if (appMode === "real" && isLiveDbConnected) {
      if (!officerPassword || officerPassword.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      setLoading(true);
      const res = await signUpReal({
        email: officerEmail,
        password: officerPassword,
        role: "government",
        fullName: officerName,
        organizationName: ministry || "Ministry of Jal Shakti",
        designation: designation || "Executive Director",
        identifier: officerId || `NIC-${Math.floor(1000 + Math.random() * 9000)}`
      });
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || "Failed to register government officer account.");
      }
    } else {
      registerGovOfficerAction({
        name: officerName,
        designation: designation || "Executive Director",
        ministry: ministry || "Ministry of Jal Shakti",
        email: officerEmail,
        officerId: officerId || `NIC-${Math.floor(1000 + Math.random() * 9000)}`
      });
    }
  };

  const handleEvaluatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!evaluatorName || !evaluatorEmail) {
      setErrorMessage("Please fill in all mandatory fields.");
      return;
    }

    if (appMode === "real" && isLiveDbConnected) {
      if (!evaluatorPassword || evaluatorPassword.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      setLoading(true);
      const res = await signUpReal({
        email: evaluatorEmail,
        password: evaluatorPassword,
        role: "evaluator",
        fullName: evaluatorName,
        organizationName: evaluatorInstitution,
        designation: "Technical Committee Member",
        identifier: `EVAL-${Math.floor(100 + Math.random() * 900)}`
      });
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || "Failed to register evaluator account.");
      }
    } else {
      loginUser({
        id: `EVAL-${Date.now().toString().slice(-4)}`,
        name: evaluatorName,
        email: evaluatorEmail,
        role: "evaluator",
        organization: evaluatorInstitution,
        designation: "Technical Evaluator",
        identifier: `EVAL-DEMO`
      });
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signInEmail) {
      setErrorMessage("Email address is required.");
      return;
    }

    if (appMode === "real" && isLiveDbConnected) {
      if (!signInPassword) {
        setErrorMessage("Password is required in Real Mode.");
        return;
      }
      setLoading(true);
      const res = await signInReal(signInEmail, signInPassword);
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || "Sign in failed. Check credentials.");
      }
    } else {
      // Demo Mode sign in
      if (selectedRole === "government") {
        loginUser({
          id: "GOV-DEMO-01",
          name: signInEmail.includes("@") ? signInEmail.split("@")[0].toUpperCase() + " (Govt Officer)" : "Dr. Rajeshwar Sharma, IAS",
          email: signInEmail || "rajeshwar.sharma@jalshakti.gov.in",
          role: "government",
          organization: "Ministry of Jal Shakti",
          designation: "Director (Procurement & Innovation)",
          identifier: "GOV-IAS-2024-991"
        });
      } else if (selectedRole === "evaluator") {
        loginUser({
          id: "EVAL-DEMO-01",
          name: signInEmail.includes("@") ? signInEmail.split("@")[0].toUpperCase() : "Prof. Vinod Nair",
          email: signInEmail || "vinod.nair@iitd.ac.in",
          role: "evaluator",
          organization: "IIT Delhi / Technical Evaluation Board",
          designation: "Chairman, Expert Committee",
          identifier: "EVAL-IITD-770"
        });
      } else {
        loginUser({
          id: "ST-AQUASENSE",
          name: signInEmail.includes("@") ? signInEmail.split("@")[0] : "Dr. Aranya Sen",
          email: signInEmail || "aranya@aquasense-ai.in",
          role: "startup",
          organization: "AquaSense AI Innovations Pvt Ltd",
          designation: "Founder & CEO",
          identifier: "DPIIT-REC-89241-DL"
        });
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!resetEmail || !resetEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const res = await resetPasswordReal(resetEmail);
    setLoading(false);
    if (res.success) {
      setSuccessMessage(res.message || "Password reset instructions sent.");
    } else {
      setErrorMessage(res.error || "Failed to dispatch password reset.");
    }
  };

  const handleQuickDemoGovt = () => {
    loginUser({
      id: "GOV-DEMO-01",
      name: "Dr. Rajeshwar Sharma, IAS",
      email: "rajeshwar.sharma@jalshakti.gov.in",
      role: "government",
      organization: "Ministry of Jal Shakti",
      designation: "Director (Procurement & Innovation)",
      identifier: "GOV-IAS-2024-991"
    });
  };

  const handleQuickDemoStartup = () => {
    loginUser({
      id: "ST-AQUASENSE",
      name: "Dr. Aranya Sen",
      email: "aranya@aquasense-ai.in",
      role: "startup",
      organization: "AquaSense AI Innovations Pvt Ltd",
      designation: "Founder & CEO",
      identifier: "DPIIT-REC-89241-DL"
    });
  };

  const handleQuickDemoEvaluator = () => {
    loginUser({
      id: "EVAL-DEMO-01",
      name: "Prof. Vinod Nair",
      email: "vinod.nair@iitd.ac.in",
      role: "evaluator",
      organization: "IIT Delhi / Technical Evaluation Board",
      designation: "Chairman, Expert Committee",
      identifier: "EVAL-IITD-770"
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="relative w-full max-w-xl bg-white rounded shadow-2xl border border-[#E2DED6] overflow-hidden text-[#141F2B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-6 bg-[#0F3854] text-white border-b border-[#1D4E72]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-white/10 border border-white/20">
                {selectedRole === "government" ? (
                  <Building2 className="h-5 w-5 text-emerald-300" />
                ) : selectedRole === "evaluator" ? (
                  <Award className="h-5 w-5 text-amber-300" />
                ) : (
                  <Rocket className="h-5 w-5 text-emerald-300" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  {appMode === "real" ? "Real Authentication (Supabase)" : "Sandbox Prototype (Demo Mode)"}
                </span>
                <h2 className="text-xl font-semibold mt-1">
                  {mode === "signup" ? "Create Account & Register" : mode === "forgot" ? "Reset Password" : "Sign In to Platform"}
                </h2>
              </div>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Role Selector Tabs */}
          {mode !== "forgot" && (
            <div className="mt-5 grid grid-cols-3 gap-2 p-1 bg-black/25 rounded border border-white/10 font-mono text-xs">
              <button
                type="button"
                onClick={() => { setSelectedRole("startup"); setAuthModalRole("startup"); }}
                className={`py-2 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === "startup"
                    ? "bg-white text-[#0F3854] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Rocket className="h-3 w-3" />
                <span>DPIIT Startup</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedRole("government"); setAuthModalRole("government"); }}
                className={`py-2 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === "government"
                    ? "bg-white text-[#0F3854] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Building2 className="h-3 w-3" />
                <span>Govt Officer</span>
              </button>
              <button
                type="button"
                onClick={() => { setSelectedRole("evaluator"); setAuthModalRole("evaluator"); }}
                className={`py-2 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                  selectedRole === "evaluator"
                    ? "bg-white text-[#0F3854] font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Award className="h-3 w-3" />
                <span>Evaluator</span>
              </button>
            </div>
          )}
        </div>

        {/* Mode Switcher: Sign In vs Sign Up */}
        {mode !== "forgot" && (
          <div className="flex border-b border-[#E2DED6] bg-[#FAF8F5] text-xs font-mono font-medium">
            <button
              type="button"
              onClick={() => { setMode("signin"); setErrorMessage(null); }}
              className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 border-b-2 ${
                mode === "signin"
                  ? "border-[#0F3854] text-[#0F3854] bg-white font-semibold"
                  : "border-transparent text-[#5B6A78] hover:text-[#141F2B]"
              }`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setErrorMessage(null); }}
              className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 border-b-2 ${
                mode === "signup"
                  ? "border-[#0F3854] text-[#0F3854] bg-white font-semibold"
                  : "border-transparent text-[#5B6A78] hover:text-[#141F2B]"
              }`}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>
                {selectedRole === "startup" ? "Register Startup" : selectedRole === "government" ? "Officer Sign Up" : "Evaluator Sign Up"}
              </span>
            </button>
          </div>
        )}

        {/* Notifications / Error Banner */}
        {errorMessage && (
          <div className="m-4 p-3 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="m-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {mode === "signin" && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Quick Demo Buttons for Demo Mode */}
              {appMode === "demo" && (
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E2DED6] rounded font-mono space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#0A2540]">Demo Mode Quick Sign In</p>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Sandbox
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleQuickDemoGovt}
                      className="py-1.5 px-2 bg-white hover:bg-[#0F3854] hover:text-white border border-[#E2DED6] rounded text-[10px] font-medium transition-colors text-center truncate"
                    >
                      Jal Shakti IAS
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickDemoStartup}
                      className="py-1.5 px-2 bg-white hover:bg-[#147452] hover:text-white border border-[#E2DED6] rounded text-[10px] font-medium transition-colors text-center truncate"
                    >
                      AquaSense AI
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickDemoEvaluator}
                      className="py-1.5 px-2 bg-white hover:bg-[#8A5B0B] hover:text-white border border-[#E2DED6] rounded text-[10px] font-medium transition-colors text-center truncate"
                    >
                      IIT Evaluator
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#7E8B97]" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder={
                      selectedRole === "government"
                        ? "officer@jalshakti.gov.in"
                        : selectedRole === "evaluator"
                        ? "evaluator@iitd.ac.in"
                        : "founder@startup.in"
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono font-medium text-[#5B6A78]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setResetEmail(signInEmail); setErrorMessage(null); }}
                    className="text-[11px] text-[#0F3854] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#7E8B97]" />
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required={appMode === "real"}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                <span>Sign In to {selectedRole === "government" ? "Government" : selectedRole === "evaluator" ? "Evaluator" : "Startup"} Workspace</span>
              </button>
            </form>
          )}

          {mode === "signup" && selectedRole === "startup" && (
            /* Startup Registration Form */
            <form onSubmit={handleStartupSubmit} className="space-y-4">
              <div className="p-3 bg-[#EBF6F0] border border-[#C2E5D2] rounded text-xs text-[#147452] flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>DPIIT Startup Safe-Harbor:</strong> Valid recognition grants relaxation from prior turnover and experience under GFR Rule 170(i).
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Startup Entity Name *</label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. AquaSense AI Innovations Pvt Ltd"
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Founder / MD Name *</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. Dr. Aranya Sen"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">DPIIT Recognition No.</label>
                  <input
                    type="text"
                    value={dpiitNumber}
                    onChange={(e) => setDpiitNumber(e.target.value)}
                    placeholder="DPIIT-REC-89241-DL"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Work Email *</label>
                  <input
                    type="email"
                    value={startupEmail}
                    onChange={(e) => setStartupEmail(e.target.value)}
                    placeholder="founders@aquasense-ai.in"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Password *</label>
                  <input
                    type="password"
                    value={startupPassword}
                    onChange={(e) => setStartupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required={appMode === "real"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none bg-white"
                  >
                    <option>CleanTech & Water</option>
                    <option>Smart Urban IoT & SCADA</option>
                    <option>Waste Management & Circularity</option>
                    <option>Renewable Energy & Telemetry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">City / Hub</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru / New Delhi"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#147452] hover:bg-[#0E593D] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
                <span>Complete Startup Registration</span>
              </button>
            </form>
          )}

          {mode === "signup" && selectedRole === "government" && (
            /* Government Officer Sign Up */
            <form onSubmit={handleOfficerSubmit} className="space-y-4">
              <div className="p-3 bg-[#FEF7EA] border border-[#F6E1B9] rounded text-xs text-[#8A5B0B] flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Official Verification Policy:</strong> Public users can register officer accounts, but publishing procurement tenders requires institutional identity verification.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Officer Full Name *</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="e.g. Dr. Rajeshwar Sharma, IAS"
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Ministry / Dept *</label>
                  <input
                    type="text"
                    value={ministry}
                    onChange={(e) => setMinistry(e.target.value)}
                    placeholder="Ministry of Jal Shakti"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Director (Procurement & Innovation)"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Govt Official Email *</label>
                  <input
                    type="email"
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    placeholder="rajeshwar.sharma@gov.in"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Password *</label>
                  <input
                    type="password"
                    value={officerPassword}
                    onChange={(e) => setOfficerPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required={appMode === "real"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Officer / NIC ID</label>
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="GOV-IAS-2024-991"
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Building2 className="h-4 w-4" />}
                <span>Register Government Department Profile</span>
              </button>
            </form>
          )}

          {mode === "signup" && selectedRole === "evaluator" && (
            /* Evaluator Sign Up */
            <form onSubmit={handleEvaluatorSubmit} className="space-y-4">
              <div className="p-3 bg-[#FEF7EA] border border-[#F6E1B9] rounded text-xs text-[#8A5B0B] flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Technical Committee Verification:</strong> Evaluator accounts evaluate startup proposals according to the 5-Pillar Scorecard.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Evaluator Full Name *</label>
                <input
                  type="text"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  placeholder="e.g. Prof. Vinod Nair"
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Academic / Research Institution *</label>
                <input
                  type="text"
                  value={evaluatorInstitution}
                  onChange={(e) => setEvaluatorInstitution(e.target.value)}
                  placeholder="IIT Delhi / CSIR / NIUA"
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    value={evaluatorEmail}
                    onChange={(e) => setEvaluatorEmail(e.target.value)}
                    placeholder="vinod.nair@iitd.ac.in"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Password *</label>
                  <input
                    type="password"
                    value={evaluatorPassword}
                    onChange={(e) => setEvaluatorPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required={appMode === "real"}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#8A5B0B] hover:bg-[#6E4706] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Award className="h-4 w-4" />}
                <span>Register Technical Evaluator</span>
              </button>
            </form>
          )}

          {mode === "forgot" && (
            /* Password Reset Request Form */
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-xs text-[#5B6A78] leading-relaxed">
                Enter your registered email address and we will dispatch a password reset link to your inbox.
              </p>

              <div>
                <label className="block text-xs font-mono font-medium text-[#5B6A78] mb-1">Account Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#7E8B97]" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@organization.in"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#E2DED6] focus:border-[#0F3854] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                <span>Dispatch Password Reset Link</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setMode("signin"); setErrorMessage(null); setSuccessMessage(null); }}
                  className="text-xs text-[#0F3854] hover:underline"
                >
                  ← Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

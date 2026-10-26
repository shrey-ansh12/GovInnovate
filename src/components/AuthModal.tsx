"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Rocket, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  LogIn, 
  UserPlus 
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    closeAuthModal, 
    authModalMode, 
    authModalRole, 
    setAuthModalRole,
    registerStartupAction,
    registerGovOfficerAction,
    loginUser
  } = useApp();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [selectedRole, setSelectedRole] = useState<"government" | "startup">("startup");

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

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  useEffect(() => {
    if (authModalOpen) {
      setMode(authModalMode);
      setSelectedRole(authModalRole === "government" ? "government" : "startup");
    }
  }, [authModalOpen, authModalMode, authModalRole]);

  if (!authModalOpen) return null;

  const handleStartupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startupName || !founderName || !startupEmail) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    registerStartupAction({
      name: startupName,
      dpiitNumber: dpiitNumber || `DIPP-${Math.floor(10000 + Math.random() * 90000)}`,
      founderName,
      email: startupEmail,
      sector,
      city
    });
  };

  const handleOfficerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerName || !officerEmail) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    registerGovOfficerAction({
      name: officerName,
      designation: designation || "Executive Director",
      ministry: ministry || "Ministry of Jal Shakti",
      email: officerEmail,
      officerId: officerId || `NIC-${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "government") {
      loginUser({
        id: "GOV-DEMO-01",
        name: officerEmail.includes("@") ? officerEmail.split("@")[0].toUpperCase() + " (Govt Officer)" : "Rajesh Sharma, IAS",
        email: signInEmail || "rajesh.sharma@jalshakti.gov.in",
        role: "government",
        organization: "Ministry of Jal Shakti",
        designation: "Director (Procurement & Innovation)",
        identifier: "GOV-IAS-2024-991"
      });
    } else {
      loginUser({
        id: "ST-AQUASENSE",
        name: signInEmail.includes("@") ? signInEmail.split("@")[0] : "Dr. Aranya Sen",
        email: signInEmail || "founders@aquasense.ai",
        role: "startup",
        organization: "AquaSense AI Pvt Ltd",
        designation: "Founder & CEO",
        identifier: "DIPP49281"
      });
    }
  };

  const handleQuickDemoGovt = () => {
    loginUser({
      id: "GOV-DEMO-01",
      name: "Rajesh Sharma, IAS",
      email: "rajesh.sharma@jalshakti.gov.in",
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
      email: "founders@aquasense.ai",
      role: "startup",
      organization: "AquaSense AI Pvt Ltd",
      designation: "Founder & CEO",
      identifier: "DIPP49281"
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
                ) : (
                  <Rocket className="h-5 w-5 text-emerald-300" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  National Innovation Sandbox
                </span>
                <h2 className="text-xl font-semibold mt-1">
                  {mode === "signup" ? "Create Account & Register" : "Sign In to Sandbox"}
                </h2>
              </div>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Role Selector Tabs */}
          <div className="mt-5 grid grid-cols-2 gap-2 p-1 bg-black/25 rounded border border-white/10 font-mono text-xs">
            <button
              type="button"
              onClick={() => { setSelectedRole("startup"); setAuthModalRole("startup"); }}
              className={`py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                selectedRole === "startup"
                  ? "bg-white text-[#0F3854] font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>DPIIT Startup</span>
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole("government"); setAuthModalRole("government"); }}
              className={`py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                selectedRole === "government"
                  ? "bg-white text-[#0F3854] font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Government Officer</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher: Sign In vs Sign Up */}
        <div className="flex border-b border-[#E2DED6] bg-[#FAF8F5] text-xs font-mono font-medium">
          <button
            type="button"
            onClick={() => setMode("signin")}
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
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 border-b-2 ${
              mode === "signup"
                ? "border-[#0F3854] text-[#0F3854] bg-white font-semibold"
                : "border-transparent text-[#5B6A78] hover:text-[#141F2B]"
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>{selectedRole === "startup" ? "Register Startup" : "Officer Sign Up"}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {mode === "signin" ? (
            /* Sign In Form */
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E2DED6] rounded flex items-center justify-between font-mono">
                <div>
                  <p className="text-xs font-semibold text-[#0A2540]">Quick Demo Access</p>
                  <p className="text-[11px] text-[#5B6A78]">Pre-configured test roles:</p>
                </div>
                {selectedRole === "government" ? (
                  <button
                    type="button"
                    onClick={handleQuickDemoGovt}
                    className="px-3 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors"
                  >
                    Enter as Jal Shakti
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleQuickDemoStartup}
                    className="px-3 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors"
                  >
                    Enter as AquaSense
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                  {selectedRole === "government" ? "Official Govt Email (.gov.in)" : "Registered Startup Email"}
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-2.5 text-[#5B6A78]" />
                  <input
                    type="email"
                    required
                    placeholder={selectedRole === "government" ? "rajesh.sharma@jalshakti.gov.in" : "founders@aquasense.ai"}
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">Password</label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-2.5 text-[#5B6A78]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded font-medium text-xs text-white bg-[#0F3854] hover:bg-[#1D4E72] transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In as {selectedRole === "government" ? "Government Officer" : "Startup Innovator"}</span>
              </button>
            </form>
          ) : selectedRole === "startup" ? (
            /* Startup Sign Up Form */
            <form onSubmit={handleStartupSubmit} className="space-y-3.5">
              <div className="p-3 bg-[#EBF6F0] border border-[#C2E5D2] rounded text-[11px] text-[#147452] flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-[#147452] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">GFR Rule 173 Fast-Track: </span>
                  DPIIT recognition automatically exempts your startup from past turnover and 3-year prior experience tender criteria.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Startup Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EcoPure Sensors Pvt Ltd"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    DPIIT Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DIPP89234"
                    value={dpiitNumber}
                    onChange={(e) => setDpiitNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@ecopure.in"
                    value={startupEmail}
                    onChange={(e) => setStartupEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Sector
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  >
                    <option value="CleanTech & Water">CleanTech & Water</option>
                    <option value="AI & Smart Telemetry">AI & Smart Telemetry</option>
                    <option value="AgriTech & Rural Infra">AgriTech & Rural Infra</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Karnataka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={startupPassword}
                  onChange={(e) => setStartupPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Register Startup & Access Sandbox Challenges</span>
              </button>
            </form>
          ) : (
            /* Government Officer Sign Up Form */
            <form onSubmit={handleOfficerSubmit} className="space-y-3.5">
              <div className="p-3 bg-[#FAF8F5] border border-[#E2DED6] rounded text-[11px] text-[#0A2540] flex items-start gap-2">
                <Building2 className="h-4 w-4 text-[#0F3854] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">National GovTech Sandbox: </span>
                  Officers can post unstructured public challenges, run AI pilot evaluations, and sanction scale-ups.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Officer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra, IAS"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joint Secretary / Director"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                  Department / Ministry *
                </label>
                <select
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                >
                  <option value="Ministry of Jal Shakti">Ministry of Jal Shakti</option>
                  <option value="Ministry of Electronics & IT (MeitY)">Ministry of Electronics & IT (MeitY)</option>
                  <option value="Ministry of Housing & Urban Affairs (MoHUA)">Ministry of Housing & Urban Affairs (MoHUA)</option>
                  <option value="State Urban Development Agency (SUDA)">State Urban Development Agency (SUDA)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Official Govt Email (.gov.in) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="v.malhotra@jalshakti.gov.in"
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                    Officer / Parichay SSO ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GOV-NIC-9812"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={officerPassword}
                  onChange={(e) => setOfficerPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E2DED6] rounded bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F3854]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Complete Officer Registration & Open Portal</span>
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="mt-5 pt-4 border-t border-[#EDE9E1] text-center text-xs text-[#5B6A78]">
            {mode === "signin" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-[#0F3854] hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-[#0F3854] hover:underline"
                >
                  Sign In instead
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

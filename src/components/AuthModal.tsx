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
  User, 
  KeyRound, 
  Briefcase, 
  MapPin, 
  Sparkles,
  ArrowRight,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className={`p-6 text-white ${
          selectedRole === "government"
            ? "bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800"
            : "bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                {selectedRole === "government" ? (
                  <Building2 className="h-5 w-5 text-blue-300" />
                ) : (
                  <Rocket className="h-5 w-5 text-emerald-300" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                  GovInnovate Unified Portal
                </span>
                <h2 className="text-xl font-extrabold mt-1">
                  {mode === "signup" ? "Create Account & Register" : "Sign In to Sandbox"}
                </h2>
              </div>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Role Selector Tabs */}
          <div className="mt-5 grid grid-cols-2 gap-2 p-1 bg-black/25 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => { setSelectedRole("startup"); setAuthModalRole("startup"); }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedRole === "startup"
                  ? "bg-white text-emerald-900 shadow-md font-extrabold"
                  : "text-emerald-100/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>DPIIT Startup</span>
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole("government"); setAuthModalRole("government"); }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                selectedRole === "government"
                  ? "bg-white text-blue-950 shadow-md font-extrabold"
                  : "text-blue-100/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Government Officer</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher: Sign In vs Sign Up */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 border-b-2 ${
              mode === "signin"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-2 border-b-2 ${
              mode === "signup"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            <span>{selectedRole === "startup" ? "Register Startup" : "Officer Sign Up"}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {mode === "signin" ? (
            /* Sign In Form */
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700">Quick Demo Access</p>
                  <p className="text-[11px] text-slate-500">Fast-track sign-in with pre-configured mock roles:</p>
                </div>
                {selectedRole === "government" ? (
                  <button
                    type="button"
                    onClick={handleQuickDemoGovt}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
                  >
                    Enter as Jal Shakti Officer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleQuickDemoStartup}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
                  >
                    Enter as AquaSense Startup
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === "government" ? "Official Govt Email ID (.gov.in / .nic.in)" : "Registered Startup Email"}
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder={selectedRole === "government" ? "rajesh.sharma@jalshakti.gov.in" : "founders@aquasense.ai"}
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                  <span>Remember Session</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("OTP verification sent to linked mobile number."); }} className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  selectedRole === "government"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                <LogIn className="h-4 w-4" />
                Sign In as {selectedRole === "government" ? "Government Officer" : "Startup Innovator"}
              </button>
            </form>
          ) : selectedRole === "startup" ? (
            /* Startup Sign Up Form */
            <form onSubmit={handleStartupSubmit} className="space-y-3.5">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">GFR 149/170 Fast-Track: </span>
                  DPIIT recognition automatically exempts your startup from past turnover and 3-year prior experience tender criteria.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Startup Legal Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EcoPure Sensors Pvt Ltd"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DPIIT Recognition Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DIPP89234"
                    value={dpiitNumber}
                    onChange={(e) => setDpiitNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder / Signatory Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@ecopure.in"
                    value={startupEmail}
                    onChange={(e) => setStartupEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Domain / Sector
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="CleanTech & Water">CleanTech & Water</option>
                    <option value="AI & Smart Telemetry">AI & Smart Telemetry</option>
                    <option value="AgriTech & Rural Infra">AgriTech & Rural Infra</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="HealthTech & Diagnostics">HealthTech & Diagnostics</option>
                    <option value="Urban Mobility & Drones">Urban Mobility & Drones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Karnataka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={startupPassword}
                  onChange={(e) => setStartupPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Register Startup & Access Sandbox Challenges
              </button>
            </form>
          ) : (
            /* Government Officer Sign Up Form */
            <form onSubmit={handleOfficerSubmit} className="space-y-3.5">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-800 flex items-start gap-2">
                <Building2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">National GovTech Sandbox: </span>
                  Officers can post unstructured public challenges, run AI-assisted pilot sandbox evaluations, and sanction scale-ups.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Officer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra, IAS"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Joint Secretary / Director"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Ministry *
                </label>
                <select
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Ministry of Jal Shakti">Ministry of Jal Shakti</option>
                  <option value="Ministry of Electronics & IT (MeitY)">Ministry of Electronics & IT (MeitY)</option>
                  <option value="Ministry of Housing & Urban Affairs (MoHUA)">Ministry of Housing & Urban Affairs (MoHUA)</option>
                  <option value="Ministry of Environment, Forest & Climate Change">Ministry of Environment, Forest & Climate Change</option>
                  <option value="Ministry of Health & Family Welfare">Ministry of Health & Family Welfare</option>
                  <option value="Ministry of Agriculture & Farmers Welfare">Ministry of Agriculture & Farmers Welfare</option>
                  <option value="State Urban Development Agency (SUDA)">State Urban Development Agency (SUDA)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Govt Email (.gov.in / .nic.in) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="v.malhotra@jalshakti.gov.in"
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Officer / Parichay SSO ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GOV-NIC-9812"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={officerPassword}
                  onChange={(e) => setOfficerPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Complete Officer Registration & Open Portal
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            {mode === "signin" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Register here as {selectedRole === "startup" ? "a Startup" : "a Govt Officer"}
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-bold text-blue-600 hover:underline"
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

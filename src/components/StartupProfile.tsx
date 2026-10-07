"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  ExternalLink
} from "lucide-react";

export const StartupProfile: React.FC = () => {
  const { startups, setActiveView, setRole, applyToChallengeAction } = useApp();
  const startup = startups[0]; // AquaSense AI

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-teal-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              AQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{startup.name}</h1>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  DPIIT Verified
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{startup.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> {startup.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Incorporated {startup.incorporationYear}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-slate-400" /> {startup.patents} Indian Patents Granted
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRole("startup");
                applyToChallengeAction(startup.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2"
            >
              Submit 90-Day Pilot Bid
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Founders & Statutory Relaxations */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-slate-400 font-bold uppercase text-[10px]">DPIIT Registration</p>
            <p className="font-bold text-slate-800 mt-0.5">{startup.dpiitNumber}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">✓ Tax Exemption 80-IAC Active</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-slate-400 font-bold uppercase text-[10px]">Founding Team</p>
            <p className="font-bold text-slate-800 mt-0.5">{startup.founders.join(", ")}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Deep-Tech Hardware Background</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-slate-400 font-bold uppercase text-[10px]">Public Procurement Status</p>
            <p className="font-bold text-blue-700 mt-0.5">GFR 149/170 Exemption Eligible</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Zero prior experience penalty</p>
          </div>
        </div>
      </div>

      {/* Products & Technology Dossier */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-600" />
              Verified Deep-Tech Hardware & Software Portfolio
            </h2>

            <div className="space-y-4">
              {startup.products.map((prod, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{prod.title}</h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {prod.stage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{prod.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Core Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {startup.techStack.map((tech, idx) => (
                  <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Match & Pilot Suitability */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
                AI Match Rationale (94%)
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed mb-4">
              AquaSense’s spectrophotometric probe directly solves the Jal Shakti challenge’s core pain point: eliminating chemical reagents while delivering sub-5 minute contamination telemetry.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-300">Hardware Readiness</span>
                <span className="font-bold text-emerald-400">TRL-8 (Proven)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-300">Regulatory Compliance</span>
                <span className="font-bold text-emerald-400">CPCB & BIS 10500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-800">
                <span className="text-slate-300">Production Inventory</span>
                <span className="font-bold text-emerald-400">120 Units in Stock</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
              Procurement Audit Integrity
            </h4>
            <p className="text-slate-600">
              Company holds valid GST registration, MSME Udyam credentials, and has zero negative vigilance flags on Government e-Marketplace (GeM).
            </p>
            <button
              onClick={() => setActiveView("documents")}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-slate-600" />
              Download DPIIT Compliance Pack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

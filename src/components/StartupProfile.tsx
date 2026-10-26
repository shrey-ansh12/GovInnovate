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
  Sparkles, 
  ArrowRight
} from "lucide-react";

export const StartupProfile: React.FC = () => {
  const { startups, setActiveView, setRole, applyToChallengeAction } = useApp();
  const startup = startups[0]; // AquaSense AI

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Profile Header */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EDE9E1]">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded bg-[#0F3854] text-white flex items-center justify-center font-semibold text-xl font-mono">
              AQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-[#0A2540]">{startup.name}</h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  DPIIT Verified
                </span>
              </div>
              <p className="text-xs text-[#5B6A78] mt-1">{startup.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5B6A78] mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#7E8B97]" /> {startup.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#7E8B97]" /> Inc. {startup.incorporationYear}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-[#7E8B97]" /> {startup.patents} Indian Patents
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
              className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-medium text-xs flex items-center gap-2 transition-colors"
            >
              <span>Submit 90-Day Pilot Bid</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Founders & Statutory Relaxations */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 text-xs font-mono">
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">DPIIT Registration</p>
            <p className="font-semibold text-[#0A2540] mt-0.5">{startup.dpiitNumber}</p>
            <p className="text-[11px] text-[#147452] mt-1">✓ Tax Exemption 80-IAC Active</p>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">Founding Team</p>
            <p className="font-semibold text-[#0A2540] mt-0.5">{startup.founders.join(", ")}</p>
            <p className="text-[11px] text-[#5B6A78] mt-1">Deep-Tech Hardware Research</p>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">Public Procurement Status</p>
            <p className="font-semibold text-[#0F3854] mt-0.5">GFR Rule 173 Exemption</p>
            <p className="text-[11px] text-[#5B6A78] mt-1">Zero prior turnover barrier</p>
          </div>
        </div>
      </div>

      {/* Products & Technology Dossier */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6">
            <h2 className="text-lg font-semibold text-[#0A2540] mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#0F3854]" />
              Verified Deep-Tech Hardware & Software Portfolio
            </h2>

            <div className="space-y-4">
              {startup.products.map((prod, idx) => (
                <div key={idx} className="p-4 rounded border border-[#E2DED6] bg-[#FAF8F5]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#0A2540]">{prod.title}</h3>
                    <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] rounded">
                      {prod.stage}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">{prod.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE9E1]">
              <h4 className="text-xs font-mono font-semibold uppercase text-[#5B6A78] mb-2">Core Tech Stack</h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {startup.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#FAF8F5] text-[#5B6A78] border border-[#E2DED6]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Match & Pilot Suitability */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                AI Match Rationale (94%)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AquaSense’s spectrophotometric probe directly solves the Jal Shakti challenge’s core pain point: eliminating chemical reagents while delivering sub-5 minute contamination telemetry.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Hardware Readiness</span>
                <span className="font-semibold text-emerald-300">TRL-8 (Proven)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Compliance</span>
                <span className="font-semibold text-emerald-300">CPCB & BIS 10500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Production Inventory</span>
                <span className="font-semibold text-white">120 Units in Stock</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded border border-[#E2DED6] p-5 text-xs space-y-3">
            <h4 className="font-semibold text-[#0A2540] uppercase text-[11px] font-mono tracking-wider">
              Procurement Audit Integrity
            </h4>
            <p className="text-[#5B6A78] leading-relaxed">
              Company holds valid GST registration, MSME Udyam credentials, and has zero negative vigilance flags on Government e-Marketplace (GeM).
            </p>
            <button
              onClick={() => setActiveView("documents")}
              className="w-full py-2 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0A2540] font-medium text-xs border border-[#E2DED6] transition-colors flex items-center justify-center gap-1.5 font-mono"
            >
              <FileText className="h-3.5 w-3.5 text-[#5B6A78]" />
              <span>Download DPIIT Compliance Pack</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

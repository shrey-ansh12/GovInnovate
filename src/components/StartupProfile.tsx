"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  MapPin, 
  Calendar, 
  Award, 
  ArrowRight,
  Edit3,
  Check,
  X,
  Layers
} from "lucide-react";

export const StartupProfile: React.FC = () => {
  const { startups, setActiveView, setRole, applyToChallengeAction, updateStartupProfileAction, role } = useApp();
  const [selectedStartupId, setSelectedStartupId] = useState<string>(startups[0]?.id || "ST-AQUASENSE");

  const startup = startups.find(s => s.id === selectedStartupId) || startups[0];

  const [editMode, setEditMode] = useState(false);
  const [editTagline, setEditTagline] = useState(startup.tagline);
  const [editTrl, setEditTrl] = useState(startup.trlLevel || 8);
  const [editLocalContent, setEditLocalContent] = useState(startup.localContentPercentage || 78);
  const [editPatents, setEditPatents] = useState(startup.patents || 3);
  const [editLocation, setEditLocation] = useState(startup.location);

  const handleSaveProfile = () => {
    updateStartupProfileAction(startup.id, {
      tagline: editTagline,
      trlLevel: editTrl,
      localContentPercentage: editLocalContent,
      patents: editPatents,
      location: editLocation
    });
    setEditMode(false);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Profile Header */}
      <div className="bg-white rounded border border-[#E2DED6] p-6 mb-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EDE9E1]">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded bg-[#0F3854] text-white flex items-center justify-center font-bold text-xl font-mono shrink-0">
              {startup.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-[#0A2540]">{startup.name}</h1>
                {startup.isDpiitVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    DPIIT Verified
                  </span>
                )}
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
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-[#7E8B97]" /> TRL-{startup.trlLevel} ({startup.localContentPercentage}% Local Content)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 rounded bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 rounded bg-[#147452] hover:bg-[#0f583e] text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Save Profile</span>
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-3 py-2 rounded bg-white border border-[#E2DED6] text-[#5B6A78] text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setRole("startup");
                applyToChallengeAction(startup.id);
              }}
              className="px-5 py-2.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-2xs"
            >
              <span>Submit 90-Day Pilot Bid</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Inline Edit Controls if editMode is true */}
        {editMode && (
          <div className="p-4 bg-[#FAF8F5] border-b border-[#EDE9E1] grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="text-[#7E8B97] block mb-1">Tagline:</label>
              <input
                type="text"
                value={editTagline}
                onChange={(e) => setEditTagline(e.target.value)}
                className="w-full p-2 bg-white border border-[#E2DED6] rounded text-xs"
              />
            </div>
            <div>
              <label className="text-[#7E8B97] block mb-1">TRL Level (1-9):</label>
              <input
                type="number"
                min="1"
                max="9"
                value={editTrl}
                onChange={(e) => setEditTrl(Number(e.target.value))}
                className="w-full p-2 bg-white border border-[#E2DED6] rounded text-xs"
              />
            </div>
            <div>
              <label className="text-[#7E8B97] block mb-1">Local Content %:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editLocalContent}
                onChange={(e) => setEditLocalContent(Number(e.target.value))}
                className="w-full p-2 bg-white border border-[#E2DED6] rounded text-xs"
              />
            </div>
            <div>
              <label className="text-[#7E8B97] block mb-1">Patents Count:</label>
              <input
                type="number"
                min="0"
                max="50"
                value={editPatents}
                onChange={(e) => setEditPatents(Number(e.target.value))}
                className="w-full p-2 bg-white border border-[#E2DED6] rounded text-xs"
              />
            </div>
          </div>
        )}

        {/* Founders & Statutory Relaxations */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 text-xs font-mono">
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">DPIIT Registration</p>
            <p className="font-bold text-[#0A2540] mt-0.5">{startup.dpiitNumber}</p>
            <p className="text-[11px] text-[#147452] mt-1 font-semibold">✓ Active National Recognition</p>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">Founding Team</p>
            <p className="font-bold text-[#0A2540] mt-0.5">{startup.founders.join(", ")}</p>
            <p className="text-[11px] text-[#5B6A78] mt-1">Deep-Tech Hardware Research</p>
          </div>
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6]">
            <p className="text-[#5B6A78] uppercase text-[10px]">Statutory Status</p>
            <p className="font-bold text-[#0F3854] mt-0.5">DPIIT Sandbox Rails</p>
            <p className="text-[11px] text-[#5B6A78] mt-1">Subject to tender criteria</p>
          </div>
        </div>
      </div>

      {/* Products & Technology Dossier */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#0F3854]" />
              Verified Deep-Tech Hardware & Software Portfolio
            </h2>

            <div className="space-y-4">
              {startup.products.map((prod, idx) => (
                <div key={idx} className="p-4 rounded border border-[#E2DED6] bg-[#FAF8F5]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0A2540]">{prod.title}</h3>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] rounded">
                      {prod.stage}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6A78] mt-2 leading-relaxed">{prod.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE9E1]">
              <h4 className="text-xs font-mono font-bold uppercase text-[#5B6A78] mb-2">Core Tech Stack</h4>
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

        {/* Right Column: Rule Match Rationale */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F3854] text-white rounded p-6 border border-[#1D4E72] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                Rule-Based Fit Rationale ({startup.matchScore}%)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              AquaSense’s optical spectrophotometer probe directly meets the Water Mission requirement for sub-5 minute contamination telemetry with zero reagent consumables.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Hardware Readiness</span>
                <span className="font-bold text-emerald-300">TRL-{startup.trlLevel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Domestic Content</span>
                <span className="font-bold text-emerald-300">{startup.localContentPercentage}% (Class 1)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Patents Registered</span>
                <span className="font-bold text-white">{startup.patents} Indian Patents</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded border border-[#E2DED6] p-5 text-xs space-y-3 shadow-2xs">
            <h4 className="font-bold text-[#0A2540] uppercase text-[11px] font-mono tracking-wider">
              Procurement Statutory Disclaimer
            </h4>
            <p className="text-[#5B6A78] leading-relaxed">
              Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval.
            </p>
            <button
              onClick={() => setActiveView("documents")}
              className="w-full py-2 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0A2540] font-semibold text-xs border border-[#E2DED6] transition-colors flex items-center justify-center gap-1.5 font-mono"
            >
              <FileText className="h-3.5 w-3.5 text-[#5B6A78]" />
              <span>Download Compliance Pack</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

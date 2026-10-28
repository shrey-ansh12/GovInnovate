"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Award, 
  ArrowRight,
  Edit3,
  Check,
  Layers,
  Upload,
  Lock,
  RefreshCw,
  FileText,
  Building2,
  CheckCircle2,
  AlertOctagon,
  Globe,
  ExternalLink,
  FileCheck2
} from "lucide-react";

function isValidExternalUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export const StartupProfile: React.FC = () => {
  const { 
    startups, 
    setActiveView, 
    setRole, 
    applyToChallengeAction, 
    updateStartupProfileAction, 
    uploadAndParseDpiitAction,
    pullDigiLockerAction,
    verifyStartupIntegrityAction
  } = useApp();

  const [selectedStartupId, setSelectedStartupId] = useState<string>(startups[0]?.id || "ST-AQUASENSE");
  const startup = startups.find(s => s.id === selectedStartupId) || startups[0];

  const [editMode, setEditMode] = useState(false);
  const [editTagline, setEditTagline] = useState(startup.tagline);
  const [editTrl, setEditTrl] = useState(startup.trlLevel || 8);
  const [editLocalContent, setEditLocalContent] = useState(startup.localContentPercentage || 78);
  const [editPatents, setEditPatents] = useState(startup.patents || 3);
  const [editLocation, setEditLocation] = useState(startup.location);

  const [isUploading, setIsUploading] = useState(false);
  const [isPullingDigiLocker, setIsPullingDigiLocker] = useState(false);
  const [digiLockerModalOpen, setDigiLockerModalOpen] = useState(false);
  const [digiLockerDpiitInput, setDigiLockerDpiitInput] = useState(startup.dpiitNumber);
  const [digiLockerConsent, setDigiLockerConsent] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = async () => {
    await updateStartupProfileAction(startup.id, {
      tagline: editTagline,
      trlLevel: editTrl,
      localContentPercentage: editLocalContent,
      patents: editPatents,
      location: editLocation
    });
    setEditMode(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a valid PDF document.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    await uploadAndParseDpiitAction(startup.id, file);
    setIsUploading(false);
  };

  const handleDigiLockerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!digiLockerConsent) {
      alert("Consent is required under DPDP Act to query DigiLocker repository.");
      return;
    }
    setIsPullingDigiLocker(true);
    await pullDigiLockerAction(startup.id, digiLockerDpiitInput);
    setIsPullingDigiLocker(false);
    setDigiLockerModalOpen(false);
  };

  const handleVerifyNow = async () => {
    await verifyStartupIntegrityAction(startup.id);
  };

  const isFlagged = startup.tamperStatus === "FLAGGED_FOR_REVIEW";

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans">
      {/* Startup Selector Strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded border border-[#E2DED6] shadow-2xs font-mono text-xs">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#0F3854]" />
          <span className="text-[#5B6A78]">Select Startup Profile to Inspect:</span>
          <select
            value={startup.id}
            onChange={(e) => {
              setSelectedStartupId(e.target.value);
              const found = startups.find(s => s.id === e.target.value);
              if (found) {
                setEditTagline(found.tagline);
                setEditTrl(found.trlLevel);
                setEditLocalContent(found.localContentPercentage);
                setEditPatents(found.patents);
                setEditLocation(found.location);
                setDigiLockerDpiitInput(found.dpiitNumber);
              }
            }}
            className="p-1.5 rounded border border-[#E2DED6] bg-[#FAF8F5] font-semibold text-[#0A2540] max-w-md truncate"
          >
            {startups.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} {s.isPublicDirectoryEntry ? "[Directory]" : ""} {s.tamperStatus === "FLAGGED_FOR_REVIEW" ? "⚠️ [FLAGGED]" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Cryptographic SHA-256 Quick Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Lock className={`h-3.5 w-3.5 ${isFlagged ? "text-red-600" : "text-[#147452]"}`} />
            <span className={isFlagged ? "text-red-700 font-bold" : "text-[#5B6A78]"}>
              SHA-256: {startup.canonicalHash ? startup.canonicalHash.slice(0, 12) + "..." : "Calculating..."}
            </span>
          </div>
          <button
            onClick={handleVerifyNow}
            className="px-2.5 py-1 rounded bg-[#F2EFEB] hover:bg-[#EDE9E1] text-[#0F3854] font-semibold flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Verify Integrity</span>
          </button>
        </div>
      </div>

      {/* VIGILANCE ALERT BANNER (If Flagged for Review) */}
      {isFlagged && (
        <div className="mb-6 p-4 rounded bg-red-100 border border-red-300 text-xs text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          <div className="flex items-start gap-2.5">
            <AlertOctagon className="h-5 w-5 shrink-0 text-red-700 mt-0.5" />
            <div>
              <strong className="text-red-950 font-bold text-sm">
                SECURITY ALERT: RECORD FLAGGED FOR VIGILANCE REVIEW
              </strong>
              <p className="mt-0.5 text-red-800">
                {startup.tamperAuditNote || "Unauthorized modification of key procurement metrics detected! Current state diverges from recorded genesis cryptographic hash."}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-red-800 text-white rounded font-bold uppercase shrink-0">
            Audit Required
          </span>
        </div>
      )}

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
                
                {/* HONEST STATUS BADGE */}
                {startup.isDpiitVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    DPIIT Verified: {startup.dpiitNumber}
                  </span>
                ) : startup.isPublicDirectoryEntry ? (
                  <span 
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200"
                    title={startup.dataNotes || "Published company claim; requires direct validation"}
                  >
                    <Globe className="h-3 w-3 text-sky-600" />
                    {startup.verificationStatusNote || startup.verificationStage || "Public Profile Located"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    DPIIT Verification Pending
                  </span>
                )}

                {startup.sector && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E2DED6] text-[#0F3854]">
                    Sector: {startup.sector.split(";")[0]?.trim()}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#5B6A78] mt-1">{startup.tagline}</p>

              {/* CLICKABLE SOURCE & WEBSITE LINKS */}
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

                {isValidExternalUrl(startup.website) && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-[#0F3854] hover:text-[#147452] hover:underline"
                    title={`Open ${startup.name} official website in a new tab`}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Website</span>
                    <ExternalLink className="h-2.5 w-2.5 text-[#5B6A78]" />
                  </a>
                )}

                {isValidExternalUrl(startup.evidenceSourceUrl) && (
                  <a
                    href={startup.evidenceSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-[#147452] hover:underline"
                    title={`Open evidence source in a new tab (${startup.sourceType || "Document"})`}
                  >
                    <FileCheck2 className="h-3.5 w-3.5" />
                    <span>Evidence Source</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
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

        {/* Edit Form (if toggled) */}
        {editMode && (
          <div className="py-4 border-b border-[#EDE9E1] grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[#5B6A78] mb-1 font-bold">Tagline:</label>
              <input
                type="text"
                value={editTagline}
                onChange={(e) => setEditTagline(e.target.value)}
                className="w-full p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-[#5B6A78] mb-1 font-bold">TRL Level (1-9):</label>
              <input
                type="number"
                min="1"
                max="9"
                value={editTrl}
                onChange={(e) => setEditTrl(parseInt(e.target.value) || 7)}
                className="w-full p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-[#5B6A78] mb-1 font-bold">Local Content %:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editLocalContent}
                onChange={(e) => setEditLocalContent(parseInt(e.target.value) || 50)}
                className="w-full p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-[#5B6A78] mb-1 font-bold">Granted Patents:</label>
              <input
                type="number"
                min="0"
                value={editPatents}
                onChange={(e) => setEditPatents(parseInt(e.target.value) || 0)}
                className="w-full p-2 rounded border border-[#E2DED6] bg-[#FAF8F5]"
              />
            </div>
          </div>
        )}

        {/* PUBLIC CAPABILITY & USE CASE DETAIL (For Imported Profiles) */}
        {(startup.publicCapabilitySummary || startup.potentialUseCase || startup.dataNotes) && (
          <div className="mt-5 p-4 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs space-y-2.5">
            <div className="flex items-center gap-2 font-mono font-bold text-[11px] text-[#0F3854] uppercase tracking-wider">
              <Globe className="h-4 w-4 text-[#147452]" />
              <span>Public Directory Capability Assessment & Documentation</span>
            </div>

            {startup.potentialUseCase && (
              <div>
                <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#0F3854] block">
                  Potential GovInnovate Use Case:
                </span>
                <p className="text-[#141F2B] font-medium mt-0.5 leading-relaxed">{startup.potentialUseCase}</p>
              </div>
            )}

            {startup.publicCapabilitySummary && (
              <div className="pt-2 border-t border-[#EDE9E1]">
                <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#5B6A78] block">
                  Public Capability Summary:
                </span>
                <p className="text-[#5B6A78] mt-0.5 leading-relaxed">{startup.publicCapabilitySummary}</p>
              </div>
            )}

            {startup.dataNotes && (
              <div className="pt-2 border-t border-[#EDE9E1] text-[11px] font-mono text-amber-900 bg-amber-50/50 p-2 rounded border border-amber-200/60">
                <strong>Reviewer Verification Note:</strong> {startup.dataNotes}
              </div>
            )}
          </div>
        )}

        {/* DPIIT Statutory Document Verification Section */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#0A2540]">
                Statutory Document Verification (DPIIT GFR 170 Recognition)
              </h3>
              <p className="text-xs text-[#5B6A78] mt-0.5">
                Upload official DPIIT recognition certificate PDF to verify company identity, or pull from DigiLocker repository.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setDigiLockerModalOpen(true)}
                className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2EFEB] text-[#0F3854] border border-[#E2DED6] font-semibold text-xs flex items-center gap-1.5 transition-colors font-mono"
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Pull from DigiLocker</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs font-mono"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{isUploading ? "Parsing..." : "Upload Certificate PDF"}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Uploaded Certificate Details Card */}
          {startup.documentRecord ? (
            <div className="mt-4 p-4 rounded bg-[#FAF8F5] border border-[#E2DED6] text-xs font-mono space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#EDE9E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#147452]" />
                  <span className="font-bold text-[#0A2540]">{startup.documentRecord.fileName}</span>
                  <span className="text-[10px] text-[#7E8B97]">({Math.round(startup.documentRecord.fileSizeBytes / 1024)} KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    startup.documentRecord.preliminaryStatus === "Passed"
                      ? "bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    Preliminary: {startup.documentRecord.preliminaryStatus}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    startup.documentRecord.officialStatus === "Officially Verified"
                      ? "bg-[#EBF6F0] text-[#147452] border border-[#C2E5D2]"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    Official: {startup.documentRecord.officialStatus}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <span className="text-[#7E8B97] block">Extracted DPIIT No:</span>
                  <strong className="text-[#0A2540]">{startup.documentRecord.extractedDpiitNumber || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[#7E8B97] block">Extracted Entity:</span>
                  <strong className="text-[#0A2540]">{startup.documentRecord.extractedEntityName || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[#7E8B97] block">Name Match Score:</span>
                  <strong className={startup.documentRecord.entityMismatchFlag ? "text-red-700 font-bold" : "text-[#147452]"}>
                    {startup.documentRecord.nameSimilarityScore}% {startup.documentRecord.entityMismatchFlag ? "(MISMATCH)" : ""}
                  </strong>
                </div>
                <div>
                  <span className="text-[#7E8B97] block">SHA-256 Checksum:</span>
                  <span className="text-[#5B6A78] truncate block" title={startup.documentRecord.fileHash}>
                    {startup.documentRecord.fileHash.slice(0, 16)}...
                  </span>
                </div>
              </div>

              {startup.documentRecord.rawTextPreview && (
                <div className="p-2 bg-white rounded border border-[#E2DED6] text-[10px] text-[#5B6A78]">
                  <span className="font-bold text-[#0A2540] block mb-0.5">Raw Text Extract Preview:</span>
                  <p className="line-clamp-2">{startup.documentRecord.rawTextPreview}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 p-6 rounded border-2 border-dashed border-[#E2DED6] bg-[#FAF8F5] text-center text-xs font-mono text-[#5B6A78]">
              <Upload className="h-6 w-6 text-[#7E8B97] mx-auto mb-2" />
              <p>No formal DPIIT certificate attached yet. Upload a certificate PDF or pull from DigiLocker Gateway to establish statutory GFR eligibility.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Products & Tech Rationale */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded border border-[#E2DED6] p-6 shadow-2xs">
            <h2 className="text-base font-bold text-[#0A2540] mb-4">
              Registered Products & Solution Prototypes
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
              <h4 className="text-xs font-mono font-bold uppercase text-[#5B6A78] mb-2">Core Tech Stack & Match Tags</h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {startup.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#FAF8F5] text-[#5B6A78] border border-[#E2DED6]">
                    {tech}
                  </span>
                ))}
                {startup.matchTags && startup.matchTags.filter(t => !startup.techStack.includes(t)).map((tag, idx) => (
                  <span key={`prof-tag-${idx}`} className="px-2.5 py-1 rounded bg-sky-50 text-sky-800 border border-sky-200">
                    {tag}
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
              {startup.matchReasons[0] || "Meets core departmental problem specifications."}
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1D4E72]">
                <span className="text-slate-300">Technical Readiness</span>
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

      {/* DIGILOCKER GATEWAY SANDBOX MODAL */}
      {digiLockerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#E2DED6] max-w-lg w-full p-6 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E1]">
              <div className="flex items-center gap-2 text-[#0F3854] font-bold text-sm">
                <Building2 className="h-5 w-5" />
                <span>DigiLocker Pull Gateway • Sandbox Mode</span>
              </div>
              <button 
                onClick={() => setDigiLockerModalOpen(false)}
                className="text-[#7E8B97] hover:text-[#141F2B]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDigiLockerSubmit} className="py-4 space-y-4">
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E2DED6] text-[11px] text-[#5B6A78]">
                <strong>Architecture Notice:</strong> Simulating official Pull URI connection to DigiLocker Issuer repository (<code className="text-[#0F3854]">in.gov.dpiit.startuprecognition</code>).
              </div>

              <div>
                <label className="block text-[#0A2540] font-bold mb-1">
                  DPIIT Recognition Certificate Number:
                </label>
                <input
                  type="text"
                  value={digiLockerDpiitInput}
                  onChange={(e) => setDigiLockerDpiitInput(e.target.value)}
                  placeholder="e.g. DPIIT-REC-89241-DL"
                  required
                  className="w-full p-2.5 rounded border border-[#E2DED6] bg-white text-xs"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={digiLockerConsent}
                  onChange={(e) => setDigiLockerConsent(e.target.checked)}
                  className="mt-0.5 rounded accent-[#0F3854]"
                />
                <label htmlFor="consentCheckbox" className="text-[11px] text-[#5B6A78] leading-tight">
                  I grant consent under the Digital Personal Data Protection (DPDP) Act for GovInnovate to retrieve and verify my organization&apos;s DPIIT certificate from DigiLocker.
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDE9E1]">
                <button
                  type="button"
                  onClick={() => setDigiLockerModalOpen(false)}
                  className="px-4 py-2 rounded bg-white border border-[#E2DED6] text-[#5B6A78]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPullingDigiLocker}
                  className="px-4 py-2 rounded bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold flex items-center gap-1.5"
                >
                  {isPullingDigiLocker ? "Querying Gateway..." : "Pull & Cryptographically Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

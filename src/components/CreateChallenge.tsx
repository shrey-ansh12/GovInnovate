"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Building2,
  SlidersHorizontal,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Check
} from "lucide-react";

interface ChallengeTemplate {
  id: string;
  name: string;
  tagline: string;
  ministry: string;
  department: string;
  category: string;
  budget: string;
  pilotDuration: string;
  targetLocations: number;
  scaleLocations: number;
  title: string;
  rawProblem: string;
  summary: string;
  problemStatement: string;
  expectedOutcomes: string[];
  technicalThresholds: string[];
}

const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  {
    id: "jal-shakti-water",
    name: "Jal Shakti: Water Quality IoT & Contamination Warning",
    tagline: "Automated edge sensing for heavy metals and biochemical contamination",
    ministry: "Ministry of Jal Shakti",
    department: "National Water Mission & Urban Infrastructure Board",
    category: "Water Tech / IoT & Clean Environment",
    budget: "₹28,50,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    targetLocations: 5,
    scaleLocations: 50,
    title: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
    rawProblem: "Our municipal water distribution lines experience sudden industrial pollutant dumps and heavy metal contamination. Lab testing takes 24-48 hours which is too slow. We need an automated IoT sensing solution to detect contamination spikes within 5 minutes across 5 pilot sites, with zero false positives, before expanding city-wide.",
    summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with edge telemetry.",
    problemStatement: "Traditional manual water sampling is reactive, intermittent, and vulnerable to undetected industrial contamination spills. Municipal bodies need continuous edge sensor telemetry to trigger proactive public health alerts within 5 minutes of water anomalies across urban supply lines.",
    expectedOutcomes: [
      "Sub-5 minute latency for heavy metal / chemical surge detection",
      "98.0%+ sensor uptime in harsh submerged conditions",
      "Under 2.0% false-positive rate on organic particulate fluctuations",
      "Standard integration with municipal command dashboards via REST/MQTT APIs"
    ],
    technicalThresholds: [
      "Minimum TRL 7 (Operational environment demonstration)",
      "Domestic Local Content ≥ 50% (Make in India Class-1 mandate)",
      "Reagent-free or low-maintenance probe design",
      "DPIIT startup recognition with relaxation subject to tender conditions"
    ]
  },
  {
    id: "morth-traffic-corridor",
    name: "MoRTH: AI Green Corridor & Emergency Traffic Control",
    tagline: "Computer vision edge-AI to clear automated green lights for emergency ambulances",
    ministry: "Ministry of Road Transport and Highways",
    department: "Intelligent Transportation & Highway Safety Command",
    category: "Smart Mobility / Computer Vision & Edge AI",
    budget: "₹35,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    targetLocations: 8,
    scaleLocations: 80,
    title: "Edge-AI Adaptive Traffic Signal & Emergency Vehicle Green-Corridor Network",
    rawProblem: "Urban vehicular gridlocks delay critical emergency medical ambulances and public transit. Current static timer traffic signals cause 40+ minute delays during peak hours. We require edge-AI camera vision to dynamically adjust signal green times and clear zero-latency green corridors for emergency responders.",
    summary: "Edge-AI computer vision for real-time vehicular density tracking and automated green corridors for emergency medical services.",
    problemStatement: "Static timer traffic signals fail to adapt to live road congestion surges, causing massive delays to emergency response vehicles. Urban command centers require edge vision nodes to pre-emptively synchronize traffic light cycles along active ambulance routes.",
    expectedOutcomes: [
      "40% reduction in emergency ambulance transit delay across pilot corridors",
      "Sub-200ms edge camera compute latency for vehicular density classification",
      "Zero disruption to pedestrian crossings during non-emergency traffic cycles",
      "Bi-directional MQTT integration with Integrated Traffic Command System (ITCS)"
    ],
    technicalThresholds: [
      "Minimum TRL 7 (Demonstrated on operational urban roadways)",
      "Make in India Domestic Content ≥ 55% (Class-1 local vendor)",
      "Operability under low-light, dense fog, and torrential rain conditions",
      "DPIIT startup recognition eligible under GFR 170 relaxation"
    ]
  },
  {
    id: "agri-drone-crop-monitoring",
    name: "AgriTech: Drone Multispectral Pest & Crop Disease Telemetry",
    tagline: "Autonomous drone imagery and micro-soil sensors for 7-day advance pest warning",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    department: "National Agritech Mission & Crop Surveillance Directorate",
    category: "AgriTech / Autonomous Drones & Multispectral AI",
    budget: "₹24,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "60 Days",
    targetLocations: 6,
    scaleLocations: 60,
    title: "Autonomous Drone Multispectral Sensing for Early Crop Disease Detection",
    rawProblem: "Fungal blight and pest outbreaks spread silently across smallholder farming clusters before physical detection, leading to 25-40% yield loss. We require low-cost autonomous drone multispectral imagery and micro-soil sensors to detect crop stress 7 days before visual onset.",
    summary: "Hyper-spectral and multispectral drone survey paired with computer vision AI to diagnose crop anomalies and notify farmers.",
    problemStatement: "Physical scouting of rural farmlands is labor-intensive and detects pest infestation only after severe leaf damage. Automated aerial multispectral analytics can isolate chlorophyll stress patterns a full week earlier, saving vulnerable yields.",
    expectedOutcomes: [
      "7-day advance detection of localized bacterial and fungal leaf blights",
      "Survey coverage of 500+ acres per single battery drone cycle",
      "Automated localized vernacular advisory SMS sent directly to registered farmers",
      "Geo-referenced NDVI and moisture maps delivered within 4 hours of flight"
    ],
    technicalThresholds: [
      "DGCA Type-Certified or compliant autonomous drone platform",
      "Indigenous flight telemetry and edge imaging payload",
      "Minimum TRL 7 with agricultural field trials in Indian agro-climatic zones",
      "DPIIT startup exemption for prior experience under GFR Rule 170"
    ]
  },
  {
    id: "mohua-landfill-toxic-gas",
    name: "MoHUA: Smart Landfill Leachate & Toxic Gas Leakage Sensing",
    tagline: "Solar-powered wireless sensor mesh for continuous toxic VOC & aquifer monitoring",
    ministry: "Ministry of Housing and Urban Affairs",
    department: "Swachh Bharat Urban Innovation & Environmental Safety Desk",
    category: "CleanTech / Waste Management & Subsurface IoT",
    budget: "₹22,50,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    targetLocations: 10,
    scaleLocations: 75,
    title: "Subsurface IoT Sensor Array for Landfill Leachate & Toxic VOC Detection",
    rawProblem: "Unregulated municipal landfills emit hazardous combustible methane gases and underground leachate runoffs contaminating regional aquifers. We need non-invasive solar-powered sensor arrays to measure subsurface VOCs, hydrogen sulfide, and groundwater chemical seepage.",
    summary: "Continuous 24/7 wireless sensor telemetry to detect hazardous landfill emissions and subterranean leachate migration into municipal aquifers.",
    problemStatement: "Landfill fires and groundwater contamination from unmonitored dump sites pose urgent ecological and public health threats. Municipal bodies lack autonomous sub-surface telemetry to monitor volatile gases and heavy chemical percolation.",
    expectedOutcomes: [
      "Sub-3 minute autonomous alert for explosive methane and VOC spikes",
      "Continuous pH, TDS, and electrical conductivity monitoring of leachate runoff",
      "Autonomous solar-harvesting power design requiring zero battery replacement for 24 months",
      "Secure cryptographic transmission of environmental data to Central Pollution Control Board (CPCB)"
    ],
    technicalThresholds: [
      "IP68 corrosion-resistant hermetic probe design",
      "Domestic content ≥ 50% under Public Procurement (Preference to Make in India)",
      "Minimum TRL 7 with operational field deployment",
      "DPIIT recognized entity eligible for GFR tender relaxations"
    ]
  },
  {
    id: "mohfw-portable-ai-xray",
    name: "Health: AI Ultra-Portable X-Ray for Rural Pulmonary Triage",
    tagline: "Battery-operated lightweight chest X-ray reader with offline on-device AI screening",
    ministry: "Ministry of Health and Family Welfare",
    department: "National Health Systems Resource Center & TB Elimination Cell",
    category: "MedTech / Edge AI & Rural Health Diagnostics",
    budget: "₹32,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "120 Days",
    targetLocations: 8,
    scaleLocations: 90,
    title: "Ultra-Portable AI-Assisted Chest Radiography for Rural Pulmonary Diagnostics",
    rawProblem: "Remote rural primary health centers lack qualified radiologists to read chest radiographs, leading to severe diagnostic delays in pulmonary tuberculosis and pneumonia. We require a battery-operated ultra-portable X-ray reader with offline on-device AI inference.",
    summary: "Handheld or backpack-portable X-ray diagnostics powered by on-device deep learning for rapid pulmonary disease triaging in remote primary health centers.",
    problemStatement: "Over 65% of rural healthcare centers face an absence of on-site diagnostic radiologists. Sputum tests take days, and patients frequently drop out of clinical tracking. Ultra-portable edge-AI imaging provides immediate confirmation within 30 seconds.",
    expectedOutcomes: [
      "Under 30-second on-device AI triage readout for pulmonary tuberculosis and pneumonia",
      "94%+ diagnostic sensitivity compared to NABL radiology gold standard",
      "Full offline operational capability in zero-cellular network environments",
      "Standard FHIR / ABDM compliant health record sync when connectivity resumes"
    ],
    technicalThresholds: [
      "CDSCO compliance or ISO 13485 quality certification",
      "Edge neural model executing fully on portable compute hardware without cloud dependency",
      "Minimum TRL 8 with clinical trial validation in Indian hospital cohorts",
      "DPIIT recognized startup with turnover exemption under GFR Rule 170"
    ]
  }
];

export const CreateChallenge: React.FC = () => {
  const { createChallengeAction, role, setRole, appMode } = useApp();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("jal-shakti-water");
  const [title, setTitle] = useState(CHALLENGE_TEMPLATES[0].title);
  const [rawProblem, setRawProblem] = useState(CHALLENGE_TEMPLATES[0].rawProblem);
  const [department, setDepartment] = useState(CHALLENGE_TEMPLATES[0].department);
  const [ministry, setMinistry] = useState(CHALLENGE_TEMPLATES[0].ministry);
  const [category, setCategory] = useState(CHALLENGE_TEMPLATES[0].category);
  const [budget, setBudget] = useState(CHALLENGE_TEMPLATES[0].budget);
  const [pilotDuration, setPilotDuration] = useState(CHALLENGE_TEMPLATES[0].pilotDuration);
  const [targetLocations, setTargetLocations] = useState(CHALLENGE_TEMPLATES[0].targetLocations);
  const [scaleLocations, setScaleLocations] = useState(CHALLENGE_TEMPLATES[0].scaleLocations);

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [structuredDecomposition, setStructuredDecomposition] = useState<{
    structuredTitle: string;
    summary: string;
    problemStatement: string;
    expectedOutcomes: string[];
    technicalThresholds: string[];
  } | null>({
    structuredTitle: CHALLENGE_TEMPLATES[0].title,
    summary: CHALLENGE_TEMPLATES[0].summary,
    problemStatement: CHALLENGE_TEMPLATES[0].problemStatement,
    expectedOutcomes: CHALLENGE_TEMPLATES[0].expectedOutcomes,
    technicalThresholds: CHALLENGE_TEMPLATES[0].technicalThresholds
  });

  const handleSelectTemplate = (templateId: string) => {
    const tmpl = CHALLENGE_TEMPLATES.find(t => t.id === templateId);
    if (!tmpl) return;

    setSelectedTemplateId(tmpl.id);
    setTitle(tmpl.title);
    setRawProblem(tmpl.rawProblem);
    setDepartment(tmpl.department);
    setMinistry(tmpl.ministry);
    setCategory(tmpl.category);
    setBudget(tmpl.budget);
    setPilotDuration(tmpl.pilotDuration);
    setTargetLocations(tmpl.targetLocations);
    setScaleLocations(tmpl.scaleLocations);
    setStructuredDecomposition({
      structuredTitle: tmpl.title,
      summary: tmpl.summary,
      problemStatement: tmpl.problemStatement,
      expectedOutcomes: tmpl.expectedOutcomes,
      technicalThresholds: tmpl.technicalThresholds
    });
  };

  const handlePublishTemplate = async (templateToPublish?: ChallengeTemplate) => {
    const tmpl = templateToPublish || CHALLENGE_TEMPLATES.find(t => t.id === selectedTemplateId) || CHALLENGE_TEMPLATES[0];
    setIsSubmitting(true);
    try {
      await createChallengeAction({
        title: tmpl.title,
        department: tmpl.department,
        ministry: tmpl.ministry,
        category: tmpl.category,
        budget: tmpl.budget,
        pilotDuration: tmpl.pilotDuration,
        summary: tmpl.summary,
        problemStatement: tmpl.problemStatement,
        expectedOutcomes: tmpl.expectedOutcomes,
        technicalThresholds: tmpl.technicalThresholds,
        targetLocations: tmpl.targetLocations,
        scaleLocations: tmpl.scaleLocations,
        matchedCount: 4,
        applicationsCount: 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecompose = async () => {
    setIsSynthesizing(true);
    try {
      const res = await fetch("/api/ai/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawProblem,
          department,
          ministry
        })
      });

      if (res.ok) {
        const data = await res.json();
        const synthesizedTitle = data.structuredTitle || "Automated Public Challenge Solution";
        setTitle(synthesizedTitle);
        setStructuredDecomposition({
          structuredTitle: synthesizedTitle,
          summary: data.summary || "",
          problemStatement: data.problemStatement || rawProblem,
          expectedOutcomes: data.expectedOutcomes || [],
          technicalThresholds: data.technicalThresholds || []
        });
      }
    } catch (err) {
      console.warn("AI decomposition fetch failed:", err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const finalTitle = title.trim() || structuredDecomposition?.structuredTitle || "Public Innovation Procurement Challenge";
      await createChallengeAction({
        title: finalTitle,
        department,
        ministry,
        category,
        budget,
        pilotDuration,
        summary: structuredDecomposition?.summary || rawProblem.slice(0, 160),
        problemStatement: structuredDecomposition?.problemStatement || rawProblem,
        expectedOutcomes: structuredDecomposition?.expectedOutcomes || [],
        technicalThresholds: structuredDecomposition?.technicalThresholds || [],
        targetLocations,
        scaleLocations,
        matchedCount: 4,
        applicationsCount: 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-8 py-10 font-sans space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#0F3854] uppercase tracking-wider mb-2">
          <Building2 className="h-4 w-4" />
          Government Procurement Desk • GFR 2017 Sandbox Framework
          <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
            {appMode === "real" ? "Real Database Persistence" : "Sandbox Demo Mode"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
          Create & Publish Procurement Challenge
        </h1>
        <p className="text-sm text-[#5B6A78] mt-1 max-w-3xl leading-relaxed">
          Specify your department&apos;s operational bottleneck or choose from curated government challenge templates below. Published challenges automatically reflect in the live database and open directly for startup proposal bids.
        </p>
      </div>

      {/* Role Notice */}
      {role !== "government" && (
        <div className="p-4 rounded-xl bg-[#FEF7EA] border border-[#F6E1B9] text-xs text-[#8A5B0B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              You are currently viewing in <strong>{role}</strong> mode. Publishing a challenge requires the <strong>government</strong> role.
            </span>
          </div>
          <button
            onClick={() => setRole("government")}
            className="font-bold underline ml-2 hover:text-[#5c3c05]"
          >
            Switch to Government
          </button>
        </div>
      )}

      {/* ⚡ PRE-CONFIGURED CHALLENGE TEMPLATE SELECTOR (NEW SELECT OPTION) */}
      <div className="bg-gradient-to-r from-[#0F3854] via-[#154668] to-[#0A2540] text-white rounded-xl p-6 border border-[#275d84] shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Pre-Configured Government Challenge Selector
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Select Curated Public Challenge Template
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Pick a verified government challenge specification. Select to preview & customize, or click <strong>&quot;Instant Publish&quot;</strong> to directly push to database and open on the Startup Dashboard.
            </p>
          </div>

          {/* Dropdown & 1-Click Publish Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <select
              value={selectedTemplateId}
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="text-xs font-semibold px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {CHALLENGE_TEMPLATES.map(t => (
                <option key={t.id} value={t.id} className="text-[#0A2540] bg-white">
                  {t.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handlePublishTemplate()}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0 font-mono disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 text-amber-200 fill-amber-200" />
              )}
              <span>Instant Publish →</span>
            </button>
          </div>
        </div>

        {/* 5-Card Interactive Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-3 border-t border-white/15">
          {CHALLENGE_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`text-left p-3.5 rounded-lg border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-white text-[#0A2540] border-amber-400 shadow-md ring-2 ring-amber-400" 
                    : "bg-white/5 hover:bg-white/10 text-white border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-mono font-bold uppercase truncate ${isSelected ? "text-[#0F3854]" : "text-amber-300"}`}>
                      {tmpl.ministry.replace("Ministry of ", "")}
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 font-bold" />}
                  </div>
                  <p className={`text-xs font-bold line-clamp-2 leading-snug ${isSelected ? "text-[#0A2540]" : "text-slate-100"}`}>
                    {tmpl.title}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-dashed border-slate-300/30 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? "text-emerald-700 font-bold" : "text-emerald-300 font-semibold"}>
                    {tmpl.budget.split(' ')[0]}
                  </span>
                  <span className={isSelected ? "text-slate-600 font-medium" : "text-slate-300"}>
                    {tmpl.pilotDuration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2DED6] p-6 space-y-6 shadow-2xs">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2">
              Challenge Title / Problem Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI-Based Predictive Water Contamination Warning System"
              className="w-full text-xs font-bold rounded-lg border border-[#E2DED6] px-3 py-2.5 bg-[#FAF8F5] focus:bg-white text-[#0A2540]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78] mb-2">
              Procuring Department & Ministry
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Procuring Department"
                className="text-xs rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
              <input
                type="text"
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                placeholder="Parent Ministry"
                className="text-xs rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B6A78]">
                Operational Problem Statement
              </label>
              <button
                type="button"
                onClick={handleDecompose}
                disabled={isSynthesizing}
                className="text-[11px] font-mono text-[#0F3854] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <SlidersHorizontal className="h-3 w-3" />
                <span>{isSynthesizing ? "Synthesizing..." : "Re-Run Structured Decomposition"}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={rawProblem}
              onChange={(e) => setRawProblem(e.target.value)}
              className="w-full text-xs rounded-lg border border-[#E2DED6] p-3 leading-relaxed bg-[#FAF8F5] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Pilot Phase Allocation
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Pilot Duration
              </label>
              <input
                type="text"
                value={pilotDuration}
                onChange={(e) => setPilotDuration(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#EDE9E1] font-mono text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Initial Pilot Sites
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetLocations}
                  onChange={(e) => setTargetLocations(Number(e.target.value))}
                  className="w-20 text-xs font-bold rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
                />
                <span className="text-[11px] text-[#5B6A78]">intake points</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B6A78] mb-1">
                Proposed Scale-Up Target
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={scaleLocations}
                  onChange={(e) => setScaleLocations(Number(e.target.value))}
                  className="w-20 text-xs font-bold rounded-lg border border-[#E2DED6] px-3 py-2 bg-[#FAF8F5] focus:bg-white"
                />
                <span className="text-[11px] text-[#5B6A78]">zones (conditional)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-lg bg-[#0F3854] hover:bg-[#1D4E72] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>Publish Challenge & Save to Database</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Card: Decomposition Output Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0F3854] text-white rounded-xl p-6 border border-[#1D4E72] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D4E72]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-100">
                  Structured Specification Preview
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-emerald-300">
                Rule-Ready
              </span>
            </div>

            {structuredDecomposition && (
              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Formal Challenge Title</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {title || structuredDecomposition.structuredTitle}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Objective Summary</p>
                  <p className="text-slate-300 leading-relaxed mt-0.5">
                    {structuredDecomposition.summary}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Quantifiable Target Outcomes
                  </p>
                  <ul className="space-y-1.5">
                    {structuredDecomposition.expectedOutcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#1D4E72]">
                  <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Rule-Based Eligibility Thresholds
                  </p>
                  <ul className="space-y-1 text-slate-300 text-[11px] font-mono">
                    {structuredDecomposition.technicalThresholds.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Statutory Disclaimer Card */}
          <div className="bg-[#FEF7EA] rounded-xl p-4 border border-[#F6E1B9] text-[#8A5B0B] text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <ShieldAlert className="h-4 w-4 text-[#8A5B0B]" />
              Statutory Procurement Notice
            </div>
            <p className="leading-relaxed">
              Procurement decisions are subject to applicable GFR, GeM rules, departmental policies, and competent-authority approval. Startup relaxations for experience and turnover apply subject to tender conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

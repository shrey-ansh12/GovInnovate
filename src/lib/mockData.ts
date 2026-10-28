import { Challenge, Startup, Application, Pilot, AuditLog, NotificationItem } from "@/types";
import { importedPublicStartups } from "./importedStartupData";

export const sampleChallenges: Challenge[] = [
  {
    id: "CH-2026-WQ01",
    title: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
    department: "National Water Mission & Urban Infrastructure Board",
    ministry: "Ministry of Jal Shakti",
    category: "Water Tech / IoT & Clean Environment",
    budget: "₹28,50,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    deadline: "2026-11-15",
    status: "Draft",
    summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with edge telemetry.",
    problemStatement: "Traditional manual water sampling is reactive, intermittent, and vulnerable to undetected industrial contamination spills. Municipal bodies need continuous edge sensor telemetry to trigger proactive public health alerts within 5 minutes of water anomalies across urban supply lines.",
    expectedOutcomes: [
      "Sub-5 minute latency for heavy metal / chemical surge detection",
      "98.0%+ sensor telemetry uptime in harsh submerged conditions",
      "Under 2.0% false-positive rate on organic particulate fluctuations",
      "Integration with state municipal command dashboards via standard REST/MQTT APIs"
    ],
    technicalThresholds: [
      "Minimum TRL 7 (Demonstrated in operational environment)",
      "Domestic Local Content ≥ 50% (Class 1 / Class 2 Local Supplier)",
      "Reagent-free or low-maintenance probe design",
      "Interoperable open data format for municipal telemetry"
    ],
    targetLocations: 5,
    scaleLocations: 50,
    matchedCount: 4,
    applicationsCount: 2,
  },
  {
    id: "CH-2026-TR02",
    title: "Edge-AI Adaptive Traffic Signal & Emergency Vehicle Green-Corridor Network",
    department: "Intelligent Transportation & Highway Safety Command",
    ministry: "Ministry of Road Transport and Highways",
    category: "Smart Mobility / Computer Vision & Edge AI",
    budget: "₹35,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    deadline: "2026-11-30",
    status: "Open",
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
    ],
    targetLocations: 8,
    scaleLocations: 80,
    matchedCount: 2,
    applicationsCount: 1,
  },
  {
    id: "CH-2026-AG03",
    title: "Autonomous Drone Multispectral Sensing for Early Crop Disease Detection",
    department: "National Agritech Mission & Crop Surveillance Directorate",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "AgriTech / Autonomous Drones & Multispectral AI",
    budget: "₹24,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "60 Days",
    deadline: "2026-12-05",
    status: "Open",
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
    ],
    targetLocations: 6,
    scaleLocations: 60,
    matchedCount: 2,
    applicationsCount: 0,
  },
  {
    id: "CH-2026-LF04",
    title: "Subsurface IoT Sensor Array for Landfill Leachate & Toxic VOC Detection",
    department: "Swachh Bharat Urban Innovation & Environmental Safety Desk",
    ministry: "Ministry of Housing and Urban Affairs",
    category: "CleanTech / Waste Management & Subsurface IoT",
    budget: "₹22,50,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    deadline: "2026-11-20",
    status: "Open",
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
    ],
    targetLocations: 10,
    scaleLocations: 75,
    matchedCount: 2,
    applicationsCount: 1,
  },
  {
    id: "CH-2026-XR05",
    title: "Ultra-Portable AI-Assisted Chest Radiography for Rural Pulmonary Diagnostics",
    department: "National Health Systems Resource Center & TB Elimination Cell",
    ministry: "Ministry of Health and Family Welfare",
    category: "MedTech / Edge AI & Rural Health Diagnostics",
    budget: "₹32,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "120 Days",
    deadline: "2026-12-15",
    status: "Open",
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
    ],
    targetLocations: 8,
    scaleLocations: 90,
    matchedCount: 2,
    applicationsCount: 0,
  },
  {
    id: "CH-2026-DC06",
    title: "AI-Powered Multilingual Document Extraction & Automated Citizen Application Processing",
    department: "Department of Administrative Reforms and Public Grievances (DARPG)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    category: "AI & Intelligent Document Processing / Multilingual OCR",
    budget: "₹26,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    deadline: "2026-12-10",
    status: "Open",
    summary: "Automated extraction and structuring of form fields from handwritten and printed documents across English and Indian languages with 95%+ field accuracy.",
    problemStatement: "Manual verification of citizen applications and scanned welfare records causes operational delays across administrative centers. Departments require automated OCR and document structure intelligence to extract fields from noisy, multilingual scans into structured databases.",
    expectedOutcomes: [
      "Sub-10 second extraction per multi-page document into validated JSON schema",
      "High character recognition accuracy (>95%) across Hindi, Tamil, Telugu, and English scans",
      "Automatic categorization of supporting attachments (certificates, ID proofs, income statements)",
      "Seamless integration with state e-Office and CPGRAMS platforms via open REST APIs"
    ],
    technicalThresholds: [
      "Minimum TRL 7 (Demonstrated on real-world scanned government forms)",
      "Make in India Domestic Content ≥ 50% (Class-1 local vendor)",
      "On-premise or sovereign cloud deployment without sending data to unauthorized foreign servers",
      "DPIIT startup recognition with turnover relaxation under GFR Rule 170"
    ],
    targetLocations: 6,
    scaleLocations: 65,
    matchedCount: 10,
    applicationsCount: 2,
  },
  {
    id: "CH-2026-ID07",
    title: "Touchless Multi-Factor Biometric Verification & Fraud-Resistant Citizen Authentication Rail",
    department: "Digital India Corporation & National e-Governance Division",
    ministry: "Ministry of Electronics and Information Technology",
    category: "Identity Tech / Biometrics & Touchless Authentication",
    budget: "₹30,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "90 Days",
    deadline: "2026-12-20",
    status: "Open",
    summary: "Contactless camera-based biometric capture and spoof-resistant liveness verification enabling secure citizen authentication without external hardware.",
    problemStatement: "Physical contact biometric fingerprint readers present hygiene barriers, hardware procurement delays, and failure in rough-handed manual laborers. Government portals require touchless, camera-based multi-factor biometrics with real-time passive liveness detection.",
    expectedOutcomes: [
      "Under 3-second contactless biometric capture and matching using standard smartphone camera",
      "Sub-0.1% False Acceptance Rate (FAR) with robust Presentation Attack Detection (PAD)",
      "Zero external hardware dependency; works on entry-level Android devices",
      "End-to-end encrypted cryptographic payload compliant with Indian Digital Personal Data Protection (DPDP) Act"
    ],
    technicalThresholds: [
      "ISO/IEC 30107 Presentation Attack Detection (PAD) Level 1/2 compliance",
      "Minimum TRL 7 with operational field validation in low-connectivity rural settings",
      "Domestic IP ownership and Class-1 Make in India local value addition (≥50%)",
      "DPIIT recognized entity eligible for GFR procurement relaxations"
    ],
    targetLocations: 8,
    scaleLocations: 80,
    matchedCount: 3,
    applicationsCount: 1,
  },
  {
    id: "CH-2026-FR08",
    title: "Automated Document Forensic Tampering Detection & GSTIN Invoicing Reconciliation System",
    department: "Department of Revenue & Central Board of Indirect Taxes and Customs (CBIC)",
    ministry: "Ministry of Finance",
    category: "Civic Tech / Compliance & Anti-Fraud Document Forensics",
    budget: "₹34,00,000 (Pilot Phase Allocation • Scalable subject to approval)",
    pilotDuration: "120 Days",
    deadline: "2026-12-25",
    status: "Open",
    summary: "Forensic AI auditing of procurement invoices, bank statements, and tax receipts to identify pixel-level splicing, metadata alterations, and GSTIN mismatches.",
    problemStatement: "Public procurement units face risks of forged vendor credentials, falsified GST invoices, and manipulated turnover certificates. Manual document inspection cannot reliably catch digital font splicing or metadata wiping. An automated forensic screening engine is needed.",
    expectedOutcomes: [
      "Automated pixel-level splicing and font-weight anomaly detection on PDF/image uploads",
      "Real-time GSTIN and tax compliance verification against public GST APIs with automated audit trail",
      "Cryptographic SHA-256 evidence hashing for every verified document record",
      "Reduction of manual procurement compliance auditing time by 75%"
    ],
    technicalThresholds: [
      "Minimum TRL 7 with demonstrated detection of digital forgery techniques",
      "Make in India Domestic Content ≥ 50% (Class-1 local vendor)",
      "Tamper-proof audit logging with immutable timestamping",
      "DPIIT startup recognition with prior turnover relaxation under GFR Rule 170"
    ],
    targetLocations: 10,
    scaleLocations: 100,
    matchedCount: 2,
    applicationsCount: 1,
  }
];

export const initialChallenge: Challenge = sampleChallenges[0];


export const sampleStartups: Startup[] = [
  {
    id: "ST-AQUASENSE",
    name: "AquaSense AI Innovations Pvt Ltd",
    tagline: "Edge optical multispectral sensors for municipal potable & wastewater pipelines",
    dpiitNumber: "DPIIT-REC-89241-DL",
    isDpiitVerified: true,
    incorporationYear: 2021,
    location: "Bengaluru, Karnataka (Lab in IIT Madras Research Park)",
    founders: ["Dr. Aranya Sen (PhD, Microfluidics)", "Kavita Ranganathan (Ex-ISRO Sensor Eng)"],
    techStack: ["Edge AI Inference", "Optoelectronic Spectrometry", "LoRaWAN & 4G/5G", "PostgreSQL / TimescaleDB", "C++ / MicroPython"],
    sector: "Water Tech & IoT Sensing",
    products: [
      {
        title: "HydroGuard Probe 4X",
        description: "Submersible spectrophotometric multi-parameter sensor measuring BOD, COD, DO, Turbidity, pH and Nitrates continuously without chemical reagents.",
        stage: "TRL-8 (Commercial Deployment Ready)"
      },
      {
        title: "AquaPulse ML Suite",
        description: "Predictive leak & bacterial bloom anomaly detection engine with 99.4% precision.",
        stage: "Production Enterprise"
      }
    ],
    patents: 3,
    trlLevel: 8,
    localContentPercentage: 78,
    matchScore: 94,
    matchReasons: [
      "Exact Sector Match: Water Tech / IoT & Clean Environment",
      "TRL-8 Optical Probe: Exceeds minimum threshold (TRL 7)",
      "High Domestic Value Addition: 78% Local Content (Class 1 Supplier)",
      "DPIIT Verified: Eligible for turnover/experience relaxation under applicable tender rules"
    ],
    matchBreakdown: {
      sectorMatch: true,
      techMatch: true,
      eligibilityMatch: true,
      trlMatch: true,
      score: 94,
      details: [
        "Domain alignment: Municipal water treatment and pipeline sensing",
        "TRL Level 8 exceeds requirement (TRL 7 minimum)",
        "Local Content 78% satisfies Make in India Class-I criteria (≥50%)",
        "3 granted patents in optical spectrophotometry"
      ]
    },
    riskAnalysis: {
      level: "Low",
      factors: [
        "Sensors require periodic bi-monthly ultrasonic self-cleaning validation",
        "Hardware supply chain secured across 2 domestic manufacturing partners"
      ]
    },
    canonicalHash: "8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
    currentHash: "8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
    tamperStatus: "VERIFIED",
    verificationStage: "Officially Verified",
    documentRecord: {
      id: "DOC-DPIIT-89241",
      fileName: "DPIIT_Recognition_AquaSense_89241.pdf",
      fileSizeBytes: 1248010,
      fileHash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
      uploadedAt: "2026-10-02 11:30",
      extractedEntityName: "AquaSense AI Innovations Pvt Ltd",
      extractedDpiitNumber: "DPIIT-REC-89241-DL",
      extractedDate: "12/04/2021",
      extractedCategory: "Water Tech & IoT Sensing",
      nameSimilarityScore: 100,
      entityMismatchFlag: false,
      preliminaryStatus: "Passed",
      officialStatus: "Officially Verified",
      verifiedBy: "Dr. Rajeshwar Sharma, IAS (Director, Water Mission)",
      verifiedAt: "2026-10-02 14:15",
      source: "Direct Upload",
      rawTextPreview: "Ministry of Commerce and Industry - DPIIT Certificate of Recognition: AquaSense AI Innovations Pvt Ltd (DPIIT-REC-89241-DL)."
    }
  },
  {
    id: "ST-PUREFLOW",
    name: "PureFlow IoT Dynamics",
    tagline: "Solar-powered telemetry pods for canal and reservoir quality testing",
    dpiitNumber: "DPIIT-REC-54129-MH",
    isDpiitVerified: true,
    incorporationYear: 2022,
    location: "Pune, Maharashtra",
    founders: ["Vikram Patel", "Rohan Kulkarni"],
    techStack: ["Micro-controller telemetry", "Cellular IoT", "Python / FastAPI"],
    sector: "Water Tech / Surface Telemetry",
    products: [
      {
        title: "CanalGuard Float",
        description: "Floating sensor buoy for reservoirs with basic physical parameter measurement.",
        stage: "TRL-7 (Field Tested)"
      }
    ],
    patents: 1,
    trlLevel: 7,
    localContentPercentage: 65,
    matchScore: 78,
    matchReasons: [
      "Solar telemetry hardware suitable for surface reservoirs",
      "Meets Class 1 Local Content standard (65% Domestic Content)",
      "TRL 7 demonstrated in regional canal pilots"
    ],
    matchBreakdown: {
      sectorMatch: true,
      techMatch: false,
      eligibilityMatch: true,
      trlMatch: true,
      score: 78,
      details: [
        "Sector match: Surface water monitoring",
        "Lacks sub-surface heavy metal detection module (requires add-on spectrometer)",
        "TRL 7 meets threshold",
        "DPIIT recognized with 65% domestic manufacturing"
      ]
    },
    riskAnalysis: {
      level: "Medium",
      factors: ["Lacks automated heavy metal detection; requires supplemental spectrometer modules"]
    },
    canonicalHash: "5b7a1249cd0145892310beef9481230489123048120394812309481230948123",
    currentHash: "5b7a1249cd0145892310beef9481230489123048120394812309481230948123",
    tamperStatus: "VERIFIED",
    verificationStage: "Official Verification Pending",
    documentRecord: {
      id: "DOC-DPIIT-54129",
      fileName: "PureFlow_DPIIT_Certificate.pdf",
      fileSizeBytes: 981240,
      fileHash: "9912038471203948120394812039481203948120394812039481203948120394",
      uploadedAt: "2026-10-03 14:00",
      extractedEntityName: "PureFlow IoT Dynamics",
      extractedDpiitNumber: "DPIIT-REC-54129-MH",
      extractedDate: "20/08/2022",
      extractedCategory: "Surface Telemetry & IoT",
      nameSimilarityScore: 100,
      entityMismatchFlag: false,
      preliminaryStatus: "Passed",
      officialStatus: "Pending Review",
      source: "Direct Upload",
      rawTextPreview: "Startup India Certificate: PureFlow IoT Dynamics recognized under Startup India initiative."
    }
  },
  {
    id: "ST-NEURONET",
    name: "Neuronet Water Systems",
    tagline: "Satellite remote sensing + ground calibration water purity models",
    dpiitNumber: "DPIIT-REC-33918-TS",
    isDpiitVerified: true,
    incorporationYear: 2020,
    location: "Hyderabad, Telangana",
    founders: ["Dr. S. K. Murthy", "Anita Verma"],
    techStack: ["GIS / Remote Sensing", "Python", "Cloud GIS"],
    sector: "Earth Observation & GIS",
    products: [
      {
        title: "SatWater Eye",
        description: "Macro-level algal bloom tracking via Sentinel-2 and Landsat multispectral imagery.",
        stage: "TRL-7"
      }
    ],
    patents: 2,
    trlLevel: 7,
    localContentPercentage: 82,
    matchScore: 68,
    matchReasons: [
      "Macro catchment area coverage via satellite imagery",
      "Complementary for regional reservoir oversight"
    ],
    matchBreakdown: {
      sectorMatch: false,
      techMatch: false,
      eligibilityMatch: true,
      trlMatch: true,
      score: 68,
      details: [
        "Satellite macro-sensing does not satisfy closed-pipe municipal network requirement",
        "High algorithmic readiness (TRL 7) for open water bodies",
        "DPIIT recognized entity"
      ]
    },
    riskAnalysis: {
      level: "Medium",
      factors: ["Cannot monitor enclosed underground municipal pipelines in real time"]
    },
    canonicalHash: "33918a0b12c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    currentHash: "33918a0b12c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    tamperStatus: "VERIFIED",
    verificationStage: "Preliminary Checks Passed",
    documentRecord: {
      id: "DOC-DPIIT-33918",
      fileName: "Neuronet_DPIIT_Cert.pdf",
      fileSizeBytes: 1102450,
      fileHash: "3391847120394812039481203948120394812039481203948120394812039481",
      uploadedAt: "2026-10-04 10:15",
      extractedEntityName: "Neuronet Water Systems",
      extractedDpiitNumber: "DPIIT-REC-33918-TS",
      extractedDate: "15/01/2020",
      extractedCategory: "Earth Observation & GIS",
      nameSimilarityScore: 100,
      entityMismatchFlag: false,
      preliminaryStatus: "Passed",
      officialStatus: "Pending Review",
      source: "DigiLocker Sandbox",
      rawTextPreview: "DigiLocker Verified: in.gov.dpiit-DPREC-33918-TS."
    }
  },
  {
    id: "ST-BIOHYDRO",
    name: "BioHydro NanoTech",
    tagline: "Enzyme-based biosensors for toxic effluent recognition",
    dpiitNumber: "DPIIT-REC-11204-GJ",
    isDpiitVerified: false,
    incorporationYear: 2023,
    location: "Ahmedabad, Gujarat",
    founders: ["Nilesh Mehta"],
    techStack: ["Biosensors", "Microfluidics"],
    sector: "Biotechnology & Sensors",
    products: [
      {
        title: "NanoTox Strip Cartridge",
        description: "Disposable test cartridges for industrial runoffs.",
        stage: "TRL-5"
      }
    ],
    patents: 0,
    trlLevel: 5,
    localContentPercentage: 45,
    matchScore: 52,
    matchReasons: [
      "Specialized chemical specificity for toxic solvents",
      "TRL-5 below required threshold (TRL 7)",
      "DPIIT verification renewal in progress"
    ],
    matchBreakdown: {
      sectorMatch: true,
      techMatch: false,
      eligibilityMatch: false,
      trlMatch: false,
      score: 52,
      details: [
        "TRL-5 does not meet minimum TRL-7 requirement",
        "Local content 45% is below Class-I 50% requirement",
        "DPIIT verification renewal pending re-submission"
      ]
    },
    riskAnalysis: {
      level: "High",
      factors: ["Consumables cost is high and DPIIT verification is pending re-submission"]
    },
    canonicalHash: "11204a0b12c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    currentHash: "99887766554433221100aabbccddeeff99887766554433221100aabbccddeeff", // Tampered divergence
    tamperStatus: "FLAGGED_FOR_REVIEW",
    tamperAuditNote: "Discrepancy: Entity name on uploaded certificate ('BioSolv Chemical Solvents Pvt Ltd') does not match registered profile name ('BioHydro NanoTech'). Flagged for vigilance inspection.",
    verificationStage: "Preliminary Check Failed - Mismatch Flagged",
    documentRecord: {
      id: "DOC-BIO-11204",
      fileName: "BioHydro_Renewal_Mismatch.pdf",
      fileSizeBytes: 845120,
      fileHash: "1120447120394812039481203948120394812039481203948120394812039481",
      uploadedAt: "2026-10-05 09:20",
      extractedEntityName: "BioSolv Chemical Solvents Pvt Ltd",
      extractedDpiitNumber: "DPIIT-REC-11204-GJ",
      extractedDate: "18/09/2023",
      extractedCategory: "Industrial Solvents",
      nameSimilarityScore: 32,
      entityMismatchFlag: true,
      preliminaryStatus: "Mismatch Detected",
      officialStatus: "Rejected",
      verifiedBy: "Vigilance Audit Desk",
      verifiedAt: "2026-10-05 10:45",
      rejectionReason: "Entity name on DPIIT certificate ('BioSolv Chemical Solvents Pvt Ltd') does not match applicant company ('BioHydro NanoTech').",
      source: "Direct Upload",
      rawTextPreview: "Certificate issued to: BioSolv Chemical Solvents Pvt Ltd, GIDC Vatva, Ahmedabad."
    }
  },
  ...importedPublicStartups
];

export { importedPublicStartups };

export const sampleApplications: Application[] = [
  {
    id: "APP-WQ-091",
    challengeId: "CH-2026-WQ01",
    startupId: "ST-AQUASENSE",
    startupName: "AquaSense AI Innovations Pvt Ltd",
    appliedDate: "2026-10-02",
    status: "Shortlisted",
    dpiitVerified: true,
    financialTurnover: "₹1.42 Cr (Eligible for startup turnover relaxation subject to tender conditions)",
    solutionOverview: "Deploying 15 HydroGuard 4X edge probes across 5 municipal distribution intake reservoirs and treatment plants. Edge inference analyzes UV-Vis absorption fingerprints to flag 28 chemical contaminants and coliform surrogates in under 180 seconds.",
    proposedCost: "₹28,50,000 (All-inclusive 90-day pilot: 15 Probes, secure telemetry API, on-site support)",
    deploymentTime: "12 Calendar Days from Pilot Sanction",
    proposalSummary: "Turnkey optical sensing deployment requiring zero pipe modification or water shutdowns. Reagent-free ultrasonic self-cleaning minimizes maintenance visits. Real-time telemetry alerts dispatch directly to municipal command dashboard.",
    trlLevel: 8,
    localContentPercentage: 78,
    patentsCount: 3,
    evidenceLinks: [
      "https://example.com/docs/HydroGuard-Lab-Report-CPCB.pdf",
      "https://example.com/docs/IIT-Madras-Calibration-Certificate.pdf",
      "https://example.com/docs/DPIIT-Startup-Recognition-89241.pdf"
    ],
    tamperStatus: "VERIFIED",
    documentRecord: {
      id: "DOC-DPIIT-89241",
      fileName: "DPIIT_Recognition_AquaSense_89241.pdf",
      fileSizeBytes: 1248010,
      fileHash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
      uploadedAt: "2026-10-02 11:30",
      extractedEntityName: "AquaSense AI Innovations Pvt Ltd",
      extractedDpiitNumber: "DPIIT-REC-89241-DL",
      extractedDate: "12/04/2021",
      extractedCategory: "Water Tech & IoT Sensing",
      nameSimilarityScore: 100,
      entityMismatchFlag: false,
      preliminaryStatus: "Passed",
      officialStatus: "Officially Verified",
      verifiedBy: "Dr. Rajeshwar Sharma, IAS (Director, Water Mission)",
      verifiedAt: "2026-10-02 14:15",
      source: "Direct Upload"
    },
    evaluatorScore: {
      innovation: 19,
      feasibility: 19,
      impact: 20,
      scalability: 19,
      viability: 18,
      total: 95,
      justifications: {
        innovation: "Optical spectrophotometric analysis without chemical reagents is genuinely novel and eliminates recurring consumable logistics.",
        feasibility: "Demonstrated TRL-8 hardware with standard submersible clamp mountings; 12-day setup plan is realistic.",
        impact: "Detecting anomalies in < 3 minutes prevents broad municipal contamination exposure before public distribution.",
        scalability: "Standardized hardware architecture easily replicates across 50+ district intake hubs with centralized dashboarding.",
        viability: "78% local content and sensible ₹28.5L pilot budget align with public value-for-money principles."
      },
      evidenceReferences: "CPCB-benchmarked lab validation doc and IIT Madras calibration test report verified.",
      feedback: "Strongly recommended for 5-location sandbox pilot. Hardware reliability and zero-reagent approach are standout advantages.",
      evaluatorName: "Prof. Vinod Nair (Chairman, Expert Technical Committee)",
      evaluatedAt: "2026-10-06 14:20:11"
    }
  },
  {
    id: "APP-WQ-092",
    challengeId: "CH-2026-WQ01",
    startupId: "ST-PUREFLOW",
    startupName: "PureFlow IoT Dynamics",
    appliedDate: "2026-10-03",
    status: "Submitted",
    dpiitVerified: true,
    financialTurnover: "₹65 Lakhs",
    solutionOverview: "Solar surface buoys for municipal intake reservoirs with cellular 4G telemetry.",
    proposedCost: "₹22,00,000",
    deploymentTime: "20 Calendar Days",
    proposalSummary: "Buoy-based telemetry solution for open reservoirs with focus on turbidity, dissolved oxygen, and pH.",
    trlLevel: 7,
    localContentPercentage: 65,
    patentsCount: 1,
    evidenceLinks: [
      "https://example.com/docs/PureFlow-Buoy-Field-Test.pdf"
    ],
    tamperStatus: "VERIFIED",
    evaluatorScore: {
      innovation: 15,
      feasibility: 16,
      impact: 14,
      scalability: 15,
      viability: 16,
      total: 76,
      justifications: {
        innovation: "Standard solar buoy integration; reliable but not novel in sensor mechanism.",
        feasibility: "Well suited for open surface lakes, but less adapted for enclosed intake pipelines.",
        impact: "Monitors physical parameters well; missing automated heavy metal detection.",
        scalability: "Readily deployable across calm surface waters.",
        viability: "Cost effective, but requires third-party probes to match the full contamination scope."
      },
      evidenceReferences: "Field test report for reservoir buoy verified.",
      feedback: "Good candidate for open reservoir surface monitoring, but secondary to enclosed intake requirements.",
      evaluatorName: "Prof. Vinod Nair (Chairman, Expert Technical Committee)",
      evaluatedAt: "2026-10-06 15:10:00"
    }
  }
];

export const samplePilot: Pilot = {
  id: "PILOT-WQ-2026-01",
  challengeId: "CH-2026-WQ01",
  startupId: "ST-AQUASENSE",
  title: "90-Day Municipal Water Purity Edge-AI Pilot Deployment",
  currentDay: 90,
  totalDays: 90,
  locationsCount: 5,
  scaleLocationsCount: 50,
  phase: "Validation Completed",
  overallScore: 96.4,
  kpis: [
    {
      id: "kpi-1",
      metric: "Contamination Anomaly Alert Latency",
      target: "< 5.0 mins",
      current: "2.8 mins",
      unit: "minutes",
      status: "Ahead",
      trend: [7.2, 4.5, 3.8, 3.1, 2.8],
      lastUpdated: "2026-10-25"
    },
    {
      id: "kpi-2",
      metric: "Hardware Sensor Telemetry Uptime",
      target: "≥ 98.0%",
      current: "99.8%",
      unit: "%",
      status: "Ahead",
      trend: [97.5, 98.8, 99.4, 99.7, 99.8],
      lastUpdated: "2026-10-25"
    },
    {
      id: "kpi-3",
      metric: "False Positive Alert Suppression",
      target: "< 2.0%",
      current: "0.3%",
      unit: "%",
      status: "Ahead",
      trend: [2.1, 1.4, 0.9, 0.5, 0.3],
      lastUpdated: "2026-10-25"
    },
    {
      id: "kpi-4",
      metric: "Detection Accuracy vs Central Lab Tests",
      target: "≥ 95.0%",
      current: "98.2%",
      unit: "%",
      status: "Ahead",
      trend: [94.0, 95.8, 97.1, 97.9, 98.2],
      lastUpdated: "2026-10-25"
    },
    {
      id: "kpi-5",
      metric: "Municipal Operational Cost Reduction",
      target: "≥ 35.0%",
      current: "48.5%",
      unit: "%",
      status: "Ahead",
      trend: [30.0, 36.5, 41.0, 45.2, 48.5],
      lastUpdated: "2026-10-25"
    }
  ],
  milestones: [
    {
      id: "M-01",
      name: "Milestone 1: Hardware Delivery & 5 Intake Installations",
      dueDate: "Day 15",
      status: "Approved",
      payout: "₹8,55,000 (30%)",
      paymentRef: "Demo Payment Reference (Simulated) #PR-2026-0911",
      evidenceDescription: "15 HydroGuard probes installed and calibrated across 5 intake stations. Commissioning certificates co-signed by municipal site engineers.",
      evidenceUrl: "https://example.com/evidence/m1-commissioning-report.pdf",
      evidenceId: "EVID-WQ-2026-001",
      evidenceHash: "e8b2a1c49f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192",
      evidenceFilename: "WaterTestingLab_Benchmarking_Audit.pdf",
      evidenceVersion: 1,
      blockchainTxHash: "0x8f48a1c97a2139048a1209cb8d9e27140a831278456102394781290374619a02",
      blockchainStatus: "Registered On Blockchain",
      submittedAt: "2026-10-15 11:30",
      reviewedAt: "2026-10-16 14:00",
      reviewedBy: "Dr. Rajeshwar Sharma (Director, Water Mission)",
      reviewNotes: "All 5 physical installations inspected and verified. Telemetry active."
    },
    {
      id: "M-02",
      name: "Milestone 2: Command Center Telemetry & AI Model Calibration",
      dueDate: "Day 45",
      status: "Approved",
      payout: "₹11,40,000 (40%)",
      paymentRef: "Demo Payment Reference (Simulated) #PR-2026-0924",
      evidenceDescription: "API telemetry stream operational. Edge AI model trained on local municipal intake baseline with zero data drop over 30 continuous days.",
      evidenceUrl: "https://example.com/evidence/m2-telemetry-validation.pdf",
      evidenceId: "EVID-WQ-2026-002",
      evidenceHash: "4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
      evidenceFilename: "Site10_SensorTelemetry_TelemetryAudit.pdf",
      evidenceVersion: 1,
      blockchainTxHash: "0x4a82b901ecfa4219904728abcdf01289456729aebdf109283748291038472910",
      blockchainStatus: "Registered On Blockchain",
      submittedAt: "2026-11-14 10:20",
      reviewedAt: "2026-11-15 16:30",
      reviewedBy: "Dr. Rajeshwar Sharma (Director, Water Mission)",
      reviewNotes: "API throughput and data integrity verified against municipal SCADA stream."
    },
    {
      id: "M-03",
      name: "Milestone 3: 90-Day Independent Water Lab Benchmarking Audit",
      dueDate: "Day 90",
      status: "Approved",
      payout: "₹8,55,000 (30%)",
      paymentRef: "Demo Payment Reference (Simulated) #PR-2026-0938",
      evidenceDescription: "Full 90-day benchmarking report comparing 4,320 automated sensor readings with parallel NABL lab chemical titrations (98.2% correlation).",
      evidenceUrl: "https://example.com/evidence/m3-nabl-lab-audit.pdf",
      submittedAt: "2026-12-28 09:45",
      reviewedAt: "2026-12-29 11:15",
      reviewedBy: "Prof. Vinod Nair (Chairman, Expert Technical Committee)",
      reviewNotes: "Rigorous laboratory correlation confirmed. Uptime and latency KPIs met."
    }
  ],
  recommendationSummary: {
    verdict: "Demonstrated Technical Feasibility for Scale Consideration",
    score: 96.4,
    notes: "All 5 pilot site KPIs met or exceeded target benchmarks across 90 continuous days. Zero chemical reagent expenditure recorded."
  }
};

export const sampleAuditLogs: AuditLog[] = [
  {
    id: "LOG-101",
    timestamp: "2026-10-06 10:15:32",
    user: "Dr. Rajeshwar Sharma (Director, Water Mission)",
    role: "government",
    action: "CHALLENGE_CREATED",
    details: "Created procurement challenge CH-2026-WQ01 'AI-Based Water Quality Monitoring' under pilot sandbox framework.",
    badge: "Procurement",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    blockHash: "9f82d10374e29b87a64c120e3f89410385721a9c40217498cdae71928f48a1c9"
  },
  {
    id: "LOG-102",
    timestamp: "2026-10-06 10:16:04",
    user: "Rule-Based Matching Engine",
    role: "government",
    action: "STARTUP_MATCHING_COMPLETE",
    details: "Evaluated 4 startups against sector, TRL (≥7), and Local Content (≥50%) criteria. AquaSense AI identified with 94% rule score.",
    badge: "Matching",
    prevHash: "9f82d10374e29b87a64c120e3f89410385721a9c40217498cdae71928f48a1c9",
    blockHash: "4c120e3f89410385721a9c40217498cdae71928f48a1c99f82d10374e29b87a6"
  },
  {
    id: "LOG-103",
    timestamp: "2026-10-06 11:30:19",
    user: "Dr. Aranya Sen (CEO, AquaSense)",
    role: "startup",
    action: "PROPOSAL_SUBMITTED",
    details: "Submitted proposal APP-WQ-091 with 15 HydroGuard 4X probes & zero-reagent edge architecture.",
    badge: "Procurement",
    prevHash: "4c120e3f89410385721a9c40217498cdae71928f48a1c99f82d10374e29b87a6",
    blockHash: "721a9c40217498cdae71928f48a1c99f82d10374e29b87a64c120e3f89410385"
  },
  {
    id: "LOG-104",
    timestamp: "2026-10-06 11:45:00",
    user: "DPIIT Registry Lookup",
    role: "government",
    action: "ELIGIBILITY_VERIFIED",
    details: "Certificate DPIIT-REC-89241-DL confirmed active. Startup turnover/experience relaxation applicable per tender terms.",
    badge: "Security",
    prevHash: "721a9c40217498cdae71928f48a1c99f82d10374e29b87a64c120e3f89410385",
    blockHash: "ae71928f48a1c99f82d10374e29b87a64c120e3f89410385721a9c40217498cd"
  },
  {
    id: "LOG-105",
    timestamp: "2026-10-06 14:20:11",
    user: "Prof. Vinod Nair (Chairman, Technical Committee)",
    role: "evaluator",
    action: "EVALUATION_SCORED",
    details: "Awarded score 95/100 (Innovation: 19/20, Feasibility: 19/20, Impact: 20/20, Scalability: 19/20, Viability: 18/20) with written justifications.",
    badge: "Evaluation",
    prevHash: "ae71928f48a1c99f82d10374e29b87a64c120e3f89410385721a9c40217498cd",
    blockHash: "10385721a9c40217498cdae71928f48a1c99f82d10374e29b87a64c120e3f894"
  },
  {
    id: "LOG-106",
    timestamp: "2026-10-06 15:00:22",
    user: "Govt Procurement Committee",
    role: "government",
    action: "PILOT_AUTHORIZED",
    details: "Issued 90-day sandbox pilot sanction PILOT-WQ-2026-01 across 5 intake locations with ₹28.5L budget.",
    badge: "Procurement",
    prevHash: "10385721a9c40217498cdae71928f48a1c99f82d10374e29b87a64c120e3f894",
    blockHash: "e29b87a64c120e3f89410385721a9c40217498cdae71928f48a1c99f82d10374"
  },
  {
    id: "LOG-107",
    timestamp: "2026-10-06 17:45:00",
    user: "Finance Desk (Simulated)",
    role: "government",
    action: "DEMO_PAYMENT_LOGGED",
    details: "Milestone payment references generated for approved milestones (Simulated Demo Reference #PR-2026-0911, #PR-2026-0924).",
    badge: "Payment",
    prevHash: "e29b87a64c120e3f89410385721a9c40217498cdae71928f48a1c99f82d10374",
    blockHash: "8f48a1c99f82d10374e29b87a64c120e3f89410385721a9c40217498cdae7192"
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "Pilot Validation Completed",
    message: "AquaSense 90-day water quality pilot achieved 96.4/100 benchmark. Validation report ready for administrative review.",
    time: "10 mins ago",
    read: false,
    type: "success"
  },
  {
    id: "n-2",
    title: "DPIIT Verification Active",
    message: "AquaSense AI Innovations Pvt Ltd verified with active startup recognition.",
    time: "2 hours ago",
    read: false,
    type: "info"
  },
  {
    id: "n-3",
    title: "Milestone 3 Evidence Approved",
    message: "NABL lab correlation evidence approved by Technical Committee. Final decision recording unlocked.",
    time: "5 hours ago",
    read: true,
    type: "info"
  }
];

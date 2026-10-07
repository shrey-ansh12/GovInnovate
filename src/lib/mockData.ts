import { Challenge, Startup, Application, Pilot, AuditLog, NotificationItem } from "@/types";

export const initialChallenge: Challenge = {
  id: "CH-2026-WQ01",
  title: "AI-Based Water Quality Monitoring & Predictive Contamination Warning System",
  department: "National Water Mission & Urban Infrastructure Board",
  ministry: "Ministry of Jal Shakti",
  category: "Water Tech / IoT & Clean Environment",
  budget: "₹2.40 Crore (Scale Allocation: ₹18.5 Cr)",
  pilotDuration: "90 Days",
  deadline: "2026-11-15",
  status: "Draft", // will advance through: Draft -> Open -> Reviewing -> Shortlisted -> Pilot Active -> Validation Done -> Procurement Approved -> Scale-Up
  summary: "Automated real-time sensing of biochemical contamination, pH, turbidity, heavy metals, and bacterial outbreak alerts with AI telemetry.",
  problemStatement: "Traditional manual water sampling is reactive, intermittent, and vulnerable to undetected industrial contamination spills. Municipal bodies need continuous edge-AI sensor telemetry to trigger proactive public health alerts within 4 minutes of water anomalies across urban supply lines.",
  expectedOutcomes: [
    "Sub-5 minute latency for heavy metal / chemical surge detection",
    "99.2%+ sensor uptime in harsh submerged conditions",
    "Zero false-positive panic triggers on organic particulate fluctuations",
    "Seamless integration with state municipal command dashboards via open REST/MQTT APIs"
  ],
  targetLocations: 5,
  scaleLocations: 50,
  matchedCount: 12,
  applicationsCount: 4,
};

export const sampleStartups: Startup[] = [
  {
    id: "ST-AQUASENSE",
    name: "AquaSense AI Innovations Pvt Ltd",
    tagline: "Edge-AI multispectral optical sensors for municipal potable & wastewater pipelines",
    dpiitNumber: "DPIIT-REC-89241-DL",
    isDpiitVerified: true,
    incorporationYear: 2021,
    location: "Bengaluru, Karnataka (Lab in IIT Madras Research Park)",
    founders: ["Dr. Aranya Sen (PhD, Microfluidics)", "Kavita Ranganathan (Ex-ISRO Sensor Eng)"],
    techStack: ["Edge AI Inference", "Optoelectronic Spectrometry", "LoRaWAN & 4G/5G", "PostgreSQL / TimescaleDB", "C++ / MicroPython"],
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
    matchScore: 94,
    matchReasons: [
      "94% semantic match with Jal Shakti challenge requirements",
      "Valid DPIIT startup certificate & GFR Rule 149/170 tender exemption eligible",
      "Demonstrated TRL-8 optical probe tech without requiring costly reagent refills",
      "Proven pilot experience with Karnataka Urban Water Supply Board (12 months uninterrupted operation)"
    ],
    riskAnalysis: {
      level: "Low",
      factors: [
        "Sensors require periodic bi-monthly ultrasonic self-cleaning validation",
        "Hardware supply chain secured across 2 domestic semiconductor fabrication partners"
      ]
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
    techStack: ["Micro-controller telemetry", "Cellular IoT", "Python/FastAPI"],
    products: [
      {
        title: "CanalGuard Float",
        description: "Floating sensor buoy for reservoirs with basic physical parameter measurement.",
        stage: "TRL-6 (Prototype)"
      }
    ],
    patents: 1,
    matchScore: 78,
    matchReasons: [
      "High hardware cost-effectiveness for surface reservoirs",
      "Compliant with local Indian manufacturing mandates (Class 1 Supplier)"
    ],
    riskAnalysis: {
      level: "Medium",
      factors: ["Lacks automated heavy metal detection; requires supplemental spectrometer modules"]
    }
  },
  {
    id: "ST-NEURONET",
    name: "Neuronet Water Systems",
    tagline: "Satellite remote sensing + Ground calibration water purity models",
    dpiitNumber: "DPIIT-REC-33918-TS",
    isDpiitVerified: true,
    incorporationYear: 2020,
    location: "Hyderabad, Telangana",
    founders: ["Dr. S. K. Murthy", "Anita Verma"],
    techStack: ["GIS / Remote Sensing", "Python", "Cloud GIS"],
    products: [
      {
        title: "SatWater Eye",
        description: "Macro-level algal bloom tracking via Sentinel-2 and Landsat multispectral imagery.",
        stage: "TRL-7"
      }
    ],
    patents: 2,
    matchScore: 68,
    matchReasons: [
      "Excellent basin-level coverage",
      "Complementary for regional catchment oversight"
    ],
    riskAnalysis: {
      level: "Medium",
      factors: ["Cannot monitor enclosed underground municipal pipelines in real time"]
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
    products: [
      {
        title: "NanoTox Strip Cartridge",
        description: "Disposable test cartridges for industrial runoffs.",
        stage: "TRL-5"
      }
    ],
    patents: 0,
    matchScore: 59,
    matchReasons: [
      "High chemical specificity for 14 toxic solvents"
    ],
    riskAnalysis: {
      level: "High",
      factors: ["Consumables cost is high and DPIIT verification is pending re-submission"]
    }
  }
];

export const sampleApplications: Application[] = [
  {
    id: "APP-WQ-091",
    challengeId: "CH-2026-WQ01",
    startupId: "ST-AQUASENSE",
    startupName: "AquaSense AI Innovations Pvt Ltd",
    appliedDate: "2026-10-02",
    status: "Submitted",
    dpiitVerified: true,
    financialTurnover: "₹1.42 Cr (Exempted from prior turnover & experience under GFR 2017 Start-up Clause)",
    solutionOverview: "Deploying 15 HydroGuard 4X edge probes across 5 high-priority municipal distribution reservoirs and intake treatment plants. Edge AI directly assesses UV-Vis absorption fingerprints to flag 28 chemical contaminants and fecal coliform surrogates in under 180 seconds.",
    proposedCost: "₹28,50,000 (Pilot Phase inclusive of 15 Probes, Cloud API, 90-day field technicians)",
    deploymentTime: "12 Calendar Days from Work Order",
    proposalSummary: "Turnkey optical sensing deployment requiring zero trench digging or pipeline shutdowns. Reagent-free ultrasonic self-cleaning minimizes maintenance visits. Real-time telemetry alerts dispatch directly to municipal WhatsApp and State Control Center dashboard.",
    aiProposalHighlights: [
      "Zero Consumables / Reagent-free: Eliminates recurrent chemicals cost by 87% vs legacy lab sensors",
      "Edge Anomaly Detection: Algorithms execute onboard the sensor probe microchip, protecting against network outages",
      "Compliant with CPCB Guidelines: Exceeds Bureau of Indian Standards (IS 10500:2012) drinking water limits",
      "Immediate scalability: Ready-to-ship inventory of 120 sensor units in Bengaluru facility"
    ]
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
    solutionOverview: "Solar surface buoys for municipal intake reservoirs with 4G telemetry.",
    proposedCost: "₹22,00,000",
    deploymentTime: "20 Calendar Days",
    proposalSummary: "Buoy-based telemetry solution for open reservoirs with focus on turbidity and basic pH.",
    aiProposalHighlights: [
      "Solar powered with 7-day battery reserve",
      "Low initial procurement expenditure"
    ]
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
      trend: [7.2, 4.5, 3.8, 3.1, 2.8]
    },
    {
      id: "kpi-2",
      metric: "Hardware Sensor Telemetry Uptime",
      target: "≥ 98.0%",
      current: "99.8%",
      unit: "%",
      status: "Ahead",
      trend: [97.5, 98.8, 99.4, 99.7, 99.8]
    },
    {
      id: "kpi-3",
      metric: "False Positive Alert Suppression",
      target: "< 2.0%",
      current: "0.3%",
      unit: "%",
      status: "Ahead",
      trend: [2.1, 1.4, 0.9, 0.5, 0.3]
    },
    {
      id: "kpi-4",
      metric: "Detection Accuracy vs Central Lab Tests",
      target: "≥ 95.0%",
      current: "98.2%",
      unit: "%",
      status: "Ahead",
      trend: [94.0, 95.8, 97.1, 97.9, 98.2]
    },
    {
      id: "kpi-5",
      metric: "Municipal Operational Cost Reduction",
      target: "≥ 35.0%",
      current: "48.5%",
      unit: "%",
      status: "Ahead",
      trend: [30.0, 36.5, 41.0, 45.2, 48.5]
    }
  ],
  milestones: [
    {
      name: "Milestone 1: Hardware Delivery & 5 Intake Installations",
      dueDate: "Day 15",
      status: "Completed",
      payout: "₹8,55,000 (30%)",
      isPaid: true
    },
    {
      name: "Milestone 2: Command Center Telemetry & AI Model Calibration",
      dueDate: "Day 45",
      status: "Completed",
      payout: "₹11,40,000 (40%)",
      isPaid: true
    },
    {
      name: "Milestone 3: 90-Day Independent Water Lab Benchmarking Audit",
      dueDate: "Day 90",
      status: "Completed",
      payout: "₹8,55,000 (30%)",
      isPaid: true
    }
  ],
  aiPilotRecommendation: {
    verdict: "Strongly Recommended for Commercial Procurement",
    confidence: 98,
    reasons: [
      "All 5 pilot site KPIs exceeded government targets by an average of 14.8%",
      "Zero chemical reagent expenditure incurred across 90 continuous days",
      "Over 4,320 continuous water quality reports verified by State Central Water Lab with 98.2% correlation",
      "Direct municipal cost savings quantified at ₹1.12 Cr/year across pilot zones"
    ],
    costBenefitRatio: "1 : 4.6 (Return on Procurement Capital within 14 months)"
  }
};

export const sampleAuditLogs: AuditLog[] = [
  {
    id: "LOG-101",
    timestamp: "2026-10-06 10:15:32",
    user: "Dr. Rajeshwar Sharma (Director, Water Mission)",
    role: "government",
    action: "CHALLENGE_CREATED",
    details: "Created challenge CH-2026-WQ01 'AI-Based Water Quality Monitoring' with AI Problem Decomposition.",
    badge: "AI Decision"
  },
  {
    id: "LOG-102",
    timestamp: "2026-10-06 10:16:04",
    user: "GovInnovate AI Engine",
    role: "government",
    action: "STARTUP_MATCHING_COMPLETE",
    details: "Identified 12 startups; AquaSense AI scored 94% match based on DPIIT credentials & TRL-8 readiness.",
    badge: "AI Decision"
  },
  {
    id: "LOG-103",
    timestamp: "2026-10-06 11:30:19",
    user: "Dr. Aranya Sen (CEO, AquaSense)",
    role: "startup",
    action: "PROPOSAL_SUBMITTED",
    details: "Submitted proposal APP-WQ-091 with 15 HydroGuard 4X probes & zero-reagent edge AI architecture.",
    badge: "Procurement"
  },
  {
    id: "LOG-104",
    timestamp: "2026-10-06 11:45:00",
    user: "DPIIT Automated Bridge API",
    role: "government",
    action: "ELIGIBILITY_VERIFIED",
    details: "Certificate DPIIT-REC-89241-DL confirmed active. Exemption applied under GFR 149/170.",
    badge: "Security"
  },
  {
    id: "LOG-105",
    timestamp: "2026-10-06 14:20:11",
    user: "Prof. Vinod Nair (Chairman, Expert Evaluation Committee)",
    role: "evaluator",
    action: "EVALUATION_SCORED",
    details: "Score awarded: 95/100 (Innovation: 19/20, Feasibility: 19/20, Impact: 20/20, Scalability: 19/20).",
    badge: "Evaluation"
  },
  {
    id: "LOG-106",
    timestamp: "2026-10-06 15:00:22",
    user: "Govt Procurement Committee",
    role: "government",
    action: "PILOT_AUTHORIZED",
    details: "Issued 90-day pilot sanction PILOT-WQ-2026-01 across 5 intake locations with ₹28.5L budget.",
    badge: "Procurement"
  },
  {
    id: "LOG-107",
    timestamp: "2026-10-06 17:45:00",
    user: "Finance & PFMS Gateway",
    role: "government",
    action: "MILESTONE_PAYMENT_RELEASED",
    details: "Milestone 1, 2 & 3 disbursements finalized totaling ₹28,50,000 under PFMS direct transfer.",
    badge: "Payment"
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "AI Pilot Validation Complete",
    message: "AquaSense 90-Day Water Quality pilot achieved 96.4/100 score. Recommendation ready for scale approval.",
    time: "10 mins ago",
    read: false,
    type: "success"
  },
  {
    id: "n-2",
    title: "DPIIT Verification Confirmed",
    message: "AquaSense AI Innovations Pvt Ltd verified with startup tax exemption and relaxations.",
    time: "2 hours ago",
    read: false,
    type: "info"
  },
  {
    id: "n-3",
    title: "Scale-Up Budget Sanction Window Open",
    message: "Phase 2 expansion for 50 municipal wards ready for Cabinet Note generation.",
    time: "5 hours ago",
    read: true,
    type: "info"
  }
];

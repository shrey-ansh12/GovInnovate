import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { rawProblem, department, ministry } = await req.json();

    if (!rawProblem || rawProblem.trim().length < 10) {
      return NextResponse.json({ error: "Problem statement is too short." }, { status: 400 });
    }

    const text = rawProblem.toLowerCase();

    // Check if Gemini API Key is available in environment
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const prompt = `You are a public procurement and technical standards expert for the Government of India under GFR 2017 Innovation rules.
Analyze this departmental problem statement:
"${rawProblem}"
Department: ${department || "Government of India"}
Ministry: ${ministry || "Union Ministry"}

Return a JSON object ONLY with:
- "structuredTitle": string (Formal procurement challenge title, max 10 words)
- "summary": string (2-3 sentences technical summary)
- "expectedOutcomes": string[] (Array of 4 strictly quantifiable SLAs with numeric thresholds and units)
- "technicalThresholds": string[] (Array of 4 technical criteria, e.g. TRL maturity, Make-in-India % >= 50%, BIS/ISO compliance, and edge reliability)
`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
          return NextResponse.json({
            success: true,
            source: "Gemini 1.5 Flash API",
            ...parsed
          });
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to heuristic engine:", geminiErr);
      }
    }

    // High-Fidelity Heuristic Domain Decomposition Engine
    let structuredTitle = "AI-Driven Public Sector Innovation & Monitoring System";
    let outcomes: string[] = [
      "Sub-5 minute latency for critical operational anomaly alerts",
      "≥ 98.0% hardware/software system availability under field conditions",
      "< 2.0% false positive alert rate across telemetry streams",
      "Direct API integration with National Command Dashboards via secure MQTT/REST"
    ];
    let thresholds: string[] = [
      "Minimum TRL 7 (Operational environment field demonstration)",
      "Domestic Local Content ≥ 50% (Make in India Class-1 mandate)",
      "Adherence to relevant BIS/ISO national standards",
      "DPIIT startup recognition with statutory GFR 2017 relaxation eligibility"
    ];

    if (text.includes("drone") || text.includes("uav") || text.includes("aerial") || text.includes("surveillance")) {
      structuredTitle = "Autonomous UAV Swarm Surveillance & Infrastructure Inspection System";
      outcomes = [
        "≥ 45 minutes continuous operational flight endurance per sortie",
        "Sub-3 second edge object & anomaly detection with ≥ 96.5% accuracy",
        "Geofenced real-time encrypted video telemetry within 150ms latency",
        "Autonomous return-to-base and all-weather wind resistance (up to 40 km/h)"
      ];
      thresholds = [
        "DGCA Type Certified or Green Zone compliant drone architecture",
        "Minimum TRL 7 demonstrated in rugged field conditions",
        "Domestic Local Content ≥ 60% (Make in India mandate)",
        "AES-256 encrypted payload telemetry and remote pilot fail-safe"
      ];
    } else if (text.includes("solar") || text.includes("energy") || text.includes("power") || text.includes("grid")) {
      structuredTitle = "Smart Microgrid Telemetry & Predictive Clean Energy Management Platform";
      outcomes = [
        "≥ 99.5% inverter & telemetry uptime across distributed installations",
        "Sub-15 second predictive grid curtailment and surge warning notifications",
        "≥ 18.5% measured reduction in non-technical transmission and distribution losses",
        "Interoperable IEC 61850 / Modbus industrial protocol telemetry reporting"
      ];
      thresholds = [
        "BIS & CEA certified components compliant with Indian Grid Standards",
        "Minimum TRL 7 in high-voltage operational environments",
        "Domestic Local Content ≥ 55% under Class-1 procurement rules",
        "Cybersecurity compliance conforming to CERT-In power sector guidelines"
      ];
    } else if (text.includes("waste") || text.includes("garbage") || text.includes("sanitation") || text.includes("recycle")) {
      structuredTitle = "Automated Solid Waste Segregation & Civic Telemetry Optimization Platform";
      outcomes = [
        "≥ 94.0% automated multi-category recyclable sorting precision at source",
        "Sub-10 minute alert response for overflow and hazardous particulate spikes",
        "≥ 35.0% verified reduction in municipal landfill disposal volume",
        "Real-time GPS vehicle tracking and RFID bin collection telemetry"
      ];
      thresholds = [
        "SBM-Urban 2.0 & CPCB Solid Waste Management Rules 2016 compliant",
        "Minimum TRL 7 with IP67 ruggedized field enclosure ratings",
        "Domestic Local Content ≥ 50% (Class-1 Local Supplier)",
        "Central command dashboard integration with municipal ERP"
      ];
    } else if (text.includes("traffic") || text.includes("road") || text.includes("transport") || text.includes("pothole")) {
      structuredTitle = "AI Vision-Based Urban Traffic Flow & Automated Road Defect Detection System";
      outcomes = [
        "Sub-2 second automated vehicle classification & incident detection latency",
        "≥ 97.0% precision in pothole and surface crack severity grading",
        "≥ 25.0% improvement in corridor throughput during peak civic congestion",
        "Secure integration with State Police Traffic Command & Control Systems"
      ];
      thresholds = [
        "IRC & MoRTH road safety and ITS technical guidelines compliant",
        "Minimum TRL 7 field-tested across diverse urban weather conditions",
        "Domestic Local Content ≥ 50% (Make in India standard)",
        "Edge-computing capability ensuring functionality during cellular drops"
      ];
    } else if (text.includes("health") || text.includes("medical") || text.includes("hospital") || text.includes("patient")) {
      structuredTitle = "Point-of-Care Diagnostic Telemetry & Remote Public Health Screening Suite";
      outcomes = [
        "Sub-3 minute rapid diagnostic screening turnaround with laboratory correlation ≥ 97.5%",
        "Offline-first edge inference operational in remote primary health centres (PHCs)",
        "≥ 99.9% data protection with end-to-end encryption for patient health records",
        "Direct integration with Ayushman Bharat Digital Mission (ABDM) APIs"
      ];
      thresholds = [
        "CDSCO / ICMR medical device regulatory approval and ISO 13485 compliance",
        "Minimum TRL 8 clinical validation in government healthcare facilities",
        "Domestic Local Content ≥ 50% (Class-1 Local Supplier)",
        "ABDM M1, M2, and M3 milestone certified architecture"
      ];
    } else if (text.includes("water") || text.includes("river") || text.includes("pipeline") || text.includes("contaminat")) {
      structuredTitle = "AI-Based Water Quality Monitoring & Predictive Contamination Warning System";
      outcomes = [
        "Sub-5 minute latency for heavy metal & biochemical surge detection",
        "≥ 98.0% continuous sensor uptime in harsh submerged conditions",
        "Under 2.0% false-positive alert rate on organic particulate fluctuations",
        "Standard integration with State Municipal Command Centers via REST/MQTT"
      ];
      thresholds = [
        "CPCB & BIS IS 10500:2012 Drinking Water standards compliant",
        "Minimum TRL 7 demonstrated in operational municipal environment",
        "Domestic Local Content ≥ 50% (Class-1 Local Supplier)",
        "Reagent-free or ultrasonic low-maintenance submerged probe design"
      ];
    }

    return NextResponse.json({
      success: true,
      source: "GovInnovate Domain SLA Synthesizer",
      structuredTitle,
      summary: `Automated public-sector deployment addressing: "${rawProblem.slice(0, 150)}..." via verified startup innovation, edge telemetry, and measurable SLAs.`,
      problemStatement: rawProblem,
      expectedOutcomes: outcomes,
      technicalThresholds: thresholds
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Decomposition failed" }, { status: 500 });
  }
}

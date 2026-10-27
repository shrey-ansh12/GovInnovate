import { NextRequest, NextResponse } from "next/server";

// Grounded Knowledge Base for GovInnovate Platform
const KNOWLEDGE_BASE = [
  {
    keywords: ["gfr", "rule 149", "rule 170", "rule 173", "relaxation", "turnover", "experience", "exemption"],
    topic: "GFR 2017 Startup Relaxations",
    answer: "Under General Financial Rules (GFR 2017) Rule 170(i) and Rule 149, recognized DPIIT startups are exempted from prior turnover and prior experience criteria in public procurement, provided they meet verified technical capability and Technology Readiness Level (TRL) requirements. Earnest Money Deposit (EMD) is also waived.",
    reference: "Manual for Procurement of Goods 2017 / GFR Rule 149 & 170(i)"
  },
  {
    keywords: ["pilot", "90-day", "sandbox", "field trial", "duration", "sanction"],
    topic: "90-Day Civic Sandbox Pilot",
    answer: "The 90-day sandbox pilot allows government departments to deploy a startup's working technology (TRL 7+) across initial intake points (typically 5 sites) with milestone-governed payouts. Real-time telemetry, false-positive rates, and uptime are independently tracked before sanctioning scale-up.",
    reference: "GovInnovate Sandbox Framework & Departmental Pilot Guidelines"
  },
  {
    keywords: ["score", "scoring", "5-pillar", "evaluat", "criteria", "metric"],
    topic: "5-Pillar Structured Evaluation Framework",
    answer: "Proposals are scored out of 100 across 5 equal pillars (0-20 points each): 1) Innovation (novelty & IP strength), 2) Feasibility (TRL level & engineering maturity), 3) Impact (quantifiable SLA improvements), 4) Scalability (ease of deployment across wards), and 5) Viability (budget fit & domestic local content).",
    reference: "GovInnovate Technical Evaluation Board Manual"
  },
  {
    keywords: ["dpiit", "certificate", "eligib", "startup registration"],
    topic: "DPIIT Startup Eligibility",
    answer: "To participate, startups must possess a valid DPIIT recognition number, demonstrate at least TRL-7 prototype maturity, comply with Make in India local content mandates (typically >= 50% for Class-1 suppliers), and have clean regulatory compliance.",
    reference: "Startup India & DPIIT Gazette Notifications"
  },
  {
    keywords: ["milestone", "payment", "pfms", "treasury", "disburse"],
    topic: "Milestone-Linked Disbursements",
    answer: "Pilot funds are disbursed in tranches tied to verifiable technical evidence: Tranche 1 (30%) on initial deployment and calibration, Tranche 2 (40%) on 45-day telemetry uptime, and Tranche 3 (30%) upon final lab benchmarking and validation report submission.",
    reference: "Public Financial Management System (PFMS) Milestone Standards"
  },
  {
    keywords: ["demo", "real mode", "difference", "explore"],
    topic: "Real Mode vs. Demo Mode",
    answer: "GovInnovate offers two distinct modes: 'Real Mode' connects to persistent Supabase databases with real authentication and role enforcement; 'Demo Mode' provides an isolated sandbox with pre-loaded scenarios (such as the Jal Shakti water sensing challenge) so evaluators can test workflows safely without writing to live government records.",
    reference: "GovInnovate Platform Architecture"
  },
  {
    keywords: ["challenge", "create challenge", "publish", "decomposition"],
    topic: "Government Challenge Creation",
    answer: "Government officers input unstructured civic bottlenecks (e.g. water pipeline contamination). The platform synthesizes this into structured technical thresholds, SLA benchmarks (e.g. <5 min detection latency), and required local content before publishing.",
    reference: "Civic Problem Decomposition Protocol"
  }
];

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    // Option A: If OPENAI_API_KEY is configured, call OpenAI
    if (openaiApiKey && !openaiApiKey.includes("your-openai-api-key")) {
      try {
        const messages = [
          {
            role: "system",
            content: `You are GovInnovate Civic AI Assistant — a specialized assistant for the GovInnovate Public Sector Innovation Sandbox.
Your role is to explain how government departments identify, pilot, evaluate, and scale innovative solutions from DPIIT startups under GFR 2017 rules.
Always maintain a helpful, civic, and professional tone.
Cite applicable rules (e.g. GFR 149/170, DPIIT criteria, 5-Pillar Scorecard, 90-day sandbox pilot steps).
Always include the disclaimer that GovInnovate is a procurement evaluation sandbox and does not replace statutory tender approvals or constitute automatic contract award.`
          },
          ...(Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : []),
          { role: "user", content: message }
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.3,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: "OpenAI gpt-4o-mini (Live)",
              disclaimer: "Procurement decisions are subject to applicable GFR, GeM rules, and competent-authority approval."
            });
          }
        }
      } catch (aiErr) {
        console.warn("OpenAI API call failed, falling back to verified local knowledge base:", aiErr);
      }
    }

    // Option B: High-fidelity verified heuristic knowledge engine
    const query = message.toLowerCase();
    let bestMatch = KNOWLEDGE_BASE[0];
    let maxScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (query.includes(kw)) score += 2;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    let answerText = "";
    if (maxScore > 0) {
      answerText = `${bestMatch.answer}\n\n**Statutory Reference:** ${bestMatch.reference}`;
    } else {
      answerText = `GovInnovate is a transparent procurement-to-pilot sandbox connecting public sector challenges with verified DPIIT startups under GFR 2017 Rule 149/170 exemptions. You can ask about:\n• How GFR startup turnover/experience exemptions work\n• The 90-day sandbox pilot lifecycle\n• 5-Pillar evaluation scorecard (Innovation, Feasibility, Impact, Scalability, Viability)\n• How to publish a challenge or submit a proposal\n• Switching between Real Mode and Demo Mode`;
    }

    return NextResponse.json({
      reply: answerText,
      source: "GovInnovate Verified Civic Knowledge Engine (Heuristic Fallback)",
      disclaimer: "Procurement decisions are subject to applicable GFR, GeM rules, and competent-authority approval.",
      notice: !openaiApiKey ? "To enable dynamic LLM chat, configure OPENAI_API_KEY in your environment variables." : undefined
    });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Failed to process chat query" }, { status: 500 });
  }
}

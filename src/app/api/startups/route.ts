import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseUserClient, isSupabaseConfigured } from "@/lib/supabaseServer";
import { importedPublicStartups } from "@/lib/mockData";
import { Startup } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim();
    const sector = searchParams.get("sector")?.toLowerCase().trim();

    let allStartups: Startup[] = importedPublicStartups;

    if (isSupabaseConfigured()) {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
      const supabase = token ? getSupabaseUserClient(token) : getSupabaseServerClient();

      const { data, error } = await supabase
        .from("startup_directory")
        .select("*")
        .order("startup_name", { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        allStartups = data.map((d: {
          id: string;
          startup_name: string;
          product_or_solution?: string;
          sector?: string;
          public_capability_summary?: string;
          potential_govinnovate_use_case?: string;
          website?: string;
          evidence_source_url?: string;
          source_type?: string;
          verification_status?: string;
          dpiit_recognition_status?: string;
          match_tags?: string;
          data_notes?: string;
        }) => {
          const matchTags = d.match_tags ? d.match_tags.split(";").map(t => t.trim()).filter(Boolean) : [];
          return {
            id: d.id,
            name: d.startup_name,
            tagline: (d.product_or_solution ? `${d.product_or_solution}: ` : "") + (d.potential_govinnovate_use_case || ""),
            dpiitNumber: d.dpiit_recognition_status || "Not verified in this dataset",
            isDpiitVerified: false,
            incorporationYear: 2021,
            location: "India",
            founders: ["Executive Leadership"],
            techStack: matchTags,
            sector: d.sector || "AI / DeepTech",
            products: [
              {
                title: d.product_or_solution || d.startup_name,
                description: d.public_capability_summary || "Documented capability",
                stage: "Publicly Documented Capability"
              }
            ],
            patents: 0,
            trlLevel: 7,
            localContentPercentage: 60,
            matchScore: 0,
            matchReasons: [],
            riskAnalysis: {
              level: "Low",
              factors: [
                d.verification_status || "Public profile located",
                d.data_notes || "Public claims require direct validation"
              ]
            },
            tamperStatus: "VERIFIED",
            verificationStage: d.verification_status || "Public profile located",
            productOrSolution: d.product_or_solution,
            publicCapabilitySummary: d.public_capability_summary,
            potentialUseCase: d.potential_govinnovate_use_case,
            website: d.website,
            evidenceSourceUrl: d.evidence_source_url,
            sourceType: d.source_type,
            verificationStatusNote: d.verification_status,
            dpiitRecognitionStatus: d.dpiit_recognition_status,
            matchTags,
            dataNotes: d.data_notes,
            isPublicDirectoryEntry: true
          } as Startup;
        });
      } else if (error) {
        console.warn("Notice: Falling back to local imported startup dataset:", error.message);
      }
    }

    let filtered = allStartups;

    if (search) {
      filtered = filtered.filter(s => {
        const text = `${s.name} ${s.sector} ${s.tagline} ${s.techStack.join(" ")} ${s.productOrSolution || ""} ${s.publicCapabilitySummary || ""} ${s.potentialUseCase || ""}`.toLowerCase();
        return text.includes(search);
      });
    }

    if (sector && sector !== "all") {
      filtered = filtered.filter(s => (s.sector || "").toLowerCase().includes(sector));
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      startups: filtered
    });
  } catch (err: unknown) {
    console.error("Startups API error:", err);
    return NextResponse.json({ error: "Failed to fetch startups" }, { status: 500 });
  }
}

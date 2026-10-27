import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dpiitNumber, startupName, consent } = body;

    if (!consent) {
      return NextResponse.json({ 
        error: "User consent under Digital Personal Data Protection (DPDP) Act is required for DigiLocker Pull." 
      }, { status: 400 });
    }

    if (!dpiitNumber || dpiitNumber.trim().length < 5) {
      return NextResponse.json({ error: "Invalid DPIIT Recognition Number format." }, { status: 400 });
    }

    // Simulate official DigiLocker Pull URI response from in.gov.dpiit
    const normalizedDpiit = dpiitNumber.trim().toUpperCase();
    const simulatedDocPayload = JSON.stringify({
      issuer: "in.gov.dpiit.startuprecognition",
      schemaVersion: "2.1",
      docType: "DPREC",
      dpiitNumber: normalizedDpiit,
      entityName: startupName || "AquaSense AI Innovations Pvt Ltd",
      issueDate: "2023-04-12",
      validUntil: "2033-04-11",
      gfrExemptionEligible: true,
      digitalSignature: {
        signedBy: "Director, Startup India & DPIIT",
        timestamp: "2023-04-12T10:14:32Z",
        algorithm: "SHA256withRSA"
      }
    });

    const fileHash = crypto.createHash("sha256").update(simulatedDocPayload).digest("hex");

    return NextResponse.json({
      success: true,
      source: "DigiLocker Sandbox Gateway",
      protocol: "DigiLocker Pull URI v2.1 (OAuth 2.0 PKCE)",
      documentRecord: {
        id: `DL-PULL-${Date.now().toString().slice(-6)}`,
        fileName: `${normalizedDpiit}_DigiLocker_Verified.pdf`,
        fileSizeBytes: 248012,
        fileHash,
        uploadedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        extractedEntityName: startupName || "AquaSense AI Innovations Pvt Ltd",
        extractedDpiitNumber: normalizedDpiit,
        extractedDate: "12/04/2023",
        extractedCategory: "DPIIT Recognized (DigiLocker Cryptographic XML Verified)",
        nameSimilarityScore: 100,
        entityMismatchFlag: false,
        preliminaryStatus: "Passed",
        officialStatus: "Officially Verified", // DigiLocker pull carries direct issuer signature
        verifiedBy: "DigiLocker Gateway (Govt of India)",
        verifiedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        source: "DigiLocker Sandbox",
        rawTextPreview: "DigiLocker Cryptographically Signed Document URI: in.gov.dpiit-DPREC-" + normalizedDpiit
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "DigiLocker pull failed" }, { status: 500 });
  }
}

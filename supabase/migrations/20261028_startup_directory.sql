-- ==============================================================================
-- GovInnovate Migration: Public Startup Directory Table & RLS Policies
-- Date: 2026-10-28
-- Description: Creates the dedicated public.startup_directory table for verified
--              public startup profiles imported from govinnovate_public_startup_dataset.csv.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.startup_directory (
  id TEXT PRIMARY KEY,
  startup_name TEXT NOT NULL,
  product_or_solution TEXT,
  sector TEXT,
  public_capability_summary TEXT,
  potential_govinnovate_use_case TEXT,
  website TEXT,
  evidence_source_url TEXT,
  source_type TEXT,
  verification_status TEXT,
  dpiit_recognition_status TEXT,
  match_tags TEXT,
  data_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performant search and filtering
CREATE INDEX IF NOT EXISTS idx_startup_directory_name ON public.startup_directory(startup_name);
CREATE INDEX IF NOT EXISTS idx_startup_directory_sector ON public.startup_directory(sector);

-- Enable Row Level Security (RLS)
ALTER TABLE public.startup_directory ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all users (anonymous and authenticated) to read public directory entries
DROP POLICY IF EXISTS "Public can view verified startup directory entries" ON public.startup_directory;
CREATE POLICY "Public can view verified startup directory entries"
  ON public.startup_directory
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Restrict insert/update/delete strictly to service_role (Admin & safe automated migrations)
DROP POLICY IF EXISTS "Service role manages startup directory" ON public.startup_directory;
CREATE POLICY "Service role manages startup directory"
  ON public.startup_directory
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- Idempotent Seed Data (22 Public Startup Profiles)
-- ==============================================================================

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-EIGENLYTICS-DATA-SOLUTIONS-PRI',
  'Eigenlytics Data Solutions Private Limited',
  'DocEye',
  'AI; DeepTech; Intelligent Document Processing',
  'Public exhibitor profile describes DocEye as a solution for recognizing and extracting information from digital and physical documents and automating document-driven operations.',
  'Extract fields from submitted forms and supporting documents before rule-based validation.',
  'https://eigenlytics.com',
  'https://startupmahakumbak.org/exhibitor_directory/SM_2025_Exhibitor_Directory.pdf',
  'Startup Mahakumbh exhibitor directory; official company website',
  'Public profile located; company claims and current product status require direct validation',
  'Not verified in this dataset',
  'OCR; document extraction; intelligent document processing; workflow automation',
  'Directory result was found on Startup Mahakumbh''s official domain; verify the exact PDF URL before presenting.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-TOUCHLESS-ID-PVT-LTD',
  'Touchless ID Pvt Ltd',
  'Touchless ID',
  'Identity technology; biometrics',
  'A Government of India Startup India COVID-19 solutions shortlist describes Touchless ID as offering touchless multi-factor authentication using mobile-camera biometrics.',
  'Possible identity-verification workflow component, subject to suitability, privacy review and validation of current product availability.',
  'https://identy.io',
  'https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/covid_resource_section/COVIDResource%26Programs_Listicle%20of%20Covid%20Startup%20Solutions_29.04.20_86%20shortlist.pdf',
  'Startup India / Government of India public PDF',
  'Listed in historical government publication; current company and product status not independently verified',
  'Not verified in this dataset',
  'identity verification; biometrics; authentication',
  'Historical source from 2020; do not imply current availability or current DPIIT status.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-AADRILA-TECHNOLOGIES',
  'Aadrila Technologies',
  'Document Intelligence and KYC & Identity suites',
  'AI; document processing; identity',
  'Company website describes AI-powered document processing and KYC/identity products.',
  'Potential match for document intake, KYC-style checks and identity-related workflows.',
  'https://aadrila.ai',
  'https://aadrila.ai/',
  'Company website',
  'Company-published capability; independently validate claims and deployment references',
  'Website displays Startup India affiliation; recognition status not independently checked',
  'document AI; KYC; identity verification; risk',
  'Do not treat website claims as proof of government approval or certification.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-COGNITIVE-STRING-PRIVATE-LIMIT',
  'Cognitive String Private Limited',
  'DocuAILens',
  'AI; OCR; document intelligence',
  'Company website describes OCR and document-structure extraction for invoices, financial statements, contracts and forms, including multilingual documents.',
  'Extract structured fields from uploaded applications and supporting records.',
  'https://cognitivestring.com',
  'https://cognitivestring.com/',
  'Company website',
  'Company-published capability; independently validate claims and product status',
  'Website claims DPIIT recognition; not independently verified in this dataset',
  'OCR; multilingual documents; field extraction; document parsing',
  'Recognition is recorded as a company claim, not as independently confirmed.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-THATCHED',
  'THATCHED',
  'THATCHED Convert',
  'Language AI; OCR; document conversion',
  'Company website describes converting PDFs and scans in English, Telugu, Tamil and Hindi into editable Word and Excel files.',
  'Pre-process scanned or multilingual supporting documents before downstream review.',
  'https://www.thatched.ai/',
  'https://www.thatched.ai/',
  'Company website',
  'Company-published capability; independently validate output quality and product status',
  'Not verified in this dataset',
  'OCR; Indian languages; PDF conversion; document preprocessing',
  'Document conversion is not the same as authenticity verification.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-MINDT',
  'MindT',
  'Document AI & data analysis',
  'AI; OCR; document digitisation',
  'Company website describes converting scanned PDFs in Indian languages into searchable structured outputs such as XML, EPUB or JSON.',
  'Digitise and structure scanned records before applying eligibility rules.',
  'https://www.mindt.co.in/',
  'https://www.mindt.co.in/',
  'Company website',
  'Company-published capability; independently validate claims and product status',
  'Not verified in this dataset',
  'OCR; Indian languages; data extraction; digitisation',
  'Use as a potential capability match, not a pre-approved vendor.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-VOVIX-PRIVATE-LIMITED',
  'VOVIX Private Limited',
  'VOVIX Lens',
  'AI; document processing; workflow automation',
  'Company website describes document intelligence for invoices, statements and KYC documents, with export to structured formats.',
  'Extract and standardise fields from finance or identity-related documents.',
  'https://www.vovix.in/',
  'https://www.vovix.in/',
  'Company website',
  'Company-published capability; independently validate claims and product status',
  'Website states it is registered on Startup India; not independently verified here',
  'document AI; KYC; invoice processing; workflow automation',
  'Startup India registration wording is reproduced as a company-published claim, not a verified eligibility decision.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-KRIYAM-AI-STUDIO',
  'Kriyam AI Studio',
  'DocWise / DocForensics (as described on website)',
  'AI; document intelligence; tampering analysis',
  'Website describes document parsing, field extraction, document classification, tampering checks, metadata checks and digital-signature checks.',
  'Potential support for extracting document fields and flagging possible tampering indicators for human review.',
  'https://studio.kriyam.ai/',
  'https://studio.kriyam.ai/',
  'Company website',
  'Company-published capability; independently validate claims, benchmarks and product status',
  'Not verified in this dataset',
  'document AI; tampering indicators; digital signatures; PII protection',
  'Automated tampering flags are not conclusive proof of forgery.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-PRESCALE-LABS',
  'PreScale Labs',
  'Document AI / Prelexa (as described on website)',
  'AI; intelligent document processing',
  'Company website describes processing PDFs, scans and images into structured JSON or tables using OCR and AI.',
  'Extract fields from application forms and supporting documents for subsequent rule checks.',
  'https://prescalelabs.com/product',
  'https://prescalelabs.com/product',
  'Company website',
  'Company-published capability; independently validate claims and product status',
  'Not verified in this dataset',
  'OCR; field extraction; structured JSON; document processing',
  'Accuracy figures on the company website have not been independently tested.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-ANUMITI',
  'Anumiti',
  'NETRA API / KAVACH (as described on website)',
  'AI; compliance; document intelligence',
  'Company website describes document extraction and validation workflows, including GSTIN-related checks and audit trails.',
  'Potential component for structured extraction and selected compliance checks, subject to confirming supported APIs and authorization.',
  'https://www.anumiti.com/',
  'https://www.anumiti.com/',
  'Company website',
  'Company-published capability; independently validate claims and API access',
  'Not verified in this dataset',
  'document AI; compliance; GSTIN checks; audit trails',
  'Do not send real personal or sensitive documents to a third-party service without authorization and a privacy/security review.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-ENHIRA-SOFTWARE-EXPORTS',
  'Enhira Software Exports',
  'Document digitisation and intelligent extraction services',
  'Document digitisation; enterprise AI',
  'Company website describes document digitisation, management and AI-assisted extraction services.',
  'Potential supplier for digitisation and extraction of legacy paper records.',
  'https://enhira.co.in/',
  'https://enhira.co.in/',
  'Company website',
  'Company-published capability; independently validate references and current service scope',
  'Not verified in this dataset',
  'document digitisation; extraction; records management',
  'Included as a potential solution provider, not asserted to be an early-stage startup.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-DOCSFLOW-AI',
  'DocsFlow AI',
  'Document data extraction API',
  'AI; OCR; workflow automation',
  'Website describes extracting structured data from PDFs, forms, scans and websites using OCR and workflow automation.',
  'Possible API-based extraction option, subject to checking product maturity and integration requirements.',
  'https://docsflowai.com/about',
  'https://docsflowai.com/about',
  'Company website',
  'Company-published capability; independently validate company details and product status',
  'Not verified in this dataset',
  'OCR; document extraction; APIs; workflow automation',
  'Treat company-provided metrics and compliance claims as unverified until independently substantiated.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-QURE-AI-TECHNOLOGIES-PVT-LTD',
  'Qure.ai Technologies Pvt Ltd',
  'qXR & qTrack',
  'MedTech / Edge AI & Rural Health Diagnostics',
  'AI-powered automated chest radiograph interpretation software that detects pulmonary tuberculosis, pneumonia, cavities, and 30+ lung anomalies with sub-30 second inference. Integrates with battery-operated ultra-portable X-ray hardware for remote field screening.',
  'Rural mobile pulmonary screening camps, primary health center TB triage, and automated reporting integrated with Ayushman Bharat Digital Mission (ABDM).',
  'https://qure.ai',
  'https://qure.ai/product/qxr',
  'Official Product Portal / Clinical Evidence Registry',
  'Company-published capability',
  'DPIIT recognized entity',
  'chest x-ray; tuberculosis; pneumonia; pulmonary diagnostics; edge ai; portable xray; abdm; fhir; healthcare; rural health',
  'Deployed across 80+ countries and public health programs in India; recommended by WHO for computer-aided TB detection.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-DEEPTEK-MEDICAL-PRIVATE-LIMITE',
  'DeepTek Medical Private Limited',
  'Augmento & Genki CXR Analyzer',
  'MedTech / Edge AI & Rural Health Diagnostics',
  'Computer-aided detection (CADe) deep learning software analyzing digital chest radiographs for tuberculosis and 21+ pulmonary pathologies. Operates offline on edge devices and mobile screening vans.',
  'Point-of-care rural health clinic triage for TB, municipal health department mobile radiology units, and national tuberculosis elimination missions.',
  'https://www.deeptek.ai',
  'https://www.deeptek.ai',
  'Official Company Registry & Clinical Approvals',
  'Company-published capability',
  'DPIIT recognized entity',
  'radiology ai; chest x-ray; tuberculosis screening; pulmonary triage; cad; diagnostic imaging; rural clinics',
  'US FDA-cleared and CE MDR certified AI chest imaging platform; active in Indian public health mobile imaging initiatives.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-VEHANT-TECHNOLOGIES-PVT-LTD',
  'Vehant Technologies Pvt Ltd',
  'TrafficMon & OKEAN Video Intelligence',
  'Smart Mobility / Computer Vision & Edge AI',
  'Edge-AI computer vision for real-time vehicular density tracking, traffic signal timing optimization, automated red-light and speed enforcement, and emergency vehicle green-corridor management.',
  'Municipal Integrated Traffic Command Systems (ITCS), automated green corridors for ambulances, and highway congestion management under MoRTH.',
  'https://www.vehant.com',
  'https://www.vehant.com',
  'Official Corporate & ITMS Deployment Portfolio',
  'Company-published capability',
  'DPIIT recognized entity',
  'adaptive traffic signals; green corridor; emergency vehicle; computer vision; video analytics; itms; anpr; vehicle density',
  'IIT Delhi-incubated smart mobility and physical security company deployed across major Indian smart cities.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-STAQU-TECHNOLOGIES-PVT-LTD',
  'Staqu Technologies Pvt Ltd',
  'JARVIS Video Intelligence Platform',
  'Smart Mobility / Computer Vision & Edge AI',
  'Edge video analytics platform converting existing CCTV streams into real-time traffic density, congestion hotspots, automated incident alerts, and vehicle classification.',
  'Smart city traffic signal preemption, emergency vehicle path clearance, and municipal roadway anomaly detection.',
  'https://www.staqu.com',
  'https://www.staqu.com',
  'Official Product & Smart City Solutions Portal',
  'Company-published capability',
  'DPIIT recognized entity',
  'traffic congestion; smart city; edge vision; video intelligence; vehicle classification; incident response',
  'Deployed across state police departments and smart cities in India for traffic and surveillance analytics.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-BHARATROHAN-AIRBORNE-INNOVATIO',
  'BharatRohan Airborne Innovations Private Limited',
  'CropAssure & SourceAssure',
  'AgriTech / Autonomous Drones & Multispectral AI',
  'UAV hyperspectral and multispectral imaging platform providing early-stage crop disease, pest infestation, and chlorophyll stress forewarning up to 7 days before visual onset.',
  'Large-scale agricultural crop surveillance, localized pest outbreak containment, and automated farmer advisories for state agricultural directorates.',
  'https://bharatrohan.in',
  'https://bharatrohan.in',
  'Official Company Registry & NITI Aayog Feature',
  'Company-published capability',
  'DPIIT recognized entity',
  'agricultural drones; multispectral sensing; hyperspectral; crop disease; pest outbreak; ndvi; precision agriculture',
  'Recognized by NITI Aayog; operational across thousands of acres of smallholder farmland in northern India.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-FASAL-WOLKUS-TECHNOLOGY-SOLUTI',
  'Fasal (Wolkus Technology Solutions Pvt Ltd)',
  'Fasal Kranti IoT Sensor Suite',
  'AgriTech / Autonomous Drones & Multispectral AI',
  'On-farm microclimate and soil IoT sensor network tracking 12+ environmental parameters with AI predictive models for fungal pathogen life cycles and pest alerts.',
  'Horticulture clusters, state micro-irrigation missions, and proactive disease forewarning systems for farmer producer organizations.',
  'https://fasal.co',
  'https://fasal.co',
  'Official Precision AgriTech Portal',
  'Company-published capability',
  'DPIIT recognized entity',
  'microclimate sensors; soil moisture; crop disease prediction; fungal pathogen; precision agriculture; agritech',
  'Recognized by NITI Aayog; widely deployed across horticulture belts in Maharashtra, Karnataka, and Madhya Pradesh.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-OIZOM-INSTRUMENTS-PVT-LTD',
  'Oizom Instruments Pvt Ltd',
  'Odosense & Polludrone',
  'CleanTech / Waste Management & Subsurface IoT',
  'Electronic-nose (e-Nose) and ambient environmental IoT sensor systems for continuous monitoring of H2S, NH3, Methane (CH4), TVOCs, and leachate evaporation at landfills, dump sites, and wastewater treatment plants.',
  'Municipal landfill perimeter monitoring, toxic gas blowout prevention, leachate seepage tracking, and CPCB automated compliance reporting.',
  'https://oizom.com',
  'https://oizom.com',
  'Official Environmental Monitoring Portal',
  'Company-published capability',
  'DPIIT recognized entity',
  'landfill monitoring; toxic gas; voc; methane; hydrogen sulfide; leachate; environmental iot; air quality; cpcb',
  'IP66 solar-ready outdoor environmental monitors deployed across 60+ countries and Indian municipal dump sites.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-ISHITVA-ROBOTIC-SYSTEMS-PRIVAT',
  'Ishitva Robotic Systems Private Limited',
  'SANJIVANI & YUTA AI Sorting',
  'CleanTech / Waste Management & Subsurface IoT',
  'AI-powered computer vision and robotic sorting systems for municipal dry waste segregation and landfill diversion, tracking material composition in real-time.',
  'Material recovery facilities (MRF), municipal waste sorting before landfill dumping, and Swachh Bharat mission compliance.',
  'https://ishitva.in',
  'https://ishitva.in',
  'Official Circular Economy Portal',
  'Company-published capability',
  'DPIIT recognized entity',
  'waste management; ai sorting; computer vision; landfill diversion; material recovery; swachh bharat',
  'Ahmedabad-based robotics startup supported by MeitY and venture funds for municipal waste automation.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-KRITSNAM-TECHNOLOGIES-PVT-LTD',
  'Kritsnam Technologies Pvt Ltd',
  'Dhaara Smart Ultrasonic Flow & Telemetry',
  'Water Tech / IoT & Clean Environment',
  'Smart IoT ultrasonic flow sensing and cloud telemetry hardware for municipal, industrial, and aquifer water extraction monitoring and continuous distribution accounting.',
  'Jal Jeevan Mission piped supply monitoring, municipal bulk water metering, and groundwater withdrawal compliance under Central Ground Water Authority.',
  'https://www.kritsnam.com',
  'https://www.kritsnam.com',
  'IIT Kanpur Incubated & Official Product Portal',
  'Company-published capability',
  'DPIIT recognized entity',
  'water telemetry; ultrasonic sensors; municipal water; iot flow meter; aquifer monitoring; water accounting',
  'Incubated at IIT Kanpur; compliant with CGWA telemetry guidelines; featured in NITI Aayog clean innovation showcase.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

INSERT INTO public.startup_directory (
  id,
  startup_name,
  product_or_solution,
  sector,
  public_capability_summary,
  potential_govinnovate_use_case,
  website,
  evidence_source_url,
  source_type,
  verification_status,
  dpiit_recognition_status,
  match_tags,
  data_notes
) VALUES (
  'DIR-NIMBLE-VISION-PVT-LTD',
  'Nimble Vision Pvt Ltd',
  'Ni-The Water Saviour IoT',
  'Water Tech / IoT & Clean Environment',
  'IoT-based water quality and consumption monitoring system with real-time turbidity, pH, TDS sensing, and automated pipeline leak detection.',
  'Urban municipal water distribution networks, overhead tank contamination alerts, and sewage pipeline flow monitoring.',
  'https://nimblevision.io',
  'https://nimblevision.io',
  'Official IoT Solutions Registry',
  'Company-published capability',
  'DPIIT recognized entity',
  'water quality; iot telemetry; ph sensing; turbidity; municipal water; leak detection; smart water',
  'Bengaluru-based water IoT startup recognized by MeitY and Smart City initiatives.'
)
ON CONFLICT (id) DO UPDATE SET
  product_or_solution = EXCLUDED.product_or_solution,
  sector = EXCLUDED.sector,
  public_capability_summary = EXCLUDED.public_capability_summary,
  potential_govinnovate_use_case = EXCLUDED.potential_govinnovate_use_case,
  website = EXCLUDED.website,
  evidence_source_url = EXCLUDED.evidence_source_url,
  source_type = EXCLUDED.source_type,
  verification_status = EXCLUDED.verification_status,
  dpiit_recognition_status = EXCLUDED.dpiit_recognition_status,
  match_tags = EXCLUDED.match_tags,
  data_notes = EXCLUDED.data_notes,
  updated_at = NOW();

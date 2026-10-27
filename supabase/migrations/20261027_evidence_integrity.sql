-- ============================================================================
-- GOVINNOVATE EVIDENCE INTEGRITY & BLOCKCHAIN REGISTRY SCHEMA
-- Migration: 20261027_evidence_integrity.sql
-- Description: Stores SHA-256 evidence records, version histories, and on-chain references
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.evidence_records (
    id TEXT PRIMARY KEY, -- e.g. 'EVID-2026-001'
    pilot_id TEXT NOT NULL,
    milestone_id TEXT,
    category TEXT NOT NULL DEFAULT 'Milestone Deliverable',
    original_filename TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_hash TEXT NOT NULL, -- SHA-256 hex string (lowercase 64 chars)
    version INTEGER NOT NULL DEFAULT 1,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    uploaded_by_role TEXT NOT NULL DEFAULT 'startup',
    blockchain_status TEXT NOT NULL DEFAULT 'Pending Registration'
        CHECK (blockchain_status IN ('Pending Registration', 'Registered On Blockchain', 'Integrity Verified', 'Integrity Mismatch', 'Blockchain Unavailable', 'Verification Failed')),
    blockchain_tx_hash TEXT,
    blockchain_block_number BIGINT,
    blockchain_timestamp TIMESTAMPTZ,
    blockchain_signer TEXT,
    is_simulated_blockchain BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.evidence_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evidence_id TEXT NOT NULL REFERENCES public.evidence_records(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    file_hash TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    blockchain_tx_hash TEXT,
    blockchain_block_number BIGINT,
    blockchain_timestamp TIMESTAMPTZ,
    CONSTRAINT unique_evidence_version UNIQUE (evidence_id, version)
);

CREATE INDEX IF NOT EXISTS idx_evidence_records_pilot_id ON public.evidence_records(pilot_id);
CREATE INDEX IF NOT EXISTS idx_evidence_records_file_hash ON public.evidence_records(file_hash);
CREATE INDEX IF NOT EXISTS idx_evidence_versions_evidence_id ON public.evidence_versions(evidence_id);

-- RLS
ALTER TABLE public.evidence_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View evidence records" ON public.evidence_records
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Insert evidence records" ON public.evidence_records
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Update evidence records" ON public.evidence_records
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "View evidence versions" ON public.evidence_versions
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Insert evidence versions" ON public.evidence_versions
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- ============================================================================
-- GOVINNOVATE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Version: 20261027_init_govinnovate_schema.sql
-- Description: Core schema for GovInnovate Public Sector Innovation Sandbox
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    organization_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('startup', 'government', 'evaluator', 'admin')),
    designation TEXT,
    identifier TEXT, -- DPIIT Number for startups, NIC/Employee ID for govt
    verification_status TEXT NOT NULL DEFAULT 'pending_verification' 
        CHECK (verification_status IN ('verified', 'pending_verification', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. STARTUP PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.startup_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    startup_name TEXT NOT NULL,
    dpiit_number TEXT NOT NULL,
    founder_name TEXT NOT NULL,
    description TEXT,
    industry TEXT NOT NULL DEFAULT 'Civic Tech & IoT',
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    team_size TEXT DEFAULT '1-10',
    years_of_experience INTEGER DEFAULT 1,
    website TEXT,
    location TEXT DEFAULT 'India',
    trl_level INTEGER DEFAULT 7 CHECK (trl_level BETWEEN 1 AND 9),
    local_content_percentage NUMERIC DEFAULT 50.0 CHECK (local_content_percentage BETWEEN 0 AND 100),
    patents_count INTEGER DEFAULT 0,
    verification_status TEXT NOT NULL DEFAULT 'verified'
        CHECK (verification_status IN ('verified', 'pending', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. GOVERNMENT CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.government_challenges (
    id TEXT PRIMARY KEY, -- e.g. 'CH-2026-WQ01' or UUID string
    title TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    department_name TEXT NOT NULL,
    ministry TEXT NOT NULL,
    category TEXT NOT NULL,
    eligibility_criteria TEXT[] DEFAULT ARRAY[]::TEXT[],
    required_deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
    budget_min NUMERIC,
    budget_max NUMERIC,
    budget TEXT NOT NULL,
    application_deadline TIMESTAMPTZ,
    pilot_duration TEXT NOT NULL DEFAULT '90 Days',
    evaluation_criteria JSONB DEFAULT '[]'::JSONB,
    target_locations INTEGER DEFAULT 5,
    scale_locations INTEGER DEFAULT 50,
    summary TEXT,
    expected_outcomes TEXT[] DEFAULT ARRAY[]::TEXT[],
    technical_thresholds TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT NOT NULL DEFAULT 'published'
        CHECK (status IN ('draft', 'published', 'Reviewing', 'Shortlisted', 'closed', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY, -- e.g. 'APP-WQ-101'
    challenge_id TEXT NOT NULL REFERENCES public.government_challenges(id) ON DELETE CASCADE,
    startup_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES public.startup_profiles(id) ON DELETE SET NULL,
    startup_name TEXT NOT NULL,
    proposal_summary TEXT NOT NULL,
    proposed_solution TEXT NOT NULL,
    proposed_cost TEXT NOT NULL,
    deployment_time TEXT NOT NULL DEFAULT '14 Calendar Days',
    financial_turnover TEXT DEFAULT 'Relaxation under GFR 149/170 applicable',
    trl_level INTEGER DEFAULT 7,
    local_content_percentage NUMERIC DEFAULT 65.0,
    patents_count INTEGER DEFAULT 1,
    evidence_links TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT NOT NULL DEFAULT 'Submitted'
        CHECK (status IN ('Submitted', 'Eligibility Verified', 'Shortlisted', 'Evaluated', 'Rejected')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_challenge_startup_user UNIQUE (challenge_id, startup_user_id)
);

-- 6. EVALUATIONS TABLE (5-Pillar Structured Framework)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    evaluator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    evaluator_name TEXT NOT NULL,
    innovation_score NUMERIC NOT NULL CHECK (innovation_score BETWEEN 0 AND 20),
    feasibility_score NUMERIC NOT NULL CHECK (feasibility_score BETWEEN 0 AND 20),
    impact_score NUMERIC NOT NULL CHECK (impact_score BETWEEN 0 AND 20),
    scalability_score NUMERIC NOT NULL CHECK (scalability_score BETWEEN 0 AND 20),
    viability_score NUMERIC NOT NULL CHECK (viability_score BETWEEN 0 AND 20),
    total_score NUMERIC NOT NULL CHECK (total_score BETWEEN 0 AND 100),
    justifications JSONB DEFAULT '{}'::JSONB,
    comments TEXT,
    evidence_references TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_application_evaluator UNIQUE (application_id, evaluator_id)
);

-- 7. PILOT MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.pilot_milestones (
    id TEXT PRIMARY KEY, -- e.g. 'M-01' or UUID
    application_id TEXT NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    pilot_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT NOT NULL,
    payout TEXT NOT NULL,
    payment_ref TEXT,
    status TEXT NOT NULL DEFAULT 'Pending Evidence'
        CHECK (status IN ('Pending Evidence', 'Submitted for Review', 'Approved', 'Disbursed')),
    evidence_description TEXT,
    evidence_url TEXT,
    completion_notes TEXT,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. AUDIT LOGS TABLE (Immutable Governance Trail)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    badge TEXT NOT NULL DEFAULT 'Procurement',
    entity_type TEXT,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pilot_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to fetch the role of current requesting user
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Profiles:
-- Any authenticated user can read public profile details (needed for collaboration/names)
CREATE POLICY "Public profile view" ON public.profiles
    FOR SELECT TO authenticated
    USING (true);

-- Users can update only their own profile
CREATE POLICY "Update own profile" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Startup Profiles:
CREATE POLICY "Startup profiles viewable by authenticated users" ON public.startup_profiles
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Startups can insert own profile" ON public.startup_profiles
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Startups can update own profile" ON public.startup_profiles
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Government Challenges:
-- Published challenges are public; drafts only visible to creator or admin
CREATE POLICY "View published challenges" ON public.government_challenges
    FOR SELECT TO authenticated
    USING (status != 'draft' OR created_by = auth.uid() OR public.get_auth_role() = 'admin');

-- Only government or admin users can insert challenges
CREATE POLICY "Government users can create challenges" ON public.government_challenges
    FOR INSERT TO authenticated
    WITH CHECK (public.get_auth_role() IN ('government', 'admin'));

-- Only challenge creator or admin can update challenge
CREATE POLICY "Government users can update own challenges" ON public.government_challenges
    FOR UPDATE TO authenticated
    USING (created_by = auth.uid() OR public.get_auth_role() = 'admin');

-- Applications:
-- Startups view own applications; Government & Evaluators view all applications
CREATE POLICY "View applications" ON public.applications
    FOR SELECT TO authenticated
    USING (
        startup_user_id = auth.uid() OR 
        public.get_auth_role() IN ('government', 'evaluator', 'admin')
    );

-- Startups can insert their own application
CREATE POLICY "Startups can submit application" ON public.applications
    FOR INSERT TO authenticated
    WITH CHECK (
        startup_user_id = auth.uid() AND
        public.get_auth_role() = 'startup'
    );

-- Government can update application status (Eligibility Verified, Shortlisted)
CREATE POLICY "Government can update application status" ON public.applications
    FOR UPDATE TO authenticated
    USING (public.get_auth_role() IN ('government', 'admin'));

-- Evaluations:
-- Evaluators view their own evaluations; Government & Admin can view all
CREATE POLICY "View evaluations" ON public.evaluations
    FOR SELECT TO authenticated
    USING (
        evaluator_id = auth.uid() OR 
        public.get_auth_role() IN ('government', 'admin', 'evaluator')
    );

-- Only Evaluators can insert scores
CREATE POLICY "Evaluators can insert evaluation" ON public.evaluations
    FOR INSERT TO authenticated
    WITH CHECK (
        evaluator_id = auth.uid() AND
        public.get_auth_role() = 'evaluator'
    );

-- Evaluators can update their own evaluation
CREATE POLICY "Evaluators can update own evaluation" ON public.evaluations
    FOR UPDATE TO authenticated
    USING (evaluator_id = auth.uid())
    WITH CHECK (evaluator_id = auth.uid());

-- Pilot Milestones:
CREATE POLICY "View pilot milestones" ON public.pilot_milestones
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Update pilot milestones" ON public.pilot_milestones
    FOR UPDATE TO authenticated
    USING (public.get_auth_role() IN ('startup', 'government', 'admin'));

-- Notifications:
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT TO authenticated
    USING (recipient_user_id = auth.uid());

CREATE POLICY "Users can mark own notification read" ON public.notifications
    FOR UPDATE TO authenticated
    USING (recipient_user_id = auth.uid());

-- Audit Logs:
CREATE POLICY "Authenticated users can read audit logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);

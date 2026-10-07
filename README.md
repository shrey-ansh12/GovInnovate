# GovInnovate - Startup-Friendly Public Procurement Platform

A modern GovTech web application prototype enabling government departments to identify, sandbox pilot, evaluate, procure, and scale innovative solutions from DPIIT-recognized startups under General Financial Rules (GFR 2017) startup exemptions.

---

## 🏛️ Problem Statement
> **“Startup-friendly public procurement mechanism that enables government departments to identify, pilot, procure, and scale innovative solutions from eligible startups.”**

---

## 🚀 Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix/Lucide Icons
- **Database / Backend Client:** Supabase (`@supabase/supabase-js`)
- **Animation & Interactive Effects:** `canvas-confetti`
- **Deployment Ready:** Vercel

---

## 🌟 3 User Roles & Capabilities
1. **Government Department (`/gov_dashboard`):**
   - AI Challenge Generator: Decompose unstructured departmental pain points into structured challenges with quantifiable SLAs.
   - AI Startup Matching: Real-time discovery of eligible startups with match scores & risk flags.
   - Application Review & DPIIT Verification: Validate GFR Rule 149/170 relaxations.
   - Pilot Management: Commission 90-day sandbox pilot with on-ground telemetry tracking.
   - Direct Procurement & Scale-Up: Approve validation findings and sanction commercial rollout from 5 to 50 locations.

2. **DPIIT Verified Startup (`/startup_dashboard`):**
   - Startup Profile: Showcase patents, TRL levels, and hardware specifications.
   - Direct Bid Submission: One-click proposal submission with AI proposal summarizer.
   - Milestone Tracking & PFMS Payments: Real-time milestone verification and direct treasury disbursements.

3. **Technical Evaluator (`/evaluator_dashboard`):**
   - 6-Pillar Evaluation Scorecard: Innovation, Feasibility, Impact, Scalability, Cost, and Security.
   - AI Proposal Highlights & Risk Detection.
   - Qualitative remarks and formal pilot recommendations.

---

## 🧪 Interactive Prototype Demo Scenario:
**“AI-Based Water Quality Monitoring & Predictive Contamination Warning System”**

Follow the guided flow using the top navigation bar:
1. **Challenge Created:** Jal Shakti posts an operational problem → AI translates it into structured SLAs.
2. **AI Matches 12 Startups:** AquaSense AI achieves top **94% match** based on TRL-8 optical probes and reagent-free design.
3. **Startup Applies:** AquaSense submits a proposal; prior turnover/experience penalty is waived under GFR 149/170.
4. **Eligibility Verified & Evaluated:** Evaluation committee awards **95/100 score**.
5. **90-Day Pilot Commissioned:** ₹28.5L budget allocated across 5 municipal intake reservoirs.
6. **Live KPI Monitoring:** Alert latency drops to 2.8 mins (target < 5.0 mins) with 99.8% sensor uptime.
7. **Validation Report:** Central Water Laboratory affirms **96.4/100** score.
8. **Procurement Recommendation Approved:** Special procurement pathway clears direct commercial contract.
9. **Scale-Up:** Sanction expansion from **5 sites to 50 municipal wards** (₹18.5 Cr budget).
10. **Audit Trail:** Inspect timestamped cryptographic audit logs of each decision.

---

## 🛠️ Local Development & Running
```bash
# Clone the repository
git clone <repo-url>
cd sustainathon

# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ☁️ Deployment on Vercel
1. Push code to GitHub/GitLab.
2. Import repository in [Vercel](https://vercel.com).
3. (Optional) Provide `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy!

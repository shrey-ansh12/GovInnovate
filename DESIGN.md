---
project: GovInnovate
version: 1.0.0
framework: Next.js (React 19, Tailwind CSS v4)
design_system:
  archetype: "Modern Trustworthy GovTech & Clean Civic SaaS"
  palette:
    primary:
      name: "Deep Civic Navy"
      hex: "#1e3a8a"
      tailwind: "blue-900"
    secondary:
      name: "Civic Sky Blue"
      hex: "#0284c7"
      tailwind: "sky-600"
    accent:
      name: "Sustainability Teal"
      hex: "#0d9488"
      tailwind: "teal-600"
    success:
      name: "Emerald Green"
      hex: "#10b981"
      tailwind: "emerald-500"
    warning:
      name: "Amber"
      hex: "#f59e0b"
      tailwind: "amber-500"
    danger:
      name: "Rose Red"
      hex: "#ef4444"
      tailwind: "rose-500"
    neutral_bg:
      name: "Slate Neutral Background"
      hex: "#f8fafc"
      tailwind: "slate-50"
    neutral_card:
      name: "White Card"
      hex: "#ffffff"
      tailwind: "white"
    neutral_border:
      name: "Subtle Slate Border"
      hex: "#e2e8f0"
      tailwind: "slate-200"
    text_primary:
      name: "Slate Dark Text"
      hex: "#0f172a"
      tailwind: "slate-900"
    text_muted:
      name: "Slate Subtitle Text"
      hex: "#64748b"
      tailwind: "slate-500"
  typography:
    heading_font: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    body_font: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    weights:
      bold: 700
      semibold: 600
      medium: 500
      regular: 400
  radii:
    card: "0.75rem (rounded-xl)"
    button: "0.5rem (rounded-lg)"
    badge: "9999px (rounded-full)"
  elevations:
    card: "shadow-sm hover:shadow-md border border-slate-200"
    modal: "shadow-2xl border border-slate-200"
---

# GovInnovate Design System Specification

## Brand Persona & Vibe
GovInnovate is a premier GovTech platform that connects Indian government departments with DPIIT-registered startups under General Financial Rules (GFR 2017) exemptions.

The UI should feel:
- **Authoritative & Trustworthy:** Clean structure, strong borders, crisp typography, official government badges (Ashok Chakra / Bharat GovTech aesthetics).
- **Modern & Delightful:** Subtle gradient header cards, glassmorphic accents, soft shadow hover micro-interactions, responsive mobile/desktop sidebars.
- **Data-Dense Yet Legible:** Key metrics (SLAs, TRL levels, audit hashes, telemetry readings) presented with clear contrast, iconography, and progress bars.

## Core Component Patterns
- **Header:** Sticky top navigation with role switcher (Government, Startup, Evaluator), live notifications badge, and interactive guide.
- **Hero & Stat Cards:** High contrast metric cards (`border border-slate-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md`).
- **Data Tables & Lists:** Alternating row highlights, status pill badges (Green for Approved, Blue for In Review, Amber for Pending, Indigo for Pilot Active).
- **Action Buttons:**
  - Primary: Gradient `bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-sm hover:shadow-md`
  - Secondary: `bg-white border border-slate-300 text-slate-700 hover:bg-slate-50`
  - Success / Approve: `bg-emerald-600 hover:bg-emerald-700 text-white`

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS / shadcn/ui configured as a Progressive Web App (PWA). Backend powered by self-hosted Supabase (PostgreSQL, Auth, PostgREST, Storage, Realtime, Edge Functions) deployed on a VPS.

## Users

1. **School Administration & Leadership (Directors, General Supervisors / Surveillants Généraux, Secretaries, Accountants):** Oversee daily operations, manage student/teacher lifecycle, enforce discipline and attendance, calculate trimester averages, publish bulletins, track tuition installments, and moderate student-teacher communications.
2. **Teachers:** Enter attendance, log session progress/curriculum pacing, enter control and synthesis grades, write individual pedagogical remarks (notes), submit diagnostic evaluations (strengths, gaps, remedial advice), assign homework, create online quizzes, and communicate with parents and administration.
3. **Parents / Guardians:** Monitor academic performance, view official bulletins, inspect attendance/tardiness, submit medical/excused absence justifications, inspect teacher remarks and diagnostic evaluations, review fee installments/receipts, and communicate with teachers. (Supports multi-child switching across classes/schools).
4. **Students (Collège 7th–9th grade & Lycée 1st–4th Bac):** View timetables, track grades and coefficient-weighted averages, view teacher remarks addressed to them, download course resources, submit assignments, take scheduled quizzes, and message teachers in moderated channels.
5. **Prospective Parents & Public:** Discover school offerings, academic calendar, and submit online pre-registrations.
6. **Platform SaaS Operators:** Provision tenants, configure academic templates, monitor tenant health, and manage subscriptions.

## Product Purpose

A multi-tenant private school management SaaS purpose-built for Tunisian preparatory (collège) and secondary (lycée) schools. It replaces fragmented paper registers, disparate spreadsheets, and unmoderated social media chats with a single, secure, bilingual (French/Arabic RTL) system of record that unifies academics, attendance, parent engagement, and financial installments.

## Positioning

Unlike generic international school software or localized spreadsheet hacks:
- Purpose-engineered for the **official Tunisian educational structure**: 3 trimesters, 0–20 grading scale, devoir de contrôle / devoir de synthèse weightings, level/section-specific coefficients, and official annual average formulas.
- Compliant with **Tunisian Personal Data Protection Law (Law 2004-63 / INPDP)** regarding minors' data and domestic hosting constraints.
- Built-in child safeguarding via administrative moderation of all student-teacher messaging and strict confidentiality controls (diagnostic evaluations are accessible to parents and staff, strictly hidden from students).
- Native handling of Tunisian financial standards (Tunisian Dinar in integer millimes, installment billing, timbre fiscal, matricule fiscal).

## Operating Context

- **Academic Calendar & Schedule:** September to June academic year, divided into 3 trimesters with council deliberative periods and bulletin generation. Weekly timetable runs Monday through Saturday noon, incorporating half-group allocations (groupes dédoublés) for science labs and computer science.
- **Regulatory & Privacy:** Governed by INPDP requirements for minors' data. Data hosted domestically or under verified data-transfer agreements.
- **Multilingual Environment:** Administration and official report cards typically in French; parent notifications and interface offered with full Arabic (RTL) fidelity as well as French and English.
- **Network Realities:** Operating in hybrid network conditions; PWA caching enables reliable access on mobile devices and variable school connectivity.

## Capabilities and Constraints

### Capabilities
- **Multi-Tenancy:** Complete tenant isolation enforced at the PostgreSQL Row-Level Security (RLS) layer with subdomain routing (`<school>.domain.tn`).
- **Academic Engine:** Configurable levels (7e de base through 4e Bac), specialized sections (Sciences, Maths, Info, Éco, etc.), subjects, coefficients, and weighted average computation.
- **Attendance & Discipline:** Session-by-session student and teacher attendance, incident tracking, absence justification workflows with parent attachments.
- **Grading & Reporting:** Gradebook with trimester locking, weighted average calculations, class rankings, and bilingual PDF report card (bulletin de notes) generation.
- **Teacher Remarks vs. Diagnostic Evaluations:**
  - *Teacher Notes/Remarks:* Visible to the student, parents, and administration.
  - *Diagnostic Evaluations:* Pedagogical assessments of gaps and remedies; visible to parents and administration, strictly hidden from students.
- **Moderated Communication:** Supervisor-monitored student-teacher messaging channels to protect minors and staff, alongside direct parent-teacher messaging.
- **Tuition & Billing:** Fee structures, installment scheduling, payment recording (cash, cheque, bank transfer; online payment gateway adapter in Phase 3), and official receipts denominated in millimes.
- **Public Portal:** Public landing site per tenant with an online pre-registration funnel.

### Constraints
- **Hosting:** Self-hosted Supabase stack on VPS (Tunisian datacenter prioritized for INPDP compliance).
- **Security:** RLS on all database tables and storage buckets; trigger-based audit logging for grades, financial records, and moderation actions.
- **Currency:** Integer millimes representation throughout the database and core logic.

## Brand Commitments

- **Working Codename:** Tanweer / EduTN (delegate naming finalized prior to public launch).
- **Tone:** Professional, reliable, institutional, clean, and culturally grounded in Tunisian educational traditions.
- **Design Architecture:** Per-tenant branding capabilities (school crest/logo and primary theme tokens) on top of an accessible, high-density design system.

## Evidence on Hand

- Verified Tunisian preparatory and secondary educational structure, section specializations, and trimester weighting norms.
- Comprehensive technical and architecture plan ([`implementation_plan.md`](file:///C:/Users/balha/.gemini/antigravity/brain/804f8a4d-7849-4c31-98a3-a6114a9c977a/implementation_plan.md)).
- Installed UI/UX and motion skill toolchain (`impeccable`, `ui-ux-pro-max`, `emilkowalski`, `taste-skill`, `magic-ui-generator-v2`).

## Product Principles

1. **Tunisian Academic Fidelity First:** The system must adhere precisely to Tunisian pedagogical conventions (coefficients, 20-point scale, trimesters, bulletin layouts) without requiring schools to bend their workflows.
2. **Child Protection & Administrative Accountability:** Minors' data is safeguarded by design; student-teacher interactions are strictly transparent to school leadership; diagnostic critiques are private to guardians and educators.
3. **High Density, Zero Friction:** Administrative and teacher workspaces must prioritize rapid keyboard navigation, clear data density, and instant feedback during high-volume tasks (attendance roll calls, grade entry sessions).
4. **Bilingual Parity:** Arabic (RTL) is a first-class citizen alongside French, with mirrored layouts, appropriate typographic hierarchy, and cultural adaptation.
5. **Rock-Solid Auditability:** Every grade modification, trimester lock, attendance change, and financial transaction is permanently and tamper-evidently logged.

## Accessibility & Inclusion

- WCAG 2.1 AA compliance across all public, parent, and student surfaces.
- First-class support for both Left-to-Right (French/English) and Right-to-Left (Arabic) typographic flows, with appropriate font pairing (e.g., Cairo/Tajawal for Arabic; Inter/Geist for Latin scripts).
- High readability on low-cost smartphones and varied display sizes via responsive PWA design.

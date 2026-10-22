---
name: "EduTN / Tanweer School Management OS"
description: "High-craft, anti-slop design system for Tunisian preparatory and secondary school management across 4 distinct functional spaces."
colors:
  # Canvas & Surface
  canvas: "#F8FAFC"
  surface: "#FFFFFF"
  surface-subtle: "#F1F5F9"
  border-hairline: "#E2E8F0"
  border-subtle: "#CBD5E1"
  
  # Text & Ink (Pure #000000 is strictly banned)
  text-primary: "#0F172A"
  text-secondary: "#475569"
  text-muted: "#64748B"
  text-inverted: "#FFFFFF"
  
  # Primary Brand Accent (Deep Emerald)
  primary: "#047857"
  primary-hover: "#065F46"
  primary-subtle: "#ECFDF5"
  primary-border: "#A7F3D0"
  
  # Semantic Statuses (Present / Late / Absent & Paid / Pending / Overdue)
  status-present-bg: "#ECFDF5"
  status-present-border: "#A7F3D0"
  status-present-text: "#065F46"
  status-present-dot: "#10B981"
  
  status-pending-bg: "#FFFBEB"
  status-pending-border: "#FDE68A"
  status-pending-text: "#92400E"
  status-pending-dot: "#F59E0B"
  
  status-absent-bg: "#FFF1F2"
  status-absent-border: "#FECDD3"
  status-absent-text: "#9F1239"
  status-absent-dot: "#F43F5E"

typography:
  display:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  ui:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  numeric-mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
    fontVariantNumeric: "tabular-nums"
  caption:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  micro:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.02em"

rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"

components:
  badge-present:
    backgroundColor: "{colors.status-present-bg}"
    textColor: "{colors.status-present-text}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-pending:
    backgroundColor: "{colors.status-pending-bg}"
    textColor: "{colors.status-pending-text}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  badge-absent:
    backgroundColor: "{colors.status-absent-bg}"
    textColor: "{colors.status-absent-text}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverted}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: EduTN / Tanweer OS

<!-- impeccable:design-schema 1 -->

## Overview
This design system governs the multi-tenant Preparatory & Secondary School Management OS (Tunisia). It enforces strict craftsmanship principles derived from `/design-taste-frontend-v1`, `/ui-ux-pro-max`, and `/impeccable`. The interface is designed as an institutional yet high-velocity Operating System built for 4 dedicated spaces:
1. **Administration Space** (`--density 8`): Linear-style data-dense workspace for directors, secretaries, general supervisors, and accountants.
2. **Teacher Space** (`--density 6`): Zero-friction split-screen workbench for session roll-calls, grade entry, and curriculum pacing.
3. **Student Space** (`--density 4`): Clean, structured Bento grid giving quick visibility into schedules, GPAs, homework, and teacher remarks.
4. **Parent Space** (Mobile-First): Streamlined consumer-fintech mobile experience with quick child-switching and bottom-tab navigation.

The design is completely bilingual with first-class Arabic (RTL) layout mirroring.

---

## Colors

### Canvas & Surface Hierarchy
- **Canvas / Root Background:** `#F8FAFC` (Warm Alabaster). All main viewport backgrounds use this tone; pure white is never used as an edge-to-edge canvas background.
- **Elevated Surfaces:** `#FFFFFF` (Pure White). Cards, panels, modal dialogs, and slide-overs use pure white to establish immediate figure-ground contrast against the Warm Alabaster canvas.
- **Hairline Borders:** `1px solid #E2E8F0`. Elevation is expressed primarily through crisp hairline borders, never through fuzzy, muddy shadows.
- **Subtle Surface Tint:** `#F1F5F9` for table headers, disabled states, and hover accents.

### Typography Ink (Anti-Pure-Black)
Pure `#000000` is **strictly prohibited**. It creates harsh optical vibration on digital displays:
- **Primary Text:** `#0F172A` (Slate 900) - for headings, key metrics, and primary table rows.
- **Secondary Text:** `#475569` (Slate 600) - for descriptive copy, metadata, and column headers.
- **Muted Text:** `#64748B` (Slate 500) - for timestamps, hints, and helper labels.

### Brand Accent (Deep Emerald)
- **Primary Brand Color:** `#047857` (Deep Emerald). Represents institutional authority, calm focus, and academic trust. Used for primary CTAs, active tab indicators, and key focus rings.
- **Primary Hover:** `#065F46`.
- **Subtle Accent Tint:** `#ECFDF5` with border `#A7F3D0` for active selection highlights.

### Semantic Status Badges
Status indicators pair a tinted background, a 1px border, high-contrast text, and a solid 6px dot:
- **Present / Paid / Validated:**
  - Background: `#ECFDF5` (Emerald-50)
  - Border: `#A7F3D0` (Emerald-200)
  - Text: `#065F46` (Emerald-800)
  - Indicator Dot: `#10B981` (Emerald-500)
- **Late / Pending / Justification Submitted:**
  - Background: `#FFFBEB` (Amber-50)
  - Border: `#FDE68A` (Amber-200)
  - Text: `#92400E` (Amber-800)
  - Indicator Dot: `#F59E0B` (Amber-500)
- **Absent / Overdue / Unjustified / Incident:**
  - Background: `#FFF1F2` (Rose-50)
  - Border: `#FECDD3` (Rose-200)
  - Text: `#9F1239` (Rose-800)
  - Indicator Dot: `#F43F5E` (Rose-500)

---

## Typography

### Font Families
1. **Primary UI & Headings:** `Plus Jakarta Sans`
   - High legibility at small sizes, crisp geometric terminals, and authoritative character.
   - Used for all navigation, headings, labels, button labels, and body copy.
   - Arabic pairing: `Cairo` or `Tajawal` for full Arabic RTL typographic harmony.
   - **Banned:** `Inter`, `Arial`, and system fallback serifs in dashboard contexts.

2. **Technical & Tabular Data:** `JetBrains Mono`
   - **Mandatory:** `font-variant-numeric: tabular-nums` (Tailwind class: `tabular-nums font-mono`).
   - Every single grade (0.00 to 20.00), trimester average, subject coefficient, student ranking, session timestamp, and financial amount in Tunisian Dinars/millimes **must** be rendered in `JetBrains Mono`.
   - Prevents column jitter during live updates, sorting, and inline grade editing.

### Hierarchy Scale
- **Metric Display:** `text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums`
- **Page Titles:** `text-xl md:text-2xl font-bold tracking-tight text-slate-900`
- **Section Headers:** `text-sm font-semibold uppercase tracking-wider text-slate-500`
- **Table / Cell Text:** `text-xs md:text-sm font-medium text-slate-800`
- **Metadata & Badges:** `text-xs font-medium`

---

## Layout

### Space Density Matrix (/ui-ux-pro-max)

```
+-----------------------------------------------------------------------------------+
| Space         | Density     | Primary Architecture        | Layout Mechanics      |
+-----------------------------------------------------------------------------------+
| Admin         | --density 8 | Linear-style dense cockpit  | Keyboard-first tables |
| Teacher       | --density 6 | Zero-friction split-screen  | Roster left / Work rt |
| Student       | --density 4 | Structured Bento grid       | 4-pillar overview     |
| Parent        | Mobile-1st  | Consumer-fintech bottom-tab | Child switcher + tabs |
+-----------------------------------------------------------------------------------+
```

#### 1. Admin Space (`--density 8` - Linear Style)
- Ultra-compact cell paddings (`py-2 px-3`).
- Borderless table bodies separated by clean 1px horizontal hairline rules (`divide-y divide-slate-200`).
- Global keyboard navigation (`j`/`k` list traversal, `/` search, `Esc` drawer close).
- Side-panel drawer inspector for student dossiers, absence audits, and installment ledgers without page navigation.
- No bulky card wraps for single metrics: KPIs are displayed in a unified strip separated by vertical hairline borders (`divide-x divide-slate-200`).

#### 2. Teacher Space (`--density 6` - Split-Screen Workbench)
- **Left Panel (35% width or 360px fixed):** Class roster list with instant status toggles (P/A/L keyboard hotkeys `1`/`2`/`3`).
- **Right Panel (65% width):** Active context workbench (e.g. Grade entry grid with automatic 0–20 validation, session progression diary, or diagnostic evaluation editor).
- Zero full-page reload or modal popups during session recording. Smooth `layoutId` transitions.

#### 3. Student Space (`--density 4` - Bento Grid)
- Responsive Bento layout (`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`):
  - **Tile 1 (2-col span):** Live Schedule & Next Class countdown with room code.
  - **Tile 2 (1-col span):** Current Trimester Weighted GPA & Ranking gauge (`font-mono tabular-nums`).
  - **Tile 3 (1-col span):** Homework & Submission Queue with due badges.
  - **Tile 4 (2-col span):** Teacher Remarks & Pedagogical Notes feed (addressed to student).
- Ample whitespace, comfortable touch targets, calm visual hierarchy.

#### 4. Parent Space (Mobile-First Consumer Fintech)
- **Sticky Top Bar:** Child Switcher pill carousel (switching active child immediately updates all views).
- **Primary Viewport:** Financial installment summary card (paid vs. remaining millimes with receipt download button), followed by today's attendance status and recent grades.
- **Fixed Bottom Navigation Bar (5 tabs):**
  1. Overview (Home)
  2. Bulletins & Grades
  3. Attendance & Justify
  4. Tuition & Invoices
  5. Messages (Moderated)
- Safe-area inset aware (`pb-safe`) for iOS and Android mobile web browsers.

### RTL (Right-to-Left) First-Class Mechanics
- Logical properties exclusively: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`.
- Numbers and grades remain LTR in Arabic contexts (`dir="ltr" font-mono`) to prevent misplaced decimals.
- Iconography respects spatial mirroring (back arrows mirror; clocks and search icons do not).

---

## Elevation & Depth

### The Hairline Border Rule
- **Primary Elevation Mechanism:** `1px solid #E2E8F0` hairline borders.
- **Shadow Elimination:** Heavy drop shadows (e.g., `shadow-lg`, `shadow-2xl`) are **strictly banned**.
- **Permitted Shadow:** Subtle contextual lift on hover:
  ```css
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.04);
  ```
- **Modal / Floating Popover:**
  ```css
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 1);
  ```

### Anti-Card Overuse & Anti-Nesting
- **Rule:** A card component must **never** contain another card component.
- Containers inside elevated surfaces use logical divider lines (`border-t border-slate-100`), subtle tinted backgrounds (`bg-slate-50`), or simple whitespace separation.

---

## Shapes

- **Base Radius:** `6px` (`rounded-md` in Tailwind). Gives a precise, professional tool aesthetic.
- **Badge & Pill Radius:** `9999px` (`rounded-full`) for status indicators and active child pills.
- **Button Radius:** `6px` (`rounded-md`).
- **Interactive Focus Ring:** `ring-2 ring-emerald-600/20 ring-offset-1 ring-offset-white`.
- **Dividers:** Clean `1px` lines with color `#E2E8F0`.

---

## Components

### 1. Status Badge
```html
<!-- Example: Present / Paid -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
  Présent / Payé
</span>

<!-- Example: Late / Pending -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
  <span class="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>
  En retard / En attente
</span>

<!-- Example: Absent / Overdue -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
  <span class="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true"></span>
  Absent / Impayé
</span>
```

### 2. High-Density Data Cell (Grades & Financials)
```html
<td class="px-3 py-2 text-right font-mono text-sm tabular-nums font-semibold text-slate-900">
  16.75<span class="text-xs text-slate-400 font-normal"> / 20</span>
</td>

<td class="px-3 py-2 text-right font-mono text-sm tabular-nums font-semibold text-slate-900">
  1,450.000 <span class="text-xs text-slate-500 font-sans font-medium">TND</span>
</td>
```

### 3. Split-Screen Roll Call Row (Teacher Workbench)
- Active student selection indicated by `bg-emerald-50/50 border-s-2 border-emerald-600`.
- Quick-action keyboard buttons for `[P]`, `[A]`, `[R]` (Retard) with instant optimistic state update.

---

## Do's and Don'ts

### Anti-Slop Lock (/design-taste-frontend-v1)

| ❌ STRICTLY BANNED (Anti-Patterns) | ✅ MANDATORY (The Standard) |
|---|---|
| **Purple/Blue AI Gradients** (linear-gradient from violet-600 to blue-500, glow effects) | **Monochrome Neutral Bases** (#F8FAFC, #FFFFFF) with singular Deep Emerald (#047857) accent |
| **Neon Cyberpunk Dark Modes** with glowing borders | **Warm Alabaster Canvas** (#F8FAFC) with crisp hairline borders (#E2E8F0) |
| **Inter or Arial** fonts for main headings/UI | **Plus Jakarta Sans** for UI/Headings and **JetBrains Mono** for all data/metrics |
| **Pure #000000 Black** ink | **#0F172A Slate-900** for high-contrast, zero-vibration typography |
| **Cards inside cards** nested ad-infinitum | **Flat data hierarchy** using `divide-y`, `divide-x`, and whitespace |
| **Heavy diffuse drop shadows** (`shadow-xl`) | **Crisp 1px solid #E2E8F0 hairline borders** |
| **Emoji icons** in place of UI symbols | **Crisp SVG iconography** (Lucide / Phosphor) with consistent 1.5px stroke |
| **Proportional fonts for numbers** | **`tabular-nums font-mono`** for all grades, coefficients, and amounts |
| **Centered hero layouts on dashboards** | **Asymmetric, split-screen, or dense grid layouts** tailored to user role |

<div align="center">

# ✈️ AeroInfo

**Global Airport Intelligence & Traveler Guide**

*Everything you need to know before flying: 100 ml liquid limits and 3D scanners, drone regulations, terminals, charging outlets, and transportation — verified directly by airport authorities.*

[![Official Domain](https://img.shields.io/badge/Domain-www.aero--info.eu-0284c7?style=for-the-badge&logo=spaceship)](https://www.aero-info.eu)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-white?style=for-the-badge&logo=vercel)](https://www.aero-info.eu)
[![Security Audited](https://img.shields.io/badge/Security-A%2B%20Certified-emerald?style=for-the-badge&logo=securityscorecard)](https://www.aero-info.eu)

[🌐 **Visit the Live App**](https://www.aero-info.eu) • [💬 **Send Feedback**](https://www.aero-info.eu/feedback) • [🔕 **Manage Email Preferences**](https://www.aero-info.eu/unsubscribe) • [📄 **Security Report**](tests/security.test.ts)

</div>

---

## 📖 Project Overview

**AeroInfo** (`aero-info.eu`) is a modern, high-performance web platform focused on usability for international travelers. Its guiding principle is **“2-Click to Info”**: helping any passenger find the exact rules for their trip—3D scanners, liquid containers, water bottles, drones, terminals, and power outlets—in under 2 seconds.

All displayed data comes from verified official channels or an autonomous compilation engine that checks for discrepancies. When information comes from community reports awaiting official confirmation, it is clearly identified with explanatory, dismissible badges.

---

## 🌟 Key Features

### 🔍 1. Instant, Universal Search & Welcome Experience
- **Clean welcome page:** When users open the portal, they are greeted by an elegant, uncluttered interface with quick links to major international hubs, without being forced to select predefined airports.
- Instantly search by **IATA code** (`FCO`, `MXP`, `CDG`, `DXB`, `BCN`, `JFK`), ICAO code, airport name, city, or country.
- **Global keyboard shortcut:** Press `/` or `Cmd+K` from anywhere on the page to search.
- Recent search history is saved locally and securely, without intrusive cookies.
- Request the addition of new airports to the index, with email notifications (GDPR-compliant).

### 🛡️ 2. Security Regulations & 3D Scanners (EDS-CB C3)
- A clear distinction between airports with **active 3D computed tomography scanners** (liquids over 100 ml and laptops may remain in carry-on baggage) and those following **standard 100 ml rules** (a transparent 1-liter bag is required, and items must be removed at the checkpoint).
- Specific rules for **drones and lithium batteries/power banks** (carriage in the cabin vs. prohibition in checked baggage).
- Estimated average security wait times and recommended arrival times for domestic and intercontinental flights.

### 🛩️ 3. General Aviation & Private Flights
- Classification and a **dedicated tag for non-commercial airports** or airports serving general and private commercial aviation (e.g., Rome Urbe `QUR`).
- Specific alerts and contextual banners with recommendations for airline passengers who accidentally search for these airports.

### 🌐 4. Official Authority Resolution & Search-Engine Link Filtering
- A strict validation module (`aviation-authority.ts`) that **categorically removes links to Google or Bing search results**.
- Automatic resolution and fallback to official civil aviation and national airport operator websites (ENAC, AENA, DGAC, ADV, CAA, EGSA, ONDA, etc.).

### 🖼️ 5. Unified Airport Dossier Frame
- A single, unified view: the entire information page for the selected airport (header, statistics, tabs, and contacts) is enclosed in a **consistent visual frame**, making the dossier boundaries easy to identify while scrolling.

### 💡 6. Floating “Suggest an Edit” Button
- A **floating action button** stays visible while scrolling, allowing travelers to report changes at any time.
- **Controlled processing:** Submitted changes are **not published immediately**; they are recorded in the background.
- If a report has not yet been confirmed on the airport’s official website, a **dismissible (“i”) disclaimer** alerts passengers that changes may be forthcoming and recommends standard precautions.
- The automatic synchronization engine (`/api/cron/sync`) periodically checks reports against official sources.

### 🗺️ 7. Interactive Terminal Maps & Points of Interest
- A visual, navigable layout of terminals, concourses, gates, and departure/arrival areas.
- Filterable points of interest: 230 V outlets and USB ports, free drinking-water fountains, restaurants, bars and cafés, duty-free shops, and pharmacies.

### 🍪 8. Cookie Consent & Privacy Management (GDPR & ePrivacy)
- A lightweight, unobtrusive cookie consent banner and modal, with preferences saved in `localStorage`.
- No third-party tracking cookies or advertising pixels.

### 🔕 9. Email Notification Unsubscribe Portal (`/unsubscribe`)
- A GDPR-compliant page that lets users immediately unsubscribe from any previously requested airport update or scan notification.
- Cryptographic validation and secure unsubscribe tokens, with real-time feedback.

### 💬 10. Feedback & User Contact Portal
- A dedicated [`/feedback`](https://www.aero-info.eu/feedback) page for comments, suggestions, general questions, and bug reports.
- Abuse protection, rate limiting, and instant administrator notifications.

### 🌍 11. Bilingual & Accessible (IT / EN)
- Full Italian/English support, with preferences applied immediately.
- High-contrast colors, Dark/Light mode support, ARIA labels, and full keyboard navigation.

---

## 🔒 Security & Production Certification

The project has undergone an **in-depth security review** and meets all requirements in the automated test suite:

```text
🔒 AUTOMATED SECURITY TEST SUITE:
  ✅ HTML escaping (XSS prevention and email injection protection)
  ✅ RFC 5322 email address format validation
  ✅ PostgREST parameter sanitization (.or, .ilike AST injection defense)
  ✅ Sliding-window rate limiter (returns 429 after more than 5 requests / 10 min per IP)
  ✅ HTTP security headers (CSP, 2-year HSTS, X-Frame-Options DENY, nosniff, Referrer, Permissions)
  ✅ SSRF protection (strict blocking of private IPs, loopback, and link-local cloud metadata)
  ✅ Unsubscribe parameter validation and security (/unsubscribe)
  ✅ Official authority resolution and general aviation classification

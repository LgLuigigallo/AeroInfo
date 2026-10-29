<div align="center">

# ✈️ AeroInfo

**Smart Airport Guide & Traveler Intelligence**

*Everything you need to know before flying: 100ml liquid rules, 3D CT scanners, drone and battery regulations, terminals, charging stations, and transit options — verified against official airport authority sources.*

[![Official Domain](https://img.shields.io/badge/Domain-www.aero--info.eu-0284c7?style=for-the-badge&logo=spaceship)](https://www.aero-info.eu)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-white?style=for-the-badge&logo=vercel)](https://www.aero-info.eu)

[🌐 **Web App**](https://www.aero-info.eu) • [💬 **Feedback**](https://www.aero-info.eu/feedback) • [🔕 **Unsubscribe**](https://www.aero-info.eu/unsubscribe) • [🔐 **Privacy & Cookie Policy**](https://www.aero-info.eu/privacy)

</div>

---

## 📖 Project Overview

**AeroInfo** ([aero-info.eu](https://www.aero-info.eu)) is a modern, high-performance web platform designed for international air travelers. Its core principle is **"2-Click to Info"**: enabling passengers to quickly check security checkpoint policies (3D scanner availability, liquid limitations, laptop extraction rules, terminal layouts, and essential services) in seconds.

All published airport intelligence is verified against official airport authority channels and regulatory standards. Community suggestions undergo validation prior to catalog publication.

---

## 🌟 Key Features

### 🔍 1. Fast & Frictionless Search Experience
- **Minimalist Interface:** Clean, distraction-free home view optimized for mobile and desktop screens alike.
- Instant search by **IATA code** (e.g. `FCO`, `MXP`, `NAP`, `BGY`, `VCE`, `JFK`, `DXB`), ICAO code, airport name, city, or country.
- **Global Keyboard Shortcut:** Press `/` or `Cmd+K` anywhere on the page to open search instantly.
- Localized search history stored securely in the browser without invasive third-party tracking.
- Airport catalog request system allowing travelers to request new airport additions with opt-in GDPR-compliant email notifications.

### 🛡️ 2. Security Checkpoint Regulations & 3D Scanners (EDS-CB C3)
- Clear distinction between airports equipped with **operational 3D CT scanners** (where liquids over 100ml and electronics can remain inside carry-on luggage) and airports following **standard regulations** (100ml container limits in clear resealable bags, extracted at the checkpoint).
- Detailed rules for **drones, lithium batteries, and power banks** (cabin allowance vs. cargo hold bans).
- Estimated wait times and recommended terminal arrival advance notice.

### 🛩️ 3. General Aviation & Private Flight Classification
- Dedicated classification and warning banners for non-commercial airfields or hubs reserved for general/private aviation (e.g., Rome Urbe `QUR`), preventing consumer booking errors.

### 🌐 4. Official Authority Resolution
- Strict validation that exclusively links to primary airport authority and civil aviation portals (ENAC, ADR, SEA, AENA, DGAC, etc.), filtering out search engines or unverified aggregators.

### 💡 5. Community Suggestions & Updates
- Interactive floating prompt allowing travelers to submit updates or corrections.
- Submissions are logged, cross-checked against official airport sources, and verified before being published.

### 🗺️ 6. Terminal Layouts & Amenities
- Terminal concourse overviews, gate areas, charging spots (230V outlets and USB ports), free drinking water fountains, dining, and duty-free options.

### 🍪 7. Privacy & GDPR Compliance
- Transparent, lightweight cookie consent with local storage persistence.
- Zero third-party tracking cookies or advertising pixels.
- Dedicated [`/unsubscribe`](https://www.aero-info.eu/unsubscribe) portal for one-click opt-out from notification updates.

### 🌍 8. Bilingual & Accessible (IT / EN)
- First-class English and Italian language support with persistent user preferences.
- Native Dark and Light mode support, accessible contrast ratios, full keyboard navigation, and screen reader friendliness.

---

## 🔒 Security & Reliability

The application codebase incorporates defense-in-depth measures verified through an automated test suite:

- **XSS & Injection Defenses:** Strict HTML escaping and PostgREST AST query sanitization.
- **Input Validation:** RFC 5322 compliance for email addresses and strict payload size limits.
- **Rate Limiting:** Sliding-window rate limiters protecting public endpoints from automated abuse.
- **HTTP Security Headers:** Content Security Policy (CSP), 2-year HSTS with preload, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.
- **SSRF Protection:** Outbound URL validation blocking private IPs, loopback, and cloud metadata targets.
- **Resilient Edge Routing:** Canonical 308 IATA redirects and centralized 404/500 error boundaries handled directly by Next.js App Router.

---

## 🧭 Restricted Admin Area

AeroInfo includes an authenticated management console (`/admin`) for reviewing community suggestions, managing the airport catalog, and monitoring synchronization schedules.

- Access is restricted to authorized administrative accounts via OAuth authentication.
- Administrative operations are recorded in an internal audit trail.
- High-privilege credentials (`service_role`) are strictly kept on the server and never exposed to the client browser.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prefetching, Cache Components), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), Geist font family (self-hosted) |
| **Backend & Routing** | Next.js Serverless Route Handlers & Edge Proxy |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security) |
| **Parser & Scraping** | [Cheerio](https://cheerio.js.org/), SSRF outbound validator, automated sync engine |
| **Transactional Email** | [Nodemailer](https://nodemailer.com/) (Gmail SMTP) & [Resend](https://resend.com/) with fallback |
| **Hosting & CDN** | [Vercel](https://vercel.com/) (Anycast Edge Network, Vercel Cron, Automated SSL) |
| **Domain & DNS** | [Spaceship](https://www.spaceship.com/) + Vercel Anycast DNS (`aero-info.eu`) |

---

## 📁 Project Structure

```
AeroInfo/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (admin)/                 # Restricted admin console
│   │   ├── (en)/                    # Localized English routes and pages
│   │   ├── (it)/                    # Localized Italian routes and pages
│   │   ├── api/                     # Backend API handlers (catalog, requests, feedback, cron)
│   │   ├── feedback/                # Feedback submission page
│   │   ├── unsubscribe/             # GDPR notification opt-out portal
│   │   ├── not-found.tsx            # Branded 404 error page
│   │   ├── robots.ts                # Dynamic robots.txt generation
│   │   ├── sitemap.xml/             # Dynamic sitemap.xml generation
│   │   └── layout.tsx               # Root layout with metadata and OpenGraph configuration
│   ├── components/                  # UI components (Header, Footer, SearchBar, Dossier)
│   ├── data/                        # Curated static airport dataset
│   ├── lib/                         # Business logic, security, email, and database clients
│   ├── proxy.ts                     # Edge proxy for IATA redirects and canonical routing
│   └── types/                       # TypeScript interfaces and definitions
├── supabase/                        # Database schema and PostgreSQL migrations
├── tests/                           # Automated test suites (security, SEO, admin unit)
└── next.config.ts                   # Next.js configuration and security headers
```

---

## 💻 Local Development

### Prerequisites
- Node.js 20+
- npm or pnpm

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/LgLuigigallo/AeroInfo.git
cd AeroInfo

# 2. Install dependencies
npm install

# 3. Configure environment variables (copy from example template)
cp .env.example .env.local

# 4. Start the development server
npm run dev

# 5. Run automated test suites
npm test

# 6. Verify production build
npm run build
```

The application will be accessible at `http://localhost:3000`.

---

## 👨‍💻 Author & Maintenance

Developed and maintained by **Luigi Gallo**.

- 📧 Email: [vireontech@gmail.com](mailto:vireontech@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/luigigallo12](https://www.linkedin.com/in/luigigallo12)
- 🌐 Live App: [www.aero-info.eu](https://www.aero-info.eu)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
Airport names, marks, and operating regulations remain the property of their respective governing authorities.

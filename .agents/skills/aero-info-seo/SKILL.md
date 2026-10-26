---
name: aero-info-seo
description: >
  Evidence-led SEO and GEO planning, audits, and implementation for AeroInfo.
  Use when changing airport pages, metadata, indexing, sitemaps, structured data,
  localized content, or search measurement.
---

# AeroInfo SEO and GEO

Use the [Agentic SEO Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) as a methodological reference. This project-local adaptation is intentionally narrow; it does not install or run the upstream package or its scripts.

## Required workflow

1. Read `strategia-seo.md` and identify the next open task and its dependencies.
2. Collect direct evidence before making claims. Prefer official airport, regulator, or transport-operator sources for facts; label evidence `Confermato`, `Probabile`, `Ipotesi`, or `Sconosciuto`.
3. Record each finding with area, severity, confidence, evidence, impact, and proposed correction. Order actions by impact, effort, and dependency.
4. For airport content, verify identity, location, source, date, language coverage, and local specificity. Never turn generic defaults or an application request into SEO approval. Unverified or thin records remain `pending_quality`/`blocked`, `noindex`, and outside the sitemap.
5. Keep Italian and English titles, descriptions, content, canonical URLs, and reciprocal alternates aligned. Structured data must match visible content; do not invent reviews, facilities, policies, or credentials.
6. Change the strategy checklist only after focused evidence verifies the acceptance criteria. Record date, evidence, and unresolved limits.

## Project safeguards

- Work only on the current isolated `codex/*` branch. Keep all changes reversible; never merge, deploy, promote Preview to Production, or write to Production Supabase as part of SEO work.
- Use the separate `aero-info-staging` Supabase project for writes. Before each write, confirm target project and prepare a narrow rollback.
- Do not run the full cron against staging while operational requests are queued; use isolated fixtures or targeted operations.
- Do not promise rankings, traffic, citations, or indexing. Distinguish crawlability from indexing and report Search Console/Bing evidence when available.
- Follow repository `AGENTS.md`, including reading the matching local Next.js 16 documentation before changing application code.

## Prioritization

- **Blocker:** proven crawl/indexing failure, incorrect safety-critical airport fact, or exposure of private routes/data.
- **High:** verified defect affecting many eligible pages, locale signals, canonicalization, or sitemap correctness.
- **Medium:** material content, internal-link, schema, or measurement improvement with evidence.
- **Low:** speculative ranking hypothesis or cosmetic refinement; gather evidence before implementation.

## Audit coverage

When the plan calls for an audit, cover only relevant areas: crawl/indexability, status/redirects, canonical/hreflang, sitemap/robots, internal links, titles/headings/content usefulness, primary-source freshness, structured data, accessibility/images, performance including INP, and AI crawler access. State what could not be observed; absence of evidence is not a confirmed defect.

## Upstream attribution

Adapted as original project guidance from the evidence-first workflow and prioritization principles in the MIT-licensed [Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill), Copyright (c) 2026 Bhanu Namikaze and agricidaniel. See its [MIT license](https://github.com/Bhanunamikaze/Agentic-SEO-Skill/blob/main/LICENSE). No upstream scripts or substantial text are bundled here.

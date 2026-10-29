<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AeroInfo Official UI & Design Rule (STRICT & IMMUTABLE)

- **100% Borderless Minimalist Aesthetic**: All cards, interactive bubbles, airport identification headers, step cards, and FAQ accordions MUST remain **completely borderless** (no `border`, `border-t`, `border-b`, `border-[#...]`, `dark:border-zinc-*`, or `hover:border-*`).
- **Elevation via Soft Shadows & Background Contrast**: Visual grouping, separation, and hierarchy must rely solely on:
  - Background colors (`bg-white dark:bg-zinc-900`, `bg-[#E8F1F2]`, etc.)
  - Subtle shadows (`shadow-xs`, `shadow-2xs`, `hover:shadow-md`, `hover:shadow-lg`)
  - Micro-interactions (`hover:-translate-y-0.5`, `hover:-translate-y-1`, smooth transitions)
- **Protected Elements (NEVER add borders/frames to these)**:
  1. The 4 interactive airport bubbles (Liquidi, Bagagli, Altre Regole, Mappa) in `AirportBubblesView.tsx`.
  2. The Airport Identification Card & Official Verification Badge in `AirportBubblesView.tsx`.
  3. The 3 homepage step/guide cards in `WelcomeView.tsx`.
  4. The FAQ container (`<details>`) and inner FAQ cards in `AirportFaqSection.tsx`.
- **EXCEPTION**: ONLY if the user explicitly and directly requests a border on a specific element. Never re-add borders under any other circumstances.


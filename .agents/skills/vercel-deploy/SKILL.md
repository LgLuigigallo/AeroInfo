---
name: vercel-deploy
description: Comprehensive deployment, configuration, and environment management skill for Vercel. Covers project linking, automated deployments, Vercel Cron jobs, Next.js 16 App Router optimizations, custom domains, and production secrets management.
---

# Vercel Deployment & Production Operations Skill

This skill provides expert operational guidance for deploying full-stack web applications on Vercel, configuring automated CI/CD pipelines, provisioning production environment variables, setting up recurring cron jobs, and troubleshooting deployments.

## Core Workflows & CLI Capabilities

### 1. Pre-Deployment Readiness Check
Before deploying to Vercel, ensure:
1. **Next.js Production Build:** `npm run build` executes cleanly with zero TypeScript or bundling errors.
2. **Environment Variables:** Verify all required client and server variables are documented in `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET`
3. **Cron Jobs Configuration:** Confirm `vercel.json` defines valid cron expressions:
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/sync",
         "schedule": "0 2 * * 1"
       }
     ]
   }
   ```

### 2. Vercel CLI Authentication & Linking
Vercel commands can be executed directly via `npx vercel`:

- **Login / Verify Identity:**
  ```bash
  npx vercel whoami
  ```
  If not logged in:
  ```bash
  npx vercel login
  ```

- **Link Local Codebase to Vercel Project:**
  ```bash
  npx vercel link
  ```
  Prompts for organization, project name, and root directory (`./`). Creates `.vercel/project.json`.

- **Pull Environment Variables:**
  ```bash
  npx vercel env pull .env.local
  ```

### 3. Deployments: Preview & Production

- **Deploy Preview (Staging):**
  ```bash
  npx vercel
  ```
  Returns a unique preview URL (e.g. `https://aero-info-git-branch-team.vercel.app`).

- **Deploy to Production:**
  ```bash
  npx vercel --prod
  ```
  Builds and deploys directly to the production domain (e.g. `https://aeroinfo.vercel.app`).

### 4. Setting Production Environment Variables via CLI
To securely add variables without committing them to git:
```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel env add CRON_SECRET production
```

### 5. Vercel Cron Protection
In Next.js App Router route handlers (e.g. `/api/cron/sync/route.ts`), protect the cron endpoint by verifying Vercel's authorization header:
```typescript
const authHeader = request.headers.get('authorization');
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return new Response('Unauthorized', { status: 401 });
}
```
Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` when triggering cron jobs if `CRON_SECRET` is set in project environment settings.

### 6. Troubleshooting Common Issues
- **Missing Environment Variables at Build Time:** In Next.js, `NEXT_PUBLIC_` variables must be available during `next build` if referenced in static page generation.
- **Dynamic Server Usage in Route Handlers:** When using `request.headers` or `searchParams`, Next.js correctly flags the route as dynamic. Ensure dynamic functions are not placed in purely static paths.

---
name: supabase-ops
description: Comprehensive operations and management guide for Supabase (PostgreSQL, Schema Migrations, RLS, Edge Functions, Client SDK, and Data Seeding). Use whenever interacting with Supabase databases, generating SQL schemas, configuring Row Level Security, or syncing data.
---

# Supabase Operations & Database Management Skill

This skill provides expert operational guidance for administering Supabase PostgreSQL databases, designing secure schemas, executing automated migrations, managing Row Level Security (RLS) policies, and integrating the JavaScript/TypeScript SDK.

## Key Principles & Operational Workflows

### 1. Database Architecture & Schema Design
- **UUID Primary Keys:** Use `uuid_generate_v4()` for all primary keys.
- **Relational Integrity:** Foreign keys must define explicit `ON DELETE CASCADE` or `ON DELETE SET NULL`.
- **Full-Text Search:** Create GIN indexes with `to_tsvector('simple', ...)` for multilingual search support.
- **Timestamp Auditing:** Include `created_at` and `updated_at` timestamps (`TIMESTAMPTZ DEFAULT NOW()`).

### 2. Row Level Security (RLS) Best Practices
- Every table MUST have `ENABLE ROW LEVEL SECURITY;`.
- Default to **read-only public access** for catalog/intelligence data:
  ```sql
  CREATE POLICY "Public read-only access" ON public.airports FOR SELECT USING (true);
  ```
- Write operations (INSERT, UPDATE, DELETE) should only be permitted by authenticated service roles (`auth.role() = 'service_role'`) or via secret API route handlers.

### 3. Automated Seeding & Environment Setup
- Keep `.env.example` updated with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- Provide fallback mechanisms so the application functions seamlessly in local offline/development mode using certified memory structures when database credentials are not yet supplied.

### 4. Continuous Ingestion & Syncing
- Execute weekly differential updates against official source hashes.
- Track execution status, records processed, and schema discrepancies in a dedicated `sync_logs` table.

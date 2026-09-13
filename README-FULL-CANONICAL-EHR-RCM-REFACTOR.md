# Therassistant Full Canonical EHR + RCM Refactor

This ZIP is an overwrite-first refactor for your existing Next.js project.

It implements the requirements you provided:

- Do not let each UI page invent its own model.
- Use canonical names only: `patients`, `appointments`, `encounters`, `clinical_notes`, `encounter_service_lines`, `claims`, `claim_service_lines`, `workqueue_items`, `support_tickets`.
- Locked operational flow:

```text
Patient
  ↓
Insurance Policy
  ↓
Eligibility Check 270/271
  ↓
Appointment
  ↓
Encounter
  ↓
Clinical Note + Diagnosis + Service Lines
  ↓
Claim 837P
  ↓
Claim Status 999 / 277CA / 276-277
  ↓
ERA 835
  ↓
Payment Posting + Adjustments
  ↓
Workqueue Items / Appeals / Patient Balance
```

## What this overwrites

Visible pages:

```text
app/page.tsx
app/scheduling/page.tsx
app/patients/page.tsx
app/patients/[id]/page.tsx
app/clients/page.tsx
app/clients/[id]/page.tsx
app/encounters/page.tsx
app/encounters/[id]/page.tsx
app/claims/page.tsx
app/claims/[id]/page.tsx
app/payments/page.tsx
app/workqueue/page.tsx
app/billing/*
app/admin/schema-verification/page.tsx
```

Shared shell and model files:

```text
components/layout/AppShell.tsx
components/canonical-ehr/CanonicalEhrApp.tsx
lib/canonical-ehr/*
lib/appointments/startEncounter.ts
lib/encounters/status.ts
lib/workqueue/model.ts
```

Database:

```text
supabase/migrations/20260428_full_canonical_ehr_rcm.sql
supabase/seed/full_canonical_ehr_rcm_seed.sql
database/schema.sql
database/seed.sql
```

## Install safely with Git

From your project root:

```powershell
git status
git checkout -b full-canonical-ehr-rcm-refactor
```

Copy the ZIP contents into your project root and allow overwrites.

Then:

```powershell
npm install
npm run lint
npm run build
npm run dev
```

## What you should see

Open:

```text
http://localhost:3000
```

You should see a new dashboard with:

- canonical workflow banners
- scheduling
- patient chart
- encounters
- claims
- payments
- workqueue
- schema verification

## Main demo flow

1. Open Scheduling
2. Check Eligibility
3. Start Encounter
4. Open Encounter Workspace
5. Sign Note
6. The system automatically routes ready encounter to Billing Workqueue
7. Open Workqueues
8. Scrub the ready-to-bill item
9. Create Claim
10. Submit 837P
11. Accept / reject / deny
12. Import 835 ERA + post payment

## Important

This UI uses an in-memory canonical seed so the workflow is immediately visible and testable without needing Supabase credentials.

The included SQL migration is the production schema foundation. Wire Supabase persistence after the visible workflow is accepted.

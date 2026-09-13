# Therassistant Visible Integration Upgrade

This ZIP is the follow-up integration pass. The previous upgrade added the appointment-first encounter/workqueue spine, but your visible app did not change because existing navigation and pages were not wired to it.

This ZIP includes full replacement/additive files that make the workflow visible.

## What changes visibly

- Top navigation now includes:
  - Scheduling
  - Encounters
  - Workqueue
  - Billing
- Scheduling page now shows appointment cards with:
  - Appointment Detail
  - Start Encounter
- Encounter list page now links to the Encounter Workspace.
- Workqueue page now displays real `workqueue_items`, including clinician Route to Biller messages.
- Home page now points users into the appointment-first workflow.

## Drop-in files included

- `components/layout/AppShell.tsx`
- `app/page.tsx`
- `app/scheduling/page.tsx`
- `app/encounters/page.tsx`
- `app/workqueue/page.tsx`
- all files from the appointment-first encounter/workqueue module:
  - `app/appointments/[id]/page.tsx`
  - `app/encounters/[id]/page.tsx`
  - appointment start API route
  - note sign API route
  - route-to-biller API route
  - scrub API route
  - encounter components
  - workqueue model
  - Supabase migration
  - smoke test

## Git workflow

From your repo root:

```powershell
git status
git checkout -b visible-appointment-first-integration
```

Copy these files into your repo, then run:

```powershell
npm run dev
```

Then open:

```txt
/scheduling
/encounters
/workqueue
```

Do not use lint as the first verification step. Your repo already has unrelated lint errors. Use runtime verification first.

## Expected flow

```txt
Scheduling
  → Start Encounter
  → Encounter Workspace
  → Sign Note
  → auto-create ready_to_bill workqueue item
  → Route to Biller creates billing_review/coding/eligibility/etc. ticket
  → Workqueue shows ticket linked to appointment + encounter
  → Billing scrub
  → Create Claim
```

## Supabase

Run the migration:

```txt
supabase/migrations/20260428_appointment_first_encounter_workqueue.sql
```

It creates/upgrades:

- `clinical_notes`
- `encounter_diagnoses`
- `encounter_service_lines`
- `workqueue_items`
- `workqueue_events`
- encounter billing/documentation/status columns

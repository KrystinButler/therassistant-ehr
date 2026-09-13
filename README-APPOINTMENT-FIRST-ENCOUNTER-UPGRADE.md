# Appointment-First Encounter + Billing Workqueue Upgrade

This ZIP adds an appointment-first workflow to TheraAssistant.

## What this upgrade adds

Normal flow:

```text
Appointment
  ↓ Start Encounter
Encounter Workspace
  ↓ Clinician signs note
Automatic readiness audit
  ↓
workqueue_items.queue_type = ready_to_bill
  ↓ Biller scrubs encounter
Claim can be created from encounter
```

## Files included

```text
app/appointments/[id]/page.tsx
app/api/appointments/[appointmentId]/start-encounter/route.ts
app/api/encounters/[encounterId]/notes/sign/route.ts
app/api/encounters/[encounterId]/route-to-biller/route.ts
app/api/encounters/[encounterId]/scrub/route.ts
app/encounters/[id]/page.tsx
components/appointments/StartEncounterButton.tsx
components/encounters/AppointmentFirstEncounterWorkspace.tsx
components/encounters/BillingWorkqueuePanel.tsx
components/encounters/ClinicalDocumentationPanel.tsx
components/encounters/EncounterReadinessPanel.tsx
components/encounters/RouteToBillerPanel.tsx
lib/appointments/startEncounter.ts
lib/encounters/status.ts
lib/workqueue/model.ts
lib/types/appointmentFirstWorkflow.ts
supabase/migrations/20260428_appointment_first_encounter_workqueue.sql
tests/appointment-first-workflow-smoke-test.ts
```

## Install

1. Unzip this package.
2. Copy the files into your project root.
3. Run the Supabase migration:

```bash
supabase db push
```

Or paste the SQL from:

```text
supabase/migrations/20260428_appointment_first_encounter_workqueue.sql
```

into the Supabase SQL editor.

4. Start your app:

```bash
npm run dev
```

5. Test route:

```text
/appointments/<appointment-id>
```

Click **Start Encounter**.

## Important implementation notes

- Appointments remain the scheduling source.
- Encounters become the clinical and billing source of truth.
- Ready-to-bill is automatic after note signing.
- Claim creation is intentionally not automatic. The biller must scrub first.
- Clinicians can manually route an encounter to billing with a categorized workqueue ticket and message.

## Ticket categories

The Route to Biller workflow supports:

```text
documentation_question
coding_question
payer_eligibility_issue
claim_hold
authorization_question
client_balance_question
general_billing_review
```

## Database assumptions

The migration is defensive and idempotent. It creates missing tables where needed and adds columns if absent.

It expects your existing app may already have some of these tables:

```text
appointments
encounters
clinical_notes
encounter_diagnoses
encounter_service_lines
claims
workqueue_items
workqueue_events
audit_logs
```

If any of those already exist, the migration uses `create table if not exists` and `add column if not exists`.

## Safety

This upgrade does not delete existing data.

It does not remove your current pages. It adds a stronger appointment-first path and encounter workspace.

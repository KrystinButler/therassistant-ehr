# Supabase persistence + encounter → billing → claim pipeline + patient chart UI v4

## Install

```powershell
Expand-Archive .\therassistant-supabase-pipeline-patient-chart-v4.zip -DestinationPath . -Force
npm install
npm run dev
```

## Environment

`.env.local` must contain:

```txt
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database

Run:

```txt
supabase/migrations/20260429_persistence_pipeline.sql
supabase/seed/persistence_pipeline_seed.sql
```

## Real pipeline endpoints

- POST `/api/appointments/[appointmentId]/start-encounter`
- POST `/api/encounters/[encounterId]/notes/sign`
- POST `/api/encounters/[encounterId]/route-to-biller`
- POST `/api/encounters/[encounterId]/scrub`
- POST `/api/encounters/[encounterId]/claims`
- POST `/api/claims/[claimId]/submit`
- GET `/api/patients/[patientId]/chart`

## Patient chart routes

- `/patients/PAT-1000001`
- `/patients/PAT-1000001/documents`
- `/patients/PAT-1000001/patient-billing`
- `/patients/PAT-1000001/payment`
- `/patients/PAT-1000001/notes`
- `/patients/PAT-1000001/portal`
- `/patients/PAT-1000001/messages`
- `/patients/PAT-1000001/insights`
- `/patients/new`

## Workflow

Appointment → Encounter → Clinical Note Signature → Workqueue → Scrub → Claim → 837P Submission

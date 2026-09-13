# Scheduling System Refactor

This refactor makes Scheduling the operational entry point of the EHR/RCM workflow.

## Replaced

- `app/scheduling/page.tsx`
- `app/work-schedule/page.tsx`

## Added

- `components/canonical-ehr/SchedulingWorkspace.tsx`
- `components/canonical-ehr/WorkScheduleWorkspace.tsx`
- `lib/canonical-ehr/scheduling.ts`
- `app/api/scheduling/route.ts`
- `tests/scheduling-workflow-smoke-test.ts`

## Implemented Workflow

Appointment → Encounter → Note → Charge → Claim

## Rules

- Scheduling creates appointment records only.
- Only completed appointments can create encounters.
- Appointment type maps to default CPT logic, but billing is finalized from the encounter.
- Non-clinical blocks never create encounters, charges, or claims.
- Recurring appointments create independent appointment records.

## Install

```powershell
Expand-Archive .\therassistant-scheduling-system-refactor.zip -DestinationPath . -Force
npm run dev
```

Open:

```txt
http://localhost:3000/scheduling
http://localhost:3000/work-schedule
```

## Smoke Test

```powershell
npm install -D tsx
npx tsx tests/scheduling-workflow-smoke-test.ts
```

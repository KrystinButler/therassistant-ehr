# Therassistant Active Workflow Spine Fix

This ZIP overwrites the active `/patients/[id]` route that was rendering the Workflow Spine screen.

## Files included

- `app/patients/[id]/page.tsx`
- `components/patients/PatientWorkflowSpineClient.tsx`
- API fallback routes for appointments, encounters, charges, claims, and note signing

## Install

```powershell
Expand-Archive .\therassistant-active-workflow-spine-fix.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

## Expected proof

Open the active patient URL and look for:

`ACTIVE PATIENT CHART OVERRIDE LOADED`

## Working behavior

- New Appointment modal
- Appointment type: Intake / Follow-up
- Service codes: 90834, 90832, 90837, 90839, 90791, H0031, H0032, H0001, T1017
- Frequency: One time, Weekly, Bi-weekly, Monthly
- Create Encounter
- Sign Note
- Generate Charge
- Create Claim
- Route to Biller
- Upload Patient File
- Create Note
- Billing Settings verification
- Portal welcome email
- Messages
- Insights date range dropdown

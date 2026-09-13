# Patient Chart Classic V3

This ZIP overwrites the patient chart UI with a TherapyNotes-style classic patient record.

## Routes included

- `/patients/PAT-1000001`
- `/patients/PAT-1000001/todo`
- `/patients/PAT-1000001/schedule`
- `/patients/PAT-1000001/documents`
- `/patients/PAT-1000001/patient-billing`
- `/patients/PAT-1000001/billing-settings`
- `/patients/PAT-1000001/payment`
- `/patients/PAT-1000001/credit`
- `/patients/PAT-1000001/notes`
- `/patients/PAT-1000001/statement`
- `/patients/PAT-1000001/portal`
- `/patients/PAT-1000001/messages`
- `/patients/PAT-1000001/insights`
- `/patients/PAT-1000001/clinicians`
- `/patients/new`

## Install

From your Next.js project root:

```powershell
Expand-Archive .\therassistant-patient-chart-full-v3.zip -DestinationPath . -Force
npm run dev
```

This is UI-only and uses deterministic demo data so you can validate the workflow and layout before wiring persistence.

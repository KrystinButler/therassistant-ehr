# Patient Chart System of Record Refactor

This ZIP refactors the patient chart so it becomes the central system of record.

## Included files

- `app/patients/page.tsx`
- `app/patients/[id]/layout.tsx`
- `app/patients/[id]/page.tsx`
- `app/patients/[id]/documents/page.tsx`
- `app/patients/[id]/billing-settings/page.tsx`
- `app/patients/[id]/patient-billing/page.tsx`
- `components/canonical-ehr/PatientChartSystem.tsx`
- `components/canonical-ehr/PatientChartSystem.module.css`
- `components/canonical-ehr/patientChartData.ts`
- `tests/patient-chart-system-smoke-test.ts`

## Install

```powershell
Expand-Archive .\therassistant-patient-chart-system-refactor.zip -DestinationPath . -Force
npm run dev
```

Open:

```txt
http://localhost:3000/patients
```

## Core rule

The patient chart is the central system of record. Clinical, administrative, and financial activity anchors back to one patient identity.

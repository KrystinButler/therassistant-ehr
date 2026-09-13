# Patient Chart Classic V2

This refactor replaces the patient chart with a TherapyNotes-style chart shell.

## Replaced / added files

- `components/patient-chart/ClassicPatientChart.tsx`
- `components/patient-chart/ClassicPatientChart.module.css`
- `app/patients/[id]/page.tsx`
- `app/patients/[id]/documents/page.tsx`
- `app/patients/[id]/patient-billing/page.tsx`
- `app/patients/[id]/billing-settings/page.tsx`
- `app/patients/[id]/payment/page.tsx`
- `app/patients/[id]/notes/page.tsx`
- `app/patients/new/page.tsx`

## Test URLs

- `/patients/PAT-1000001`
- `/patients/PAT-1000001/documents`
- `/patients/PAT-1000001/patient-billing`
- `/patients/PAT-1000001/payment`
- `/patients/PAT-1000001/notes`
- `/patients/new`

## Design goals

- Classic EHR top nav
- Persistent patient header
- Gray/blue tab bar
- Documents grid with Outcome Measure dropdown
- Patient info form with administrative and clinical demographic fields
- Patient billing dashboard and transaction ledger
- Payment entry screen
- Note editor screen

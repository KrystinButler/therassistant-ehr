# Patient Chart Classic Refactor

This ZIP rewrites the patient chart to match the provided TherapyNotes-style reference more closely.

## Replaced files

- app/patients/[id]/layout.tsx
- app/patients/[id]/page.tsx
- app/patients/[id]/documents/page.tsx
- app/patients/[id]/billing-settings/page.tsx
- app/patients/[id]/patient-billing/page.tsx

## Added files

- components/patient-chart/ClassicPatientChart.tsx
- components/patient-chart/ClassicPatientChart.module.css

## What changed

- Blue top navigation bar
- Patient identity header
- TherapyNotes-like gray/blue chart tabs
- Documents tab defaults open
- Upload Patient File button
- Outcome Measure dropdown with questionnaire list
- Create Note button
- Clinical document table with service code, date, status, author, and row actions
- Info, Schedule, Billing, Billing Settings, Clinicians, Portal, Messages tabs
- Signed notes visually locked
- Draft notes editable in concept
- Patient billing ledger lives separately from documents

## Install

From project root:

```powershell
Expand-Archive .\therassistant-patient-chart-classic-refactor.zip -DestinationPath . -Force
npm run dev
```

Open:

```txt
http://localhost:3000/patients/PAT-1000001
http://localhost:3000/patients/PAT-1000001/documents
```

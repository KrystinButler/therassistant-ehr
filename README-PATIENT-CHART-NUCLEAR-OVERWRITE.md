# Patient Chart Nuclear Override

This ZIP overwrites the exact active route shown by your dev server:

`GET /patients/5eb894b2-87ab-48cc-acda-61a998fcb931`

Files included:
- app/patients/[id]/page.tsx
- components/patient-chart/ActiveTheraPatientChart.tsx

After install, the patient page will show a yellow banner:
`ACTIVE PATIENT CHART OVERRIDE LOADED`

Install:
```powershell
Expand-Archive .\therassistant-patient-chart-nuclear-overwrite.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

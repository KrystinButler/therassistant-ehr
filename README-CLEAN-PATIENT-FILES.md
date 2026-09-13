# Clean Patient Files

This ZIP intentionally replaces the corrupted patient route with known-valid TypeScript.

Files included:

- `app/patients/[id]/page.tsx`
- `components/patients/PatientChartClient.tsx`
- `lib/supabase/server.ts`

Install from the project root:

```bash
unzip -o therassistant-clean-patient-files.zip
rm -rf .next
npm run dev
```

PowerShell:

```powershell
Expand-Archive .\therassistant-clean-patient-files.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

Expected visible proof on the patient page:

```txt
ACTIVE CLEAN PATIENT CHART LOADED
```

# Patient Chart Client Boundary Fix

This fixes the Next.js 16 runtime error:

`Event handlers cannot be passed to Client Component props`

## What changed

- `app/patients/[id]/page.tsx` remains a Server Component.
- `app/clients/[id]/page.tsx` remains a Server Component.
- `components/patient-chart/ClassicPatientChartResolved.tsx` is now explicitly marked with `"use client"` and owns all interactive handlers.
- Both `/patients/:id` and `/clients/:id` render the same patient chart, with a yellow route trace banner.

## Install

```powershell
Expand-Archive .\therassistant-patient-chart-client-boundary-fix.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

## Test

```txt
http://localhost:3000/patients/PAT-1000001
http://localhost:3000/clients/PAT-1000001
```

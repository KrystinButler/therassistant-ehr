# Active Route Trace Fix

This ZIP fixes the problem where patient chart changes appear not to apply.

It overwrites BOTH:
- app/patients/[id]/page.tsx
- app/clients/[id]/page.tsx

Both now render the same TherapyNotes-style classic chart and show a yellow banner at the top:

ACTIVE PATIENT CHART ROUTE: app/patients/[id]/page.tsx
or
ACTIVE PATIENT CHART ROUTE: app/clients/[id]/page.tsx

This tells you exactly which route your browser is rendering.

## Install

```powershell
Expand-Archive .\therassistant-active-route-trace-fix.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

## Test

Open both:

```txt
http://localhost:3000/patients/PAT-1000001
http://localhost:3000/clients/PAT-1000001
```

If you see the yellow banner, the correct replacement is now active.

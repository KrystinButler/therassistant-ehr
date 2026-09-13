# Dashboard Redesign Install

This ZIP is a visible UI cleanup for the canonical EHR/RCM refactor.

It replaces:
- components/canonical-ehr/CanonicalEhrApp.tsx
- components/layout/AppShell.tsx
- components/dashboard/HomeCommandCenter.tsx
- app/globals.css

Install from your repo root:

```powershell
Expand-Archive .\therassistant-dashboard-redesign.zip -DestinationPath . -Force
npm run dev
```

This version removes the duplicate inner navigation, replaces Tailwind-only styling with project-level CSS classes, and makes the dashboard clinician-action-first:
Appointment → Encounter → Note → Workqueue → Claim → ERA.

# TherAssistant Billing Module Classic V2

This ZIP overwrites the billing module into a TherapyNotes-style function-based billing hub.

## Install

```powershell
Expand-Archive .\therassistant-billing-module-classic-v2.zip -DestinationPath . -Force
npm run dev
```

## Routes to test

- /billing
- /billing/submit-claims
- /billing/insurance-aging
- /billing/patient-aging
- /billing/revenue-report
- /billing/note-count
- /billing/write-offs
- /billing/insurance-payment
- /billing/eligibility-history
- /billing/electronic-claim-history

## What this fixes

- Billing is no longer one unified dashboard.
- The page is now a function-based hub.
- Insurance billing, patient billing, payments, claims, and reports are separated.
- Tables and forms match the screenshots provided.
- The module keeps your appointment → encounter → note → charge → claim concept, but presents billing like the reference system.

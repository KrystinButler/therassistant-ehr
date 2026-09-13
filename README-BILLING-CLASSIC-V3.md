# Billing Module Classic V3

This overwrite refines the billing module to match the provided TherapyNotes-style screenshots.

## Replaced/added routes

- `/billing`
- `/billing/submit-claims`
- `/billing/insurance-aging`
- `/billing/patient-aging`
- `/billing/revenue-report`
- `/billing/note-count`
- `/billing/write-offs`
- `/billing/insurance-payment`
- `/billing/transactions`

Compatibility aliases are also overwritten:

- `/billing/ar`
- `/billing/eligibility`
- `/billing/scrub`

## Install

```powershell
Expand-Archive .\therassistant-billing-module-classic-v3.zip -DestinationPath . -Force
npm run dev
```

## Visual direction

- White panels on light gray background
- Thin blue section dividers
- Green primary save/report buttons
- Blue table headers
- Functional billing hub, not a single claim-centric dashboard

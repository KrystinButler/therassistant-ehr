# Billing System Refactor

This ZIP changes Billing into a task-routing hub, matching the requirements:

- Billing is not a single operational dashboard.
- Billing routes users by function:
  - Insurance Billing
  - Patient Billing
  - Payments
  - Claims & Submission
  - Reports & Tools
- Dedicated sub-pages exist for:
  - Submit electronic claims
  - CMS-1500 paper claims
  - Electronic claim history
  - Rejected claims
  - Patient statements
  - Patient balances
  - Client payments
  - Insurance payments
  - ERA posting
  - Reports
  - Optional advanced workqueue

## Install

From project root:

```powershell
Expand-Archive .\therassistant-billing-task-routing-refactor.zip -DestinationPath . -Force
npm run dev
```

Open:

```txt
http://localhost:3000/billing
```

## Important design rule

The Billing landing page is a routing hub. It should not become a giant mixed queue. The workqueue remains available for advanced exception routing, but primary billing workflows are function-based.

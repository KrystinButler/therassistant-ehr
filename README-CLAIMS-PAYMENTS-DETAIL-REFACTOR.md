# Claims + Payments Detail Refactor

This refactor makes the billing task-routing hub useful by replacing the downstream claim and payment pages with complete workflow screens.

## Files overwritten

- `app/claims/page.tsx`
- `app/claims/create/page.tsx`
- `app/claims/[id]/page.tsx`
- `app/claims/status/page.tsx`
- `app/claims/submissions/page.tsx`
- `app/billing/claims/[id]/page.tsx`
- `app/payments/page.tsx`

## Workflow covered

1. Signed notes create charges.
2. Ready charges appear on Create Claims.
3. Claims are created from charges.
4. Claims can be scrubbed, submitted, accepted, rejected, denied, or paid.
5. Claim detail exposes header, service lines, submission history, status events, and payment/ERA posting.
6. Payments page separates:
   - Client payments
   - Insurance payments
   - ERA / 835 posting
   - Unapplied payments
   - Patient responsibility

## Install

From project root:

```powershell
Expand-Archive .\therassistant-claims-payments-detail-refactor.zip -DestinationPath . -Force
npm run dev
```

Open:

```txt
http://localhost:3000/claims
http://localhost:3000/claims/create
http://localhost:3000/claims/CLM-1001
http://localhost:3000/payments
```

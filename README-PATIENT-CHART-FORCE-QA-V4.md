# Patient Chart Force QA Fix v4

This ZIP overwrites the ACTIVE component currently rendering your screenshots:

`components/patient-chart/ClassicPatientChartResolved.tsx`

It also overwrites both route trees:

- `app/patients/[id]/*`
- `app/clients/[id]/*`

## Fixed from approved testing notes

- Patient header links back to patient list.
- To-Do header links to patient To-Do.
- Save Changes, New Contact, New Reminder, document actions, portal actions, message actions now perform visible UI actions.
- Appointment modal now has Intake / Follow-up and service codes 90834, 90832, 90839, 90791, H0031, H0032, H0001, T1017.
- Scheduled date uses date input and time uses time input.
- Frequency includes weekly, bi-weekly, monthly.
- Patient/clinician/location/payer/author links point to database modules.
- Billing payment method toggles work.
- Payment date and credit amount use proper date/number fields.
- Statement toggle, range dropdown, preview, and save work.
- Billing links point to billing module pages.
- Portal says THERASSISTANT PORTAL.
- Insights includes 30, 60, 90, 120, and 365 day ranges.

## Install

```powershell
Expand-Archive .\therassistant-patient-chart-force-qa-v4.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

## Test

```txt
/patients/PAT-1000001
/patients/PAT-1000001/schedule
/patients/PAT-1000001/documents
/patients/PAT-1000001/patient-billing
/patients/PAT-1000001/payment
/patients/PAT-1000001/credit
/patients/PAT-1000001/statement
/patients/PAT-1000001/billing-settings
/patients/PAT-1000001/portal
/patients/PAT-1000001/messages
/patients/PAT-1000001/insights
```

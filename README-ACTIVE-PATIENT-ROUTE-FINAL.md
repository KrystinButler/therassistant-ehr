# Therassistant Active Patient Route Override

This package overwrites the actual active patient route:

- `app/patients/[id]/page.tsx`
- `components/patients/ActivePatientChart.tsx`

After installing, open `/patients/<uuid>`. You should see:

`ACTIVE PATIENT CHART OVERRIDE LOADED`

That banner proves the correct component is rendering.

## Install

```powershell
Expand-Archive .\therassistant-active-patient-route-final.zip -DestinationPath . -Force
rd /s /q .next
npm run dev
```

## What is wired

- Patient header nav links
- Patient tabs
- Save Changes
- New Contact
- New Reminder
- Schedule Appointment modal
- Appointment type: Intake / Follow-up
- Service codes: 90834, 90832, 90839, 90791, H0031, H0032, H0001, T1017
- Date/time fields
- Frequency: weekly, bi-weekly, monthly
- Document links
- Staff links
- Upload Patient File
- Outcome Measure menu
- Create Note
- Patient payment, charge, credit, refund, statement workflows
- Billing Settings edit actions
- Therassistant Portal
- Portal document request tabs
- Messages new conversation
- Insights range selector

# Patient Chart Approved QA Fix

This ZIP overwrites patient chart routes and the patient chart component.

## Fixes included

- Header Patient link routes to `/patients`
- Header To-Do link routes to `/workqueue`
- Save Changes, New Contact, New Reminder, Save Appointment, payment, credit, statement, eligibility, portal, and message buttons now perform visible actions
- Patient route IDs now map to matching displayed demographics
- Appointment modal supports Intake / Follow-up
- Patient, clinician, and location fields are dropdowns linked to known records
- Service code dropdown includes 90837, 90834, 90832, 90839, 90791, H0031, H0032, H0001, and T1017
- Scheduled Time uses date and time controls
- Frequency includes one time, weekly, bi-weekly, and monthly
- Documents and Author/Access links route to chart/staff workflows
- Upload Patient File, Outcome Measure, Create Note actions work
- Billing internal links route to billing workflows
- Billing Settings edit/verify actions work
- Portal uses TherAssistant Portal naming
- Portal document filters work
- Messages New Conversation works
- Insights range includes 30, 60, 90, 120, and 365 days

## Install

```powershell
Expand-Archive .\therassistant-patient-chart-approved-qa-fix.zip -DestinationPath . -Force
npm run dev
```

## Test

Open:

```txt
http://localhost:3000/patients/pat_avery_morgan
http://localhost:3000/patients/pat_krystin_marie_butler
http://localhost:3000/patients/new
```

insert into organizations (id, legal_name, dba_name, npi, taxonomy_code, city, state, zip, billing_provider_name, billing_provider_npi)
values ('00000000-0000-0000-0000-000000000100', 'Conscious Counseling PLLC', 'TheraAssistant Demo', '1234567893', '101YP2500X', 'Denver', 'CO', '80202', 'Conscious Counseling PLLC', '1234567893')
on conflict (id) do nothing;

insert into users (id, organization_id, full_name, email, role, credentials, npi, taxonomy_code)
values
('00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000100','Krystin Butler','krystin@example.com','clinician','LPC','1222222222','101YP2500X'),
('00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000100','Billing Team','billing@example.com','biller',null,null,null)
on conflict (id) do nothing;

insert into patients (id, organization_id, first_name, middle_name, last_name, preferred_name, dob, pronouns, phone, email, address_line1, city, state, zip, assigned_clinician_id, patient_comments)
values
('11111111-1111-1111-1111-111111111111','00000000-0000-0000-0000-000000000100','Krystin','Marie','Butler','Krystin','1987-06-28','she/her','(303) 943-3946','therassistant@outlook.com','18622 E Water Dr','Aurora','CO','80013','00000000-0000-0000-0000-000000000001','Verify eligibility monthly.')
on conflict (id) do nothing;

insert into payers (id, payer_name, payer_type, clearinghouse_payer_id, state)
values ('22222222-2222-2222-2222-222222222222','Colorado Access','medicaid','84129','CO')
on conflict (id) do nothing;

insert into insurance_policies (id, patient_id, payer_id, priority, member_id, plan_name, subscriber_first_name, subscriber_last_name, subscriber_dob, subscriber_relationship, effective_date, policy_status)
values ('33333333-3333-3333-3333-333333333333','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',1,'12346','Colorado Medicaid','Krystin','Butler','1987-06-28','self','2026-01-01','active')
on conflict (id) do nothing;

insert into appointments (id, organization_id, patient_id, clinician_id, scheduled_start, scheduled_end, appointment_type, status, insurance_policy_id, location_type, default_procedure_code, default_diagnosis_code, default_charge_amount)
values
('44444444-4444-4444-4444-444444444444','00000000-0000-0000-0000-000000000100','11111111-1111-1111-1111-111111111111','00000000-0000-0000-0000-000000000001','2026-04-28 10:00:00-06','2026-04-28 10:53:00-06','Psychotherapy','scheduled','33333333-3333-3333-3333-333333333333','office','90837','F41.1',165)
on conflict (id) do nothing;

insert into patient_billing_transactions (organization_id, patient_id, transaction_date, transaction_type, description, procedure_code, primary_payer, rate, patient_amount, patient_balance, insurance_amount, insurance_paid, insurance_status)
values
('00000000-0000-0000-0000-000000000100','11111111-1111-1111-1111-111111111111','2026-01-06','charge','Misc. Charge from Misc. Note','Misc. Charge','Direct',260,260,260,0,0,null),
('00000000-0000-0000-0000-000000000100','11111111-1111-1111-1111-111111111111','2026-01-06','charge','Commercial Intake','90791','Colorado Access',null,0,0,0,0,'Submitted Claim')
on conflict do nothing;

insert into patient_documents (patient_id, document_type, title, service_code, date_of_service, author_id, status)
values
('11111111-1111-1111-1111-111111111111','Progress Note','Progress Note','H0031','2026-01-06','00000000-0000-0000-0000-000000000001','Signed by Author'),
('11111111-1111-1111-1111-111111111111','Treatment Plan','Treatment Plan',null,'2026-01-06','00000000-0000-0000-0000-000000000001','Signed by Author'),
('11111111-1111-1111-1111-111111111111','Superbill','Superbill for 2026-01-06',null,'2026-01-06','00000000-0000-0000-0000-000000000002','PDF')
on conflict do nothing;

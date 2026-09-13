insert into organizations (id, legal_name, dba_name, npi, tax_id_last4, taxonomy_code, address_line1, city, state, zip, phone, billing_provider_name, billing_provider_npi)
values ('00000000-0000-0000-0000-000000000001', 'Therassistant Behavioral Health PLLC', 'Therassistant', '1234567893', '4821', '101YM0800X', '1700 Lincoln St', 'Denver', 'CO', '80203', '(720) 555-0100', 'Therassistant Behavioral Health PLLC', '1234567893')
on conflict (id) do nothing;

insert into users (id, organization_id, full_name, email, role, credentials, npi, taxonomy_code, is_active)
values
('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Lena Ortiz', 'lena.ortiz@therassistant.example', 'clinician', 'LPC', '1447382111', '101YP2500X', true),
('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Maya Chen', 'maya.chen@therassistant.example', 'biller', 'CPC', '', '', true)
on conflict (id) do nothing;

insert into patients (id, organization_id, first_name, last_name, preferred_name, dob, sex_at_birth, gender_identity, pronouns, phone, email, city, state, zip, emergency_contact_name, emergency_contact_phone, status)
values
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'Avery', 'Morgan', 'Avery', '1998-07-14', 'F', 'Nonbinary', 'they/them', '(720) 555-0142', 'avery.morgan@example.com', 'Denver', 'CO', '80218', 'Morgan Reed', '(720) 555-9871', 'active')
on conflict (id) do nothing;

insert into payers (id, payer_name, payer_type, clearinghouse_payer_id, office_ally_payer_id, availity_payer_id, state, is_active)
values ('00000000-0000-0000-0000-000000000301', 'Colorado Medicaid', 'medicaid', 'CO Medicaid', 'CO001', 'CO-MCD', 'CO', true)
on conflict (id) do nothing;

insert into insurance_policies (id, patient_id, payer_id, priority, member_id, group_number, plan_name, subscriber_first_name, subscriber_last_name, subscriber_dob, subscriber_relationship, effective_date, policy_status)
values ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000301', 1, 'CO123456789', 'RAE3', 'Colorado Medicaid RAE 3', 'Avery', 'Morgan', '1998-07-14', 'self', '2026-01-01', 'active')
on conflict (id) do nothing;

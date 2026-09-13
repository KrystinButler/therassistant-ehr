create extension if not exists "pgcrypto";

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  dba_name text,
  npi text,
  tax_id_last4 text,
  taxonomy_code text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  phone text,
  billing_provider_name text,
  billing_provider_npi text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  full_name text not null,
  email text unique,
  role text not null default 'clinician',
  credentials text,
  npi text,
  taxonomy_code text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  first_name text not null,
  middle_name text,
  last_name text not null,
  preferred_name text,
  dob date,
  sex_at_birth text,
  gender_identity text,
  pronouns text,
  phone text,
  email text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  emergency_contact_name text,
  emergency_contact_phone text,
  status text default 'active',
  assigned_clinician_id uuid references users(id),
  patient_comments text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists payers (
  id uuid primary key default gen_random_uuid(),
  payer_name text not null,
  payer_type text,
  clearinghouse_payer_id text,
  office_ally_payer_id text,
  availity_payer_id text,
  state text,
  is_active boolean default true
);

create table if not exists insurance_policies (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  payer_id uuid references payers(id),
  priority integer default 1,
  member_id text,
  group_number text,
  plan_name text,
  subscriber_first_name text,
  subscriber_last_name text,
  subscriber_dob date,
  subscriber_relationship text default 'self',
  effective_date date,
  termination_date date,
  policy_status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists eligibility_checks (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  insurance_policy_id uuid references insurance_policies(id),
  payer_id uuid references payers(id),
  service_type_code text default '98',
  request_control_number text,
  response_control_number text,
  eligibility_status text default 'unknown',
  copay_amount numeric,
  deductible_amount numeric,
  deductible_remaining numeric,
  coinsurance_percent numeric,
  effective_date date,
  termination_date date,
  raw_270 jsonb,
  raw_271 jsonb,
  checked_at timestamptz default now(),
  checked_by uuid references users(id)
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  clinician_id uuid references users(id),
  location_id uuid,
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  appointment_type text not null default 'Psychotherapy',
  status text not null default 'scheduled',
  reason_for_visit text,
  insurance_policy_id uuid references insurance_policies(id),
  eligibility_check_id uuid references eligibility_checks(id),
  location_type text default 'office',
  default_procedure_code text default '90837',
  default_diagnosis_code text default 'F41.1',
  default_diagnosis_description text default 'Generalized anxiety disorder',
  default_charge_amount numeric default 165,
  recurrence_rule text,
  reminder_email boolean default true,
  reminder_sms boolean default true,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists encounters (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  appointment_id uuid unique references appointments(id),
  clinician_id uuid references users(id),
  supervisor_id uuid references users(id),
  date_of_service date,
  start_time timestamptz,
  end_time timestamptz,
  duration_minutes integer,
  place_of_service_code text,
  service_location text,
  encounter_status text default 'draft',
  documentation_status text default 'not_started',
  billing_status text default 'hold',
  primary_diagnosis_code text,
  medical_necessity_summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists clinical_notes (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id) on delete cascade,
  note_type text default 'progress',
  note_format text default 'dap',
  subjective text,
  objective text,
  assessment text,
  plan text,
  interventions text,
  client_response text,
  risk_assessment text,
  progress_toward_goals text,
  next_steps text,
  signed_by uuid references users(id),
  signed_at timestamptz,
  locked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists encounter_diagnoses (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id) on delete cascade,
  diagnosis_code text not null,
  diagnosis_description text,
  diagnosis_order integer default 1,
  is_primary boolean default false
);

create table if not exists encounter_service_lines (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id) on delete cascade,
  code_type text default 'CPT',
  procedure_code text not null,
  modifier_1 text,
  modifier_2 text,
  modifier_3 text,
  modifier_4 text,
  units numeric default 1,
  minutes integer,
  charge_amount numeric default 0,
  diagnosis_pointer text default 'A',
  documentation_support_status text default 'needs_review',
  billing_status text default 'hold',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists treatment_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  organization_id uuid references organizations(id),
  clinician_id uuid references users(id),
  plan_start_date date,
  plan_review_date date,
  status text default 'active',
  diagnosis_summary text,
  clinical_summary text,
  signed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists treatment_plan_goals (
  id uuid primary key default gen_random_uuid(),
  treatment_plan_id uuid references treatment_plans(id) on delete cascade,
  goal_text text,
  objective_text text,
  intervention_text text,
  target_date date,
  status text default 'active'
);

create table if not exists encounter_treatment_plan_links (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id),
  treatment_plan_id uuid references treatment_plans(id),
  goal_id uuid references treatment_plan_goals(id)
);

create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid unique references encounters(id),
  payer_id uuid references payers(id),
  insurance_policy_id uuid references insurance_policies(id),
  claim_number text unique,
  clearinghouse_trace_id text,
  payer_claim_control_number text,
  claim_type text default '837P',
  claim_status text default 'draft',
  total_charge_amount numeric default 0,
  total_paid_amount numeric default 0,
  total_adjustment_amount numeric default 0,
  patient_responsibility_amount numeric default 0,
  submission_date timestamptz,
  accepted_date timestamptz,
  adjudicated_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists claim_service_lines (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id) on delete cascade,
  encounter_service_line_id uuid references encounter_service_lines(id),
  line_number integer,
  procedure_code text,
  modifiers text[],
  units numeric,
  charge_amount numeric,
  allowed_amount numeric,
  paid_amount numeric,
  adjustment_amount numeric,
  patient_responsibility_amount numeric,
  service_date date,
  place_of_service_code text,
  line_status text default 'draft'
);

create table if not exists claim_submissions (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id) on delete cascade,
  transaction_type text default '837P',
  submission_method text,
  batch_id uuid,
  control_number text,
  raw_837 jsonb,
  edi_payload text,
  response_status text,
  submitted_at timestamptz default now(),
  submitted_by uuid references users(id)
);

create table if not exists claim_status_events (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id) on delete cascade,
  source text,
  transaction_type text,
  status_code text,
  status_description text,
  event_at timestamptz default now(),
  raw_event jsonb
);

create table if not exists patient_billing_transactions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  claim_id uuid references claims(id),
  transaction_date date default current_date,
  transaction_type text,
  description text,
  procedure_code text,
  primary_payer text,
  secondary_payer text,
  rate numeric,
  patient_amount numeric default 0,
  patient_balance numeric default 0,
  insurance_amount numeric default 0,
  insurance_paid numeric default 0,
  insurance_status text,
  created_at timestamptz default now()
);

create table if not exists workqueue_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  appointment_id uuid references appointments(id),
  encounter_id uuid references encounters(id),
  claim_id uuid references claims(id),
  queue_type text not null,
  ticket_type text,
  priority text default 'normal',
  status text default 'open',
  title text not null,
  description text,
  source text default 'system',
  assigned_role text,
  assigned_user_id uuid references users(id),
  created_by uuid references users(id),
  resolved_by uuid references users(id),
  resolved_at timestamptz,
  due_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists workqueue_encounter_queue_unique
on workqueue_items(encounter_id, queue_type)
where encounter_id is not null and source = 'system';

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  ticket_type text,
  priority text default 'normal',
  status text default 'open',
  message text,
  created_by uuid references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists patient_documents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  document_type text,
  title text,
  service_code text,
  date_of_service date,
  author_id uuid references users(id),
  status text default 'uploaded',
  file_url text,
  created_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  appointment_id uuid references appointments(id),
  encounter_id uuid references encounters(id),
  clinical_note_id uuid references clinical_notes(id),
  claim_id uuid references claims(id),
  workqueue_item_id uuid references workqueue_items(id),
  event_type text not null,
  event_summary text,
  event_metadata jsonb,
  created_at timestamptz default now()
);

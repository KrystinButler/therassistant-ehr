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
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  full_name text not null,
  email text unique not null,
  role text not null check (role in ('admin','clinician','biller','supervisor','credentialing','owner')),
  credentials text,
  npi text,
  taxonomy_code text,
  is_active boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
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
  status text default 'active' check (status in ('active','inactive','discharged','prospective')),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists payers (
  id uuid primary key default gen_random_uuid(),
  payer_name text not null,
  payer_type text check (payer_type in ('medicaid','medicare','commercial','rae','tricare')),
  clearinghouse_payer_id text,
  office_ally_payer_id text,
  availity_payer_id text,
  state text,
  is_active boolean default true
);

create table if not exists insurance_policies (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  payer_id uuid references payers(id),
  priority integer default 1,
  member_id text,
  group_number text,
  plan_name text,
  subscriber_first_name text,
  subscriber_last_name text,
  subscriber_dob date,
  subscriber_relationship text,
  effective_date date,
  termination_date date,
  policy_status text default 'unknown' check (policy_status in ('active','inactive','unknown')),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists eligibility_checks (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  insurance_policy_id uuid references insurance_policies(id),
  payer_id uuid references payers(id),
  service_type_code text default '98',
  request_control_number text,
  response_control_number text,
  eligibility_status text default 'unknown' check (eligibility_status in ('active','inactive','error','unknown')),
  copay_amount numeric default 0,
  deductible_amount numeric default 0,
  deductible_remaining numeric default 0,
  coinsurance_percent numeric default 0,
  effective_date date,
  termination_date date,
  raw_270 jsonb default '{}'::jsonb,
  raw_271 jsonb default '{}'::jsonb,
  checked_at timestamp default now(),
  checked_by uuid references users(id)
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  clinician_id uuid references users(id),
  location_id uuid,
  scheduled_start timestamp not null,
  scheduled_end timestamp not null,
  appointment_type text,
  status text default 'scheduled' check (status in ('scheduled','checked_in','completed','cancelled','no_show')),
  reason_for_visit text,
  insurance_policy_id uuid references insurance_policies(id),
  eligibility_check_id uuid references eligibility_checks(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists encounters (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  appointment_id uuid references appointments(id),
  clinician_id uuid references users(id),
  supervisor_id uuid references users(id),
  date_of_service date,
  start_time timestamp,
  end_time timestamp,
  duration_minutes integer,
  place_of_service_code text,
  service_location text,
  encounter_status text default 'draft' check (encounter_status in ('draft','in_review','signed','ready_to_bill','billed','corrected','voided')),
  documentation_status text default 'not_started' check (documentation_status in ('not_started','in_progress','complete','signed','addendum_needed')),
  billing_status text default 'hold' check (billing_status in ('hold','ready','claim_created','submitted','paid','denied')),
  primary_diagnosis_code text,
  medical_necessity_summary text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create unique index if not exists one_encounter_per_completed_appointment on encounters(appointment_id) where appointment_id is not null;

create table if not exists clinical_notes (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id) on delete cascade,
  note_type text check (note_type in ('progress','intake','treatment_plan','discharge','addendum')),
  note_format text check (note_format in ('dap','soap','birp','narrative')),
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
  signed_at timestamp,
  locked boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
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
  code_type text default 'CPT' check (code_type in ('CPT','HCPCS')),
  procedure_code text not null,
  modifier_1 text,
  modifier_2 text,
  modifier_3 text,
  modifier_4 text,
  units numeric default 1,
  minutes integer,
  charge_amount numeric default 0,
  diagnosis_pointer text,
  documentation_support_status text default 'needs_review' check (documentation_support_status in ('supported','weak','unsupported','needs_review')),
  billing_status text default 'hold' check (billing_status in ('hold','ready','submitted','paid','denied')),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists treatment_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id),
  organization_id uuid references organizations(id),
  clinician_id uuid references users(id),
  plan_start_date date,
  plan_review_date date,
  status text default 'active' check (status in ('active','reviewed','expired','discontinued')),
  diagnosis_summary text,
  clinical_summary text,
  signed_at timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists treatment_plan_goals (
  id uuid primary key default gen_random_uuid(),
  treatment_plan_id uuid references treatment_plans(id) on delete cascade,
  goal_text text,
  objective_text text,
  intervention_text text,
  target_date date,
  status text default 'active' check (status in ('active','met','modified','discontinued'))
);

create table if not exists encounter_treatment_plan_links (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid references encounters(id) on delete cascade,
  treatment_plan_id uuid references treatment_plans(id),
  goal_id uuid references treatment_plan_goals(id)
);

create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  payer_id uuid references payers(id),
  insurance_policy_id uuid references insurance_policies(id),
  claim_number text unique,
  clearinghouse_trace_id text,
  payer_claim_control_number text,
  claim_type text default '837P',
  claim_status text default 'draft' check (claim_status in ('draft','ready','submitted','accepted','rejected','denied','paid','appealed','voided')),
  total_charge_amount numeric default 0,
  total_paid_amount numeric default 0,
  total_adjustment_amount numeric default 0,
  patient_responsibility_amount numeric default 0,
  submission_date timestamp,
  accepted_date timestamp,
  adjudicated_date timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create unique index if not exists one_primary_claim_per_encounter on claims(encounter_id) where claim_status <> 'voided';

create table if not exists claim_service_lines (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id) on delete cascade,
  encounter_service_line_id uuid references encounter_service_lines(id),
  line_number integer,
  procedure_code text,
  modifiers text[] default array[]::text[],
  units numeric default 1,
  charge_amount numeric default 0,
  allowed_amount numeric default 0,
  paid_amount numeric default 0,
  adjustment_amount numeric default 0,
  patient_responsibility_amount numeric default 0,
  service_date date,
  place_of_service_code text,
  line_status text default 'submitted' check (line_status in ('submitted','paid','denied','rejected','adjusted'))
);

create table if not exists claim_submissions (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id),
  transaction_type text default '837P',
  submission_method text check (submission_method in ('office_ally','availity','manual','batch')),
  batch_id uuid,
  control_number text,
  raw_837 jsonb default '{}'::jsonb,
  edi_payload text,
  response_status text,
  submitted_at timestamp default now(),
  submitted_by uuid references users(id)
);

create table if not exists claim_status_events (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id),
  source text check (source in ('clearinghouse','payer','portal','manual')),
  transaction_type text check (transaction_type in ('999','277CA','276','277','portal')),
  status_code text,
  status_text text,
  event_at timestamp default now(),
  raw_event jsonb default '{}'::jsonb
);

create table if not exists era_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  payer_id uuid references payers(id),
  file_name text,
  trace_number text,
  raw_835 jsonb default '{}'::jsonb,
  imported_at timestamp default now(),
  imported_by uuid references users(id)
);

create table if not exists era_claim_payments (
  id uuid primary key default gen_random_uuid(),
  era_file_id uuid references era_files(id),
  claim_id uuid references claims(id),
  payer_claim_control_number text,
  billed_amount numeric default 0,
  paid_amount numeric default 0,
  patient_responsibility_amount numeric default 0,
  claim_status_code text,
  posted boolean default false,
  posted_at timestamp
);

create table if not exists era_line_payments (
  id uuid primary key default gen_random_uuid(),
  era_claim_payment_id uuid references era_claim_payments(id),
  claim_service_line_id uuid references claim_service_lines(id),
  procedure_code text,
  billed_amount numeric default 0,
  allowed_amount numeric default 0,
  paid_amount numeric default 0,
  adjustment_amount numeric default 0,
  patient_responsibility_amount numeric default 0
);

create table if not exists claim_adjustments (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id),
  claim_service_line_id uuid references claim_service_lines(id),
  group_code text,
  reason_code text,
  amount numeric default 0,
  description text,
  created_at timestamp default now()
);

create table if not exists workqueue_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  claim_id uuid references claims(id),
  payer_id uuid references payers(id),
  queue_type text check (queue_type in ('no_response','eligibility_issue','rejection','denial','authorization_needed','appeal_needed','underpayment','patient_balance','documentation_hold','ready_to_bill','biller_review')),
  priority text default 'normal' check (priority in ('low','normal','high','urgent')),
  status text default 'open' check (status in ('open','in_progress','deferred','resolved','closed')),
  title text,
  description text,
  assigned_to uuid references users(id),
  due_date date,
  defer_until date,
  resolution_note text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists workqueue_events (
  id uuid primary key default gen_random_uuid(),
  workqueue_item_id uuid references workqueue_items(id) on delete cascade,
  event_type text check (event_type in ('created','assigned','note_added','deferred','status_changed','resolved')),
  note text,
  created_by uuid references users(id),
  created_at timestamp default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  claim_id uuid references claims(id),
  category text check (category in ('billing','eligibility','credentialing','documentation','payment','system')),
  subject text,
  description text,
  status text default 'open' check (status in ('open','waiting','resolved','closed')),
  priority text default 'normal' check (priority in ('low','normal','high','urgent')),
  created_by uuid references users(id),
  assigned_to uuid references users(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references support_tickets(id) on delete cascade,
  sender_id uuid references users(id),
  message_body text,
  internal_only boolean default false,
  created_at timestamp default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  user_id uuid references users(id),
  entity_type text,
  entity_id uuid,
  action text check (action in ('view','create','update','delete','sign','submit','export')),
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  patient_id uuid references patients(id),
  encounter_id uuid references encounters(id),
  claim_id uuid references claims(id),
  document_type text check (document_type in ('consent','intake','id_card','appeal','eob','clinical_upload')),
  file_url text,
  file_name text,
  uploaded_by uuid references users(id),
  created_at timestamp default now()
);

create index if not exists idx_appointments_patient on appointments(patient_id);
create index if not exists idx_encounters_patient on encounters(patient_id);
create index if not exists idx_notes_encounter on clinical_notes(encounter_id);
create index if not exists idx_claims_encounter on claims(encounter_id);
create index if not exists idx_claims_status on claims(claim_status);
create index if not exists idx_workqueue_type_status on workqueue_items(queue_type, status);
create index if not exists idx_workqueue_encounter on workqueue_items(encounter_id);
create index if not exists idx_workqueue_claim on workqueue_items(claim_id);

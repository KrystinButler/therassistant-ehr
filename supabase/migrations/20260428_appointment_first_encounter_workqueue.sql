-- File: supabase/migrations/20260428_appointment_first_encounter_workqueue.sql
-- Appointment-first encounter + clinical documentation + billing workqueue spine.
-- Defensive/idempotent migration. Does not delete existing data.

create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  patient_id uuid null,
  client_id uuid null,
  clinician_id uuid null,
  provider_id uuid null,
  location_id uuid null,
  scheduled_start timestamptz null,
  scheduled_end timestamptz null,
  appointment_type text null,
  status text not null default 'scheduled',
  reason_for_visit text null,
  insurance_policy_id uuid null,
  eligibility_check_id uuid null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appointments add column if not exists client_id uuid null;
alter table public.appointments add column if not exists clinician_id uuid null;
alter table public.appointments add column if not exists provider_id uuid null;
alter table public.appointments add column if not exists insurance_policy_id uuid null;
alter table public.appointments add column if not exists eligibility_check_id uuid null;
alter table public.appointments add column if not exists updated_at timestamptz not null default now();

create table if not exists public.encounters (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  patient_id uuid null,
  client_id uuid null,
  appointment_id uuid null,
  clinician_id uuid null,
  provider_id uuid null,
  supervisor_id uuid null,
  date_of_service date null,
  service_date date null,
  start_time timestamptz null,
  end_time timestamptz null,
  duration_minutes integer null,
  place_of_service_code text null,
  service_location text null,
  encounter_status text not null default 'in_progress',
  documentation_status text not null default 'not_started',
  billing_status text not null default 'hold',
  primary_diagnosis_code text null,
  medical_necessity_summary text null,
  archived_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.encounters add column if not exists client_id uuid null;
alter table public.encounters add column if not exists appointment_id uuid null;
alter table public.encounters add column if not exists clinician_id uuid null;
alter table public.encounters add column if not exists provider_id uuid null;
alter table public.encounters add column if not exists date_of_service date null;
alter table public.encounters add column if not exists service_date date null;
alter table public.encounters add column if not exists documentation_status text not null default 'not_started';
alter table public.encounters add column if not exists billing_status text not null default 'hold';
alter table public.encounters add column if not exists archived_at timestamptz null;
alter table public.encounters add column if not exists updated_at timestamptz not null default now();

create unique index if not exists encounters_one_per_appointment_idx
  on public.encounters(appointment_id)
  where appointment_id is not null and archived_at is null;

create table if not exists public.clinical_notes (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid not null references public.encounters(id) on delete cascade,
  note_type text not null default 'progress',
  note_format text not null default 'dap',
  subjective text null,
  objective text null,
  assessment text null,
  plan text null,
  interventions text null,
  client_response text null,
  risk_assessment text null,
  progress_toward_goals text null,
  next_steps text null,
  signed_by uuid null,
  signed_at timestamptz null,
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.encounter_diagnoses (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid not null references public.encounters(id) on delete cascade,
  diagnosis_code text not null,
  diagnosis_description text null,
  diagnosis_order integer not null default 1,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists encounter_diagnoses_encounter_idx on public.encounter_diagnoses(encounter_id);

create table if not exists public.encounter_service_lines (
  id uuid primary key default gen_random_uuid(),
  encounter_id uuid not null references public.encounters(id) on delete cascade,
  code_type text not null default 'CPT',
  procedure_code text not null,
  modifier_1 text null,
  modifier_2 text null,
  modifier_3 text null,
  modifier_4 text null,
  units numeric not null default 1,
  minutes integer null,
  charge_amount numeric null,
  diagnosis_pointer text null,
  documentation_support_status text not null default 'needs_review',
  billing_status text not null default 'hold',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists encounter_service_lines_encounter_idx on public.encounter_service_lines(encounter_id);

create table if not exists public.workqueue_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  patient_id uuid null,
  client_id uuid null,
  appointment_id uuid null,
  encounter_id uuid null,
  claim_id uuid null,
  claim_service_line_id uuid null,
  payer_id uuid null,
  queue_type text not null,
  ticket_category text null,
  priority text not null default 'normal',
  status text not null default 'open',
  title text not null,
  description text null,
  clinician_message text null,
  chart_link text null,
  assigned_to uuid null,
  created_by uuid null,
  due_date date null,
  defer_until date null,
  resolution_note text null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workqueue_items add column if not exists client_id uuid null;
alter table public.workqueue_items add column if not exists appointment_id uuid null;
alter table public.workqueue_items add column if not exists encounter_id uuid null;
alter table public.workqueue_items add column if not exists ticket_category text null;
alter table public.workqueue_items add column if not exists clinician_message text null;
alter table public.workqueue_items add column if not exists chart_link text null;
alter table public.workqueue_items add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists workqueue_items_encounter_idx on public.workqueue_items(encounter_id);
create index if not exists workqueue_items_appointment_idx on public.workqueue_items(appointment_id);
create index if not exists workqueue_items_queue_status_idx on public.workqueue_items(queue_type, status);

create table if not exists public.workqueue_events (
  id uuid primary key default gen_random_uuid(),
  workqueue_item_id uuid not null references public.workqueue_items(id) on delete cascade,
  event_type text not null,
  note text null,
  created_by uuid null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid null,
  user_id uuid null,
  entity_type text not null,
  entity_id uuid null,
  action text not null,
  before_data jsonb null,
  after_data jsonb null,
  ip_address text null,
  user_agent text null,
  created_at timestamptz not null default now()
);

create or replace view public.ready_to_bill_encounters as
select
  e.id as encounter_id,
  e.organization_id,
  e.patient_id,
  e.client_id,
  e.appointment_id,
  e.clinician_id,
  e.date_of_service,
  e.service_date,
  e.encounter_status,
  e.documentation_status,
  e.billing_status,
  w.id as workqueue_item_id,
  w.status as workqueue_status,
  w.priority as workqueue_priority,
  w.created_at as queued_at
from public.encounters e
left join public.workqueue_items w
  on w.encounter_id = e.id
  and w.queue_type = 'ready_to_bill'
  and w.status in ('open', 'in_progress', 'deferred')
where e.encounter_status = 'ready_to_bill'
  and e.billing_status in ('ready', 'scrub_pending', 'scrub_passed');

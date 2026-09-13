import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import PatientChartClient, { type PatientChartPatient } from "@/components/patients/PatientChartClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

type ClientRow = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  preferred_name?: string | null;
  date_of_birth?: string | null;
  dob?: string | null;
  email?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  assigned_clinician?: string | null;
  primary_clinician?: string | null;
  status?: string | null;
};

function buildFallbackPatient(id: string): PatientChartPatient {
  return {
    id,
    firstName: "Avery",
    lastName: "Morgan",
    preferredName: "Avery",
    dob: "1998-04-12",
    age: 28,
    email: "avery.morgan@example.com",
    phone: "(720) 555-0198",
    address: "1234 Colfax Ave, Denver, CO 80203",
    assignedClinician: "Lena Ortiz, LPC",
    status: "Active",
  };
}

function calculateAge(dateValue?: string | null): number | null {
  if (!dateValue) return null;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }

  return age;
}

function mapClientRowToPatient(row: ClientRow, id: string): PatientChartPatient {
  const dob = row.date_of_birth ?? row.dob ?? null;
  const addressParts = [
    row.address_line1,
    row.address_line2,
    row.city,
    row.state,
    row.postal_code,
  ].filter(Boolean);

  return {
    id: row.id ?? id,
    firstName: row.first_name ?? "Unknown",
    lastName: row.last_name ?? "Patient",
    preferredName: row.preferred_name ?? row.first_name ?? "Patient",
    dob,
    age: calculateAge(dob),
    email: row.email ?? "Not on file",
    phone: row.phone ?? "Not on file",
    address: addressParts.length ? addressParts.join(", ") : "Not on file",
    assignedClinician: row.assigned_clinician ?? row.primary_clinician ?? "Unassigned",
    status: row.status ?? "Active",
  };
}

async function loadPatient(id: string): Promise<PatientChartPatient> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return buildFallbackPatient(id);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle<ClientRow>();

  if (error) {
    return buildFallbackPatient(id);
  }

  if (!data) {
    notFound();
  }

  return mapClientRowToPatient(data, id);
}

export default async function PatientOverviewPage({ params }: PageProps) {
  const { id } = await params;
  const patient = await loadPatient(id);

  return <PatientChartClient patient={patient} />;
}

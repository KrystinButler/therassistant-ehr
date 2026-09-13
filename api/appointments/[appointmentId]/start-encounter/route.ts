import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase/service";
import { startEncounterFromAppointment } from "@/lib/ehr/pipeline";

export async function POST(
  _request: Request,
  context: { params: Promise<{ appointmentId: string }> }
) {
  const { appointmentId } = await context.params;
  const supabase = getSupabaseServiceClient();
  const result = await startEncounterFromAppointment(supabase, appointmentId);

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

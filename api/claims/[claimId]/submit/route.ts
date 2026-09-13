import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase/service";
import { submitClaim } from "@/lib/ehr/pipeline";

export async function POST(
  request: Request,
  context: { params: Promise<{ claimId: string }> }
) {
  const { claimId } = await context.params;
  const body = await request.json().catch(() => ({}));
  const supabase = getSupabaseServiceClient();

  const result = await submitClaim(
    supabase,
    claimId,
    body.submittedBy ?? "00000000-0000-0000-0000-000000000002"
  );

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

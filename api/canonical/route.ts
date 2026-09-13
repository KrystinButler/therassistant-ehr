import { NextResponse } from "next/server";
import { canonicalSeed } from "@/lib/canonical-ehr/seed";

export function GET() {
  return NextResponse.json({
    ok: true,
    tables: {
      organizations: canonicalSeed.organizations.length,
      patients: canonicalSeed.patients.length,
      appointments: canonicalSeed.appointments.length,
      encounters: canonicalSeed.encounters.length,
      claims: canonicalSeed.claims.length,
      workqueue_items: canonicalSeed.workqueue_items.length,
    },
  });
}

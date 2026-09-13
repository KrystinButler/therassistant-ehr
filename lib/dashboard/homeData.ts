import { canonicalSeed } from "@/lib/canonical-ehr/seed";

export function getHomeDashboardData() {
  return {
    appointments: canonicalSeed.appointments,
    claims: canonicalSeed.claims,
    workqueueItems: canonicalSeed.workqueue_items,
    eligibilityChecks: canonicalSeed.eligibility_checks,
    supportTickets: canonicalSeed.support_tickets,
  };
}

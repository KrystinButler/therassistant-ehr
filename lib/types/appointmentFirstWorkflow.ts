export type AppointmentFirstStep =
  | "patient"
  | "insurance_policy"
  | "eligibility_check"
  | "appointment"
  | "encounter"
  | "clinical_note"
  | "claim"
  | "claim_status"
  | "era"
  | "payment_posting"
  | "workqueue";

export const appointmentFirstWorkflow: AppointmentFirstStep[] = [
  "patient",
  "insurance_policy",
  "eligibility_check",
  "appointment",
  "encounter",
  "clinical_note",
  "claim",
  "claim_status",
  "era",
  "payment_posting",
  "workqueue",
];

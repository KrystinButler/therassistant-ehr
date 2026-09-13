import PatientChartClassic from "@/components/patients/PatientChartClassic";
import React from "react";

export default function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  return <PatientChartClassic patientId={resolvedParams.id} initialTab="billing" />;
}

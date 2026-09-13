import React from "react";
import ClassicPatientChartResolved from "@/components/patient-chart/ClassicPatientChartResolved";

type PageProps = { params: Promise<{ id: string }> };

export default function ClientsPatientPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  return <ClassicPatientChartResolved routeSource="clients" patientId={resolvedParams.id} />;
}

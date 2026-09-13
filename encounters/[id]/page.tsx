import CanonicalEhrApp from "@/components/canonical-ehr/CanonicalEhrApp";

interface PageProps { params: { id: string } | Promise<{ id: string }> }

export default async function EncounterWorkspacePage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);
  return <CanonicalEhrApp initialView="encounter-workspace" encounterId={id} />;
}

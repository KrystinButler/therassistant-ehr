import Link from "next/link";

export default function Page() {
  return (
    <main style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: 24 }}>
      <h1 style={{ color: "#1476a8", fontWeight: 400 }}>Electronic Claim History</h1>
      <p>This workflow is linked from the patient chart and ready for deeper implementation.</p>
      <Link href="/patients/pat_krystin_marie_butler">Back to patient chart</Link>
    </main>
  );
}

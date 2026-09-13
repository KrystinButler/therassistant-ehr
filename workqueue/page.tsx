import Link from "next/link";

const items = [
  { date: "4/28/26", patient: "Krystin Marie Butler", item: "Review documentation and billing readiness.", priority: "Normal" },
  { date: "4/6/25", patient: "Avery Morgan", item: "Create a new treatment plan.", priority: "High" },
];

export default function WorkqueuePage() {
  return (
    <main style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#f4f4f4", minHeight: "100vh" }}>
      <header style={{ background: "linear-gradient(#0484b7,#006b99)", color: "white", padding: "14px 24px", display: "flex", gap: 24 }}>
        <Link href="/" style={{ color: "white", fontWeight: 700, textDecoration: "none" }}>TheraAssistant</Link>
        <Link href="/workqueue" style={{ color: "white", fontWeight: 700 }}>To-Do</Link>
        <Link href="/patients" style={{ color: "white" }}>Patients</Link>
        <Link href="/scheduling" style={{ color: "white" }}>Scheduling</Link>
      </header>
      <section style={{ padding: 24 }}>
        <h1 style={{ color: "#1476a8", fontWeight: 400 }}>Clinician To-Do List</h1>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead><tr><th style={{ background: "#209bd3", color: "white", padding: 9, textAlign: "left" }}>Date</th><th style={{ background: "#209bd3", color: "white", padding: 9, textAlign: "left" }}>Patient</th><th style={{ background: "#209bd3", color: "white", padding: 9, textAlign: "left" }}>To-Do Item</th><th style={{ background: "#209bd3", color: "white", padding: 9, textAlign: "left" }}>Priority</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.item}><td style={{ border: "1px solid #ddd", padding: 9 }}>{item.date}</td><td style={{ border: "1px solid #ddd", padding: 9 }}><Link href="/patients/pat_krystin_marie_butler">{item.patient}</Link></td><td style={{ border: "1px solid #ddd", padding: 9 }}>{item.item}</td><td style={{ border: "1px solid #ddd", padding: 9 }}>{item.priority}</td></tr>)}</tbody>
        </table>
      </section>
    </main>
  );
}

import Link from "next/link";

const statusEvents = [
  {
    claimId: "CLM-1001",
    claimNumber: "TA-837P-1001",
    patient: "Avery Morgan",
    transaction: "277CA",
    source: "Clearinghouse",
    status: "Accepted",
    receivedAt: "2026-04-28 12:05",
    message: "Claim accepted and forwarded to payer.",
  },
  {
    claimId: "CLM-1002",
    claimNumber: "TA-837P-1002",
    patient: "Sofia Martinez",
    transaction: "277CA",
    source: "Clearinghouse",
    status: "Rejected",
    receivedAt: "2026-04-24 17:45",
    message: "Subscriber relationship code missing.",
  },
  {
    claimId: "CLM-1004",
    claimNumber: "TA-837P-1004",
    patient: "Jordan Ellis",
    transaction: "Portal",
    source: "Payer Portal",
    status: "Denied",
    receivedAt: "2026-04-26 09:30",
    message: "Authorization not found for date of service.",
  },
];

export default function ClaimStatusPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">Claims & Submission</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Claim Status Events</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Central log for 999, 277CA, 276/277, payer portal, and manual claim status updates.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Claim</th>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Transaction</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {statusEvents.map((event) => (
                  <tr key={`${event.claimId}-${event.transaction}`} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-black">{event.claimNumber}</td>
                    <td className="px-5 py-4">{event.patient}</td>
                    <td className="px-5 py-4">{event.transaction}</td>
                    <td className="px-5 py-4">{event.source}</td>
                    <td className="px-5 py-4 font-bold">{event.status}</td>
                    <td className="px-5 py-4">{event.receivedAt}</td>
                    <td className="px-5 py-4">{event.message}</td>
                    <td className="px-5 py-4 text-right">
                      <Link className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white" href={`/claims/${event.claimId}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

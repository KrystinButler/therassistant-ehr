import Link from "next/link";

const submissions = [
  {
    id: "SUB-7001",
    batchId: "BATCH-20260428-A",
    claimId: "CLM-1001",
    claimNumber: "TA-837P-1001",
    method: "Office Ally",
    transaction: "837P",
    submittedAt: "2026-04-28 12:00",
    submittedBy: "Billing Team",
    response: "Accepted",
    controlNumber: "CTRL-000771",
  },
  {
    id: "SUB-7002",
    batchId: "BATCH-20260424-C",
    claimId: "CLM-1002",
    claimNumber: "TA-837P-1002",
    method: "Office Ally",
    transaction: "837P",
    submittedAt: "2026-04-24 17:30",
    submittedBy: "Billing Team",
    response: "Rejected",
    controlNumber: "CTRL-000702",
  },
];

export default function ClaimSubmissionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-wide text-blue-600">Electronic Claim History</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Claim Submissions</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            History of 837P submissions and clearinghouse acknowledgments. This is a log, while rejections and denials remain task workflows.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Submission</th>
                  <th className="px-5 py-3">Batch</th>
                  <th className="px-5 py-3">Claim</th>
                  <th className="px-5 py-3">Method</th>
                  <th className="px-5 py-3">Transaction</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3">Control #</th>
                  <th className="px-5 py-3">Response</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-black">{submission.id}</td>
                    <td className="px-5 py-4">{submission.batchId}</td>
                    <td className="px-5 py-4">{submission.claimNumber}</td>
                    <td className="px-5 py-4">{submission.method}</td>
                    <td className="px-5 py-4">{submission.transaction}</td>
                    <td className="px-5 py-4">{submission.submittedAt}</td>
                    <td className="px-5 py-4">{submission.controlNumber}</td>
                    <td className="px-5 py-4 font-bold">{submission.response}</td>
                    <td className="px-5 py-4 text-right">
                      <Link className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white" href={`/claims/${submission.claimId}`}>
                        Open claim
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

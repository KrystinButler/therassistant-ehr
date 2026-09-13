import Link from "next/link";

type ClaimStatus = "draft" | "ready" | "submitted" | "accepted" | "rejected" | "denied" | "paid";

type ClaimSummary = {
  id: string;
  claimNumber: string;
  patientName: string;
  payerName: string;
  dateOfService: string;
  providerName: string;
  status: ClaimStatus;
  chargeAmount: number;
  paidAmount: number;
  patientResponsibility: number;
  ageDays: number;
  issue?: string;
};

const claims: ClaimSummary[] = [
  {
    id: "CLM-1001",
    claimNumber: "TA-837P-1001",
    patientName: "Avery Morgan",
    payerName: "Colorado Medicaid / RAE 3",
    dateOfService: "2026-04-28",
    providerName: "Lena Ortiz, LPC",
    status: "ready",
    chargeAmount: 165,
    paidAmount: 0,
    patientResponsibility: 0,
    ageDays: 0,
  },
  {
    id: "CLM-1002",
    claimNumber: "TA-837P-1002",
    patientName: "Sofia Martinez",
    payerName: "Anthem CO",
    dateOfService: "2026-04-24",
    providerName: "Noah Kim, LCSW",
    status: "rejected",
    chargeAmount: 165,
    paidAmount: 0,
    patientResponsibility: 0,
    ageDays: 4,
    issue: "Subscriber relationship missing",
  },
  {
    id: "CLM-1003",
    claimNumber: "TA-837P-1003",
    patientName: "Marcus Thompson",
    payerName: "Self Pay",
    dateOfService: "2026-04-25",
    providerName: "Priya Shah, PsyD",
    status: "paid",
    chargeAmount: 190,
    paidAmount: 190,
    patientResponsibility: 0,
    ageDays: 3,
  },
  {
    id: "CLM-1004",
    claimNumber: "TA-837P-1004",
    patientName: "Jordan Ellis",
    payerName: "UnitedHealthcare",
    dateOfService: "2026-04-18",
    providerName: "Lena Ortiz, LPC",
    status: "denied",
    chargeAmount: 145,
    paidAmount: 0,
    patientResponsibility: 0,
    ageDays: 10,
    issue: "Authorization not found for date of service",
  },
];

const statusStyles: Record<ClaimStatus, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  ready: "bg-blue-50 text-blue-700 border-blue-200",
  submitted: "bg-purple-50 text-purple-700 border-purple-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-amber-50 text-amber-700 border-amber-200",
  denied: "bg-rose-50 text-rose-700 border-rose-200",
  paid: "bg-green-50 text-green-700 border-green-200",
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{helper}</p>
    </section>
  );
}

export default function ClaimsPage() {
  const totalCharges = claims.reduce((sum, claim) => sum + claim.chargeAmount, 0);
  const unresolved = claims.filter((claim) => ["rejected", "denied"].includes(claim.status)).length;
  const ready = claims.filter((claim) => claim.status === "ready").length;
  const paid = claims.filter((claim) => claim.status === "paid").length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 rounded-3xl bg-slate-950 p-6 text-white shadow-lg lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-200">Claims lifecycle</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Claims</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              Claims are generated from signed encounter service lines. This page tracks lifecycle status,
              submission history, rejections, denials, payments, and follow-up work.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-950" href="/claims/create">
              Create Claims
            </Link>
            <Link className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-black text-white" href="/claims/submissions">
              Submission History
            </Link>
            <Link className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-black text-white" href="/payments">
              Payments
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Ready" value={String(ready)} helper="Clean claims awaiting submission" />
          <MetricCard label="Needs work" value={String(unresolved)} helper="Rejected or denied claims" />
          <MetricCard label="Paid" value={String(paid)} helper="Claims fully adjudicated" />
          <MetricCard label="Charges" value={money(totalCharges)} helper="Total claim charges in this view" />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black text-slate-950">Claim Worklist</h2>
            <p className="mt-1 text-sm text-slate-600">
              This is a lifecycle view. The Billing landing page routes users into tasks; this page lets billers manage claim records.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Claim</th>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Payer</th>
                  <th className="px-5 py-3">DOS</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Charge</th>
                  <th className="px-5 py-3 text-right">Paid</th>
                  <th className="px-5 py-3">Issue</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-black text-slate-950">{claim.claimNumber}</p>
                      <p className="text-xs text-slate-500">{claim.id} · {claim.ageDays}d old</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">{claim.patientName}</td>
                    <td className="px-5 py-4 text-slate-600">{claim.payerName}</td>
                    <td className="px-5 py-4 text-slate-600">{claim.dateOfService}</td>
                    <td className="px-5 py-4"><StatusBadge status={claim.status} /></td>
                    <td className="px-5 py-4 text-right font-bold">{money(claim.chargeAmount)}</td>
                    <td className="px-5 py-4 text-right font-bold">{money(claim.paidAmount)}</td>
                    <td className="px-5 py-4 text-slate-600">{claim.issue ?? "No active issue"}</td>
                    <td className="px-5 py-4 text-right">
                      <Link className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white" href={`/claims/${claim.id}`}>
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

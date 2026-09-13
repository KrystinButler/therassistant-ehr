"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ReadyCharge = {
  id: string;
  encounterId: string;
  patientName: string;
  payerName: string;
  dateOfService: string;
  providerName: string;
  procedureCode: string;
  diagnosisPointer: string;
  minutes: number;
  chargeAmount: number;
  readiness: "ready" | "warning" | "blocked";
  warning?: string;
};

const readyChargesSeed: ReadyCharge[] = [
  {
    id: "CHG-9001",
    encounterId: "ENC-20260428-1042",
    patientName: "Avery Morgan",
    payerName: "Colorado Medicaid / RAE 3",
    dateOfService: "2026-04-28",
    providerName: "Lena Ortiz, LPC",
    procedureCode: "90837",
    diagnosisPointer: "A",
    minutes: 53,
    chargeAmount: 165,
    readiness: "ready",
  },
  {
    id: "CHG-9002",
    encounterId: "ENC-20260424-1043",
    patientName: "Sofia Martinez",
    payerName: "Anthem CO",
    dateOfService: "2026-04-24",
    providerName: "Noah Kim, LCSW",
    procedureCode: "90837",
    diagnosisPointer: "A",
    minutes: 60,
    chargeAmount: 165,
    readiness: "warning",
    warning: "School ROI is pending; not claim-blocking.",
  },
  {
    id: "CHG-9003",
    encounterId: "ENC-20260425-1044",
    patientName: "Marcus Thompson",
    payerName: "Self Pay",
    dateOfService: "2026-04-25",
    providerName: "Priya Shah, PsyD",
    procedureCode: "90791",
    diagnosisPointer: "A",
    minutes: 75,
    chargeAmount: 190,
    readiness: "ready",
  },
];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function CreateClaimsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["CHG-9001"]));
  const [createdClaims, setCreatedClaims] = useState<string[]>([]);

  const selectedCharges = useMemo(
    () => readyChargesSeed.filter((charge) => selected.has(charge.id)),
    [selected]
  );

  const total = selectedCharges.reduce((sum, charge) => sum + charge.chargeAmount, 0);

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function createClaims() {
    const nextClaims = selectedCharges.map((charge, index) => `TA-837P-${1001 + index}`);
    setCreatedClaims(nextClaims);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-blue-600">Claims & Submission</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Create Claims</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Charges appear here only after the appointment is completed, the encounter is signed,
                and the service line passes documentation support checks.
              </p>
            </div>
            <Link className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white" href="/billing">
              Back to Billing
            </Link>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-xl font-black">Ready-to-Claim Charges</h2>
              <p className="mt-1 text-sm text-slate-600">Select clean charges to create draft 837P claims.</p>
            </div>
            <div className="divide-y divide-slate-200">
              {readyChargesSeed.map((charge) => (
                <label key={charge.id} className="flex cursor-pointer items-start gap-4 p-5 hover:bg-slate-50">
                  <input
                    className="mt-1 h-5 w-5 rounded border-slate-300"
                    type="checkbox"
                    checked={selected.has(charge.id)}
                    onChange={() => toggle(charge.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-slate-950">{charge.patientName}</p>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                        {charge.procedureCode}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        charge.readiness === "ready" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {charge.readiness}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {charge.encounterId} · {charge.dateOfService} · {charge.providerName} · {charge.payerName}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {charge.minutes} minutes · diagnosis pointer {charge.diagnosisPointer} · {money(charge.chargeAmount)}
                    </p>
                    {charge.warning && <p className="mt-2 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">{charge.warning}</p>}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Claim Batch</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Selected charges</p>
                <p className="mt-1 text-3xl font-black">{selectedCharges.length}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Total charges</p>
                <p className="mt-1 text-3xl font-black">{money(total)}</p>
              </div>
              <button
                disabled={!selectedCharges.length}
                onClick={createClaims}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-40"
              >
                Create Draft Claims
              </button>
            </div>

            {createdClaims.length > 0 && (
              <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <p className="font-black">Created draft claims</p>
                <ul className="mt-2 list-inside list-disc">
                  {createdClaims.map((claim) => <li key={claim}>{claim}</li>)}
                </ul>
                <Link className="mt-3 inline-flex font-black underline" href="/claims">
                  View claims
                </Link>
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

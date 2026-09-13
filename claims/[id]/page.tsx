"use client";

import React, { useMemo, useState } from "react";

type ClaimDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ClaimStatus = "draft" | "ready" | "submitted" | "accepted" | "rejected" | "paid";

type ClaimLine = {
  lineNumber: number;
  procedureCode: string;
  modifiers: string[];
  units: number;
  chargeAmount: number;
  allowedAmount: number;
  paidAmount: number;
  adjustmentAmount: number;
  patientResponsibilityAmount: number;
  status: string;
};

type ClaimEvent = {
  date: string;
  source: string;
  transactionType: string;
  status: string;
  message: string;
};

const statusStyles: Record<ClaimStatus, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  ready: "bg-blue-50 text-blue-700 border-blue-200",
  submitted: "bg-purple-50 text-purple-700 border-purple-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  paid: "bg-green-50 text-green-700 border-green-200",
};

const initialServiceLines: ClaimLine[] = [
  {
    lineNumber: 1,
    procedureCode: "90837",
    modifiers: ["95"],
    units: 1,
    chargeAmount: 165,
    allowedAmount: 145,
    paidAmount: 0,
    adjustmentAmount: 0,
    patientResponsibilityAmount: 0,
    status: "ready",
  },
];

const initialEvents: ClaimEvent[] = [
  {
    date: "2026-04-28 11:15",
    source: "Billing Team",
    transactionType: "manual",
    status: "draft",
    message: "Claim draft created from signed encounter ENC-20260428-1042.",
  },
  {
    date: "2026-04-28 11:12",
    source: "Billing Team",
    transactionType: "scrub",
    status: "passed",
    message: "Billing scrub passed. Diagnosis pointer, CPT, minutes, payer, and eligibility confirmed.",
  },
];

function money(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${statusStyles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function ClaimDetailPage({ params }: ClaimDetailPageProps) {
export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  const claimId = params.id;
  const claimId = resolvedParams.id;
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>("ready");
  const [events, setEvents] = useState<ClaimEvent[]>(initialEvents);
  const [serviceLines, setServiceLines] = useState<ClaimLine[]>(initialServiceLines);

  const totals = useMemo(() => {
    return serviceLines.reduce(
      (acc, line) => {
        acc.charge += line.chargeAmount;
        acc.allowed += line.allowedAmount;
        acc.paid += line.paidAmount;
        acc.adjustment += line.adjustmentAmount;
        acc.patientResponsibility += line.patientResponsibilityAmount;
        return acc;
      },
      { charge: 0, allowed: 0, paid: 0, adjustment: 0, patientResponsibility: 0 }
    );
  }, [serviceLines]);

  function addEvent(status: string, transactionType: string, message: string) {
    setEvents((current) => [
      {
        date: "2026-04-28 12:00",
        source: "TheraAssistant",
        transactionType,
        status,
        message,
      },
      ...current,
    ]);
  }

  function submitClaim() {
    setClaimStatus("submitted");
    addEvent("submitted", "837P", "837P electronic claim submitted to clearinghouse.");
  }

  function markAccepted() {
    setClaimStatus("accepted");
    addEvent("accepted", "277CA", "Clearinghouse accepted claim for payer adjudication.");
  }

  function markRejected() {
    setClaimStatus("rejected");
    addEvent("rejected", "277CA", "Claim rejected. Review subscriber/member ID, payer ID, and diagnosis pointer.");
  }

  function postEra() {
    setClaimStatus("paid");
    setServiceLines((current) =>
      current.map((line) => ({
        ...line,
        status: "paid",
        paidAmount: 118,
        adjustmentAmount: 27,
        patientResponsibilityAmount: 0,
      }))
    );
    addEvent("paid", "835", "ERA posted. Payment, contractual adjustment, and patient responsibility applied.");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-6 text-slate-950">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-blue-200">Claim Detail</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">{claimId}</h1>
              <p className="mt-2 text-sm text-slate-300">
                Avery Morgan · Colorado Medicaid / RAE 3 · DOS 2026-04-28 · Source encounter ENC-20260428-1042
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge status={claimStatus} />
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  837P Professional
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  Encounter generated
                </span>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[420px]">
              <button onClick={submitClaim} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
                Submit 837P
              </button>
              <button onClick={markAccepted} className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white">
                Mark Accepted
              </button>
              <button onClick={markRejected} className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-black text-white">
                Mark Rejected
              </button>
              <button onClick={postEra} className="rounded-2xl bg-blue-500 px-4 py-3 text-sm font-black text-white">
                Post ERA / 835
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Total Charge</p>
            <p className="mt-2 text-2xl font-black">{money(totals.charge)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Allowed</p>
            <p className="mt-2 text-2xl font-black">{money(totals.allowed)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Paid</p>
            <p className="mt-2 text-2xl font-black">{money(totals.paid)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Patient Resp.</p>
            <p className="mt-2 text-2xl font-black">{money(totals.patientResponsibility)}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">Claim Service Lines</h2>
                <p className="mt-1 text-sm text-slate-500">Generated from encounter service lines. Billing should not hand-create these unless marked manual.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="p-4">Line</th>
                    <th className="p-4">Procedure</th>
                    <th className="p-4">Units</th>
                    <th className="p-4">Charge</th>
                    <th className="p-4">Allowed</th>
                    <th className="p-4">Paid</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceLines.map((line) => (
                    <tr key={line.lineNumber} className="border-t border-slate-200">
                      <td className="p-4 font-black">{line.lineNumber}</td>
                      <td className="p-4">
                        <p className="font-black">{line.procedureCode}</p>
                        <p className="text-xs text-slate-500">Modifier: {line.modifiers.join(", ") || "None"} · Diagnosis pointer A</p>
                      </td>
                      <td className="p-4">{line.units}</td>
                      <td className="p-4">{money(line.chargeAmount)}</td>
                      <td className="p-4">{money(line.allowedAmount)}</td>
                      <td className="p-4">{money(line.paidAmount)}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-700">{line.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Claim Lifecycle Events</h2>
            <div className="mt-5 space-y-3">
              {events.map((event, index) => (
                <div key={`${event.date}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{event.message}</p>
                      <p className="mt-1 text-xs text-slate-500">{event.date} · {event.source}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-slate-700">
                      {event.transactionType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

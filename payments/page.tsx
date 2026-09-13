"use client";

import { useMemo, useState } from "react";

type PaymentMode = "client" | "insurance" | "era" | "unapplied";

const openCharges = [
  { id: "CHG-9001", patient: "Avery Morgan", claim: "CLM-1001", charge: 165, balance: 165, payer: "Colorado Medicaid / RAE 3" },
  { id: "CHG-9002", patient: "Sofia Martinez", claim: "CLM-1002", charge: 165, balance: 165, payer: "Anthem CO" },
  { id: "CHG-9004", patient: "Jordan Ellis", claim: "CLM-1004", charge: 145, balance: 145, payer: "UnitedHealthcare" },
];

const postedPaymentsSeed = [
  { id: "PMT-3001", source: "Client", patient: "Marcus Thompson", amount: 190, applied: 190, method: "Card", postedAt: "2026-04-26" },
  { id: "PMT-3002", source: "Insurance", patient: "Avery Morgan", amount: 120, applied: 120, method: "ERA 835", postedAt: "2026-04-28" },
];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function TabButton({ mode, active, label, onClick }: { mode: PaymentMode; active: PaymentMode; label: string; onClick: (mode: PaymentMode) => void }) {
  return (
    <button
      onClick={() => onClick(mode)}
      className={`rounded-2xl px-4 py-2 text-sm font-black ${
        active === mode ? "bg-slate-950 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

export default function PaymentsPage() {
  const [mode, setMode] = useState<PaymentMode>("client");
  const [amount, setAmount] = useState("50.00");
  const [postedPayments, setPostedPayments] = useState(postedPaymentsSeed);
  const totalOpen = openCharges.reduce((sum, charge) => sum + charge.balance, 0);
  const totalPosted = postedPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const helper = useMemo(() => {
    if (mode === "client") return "Manual patient/client payments such as cash, check, card, or portal payments.";
    if (mode === "insurance") return "Manual EOB posting when no ERA/835 file is available.";
    if (mode === "era") return "Electronic remittance posting from 835 files, matched to claims and service lines.";
    return "Payments received but not fully applied to charges.";
  }, [mode]);

  function postPayment() {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    setPostedPayments((current) => [
      {
        id: `PMT-${3000 + current.length + 1}`,
        source: mode === "client" ? "Client" : mode === "insurance" ? "Insurance" : mode === "era" ? "ERA" : "Unapplied",
        patient: "Avery Morgan",
        amount: parsed,
        applied: mode === "unapplied" ? 0 : parsed,
        method: mode === "client" ? "Manual card" : mode === "insurance" ? "Manual EOB" : mode === "era" ? "835 import" : "Unapplied",
        postedAt: "2026-04-28",
      },
      ...current,
    ]);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
          <p className="text-sm font-black uppercase tracking-wide text-blue-200">Payments</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Payment Posting</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Payments are posted against patients, charges, claims, and service lines. This page separates client payments,
            insurance EOB posting, ERA/835 import, and unapplied cash.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Open A/R</p>
            <p className="mt-2 text-3xl font-black">{money(totalOpen)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Posted payments</p>
            <p className="mt-2 text-3xl font-black">{money(totalPosted)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Unapplied</p>
            <p className="mt-2 text-3xl font-black">{money(postedPayments.reduce((sum, payment) => sum + payment.amount - payment.applied, 0))}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <TabButton mode="client" active={mode} label="Enter Client Payments" onClick={setMode} />
            <TabButton mode="insurance" active={mode} label="Enter Insurance Payments" onClick={setMode} />
            <TabButton mode="era" active={mode} label="ERA / 835 Posting" onClick={setMode} />
            <TabButton mode="unapplied" active={mode} label="Unapplied Payments" onClick={setMode} />
          </div>
          <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-800">{helper}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Post Payment</h2>
            <div className="mt-4 space-y-4">
              <label className="grid gap-1 text-sm font-bold">
                Patient
                <select className="rounded-2xl border border-slate-200 p-3">
                  <option>Avery Morgan</option>
                  <option>Sofia Martinez</option>
                  <option>Jordan Ellis</option>
                  <option>Marcus Thompson</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm font-bold">
                Apply to charge / claim
                <select className="rounded-2xl border border-slate-200 p-3">
                  {openCharges.map((charge) => (
                    <option key={charge.id}>{charge.id} · {charge.claim} · {money(charge.balance)}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm font-bold">
                Amount
                <input className="rounded-2xl border border-slate-200 p-3" value={amount} onChange={(event) => setAmount(event.target.value)} />
              </label>
              {mode === "insurance" || mode === "era" ? (
                <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
                  <label className="grid gap-1 text-sm font-bold">
                    Allowed amount
                    <input className="rounded-2xl border border-slate-200 p-3" defaultValue="135.00" />
                  </label>
                  <label className="grid gap-1 text-sm font-bold">
                    Contractual adjustment
                    <input className="rounded-2xl border border-slate-200 p-3" defaultValue="30.00" />
                  </label>
                  <label className="grid gap-1 text-sm font-bold">
                    Patient responsibility
                    <input className="rounded-2xl border border-slate-200 p-3" defaultValue="15.00" />
                  </label>
                </div>
              ) : null}
              {mode === "era" ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-center text-sm font-bold text-slate-500">
                  Drop 835 ERA file here or select from clearinghouse inbox.
                </div>
              ) : null}
              <button onClick={postPayment} className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
                Post Payment
              </button>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-black">Open Charges</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {openCharges.map((charge) => (
                  <div key={charge.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="font-black">{charge.patient}</p>
                      <p className="mt-1 text-sm text-slate-600">{charge.id} · {charge.claim} · {charge.payer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">Balance</p>
                      <p className="text-xl font-black">{money(charge.balance)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-black">Posted Payments</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {postedPayments.map((payment) => (
                  <div key={payment.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="font-black">{payment.id} · {payment.source}</p>
                      <p className="mt-1 text-sm text-slate-600">{payment.patient} · {payment.method} · {payment.postedAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black">{money(payment.amount)}</p>
                      <p className="text-xs font-bold text-slate-500">Applied {money(payment.applied)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

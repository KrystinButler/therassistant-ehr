import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  ["Billing", "/billing"],
  ["Submit Claims", "/billing/submit-claims"],
  ["Insurance Aging", "/billing/insurance-aging"],
  ["Patient Aging", "/billing/patient-aging"],
  ["Revenue", "/billing/revenue-report"],
  ["Note Count", "/billing/note-count"],
  ["Write-Offs", "/billing/write-offs"],
  ["Insurance Payment", "/billing/insurance-payment"],
];

export function BillingClassicShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="tn-page">
      <section className="tn-topbar">
        <Link href="/" className="tn-logo">
          <span className="tn-logo-box">Therapy<br />Notes</span>
        </Link>
        <Link href="/workqueue">To-Do</Link>
        <Link href="/scheduling">Scheduling</Link>
        <Link href="/patients">Patients</Link>
        <Link href="/staff">Staff</Link>
        <Link href="/billing" className="active">Billing</Link>
        <Link href="/payers">Payers</Link>
        <span className="tn-topbar-spacer" />
        <span>👤</span>
        <span>🔍</span>
      </section>

      <section className="tn-billing-wrap">
        <h1 className="tn-page-title">{title}</h1>
        <nav className="tn-billing-tabs">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        {children}
      </section>
    </main>
  );
}

export function BillingPanel({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="tn-panel">
      {(title || actions) && (
        <div className="tn-panel-header">
          {title ? <h2>{title}</h2> : <span />}
          <div>{actions}</div>
        </div>
      )}
      {children}
    </section>
  );
}

export function TinyBadge({ children }: { children: ReactNode }) {
  return <span className="tn-count-badge">{children}</span>;
}

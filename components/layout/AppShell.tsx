"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Dashboard" },
  { href: "/scheduling", label: "Scheduling" },
  { href: "/patients", label: "Patients" },
  { href: "/encounters", label: "Encounters" },
  { href: "/claims", label: "Claims" },
  { href: "/payments", label: "Payments" },
  { href: "/workqueue", label: "Workqueue" },
  { href: "/admin/schema-verification", label: "Schema" },
];

interface AppShellProps {
  children: ReactNode;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="te-root-shell">
      <header className="te-shell-header">
        <div className="te-shell-inner">
          <div className="te-brand-block">
            <Link href="/" className="te-brand">Therassistant</Link>
            <span>Colorado behavioral health EHR + RCM</span>
          </div>
          <nav className="te-shell-nav" aria-label="Primary">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={`te-shell-link ${isActive(pathname, item.href) ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

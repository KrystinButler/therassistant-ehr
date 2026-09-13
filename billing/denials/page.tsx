import Link from "next/link";
import { BillingClassicShell, BillingPanel } from "@/components/billing-classic/BillingClassicShell";
import { BillingClassicStyles } from "@/components/billing-classic/BillingClassicStyles";

export default function BillingAliasPage() {
  return (
    <BillingClassicShell title="Billing: Denials">
      <BillingClassicStyles />
      <BillingPanel title="Billing: Denials">
        <p>This workflow is routed through the classic billing module.</p>
        <div className="tn-btn-row">
          <Link className="tn-btn" href="/billing/electronic-claim-history">Open Workflow</Link>
          <Link className="tn-btn light" href="/billing">Back to Billing</Link>
        </div>
      </BillingPanel>
    </BillingClassicShell>
  );
}

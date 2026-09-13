import Link from "next/link";
import { BillingClassicShell, BillingPanel } from "@/components/billing-classic/BillingClassicShell";
import { BillingClassicStyles } from "@/components/billing-classic/BillingClassicStyles";

export default function BillingAliasPage() {
  return (
    <BillingClassicShell title="Billing: Claim Detail">
      <BillingClassicStyles />
      <BillingPanel title="Billing: Claim Detail">
        <p>This workflow is routed through the classic billing module.</p>
        <div className="tn-btn-row">
<Link className="tn-btn" href="/claims/clm-1003">Open Workflow</Link>
          <Link className="tn-btn light" href="/billing">Back to Billing</Link>
        </div>
      </BillingPanel>
    </BillingClassicShell>
  );
}

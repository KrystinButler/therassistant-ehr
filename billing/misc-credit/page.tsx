import Link from "next/link";
import { BillingClassicShell, BillingPanel } from "@/components/billing-classic/BillingClassicShell";
import { BillingClassicStyles } from "@/components/billing-classic/BillingClassicStyles";
import { transactions } from "@/components/billing-classic/BillingData";

export default function SimpleBillingWorkflowPage() {
  return (
    <BillingClassicShell title="Billing: Enter Miscellaneous Credit">
      <BillingClassicStyles />
      <BillingPanel title="Billing: Enter Miscellaneous Credit">
        <div className="tn-stacked-form">
          <label>Patient:</label>
          <input className="tn-input" defaultValue="Krystin Marie Butler" />
          <label>Date:</label>
          <input className="tn-input" defaultValue="4/28/2026" />
          <label>Amount:</label>
          <input className="tn-input" placeholder="$" />
          <label>Comments:</label>
          <textarea className="tn-textarea" placeholder="internal memo only" />
        </div>
        <div className="tn-btn-row">
          <button className="tn-btn green">Save</button>
          <Link href="/billing">Cancel</Link>
        </div>
      </BillingPanel>

      <BillingPanel title="Open Items">
        <table className="tn-table">
          <thead>
            <tr>
              <th>Date</th><th>Type</th><th>Primary Payer</th><th>Rate</th><th>Pt Amt</th><th>Pt Bal</th><th>Allocation</th><th>Write-Off</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 4).map((row) => (
              <tr key={`${row.date}-${row.type}`}>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.primary}</td>
                <td className="money">{row.rate}</td>
                <td className="money">{row.patientAmount}</td>
                <td className="money">{row.patientBalance}</td>
                <td><input className="tn-input" placeholder="$" style={{ width: 90 }} /></td>
                <td><input type="checkbox" /> {row.patientBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BillingPanel>
    </BillingClassicShell>
  );
}

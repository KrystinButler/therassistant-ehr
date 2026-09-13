import { BillingClassicShell, BillingPanel } from "@/components/billing-classic/BillingClassicShell";
import { BillingClassicStyles } from "@/components/billing-classic/BillingClassicStyles";

export default function EligibilityHistoryPage() {
  return (
    <BillingClassicShell title="Billing: Eligibility Verification History">
      <BillingClassicStyles />

      <BillingPanel title="Search Eligibility Reports">
        <div className="tn-form-grid">
          <label>Patient:</label>
          <input className="tn-input" defaultValue="Krystin Marie Butler" />
          <label>Payer:</label>
          <select className="tn-select"><option>Any Payer</option><option>Colorado Access</option></select>

          <label>Status:</label>
          <select className="tn-select"><option>New</option><option>Active</option><option>Inactive</option><option>Error</option></select>
          <label>Transaction Date:</label>
          <div>
            <select className="tn-select"><option>Last 7 days</option></select>{" "}
            <input className="tn-input" defaultValue="4/21/2026" style={{ width: 90 }} /> to{" "}
            <input className="tn-input" defaultValue="4/28/2026" style={{ width: 90 }} />
          </div>
        </div>
        <div className="tn-btn-row">
          <button className="tn-btn gray">Search</button>
        </div>
      </BillingPanel>

      <BillingPanel>
        <div className="tn-mini-actions"><span>▦ Select Columns</span></div>
        <table className="tn-table">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Transaction #</th>
              <th>Patient</th>
              <th>Payer</th>
              <th>Provider</th>
              <th>Date of Coverage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>There are no matching records to display.</td>
            </tr>
          </tbody>
        </table>
      </BillingPanel>
    </BillingClassicShell>
  );
}

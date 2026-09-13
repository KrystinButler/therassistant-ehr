import { BillingClassicShell, BillingPanel } from "@/components/billing-classic/BillingClassicShell";
import { BillingClassicStyles } from "@/components/billing-classic/BillingClassicStyles";
import { claimHistory } from "@/components/billing-classic/BillingData";

export default function ElectronicClaimHistoryPage() {
  return (
    <BillingClassicShell title="Billing: Electronic Claim History">
      <BillingClassicStyles />

      <BillingPanel title="Search Electronic Claim History">
        <div className="tn-form-grid">
          <label>Payer:</label>
          <select className="tn-select"><option>Any Payer</option></select>
          <label>Status:</label>
          <select className="tn-select"><option>Any Status</option><option>Accepted</option><option>Rejected</option></select>
          <label>Date:</label>
          <div>
            <select className="tn-select"><option>Last 30 days</option></select>{" "}
            <input className="tn-input" defaultValue="3/29/2026" style={{ width: 90 }} /> to{" "}
            <input className="tn-input" defaultValue="4/28/2026" style={{ width: 90 }} />
          </div>
        </div>
        <div className="tn-btn-row"><button className="tn-btn gray">Search</button></div>
      </BillingPanel>

      <BillingPanel title="Electronic Claim History">
        <table className="tn-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Batch</th>
              <th>Payer</th>
              <th>Claims</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claimHistory.map((row) => (
              <tr key={row.batch}>
                <td>{row.date}</td>
                <td>{row.batch}</td>
                <td>{row.payer}</td>
                <td>{row.claims}</td>
                <td className="money">{row.amount}</td>
                <td className={row.status === "Rejected" ? "status-red" : "status-green"}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BillingPanel>
    </BillingClassicShell>
  );
}

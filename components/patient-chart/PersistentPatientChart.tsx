"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tab =
  | "info"
  | "todo"
  | "schedule"
  | "documents"
  | "billing"
  | "billing-settings"
  | "clinicians"
  | "portal"
  | "messages"
  | "insights";

interface PatientChartProps {
  patientId: string;
  initialTab?: Tab;
}

const documents = [
  ["📄", "Superbill for 1/6/25", "PDF 50KB", "—", "1/6/2025", "Billing", "PDF"],
  ["📝", "Miscellaneous Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["🧾", "Treatment Plan", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📝", "Progress Note", "", "H0031", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["✉️", "Contact Note", "Email with Patient", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["⚠️", "Missed Appointment Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📋", "Intake Note", "", "90791", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["💬", "Consultation Note", "", "H0002", "1/6/2025", "Krystin Butler", "Signed by Author"],
];

const ledger = [
  ["1/6/25", "Misc. Charge", "K-But", "Direct", "Direct", "—", "$260.00", "$260.00", "$260.00", "—", "—", "—"],
  ["1/6/25", "H0002", "K-But", "Direct", "Direct", "—", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["1/6/25", "90791", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "Not set", "$0.00", "Submitted Claim"],
  ["1/6/25", "Missed Appt", "K-But", "Direct", "Direct", "—", "Not set", "Not set", "—", "—", "—", "—"],
  ["4/28/26", "H0031", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "Not set", "—", "—"],
];

function PatientHeader({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  const tabs: [Tab, string][] = [
    ["info", "Info"],
    ["todo", "To-Do"],
    ["schedule", "Schedule"],
    ["documents", "Documents"],
    ["billing", "Billing"],
    ["billing-settings", "Billing Settings"],
    ["clinicians", "Clinicians"],
    ["portal", "Portal"],
    ["messages", "Messages"],
    ["insights", "Insights"],
  ];

  return (
    <header className="tn-chart-header">
      <div className="tn-patient-title-row">
        <div>
          <span className="tn-patient-label">Patient:</span>
          <span className="tn-patient-name"> Krystin Marie Butler</span>
          <span className="tn-pronouns"> (she/her)</span>
          <span className="tn-dob"> 6/28/1987</span>
        </div>
        <div className="tn-header-meta">
          <span className="tn-badge-blue">2</span> <Link href="#">To-Do</Link>
          <span className="tn-calendar-icon">▣</span> No Future Appt
          <br />
          ☎ Mobile: <Link href="#">(303) 943-3946</Link> <span className="tn-muted">(No Messages)</span>
        </div>
      </div>
      <nav className="tn-tabs">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={activeTab === key ? "tn-tab active" : "tn-tab"}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <section className="tn-panel">{children}</section>;
}

function InfoTab() {
  return (
    <>
      <Panel>
        <h2>Patient Comments</h2>
        <input className="tn-full-input" placeholder="For non-clinical info such as scheduling/billing comments. All users can see this. Conveniently visible in tooltips." />
      </Panel>
      <Panel>
        <h2>Patient Information</h2>
        <div className="tn-two-col-form">
          <div className="tn-form-grid">
            <label>Legal Name:</label><div className="tn-inline"><input defaultValue="Krystin" /><input defaultValue="Marie" /><input defaultValue="Butler" /><input placeholder="suffix" /></div>
            <label>Preferred Name:</label><input placeholder="optional" />
            <label>Pronouns:</label><input defaultValue="she/her" />
            <label>Date of Birth:</label><input defaultValue="6/28/1987" />
            <label>Account Number:</label><input />
            <label>Address 1:</label><input defaultValue="18622 E Water Dr" />
            <label>Address 2:</label><input defaultValue="Unit D" />
            <label>Zip:</label><input defaultValue="80013" />
            <label>City/State:</label><div className="tn-inline"><input defaultValue="Aurora" /><select defaultValue="CO"><option>CO</option></select></div>
            <label>Time Zone:</label><select defaultValue="practice"><option value="practice">Not Set (Use practice time zone)</option></select>
            <label>Mobile Phone:</label><div className="tn-inline"><input defaultValue="(303) 943-3946" /><select><option>No messages</option></select></div>
            <label>Email:</label><input defaultValue="therassistant@outlook.com" />
          </div>
          <div className="tn-form-grid">
            <label>Administrative Sex:</label><div className="tn-radio-row"><label><input type="radio" /> Male</label><label><input type="radio" /> Female</label><label><input type="radio" /> Unknown</label></div>
            <label>Gender Identity:</label><select><option>-- Select Gender Identity --</option></select>
            <label>Sexual Orientation:</label><select><option>-- Select Sexual Orientation --</option></select>
            <label>Race:</label><input placeholder="Add Race" />
            <label>Ethnicity:</label><input placeholder="Add Ethnicity" />
            <label>Languages:</label><input placeholder="Add Language" />
            <label>Smoking Status:</label><select><option>-- Select Smoking Status --</option></select>
            <label>Marital Status:</label><select><option>-- Select Marital Status --</option></select>
            <label>Employment:</label><select><option>-- Select Employment --</option></select>
            <label>HIPAA:</label><label className="tn-check"><input type="checkbox" /> Signed HIPAA NPP on file ⚠️</label>
            <label>PCP Release:</label><select><option>Not set</option></select>
          </div>
        </div>
        <div className="tn-actions-left"><button className="tn-green">Save Changes</button><button className="tn-link-button">Cancel</button></div>
      </Panel>
      <Panel>
        <div className="tn-panel-heading-row"><h2>Contacts</h2><button className="tn-blue">+ New Contact</button></div>
        <div className="tn-two-col-form">
          <div className="tn-form-grid">
            <label>Name:</label><div className="tn-inline"><input defaultValue="Group" /><input defaultValue="Therapy" /></div>
            <label>Title:</label><input />
            <label>Company:</label><input />
          </div>
          <div className="tn-form-grid">
            <label>Mobile Phone:</label><input />
            <label>Work Phone:</label><input />
            <label>Home Phone:</label><input />
          </div>
        </div>
      </Panel>
    </>
  );
}

function DocumentsTab() {
  const [showOutcome, setShowOutcome] = useState(false);
  const measures = ["ACE: Adverse Childhood Experiences Questionnaire", "ASRS-v1.1: Adult ADHD Self-Report Scale", "AUDIT: Alcohol Use Disorders Identification Test", "BBGS: Brief Biosocial Gambling Screen", "C-SSRS: Columbia-Suicide Severity Rating Scale", "CAGE-AID: CAGE Adapted to Include Drugs", "CRAFFT 2.1+N: CRAFFT+N Questionnaire", "DAS: Dyadic Adjustment Scale", "DES II: Dissociative Experiences Scale II", "EAT-26: Eating Attitudes Test©"];

  return (
    <Panel>
      <div className="tn-panel-heading-row">
        <h2>Notes and Documents for this Patient</h2>
        <div className="tn-toolbar">
          <button className="tn-outline">☁ Upload Patient File</button>
          <div className="tn-dropdown-wrap">
            <button className="tn-blue" onClick={() => setShowOutcome(!showOutcome)}>▥ Outcome Measure ▾</button>
            {showOutcome && (
              <div className="tn-dropdown">
                <h3>Choose a questionnaire to administer now:</h3>
                <div className="tn-measure-list">
                  {measures.map((m, i) => <div key={m} className={i === 0 ? "selected" : ""}>{m}</div>)}
                </div>
              </div>
            )}
          </div>
          <button className="tn-blue">Create Note ▾</button>
        </div>
      </div>
      <div className="tn-table-tools">▣ Showing Notes and Documents &nbsp;&nbsp;▦ Select Columns</div>
      <table className="tn-table">
        <thead><tr><th>Document</th><th>Service</th><th>Date</th><th>Author/Access</th><th>Status</th><th></th></tr></thead>
        <tbody>{documents.map((row) => (
          <tr key={`${row[1]}-${row[3]}-${row[4]}`}>
            <td><span className="tn-doc-icon">{row[0]}</span> <Link href="#">{row[1]}</Link> <span className="tn-muted tiny">{row[2]}</span></td>
            <td>{row[3]}</td><td>{row[4]}</td><td><Link href="#">{row[5]}</Link></td><td>{row[6]}</td><td className="tn-actions">↗ ✎ ☁</td>
          </tr>
        ))}</tbody>
      </table>
      <Link href="#" className="tn-download">Download Multiple</Link>
    </Panel>
  );
}

function BillingTab({ mode, setMode }: { mode: string; setMode: (mode: string) => void }) {
  if (mode === "payment") return <PaymentForm setMode={setMode} />;
  if (mode === "credit") return <CreditForm setMode={setMode} />;
  if (mode === "statement") return <StatementForm setMode={setMode} />;
  return (
    <>
      <Panel>
        <h2>Patient Billing</h2>
        <p>Patient Balance Owed: <strong>$260.00</strong> <span className="tn-gap" /> Unassigned Credit: <strong>$0.00</strong></p>
        <hr className="tn-blue-line" />
        <div className="tn-three-col-links">
          <div><h3>Patient Accounting</h3><button onClick={() => setMode("payment")} className="tn-text-link">Enter Patient Payment</button><button className="tn-text-link">Enter Misc Charge</button><button className="tn-text-link">Enter Refund</button><button onClick={() => setMode("credit")} className="tn-text-link">Enter Misc Credit</button><button onClick={() => setMode("statement")} className="tn-text-link">Create Statement</button></div>
          <div><h3>Insurance Claims</h3><Link href="/billing/eligibility">Eligibility History <span className="tn-count">0</span></Link><Link href="/claims/create">Submit Primary Claims <span className="tn-count blue">0</span></Link><Link href="/claims/create">Submit Secondary Claims <span className="tn-count">0</span></Link><Link href="/claims/create">Create CMS-1500 <span className="tn-count">0</span></Link><Link href="#">Create Superbill</Link></div>
          <div><h3>Insurance Payments</h3><Link href="/payments">Enter Insurance Payment</Link><Link href="/claims/submissions">Electronic Claim History <span className="tn-count">0</span></Link><Link href="/payments">ERA</Link></div>
        </div>
      </Panel>
      <Panel>
        <div className="tn-search-row"><h2>Search Billing Transactions</h2><button className="tn-pill active">Open Items</button><button className="tn-pill">All Items</button><button className="tn-pill">Custom</button></div>
        <div className="tn-table-tools">▧ Export Spreadsheet &nbsp;&nbsp;▦ Select Columns</div>
        <BillingLedger />
      </Panel>
    </>
  );
}

function BillingLedger() {
  return (
    <table className="tn-table">
      <thead><tr><th>▲ Date</th><th>Type</th><th>Clin</th><th>Network</th><th>Primary Payer</th><th>Secondary Payer</th><th>Rate</th><th>Pt Amt</th><th>Pt Bal</th><th>Ins Amt</th><th>Ins Paid</th><th>Ins Status</th></tr></thead>
      <tbody>{ledger.map((row) => <tr key={row.join("-")}>{row.map((cell, i) => <td key={i} className={i > 5 ? "tn-money" : ""}>{cell}</td>)}</tr>)}</tbody>
    </table>
  );
}

function PaymentForm({ setMode }: { setMode: (mode: string) => void }) {
  return (
    <Panel>
      <div className="tn-green-ribbon">Create New Payment</div>
      <h2>Patient Payment</h2>
      <p>Patient Balance Owed: <strong>$260.00</strong> <span className="tn-gap" /> Unassigned Credit: <strong>$0.00</strong></p>
      <hr className="tn-blue-line" />
      <div className="tn-form-grid compact">
        <label>Payment Method:</label><div className="tn-methods"><button className="selected">✓ Check</button><button>Cash</button><button>External</button></div>
        <label>Payment Date:</label><input defaultValue="4/28/2026" />
        <label>Payment Amount:</label><input placeholder="$" />
        <label>Check Number:</label><input placeholder="optional" />
        <label>Comments:</label><textarea placeholder="Internal memo only" />
      </div>
      <h3>Open Items Awaiting Payment:</h3>
      <BillingLedger />
      <div className="tn-total-row">Total Allocated: <strong>$0.00</strong></div>
      <div className="tn-actions-left"><button className="tn-green">Save New Payment</button><button onClick={() => setMode("list")} className="tn-link-button">Cancel</button></div>
    </Panel>
  );
}

function CreditForm({ setMode }: { setMode: (mode: string) => void }) {
  return (
    <Panel>
      <div className="tn-green-ribbon">Create New Credit</div>
      <h2>Miscellaneous Patient Credit</h2>
      <p>Patient Balance Owed: <strong>$260.00</strong> <span className="tn-gap" /> Unassigned Credit: <strong>$0.00</strong></p>
      <hr className="tn-blue-line" />
      <div className="tn-form-grid compact"><label>Credit Date:</label><input defaultValue="4/28/2026" /><label>Credit Amount:</label><input placeholder="$" /><label>Credit Reason:</label><input placeholder="optional" /><label>Comments:</label><textarea placeholder="Internal memo only" /></div>
      <h3>Open Items Awaiting Payment:</h3><BillingLedger />
      <div className="tn-actions-left"><button className="tn-green">Save New Credit</button><button onClick={() => setMode("list")} className="tn-link-button">Cancel</button></div>
    </Panel>
  );
}

function StatementForm({ setMode }: { setMode: (mode: string) => void }) {
  return (
    <>
      <Panel>
        <h2>Create Statement</h2>
        <p>Patient Balance Owed: <strong>$260.00</strong> <span className="tn-gap" /> Unassigned Credit: <strong>$0.00</strong></p>
        <hr className="tn-blue-line" />
        <label><input type="radio" defaultChecked /> All open charges for the selected patient</label>
        <div className="tn-inline"><label><input type="radio" /> Charges from</label><select><option>Last 30 days</option></select><input defaultValue="3/29/2026" /><span>to</span><input defaultValue="4/28/2026" /></div>
        <label>Statement Comment:</label><textarea className="tn-editor" placeholder="A comment to display at the end of the statement" />
        <button className="tn-blue">Generate Preview</button>
      </Panel>
      <Panel>
        <h2>Statement Preview</h2><hr className="tn-blue-line" />
        <div className="tn-statement-header"><div>Krystin Butler<br />18622 E Water Dr<br />Unit D<br />Aurora, CO 80013</div><div>04/28/2026<br />All open charges</div></div>
        <table className="tn-table simple"><thead><tr><th>Date</th><th>Transaction</th><th>Rate</th><th>Insurance</th><th>Client</th></tr></thead><tbody>{ledger.map((r) => <tr key={`stmt-${r[0]}-${r[1]}`}><td>{r[0]}</td><td>{r[1]}</td><td>{r[6]}</td><td>{r[9]}</td><td>{r[8]}</td></tr>)}</tbody></table>
        <div className="tn-amount-due">Amount Due: $260.00</div>
        <div className="tn-actions-left"><button className="tn-green">Save Statement</button><button onClick={() => setMode("list")} className="tn-link-button">Cancel</button></div>
      </Panel>
    </>
  );
}

function BillingSettingsTab() {
  return (
    <>
      <Panel><div className="tn-panel-heading-row"><h2>Billing Comments: <span className="tn-muted">None</span></h2><Link href="#">✎ Edit</Link></div></Panel>
      <Panel><div className="tn-panel-heading-row"><h2>Insurance</h2><Link href="#">✎ Edit</Link></div><div className="tn-inner-box"><h3><Link href="#">Colorado Access (84129)</Link>: Primary</h3><div className="tn-policy-info"><strong>Policy Information</strong><br />Copay: <strong>Not set</strong><br />Member ID: <strong>12346</strong><br />Policy Holder: <strong>Self</strong><br />Eligibility: <strong>Not verified</strong></div><button className="tn-blue">Verify Eligibility</button></div></Panel>
      <Panel><div className="tn-panel-heading-row"><h2>Additional Claim Information: <span className="tn-muted">None</span></h2><Link href="#">✎ Edit</Link></div></Panel>
      <Panel><div className="tn-panel-heading-row"><h2>Payment Settings</h2><Link href="#">✎ Edit</Link></div><p>Responsible Party for Billing: <strong>The Patient</strong></p></Panel>
      <Panel><div className="tn-panel-heading-row"><h2>Patient Cash Rates: <span className="tn-muted">None</span></h2><Link href="#">✎ Edit</Link></div></Panel>
    </>
  );
}

function ToDoTab() {
  return <Panel><div className="tn-panel-heading-row"><h2>Patient To-Do List</h2><button className="tn-blue">+ New Reminder</button></div><h3>Notes <span className="tn-count blue">2</span></h3><table className="tn-table"><thead><tr><th>Date</th><th>To-Do Items</th><th></th></tr></thead><tbody><tr><td>3/7/25</td><td><Link href="#">Consider creating a Termination Note since there have been no appointments for at least 60 days.</Link></td><td>×</td></tr><tr><td>4/6/25</td><td><Link href="#">Create a new Treatment Plan since the most recent Treatment Plan is more than 90 days old.</Link></td><td>×</td></tr></tbody></table></Panel>;
}

function PortalTab() {
  return (
    <>
      <Panel><h2>◌ TherapyPortal Access</h2><p>This patient does not have an account on the practice's client portal. A portal account is required to view shared documents, complete paperwork, manage appointments, and join telehealth sessions.</p><p>Email Address: Therassistant@outlook.com</p><button className="tn-green">Send Welcome Email</button></Panel>
      <Panel><div className="tn-panel-heading-row"><h2>Document Requests</h2><button className="tn-blue">Share Documents</button></div><div><button className="tn-pill active">All</button><button className="tn-pill">0 Needs Processing</button><button className="tn-pill">0 Waiting on Patient</button><button className="tn-pill">Custom</button></div><table className="tn-table"><thead><tr><th>Document</th><th>Sent</th><th>Received</th><th>Status</th></tr></thead><tbody><tr><td colSpan={4} className="tn-empty">There are no matching portal documents to display.</td></tr></tbody></table></Panel>
    </>
  );
}

function MessagesTab() {
  return <Panel><div className="tn-panel-heading-row"><h2>Patient Messages</h2><button className="tn-blue">+ New Conversation</button></div><div className="tn-message-grid"><aside><div className="selected">▣ Inbox</div><div>▣ Admin</div><div>▣ Billing</div><div>▣ Clinical</div><div>▣ Deleted</div></aside><section><select><option>All Topics</option></select><div className="tn-empty">There are no messages to be displayed.</div></section><main className="tn-empty">Select a conversation</main></div></Panel>;
}

function InsightsTab() {
  return <Panel><h2>Outcome Measures</h2><div className="tn-inline"><select><option>Last 365 days</option></select><input defaultValue="4/28/2025" /><span>to</span><input defaultValue="4/28/2026" /></div><p>There are no chartable results for the selected date range.</p></Panel>;
}

function ScheduleTab() {
  const [modal, setModal] = useState(false);
  return <Panel><div className="tn-panel-heading-row"><h2>Patient Schedule</h2><button className="tn-blue" onClick={() => setModal(true)}>+ New Appointment</button></div><table className="tn-table"><thead><tr><th>Date</th><th>Time</th><th>Type</th><th>Status</th></tr></thead><tbody><tr><td>4/28/2026</td><td>10:00 AM</td><td>Psychotherapy 90837</td><td>Scheduled</td></tr></tbody></table>{modal && <AppointmentModal onClose={() => setModal(false)} />}</Panel>;
}

function AppointmentModal({ onClose }: { onClose: () => void }) {
  return <div className="tn-modal-backdrop"><div className="tn-modal"><button className="tn-modal-x" onClick={onClose}>×</button><h2>Create New Appointment</h2><div className="tn-form-grid"><label>Appointment Type:</label><select><option>Therapy Session</option></select><label>Patient:</label><input defaultValue="Krystin Marie Butler 6/28/1987" /><label>Clinician:</label><input defaultValue="Krystin Butler" /><label>Location:</label><input defaultValue="Conscious Counseling PLLC" /><label>Telehealth:</label><label><input type="checkbox" /> Use TherapyNotes Telehealth</label><label>Service Code:</label><select><option>90837: Therapy Session</option></select><label>Scheduled Time:</label><div className="tn-inline"><input placeholder="m/d/yyyy" /><span>at</span><input placeholder="h:mm am" /></div><label>Duration:</label><div className="tn-inline"><input defaultValue="60" /><span>minutes</span></div><label>Frequency:</label><select><option>One time</option></select><label>Appointment Alert:</label><textarea /></div><button className="tn-green">Save New Appointment</button></div></div>;
}

function NotesTab() {
  const mental = ["General Appearance", "Dress", "Motor Activity", "Insight", "Judgment", "Affect", "Mood", "Orientation", "Memory", "Attention/Concentration", "Thought Content", "Perception", "Flow of Thought", "Interview Behavior", "Speech"];
  return <Panel><div className="tn-green-ribbon">Creating New Note</div><h2>Psychotherapy Intake Note</h2><div className="tn-note-meta"><div><strong>Clinician:</strong> Krystin Butler<br /><strong>Patient:</strong> Krystin Marie Butler, DOB 6/28/1987<br /><strong>Primary Insurance:</strong> Colorado Access, 12346</div><div><strong>Date and Time:</strong> April 28, 2026 10:00AM - 10:53AM<br /><strong>Duration:</strong> 53 minutes<br /><strong>Service Code:</strong> 90837<br /><strong>Location:</strong> Main Office</div></div><hr className="tn-blue-line" /><h3>Presenting Problem</h3><textarea className="tn-wide-textarea" /><h3>Current Mental Status</h3><div className="tn-mental-grid">{mental.map((m) => <label key={m}>{m}:<input /></label>)}</div><h3>Safety Issues</h3><div className="tn-inline"><label><input type="checkbox" /> None</label><span>or</span><label><input type="checkbox" /> Suicidal Ideation</label><label><input type="checkbox" /> Homicidal Ideation</label><label>Other: <input placeholder="other safety issue" /></label></div>{["Background Information", "Risk Assessment", "Medications", "Symptom Description and Subjective Report", "Relevant Content", "Clinical Interventions", "Plan", "Diagnosis"].map((section) => <div key={section}><h3>{section}</h3><textarea className="tn-wide-textarea" placeholder={section === "Diagnosis" ? "F43.1 Adjustment disorder placeholder" : ""} /></div>)}<div className="tn-actions-left"><button className="tn-green">Save Draft</button><button className="tn-blue">Sign Note</button></div></Panel>;
}

export default function PersistentPatientChart({ initialTab = "info" }: PatientChartProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [billingMode, setBillingMode] = useState("list");
  const rendered = useMemo(() => {
    if (activeTab === "info") return <InfoTab />;
    if (activeTab === "todo") return <ToDoTab />;
    if (activeTab === "schedule") return <ScheduleTab />;
    if (activeTab === "documents") return <DocumentsTab />;
    if (activeTab === "billing") return <BillingTab mode={billingMode} setMode={setBillingMode} />;
    if (activeTab === "billing-settings") return <BillingSettingsTab />;
    if (activeTab === "portal") return <PortalTab />;
    if (activeTab === "messages") return <MessagesTab />;
    if (activeTab === "insights") return <InsightsTab />;
    if (activeTab === "clinicians") return <Panel><h2>Clinicians</h2><p>Assigned Clinician: <strong>Krystin Butler</strong></p></Panel>;
    return null;
  }, [activeTab, billingMode]);

  return <div className="tn-chart"><PatientHeader activeTab={activeTab} setActiveTab={setActiveTab} />{rendered}</div>;
}

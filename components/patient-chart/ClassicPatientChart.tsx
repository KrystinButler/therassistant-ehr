"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PatientChartTab =
  | "info"
  | "todo"
  | "schedule"
  | "documents"
  | "billing"
  | "billing-settings"
  | "clinicians"
  | "portal"
  | "messages"
  | "insights"
  | "payment"
  | "notes"
  | "statement"
  | "new-patient";

type PatientChartShellProps = {
  patientId?: string;
  activeTab?: PatientChartTab;
  mode?: "existing" | "new";
};

const patient = {
  id: "PAT-1000001",
  name: "Krystin Marie Butler",
  preferred: "Krystin",
  pronouns: "she/her",
  dob: "6/28/1987",
  age: "38",
  mobile: "(303) 943-3946",
  clinician: "Krystin Butler",
  email: "therassistant@outlook.com",
  balance: "$260.00",
  credit: "$0.00",
};

const documents = [
  ["📄", "Superbill for 1/6/25", "PDF 50KB", "", "1/6/2025", "Billing", "", "↗ ✎ ☁"],
  ["📝", "Miscellaneous Note", "", "", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["🧾", "Treatment Plan", "", "", "1/6/2025", "Krystin Butler", "Signed by Author", "↗ ✎ ☁"],
  ["📝", "Miscellaneous Note", "", "", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["📋", "Progress Note", "", "H0031", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["✉️", "Contact Note", "Email with Patient", "", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["🧾", "Treatment Plan", "", "", "1/6/2025", "Krystin Butler", "Signed by Author", "↗ ✎ ☁"],
  ["🚫", "Missed Appointment Note", "", "", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["📑", "Intake Note", "", "90791", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["🔍", "Consultation Note", "", "H0002", "1/6/2025", "Krystin Butler", "Signed by Author", "✎ ☁"],
  ["📄", "Psychotherapy Note", "", "", "1/6/2025", "Krystin Butler", "", "✎ ☁"],
];

const ledgerRows = [
  ["1/6/25", "Misc. Charge", "from Misc. Note", "K-But", "Direct", "Direct", "", "$260.00", "$260.00", "$260.00", "—", "—", "—"],
  ["1/6/25", "H0002", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["1/6/25", "90791", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "Not set", "$0.00", "Submitted Claim"],
  ["1/6/25", "Missed Appt", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "—", "—"],
  ["1/6/25", "H0031", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["4/28/26", "H0031", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "—", "—", "—"],
];

const tabs: Array<[PatientChartTab, string, string]> = [
  ["info", "Info", ""],
  ["todo", "To-Do", "/todo"],
  ["schedule", "Schedule", "/schedule"],
  ["documents", "Documents", "/documents"],
  ["billing", "Billing", "/patient-billing"],
  ["billing-settings", "Billing Settings", "/billing-settings"],
  ["clinicians", "Clinicians", "/clinicians"],
  ["portal", "Portal", "/portal"],
  ["messages", "Messages", "/messages"],
  ["insights", "Insights", "/insights"],
];

function patientBase(patientId = "PAT-1000001") {
  return `/patients/${patientId}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="tn-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function TextInput({ placeholder = "", value }: { placeholder?: string; value?: string }) {
  return <input className="tn-input" placeholder={placeholder} defaultValue={value} />;
}

function SelectInput({ children }: { children: React.ReactNode }) {
  return <select className="tn-input">{children}</select>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="tn-badge">{children}</span>;
}

function TopNav() {
  return (
    <div className="tn-topbar">
      <Link className="tn-logo" href="/">TheraAssistant</Link>
      <Link href="/workqueue">To-Do</Link>
      <Link href="/scheduling">Scheduling</Link>
      <Link className="active" href="/patients/PAT-1000001">Patients</Link>
      <Link href="/staff">Staff</Link>
      <Link href="/billing">Billing</Link>
      <Link href="/payers">Payers</Link>
      <span className="tn-spacer" />
      <span>👤⌄</span>
      <span>🔍</span>
    </div>
  );
}

function PatientHeader({ patientId = "PAT-1000001", activeTab = "info", mode = "existing" }: PatientChartShellProps) {
  const base = patientBase(patientId);
  return (
    <header className="tn-patient-header">
      <div className="tn-patient-title-row">
        <div>
          <h1>
            <span>Patient:</span>{" "}
            {mode === "new" ? "Add a New Patient" : (
              <>
                {patient.name} <em>({patient.pronouns})</em> <small>{patient.dob}</small>
              </>
            )}
          </h1>
        </div>
        {mode === "existing" && (
          <div className="tn-header-meta">
            <div><Badge>2</Badge> <Link href={`${base}/todo`}>To-Do</Link> <span>📅 No Future Appt</span></div>
            <div>☎ Mobile: <a href="#">{patient.mobile}</a> <span>(No Messages)</span></div>
          </div>
        )}
      </div>
      {mode === "existing" && (
        <nav className="tn-tabs">
          {tabs.map(([key, label, path]) => (
            <Link key={key} className={activeTab === key ? "active" : ""} href={`${base}${path}`}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function PatientComments() {
  return (
    <section className="tn-panel">
      <h2>Patient Comments</h2>
      <input className="tn-wide-input" placeholder="For non-clinical info such as scheduling/billing comments. All users can see this. Conveniently visible in tooltips." />
    </section>
  );
}

function InfoTab({ mode = "existing" }: { mode?: "existing" | "new" }) {
  return (
    <>
      <PatientComments />
      <section className="tn-panel">
        <h2>Patient Information</h2>
        <div className="tn-two-col">
          <div>
            <Field label="Legal Name:">
              <span className="tn-inline">
                <TextInput placeholder="first" value={mode === "existing" ? "Krystin" : ""} />
                <TextInput placeholder="middle" value={mode === "existing" ? "Marie" : ""} />
                <TextInput placeholder="last" value={mode === "existing" ? "Butler" : ""} />
                <TextInput placeholder="suffix" />
              </span>
            </Field>
            <Field label="Preferred Name:"><TextInput placeholder="optional" value={mode === "existing" ? "Krystin" : ""} /></Field>
            <Field label="Pronouns:"><TextInput value={mode === "existing" ? "she/her" : ""} /></Field>
            <Field label="Date of Birth:"><TextInput placeholder="m/d/yyyy" value={mode === "existing" ? "6/28/1987" : ""} /></Field>
            <Field label="Account Number:"><TextInput /></Field>
            <Field label="Address 1:"><TextInput value={mode === "existing" ? "18622 E Water Dr" : ""} /></Field>
            <Field label="Address 2:"><TextInput value={mode === "existing" ? "Unit D" : ""} /></Field>
            <Field label="Zip:"><TextInput placeholder="zip code" value={mode === "existing" ? "80013" : ""} /></Field>
            <Field label="City/State:"><span className="tn-inline"><TextInput placeholder="city" value={mode === "existing" ? "Aurora" : ""} /><SelectInput><option>CO</option><option>---</option></SelectInput></span></Field>
            <Field label="Time Zone:"><SelectInput><option>Not Set (Use practice time zone)</option><option>Mountain Time</option></SelectInput></Field>
            <Field label="Mobile Phone:"><span className="tn-inline"><TextInput value={mode === "existing" ? "(303) 943-3946" : ""} /><SelectInput><option>No messages</option><option>Text messages OK</option></SelectInput></span></Field>
            <Field label="Home Phone:"><span className="tn-inline"><TextInput /><SelectInput><option>No messages</option></SelectInput></span></Field>
            <Field label="Work Phone:"><span className="tn-inline"><TextInput /><SelectInput><option>No messages</option></SelectInput></span></Field>
            <Field label="Other Phone:"><span className="tn-inline"><TextInput /><SelectInput><option>No messages</option></SelectInput></span></Field>
            <Field label="Email:"><TextInput value={mode === "existing" ? patient.email : ""} /></Field>
            <Field label="Appt Reminders:"><SelectInput><option>Default Practice Setting (Text/Call and Email)</option><option>No Reminders</option></SelectInput></Field>
          </div>
          <div>
            <Field label="Administrative Sex:">
              <span className="tn-radio-row"><label><input type="radio" /> Male</label><label><input type="radio" /> Female</label><label><input type="radio" /> Unknown</label></span>
            </Field>
            <Field label="Gender Identity:"><SelectInput><option>-- Select Gender Identity --</option><option>Woman</option><option>Man</option><option>Nonbinary</option></SelectInput></Field>
            <Field label="Sexual Orientation:"><SelectInput><option>-- Select Sexual Orientation --</option></SelectInput></Field>
            <Field label="Race:"><TextInput placeholder="Add Race" /></Field>
            <Field label="Ethnicity:"><TextInput placeholder="Add Ethnicity" /></Field>
            <Field label="Languages:"><TextInput placeholder="Add Language" value="English" /></Field>
            <Field label="Smoking Status:"><SelectInput><option>-- Select Smoking Status --</option></SelectInput></Field>
            <Field label="Marital Status:"><SelectInput><option>-- Select Marital Status --</option></SelectInput></Field>
            <Field label="Employment:"><SelectInput><option>-- Select Employment --</option></SelectInput></Field>
            <Field label="Religious Affiliation:"><TextInput placeholder="Add Religious Affiliation" /></Field>
            <Field label="HIPAA:"><span className="tn-check"><input type="checkbox" /> Signed HIPAA NPP on file ⚠️</span></Field>
            <Field label="PCP Release:"><span className="tn-inline"><SelectInput><option>Not set</option></SelectInput><span>⚠️</span></span></Field>
          </div>
        </div>
        <div className="tn-actions">
          <button className="tn-green">{mode === "new" ? "Save New Patient" : "Save Changes"}</button>
          {mode === "new" && <button className="tn-green">Save and Create Another</button>}
          <a href="#">Cancel</a>
          {mode === "existing" && <a className="danger" href="#">Delete Patient</a>}
        </div>
      </section>
      <section className="tn-panel">
        <div className="tn-section-head">
          <h2>{mode === "new" ? "Assigned Clinician:" : "Contacts"}</h2>
          {mode === "existing" && <button className="tn-blue">+ New Contact</button>}
        </div>
        {mode === "new" ? (
          <input className="tn-token" defaultValue="Krystin Butler     ×" />
        ) : (
          <div className="tn-two-col">
            <div>
              <Field label="Name:"><span className="tn-inline"><TextInput value="Group" /><TextInput value="Therapy" /></span></Field>
              <Field label=""><span className="tn-inline"><TextInput value="Participant" /><TextInput placeholder="suffix" /></span></Field>
              <Field label="Title:"><TextInput /></Field>
              <Field label="Company:"><TextInput /></Field>
            </div>
            <div>
              <Field label="Mobile Phone:"><TextInput /></Field>
              <Field label="Work Phone:"><TextInput /></Field>
              <Field label="Home Phone:"><TextInput /></Field>
              <Field label="Fax:"><TextInput /></Field>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function ToDoTab() {
  return (
    <section className="tn-panel">
      <div className="tn-section-head">
        <h2>Patient To-Do List</h2>
        <button className="tn-blue">+ New Reminder</button>
      </div>
      <h3>Notes <Badge>2</Badge></h3>
      <table className="tn-table">
        <thead><tr><th>Date</th><th>To-Do Items</th><th></th></tr></thead>
        <tbody>
          <tr><td>3/7/25</td><td><a>Consider creating a Termination Note since there have been no appointments for at least 60 days.</a></td><td>×</td></tr>
          <tr><td>4/6/25</td><td><a>Create a new Treatment Plan since the most recent Treatment Plan is more than 90 days old.</a></td><td>×</td></tr>
        </tbody>
      </table>
    </section>
  );
}

function ScheduleTab() {
  return (
    <section className="tn-panel">
      <div className="tn-section-head">
        <h2>Patient Schedule</h2>
        <button className="tn-blue">+ New Appointment</button>
      </div>
      <div className="tn-calendar-mini">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <strong key={d}>{d}</strong>)}
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className={i === 11 ? "today" : ""}>
            <span>{i + 1}</span>
            {i === 10 && <p>10a Therapy Session</p>}
            {i === 17 && <p>2p Intake</p>}
            {i === 25 && <p>11a Follow-up</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function DocumentsTab() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <section className="tn-panel">
      <div className="tn-section-head documents">
        <h2>Notes and Documents for this Patient</h2>
        <div className="tn-actions tight">
          <button className="tn-light">☁ Upload Patient File</button>
          <button className="tn-blue" onClick={() => setDropdown(!dropdown)}>▥ Outcome Measure ▾</button>
          <Link className="tn-blue link-button" href={`${patientBase()}/notes`}>☑ Create Note ▾</Link>
        </div>
      </div>
      {dropdown && (
        <div className="tn-outcome-menu">
          <p>Choose a questionnaire to administer now:</p>
          {["ACE: Adverse Childhood Experiences Questionnaire","ASRS-v1.1: Adult ADHD Self-Report Scale","AUDIT: Alcohol Use Disorders Identification Test","BBGS: Brief Biosocial Gambling Screen","C-SSRS: Columbia-Suicide Severity Rating Scale","CAGE-AID: CAGE Adapted to Include Drugs","CRAFFT 2.1+N: CRAFFT+N Questionnaire (Version 2.1)","DAS: Dyadic Adjustment Scale","DES II: Dissociative Experiences Scale II","EAT-26: Eating Attitudes Test©"].map((m,i) => (
            <button key={m} className={i === 0 ? "selected" : ""}>{m}</button>
          ))}
        </div>
      )}
      <div className="tn-table-tools">⇱ Showing Notes and Documents &nbsp;&nbsp;▦ Select Columns</div>
      <table className="tn-table document-table">
        <thead><tr><th>Document</th><th>Service</th><th>▾ Date</th><th>Author/Access</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {documents.map((row) => (
            <tr key={`${row[1]}-${row[4]}-${row[5]}`}>
              <td><span className="doc-icon">{row[0]}</span> <a>{row[1]}</a> <small>{row[2]}</small></td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td><a>{row[5]}</a></td>
              <td>{row[6]}</td>
              <td className="muted-actions">{row[7]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="download">Download Multiple</p>
    </section>
  );
}

function BillingTab() {
  return (
    <>
      <section className="tn-panel">
        <h2>Patient Billing</h2>
        <p className="tn-balance-line">Patient Balance Owed: <strong>{patient.balance}</strong> <span /> Unassigned Credit: <strong>{patient.credit}</strong></p>
        <hr />
        <div className="tn-three-col">
          <div>
            <h3>Patient Accounting</h3>
            <Link href={`${patientBase()}/payment`}>Enter Patient Payment</Link>
            <a>Enter Misc Charge</a>
            <a>Enter Refund</a>
            <a>Enter Misc Credit</a>
            <Link href={`${patientBase()}/statement`}>Create Statement</Link>
          </div>
          <div>
            <h3>Insurance Claims</h3>
            <a>Eligibility History <span className="pill">0</span></a>
            <a>Submit Primary Claims <span className="pill">0</span></a>
            <a>Submit Secondary Claims <span className="pill">0</span></a>
            <a>Create CMS-1500 <span className="pill">0</span></a>
            <a>Create Superbill</a>
          </div>
          <div>
            <h3>Insurance Payments</h3>
            <a>Enter Insurance Payment</a>
            <a>Electronic Claim History <span className="pill">0</span></a>
            <a>ERA</a>
          </div>
        </div>
      </section>
      <BillingLedger title="Search Billing Transactions" />
    </>
  );
}

function BillingLedger({ title = "Open Items Awaiting Payment:" }: { title?: string }) {
  return (
    <section className="tn-panel">
      <div className="tn-section-head">
        <h2>{title}</h2>
        <div className="segmented"><button className="active">Open Items</button><button>All Items</button><button>Custom</button></div>
      </div>
      <div className="tn-table-tools">▣ Export Spreadsheet &nbsp;&nbsp;▦ Select Columns</div>
      <table className="tn-table ledger">
        <thead><tr><th>▴ Date</th><th>Type</th><th>Clin</th><th>Network</th><th>Primary Payer</th><th>Secondary Payer</th><th>Rate</th><th>Pt Amt</th><th>Pt Bal</th><th>Ins Amt</th><th>Ins Paid</th><th>Ins Status</th></tr></thead>
        <tbody>
          {ledgerRows.map((r, i) => (
            <tr key={i}>
              <td>{r[0]}</td><td><a>{r[1]}</a><small>{r[2]}</small></td><td><a>{r[3]}</a></td><td>{r[4]}</td><td>{r[5]}</td><td>{r[6]}</td><td>{r[7]}</td><td>{r[8]}</td><td>{r[9]}</td><td>{r[10]}</td><td>{r[11]}</td><td className={r[12] !== "—" ? "status" : ""}>{r[12]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function BillingSettingsTab() {
  return (
    <>
      <section className="tn-strip"><h2>Billing Comments: <span>None</span></h2><a>✎ Edit</a></section>
      <section className="tn-panel">
        <div className="tn-section-head"><h2>Insurance</h2><a>✎ Edit</a></div>
        <div className="insurance-card">
          <h3><a>Colorado Access (84129)</a>: Primary</h3>
          <div className="policy-grid">
            <strong>Policy Information</strong>
            <p>Copay: <b>Not set</b></p>
            <p>Member ID: <b>12346</b></p>
            <p>Policy Holder: <b>Self</b></p>
            <p>Eligibility: <b>Not verified</b></p>
          </div>
          <button className="tn-blue">Verify Eligibility</button>
        </div>
      </section>
      {["Additional Claim Information: None","Payment Settings","Patient Cash Rates: None"].map((title) => (
        <section className="tn-strip" key={title}><h2>{title}</h2><a>✎ Edit</a></section>
      ))}
    </>
  );
}

function PaymentTab({ kind = "payment" }: { kind?: "payment" | "credit" }) {
  return (
    <section className="tn-panel">
      <div className="tn-green-ribbon">{kind === "payment" ? "Create New Payment" : "Create New Credit"}</div>
      <h2>{kind === "payment" ? "Patient Payment" : "Miscellaneous Patient Credit"}</h2>
      <p className="tn-balance-line">Patient Balance Owed: <strong>{patient.balance}</strong> <span /> Unassigned Credit: <strong>{patient.credit}</strong></p>
      <hr />
      {kind === "payment" ? (
        <>
          <Field label="Payment Method:"><span className="tn-button-group"><button className="selected">✓ Check</button><button>Cash</button><button>External</button></span></Field>
          <div className="tn-payment-links">+ Add card &nbsp;&nbsp;&nbsp; + Swipe card</div>
          <Field label="Payment Date:"><TextInput value="4/28/2026" /></Field>
          <Field label="Payment Amount:"><TextInput placeholder="$" /></Field>
          <Field label="Check Number:"><TextInput placeholder="optional" /></Field>
        </>
      ) : (
        <>
          <Field label="Credit Date:"><TextInput value="4/28/2026" /></Field>
          <Field label="Credit Amount:"><TextInput placeholder="$" /></Field>
          <Field label="Credit Reason:"><TextInput placeholder="optional" /></Field>
        </>
      )}
      <Field label="Comments:"><textarea className="tn-textarea short" placeholder="Internal memo only" /></Field>
      <BillingLedger title="Open Items Awaiting Payment:" />
      <div className="tn-actions"><button className="tn-green">{kind === "payment" ? "Save New Payment" : "Save New Credit"}</button><a>Cancel</a></div>
    </section>
  );
}

function StatementTab() {
  return (
    <>
      <section className="tn-panel">
        <h2>Create Statement</h2>
        <p className="tn-balance-line">Patient Balance Owed: <strong>{patient.balance}</strong> <span /> Unassigned Credit: <strong>{patient.credit}</strong></p>
        <hr />
        <label className="radio-line"><input type="radio" defaultChecked /> All open charges for the selected patient</label>
        <label className="radio-line"><input type="radio" /> Charges from <select><option>Last 30 days</option></select> <input defaultValue="3/29/2026" /> to <input defaultValue="4/28/2026" /></label>
        <p>Statement Comment: <a className="right-link">Settings</a></p>
        <textarea className="statement-editor" placeholder="A comment to display at the end of the statement" />
        <button className="tn-blue">Generate Preview</button>
      </section>
      <section className="tn-panel">
        <h2>Statement Preview</h2>
        <hr />
        <div className="statement-preview">
          <div>
            <p>Krystin Butler<br />18622 E Water Dr<br />Unit D<br />Aurora, CO 80013</p>
          </div>
          <div className="right"><p>04/28/2026<br />All open charges</p></div>
          <table className="statement-table">
            <tbody>
              {ledgerRows.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]} {r[2]}</td><td>{r[7]}</td><td>{r[10]}</td><td>{r[9]}</td></tr>)}
            </tbody>
          </table>
          <h3>Amount Due: {patient.balance}</h3>
        </div>
        <button className="tn-green">Save Statement</button> <a>Cancel</a>
      </section>
    </>
  );
}

function NotesTab() {
  return (
    <section className="tn-note-page">
      <div className="tn-green-ribbon">Creating New Note</div>
      <div className="note-header">
        <div>
          <h2>Psychotherapy Intake Note</h2>
          <p><b>Clinician:</b> Clinician 1</p>
          <p><b>Patient:</b> {patient.name}, DOB {patient.dob}</p>
          <p><b>Primary Insurance:</b> Aetna, 123456789</p>
          <p><b>Secondary Insurance:</b> Humana Inc., 987654321</p>
        </div>
        <div>
          <p><b>Date and Time:</b> September 26, 2016 10:00AM - 11:30AM</p>
          <p><b>Duration:</b> 90 minutes</p>
          <p><b>Service Code:</b> 90791</p>
          <p><b>Location:</b> Main Office</p>
          <p><b>Participants:</b> Client only</p>
        </div>
      </div>
      <NoteSection title="Presenting Problem"><textarea /></NoteSection>
      <h3>Current Mental Status <span className="right-link">All Normal &nbsp;&nbsp; All Not Assessed</span></h3>
      <div className="tn-two-col compact">
        {["General Appearance","Dress","Motor Activity","Insight","Judgment","Affect","Mood","Orientation"].map(x => <Field key={x} label={`${x}:`}><TextInput /></Field>)}
        {["Memory","Attention/Concentration","Thought Content","Perception","Flow of Thought","Interview Behavior","Speech"].map(x => <Field key={x} label={`${x}:`}><TextInput /></Field>)}
      </div>
      <h3>Safety Issues</h3>
      <div className="tn-radio-row"><label><input type="checkbox" /> None</label><span>or</span><label><input type="checkbox" /> Suicidal Ideation</label><label><input type="checkbox" /> Homicidal Ideation</label><label>Other: <input className="tn-input inline-other" placeholder="other safety issue" /></label></div>
      {["Background Information","Risk Assessment","Relevant Content","Interventions","Plan","Diagnosis"].map(section => (
        <NoteSection title={section} key={section}>
          <textarea placeholder={section === "Diagnosis" ? "F41.1 | Appropriate/supported diagnosis" : ""} />
        </NoteSection>
      ))}
      <div className="tn-note-attest">✓ Diagnosis code selection validates medical necessity and documentation support.</div>
      <button className="tn-green">Save Draft</button> <button className="tn-green">Sign Note</button>
    </section>
  );
}

function NoteSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="note-section"><h3>{title} <span className="history">History ↻</span></h3>{children}</section>;
}

function PortalTab() {
  return (
    <>
      <section className="tn-panel">
        <h2>⚙ TherapyPortal Access</h2>
        <p>This patient does not have an account on the practice's client portal. A portal account is required to view shared documents, complete paperwork, manage appointments, and join telehealth sessions.</p>
        <p>Email Address: {patient.email}</p>
        <button className="tn-green">Send Welcome Email</button>
      </section>
      <section className="tn-panel">
        <div className="tn-section-head"><h2>Document Requests</h2><button className="tn-blue">Share Documents</button></div>
        <div className="segmented"><button className="active">All</button><button>0 Needs Processing</button><button>0 Waiting on Patient</button><button>Custom</button></div>
        <table className="tn-table"><thead><tr><th>Document</th><th>Sent</th><th>Received</th><th>Status</th></tr></thead><tbody><tr><td colSpan={4} className="empty">There are no matching portal documents to display.</td></tr></tbody></table>
      </section>
    </>
  );
}

function MessagesTab() {
  return (
    <section className="tn-panel messages">
      <div className="tn-section-head"><h2>Patient Messages</h2><button className="tn-blue">+ New Conversation</button></div>
      <div className="message-grid">
        <aside>
          {["📥 Inbox","▣ Admin","💵 Billing","☑ Clinical","🗑 Deleted"].map(x => <a key={x}>{x}</a>)}
          <div className="message-filters"><label><input type="radio" /> Unread Only</label><label><input type="radio" defaultChecked /> Unread and Read</label><label><input type="radio" /> All Including Archived</label><a>Messages Settings</a></div>
        </aside>
        <div className="message-list"><select><option>All Topics</option></select><p>There are no messages to be displayed.</p></div>
        <main>Select a conversation</main>
      </div>
    </section>
  );
}

function InsightsTab() {
  return (
    <section className="tn-panel">
      <h2>Outcome Measures</h2>
      <div className="tn-inline"><SelectInput><option>Last 365 days</option></SelectInput><TextInput value="4/28/2025" /><span>to</span><TextInput value="4/28/2026" /></div>
      <p>There are no chartable results for the selected date range.</p>
    </section>
  );
}

function CliniciansTab() {
  return (
    <section className="tn-panel">
      <div className="tn-section-head"><h2>Clinicians</h2><button className="tn-blue">+ Assign Clinician</button></div>
      <table className="tn-table"><thead><tr><th>Clinician</th><th>Role</th><th>Status</th></tr></thead><tbody><tr><td>Krystin Butler</td><td>Primary clinician</td><td>Active</td></tr></tbody></table>
    </section>
  );
}

function PatientChartStyles() {
  return (
    <style jsx global>{`
      :root { --tn-blue:#1596d0; --tn-dark-blue:#0876a8; --tn-link:#006eb8; --tn-tab:#686868; --tn-border:#d5d5d5; --tn-bg:#f4f4f4; }
      body { background:#f3f3f3 !important; color:#111 !important; font-family: Arial, Helvetica, sans-serif !important; font-size:14px !important; }
      .tn-classic { min-height:100vh; background:#f3f3f3; color:#111; }
      .tn-topbar { height:50px; background:#0879a8; display:flex; align-items:center; gap:0; padding:0 18px; color:white; box-shadow:0 1px 3px #999; }
      .tn-topbar a, .tn-topbar span { color:white; text-decoration:none; padding:16px 18px; font-size:16px; }
      .tn-topbar .active { background:#05668f; }
      .tn-logo { font-weight:700; font-size:20px !important; padding-left:0 !important; }
      .tn-spacer { flex:1; }
      .tn-content { padding:0 18px 26px; max-width: none; }
      .tn-patient-header { padding-top:14px; border-bottom:2px solid #1a9bd7; }
      .tn-patient-title-row { display:flex; justify-content:space-between; align-items:flex-start; }
      .tn-patient-title-row h1 { color:#222; font-size:28px; font-weight:400; margin:0 0 14px; }
      .tn-patient-title-row h1 span { color:#168ed0; }
      .tn-patient-title-row em { color:#aaa; font-style:normal; }
      .tn-patient-title-row small { color:#777; font-size:11px; margin-left:8px; }
      .tn-header-meta { text-align:right; color:#777; font-size:12px; line-height:1.8; }
      .tn-header-meta a { color:var(--tn-link); text-decoration:none; }
      .tn-badge { display:inline-block; background:#0d8fce; color:white; border-radius:12px; padding:1px 7px; font-weight:700; font-size:12px; }
      .tn-tabs { display:flex; gap:4px; align-items:flex-end; }
      .tn-tabs a { background:#6d6d6d; color:white; text-decoration:none; font-weight:700; padding:9px 12px; border-radius:4px 4px 0 0; font-size:13px; }
      .tn-tabs a.active { background:#1a9bd7; }
      .tn-panel, .tn-note-page, .tn-strip { background:white; border:1px solid var(--tn-border); border-radius:3px; margin:14px 0; padding:16px; position:relative; }
      .tn-panel h2, .tn-strip h2, .tn-note-page h2 { font-size:18px; font-weight:400; margin:0 0 14px; }
      .tn-panel h3, .tn-note-page h3 { font-size:14px; margin:12px 0 8px; }
      .tn-section-head { display:flex; justify-content:space-between; align-items:center; gap:16px; }
      .tn-section-head.documents { align-items:flex-start; }
      .tn-wide-input { width:100%; height:32px; border:1px solid #ccc; border-radius:3px; padding:0 10px; }
      .tn-two-col { display:grid; grid-template-columns:1fr 1fr; gap:46px; align-items:start; }
      .tn-three-col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px; }
      .tn-three-col a { display:block; color:var(--tn-link); margin:8px 0; text-decoration:none; }
      .tn-field { display:grid; grid-template-columns:120px 1fr; align-items:center; gap:8px; margin:6px 0; }
      .tn-field > span:first-child { text-align:left; }
      .tn-input, .tn-field select, .statement-preview input { height:28px; border:1px solid #ccc; border-radius:3px; padding:3px 8px; min-width:0; background:white; }
      .tn-inline { display:flex; gap:4px; align-items:center; }
      .tn-inline .tn-input { flex:1; }
      .tn-radio-row { display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
      .tn-check { display:flex; gap:6px; align-items:center; }
      .tn-textarea, textarea { border:1px solid #ccc; border-radius:3px; width:100%; min-height:82px; padding:8px; font-family:Arial, Helvetica, sans-serif; }
      .tn-textarea.short { max-width:360px; min-height:40px; }
      .tn-actions { display:flex; gap:12px; align-items:center; margin-top:16px; }
      .tn-actions.tight { margin-top:0; }
      .tn-actions .danger { margin-left:auto; color:#0070b8; }
      .tn-green { background:#6fbe00; border:0; color:white; border-radius:3px; padding:8px 12px; font-weight:700; cursor:pointer; text-decoration:none; }
      .tn-blue, .link-button { background:#1596d0; border:0; color:white !important; border-radius:3px; padding:8px 12px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; }
      .tn-light { background:white; border:1px solid #bfcfd8; color:#006eb8; border-radius:3px; padding:8px 12px; cursor:pointer; }
      .tn-token { border:1px solid #ccc; border-radius:3px; height:34px; min-width:340px; padding:0 10px; }
      a { color:var(--tn-link); cursor:pointer; text-decoration:none; }
      hr { border:0; border-top:1px solid #1596d0; margin:14px 0; }
      .tn-table { width:100%; border-collapse:collapse; background:white; margin-top:10px; }
      .tn-table th { background:#209ad2; color:white; text-align:left; padding:8px 10px; font-size:12px; }
      .tn-table td { border:1px solid #ddd; padding:9px 10px; vertical-align:middle; }
      .tn-table tr:nth-child(even) td { background:#f7f7f7; }
      .tn-table small { color:#999; margin-left:6px; font-size:10px; }
      .document-table td:last-child, .muted-actions { color:#bbb; text-align:right; white-space:nowrap; }
      .doc-icon { margin-right:8px; }
      .tn-table-tools { text-align:right; color:#0070b8; font-size:12px; margin-top:8px; }
      .download { color:#0070b8; padding-left:8px; }
      .tn-outcome-menu { position:absolute; right:240px; top:78px; z-index:10; background:white; border:1px solid #d0d0d0; border-radius:4px; box-shadow:0 3px 8px #999; width:520px; padding:12px; }
      .tn-outcome-menu:before { content:""; position:absolute; top:-10px; right:118px; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid white; }
      .tn-outcome-menu p { margin:0 0 8px; font-size:18px; }
      .tn-outcome-menu button { display:block; width:100%; text-align:left; border:0; background:white; padding:6px 10px; font-size:16px; border-radius:3px; }
      .tn-outcome-menu button.selected { background:#0879bd; color:white; }
      .tn-balance-line { display:flex; gap:24px; align-items:center; }
      .pill { background:#ccc; color:white; border-radius:12px; padding:1px 7px; font-weight:700; }
      .ledger th, .ledger td { font-size:12px; }
      .ledger .status { color:#111; font-weight:700; }
      .tn-strip { display:flex; justify-content:space-between; align-items:center; }
      .tn-strip h2 span { color:#999; }
      .insurance-card { border:1px solid #ccc; border-radius:3px; padding:16px; }
      .policy-grid { margin:28px 0 12px 70px; line-height:1.7; }
      .segmented { display:flex; gap:0; align-items:center; }
      .segmented button { border:1px solid #ccc; background:white; padding:7px 12px; cursor:pointer; }
      .segmented button.active { background:#3ba7df; color:white; border-color:#3ba7df; }
      .tn-button-group { display:flex; gap:4px; }
      .tn-button-group button { border:1px solid #777; background:white; border-radius:4px; padding:10px 22px; font-size:16px; }
      .tn-button-group button.selected { border-color:#168ed0; background:#e9f7ff; }
      .tn-payment-links { margin:4px 0 8px 140px; color:#0070b8; font-weight:700; }
      .radio-line { display:block; margin:8px 0; }
      .radio-line input[type=text], .radio-line input:not([type]) { height:25px; border:1px solid #ccc; border-radius:3px; }
      .statement-editor { min-height:80px; background:linear-gradient(#f8f8f8 0 30px, white 30px); }
      .statement-preview { padding:10px 20px; }
      .statement-preview .right { float:right; text-align:right; }
      .statement-table { width:100%; border-collapse:collapse; clear:both; margin-top:24px; }
      .statement-table td { border-bottom:1px solid #ddd; padding:8px; }
      .statement-preview h3 { text-align:center; background:#e4e4e4; padding:12px; }
      .tn-note-page { border-top:2px solid #1596d0; }
      .tn-green-ribbon { position:absolute; top:-10px; left:18px; background:#c9f26a; color:#111; padding:4px 14px; font-size:12px; }
      .note-header { display:grid; grid-template-columns:1fr 1fr; gap:30px; border-bottom:1px solid #1596d0; padding:20px 0; line-height:1.5; }
      .note-section { margin:14px 0; }
      .note-section h3 { border:0; font-size:16px; }
      .note-section textarea { min-height:64px; }
      .history { float:right; color:#aaa; font-weight:400; font-size:12px; }
      .right-link { float:right; color:#168ed0; font-size:12px; }
      .compact { gap:28px; }
      .compact .tn-field { grid-template-columns:150px 1fr; }
      .inline-other { min-width:400px; }
      .tn-note-attest { border:2px solid #98d93a; background:#faffef; padding:8px; margin:16px 0; }
      .messages .message-grid { display:grid; grid-template-columns:140px 240px 1fr; min-height:640px; border-top:1px solid #ddd; }
      .message-grid aside, .message-list { border-right:1px solid #ddd; padding:12px; }
      .message-grid aside a { display:block; margin:8px 0; }
      .message-filters { position:absolute; bottom:16px; left:28px; display:grid; gap:8px; }
      .message-list select { width:100%; height:32px; }
      .message-list p, .message-grid main { color:#777; text-align:center; padding-top:70px; }
      .empty { text-align:center; color:#777; }
      .tn-calendar-mini { display:grid; grid-template-columns:repeat(7, 1fr); border:1px solid #ccc; }
      .tn-calendar-mini > * { border:1px solid #ddd; min-height:70px; padding:6px; background:white; }
      .tn-calendar-mini strong { min-height:auto; background:#209ad2; color:white; text-align:center; }
      .tn-calendar-mini .today { background:#fffbd2; }
      .tn-calendar-mini p { color:#0879a8; font-size:12px; }
      @media (max-width: 900px) {
        .tn-topbar { overflow-x:auto; }
        .tn-two-col, .tn-three-col, .note-header, .messages .message-grid { grid-template-columns:1fr; }
        .tn-field { grid-template-columns:1fr; }
        .tn-tabs { overflow-x:auto; }
        .tn-outcome-menu { position:static; width:auto; margin-top:10px; }
      }
    `}</style>
  );
}

export default function ClassicPatientChart({ patientId = "PAT-1000001", activeTab = "info", mode = "existing" }: PatientChartShellProps) {
  const content = useMemo(() => {
    if (mode === "new") return <InfoTab mode="new" />;
    if (activeTab === "todo") return <ToDoTab />;
    if (activeTab === "schedule") return <ScheduleTab />;
    if (activeTab === "documents") return <DocumentsTab />;
    if (activeTab === "billing") return <BillingTab />;
    if (activeTab === "billing-settings") return <BillingSettingsTab />;
    if (activeTab === "payment") return <PaymentTab />;
    if (activeTab === "notes") return <NotesTab />;
    if (activeTab === "statement") return <StatementTab />;
    if (activeTab === "portal") return <PortalTab />;
    if (activeTab === "messages") return <MessagesTab />;
    if (activeTab === "insights") return <InsightsTab />;
    if (activeTab === "clinicians") return <CliniciansTab />;
    return <InfoTab />;
  }, [activeTab, mode]);

  return (
    <div className="tn-classic">
      <PatientChartStyles />
      <TopNav />
      <main className="tn-content">
        <PatientHeader patientId={patientId} activeTab={activeTab} mode={mode} />
        {content}
      </main>
    </div>
  );
}

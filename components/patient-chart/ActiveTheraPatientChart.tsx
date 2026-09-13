"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ActiveTheraPatientChartProps = {
  patientId: string;
  routeSource: string;
};

type TabKey =
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

type ModalKey =
  | null
  | "appointment"
  | "payment"
  | "misc-charge"
  | "credit"
  | "statement"
  | "upload"
  | "note"
  | "outcome"
  | "contact"
  | "reminder"
  | "conversation"
  | "billing-comments"
  | "insurance-edit"
  | "claim-info"
  | "payment-settings"
  | "cash-rates";

const serviceCodes = ["90834", "90832", "90839", "90791", "H0031", "H0032", "H0001", "T1017", "90837"];
const appointmentTypes = ["Intake", "Follow-up"];
const frequencies = ["One time", "Weekly", "Bi-weekly", "Monthly"];
const outcomeRanges = ["Last 30 days", "Last 60 days", "Last 90 days", "Last 120 days", "Last 365 days"];
const chargeRanges = ["Last 30 days", "Last 60 days", "Last 90 days", "Last 120 days"];

const tabs: Array<[TabKey, string]> = [
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

const documents = [
  ["📄", "Superbill for 1/6/25", "PDF 50KB", "—", "1/6/2025", "Billing", ""],
  ["📋", "Miscellaneous Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["🧾", "Treatment Plan", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📋", "Miscellaneous Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📃", "Progress Note", "", "H0031", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["✉", "Contact Note", "Email with Patient", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["🧾", "Treatment Plan", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📕", "Missed Appointment Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📘", "Intake Note", "", "90791", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["🧠", "Consultation Note", "", "H0002", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📝", "Psychotherapy Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
];

const ledgerRows = [
  ["1/6/25", "Misc. Charge", "from Misc. Note", "K-But", "Direct", "Direct", "", "$260.00", "$260.00", "$260.00", "—", "—", "—"],
  ["1/6/25", "H0002", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["1/6/25", "90791", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "Not set", "$0.00", "Submitted Claim"],
  ["1/6/25", "Missed Appt", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "—", "—"],
  ["1/6/25", "H0031", "", "K-But", "Direct", "Direct", "", "Not set", "Not set", "—", "—", "—", "—"],
  ["4/28/26", "H0031", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "—", "—", "—"],
];

function notify(message: string) {
  if (typeof window !== "undefined") window.alert(message);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="ta-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Select({ children, defaultValue }: { children: React.ReactNode; defaultValue?: string }) {
  return <select defaultValue={defaultValue}>{children}</select>;
}

function MoneyInput({ placeholder = "$" }: { placeholder?: string }) {
  return <input inputMode="decimal" pattern="^\\$?\\d+(\\.\\d{2})?$" placeholder={placeholder} />;
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="ta-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ta-modal">
        <div className="ta-modal-head">
          <h2>{title}</h2>
          <button type="button" className="ta-x" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ActiveTheraPatientChart({ patientId, routeSource }: ActiveTheraPatientChartProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("info");
  const [modal, setModal] = useState<ModalKey>(null);
  const [appointmentSaved, setAppointmentSaved] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Check");
  const [statementPreview, setStatementPreview] = useState(false);
  const [portalFilter, setPortalFilter] = useState("All");
  const [messageTopic, setMessageTopic] = useState("All Topics");

  const patient = useMemo(
    () => ({
      id: patientId,
      name: "Krystin Marie Butler",
      pronouns: "she/her",
      dob: "6/26/1987",
      mobile: "(303) 943-3946",
      clinician: "Krystin Butler",
      email: "Therassistant@outlook.com",
      balance: "$260.00",
      credit: "$0.00",
    }),
    [patientId],
  );

  const openTab = (tab: TabKey) => {
    setActiveTab(tab);
    setModal(null);
  };

  return (
    <main className="ta-chart">
      <style jsx global>{`
        body { margin: 0; background: #f4f4f4; color: #111; font-family: Arial, Helvetica, sans-serif; font-size: 14px; }
        a { color: #006eb6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .ta-topbar { height: 40px; background: #0877a6; display: flex; align-items: center; padding: 0 18px; color: white; box-shadow: 0 1px 4px #999; gap: 26px; }
        .ta-logo { width: 38px; height: 48px; background: #fff; color: #2589b5; border: 1px solid #777; display: flex; align-items: center; justify-content: center; font-size: 9px; line-height: 1.05; margin-top: 12px; box-shadow: 0 2px 4px #555; }
        .ta-mainnav { display: flex; height: 40px; }
        .ta-mainnav a { color: white; padding: 12px 16px; font-size: 16px; }
        .ta-mainnav a.active, .ta-mainnav a:hover { background: #075b82; text-decoration: none; }
        .ta-icons { margin-left: auto; display: flex; gap: 22px; font-size: 18px; }
        .ta-chart { min-height: 100vh; background: #f5f5f5; }
        .ta-wrap { width: calc(100% - 32px); margin: 0 auto; }
        .ta-debug { background: #fff8c5; color: #7a4a00; border: 1px solid #d6b236; padding: 8px 16px; font-weight: 700; }
        .ta-head { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 10px 4px; }
        .ta-title { font-size: 26px; font-weight: 400; color: #111; }
        .ta-title span:first-child { color: #1689c4; }
        .ta-pronouns { color: #999; margin-left: 8px; }
        .ta-dob { font-size: 11px; color: #777; margin-left: 8px; }
        .ta-mini { text-align: right; color: #777; font-size: 12px; line-height: 1.5; }
        .ta-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 17px; height: 17px; border-radius: 999px; background: #0089cf; color: white; font-size: 11px; font-weight: 700; padding: 0 4px; }
        .ta-tabs { border-bottom: 2px solid #1e9bd2; display: flex; gap: 4px; padding-left: 10px; }
        .ta-tab { border: 0; background: #696969; color: white; padding: 8px 12px; border-radius: 4px 4px 0 0; font-weight: 700; cursor: pointer; }
        .ta-tab.active { background: #159bd3; }
        .ta-panel { background: white; border: 1px solid #ddd; border-radius: 4px; margin: 14px 10px; padding: 14px; }
        .ta-section-title { font-size: 20px; font-weight: 400; margin: 0 0 14px; }
        .ta-blue-line { border-bottom: 1px solid #149bd7; padding-bottom: 10px; margin-bottom: 14px; }
        .ta-button { border: 1px solid #168bc1; background: #1999d2; color: white; border-radius: 4px; padding: 7px 10px; cursor: pointer; font-weight: 700; }
        .ta-button.green { background: #69b900; border-color: #5ca300; }
        .ta-button.gray { background: #888; border-color: #777; }
        .ta-button.white { background: white; color: #0074b8; }
        .ta-button:active { transform: translateY(1px); }
        .ta-toolbar { display: flex; justify-content: flex-end; align-items: center; gap: 6px; margin-bottom: 12px; }
        .ta-table { border-collapse: collapse; width: 100%; font-size: 12px; }
        .ta-table th { background: #1e9bd2; color: white; text-align: left; padding: 8px 10px; font-weight: 700; }
        .ta-table td { border: 1px solid #d7d7d7; padding: 9px 10px; vertical-align: top; }
        .ta-table tr:nth-child(even) td { background: #f7f7f7; }
        .ta-table .money { text-align: right; color: #006eb6; }
        .ta-table .muted { color: #888; }
        .ta-table .allocation { background: #e7f8ff !important; }
        .ta-actions { color: #bbb; text-align: right; white-space: nowrap; font-size: 17px; }
        .ta-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 80px; align-items: start; }
        .ta-field { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 8px; align-items: center; margin-bottom: 7px; font-size: 12px; }
        .ta-field span { text-align: left; }
        input, select, textarea { border: 1px solid #cfcfcf; border-radius: 3px; padding: 5px 7px; font: inherit; min-height: 26px; background: white; }
        textarea { min-height: 58px; resize: vertical; }
        .ta-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .ta-comments { width: 100%; }
        .ta-links-grid { display: grid; grid-template-columns: repeat(3, minmax(190px, 1fr)); gap: 50px; max-width: 980px; }
        .ta-link-list { display: grid; gap: 9px; font-size: 12px; }
        .ta-link-list h3 { margin: 0 0 4px; color: #666; font-size: 13px; }
        .ta-count { background: #ccc; color: white; border-radius: 999px; padding: 1px 7px; font-weight: 700; }
        .ta-count.blue { background: #1999d2; }
        .ta-subtabs { display: inline-flex; border: 1px solid #ccc; border-radius: 4px; overflow: hidden; }
        .ta-subtabs button { border: 0; border-right: 1px solid #ccc; background: white; padding: 6px 10px; cursor: pointer; }
        .ta-subtabs button.active { background: #38a5da; color: white; }
        .ta-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.58); z-index: 50; display: flex; align-items: flex-start; justify-content: center; padding-top: 56px; }
        .ta-modal { background: white; width: min(640px, calc(100vw - 32px)); border-radius: 4px; box-shadow: 0 12px 40px rgba(0,0,0,.35); }
        .ta-modal-head { border-bottom: 1px solid #25a1dc; display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; }
        .ta-modal-head h2 { margin: 0; font-size: 18px; font-weight: 400; }
        .ta-x { border: 0; background: transparent; color: #999; font-size: 30px; cursor: pointer; line-height: 1; }
        .ta-modal-body { padding: 12px 18px 18px; }
        .ta-note-head { display: grid; grid-template-columns: 1fr 360px; gap: 20px; border-bottom: 1px solid #2aa4dc; padding-bottom: 14px; margin-bottom: 14px; }
        .ta-note-section { margin-bottom: 16px; }
        .ta-note-section h3 { font-size: 16px; margin: 0 0 8px; }
        .ta-note-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 36px; }
        .ta-note-grid label { display: grid; grid-template-columns: 150px 1fr; gap: 8px; align-items: center; font-size: 12px; }
        .ta-note-grid input { width: 100%; }
        .ta-green-tag { display: inline-block; background: #c8f55e; padding: 4px 12px; font-size: 12px; margin-left: -8px; margin-top: -20px; }
        .ta-side-message { display: grid; grid-template-columns: 132px 240px 1fr; border: 1px solid #ddd; min-height: 740px; }
        .ta-message-menu { background: #fff; border-right: 1px solid #ddd; padding: 12px; }
        .ta-message-menu div { padding: 6px 8px; }
        .ta-message-menu .active { background: #e1f3fb; color: #0074b8; }
        .ta-message-list { border-right: 1px solid #ddd; padding: 10px; }
        .ta-center { display: grid; place-items: center; color: #777; }
        .ta-statement-preview { border-top: 1px solid #168bc1; padding-top: 14px; margin-top: 14px; }
        .ta-total { background: #e5e5e5; text-align: center; font-weight: 700; padding: 10px; margin-top: 12px; }
        @media (max-width: 800px) {
          .ta-form-grid, .ta-note-head, .ta-note-grid, .ta-links-grid { grid-template-columns: 1fr; }
          .ta-tabs { overflow-x: auto; }
          .ta-topbar { gap: 8px; }
          .ta-mainnav a { padding: 12px 8px; font-size: 13px; }
        }
      `}</style>

      <div className="ta-debug">
        ✅ ACTIVE PATIENT CHART OVERRIDE LOADED · route: {routeSource} · patientId: {patientId}
      </div>

      <header className="ta-topbar">
        <Link className="ta-logo" href="/">Therapy<br />Notes</Link>
        <nav className="ta-mainnav" aria-label="Main navigation">
          <Link href="/workqueue">To-Do</Link>
          <Link href="/scheduling">Scheduling</Link>
          <Link href="/patients" className="active">Patients</Link>
          <Link href="/staff">Staff</Link>
          <Link href="/billing">Billing</Link>
          <Link href="/payers">Payers</Link>
        </nav>
        <div className="ta-icons">👤⌄ 🔍</div>
      </header>

      <div className="ta-wrap">
        <section className="ta-head">
          <div className="ta-title">
            <Link href="/patients">Patient:</Link> {patient.name} <span className="ta-pronouns">({patient.pronouns})</span>
            <span className="ta-dob">{patient.dob}</span>
          </div>
          <div className="ta-mini">
            <div><span className="ta-pill">3</span> <Link href="/workqueue">To-Do</Link> &nbsp; 📅 No Future Appt</div>
            <div>☎ Mobile: <Link href={`tel:${patient.mobile}`}>{patient.mobile}</Link> (No Messages)</div>
          </div>
        </section>

        <nav className="ta-tabs" aria-label="Patient chart tabs">
          {tabs.map(([key, label]) => (
            <button key={key} type="button" className={`ta-tab ${activeTab === key ? "active" : ""}`} onClick={() => openTab(key)}>
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "info" && (
          <>
            <section className="ta-panel">
              <h2 className="ta-section-title">Patient Comments</h2>
              <input className="ta-comments" placeholder="For non-clinical info such as scheduling/billing comments. All users can see this. Conveniently visible in tooltips." />
            </section>

            <section className="ta-panel">
              <h2 className="ta-section-title">Patient Information</h2>
              <div className="ta-form-grid">
                <div>
                  <Field label="Legal Name:">
                    <div className="ta-row">
                      <input defaultValue="Krystin" />
                      <input defaultValue="Marie" />
                      <input defaultValue="Butler" />
                      <input placeholder="suffix" style={{ width: 58 }} />
                    </div>
                  </Field>
                  <Field label="Preferred Name:"><input placeholder="optional" /></Field>
                  <Field label="Pronouns:"><input defaultValue="she/her" /></Field>
                  <Field label="Date of Birth:"><input type="date" defaultValue="1987-06-26" /></Field>
                  <Field label="Account Number:"><input defaultValue={patientId} /></Field>
                  <Field label="Address 1:"><input defaultValue="18622 E Water Dr" /></Field>
                  <Field label="Address 2:"><input defaultValue="Unit D" /></Field>
                  <Field label="Zip:"><input defaultValue="80013" /></Field>
                  <Field label="City/State:">
                    <div className="ta-row"><input defaultValue="Aurora" /><select defaultValue="CO"><option>CO</option></select></div>
                  </Field>
                  <Field label="Time Zone:"><Select defaultValue="practice"><option value="practice">Not Set (Use practice time zone)</option><option>Mountain Time</option></Select></Field>
                  <Field label="Mobile Phone:"><div className="ta-row"><input defaultValue={patient.mobile} /><Select><option>No messages</option><option>Text messages OK</option></Select></div></Field>
                  <Field label="Home Phone:"><div className="ta-row"><input /><Select><option>No messages</option></Select></div></Field>
                  <Field label="Work Phone:"><div className="ta-row"><input /><Select><option>No messages</option></Select></div></Field>
                  <Field label="Other Phone:"><div className="ta-row"><input /><Select><option>No messages</option></Select></div></Field>
                  <Field label="Email:"><input defaultValue={patient.email} /></Field>
                  <Field label="Appt Reminders:"><Select><option>Default Practice Setting (Text/Call and Email)</option><option>No reminders</option><option>Text and email</option></Select></Field>
                  <div className="ta-row" style={{ marginLeft: 120, marginTop: 14 }}>
                    <button type="button" className="ta-button green" onClick={() => notify("Patient demographics saved.")}>Save Changes</button>
                    <Link href="/patients">Cancel</Link>
                  </div>
                </div>

                <div>
                  <Field label="Administrative Sex:">
                    <div className="ta-row"><label><input type="radio" name="sex" /> Male</label><label><input type="radio" name="sex" /> Female</label><label><input type="radio" name="sex" defaultChecked /> Unknown</label></div>
                  </Field>
                  <Field label="Gender Identity:"><Select><option>-- Select Gender Identity --</option><option>Female</option><option>Male</option><option>Nonbinary</option></Select></Field>
                  <Field label="Sexual Orientation:"><Select><option>-- Select Sexual Orientation --</option><option>Declined</option></Select></Field>
                  <Field label="Race:"><input placeholder="Add Race" /></Field>
                  <Field label="Ethnicity:"><input placeholder="Add Ethnicity" /></Field>
                  <Field label="Languages:"><input placeholder="Add Language" /></Field>
                  <Field label="Smoking Status:"><Select><option>-- Select Smoking Status --</option></Select></Field>
                  <Field label="Marital Status:"><Select><option>-- Select Marital Status --</option></Select></Field>
                  <Field label="Employment:"><Select><option>-- Select Employment --</option></Select></Field>
                  <Field label="Religious Affiliation:"><input placeholder="Add Religious Affiliation" /></Field>
                  <Field label="HIPAA:"><label><input type="checkbox" /> Signed HIPAA NPP on file ⚠</label></Field>
                  <Field label="PCP Release:"><Select><option>Not set</option><option>Signed</option><option>Declined</option></Select></Field>
                </div>
              </div>
            </section>

            <section className="ta-panel">
              <div className="ta-row" style={{ justifyContent: "space-between" }}>
                <h2 className="ta-section-title">Contacts</h2>
                <button type="button" className="ta-button" onClick={() => setModal("contact")}>+ New Contact</button>
              </div>
              <div className="ta-form-grid">
                <div>
                  <Field label="Name:"><div className="ta-row"><input defaultValue="Group" /><input defaultValue="Therapy" /></div></Field>
                  <Field label="Title:"><input /></Field>
                  <Field label="Company:"><input /></Field>
                </div>
                <div>
                  <Field label="Mobile Phone:"><input /></Field>
                  <Field label="Work Phone:"><input /></Field>
                  <Field label="Home Phone:"><input /></Field>
                  <Field label="Fax:"><input /></Field>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "todo" && (
          <section className="ta-panel">
            <div className="ta-row" style={{ justifyContent: "space-between" }}>
              <h2 className="ta-section-title">Patient To-Do List</h2>
              <button type="button" className="ta-button" onClick={() => setModal("reminder")}>+ New Reminder</button>
            </div>
            <p><strong>Notes</strong> <span className="ta-pill">2</span></p>
            <table className="ta-table">
              <thead><tr><th>Date</th><th><Link href="/workqueue">To-Do Items</Link></th><th></th></tr></thead>
              <tbody>
                <tr><td>3/7/25</td><td><Link href="/workqueue">Consider creating a Termination Note since there have been no appointments for at least 60 days.</Link></td><td className="ta-actions">×</td></tr>
                <tr><td>4/6/25</td><td><Link href="/workqueue">Create a new Treatment Plan since the most recent Treatment Plan is more than 90 days old.</Link></td><td className="ta-actions">×</td></tr>
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "schedule" && (
          <section className="ta-panel">
            <div className="ta-row" style={{ justifyContent: "space-between" }}>
              <h2 className="ta-section-title">Patient Schedule</h2>
              <button type="button" className="ta-button" onClick={() => setModal("appointment")}>+ New Appointment</button>
            </div>
            {appointmentSaved && <p style={{ color: "#4c9700", fontWeight: 700 }}>Appointment saved to the patient schedule.</p>}
            <table className="ta-table">
              <thead><tr><th>Date</th><th>Time</th><th>Type</th><th>Clinician</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>4/28/2026</td><td>10:00 AM</td><td>Follow-up</td><td><Link href="/staff">Krystin Butler</Link></td><td><Link href="/settings/locations">Conscious Counseling PLLC</Link></td><td>Scheduled</td></tr>
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "documents" && (
          <section className="ta-panel">
            <h2 className="ta-section-title">Notes and Documents for this Patient</h2>
            <div className="ta-toolbar">
              <button type="button" className="ta-button white" onClick={() => setModal("note")}>Create Note ▾</button>
              <button type="button" className="ta-button white" onClick={() => setModal("outcome")}>▥ Outcome Measure ▾</button>
              <button type="button" className="ta-button" onClick={() => setModal("upload")}>☁ Upload Patient File</button>
            </div>
            <div className="ta-toolbar" style={{ marginTop: -6, fontSize: 12 }}>
              <button type="button" className="ta-button white" onClick={() => notify("Showing Notes and Documents")}>☞ Showing Notes and Documents</button>
              <button type="button" className="ta-button white" onClick={() => notify("Column selector opened.")}>▦ Select Columns</button>
            </div>
            <table className="ta-table">
              <thead><tr><th>Document</th><th>Service</th><th>▼ Date</th><th>Author/Access</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={`${doc[1]}-${doc[3]}-${doc[4]}`}>
                    <td><Link href={`/patients/${patientId}/notes`}>{doc[0]} {doc[1]}</Link> <span className="muted">{doc[2]}</span></td>
                    <td>{doc[3]}</td>
                    <td>{doc[4]}</td>
                    <td><Link href="/staff">{doc[5]}</Link></td>
                    <td>{doc[6]}</td>
                    <td className="ta-actions">↗ ✎ ☁</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginLeft: 10 }}><Link href="#download" onClick={(event) => { event.preventDefault(); notify("Download multiple documents queued."); }}>Download Multiple</Link></p>
          </section>
        )}

        {activeTab === "billing" && (
          <>
            <section className="ta-panel">
              <h2 className="ta-section-title">Patient Billing</h2>
              <p className="ta-blue-line">Patient Balance Owed: <strong>{patient.balance}</strong> &nbsp;&nbsp;&nbsp;&nbsp; Unassigned Credit: <strong>{patient.credit}</strong></p>
              <div className="ta-links-grid">
                <div className="ta-link-list">
                  <h3>Patient Accounting</h3>
                  <Link href="#payment" onClick={(e) => { e.preventDefault(); setModal("payment"); }}>Enter Patient Payment</Link>
                  <Link href="#misc" onClick={(e) => { e.preventDefault(); setModal("misc-charge"); }}>Enter Misc Charge</Link>
                  <Link href="#refund" onClick={(e) => { e.preventDefault(); notify("Refund workflow opened."); }}>Enter Refund</Link>
                  <Link href="#credit" onClick={(e) => { e.preventDefault(); setModal("credit"); }}>Enter Misc Credit</Link>
                  <Link href="#statement" onClick={(e) => { e.preventDefault(); setModal("statement"); }}>Create Statement</Link>
                </div>
                <div className="ta-link-list">
                  <h3>Insurance Claims</h3>
                  <Link href="/billing/eligibility">Eligibility History <span className="ta-count">0</span></Link>
                  <Link href="/billing/submit-claims?type=primary">Submit Primary Claims <span className="ta-count blue">6</span></Link>
                  <Link href="/billing/submit-claims?type=secondary">Submit Secondary Claims <span className="ta-count">0</span></Link>
                  <Link href="/billing/cms-1500">Create CMS-1500 <span className="ta-count">0</span></Link>
                  <Link href={`/patients/${patientId}/superbill`}>Create Superbill</Link>
                </div>
                <div className="ta-link-list">
                  <h3>Insurance Payments</h3>
                  <Link href="/billing/insurance-payment">Enter Insurance Payment</Link>
                  <Link href="/billing/claim-history">Electronic Claim History <span className="ta-count">0</span></Link>
                  <Link href="/billing/era">ERA</Link>
                </div>
              </div>
            </section>

            <section className="ta-panel">
              <div className="ta-row" style={{ gap: 16 }}>
                <h2 className="ta-section-title">Search Billing Transactions</h2>
                <div className="ta-subtabs">
                  <button type="button" className="active">Open Items</button>
                  <button type="button">All Items</button>
                  <button type="button">Custom</button>
                </div>
              </div>
              <div className="ta-toolbar">
                <button className="ta-button white" type="button" onClick={() => notify("Spreadsheet exported.")}>▧ Export Spreadsheet</button>
                <button className="ta-button white" type="button" onClick={() => notify("Column selector opened.")}>▦ Select Columns</button>
              </div>
              <LedgerTable />
            </section>
          </>
        )}

        {activeTab === "billing-settings" && (
          <>
            <section className="ta-panel"><div className="ta-row" style={{ justifyContent: "space-between" }}><h2 className="ta-section-title">Billing Comments: <span className="muted">None</span></h2><button className="ta-button white" onClick={() => setModal("billing-comments")}>✎ Edit</button></div></section>
            <section className="ta-panel">
              <div className="ta-row" style={{ justifyContent: "space-between" }}><h2 className="ta-section-title">Insurance</h2><button className="ta-button white" onClick={() => setModal("insurance-edit")}>✎ Edit</button></div>
              <div style={{ border: "1px solid #ccc", padding: 14 }}>
                <p><Link href="/payers">Colorado Access (84129)</Link>: Primary</p>
                <div style={{ marginLeft: 30, lineHeight: 1.7 }}>
                  <p><strong>Policy Information</strong></p>
                  <p>Copay: <strong>Not set</strong><br />Member ID: <strong>12346</strong><br />Policy Holder: <strong>Self</strong><br />Eligibility: <strong>Not verified</strong></p>
                  <button className="ta-button" type="button" onClick={() => notify("Eligibility verified and stored in billing settings.")}>Verify Eligibility</button>
                </div>
              </div>
            </section>
            <section className="ta-panel"><div className="ta-row" style={{ justifyContent: "space-between" }}><h2 className="ta-section-title">Additional Claim Information: <span className="muted">None</span></h2><button className="ta-button white" onClick={() => setModal("claim-info")}>✎ Edit</button></div></section>
            <section className="ta-panel"><div className="ta-row" style={{ justifyContent: "space-between" }}><h2 className="ta-section-title">Payment Settings</h2><button className="ta-button white" onClick={() => setModal("payment-settings")}>✎ Edit</button></div><p>Responsible Party for Billing: <strong>The Patient</strong></p></section>
            <section className="ta-panel"><div className="ta-row" style={{ justifyContent: "space-between" }}><h2 className="ta-section-title">Patient Cash Rates: <span className="muted">None</span></h2><button className="ta-button white" onClick={() => setModal("cash-rates")}>✎ Edit</button></div></section>
          </>
        )}

        {activeTab === "clinicians" && (
          <section className="ta-panel">
            <h2 className="ta-section-title">Clinicians</h2>
            <table className="ta-table"><thead><tr><th>Clinician</th><th>Role</th><th>Status</th></tr></thead><tbody><tr><td><Link href="/staff">Krystin Butler</Link></td><td>Assigned Clinician</td><td>Active</td></tr></tbody></table>
          </section>
        )}

        {activeTab === "portal" && (
          <>
            <section className="ta-panel">
              <h2 className="ta-section-title">✣ THERASSISTANT PORTAL Access</h2>
              <p>This patient does not have an account on the practice's client portal. A portal account is required to view shared documents, complete paperwork, manage appointments, and join telehealth sessions.</p>
              <p>Email Address: {patient.email}</p>
              <button type="button" className="ta-button green" onClick={() => notify("Welcome email sent through THERASSISTANT PORTAL.")}>Send Welcome Email</button>
            </section>
            <section className="ta-panel">
              <div className="ta-row" style={{ justifyContent: "space-between" }}>
                <h2 className="ta-section-title">Document Requests</h2>
                <Link className="ta-button" href="/library">Share Documents</Link>
              </div>
              <div className="ta-subtabs">
                {["All", "Needs Processing", "Waiting on Patient", "Custom"].map((filter) => (
                  <button key={filter} type="button" className={portalFilter === filter ? "active" : ""} onClick={() => setPortalFilter(filter)}>{filter} {filter !== "Custom" ? "0" : ""}</button>
                ))}
              </div>
              <div className="ta-toolbar"><button className="ta-button white" onClick={() => notify("Column selector opened.")}>▦ Select Columns</button></div>
              <table className="ta-table"><thead><tr><th>Document</th><th>Sent</th><th>Received</th><th>Status</th></tr></thead><tbody><tr><td colSpan={4} style={{ textAlign: "center" }}>There are no matching portal documents to display.</td></tr></tbody></table>
            </section>
          </>
        )}

        {activeTab === "messages" && (
          <section className="ta-panel">
            <div className="ta-row" style={{ justifyContent: "space-between" }}>
              <h2 className="ta-section-title">Patient Messages</h2>
              <button type="button" className="ta-button" onClick={() => setModal("conversation")}>+ New Conversation</button>
            </div>
            <div className="ta-side-message">
              <div className="ta-message-menu">
                <div className="active">📥 Inbox</div><div>🗂 Admin</div><div>💵 Billing</div><div>☑ Clinical</div><div>🗑 Deleted</div>
                <div style={{ marginTop: 500 }}><label><input type="radio" name="messages" /> Unread Only</label><br /><label><input type="radio" name="messages" defaultChecked /> Unread and Read</label><br /><label><input type="radio" name="messages" /> All Including Archived</label><br /><Link href="/settings/messages">Messages Settings</Link></div>
              </div>
              <div className="ta-message-list">
                <Select defaultValue={messageTopic}>
                  <option>All Topics</option><option>Admin</option><option>Billing</option><option>Clinical</option>
                </Select>
                <div className="ta-row" style={{ justifyContent: "space-between", marginTop: 12 }}><Link href="#select" onClick={(e) => e.preventDefault()}>Select</Link><Select><option>Newest</option><option>Oldest</option></Select></div>
                <p className="muted" style={{ textAlign: "center", marginTop: 20 }}>There are no messages to be displayed.</p>
              </div>
              <div className="ta-center">Select a conversation</div>
            </div>
          </section>
        )}

        {activeTab === "insights" && (
          <section className="ta-panel">
            <h2 className="ta-section-title">Outcome Measures</h2>
            <div className="ta-row">
              <Select defaultValue="Last 365 days">{outcomeRanges.map((range) => <option key={range}>{range}</option>)}</Select>
              <input type="date" defaultValue="2025-04-28" /> to <input type="date" defaultValue="2026-04-28" />
            </div>
            <p style={{ marginTop: 16 }}>There are no chartable results for the selected date range.</p>
          </section>
        )}
      </div>

      {modal === "appointment" && (
        <Modal title="Create New Appointment" onClose={() => setModal(null)}>
          <div className="ta-modal-body">
            <Field label="Appointment Type:"><Select defaultValue="Intake">{appointmentTypes.map((item) => <option key={item}>{item}</option>)}</Select></Field>
            <Field label="Patient:"><Link href="/patients">{patient.name} {patient.dob}</Link></Field>
            <Field label="Clinician:"><Link href="/staff">{patient.clinician}</Link></Field>
            <Field label="Location:"><Link href="/settings/locations">Conscious Counseling PLLC</Link></Field>
            <Field label="Telehealth:"><label><input type="checkbox" /> Use TherapyNotes Telehealth</label></Field>
            <Field label="Service Code:"><Select defaultValue="90791">{serviceCodes.map((code) => <option key={code}>{code}: {code === "90791" ? "Intake Assessment" : "Therapy Session"}</option>)}</Select></Field>
            <Field label="Scheduled Time:"><div className="ta-row"><input type="date" /> at <input type="time" /></div></Field>
            <Field label="Duration:"><div className="ta-row"><input type="number" defaultValue={60} style={{ width: 70 }} /> minutes</div></Field>
            <Field label="Frequency:"><Select>{frequencies.map((item) => <option key={item}>{item}</option>)}</Select></Field>
            <Field label="Appointment Alert:"><textarea /></Field>
            <div className="ta-row" style={{ marginLeft: 120 }}><button className="ta-button green" onClick={() => { setAppointmentSaved(true); setModal(null); notify("Appointment saved."); }}>Save New Appointment</button></div>
          </div>
        </Modal>
      )}

      {modal === "payment" && (
        <Modal title="Patient Payment" onClose={() => setModal(null)}>
          <div className="ta-modal-body">
            <p className="ta-blue-line">Patient Balance Owed: <strong>{patient.balance}</strong> &nbsp;&nbsp; Unassigned Credit: <strong>{patient.credit}</strong></p>
            <Field label="Payment Method:">
              <div className="ta-row">{["Check", "Cash", "External"].map((method) => <button key={method} className={`ta-button ${paymentMethod === method ? "" : "white"}`} onClick={() => setPaymentMethod(method)}>{paymentMethod === method ? "✓ " : ""}{method}</button>)}</div>
            </Field>
            <Field label="Payment Date:"><input type="date" defaultValue="2026-04-28" /></Field>
            <Field label="Payment Amount:"><MoneyInput /></Field>
            <Field label="Check Number:"><input placeholder="optional" /></Field>
            <Field label="Comments:"><input placeholder="Internal memo only" /></Field>
            <button className="ta-button green" onClick={() => { setModal(null); notify("New patient payment saved."); }}>Save New Payment</button>
          </div>
        </Modal>
      )}

      {modal === "misc-charge" && (
        <Modal title="Enter Miscellaneous Charge" onClose={() => setModal(null)}>
          <div className="ta-modal-body">
            <p>A Miscellaneous Charge lets you manually add a charge to a patient's statement.</p>
            <Field label="Patient:"><span>{patient.name} {patient.dob}</span></Field>
            <Field label="Amount Owed:"><MoneyInput /></Field>
            <Field label="Date:"><input type="date" defaultValue="2026-04-28" /></Field>
            <Field label="Clinician:"><Select><option>Not assigned to any clinician</option><option>{patient.clinician}</option></Select></Field>
            <Field label="Comments:"><textarea /></Field>
            <button className="ta-button green" onClick={() => { setModal(null); notify("Miscellaneous charge saved."); }}>Save New Charge</button>
          </div>
        </Modal>
      )}

      {modal === "credit" && (
        <Modal title="Miscellaneous Patient Credit" onClose={() => setModal(null)}>
          <div className="ta-modal-body">
            <p className="ta-blue-line">Patient Balance Owed: <strong>{patient.balance}</strong> &nbsp;&nbsp; Unassigned Credit: <strong>{patient.credit}</strong></p>
            <Field label="Credit Date:"><input type="date" defaultValue="2026-04-28" /></Field>
            <Field label="Credit Amount:"><MoneyInput /></Field>
            <Field label="Credit Reason:"><input placeholder="optional" /></Field>
            <Field label="Comments:"><input placeholder="Internal memo only" /></Field>
            <button className="ta-button green" onClick={() => { setModal(null); notify("New credit saved."); }}>Save New Credit</button>
          </div>
        </Modal>
      )}

      {modal === "statement" && (
        <Modal title="Create Statement" onClose={() => setModal(null)}>
          <div className="ta-modal-body">
            <p className="ta-blue-line">Patient Balance Owed: <strong>{patient.balance}</strong> &nbsp;&nbsp; Unassigned Credit: <strong>{patient.credit}</strong></p>
            <p><label><input type="radio" name="statementRange" defaultChecked /> All open charges for the selected patient</label></p>
            <p className="ta-row"><label><input type="radio" name="statementRange" /> Charges from</label><Select>{chargeRanges.map((range) => <option key={range}>{range}</option>)}</Select><input type="date" defaultValue="2026-03-29" /> to <input type="date" defaultValue="2026-04-28" /></p>
            <Field label="Statement Comment:"><textarea placeholder="A comment to display at the end of the statement" /></Field>
            <button className="ta-button" onClick={() => setStatementPreview(true)}>Generate Preview</button>
            {statementPreview && (
              <div className="ta-statement-preview">
                <h3>Statement Preview</h3>
                <table className="ta-table"><thead><tr><th>Date</th><th>Transaction</th><th>Rate</th><th>Insurance</th><th>Client</th></tr></thead><tbody>{ledgerRows.map((row) => <tr key={`${row[0]}-${row[1]}`}><td>{row[0]}</td><td>{row[1]}</td><td>{row[7]}</td><td>{row[10]}</td><td>{row[9]}</td></tr>)}</tbody></table>
                <div className="ta-total">Amount Due: {patient.balance}</div>
                <button className="ta-button green" style={{ marginTop: 12 }} onClick={() => { setModal(null); notify("Statement saved."); }}>Save Statement</button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {modal === "note" && <Modal title="Create Note" onClose={() => setModal(null)}><div className="ta-modal-body"><NoteEditor patient={patient} onSave={() => { setModal(null); notify("Clinical note saved."); }} /></div></Modal>}
      {modal === "outcome" && <Modal title="Choose Outcome Measure" onClose={() => setModal(null)}><div className="ta-modal-body"><Select><option>ACE: Adverse Childhood Experiences Questionnaire</option><option>ASRS-v1.1: Adult ADHD Self-Report Scale</option><option>AUDIT: Alcohol Use Disorders Identification Test</option><option>C-SSRS: Columbia-Suicide Severity Rating Scale</option><option>PHQ-9</option><option>GAD-7</option></Select><br /><br /><button className="ta-button green" onClick={() => { setModal(null); notify("Outcome measure queued."); }}>Administer Measure</button></div></Modal>}
      {modal === "upload" && <Modal title="Upload Patient File" onClose={() => setModal(null)}><div className="ta-modal-body"><input type="file" /><br /><br /><button className="ta-button green" onClick={() => { setModal(null); notify("Patient file uploaded."); }}>Upload Patient File</button></div></Modal>}
      {modal === "contact" && <Modal title="New Contact" onClose={() => setModal(null)}><div className="ta-modal-body"><Field label="Name:"><input /></Field><Field label="Relationship:"><input /></Field><Field label="Phone:"><input /></Field><button className="ta-button green" onClick={() => { setModal(null); notify("Contact saved."); }}>Save Contact</button></div></Modal>}
      {modal === "reminder" && <Modal title="New Reminder" onClose={() => setModal(null)}><div className="ta-modal-body"><Field label="Due Date:"><input type="date" /></Field><Field label="Reminder:"><textarea /></Field><button className="ta-button green" onClick={() => { setModal(null); notify("Reminder saved."); }}>Save Reminder</button></div></Modal>}
      {modal === "conversation" && <Modal title="New Conversation" onClose={() => setModal(null)}><div className="ta-modal-body"><Field label="Topic:"><Select><option>Admin</option><option>Billing</option><option>Clinical</option></Select></Field><Field label="Message:"><textarea /></Field><button className="ta-button green" onClick={() => { setModal(null); notify("Conversation created."); }}>Create Conversation</button></div></Modal>}
      {["billing-comments", "insurance-edit", "claim-info", "payment-settings", "cash-rates"].includes(modal ?? "") && <Modal title="Edit Billing Settings" onClose={() => setModal(null)}><div className="ta-modal-body"><textarea style={{ width: "100%" }} placeholder="Update billing setting..." /><br /><br /><button className="ta-button green" onClick={() => { setModal(null); notify("Billing setting saved."); }}>Save Changes</button></div></Modal>}
    </main>
  );
}

function LedgerTable() {
  return (
    <table className="ta-table">
      <thead>
        <tr><th>▴ Date</th><th>Type</th><th>Clin</th><th>Network</th><th>Primary Payer</th><th>Secondary Payer</th><th>Rate</th><th>Pt Amt</th><th>Pt Bal</th><th>Ins Amt</th><th>Ins Paid</th><th>Ins Status</th></tr>
      </thead>
      <tbody>
        {ledgerRows.map((row) => (
          <tr key={`${row[0]}-${row[1]}-${row[2]}`}>
            <td>{row[0]}</td>
            <td><Link href="/billing">{row[1]}</Link><br /><span className="muted">{row[2]}</span></td>
            <td><Link href="/staff">{row[3]}</Link></td>
            <td>{row[4]}</td>
            <td>{row[5]}</td>
            <td className="muted">{row[6]}</td>
            <td className="money">{row[7]}</td>
            <td className="money">{row[8]}</td>
            <td className="money">{row[9]}</td>
            <td className="money">{row[10]}</td>
            <td className="money">{row[11]}</td>
            <td>{row[12]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NoteEditor({ patient, onSave }: { patient: { name: string; dob: string }; onSave: () => void }) {
  return (
    <div>
      <span className="ta-green-tag">Creating New Note</span>
      <div className="ta-note-head">
        <div>
          <h2>Psychotherapy Intake Note</h2>
          <p><strong>Clinician:</strong> Krystin Butler</p>
          <p><strong>Patient:</strong> {patient.name}, DOB {patient.dob}</p>
          <p><strong>Primary Insurance:</strong> Colorado Access, 12346</p>
        </div>
        <div>
          <p><strong>Date and Time:</strong> April 28, 2026 10:00AM - 11:30AM</p>
          <p><strong>Duration:</strong> 90 minutes</p>
          <p><strong>Service Code:</strong> 90791</p>
          <p><strong>Location:</strong> Main Office</p>
          <p><strong>Participants:</strong> Client only</p>
        </div>
      </div>
      <div className="ta-note-section"><h3>Presenting Problem</h3><textarea style={{ width: "100%" }} /></div>
      <div className="ta-note-section">
        <h3>Current Mental Status</h3>
        <div className="ta-note-grid">
          {["General Appearance", "Memory", "Dress", "Attention/Concentration", "Motor Activity", "Thought Content", "Insight", "Perception", "Judgment", "Flow of Thought", "Affect", "Interview Behavior", "Mood", "Speech"].map((field) => <label key={field}>{field}: <input /></label>)}
        </div>
      </div>
      <div className="ta-note-section">
        <h3>Safety Issues</h3>
        <label><input type="checkbox" /> None</label> or <label><input type="checkbox" /> Suicidal Ideation</label> <label><input type="checkbox" /> Homicidal Ideation</label> Other: <input placeholder="other safety issue" style={{ width: "50%" }} />
      </div>
      <div className="ta-note-section"><h3>Background Information</h3>{["Identification", "History of Present Problem", "Past Psychiatric History", "Trauma History"].map((field) => <label key={field} style={{ display: "grid", gridTemplateColumns: "180px 1fr", marginBottom: 6 }}>{field}: <input /></label>)}</div>
      <button className="ta-button green" onClick={onSave}>Save Draft</button>
    </div>
  );
}

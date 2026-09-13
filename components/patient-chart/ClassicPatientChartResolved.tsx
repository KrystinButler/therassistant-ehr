"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type RouteSource = "patients" | "clients";
type TabKey = "info" | "todo" | "schedule" | "documents" | "billing" | "billing-settings" | "clinicians" | "portal" | "messages" | "insights";

type Props = {
  routeSource: RouteSource;
  patientId: string;
};

const patient = {
  id: "pat_avery_morgan",
  accountNumber: "PAT-1000001",
  name: "Krystin Marie Butler",
  preferred: "Krystin",
  pronouns: "she/her",
  dob: "6/28/1987",
  mobile: "(303) 943-3946",
  clinician: "Krystin Butler",
  location: "Conscious Counseling PLLC",
  email: "Therassistant@outlook.com",
  balance: "$260.00",
  credit: "$0.00",
};

const serviceCodes = ["90837", "90834", "90832", "90839", "90791", "H0031", "H0032", "H0001", "T1017"];
const appointmentTypes = ["Intake", "Follow-up", "Therapy Session", "Psychotherapy", "Case Management", "Crisis Session", "Assessment"];
const frequencies = ["One time", "Weekly", "Bi-weekly", "Monthly"];
const outcomeRanges = ["Last 30 days", "Last 60 days", "Last 90 days", "Last 120 days", "Last 365 days"];
const statementRanges = ["Last 30 days", "Last 60 days", "Last 90 days", "Last 120 days"];

const tabs: Array<[TabKey, string, string]> = [
  ["info", "Info", ""],
  ["todo", "To-Do", "todo"],
  ["schedule", "Schedule", "schedule"],
  ["documents", "Documents", "documents"],
  ["billing", "Billing", "patient-billing"],
  ["billing-settings", "Billing Settings", "billing-settings"],
  ["clinicians", "Clinicians", "clinicians"],
  ["portal", "Portal", "portal"],
  ["messages", "Messages", "messages"],
  ["insights", "Insights", "insights"],
];

const documents = [
  ["📄", "Superbill for 1/6/25", "PDF 50KB", "—", "1/6/2025", "Billing", ""],
  ["📝", "Miscellaneous Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["🧾", "Treatment Plan", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📝", "Progress Note", "", "H0031", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["✉️", "Contact Note", "Email with Patient", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["⚠️", "Missed Appointment Note", "", "—", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📋", "Intake Note", "", "90791", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📋", "Consultation Note", "", "H0002", "1/6/2025", "Krystin Butler", "Signed by Author"],
  ["📋", "Psychotherapy Note", "", "—", "1/6/2025", "Krystin Butler", ""],
];

const ledgerRows = [
  ["1/6/25", "Misc. Charge", "from Misc. Note", "K-But", "Direct", "Direct", "—", "$260.00", "$260.00", "$260.00", "—", "—", "—"],
  ["1/6/25", "H0002", "", "K-But", "Direct", "Direct", "—", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["1/6/25", "90791", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "Not set", "$0.00", "Submitted Claim"],
  ["1/6/25", "Missed Appt", "", "K-But", "Direct", "Direct", "—", "Not set", "Not set", "—", "—", "—", "—"],
  ["1/6/25", "H0031", "", "K-But", "Direct", "Direct", "—", "Not set", "Not set", "—", "—", "$0.00", "—"],
  ["4/28/26", "H0031", "", "K-But", "In", "Colorado Access", "Not Set", "Not set", "Not set", "—", "—", "—", "—"],
];

function join(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function pathFor(routeSource: RouteSource, patientId: string, segment: string) {
  return `/${routeSource}/${patientId}${segment ? `/${segment}` : ""}`;
}

function Banner({ message }: { message: string }) {
  return <div className="mb-2 border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-900">{message}</div>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={join("mb-4 border border-slate-300 bg-white p-4", className)}>{children}</section>;
}

function TextInput({ type = "text", placeholder = "", className = "", defaultValue = "" }: { type?: string; placeholder?: string; className?: string; defaultValue?: string }) {
  return <input type={type} defaultValue={defaultValue} placeholder={placeholder} className={join("h-8 rounded border border-slate-300 px-2 text-sm", className)} />;
}

function Select({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <select className={join("h-8 rounded border border-slate-300 bg-white px-2 text-sm", className)}>{children}</select>;
}

function GreenButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className="rounded bg-[#75b900] px-3 py-2 text-sm font-bold text-white hover:bg-[#5f9900]">{children}</button>;
}

function BlueButton({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const cls = "rounded bg-[#179bd7] px-3 py-2 text-sm font-bold text-white hover:bg-[#087eb4]";
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

function LinkButton({ children, onClick, href }: { children: React.ReactNode; onClick?: () => void; href?: string }) {
  const cls = "text-sm text-[#0069aa] hover:underline";
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-[#229bd3] text-left text-white">
          {headers.map((h) => <th key={h} className="border border-[#229bd3] px-3 py-2 font-bold">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={i % 2 ? "bg-[#f7f7f7]" : "bg-white"}>
            {r.map((c, j) => <td key={j} className="border border-slate-300 px-3 py-2 align-top">{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 pt-14">
      <div className="w-[620px] max-w-[96vw] rounded border border-slate-500 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#219bd6] px-4 py-2">
          <h2 className="text-lg font-normal text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="text-3xl leading-none text-slate-500">×</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function ClassicPatientChartResolved({ routeSource, patientId }: Props) {
  const pathname = usePathname();
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<"appointment" | "charge" | "payment" | "credit" | "note" | "upload" | "outcome" | "conversation" | "contact" | "statement" | null>(null);
  const [statementPreview, setStatementPreview] = useState(false);
  const [portalFilter, setPortalFilter] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("Check");

  const activeTab: TabKey = useMemo(() => {
    if (pathname.includes("/todo")) return "todo";
    if (pathname.includes("/schedule")) return "schedule";
    if (pathname.includes("/documents")) return "documents";
    if (pathname.includes("/patient-billing") || pathname.includes("/payment") || pathname.includes("/credit") || pathname.includes("/statement")) return "billing";
    if (pathname.includes("/billing-settings")) return "billing-settings";
    if (pathname.includes("/clinicians")) return "clinicians";
    if (pathname.includes("/portal")) return "portal";
    if (pathname.includes("/messages")) return "messages";
    if (pathname.includes("/insights")) return "insights";
    return "info";
  }, [pathname]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  function save(message: string) {
    notify(message);
    setModal(null);
  }

  const patientBase = `/${routeSource}/${patientId}`;

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[14px] text-black">
      <div className="bg-[#05739e] shadow">
        <div className="flex h-12 items-center">
          <Link href="/" className="flex h-12 w-16 items-center justify-center bg-white text-[10px] font-bold text-[#05739e]">Thera<br />Assistant</Link>
          {["To-Do", "Scheduling", "Patients", "Staff", "Billing", "Payers"].map((item) => (
            <Link key={item} href={item === "Patients" ? "/patients" : `/${item.toLowerCase().replace("-", "")}`} className="flex h-12 items-center px-5 text-lg text-white hover:bg-[#045f86]">{item}</Link>
          ))}
          <div className="ml-auto flex items-center gap-5 px-5 text-lg text-white">👤 ⌄ 🔍</div>
        </div>
      </div>

      <main className="px-6 py-3">
        {toast && <Banner message={toast} />}

        <div className="mb-2 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-light text-slate-800">
              <Link href="/patients" className="text-[#1787c2] hover:underline">Patient:</Link>{" "}
              {patient.name} <span className="text-slate-400">({patient.pronouns})</span>{" "}
              <span className="ml-2 text-xs text-slate-600">{patient.dob}</span>
            </h1>
          </div>
          <div className="text-right text-xs text-slate-600">
            <div><Link href={pathFor(routeSource, patientId, "todo")} className="font-bold text-[#0077b8]">● 3 To-Do</Link> &nbsp; 🗓 No Future Appt</div>
            <div>☎ Mobile: <Link href="#" className="text-[#0077b8]">{patient.mobile}</Link> (No Messages)</div>
          </div>
        </div>

        <nav className="mb-3 border-b-2 border-[#1c9dd9] pl-2">
          {tabs.map(([key, label, segment]) => (
            <Link
              key={key}
              href={pathFor(routeSource, patientId, segment)}
              className={join(
                "mr-1 inline-block rounded-t px-3 py-2 text-sm font-bold text-white",
                activeTab === key ? "bg-[#1599d3]" : "bg-[#666] hover:bg-[#555]",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {pathname.includes("/notes") ? <NoteEditor /> : activeTab === "info" && <InfoTab notify={notify} setModal={setModal} />}
        {activeTab === "todo" && <TodoTab notify={notify} />}
        {activeTab === "schedule" && <ScheduleTab setModal={setModal} />}
        {activeTab === "documents" && <DocumentsTab routeSource={routeSource} patientId={patientId} setModal={setModal} />}
        {activeTab === "billing" && <BillingTab setModal={setModal} statementPreview={statementPreview} setStatementPreview={setStatementPreview} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />}
        {activeTab === "billing-settings" && <BillingSettingsTab notify={notify} />}
        {activeTab === "clinicians" && <CliniciansTab />}
        {activeTab === "portal" && <PortalTab portalFilter={portalFilter} setPortalFilter={setPortalFilter} notify={notify} />}
        {activeTab === "messages" && <MessagesTab setModal={setModal} />}
        {activeTab === "insights" && <InsightsTab />}

        {modal === "appointment" && <AppointmentModal onClose={() => setModal(null)} onSave={() => save("Appointment saved and linked to appointment database.")} />}
        {modal === "charge" && <ChargeModal onClose={() => setModal(null)} onSave={() => save("Miscellaneous charge saved.")} />}
        {modal === "payment" && <PaymentModal paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onClose={() => setModal(null)} onSave={() => save("Patient payment saved and allocated.")} />}
        {modal === "credit" && <CreditModal onClose={() => setModal(null)} onSave={() => save("Patient credit saved.")} />}
        {modal === "note" && <NoteModal onClose={() => setModal(null)} onSave={() => save("New note created from patient chart.")} />}
        {modal === "upload" && <UploadModal onClose={() => setModal(null)} onSave={() => save("Patient file uploaded to documents.")} />}
        {modal === "outcome" && <OutcomeModal onClose={() => setModal(null)} onSave={() => save("Outcome measure assigned.")} />}
        {modal === "conversation" && <ConversationModal onClose={() => setModal(null)} onSave={() => save("New patient conversation started.")} />}
        {modal === "contact" && <ContactModal onClose={() => setModal(null)} onSave={() => save("New contact saved.")} />}
      </main>
    </div>
  );
}

function InfoTab({ notify, setModal }: { notify: (m: string) => void; setModal: (m: any) => void }) {
  return (
    <>
      <Panel>
        <h2 className="mb-3 text-lg">Patient Comments</h2>
        <TextInput className="w-full" placeholder="For non-clinical info such as scheduling/billing comments. All users can see this. Conveniently visible in tooltips." />
      </Panel>
      <Panel>
        <h2 className="mb-4 text-xl">Patient Information</h2>
        <div className="grid grid-cols-2 gap-12">
          <div className="grid grid-cols-[110px_1fr] items-center gap-2">
            <label>Legal Name:</label><div className="flex gap-1"><TextInput defaultValue="Krystin" className="w-28" /><TextInput placeholder="middle" className="w-20" /><TextInput defaultValue="Butler" className="w-36" /><TextInput placeholder="suffix" className="w-16" /></div>
            <label>Preferred Name:</label><TextInput defaultValue="Krystin" className="w-40" />
            <label>Pronouns:</label><TextInput defaultValue="she/her" className="w-32" />
            <label>Date of Birth:</label><TextInput type="date" defaultValue="1987-06-28" className="w-40" />
            <label>Account Number:</label><TextInput defaultValue="PAT-1000001" className="w-36" />
            <label>Address 1:</label><TextInput defaultValue="18622 E Water Dr" className="w-80" />
            <label>Address 2:</label><TextInput defaultValue="Unit D" className="w-80" />
            <label>Zip:</label><TextInput defaultValue="80013" className="w-32" />
            <label>City/State:</label><div className="flex gap-1"><TextInput defaultValue="Aurora" className="w-44" /><Select><option>CO</option></Select></div>
            <label>Time Zone:</label><Select className="w-64"><option>Not Set (Use practice time zone)</option><option>Mountain Time</option></Select>
            <label>Mobile Phone:</label><div className="flex gap-1"><TextInput defaultValue="(303) 943-3946" className="w-44" /><Select className="w-44"><option>No messages</option><option>Text messages OK</option></Select></div>
            <label>Email:</label><TextInput defaultValue="Therassistant@outlook.com" className="w-80" />
          </div>
          <div className="grid grid-cols-[170px_1fr] items-center gap-2">
            <label>Administrative Sex:</label><div className="flex gap-4"><label><input type="radio" name="sex" /> Male</label><label><input type="radio" name="sex" /> Female</label><label><input type="radio" name="sex" defaultChecked /> Unknown</label></div>
            <label>Gender Identity:</label><Select className="w-80"><option>-- Select Gender Identity --</option><option>Female</option><option>Male</option><option>Nonbinary</option></Select>
            <label>Sexual Orientation:</label><Select className="w-80"><option>-- Select Sexual Orientation --</option><option>Heterosexual</option><option>Gay or Lesbian</option><option>Bisexual</option><option>Declined</option></Select>
            <label>Race:</label><TextInput placeholder="Add Race" className="w-80" />
            <label>Ethnicity:</label><TextInput placeholder="Add Ethnicity" className="w-80" />
            <label>Languages:</label><TextInput placeholder="Add Language" className="w-80" />
            <label>Smoking Status:</label><Select className="w-80"><option>-- Select Smoking Status --</option><option>Never smoker</option><option>Current smoker</option></Select>
            <label>Marital Status:</label><Select className="w-80"><option>-- Select Marital Status --</option><option>Single</option><option>Married</option></Select>
            <label>HIPAA:</label><label><input type="checkbox" /> Signed HIPAA NPP on file ⚠️</label>
            <label>PCP Release:</label><Select className="w-80"><option>Not set</option><option>On file</option><option>Declined</option></Select>
          </div>
        </div>
        <div className="mt-5 flex gap-3"><GreenButton onClick={() => notify("Patient information saved.")}>Save Changes</GreenButton><LinkButton href="/patients">Cancel</LinkButton><LinkButton href="/patients">Delete Patient</LinkButton></div>
      </Panel>
      <Panel>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-xl">Contacts</h2><BlueButton onClick={() => setModal("contact")}>+ New Contact</BlueButton></div>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-[90px_1fr] gap-2"><label>Name:</label><div className="flex gap-1"><TextInput defaultValue="Group" /><TextInput defaultValue="Therapy" /></div><label>Title:</label><TextInput /><label>Company:</label><TextInput /></div>
          <div className="grid grid-cols-[110px_1fr] gap-2"><label>Mobile Phone:</label><TextInput /><label>Work Phone:</label><TextInput /><label>Home Phone:</label><TextInput /><label>Fax:</label><TextInput /></div>
        </div>
      </Panel>
    </>
  );
}

function TodoTab({ notify }: { notify: (m: string) => void }) {
  return <Panel><div className="mb-3 flex justify-between"><h2 className="text-xl">Patient To-Do List</h2><BlueButton onClick={() => notify("Reminder created for clinician To-Do list.")}>+ New Reminder</BlueButton></div><h3 className="font-bold">Notes <span className="rounded-full bg-[#0077b8] px-2 text-white">2</span></h3><Table headers={["Date", "To-Do Items", ""]} rows={[["3/7/25", <Link href="/workqueue" className="text-[#0069aa]">Consider creating a Termination Note since there have been no appointments for at least 60 days.</Link>, "×"], ["4/6/25", <Link href="/workqueue" className="text-[#0069aa]">Create a new Treatment Plan since the most recent Treatment Plan is more than 90 days old.</Link>, "×"]]} /></Panel>;
}

function ScheduleTab({ setModal }: { setModal: (m: any) => void }) {
  return <Panel><div className="mb-3 flex justify-between"><h2 className="text-xl">Schedule</h2><BlueButton onClick={() => setModal("appointment")}>+ New Appointment</BlueButton></div><div className="rounded border border-slate-300 bg-slate-50 p-4 text-sm">No future appointments. Use New Appointment to create an appointment linked to the appointment database.</div></Panel>;
}

function DocumentsTab({ routeSource, patientId, setModal }: { routeSource: RouteSource; patientId: string; setModal: (m: any) => void }) {
  return <Panel><div className="mb-4 flex items-center justify-between"><h2 className="text-xl">Notes and Documents for this Patient</h2><div className="flex gap-2"><BlueButton onClick={() => setModal("note")}>Create Note ▾</BlueButton><BlueButton onClick={() => setModal("outcome")}>Outcome Measure ▾</BlueButton><BlueButton onClick={() => setModal("upload")}>☁ Upload Patient File</BlueButton></div></div><div className="mb-2 text-right text-xs"><Link href="#" className="text-[#0069aa]">▥ Showing Notes and Documents</Link> &nbsp; <Link href="#" className="text-[#0069aa]">▦ Select Columns</Link></div><Table headers={["Document", "Service", "Date", "Author/Access", "Status", ""]} rows={documents.map(([icon, title, sub, service, date, author, status]) => [<Link href={pathFor(routeSource, patientId, "notes")} className="text-[#0069aa]">{icon} {title} <span className="text-xs text-slate-400">{sub}</span></Link>, service, date, <Link href="/staff" className="text-[#0069aa]">{author}</Link>, status, "↗ ✎ ☁"])} /><div className="mt-3"><LinkButton href="#">Download Multiple</LinkButton></div></Panel>;
}

function BillingTab({ setModal, statementPreview, setStatementPreview, paymentMethod, setPaymentMethod }: { setModal: (m: any) => void; statementPreview: boolean; setStatementPreview: (v: boolean) => void; paymentMethod: string; setPaymentMethod: (v: string) => void }) {
  if (typeof window !== "undefined" && window.location.pathname.includes("/payment")) return <PaymentPage paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />;
  if (typeof window !== "undefined" && window.location.pathname.includes("/credit")) return <CreditPage />;
  if (typeof window !== "undefined" && window.location.pathname.includes("/statement")) return <StatementPage statementPreview={statementPreview} setStatementPreview={setStatementPreview} />;
  return (
    <>
      <Panel><h2 className="mb-3 text-xl">Patient Billing</h2><div className="mb-4">Patient Balance Owed: <b>{patient.balance}</b> <span className="ml-8">Unassigned Credit: <b>{patient.credit}</b></span></div><div className="border-t-2 border-[#219bd6] pt-4 grid grid-cols-3 gap-10"><div><h3 className="font-bold text-slate-600">Patient Accounting</h3><div className="mt-2 grid gap-2"><LinkButton href={`${windowSafeBase()}/payment`}>Enter Patient Payment</LinkButton><LinkButton onClick={() => setModal("charge")}>Enter Misc Charge</LinkButton><LinkButton onClick={() => setModal("payment")}>Enter Refund</LinkButton><LinkButton href={`${windowSafeBase()}/credit`}>Enter Misc Credit</LinkButton><LinkButton href={`${windowSafeBase()}/statement`}>Create Statement</LinkButton></div></div><div><h3 className="font-bold text-slate-600">Insurance Claims</h3><div className="mt-2 grid gap-2"><LinkButton href="/billing/eligibility">Eligibility History <Badge>0</Badge></LinkButton><LinkButton href="/billing/submit-claims">Submit Primary Claims <Badge>0</Badge></LinkButton><LinkButton href="/billing/submit-claims">Submit Secondary Claims <Badge>0</Badge></LinkButton><LinkButton href="/billing/cms-1500">Create CMS-1500 <Badge>0</Badge></LinkButton><LinkButton href="/patients/PAT-1000001/superbill">Create Superbill</LinkButton></div></div><div><h3 className="font-bold text-slate-600">Insurance Payments</h3><div className="mt-2 grid gap-2"><LinkButton href="/billing/insurance-payment">Enter Insurance Payment</LinkButton><LinkButton href="/claims/status">Electronic Claim History <Badge>0</Badge></LinkButton><LinkButton href="/billing/era">ERA</LinkButton></div></div></div></Panel>
      <Panel><div className="mb-3 flex items-center gap-3"><h2 className="text-xl">Search Billing Transactions</h2><button className="rounded bg-[#42aee8] px-3 py-2 text-white">Open Items</button><button className="rounded border px-3 py-2">All Items</button><button className="rounded border px-3 py-2">Custom</button></div><div className="mb-2 text-right text-xs"><Link href="#" className="text-[#0069aa]">▧ Export Spreadsheet</Link> &nbsp; <Link href="#" className="text-[#0069aa]">▦ Select Columns</Link></div><LedgerTable /></Panel>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) { return <span className="rounded-full bg-slate-300 px-2 text-xs text-white">{children}</span>; }
function windowSafeBase() { return typeof window === "undefined" ? "/patients/PAT-1000001" : window.location.pathname.split("/").slice(0,3).join("/"); }

function LedgerTable() {
  return <Table headers={["▴ Date", "Type", "Clin", "Network", "Primary Payer", "Secondary Payer", "Rate", "Pt Amt", "Pt Bal", "Ins Amt", "Ins Paid", "Ins Status"]} rows={ledgerRows.map((r) => [r[0], <><Link href="#" className="text-[#0069aa]">{r[1]}</Link><div className="text-xs text-slate-500">{r[2]}</div></>, r[3], r[4], <Link href="/payers" className="text-[#0069aa]">{r[5]}</Link>, r[6], r[7], r[8], r[9], r[10], r[11], r[12]])} />;
}

function BillingSettingsTab({ notify }: { notify: (m: string) => void }) {
  return <><Panel><div className="flex justify-between"><h2 className="text-lg">Billing Comments: <span className="text-slate-500">None</span></h2><LinkButton onClick={() => notify("Billing comments editor opened.")}>✎ Edit</LinkButton></div></Panel><Panel><div className="flex justify-between"><h2 className="text-xl">Insurance</h2><LinkButton onClick={() => notify("Insurance editor opened.")}>✎ Edit</LinkButton></div><div className="mt-4 rounded border bg-slate-50 p-4"><h3 className="text-lg text-[#0069aa]">Colorado Access (84129): Primary</h3><div className="ml-8 mt-6 grid w-72 grid-cols-2 gap-1"><span className="text-right text-slate-500">Copay:</span><b>Not set</b><span className="text-right text-slate-500">Member ID:</span><b>12346</b><span className="text-right text-slate-500">Policy Holder:</span><b>Self</b><span className="text-right text-slate-500">Eligibility:</span><b>Not verified</b></div><div className="mt-5"><BlueButton onClick={() => notify("Eligibility verification queued.")}>Verify Eligibility</BlueButton></div></div></Panel>{["Additional Claim Information: None", "Payment Settings", "Patient Cash Rates: None"].map((title) => <Panel key={title}><div className="flex justify-between"><h2 className="text-lg">{title}</h2><LinkButton onClick={() => notify(`${title} editor opened.`)}>✎ Edit</LinkButton></div>{title === "Payment Settings" && <p className="mt-3 text-sm">Responsible Party for Billing: <b>The Patient</b></p>}</Panel>)}</>;
}

function CliniciansTab() { return <Panel><h2 className="text-xl">Clinicians</h2><p>Assigned Clinician: <Link href="/staff" className="text-[#0069aa]">Krystin Butler</Link></p></Panel>; }

function PortalTab({ portalFilter, setPortalFilter, notify }: { portalFilter: string; setPortalFilter: (v: string) => void; notify: (m: string) => void }) {
  return <><Panel><h2 className="mb-3 text-xl">THERASSISTANT PORTAL Access</h2><p>This patient does not have an account on the practice&apos;s client portal. A portal account is required to view shared documents, complete paperwork, manage appointments, and join telehealth sessions.</p><p className="mt-3">Email Address: {patient.email}</p><div className="mt-4"><GreenButton onClick={() => notify("Welcome email sent to patient.")}>Send Welcome Email</GreenButton></div></Panel><Panel><div className="mb-6 flex justify-between"><h2 className="text-xl">Document Requests</h2><BlueButton href="/library">Share Documents</BlueButton></div><div className="mb-10 flex">{["All", "Needs Processing", "Waiting on Patient", "Custom"].map((x) => <button key={x} onClick={() => setPortalFilter(x)} className={join("border px-3 py-2 text-sm", portalFilter === x ? "bg-[#229bd3] text-white" : "bg-white")}>{x} <Badge>0</Badge></button>)}</div><Table headers={["Document", "Sent", "Received", "Status"]} rows={[[`There are no matching portal documents for filter: ${portalFilter}`, "", "", ""]]} /></Panel></>;
}

function MessagesTab({ setModal }: { setModal: (m: any) => void }) {
  return <Panel><div className="mb-3 flex justify-between"><h2 className="text-xl">Patient Messages</h2><BlueButton onClick={() => setModal("conversation")}>+ New Conversation</BlueButton></div><div className="grid min-h-[520px] grid-cols-[140px_260px_1fr] border border-slate-300"><div className="border-r p-3">{["📥 Inbox", "▣ Admin", "💵 Billing", "☑ Clinical", "🗑 Deleted"].map((x,i)=><div key={x} className={join("mb-2 px-2 py-1", i===0 && "bg-blue-50 text-[#0069aa]")}>{x}</div>)}<div className="mt-96 text-xs"><label><input type="radio" /> Unread Only</label><br/><label><input type="radio" defaultChecked /> Unread and Read</label><br/><label><input type="radio" /> All Including Archived</label><br/><LinkButton href="#">Messages Settings</LinkButton></div></div><div className="border-r p-3"><Select className="mb-3 w-full"><option>All Topics</option><option>Billing</option><option>Clinical</option></Select><div className="flex justify-between text-xs"><LinkButton href="#">Select</LinkButton><Select><option>Newest</option><option>Oldest</option></Select></div><p className="mt-8 text-center text-xs text-slate-500">There are no messages to be displayed.</p></div><div className="flex items-center justify-center text-slate-500">Select a conversation</div></div></Panel>;
}

function InsightsTab() {
  return <Panel><h2 className="mb-4 text-xl">Outcome Measures</h2><div className="flex items-center gap-2"><Select>{outcomeRanges.map(x => <option key={x}>{x}</option>)}</Select><TextInput type="date" defaultValue="2025-04-28" /> to <TextInput type="date" defaultValue="2026-04-28" /></div><p className="mt-5">There are no chartable results for the selected date range.</p></Panel>;
}

function AppointmentModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Create New Appointment" onClose={onClose}><div className="grid grid-cols-[130px_1fr] items-center gap-2"><label>Appointment Type:</label><Select>{appointmentTypes.map(x => <option key={x}>{x}</option>)}</Select><label>Patient:</label><Link href="/patients" className="rounded border px-2 py-1 text-[#0069aa]">{patient.name} {patient.dob}</Link><label>Clinician:</label><Link href="/staff" className="rounded border px-2 py-1 text-[#0069aa]">{patient.clinician}</Link><label>Location:</label><Link href="/settings" className="rounded border px-2 py-1 text-[#0069aa]">{patient.location}</Link><label>Telehealth:</label><label><input type="checkbox" /> Use TherAssistant Telehealth</label><label>Service Code:</label><Select>{serviceCodes.map(x => <option key={x}>{x}</option>)}</Select><label>Scheduled Time:</label><div className="flex gap-2"><TextInput type="date" /><span>at</span><TextInput type="time" /></div><label>Duration:</label><div><TextInput type="number" defaultValue="60" className="w-20" /> minutes</div><label>Frequency:</label><Select>{frequencies.map(x => <option key={x}>{x}</option>)}</Select><label>Appointment Alert:</label><textarea className="h-16 rounded border border-slate-300 p-2" /></div><div className="mt-4"><GreenButton onClick={onSave}>Save New Appointment</GreenButton></div></Modal>;
}

function ChargeModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Enter Miscellaneous Charge" onClose={onClose}><p className="mb-3">A Miscellaneous Charge lets you manually add a charge to a patient&apos;s statement.</p><div className="grid grid-cols-[130px_1fr] gap-2"><label>Patient:</label><span>{patient.name} {patient.dob}</span><label>Amount Owed:</label><TextInput type="number" placeholder="$" className="w-28" /><label>Date:</label><TextInput type="date" defaultValue="2026-04-28" className="w-40" /><label>Clinician:</label><Select><option>Not assigned to any clinician</option><option>{patient.clinician}</option></Select><label>Comments:</label><textarea className="h-20 rounded border border-slate-300 p-2" /></div><div className="mt-4"><GreenButton onClick={onSave}>Save New Charge</GreenButton></div></Modal>;
}
function PaymentModal({ paymentMethod, setPaymentMethod, onClose, onSave }: { paymentMethod: string; setPaymentMethod: (v: string) => void; onClose: () => void; onSave: () => void }) {
  return <Modal title="Enter Patient Payment" onClose={onClose}><PaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onSave={onSave} /></Modal>;
}
function CreditModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Miscellaneous Patient Credit" onClose={onClose}><CreditForm onSave={onSave} /></Modal>;
}
function NoteModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Create Note" onClose={onClose}><div className="grid gap-2"><Select>{["Progress Note", "Intake Note", "Treatment Plan", "Contact Note", "Missed Appointment Note"].map(x => <option key={x}>{x}</option>)}</Select><Select>{serviceCodes.map(x => <option key={x}>{x}</option>)}</Select><textarea className="h-24 rounded border p-2" placeholder="Clinical note draft..." /></div><div className="mt-4"><GreenButton onClick={onSave}>Create Note</GreenButton></div></Modal>;
}
function UploadModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Upload Patient File" onClose={onClose}><input type="file" className="w-full rounded border p-2" /><div className="mt-4"><GreenButton onClick={onSave}>Upload Patient File</GreenButton></div></Modal>;
}
function OutcomeModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Choose a questionnaire to administer now:" onClose={onClose}><select size={10} className="w-full rounded border p-2">{["ACE: Adverse Childhood Experiences Questionnaire", "ASRS-v1.1: Adult ADHD Self-Report Scale", "AUDIT: Alcohol Use Disorders Identification Test", "BBGS: Brief Biosocial Gambling Screen", "C-SSRS: Columbia-Suicide Severity Rating Scale", "CAGE-AID: CAGE Adapted to Include Drugs", "CRAFFT 2.1+N: CRAFFT+N Questionnaire", "DAS: Dyadic Adjustment Scale", "DES II: Dissociative Experiences Scale II", "EAT-26: Eating Attitudes Test"].map(x => <option key={x}>{x}</option>)}</select><div className="mt-4"><GreenButton onClick={onSave}>Assign Outcome Measure</GreenButton></div></Modal>;
}
function ConversationModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="New Conversation" onClose={onClose}><Select className="mb-2 w-full"><option>Clinical</option><option>Billing</option><option>Admin</option></Select><textarea className="h-32 w-full rounded border p-2" placeholder="Message..." /><div className="mt-4"><GreenButton onClick={onSave}>Start Conversation</GreenButton></div></Modal>;
}
function ContactModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="New Contact" onClose={onClose}><div className="grid grid-cols-[120px_1fr] gap-2"><label>Name:</label><TextInput /><label>Relationship:</label><TextInput /><label>Phone:</label><TextInput /><label>Email:</label><TextInput /></div><div className="mt-4"><GreenButton onClick={onSave}>Save Contact</GreenButton></div></Modal>;
}

function PaymentForm({ paymentMethod, setPaymentMethod, onSave }: { paymentMethod: string; setPaymentMethod: (v: string) => void; onSave: () => void }) {
  return <><div className="mb-4">Patient Balance Owed: <b>{patient.balance}</b> <span className="ml-8">Unassigned Credit: <b>{patient.credit}</b></span></div><div className="border-t-2 border-[#219bd6] pt-4 grid grid-cols-[140px_1fr] gap-2"><label>Payment Method:</label><div className="flex gap-2">{["Check", "Cash", "External"].map(m => <button key={m} onClick={() => setPaymentMethod(m)} className={join("rounded border px-5 py-2", paymentMethod === m && "border-[#229bd3] bg-blue-50")}>{paymentMethod === m ? "✓ " : ""}{m}</button>)}</div><label>Payment Date:</label><TextInput type="date" defaultValue="2026-04-28" className="w-40" /><label>Payment Amount:</label><TextInput type="number" placeholder="$" className="w-32" /><label>Check Number:</label><TextInput placeholder="optional" className="w-80" /><label>Comments:</label><TextInput placeholder="Internal memo only" className="w-96" /></div><h3 className="mt-6 font-bold">Open Items Awaiting Payment:</h3><LedgerAllocation allocationLabel="Allocation" /><div className="mt-6"><GreenButton onClick={onSave}>Save New Payment</GreenButton></div></>;
}
function PaymentPage({ paymentMethod, setPaymentMethod }: { paymentMethod: string; setPaymentMethod: (v: string) => void }) {
  return <Panel><div className="-mt-8 mb-2 inline-block bg-lime-200 px-3 py-1 text-xs">Create New Payment</div><h2 className="mb-3 text-xl">Patient Payment</h2><PaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onSave={() => alert("Payment saved.")} /></Panel>;
}
function CreditForm({ onSave }: { onSave: () => void }) {
  return <><div>Patient Balance Owed: <b>{patient.balance}</b> <span className="ml-8">Unassigned Credit: <b>{patient.credit}</b></span></div><div className="mt-4 border-t-2 border-[#219bd6] pt-4 grid grid-cols-[140px_1fr] gap-2"><label>Credit Date:</label><TextInput type="date" defaultValue="2026-04-28" className="w-40" /><label>Credit Amount:</label><TextInput type="number" placeholder="$" className="w-32" /><label>Credit Reason:</label><TextInput placeholder="optional" className="w-80" /><label>Comments:</label><TextInput placeholder="Internal memo only" className="w-96" /></div><h3 className="mt-6 font-bold">Open Items Awaiting Payment:</h3><LedgerAllocation allocationLabel="Credit Allocation" /><div className="mt-6"><GreenButton onClick={onSave}>Save New Credit</GreenButton></div></>;
}
function CreditPage() { return <Panel><div className="-mt-8 mb-2 inline-block bg-lime-200 px-3 py-1 text-xs">Create New Credit</div><h2 className="mb-3 text-xl">Miscellaneous Patient Credit</h2><CreditForm onSave={() => alert("Credit saved.")} /></Panel>; }
function LedgerAllocation({ allocationLabel }: { allocationLabel: string }) {
  return <Table headers={["▴ Date", "Type", "Clin", "Primary Payer", "Secondary Payer", "Rate", "Pt Amt", "Pt Bal", allocationLabel, "Write-Off"]} rows={ledgerRows.map(r => [r[0], <><Link href="#" className="text-[#0069aa]">{r[1]}</Link><div className="text-xs text-slate-500">{r[2]}</div></>, r[3], r[5], r[6], r[7], r[8], r[9], <TextInput placeholder="$" className="w-20 bg-blue-50" />, <label><input type="checkbox" /> $260.00</label>])} />;
}
function StatementPage({ statementPreview, setStatementPreview }: { statementPreview: boolean; setStatementPreview: (v: boolean) => void }) {
  return <><Panel><h2 className="mb-4 text-xl">Create Statement</h2><div>Patient Balance Owed: <b>{patient.balance}</b> <span className="ml-8">Unassigned Credit: <b>{patient.credit}</b></span></div><div className="mt-4 border-t-2 border-[#219bd6] pt-4"><label><input type="radio" name="charges" defaultChecked /> All open charges for the selected patient</label><br /><label><input type="radio" name="charges" /> Charges from </label><Select>{statementRanges.map(x => <option key={x}>{x}</option>)}</Select> <TextInput type="date" defaultValue="2026-03-29" /> to <TextInput type="date" defaultValue="2026-04-28" /><div className="mt-4"><label>Statement Comment:</label><textarea className="mt-2 h-28 w-full rounded border p-2" placeholder="A comment to display at the end of the statement" /></div><div className="mt-3"><BlueButton onClick={() => setStatementPreview(true)}>Generate Preview</BlueButton></div></div></Panel>{statementPreview && <Panel><h2 className="mb-4 text-xl">Statement Preview</h2><div className="border-t-2 border-[#219bd6] pt-4"><div className="mb-6 flex justify-between"><div>Krystin Butler<br />18622 E Water Dr<br />Unit D<br />Aurora, CO 80013</div><div className="text-right">04/28/2026<br />All open charges</div></div><Table headers={["Date", "Transaction", "Rate", "Insurance", "Client"]} rows={ledgerRows.map(r => [r[0], `${r[1]} ${r[2]}`, r[7], "Not Set", r[9]])} /><div className="mt-4 bg-slate-200 py-3 text-center text-lg font-bold">Amount Due: {patient.balance}</div><div className="mt-5"><GreenButton onClick={() => alert("Statement saved.")}>Save Statement</GreenButton> <LinkButton href={windowSafeBase() + "/patient-billing"}>Cancel</LinkButton></div></div></Panel>}</>;
}

function NoteEditor() {
  const fields = ["General Appearance", "Dress", "Motor Activity", "Insight", "Judgment", "Affect", "Mood", "Memory", "Attention/Concentration", "Thought Content", "Perception", "Flow of Thought", "Interview Behavior", "Speech"];
  return <Panel><div className="-mt-8 mb-2 inline-block bg-lime-200 px-3 py-1 text-xs">Creating New Note</div><h2 className="text-xl">Psychotherapy Intake Note</h2><div className="mb-4 grid grid-cols-2"><div><b>Clinician:</b> Krystin Butler<br /><b>Patient:</b> {patient.name}, DOB {patient.dob}<br /><b>Primary Insurance:</b> Colorado Access</div><div><b>Date and Time:</b> April 28, 2026 10:00AM - 11:30AM<br /><b>Duration:</b> 90 minutes<br /><b>Service Code:</b> 90791<br /><b>Location:</b> Main Office</div></div><div className="border-t-2 border-[#219bd6] pt-4"><h3 className="font-bold">Presenting Problem</h3><textarea className="mt-2 h-14 w-full rounded border p-2" /><h3 className="mt-4 font-bold">Current Mental Status</h3><div className="grid grid-cols-2 gap-x-10 gap-y-2">{fields.map(f => <label key={f} className="grid grid-cols-[170px_1fr] items-center gap-2">{f}: <TextInput /></label>)}</div><h3 className="mt-4 font-bold">Safety Issues</h3><div className="flex gap-4"><label><input type="checkbox" /> None</label><label><input type="checkbox" /> Suicidal Ideation</label><label><input type="checkbox" /> Homicidal Ideation</label><TextInput placeholder="other safety issue" className="flex-1" /></div>{["Background Information", "Medications", "Diagnosis"].map(s => <div key={s} className="mt-4"><h3 className="font-bold">{s}</h3><textarea className="mt-2 h-16 w-full rounded border p-2" /></div>)}<div className="mt-5"><GreenButton onClick={() => alert("Note saved.")}>Save Draft</GreenButton></div></div></Panel>;
}

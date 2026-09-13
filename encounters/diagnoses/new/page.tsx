import { redirect } from "next/navigation";

export default function NewDiagnosisRedirectPage() {
  redirect("/encounters");
}

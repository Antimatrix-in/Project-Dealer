import { redirect } from "next/navigation";
import { GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function ProjectEnquiryPage() {
  // Directly redirect any direct navigations to the official Upwork Project Center Google Enquiry Form
  redirect(GOOGLE_ENQUIRY_FORM_URL);
}

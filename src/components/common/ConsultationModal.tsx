"use client";

import { GOOGLE_ENQUIRY_FORM_URL, getWhatsAppUrl } from "@/lib/whatsapp";

interface ConsultationEventDetail {
  projectTitle?: string;
  category?: string;
  serviceTitle?: string;
  requirement?: string;
  source?: string;
}

/**
 * Direct navigation handler: replaces modal popups with direct WhatsApp or Google Form navigation.
 */
export function openConsultationModal(details?: ConsultationEventDetail) {
  if (typeof window !== "undefined") {
    // If the action is for custom requirements, direct to official Google Form in a new tab
    if (
      details?.requirement ||
      details?.source === "Custom Requirement" ||
      (details?.serviceTitle && details.serviceTitle.toLowerCase().includes("requirement"))
    ) {
      window.open(GOOGLE_ENQUIRY_FORM_URL, "_blank", "noopener,noreferrer");
      return;
    }

    // Consultation & Service enquiries direct to official WhatsApp
    const url = getWhatsAppUrl({
      category: details?.category || details?.serviceTitle,
      requirements: details?.serviceTitle
        ? `Inquiry regarding ${details.serviceTitle} service`
        : "Project Consultation Inquiry",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default function ConsultationModal() {
  return null;
}

export const WHATSAPP_NUMBER = "919159514326";
export const WHATSAPP_DISPLAY = "+91 91595 14326";
export const WHATSAPP_BASE_URL = "https://wa.me/919159514326";
export const CONTACT_EMAIL = "projects@antimatrix.co.in";
export const CONTACT_EMAIL_MAILTO = "mailto:projects@antimatrix.co.in";
export const CONTACT_LOCATION = "Chennai, Tamil Nadu";
export const CONTACT_ADDRESS = "Chennai, Tamil Nadu";
export const GOOGLE_ENQUIRY_FORM_URL =
  process.env.NEXT_PUBLIC_GOOGLE_ENQUIRY_FORM_URL ||
  "https://forms.gle/oKyzxdmdVZLwWWmU6";

export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/anti-matrix/";
export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/antimatrix_in/";
export const INSTAGRAM_DISPLAY_NAME = "ANTI_MATRIX";

interface WhatsAppMessageParams {
  category?: string;
  projectTitle?: string;
  college?: string;
  department?: string;
  requirements?: string;
}

export function buildWhatsAppMessage(params?: WhatsAppMessageParams): string {
  const category = params?.category || "";
  const title = params?.projectTitle || "";
  const college = params?.college || "";
  const department = params?.department || "";
  const requirements = params?.requirements || "";

  return (
    `Hello AntiMatrix Team,\n\n` +
    `I am interested in your project services.\n\n` +
    `Project Category: ${category}\n` +
    `Project Title: ${title}\n` +
    `College: ${college}\n` +
    `Department: ${department}\n` +
    `Requirements: ${requirements}\n\n` +
    `Please provide more details.\n\n` +
    `Thank you.`
  );
}

export function getWhatsAppUrl(params?: WhatsAppMessageParams): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(params?: WhatsAppMessageParams): void {
  if (typeof window !== "undefined") {
    const url = getWhatsAppUrl(params);
    window.open(url, "_blank");
  }
}

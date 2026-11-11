import { shopConfig } from "@/lib/config";

const { phone, supportEmail, whatsapp } = shopConfig.brand;

export function getWhatsAppUrl(message?: string): string | null {
  if (!whatsapp) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsapp}${query}`;
}

export function getPhoneUrl(): string | null {
  return phone ? `tel:+${phone}` : null;
}

export function getEmailUrl(): string | null {
  return supportEmail ? `mailto:${supportEmail}` : null;
}

// Formats UAE E.164 digits for display: mobiles as +971 5X XXX XXXX, landlines as +971 X XXX XXXX.
export function formatPhoneNumber(digits: string): string {
  const match = /^971(5\d|\d)(\d{3})(\d{4})$/.exec(digits);
  return match ? `+971 ${match[1]} ${match[2]} ${match[3]}` : `+${digits}`;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppLink(formData: {
  name: string;
  phone: string;
  type: string;
  location: string;
  weight: string;
}) {
  const message = `Hi, I want to sell scrap.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nType: ${formData.type}\nLocation: ${formData.location}\nWeight: ${formData.weight}`;
  return `https://wa.me/919885263743?text=${encodeURIComponent(message)}`;
}

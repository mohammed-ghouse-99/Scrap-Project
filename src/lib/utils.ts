import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppLink(formData: {
  name: string;
  type: string;
  location: string;
  weight: string;
}) {
  const message = `Hi, I want to sell scrap.\n\nName: ${formData.name}\nType: ${formData.type}\nLocation: ${formData.location}\nWeight: ${formData.weight}`;
  return `https://wa.me/919550131958?text=${encodeURIComponent(message)}`;
}

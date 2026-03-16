import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi sakti untuk menggabungkan class tailwind dengan aman
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
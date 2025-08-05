// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // only if using Tailwind

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

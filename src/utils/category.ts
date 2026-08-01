import type { SapCategory } from "../types";

export const categoryLabels: Record<SapCategory, string> = {
  error: "Error",
  tcode: "Transaction Code",
  concept: "Concept",
};

/** Tailwind classes for category badges */
export const categoryStyles: Record<SapCategory, string> = {
  error: "bg-red-500/10 text-red-400 border border-red-500/20",
  tcode: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  concept: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

/** Heading shown for the details section */
export const detailsLabel: Record<SapCategory, string> = {
  error: "Common Causes",
  tcode: "Typical Use Cases",
  concept: "Key Points",
};

/** Heading shown for the actions section */
export const actionsLabel: Record<SapCategory, string> = {
  error: "Recommended Solutions",
  tcode: "Pro Tips",
  concept: "Related Topics",
};
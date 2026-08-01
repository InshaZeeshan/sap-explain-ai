import type { LucideIcon } from "lucide-react";

/**
 * The three kinds of SAP knowledge this app can explain.
 */
export type SapCategory = "error" | "tcode" | "concept";

/**
 * Represents one SAP error, transaction code, or concept.
 */
export interface SapKnowledgeItem {
  id: string;
  code: string;
  title: string;
  category: SapCategory;
  shortDescription: string;
  description: string;
  details: string[];
  actions: string[];
}

export interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PopularSearchItem {
  id: string;
  code: string;
  category: SapCategory;
  description: string;
}
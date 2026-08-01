import {
  Sparkles,
  AlertTriangle,
  TerminalSquare,
  BookOpen,
} from "lucide-react";

import type { FeatureItem } from "../types";

export const features: FeatureItem[] = [
  {
    id: "ai-explanations",
    icon: Sparkles,
    title: "AI Explanations",
    description:
      "Plain-language breakdowns of dense SAP documentation, generated on demand instead of buried in help portals.",
  },
  {
    id: "sap-errors",
    icon: AlertTriangle,
    title: "SAP Errors",
    description:
      "Understand runtime errors and short dumps fast — what caused them, and exactly how to resolve them.",
  },
  {
    id: "sap-transactions",
    icon: TerminalSquare,
    title: "SAP Transactions",
    description:
      "Look up any T-Code to see what it's for, when to use it, and practical tips from real troubleshooting.",
  },
  {
    id: "sap-concepts",
    icon: BookOpen,
    title: "SAP Concepts",
    description:
      "Core Basis and ABAP concepts like RFC and transport requests, explained the way you'd explain them to a teammate.",
  },
];
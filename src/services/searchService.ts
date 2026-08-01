import { knowledgeBase } from "../data/knowledgeBase";
import type { SapKnowledgeItem } from "../types";

/**
 * Searches our local SAP knowledge base.
 */
export function searchKnowledgeBase(
  query: string
): SapKnowledgeItem[] {

  const normalized = query.trim().toLowerCase();

  if (!normalized) return [];

  return knowledgeBase.filter(
    (item) =>
      item.code.toLowerCase().includes(normalized) ||
      item.title.toLowerCase().includes(normalized) ||
      item.shortDescription.toLowerCase().includes(normalized)
  );
}

/**
 * Finds one exact SAP item using its code.
 */
export function getKnowledgeItemByCode(
  code: string
): SapKnowledgeItem | undefined {

  return knowledgeBase.find(
    (item) =>
      item.code.toLowerCase() === code.toLowerCase()
  );
}
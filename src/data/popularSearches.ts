import { knowledgeBase } from "./knowledgeBase";
import type { PopularSearchItem } from "../types";

const POPULAR_CODES = [
  "OBJECTS_OBJREF_NOT_ASSIGNED",
  "CALL_FUNCTION_NOT_FOUND",
  "DBSQL_SQL_ERROR",
  "TSV_TNEW_PAGE_ALLOC_FAILED",
] as const;

/**
 * Creates the popular searches list using entries
 * already stored in our knowledge base.
 */
export const popularSearches: PopularSearchItem[] = POPULAR_CODES.map((code) => {
  const item = knowledgeBase.find((k) => k.code === code)!;

  return {
    id: item.id,
    code: item.code,
    category: item.category,
    description: item.shortDescription,
  };
});
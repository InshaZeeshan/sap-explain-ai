import { useMemo, useState } from "react";
import { searchKnowledgeBase } from "../services/searchService";
import type { SapKnowledgeItem } from "../types";

/**
 * Manages the text currently being typed into the search box.
 *
 * Search results are based only on initialQuery,
 * which represents the submitted search stored in the URL.
 */
export function useSearch(initialQuery = "") {
  // What the user is currently typing
  const [query, setQuery] = useState(initialQuery);

  // Only search using the submitted query
  const results: SapKnowledgeItem[] = useMemo(
    () => searchKnowledgeBase(initialQuery),
    [initialQuery]
  );

  return {
    query,
    setQuery,
    results,
  };
}
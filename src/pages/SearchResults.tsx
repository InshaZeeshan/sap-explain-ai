import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Container } from "../components/common/Container";
import { SearchBar } from "../components/search/SearchBar";
import { useSearch } from "../hooks/useSearch";
import {
  AIServiceError,
  explainWithAI,
} from "../services/aiService";

import {
  categoryLabels,
  categoryStyles,
  detailsLabel,
  actionsLabel,
} from "../utils/category";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  // The query that was actually submitted
  const initialQuery = searchParams.get("q") ?? "";

  // query = what is currently typed in the search box
  // results = results for the submitted initialQuery
  const { query, setQuery, results } = useSearch(initialQuery);

  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiErrorCode, setAiErrorCode] = useState<string | null>(null);

  /*
   * True only when the text currently in the search box
   * matches the query that was actually submitted.
   *
   * If the user starts editing the search box, old results
   * are hidden until they submit the new search.
   */
  const isSubmittedQuery =
    query.trim() === initialQuery.trim();

  const getAIExplanation = async (searchQuery: string) => {
    setIsLoading(true);
    setAiExplanation(null);
    setAiError(null);
    setAiErrorCode(null);

    try {
      const response = await explainWithAI(searchQuery);

      setAiExplanation(response.explanation);
    } catch (error) {
      console.error("AI explanation failed:", error);

      /*
       * The backend returned a known AI-related error.
       */
      if (error instanceof AIServiceError) {
        setAiErrorCode(error.code);
        setAiError(error.message);
      } else {
        /*
         * Unexpected frontend/network failure.
         */
        setAiErrorCode("UNKNOWN_ERROR");
        setAiError(
          "Unable to connect to the AI service. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  /*
   * Ask Gemini only when:
   * 1. A real query was submitted.
   * 2. The local knowledge base found nothing.
   */
  useEffect(() => {
    if (!initialQuery.trim()) {
      return;
    }

    if (results.length === 0) {
      getAIExplanation(initialQuery);
    }
  }, [initialQuery, results.length]);

  /*
   * Keep the search box synchronized with the URL
   * whenever a new search is submitted.
   */
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, setQuery]);

  const handleSubmit = (value: string) => {
    const trimmedValue = value.trim();

    setSearchParams(
      trimmedValue
        ? { q: trimmedValue }
        : {}
    );
  };

  return (
    <Container className="py-14">
      {/* Search Bar */}
      <div className="mx-auto max-w-2xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          size="lg"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">

        {/* Empty Search Box */}
        {query.trim().length === 0 && (
          <p className="text-center text-sm text-neutral-500">
            Search for an error code, T-Code, or SAP concept above.
          </p>
        )}

        {/* User is typing a new query */}
        {query.trim().length > 0 &&
          !isSubmittedQuery && (
            <p className="text-center text-sm text-neutral-500">
              Press Enter or click the arrow to search.
            </p>
          )}

        {/* AI Loading */}
        {isSubmittedQuery &&
          initialQuery.trim().length > 0 &&
          results.length === 0 &&
          isLoading && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-blue-400" />

              <p className="text-neutral-300">
                Generating AI explanation for{" "}
                <span className="font-medium text-neutral-100">
                  "{initialQuery}"
                </span>
                ...
              </p>

              <p className="text-sm text-neutral-500">
                SAP Explain AI is analyzing your query.
              </p>
            </div>
          )}

        {/* AI Explanation */}
        {isSubmittedQuery &&
          results.length === 0 &&
          !isLoading &&
          aiExplanation && (
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-blue-900/50 bg-neutral-900/60 p-6 sm:p-7"
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles
                  className="h-4 w-4 text-blue-400"
                  aria-hidden="true"
                />

                <span className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                  AI Generated
                </span>
              </div>

              <h2 className="text-xl font-semibold text-neutral-50">
                {initialQuery}
              </h2>

              {/* Gemini responses can contain Markdown */}
              <div className="mt-4 text-sm leading-7 text-neutral-300">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-4 last:mb-0">
                        {children}
                      </p>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold text-neutral-100">
                        {children}
                      </strong>
                    ),

                    h1: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-lg font-semibold text-neutral-50">
                        {children}
                      </h3>
                    ),

                    h2: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-lg font-semibold text-neutral-50">
                        {children}
                      </h3>
                    ),

                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-5 font-semibold text-neutral-100">
                        {children}
                      </h3>
                    ),

                    ul: ({ children }) => (
                      <ul className="mb-4 ml-5 list-disc space-y-2">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="mb-4 ml-5 list-decimal space-y-2">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="pl-1">
                        {children}
                      </li>
                    ),

                    code: ({ children }) => (
                      <code className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[13px] text-blue-300">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {aiExplanation}
                </ReactMarkdown>
              </div>

              <p className="mt-6 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
                AI-generated explanations may contain inaccuracies. Verify
                important SAP information before using it in a production
                system.
              </p>
            </motion.article>
          )}

        {/* Gemini Quota Exceeded */}
        {isSubmittedQuery &&
          results.length === 0 &&
          !isLoading &&
          aiError &&
          aiErrorCode === "AI_QUOTA_EXCEEDED" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-lg bg-amber-950/50 p-2">
                  <AlertTriangle
                    className="h-5 w-5 text-amber-400"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-amber-200">
                    AI request quota reached
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-neutral-300">
                    {aiError}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    This limitation affects Gemini-powered AI explanations
                    only. Searches available in the local SAP knowledge base
                    continue to work normally.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        {/* Other AI Errors */}
        {isSubmittedQuery &&
          results.length === 0 &&
          !isLoading &&
          aiError &&
          aiErrorCode !== "AI_QUOTA_EXCEEDED" && (
            <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6 text-center">
              <p className="text-sm font-medium text-red-300">
                AI service unavailable
              </p>

              <p className="mt-2 text-sm text-red-300/80">
                {aiError}
              </p>
            </div>
          )}

        {/* Local Search Results */}
        {isSubmittedQuery && (
          <div className="flex flex-col gap-5">
            {results.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7"
              >
                {/* Category Badge */}
                <span
                  className={`mb-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    categoryStyles[item.category]
                  }`}
                >
                  {categoryLabels[item.category]}
                </span>

                {/* Result Title */}
                <h2 className="text-xl font-semibold text-neutral-50">
                  {item.title}
                </h2>

                {/* Main Explanation */}
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>

                {/* Details and Actions */}
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {detailsLabel[item.category]}
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {item.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-sm leading-relaxed text-neutral-300"
                        >
                          <span className="mr-2 text-neutral-600">
                            —
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {actionsLabel[item.category]}
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {item.actions.map((action) => (
                        <li
                          key={action}
                          className="text-sm leading-relaxed text-neutral-300"
                        >
                          <span className="mr-2 text-neutral-600">
                            —
                          </span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default SearchResults;
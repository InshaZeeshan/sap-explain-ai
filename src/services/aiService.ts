interface ExplainResponse {
  success: boolean;
  query: string;
  explanation: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

/*
 * Custom error used when the backend cannot
 * generate an AI explanation.
 *
 * The error code allows the UI to distinguish
 * quota exhaustion from other AI service errors.
 */
export class AIServiceError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);

    this.name = "AIServiceError";
    this.code = code;
  }
}

/*
 * Backend base URL.
 *
 * During local development this is empty, so requests
 * continue to use /api/explain and the Vite proxy.
 *
 * In production, VITE_API_BASE_URL will point to the
 * deployed Render backend.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function explainWithAI(
  query: string
): Promise<ExplainResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/explain`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
      }),
    }
  );

  /*
   * If the backend returns an error, read the JSON
   * response so we can preserve the specific error
   * code and message.
   */
  if (!response.ok) {
    const data: ErrorResponse = await response.json();

    throw new AIServiceError(
      data.error ?? "AI_SERVICE_ERROR",
      data.message ?? "Unable to generate an AI explanation."
    );
  }

  const data: ExplainResponse = await response.json();

  return data;
}
interface ExplainResponse {
  success: boolean;
  query: string;
  explanation: string;
}

export async function explainWithAI(
  query: string
): Promise<ExplainResponse> {
  const response = await fetch("/api/explain", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get explanation from the backend.");
  }

  const data: ExplainResponse = await response.json();

  return data;
}
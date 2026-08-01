import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();

const PORT = process.env.PORT || 3001;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
 * Allows the backend to understand JSON
 * sent in HTTP request bodies.
 */
app.use(express.json());

/*
 * Health-check endpoint.
 * Used to confirm that the backend is running.
 */
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "SAP Explain AI backend is running",
  });
});

/*
 * Receives an SAP query from the client.
 *
 * If Gemini successfully generates an explanation,
 * the explanation is returned to the frontend.
 *
 * If Gemini's quota has been exhausted, the backend
 * returns a specific error so the frontend can explain
 * the limitation clearly to the user.
 */
app.post("/api/explain", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      success: false,
      error: "INVALID_QUERY",
      message: "A valid query is required.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `In one short sentence, explain this SAP term: ${query}`,
    });

    return res.json({
      success: true,
      query,
      explanation: response.text,
    });
  } catch (error: unknown) {
    console.error("Gemini request failed:", error);

    /*
     * The Google GenAI SDK exposes the HTTP status
     * on API errors. We safely inspect it here.
     */
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error
        ? (error as { status?: number }).status
        : undefined;

    /*
     * Gemini quota / rate limit exceeded.
     */
    if (status === 429) {
      return res.status(429).json({
        success: false,
        error: "AI_QUOTA_EXCEEDED",
        message:
          "The AI request quota has been reached. Local SAP searches are still available. Please try AI-generated searches again later.",
      });
    }

    /*
     * All other Gemini/API failures.
     */
    return res.status(500).json({
      success: false,
      error: "AI_SERVICE_ERROR",
      message:
        "The AI service is temporarily unavailable. Please try again later.",
    });
  }
});

/*
 * Confirm whether the Gemini API key exists.
 * Never print the actual API key.
 */
if (!process.env.GEMINI_API_KEY) {
  console.error("Gemini API key was not found.");
} else {
  console.log("Gemini API key loaded successfully.");
}

app.listen(PORT, () => {
  console.log(`SAP Explain AI backend running on port ${PORT}`);
});
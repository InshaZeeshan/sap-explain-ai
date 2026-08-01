import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
const app = express();

const PORT = 3001;
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
 * AI will be connected here later.
 */
app.post("/api/explain", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      error: "A valid query is required.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `In one short sentence, explain this SAP term: ${query}`,
    });

    res.json({
      success: true,
      query,
      explanation: response.text,
    });
  } catch (error) {
    console.error("Gemini request failed:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate an explanation.",
    });
  }
});
if (!process.env.GEMINI_API_KEY) {
  console.error("Gemini API key was not found.");
} else {
  console.log("Gemini API key loaded successfully.");
}
app.listen(PORT, () => {
  console.log(`SAP Explain AI backend running on port ${PORT}`);
});
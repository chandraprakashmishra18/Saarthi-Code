import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "SAARTHI Backend" });
  });

  // AI Anthology Curation Endpoint
  app.post("/api/ai/curate-anthology", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const ai = getAI();
      if (!ai) {
        // Fallback structured generation
        return res.json({
          title: `Anthology: ${prompt}`,
          subtitle: `Curated narrative of ${prompt}`,
          tagline: "Uncovering forgotten stepwells, folklore, and local artisan guilds."
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a cultural anthropologist and curator for SAARTHI, an Indian heritage travel app.
Create a title, subtitle, and a poetic 1-sentence tagline for a curated story anthology based on this traveler prompt: "${prompt}".
Respond strictly in valid JSON with keys: "title", "subtitle", "tagline".`
      });

      const text = response.text || "{}";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return res.json(parsed);
    } catch (err: any) {
      console.error("Gemini AI curation error:", err);
      return res.json({
        title: `Anthology of ${prompt}`,
        subtitle: "A bespoke narrative journey through Indian cultural folklore",
        tagline: "Connecting living folklore, local guilds, and sacred subterranean heritage."
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SAARTHI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

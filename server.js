import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("../public")); // folder frontend

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CATEGORIES = [
  { id: "tech", label: "Technology" },
  { id: "music", label: "Music" },
  { id: "sports", label: "Sports" },
  { id: "art", label: "Art & Culture" },
  { id: "food", label: "Food & Drink" },
  { id: "business", label: "Business" },
  { id: "health", label: "Health & Wellness" },
  { id: "education", label: "Education" },
  { id: "gaming", label: "Gaming" },
  { id: "networking", label: "Networking" },
  { id: "outdoor", label: "Outdoor & Adventure" },
  { id: "community", label: "Community" },
];

export const generateEventDetails = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found. Returning mock data.");
      // MOCK DATA for local testing without API key
      return {
        title: "AI Workshop: " + args.prompt.substring(0, 20),
        description: "A professional and engaging event generated based on your prompt: " + args.prompt,
        category: "tech",
        tags: ["ai", "digital", "workshop"],
        capacity: 50,
        locationType: "online",
        city: "San Francisco",
        ticketType: "free",
        isMock: true
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are an expert event planner assistant for "Patel & Co. Planner".
      Your task is to take a natural language event description and turn it into a structured JSON object.
      
      VALID CATEGORIES (Only use the ID):
      ${CATEGORIES.map(c => `- ${c.id}: ${c.label}`).join("\n")}
      
      RULES:
      1. Return ONLY a valid JSON object. No Markdown, no explanation.
      2. If location is mentioned, use it for 'city'.
      3. If price is mentioned, set 'ticketType' to 'paid' and 'ticketPrice' to the number.
      4. Suggest 3-5 relevant tags.
      5. The 'description' should be a professional, catchy expansion (at least 3-4 sentences) of the user's idea.
      6. For 'locationType', guess if it's 'physical' or 'online'. Default to 'physical'.
      7. For 'capacity', provide a reasonable estimate if not specified (e.g., 50, 100).
      
      SCHEMA:
      {
        "title": "catchy event title",
        "description": "expanded professional description",
        "category": "category-id",
        "tags": ["tag1", "tag2"],
        "capacity": 100,
        "locationType": "physical" | "online",
        "city": "city name",
        "ticketType": "free" | "paid",
        "ticketPrice": 500 (only if paid)
      }
    `;

    try {
      const result = await model.generateContent([systemPrompt, args.prompt]);
      const response = await result.response;
      let text = response.text();
      
      // Clean up text in case Gemini wraps it in markdown code blocks
      text = text.replace(/```json\n?/, "").replace(/```/, "").trim();
      
      const details = JSON.parse(text);
      return { ...details, isMock: false };
    } catch (error) {
      console.error("AI Generation failed:", error);
      throw new Error("Failed to generate event details: " + error.message);
    }
  },
});

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('[Gemini Formatter] Successfully initialized Gemini SDK.');
  } catch (err) {
    console.error('[Gemini Formatter] Failed to initialize Gemini model:', err.message);
  }
} else {
  console.log('[Gemini Formatter] GEMINI_API_KEY is missing. Operating in fallback template mode.');
}

/**
 * Sends a list of facts to Gemini for friendly rephrasing, adhering strictly to accuracy rules.
 * If Gemini is disabled or fails, returns the fallbackText.
 * 
 * @param {string} intent - The user command intent (e.g. status, usage, room-details)
 * @param {object} facts - The raw JSON facts fetched from the backend
 * @param {string} fallbackText - The pre-formatted clean markdown string to fall back on
 */
export async function formatWithGemini(intent, facts, fallbackText) {
  if (!model) {
    return fallbackText;
  }

  const prompt = `
You are a friendly smart-office energy assistant for the office named "WattWatch".
Your job is to take the raw technical facts below and rewrite them into a friendly, helpful, and concise Discord message.

USER COMMAND INTENT: ${intent}
RAW FACTS (JSON):
${JSON.stringify(facts, null, 2)}

CRITICAL ACCURACY RULES:
1. Do NOT invent, assume, or modify any numbers, room names, device counts, wattages, or alerts. All factual data must come directly from the JSON.
2. If there are active alerts, they must be clearly mentioned with their description. If the JSON shows no alerts, you must state that the office is operating normally.
3. Keep the response friendly, structured, and easy to read (use emojis and markdown list bullets where appropriate).
4. Keep the response under 1000 characters. Do not add conversational fluff at the end.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return text || fallbackText;
  } catch (err) {
    console.warn('[Gemini Formatter] API call failed. Falling back to default layout. Error:', err.message);
    return fallbackText;
  }
}

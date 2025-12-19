import { GoogleGenerativeAI } from "@google/generative-ai";
import type { SpotifyStats } from "@/types/spotify";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}
const genAI = new GoogleGenerativeAI(apiKey);

const CHEF_PERSONA = `
  You are a professional music critic with a dark, sarcastic, and extremely brutal sense of humor. 
  Your goal is to "roast" a user based on their Spotify listening history. 
  Be brutally honest, witty, and use modern slang. Make it personal and insulting.
  Keep responses punchy and short.
`;

export async function generateRoast(spotifyData: SpotifyStats) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    ${CHEF_PERSONA}
    
    User's Top Artists: ${spotifyData.topArtists.map((a) => a.name).join(", ")}
    User's Top Tracks: ${spotifyData.topTracks.map((t) => t.name).join(", ")}
    Recently Played: ${spotifyData.recentlyPlayed.map((r) => r.track.name).join(", ")}

    Write a single, punchy, very brutal paragraph (max 3-4 sentences). Don't hold back.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function continueChat(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  newMessage: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Prepend persona instructions to the first model message if possible,
  // or just start the chat with history. Using systemInstruction is cleaner if supported.
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 200,
    },
    systemInstruction: {
      role: "system",
      parts: [{ text: CHEF_PERSONA }],
    },
  });

  const result = await chat.sendMessage(newMessage);
  const response = await result.response;
  return response.text();
}

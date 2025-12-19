import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateRoast(spotifyData: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a professional music critic with a dark, sarcastic, and hilarious sense of humor. 
    Your goal is to "roast" a user based on their Spotify listening history. 
    Be brutally honest, witty, and use modern slang where appropriate. 
    Don't be mean-spirited, but definitely make them question their life choices.

    User's Top Artists: ${spotifyData.topArtists.map((a: any) => a.name).join(", ")}
    User's Top Tracks: ${spotifyData.topTracks.map((t: any) => t.name).join(", ")}
    Recently Played: ${spotifyData.recentlyPlayed.map((r: any) => r.track.name).join(", ")}

    Write a 3-paragraph roast. Keep it punchy and entertaining.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

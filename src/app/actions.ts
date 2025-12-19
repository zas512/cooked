"use server";
import { continueChat, generateRoast } from "@/lib/gemini";
import { getSpotifyData } from "@/lib/spotify";

export async function getCookedData(accessToken: string) {
  try {
    const spotifyData = await getSpotifyData(accessToken);
    if (!spotifyData) {
      throw new Error("Failed to fetch Spotify data");
    }
    const roast = await generateRoast(spotifyData);
    return { data: spotifyData, initialRoast: roast, error: null };
  } catch (error: unknown) {
    console.error("Error in getCookedData server action:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      data: null,
      initialRoast: "",
      error: message,
    };
  }
}

export async function chatResponse(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  newMessage: string
) {
  try {
    const response = await continueChat(history, newMessage);
    return { response, error: null };
  } catch (error: unknown) {
    console.error("Error in chatResponse server action:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { response: null, error: message };
  }
}

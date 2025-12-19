import type { SpotifyStats } from "@/types/spotify";

export async function getSpotifyData(
  accessToken: string
): Promise<SpotifyStats> {
  const fetchSpotify = async (endpoint: string) => {
    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error(`Spotify API error: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  };

  // Fetch long_term data (several years of history) as suggested by the user
  const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
    fetchSpotify("me/top/tracks?limit=20&time_range=long_term"),
    fetchSpotify("me/top/artists?limit=20&time_range=long_term"),
    fetchSpotify("me/player/recently-played?limit=10"),
  ]);

  return {
    topTracks: topTracks?.items || [],
    topArtists: topArtists?.items || [],
    recentlyPlayed: recentlyPlayed?.items || [],
  };
}

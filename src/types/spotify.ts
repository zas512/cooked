export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
}

export interface RecentlyPlayedItem {
  played_at: string;
  track: {
    name: string;
    artists: { name: string }[];
  };
}

export interface SpotifyStats {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  recentlyPlayed: RecentlyPlayedItem[];
}

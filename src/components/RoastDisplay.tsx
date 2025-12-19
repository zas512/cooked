"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, Music, User, History } from "lucide-react";

import type {
  SpotifyStats,
  SpotifyTrack,
  SpotifyArtist,
  RecentlyPlayedItem,
} from "@/types/spotify";

export function RoastDisplay({
  roast,
  data,
}: {
  roast: string;
  data: SpotifyStats;
}) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Roast Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <Flame className="w-8 h-8 fill-current" />
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            The Verdict
          </h2>
        </div>
        <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-foreground/90 whitespace-pre-wrap">
                "{roast}"
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Music Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Tracks */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Music className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">
              Top Anthems (Long Term)
            </h3>
          </div>
          <div className="space-y-2">
            {data.topTracks
              .slice(0, 5)
              .map((track: SpotifyTrack, i: number) => (
                <Card
                  key={track.id}
                  className="bg-card/50 border-border/50 hover:bg-accent/50 transition-colors cursor-default"
                >
                  <CardContent className="p-3 flex items-center gap-4">
                    <span className="text-muted-foreground font-mono w-4">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{track.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">
              Your Enablers
            </h3>
          </div>
          <div className="space-y-2">
            {data.topArtists
              .slice(0, 5)
              .map((artist: SpotifyArtist, i: number) => (
                <Card
                  key={artist.id}
                  className="bg-card/50 border-border/50 hover:bg-accent/50 transition-colors cursor-default"
                >
                  <CardContent className="p-3 flex items-center gap-4">
                    <span className="text-muted-foreground font-mono w-4">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{artist.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {artist.genres.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>

      {/* Recents */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <History className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-wider text-sm">
            Recent Questionable Choices
          </h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {data.recentlyPlayed.map((item: RecentlyPlayedItem) => (
            <Card
              key={item.played_at}
              className="min-w-[200px] bg-card/50 border-border/50"
            >
              <CardContent className="p-4 space-y-2">
                <p className="font-bold text-sm truncate">{item.track.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.track.artists[0].name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

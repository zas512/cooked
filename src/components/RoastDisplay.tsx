"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flame, Music, User, History, Send, Loader2 } from "lucide-react";
import { chatResponse } from "@/app/actions";
import type { Message } from "./DashboardContent";

import type {
  SpotifyStats,
  SpotifyTrack,
  SpotifyArtist,
  RecentlyPlayedItem,
} from "@/types/spotify";

export function RoastDisplay({
  messages,
  setMessages,
  data,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  data: SpotifyStats;
}) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg: Message = { role: "user", parts: [{ text: input.trim() }] };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      // Pass the current messages as history, and the new input as the new message
      const { response, error } = await chatResponse(messages, input.trim());
      if (error) throw new Error(error);
      if (response) {
        setMessages([
          ...newMessages,
          { role: "model", parts: [{ text: response }] },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Chat Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <Flame className="w-8 h-8 fill-current" />
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            The Verdict
          </h2>
        </div>

        <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm overflow-hidden flex flex-col h-[500px]">
          <CardContent
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar scroll-smooth"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm md:text-base ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted text-muted-foreground italic rounded-tl-none border border-border/50"
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-none px-4 py-2 border border-border/50">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </CardContent>

          <div className="p-4 border-t border-primary/20 bg-background/50">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                placeholder="Talk back if you dare..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
                className="bg-background/50 border-primary/20 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isSending || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </section>

      {/* Music Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Tracks */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Music className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">
              Top Anthems
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
                      <p className="font-bold truncate text-sm">{track.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">
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
                      <p className="font-bold truncate text-sm">
                        {artist.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">
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
            Recent Choices
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
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">
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

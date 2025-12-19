"use client";
import { getCookedData } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { RoastDisplay } from "@/components/RoastDisplay";
import { Flame } from "lucide-react";
import type { SpotifyStats } from "@/types/spotify";
import { useEffect, useState, useCallback } from "react";

export type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export function DashboardContent({ accessToken }: { accessToken: string }) {
  const [data, setData] = useState<SpotifyStats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data, initialRoast, error } = await getCookedData(accessToken);

      if (error) {
        setError(error);
        return;
      }

      setData(data);
      if (initialRoast) {
        setMessages([{ role: "model", parts: [{ text: initialRoast }] }]);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch data or generate roast. Check your API keys.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[80vh]">
        <div className="p-4 bg-destructive/10 rounded-full mb-4">
          <Flame className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <button
          type="button"
          onClick={() => globalThis.location.reload()}
          className="mt-6 text-primary hover:underline font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 pb-24">
      {data && (
        <RoastDisplay
          messages={messages}
          setMessages={setMessages}
          data={data}
        />
      )}
    </div>
  );
}

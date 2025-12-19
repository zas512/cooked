"use client";

import { useEffect, useState, useCallback } from "react";
import { getSpotifyData } from "@/lib/spotify";
import { generateRoast } from "@/lib/gemini";
import { RoastDisplay } from "@/components/RoastDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame } from "lucide-react";
import type { SpotifyStats } from "@/types/spotify";

export function DashboardContent({ accessToken }: { accessToken: string }) {
  const [data, setData] = useState<SpotifyStats | null>(null);
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const spotifyData = await getSpotifyData(accessToken);
      setData(spotifyData);
      const roastText = await generateRoast(spotifyData);
      setRoast(roastText);
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
      {data && <RoastDisplay roast={roast} data={data} />}
    </div>
  );
}

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Music2, LogOut } from "lucide-react";

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        variant="outline"
        onClick={() => signOut()}
        className="gap-2 border-primary/20 hover:bg-primary/10 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Disconnect Spotify
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
      onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
    >
      <Music2 className="w-5 h-5" />
      Connect your Spotify
    </Button>
  );
}

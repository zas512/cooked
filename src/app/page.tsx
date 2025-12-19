import { LoginButton } from "@/components/LoginButton";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-linear-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

      <div className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight">
          Cooked<span className="text-primary">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          Let Gemini AI brutally judge your digital existence.
          <br className="hidden md:block" />
          Spotify, social media, and toxic traits—no feelings spared.
        </p>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <LoginButton />
      </div>

      <p className="text-sm text-muted-foreground fixed bottom-8">
        We only look at your top tracks & artists. We don&apos;t save any data.
      </p>
    </main>
  );
}

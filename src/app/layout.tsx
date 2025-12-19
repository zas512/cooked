import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cooked | The Ultimate Personality Roaster",
  description:
    "Get your digital existence brutally roasted by Gemini AI. Connect your Spotify, social media, and more to see how 'cooked' you really are.",
  keywords: [
    "Roast",
    "AI",
    "Gemini",
    "Spotify",
    "Social Media",
    "Personality",
    "Music",
  ],
  authors: [{ name: "Cooked Team" }],
  openGraph: {
    title: "Cooked | The Ultimate Personality Roaster",
    description: "Connect your digital life and get roasted by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

# Cooked 🌶️ - The Ultimate Personality Roaster

**Cooked** is a web application that uses Gemini AI to brutally judge your digital existence. Connect your Spotify, social media, or just exist—and get a witty, sarcastic, and hilarious appraisal of your personality.

![Landing Page](public/screenshot.png)

## ✨ Features

- **Brutal AI Roasts**: Powered by Google Gemini 1.5 Flash.
- **Digital Analysis**: Pulls data from Spotify, social media, and more.
- **Sleek UI**: Modern, responsive design with dark mode and smooth animations.
- **Privacy Focused**: No data is stored; we only process your stats in real-time.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescript.org/)
- **AI**: [Google Gemini Pro API](https://aistudio.google.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Spotify Provider
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Prerequisites
- A Spotify account.
- A Google Cloud/AI Studio account (for Gemini API).

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

> [!NOTE]
> For local development with Spotify, ensure your Redirect URI in the Spotify Dashboard is set to `http://localhost:3000/api/auth/callback/spotify` (or `http://127.0.0.1:3000/...` if using the loopback IP).

### 3. Installation

```bash
npm install
npm run dev
```

## 📦 Deployment

The easiest way to deploy is via **[Vercel](https://vercel.com/)**.

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Update your Spotify Redirect URI to the production URL: `https://your-app.vercel.app/api/auth/callback/spotify`.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ and a lot of judgment.

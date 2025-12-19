# Setup Guide: Getting Your API Keys

## 1. Spotify Client ID & Secret
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Log in with your Spotify account.
3. Click **"Create app"**.
4. Fill in the details:
   - **App name**: Spotify Roast (or anything)
   - **App description**: Roasting my music taste.
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/spotify` (CRITICAL: must be exact!)
5. Agree to the terms and click **Save**.
6. On the app's settings/dashboard, you will see your **Client ID**.
7. Click **"View client secret"** to see your **Client Secret**.

## 2. Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Log in with your Google account.
3. Click **"Create API key"** (or use an existing one).
4. Copy the key.

## 3. NextAuth Secret
This can be any random string. You can generate a good one by running this in your terminal:
```powershell
[Convert]::ToBase64String((1..32 | % { [byte](get-random -min 0 -max 255) }))
```
Or just type `my_very_secret_key_123`.

## 4. Update .env.local
Create a file named `.env.local` in the root and paste these:
```env
SPOTIFY_CLIENT_ID=your_id_here
SPOTIFY_CLIENT_SECRET=your_secret_here
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_key
```

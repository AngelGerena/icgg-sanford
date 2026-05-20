# ICGG Fixed Build Notes

## What changed

- Rebuilt `public/admin.html` as a fresh premium Supabase-backed admin portal.
- Added `src/lib/supabase.ts` so the public site has one shared data reader.
- Updated `src/components/Hero.tsx` to load hero text, video mode, and slides from Supabase with safe fallbacks.
- Updated `src/components/Events.tsx` to load live events from Supabase with safe fallbacks.
- Added `netlify.toml` so `/admin` and `/admin.html` work on Netlify.
- Removed the real Resend key from `.env`; keep secrets in Supabase/Netlify settings.

## First setup

1. In Supabase, create or invite admin users under Authentication.
2. Open `/admin` on the deployed site and sign in.
3. Go to `Setup SQL`, copy the SQL, and run it once in Supabase SQL Editor.
4. Make sure the `media` storage bucket exists and is public. The SQL attempts to create it.
5. In Netlify, set these environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Upload to GitHub

Upload the source files, not the old built `dist` folder. Do not upload nested project export archives from `public`.

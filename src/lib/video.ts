/**
 * Shared video helpers for the sermon library and the podcast.
 *
 * Both surfaces accept whatever URL the media team pastes from YouTube or
 * Facebook, so the parsing lives in one place. If a URL is neither, the player
 * falls back to opening the original link rather than showing a broken frame.
 */

export type Embed = { type: 'youtube' | 'facebook' | 'link'; src: string };

export function toEmbedUrl(url: string): Embed {
  const u = url.trim();

  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1` };

  if (/facebook\.com|fb\.watch/.test(u)) {
    return {
      type: 'facebook',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u)}&show_text=false&autoplay=true`,
    };
  }

  return { type: 'link', src: u };
}

/** Date-only values are stored without a timezone; pin them to local midnight. */
export function fmtDate(d: string | null, isSpanish: boolean): string {
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat(isSpanish ? 'es' : 'en', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(d + 'T00:00:00'));
  } catch {
    return d;
  }
}

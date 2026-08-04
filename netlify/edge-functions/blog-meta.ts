/**
 * Per-post link preview tags for /blog/:slug
 *
 * WhatsApp, Facebook, iMessage and X build their preview cards by fetching the
 * URL with a crawler that does NOT run JavaScript. A Vite single-page app
 * serves the same index.html for every route, so without this every shared
 * article would show identical, generic preview text.
 *
 * This edge function intercepts /blog/:slug, looks the post up in Supabase,
 * and rewrites the <head> tags in the HTML response before it reaches the
 * crawler. Real visitors get the same HTML and React takes over as normal.
 */

const SUPABASE_URL =
  Deno.env.get('VITE_SUPABASE_URL') ??
  Deno.env.get('SUPABASE_URL') ??
  'https://zyvfvjrhnuwapfwipukd.supabase.co';

const SUPABASE_ANON =
  Deno.env.get('VITE_SUPABASE_ANON_KEY') ??
  Deno.env.get('SUPABASE_ANON_KEY') ??
  '';

const SITE_NAME = 'Iglesia Cristiana Gracia y Gloria';
const FALLBACK_IMAGE = '/og-image.jpg';

function escapeAttr(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(s: string, n: number): string {
  const clean = (s || '').replace(/\s+/g, ' ').trim();
  return clean.length > n ? clean.slice(0, n - 1).trimEnd() + '…' : clean;
}

export default async function handler(request: Request, context: any) {
  const response = await context.next();

  // Only touch HTML documents.
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/blog\/([^/?#]+)\/?$/);
  if (!match) return response;

  const slug = decodeURIComponent(match[1]);

  let post: any = null;
  try {
    const q =
      `${SUPABASE_URL}/rest/v1/blog_posts` +
      `?slug=eq.${encodeURIComponent(slug)}` +
      `&status=eq.published` +
      `&select=title_es,title_en,excerpt_es,excerpt_en,meta_title_es,meta_title_en,meta_description_es,meta_description_en,cover_url,published_at,author` +
      `&limit=1`;

    const res = await fetch(q, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    });
    if (res.ok) {
      const rows = await res.json();
      post = Array.isArray(rows) && rows.length ? rows[0] : null;
    }
  } catch {
    // Lookup failed — fall through and serve the page untouched rather than
    // breaking the request over a preview card.
  }

  if (!post) return response;

  const title = truncate(post.meta_title_es || post.title_es || 'Blog', 70);
  const description = truncate(
    post.meta_description_es || post.excerpt_es || '',
    200
  );
  const image = post.cover_url
    ? post.cover_url
    : `${url.origin}${FALLBACK_IMAGE}`;
  const canonical = `${url.origin}/blog/${slug}`;

  const tags = `
    <title>${escapeAttr(title)} - ${SITE_NAME}</title>
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta name="description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta property="og:image:alt" content="${escapeAttr(title)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:locale" content="es_US" />
    ${post.published_at ? `<meta property="article:published_time" content="${escapeAttr(post.published_at)}" />` : ''}
    ${post.author ? `<meta property="article:author" content="${escapeAttr(post.author)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
  `.trim();

  let html = await response.text();

  // Drop the shell's own title and any competing og:/twitter:/description tags,
  // otherwise crawlers may read the generic ones that appear first.
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');

  html = html.replace(/<head([^>]*)>/i, `<head$1>\n${tags}\n`);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    headers,
  });
}

export const config = { path: '/blog/*' };

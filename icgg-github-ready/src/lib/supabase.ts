const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type QueryOptions = {
  order?: string;
  limit?: number;
  select?: string;
  filters?: Record<string, string | number | boolean>;
};

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function buildUrl(table: string, options: QueryOptions = {}) {
  if (!SUPABASE_URL) throw new Error('Supabase URL is not configured.');

  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set('select', options.select || '*');

  if (options.order) url.searchParams.set('order', options.order);
  if (options.limit) url.searchParams.set('limit', String(options.limit));

  Object.entries(options.filters || {}).forEach(([key, value]) => {
    url.searchParams.set(key, `eq.${value}`);
  });

  return url.toString();
}

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  if (!SUPABASE_ANON_KEY) throw new Error('Supabase anon key is not configured.');

  const response = await fetch(url, {
    ...init,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) return null as T;
  return response.json() as Promise<T>;
}

export async function getRows<T>(table: string, options?: QueryOptions): Promise<T[]> {
  if (!isSupabaseConfigured) return [];
  return request<T[]>(buildUrl(table, options));
}

export async function getSingleRow<T>(table: string, options?: QueryOptions): Promise<T | null> {
  const rows = await getRows<T>(table, { ...options, limit: 1 });
  return rows[0] || null;
}


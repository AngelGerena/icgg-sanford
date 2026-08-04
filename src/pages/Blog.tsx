import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { supabase } from '../lib/supabase';
import { stripMarkdown } from '../lib/markdown';

interface PostCard {
  id: string;
  slug: string;
  title_es: string;
  title_en: string | null;
  excerpt_es: string | null;
  excerpt_en: string | null;
  body_es: string | null;
  body_en: string | null;
  cover_url: string | null;
  scripture_ref: string | null;
  reading_minutes: number | null;
  featured: boolean;
  published_at: string | null;
}

const Blog = () => {
  const { isSpanish } = useLanguage();
  usePageMeta(
    isSpanish
      ? 'Blog - Iglesia Cristiana Gracia y Gloria'
      : 'Blog - Iglesia Cristiana Gracia y Gloria',
    isSpanish
      ? 'Reflexiones, enseñanza y aliento desde Iglesia Cristiana Gracia y Gloria en Sanford, FL.'
      : 'Reflections, teaching and encouragement from Iglesia Cristiana Gracia y Gloria in Sanford, FL.'
  );

  const [posts, setPosts] = useState<PostCard[] | null>(null);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id, slug, title_es, title_en, excerpt_es, excerpt_en, body_es, body_en, cover_url, scripture_ref, reading_minutes, featured, published_at')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false })
      .then(({ data }) => setPosts((data as PostCard[]) ?? []));
  }, []);

  const title = (p: PostCard) => (isSpanish ? p.title_es : p.title_en || p.title_es);
  const excerpt = (p: PostCard) =>
    (isSpanish ? p.excerpt_es : p.excerpt_en) ||
    stripMarkdown(isSpanish ? p.body_es : p.body_en, 150);

  const dateLabel = (iso: string | null) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(isSpanish ? 'es-US' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="icgg-page">
      <PageHeader
        title="Blog"
        subtitle={isSpanish ? 'Palabra, aliento y vida de iglesia' : 'Word, encouragement and church life'}
      />

      <section className="icgg-blog-section">
        <div className="icgg-blog-inner">
          {posts === null ? (
            <div className="icgg-blog-loading">{isSpanish ? 'Cargando…' : 'Loading…'}</div>
          ) : posts.length === 0 ? (
            <div className="icgg-blog-empty">
              <p>
                {isSpanish
                  ? 'Todavía no hay entradas publicadas. Vuelve pronto.'
                  : 'No posts published yet. Check back soon.'}
              </p>
            </div>
          ) : (
            <div className="icgg-blog-grid">
              {posts.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="icgg-blog-card">
                  {p.cover_url ? (
                    <div className="icgg-blog-cover" style={{ backgroundImage: `url('${p.cover_url}')` }} />
                  ) : (
                    <div className="icgg-blog-cover icgg-blog-cover-empty" />
                  )}
                  <div className="icgg-blog-card-body">
                    {p.featured && (
                      <span className="icgg-blog-badge">
                        {isSpanish ? 'Destacada' : 'Featured'}
                      </span>
                    )}
                    <h3 className="icgg-blog-card-title">{title(p)}</h3>
                    {p.scripture_ref && <div className="icgg-blog-verse">{p.scripture_ref}</div>}
                    <p className="icgg-blog-card-ex">{excerpt(p)}</p>
                    <div className="icgg-blog-meta">
                      {dateLabel(p.published_at)}
                      {p.reading_minutes
                        ? ` · ${p.reading_minutes} ${isSpanish ? 'min de lectura' : 'min read'}`
                        : ''}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;

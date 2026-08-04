import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { supabase } from '../lib/supabase';
import { renderMarkdown, stripMarkdown } from '../lib/markdown';
import ShareRow from '../components/ShareRow';

interface Post {
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
  scripture_text_es: string | null;
  scripture_text_en: string | null;
  author: string | null;
  reading_minutes: number | null;
  meta_title_es: string | null;
  meta_title_en: string | null;
  meta_description_es: string | null;
  meta_description_en: string | null;
  published_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isSpanish } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
      .then(({ data }) => {
        if (!data) { setMissing(true); return; }
        setPost(data as Post);
      });
  }, [slug]);

  const title = post ? (isSpanish ? post.title_es : post.title_en || post.title_es) : '';
  const body = post ? (isSpanish ? post.body_es : post.body_en || post.body_es) : '';
  const excerpt = post
    ? (isSpanish ? post.excerpt_es : post.excerpt_en) || stripMarkdown(body, 160)
    : '';
  const verseText = post ? (isSpanish ? post.scripture_text_es : post.scripture_text_en) : '';

  usePageMeta(
    post
      ? `${(isSpanish ? post.meta_title_es : post.meta_title_en) || title} - Iglesia Cristiana Gracia y Gloria`
      : (isSpanish ? 'Contra la Corriente - Iglesia Cristiana Gracia y Gloria' : 'Against the Current - Iglesia Cristiana Gracia y Gloria'),
    post ? (isSpanish ? post.meta_description_es : post.meta_description_en) || excerpt : undefined
  );

  const dateLabel = (iso: string | null) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(isSpanish ? 'es-US' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (missing) {
    return (
      <div className="icgg-page">
        <section className="icgg-blog-section">
          <div className="icgg-article">
            <h1 className="icgg-article-title">
              {isSpanish ? 'No encontramos esa entrada' : 'We could not find that post'}
            </h1>
            <p className="icgg-article-lead">
              {isSpanish
                ? 'Puede que se haya movido o que ya no esté publicada.'
                : 'It may have moved, or it is no longer published.'}
            </p>
            <Link to="/blog" className="icgg-article-back">
              <ArrowLeft size={16} />
              {isSpanish ? 'Volver a Contra la Corriente' : 'Back to Against the Current'}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="icgg-page">
        <section className="icgg-blog-section">
          <div className="icgg-blog-loading">{isSpanish ? 'Cargando…' : 'Loading…'}</div>
        </section>
      </div>
    );
  }

  return (
    <div className="icgg-page">
      <article className="icgg-blog-section">
        <div className="icgg-article">
          <Link to="/blog" className="icgg-article-back">
            <ArrowLeft size={16} />
            {isSpanish ? 'Contra la Corriente' : 'Against the Current'}
          </Link>

          <h1 className="icgg-article-title">{title}</h1>

          <div className="icgg-article-meta">
            {post.author}
            {post.published_at ? ` · ${dateLabel(post.published_at)}` : ''}
            {post.reading_minutes
              ? ` · ${post.reading_minutes} ${isSpanish ? 'min de lectura' : 'min read'}`
              : ''}
          </div>

          {post.cover_url && (
            <img className="icgg-article-cover" src={post.cover_url} alt={title} loading="eager" />
          )}

          {post.scripture_ref && (
            <div className="icgg-article-verse">
              {verseText && <p className="icgg-article-verse-text">{verseText}</p>}
              <span className="icgg-article-verse-ref">{post.scripture_ref}</span>
            </div>
          )}

          <div
            className="icgg-article-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
          />

          <ShareRow title={title} excerpt={excerpt} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;

import { useEffect, useState } from 'react';
import { Play, Calendar, Clock, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface Sermon {
  id: string;
  title_es: string;
  title_en: string | null;
  series: string | null;
  verse: string | null;
  speaker: string | null;
  preached_on: string | null;
  minutes: number | null;
  video_url: string | null;
  status: string;
}

/** Turn a YouTube or Facebook watch URL into an embeddable player URL. */
function toEmbedUrl(url: string): { type: 'youtube' | 'facebook' | 'link'; src: string } {
  const u = url.trim();
  // YouTube: youtu.be/ID , youtube.com/watch?v=ID , youtube.com/live/ID
  const yt =
    u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]{11})/);
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` };
  // Facebook video/watch links → use FB video plugin
  if (/facebook\.com/.test(u)) {
    return {
      type: 'facebook',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u)}&show_text=false`,
    };
  }
  return { type: 'link', src: u };
}

function fmtDate(d: string | null, isSpanish: boolean): string {
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat(isSpanish ? 'es' : 'en', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(d + 'T00:00:00'));
  } catch {
    return d;
  }
}

const SermonsFeed = () => {
  const { isSpanish } = useLanguage();
  const [sermons, setSermons] = useState<Sermon[] | null>(null);
  const [active, setActive] = useState<Sermon | null>(null);

  useEffect(() => {
    supabase
      .from('sermons')
      .select('*')
      .eq('status', 'published')
      .order('preached_on', { ascending: false })
      .then(({ data }) => {
        const rows = (data as Sermon[]) ?? [];
        setSermons(rows);
        // Auto-select the most recent sermon with a video for the feature player
        const firstWithVideo = rows.find((s) => s.video_url);
        setActive(firstWithVideo ?? rows[0] ?? null);
      });
  }, []);

  if (sermons === null) {
    return (
      <div className="icgg-sermons-loading">
        <div className="icgg-sermons-spinner" />
      </div>
    );
  }

  if (sermons.length === 0) {
    return (
      <div className="icgg-sermons-empty">
        <BookOpen />
        <h3>{isSpanish ? 'Predicaciones en camino' : 'Sermons coming soon'}</h3>
        <p>
          {isSpanish
            ? 'Pronto compartiremos aquí las predicaciones de nuestros servicios. Vuelve pronto.'
            : "We'll be sharing messages from our services here soon. Check back shortly."}
        </p>
      </div>
    );
  }

  const title = (s: Sermon) => (isSpanish ? s.title_es : s.title_en || s.title_es);

  return (
    <div className="icgg-sermons">
      {/* Feature player */}
      {active && (
        <div className="icgg-sermon-feature">
          <div className="icgg-sermon-player">
            {active.video_url ? (
              (() => {
                const e = toEmbedUrl(active.video_url);
                if (e.type === 'link') {
                  return (
                    <a className="icgg-sermon-playlink" href={e.src} target="_blank" rel="noopener noreferrer">
                      <Play />
                      <span>{isSpanish ? 'Ver predicación' : 'Watch sermon'}</span>
                    </a>
                  );
                }
                return (
                  <iframe
                    key={active.id}
                    src={e.src}
                    title={title(active)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                );
              })()
            ) : (
              <div className="icgg-sermon-novideo">
                <BookOpen />
                <span>{isSpanish ? 'Video no disponible' : 'Video unavailable'}</span>
              </div>
            )}
          </div>
          <div className="icgg-sermon-featuremeta">
            {active.series && <span className="icgg-sermon-series">{active.series}</span>}
            <h2>{title(active)}</h2>
            <div className="icgg-sermon-details">
              {active.speaker && <span>{active.speaker}</span>}
              {active.preached_on && (
                <span><Calendar /> {fmtDate(active.preached_on, isSpanish)}</span>
              )}
              {active.minutes ? <span><Clock /> {active.minutes} min</span> : null}
            </div>
            {active.verse && (
              <p className="icgg-sermon-verse"><BookOpen /> {active.verse}</p>
            )}
          </div>
        </div>
      )}

      {/* List of the rest */}
      {sermons.length > 1 && (
        <div className="icgg-sermon-list">
          <h3 className="icgg-sermon-listhead">
            {isSpanish ? 'Todas las predicaciones' : 'All sermons'}
          </h3>
          <div className="icgg-sermon-grid">
            {sermons.map((s) => (
              <button
                key={s.id}
                className={`icgg-sermon-card ${active?.id === s.id ? 'is-active' : ''}`}
                onClick={() => { setActive(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <div className="icgg-sermon-cardplay"><Play /></div>
                <div className="icgg-sermon-cardbody">
                  {s.series && <span className="icgg-sermon-cardseries">{s.series}</span>}
                  <h4>{title(s)}</h4>
                  <div className="icgg-sermon-carddate">
                    {s.preached_on && fmtDate(s.preached_on, isSpanish)}
                    {s.minutes ? ` · ${s.minutes} min` : ''}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SermonsFeed;

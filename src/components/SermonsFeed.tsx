import { useEffect, useState } from 'react';
import { Play, Calendar, Clock, BookOpen, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { toEmbedUrl, fmtDate } from '../lib/video';

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
  cover_url: string | null;
  status: string;
}

const SermonsFeed = () => {
  const { isSpanish } = useLanguage();
  const [sermons, setSermons] = useState<Sermon[] | null>(null);
  const [playing, setPlaying] = useState<Sermon | null>(null);

  useEffect(() => {
    supabase
      .from('sermons')
      .select('*')
      .eq('status', 'published')
      .order('preached_on', { ascending: false })
      .then(({ data }) => setSermons((data as Sermon[]) ?? []));
  }, []);

  // Lock body scroll when the player modal is open
  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [playing]);

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
  const featured = sermons[0];
  const rest = sermons.slice(1);

  // Group the rest by series (like albums). Sermons with no series go under "Mensajes".
  const groups: { name: string; items: Sermon[] }[] = [];
  const noSeriesLabel = isSpanish ? 'Mensajes' : 'Messages';
  for (const s of rest) {
    const key = s.series || noSeriesLabel;
    let g = groups.find((x) => x.name === key);
    if (!g) { g = { name: key, items: [] }; groups.push(g); }
    g.items.push(s);
  }

  const CoverArt = ({ s, size }: { s: Sermon; size: 'lg' | 'md' }) => (
    <div className={`icgg-cover icgg-cover-${size}`}>
      {s.cover_url ? (
        <img src={s.cover_url} alt={title(s)} loading="lazy" />
      ) : (
        <div className="icgg-cover-fallback">
          <BookOpen />
          {s.series && <span>{s.series}</span>}
        </div>
      )}
      <div className="icgg-cover-play"><Play /></div>
    </div>
  );

  return (
    <div className="icgg-sermons">
      {/* Featured / latest message */}
      <div className="icgg-sermon-featured">
        <button className="icgg-sermon-featured-art" onClick={() => featured.video_url && setPlaying(featured)}>
          <CoverArt s={featured} size="lg" />
        </button>
        <div className="icgg-sermon-featured-meta">
          <span className="icgg-sermon-eyebrow">
            {isSpanish ? 'Último mensaje' : 'Latest message'}
          </span>
          {featured.series && <span className="icgg-sermon-series">{featured.series}</span>}
          <h2>{title(featured)}</h2>
          {featured.verse && (
            <p className="icgg-sermon-verse"><BookOpen /> {featured.verse}</p>
          )}
          <div className="icgg-sermon-details">
            {featured.speaker && <span>{featured.speaker}</span>}
            {featured.preached_on && <span><Calendar /> {fmtDate(featured.preached_on, isSpanish)}</span>}
            {featured.minutes ? <span><Clock /> {featured.minutes} min</span> : null}
          </div>
          {featured.video_url && (
            <button className="icgg-sermon-playbtn" onClick={() => setPlaying(featured)}>
              <Play /> {isSpanish ? 'Reproducir' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {/* Library, grouped by series like albums */}
      {groups.map((g) => (
        <div key={g.name} className="icgg-sermon-group">
          <h3 className="icgg-sermon-grouphead">{g.name}</h3>
          <div className="icgg-sermon-shelf">
            {g.items.map((s) => (
              <button
                key={s.id}
                className="icgg-sermon-tile"
                onClick={() => s.video_url && setPlaying(s)}
              >
                <CoverArt s={s} size="md" />
                <div className="icgg-sermon-tile-title">{title(s)}</div>
                <div className="icgg-sermon-tile-sub">
                  {s.preached_on && fmtDate(s.preached_on, isSpanish)}
                  {s.minutes ? ` · ${s.minutes} min` : ''}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Player modal */}
      {playing && playing.video_url && (
        <div className="icgg-player-overlay" onClick={() => setPlaying(null)}>
          <div className="icgg-player-box" onClick={(e) => e.stopPropagation()}>
            <button className="icgg-player-close" onClick={() => setPlaying(null)} aria-label="Close">
              <X />
            </button>
            <div className="icgg-player-frame">
              {(() => {
                const e = toEmbedUrl(playing.video_url);
                if (e.type === 'link') {
                  return (
                    <a className="icgg-player-link" href={e.src} target="_blank" rel="noopener noreferrer">
                      <Play /> {isSpanish ? 'Ver en el sitio original' : 'Watch on source site'}
                    </a>
                  );
                }
                return (
                  <iframe
                    src={e.src}
                    title={title(playing)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                );
              })()}
            </div>
            <div className="icgg-player-meta">
              {playing.series && <span className="icgg-sermon-series">{playing.series}</span>}
              <h3>{title(playing)}</h3>
              <div className="icgg-sermon-details">
                {playing.speaker && <span>{playing.speaker}</span>}
                {playing.preached_on && <span><Calendar /> {fmtDate(playing.preached_on, isSpanish)}</span>}
                {playing.minutes ? <span><Clock /> {playing.minutes} min</span> : null}
              </div>
              {playing.verse && <p className="icgg-sermon-verse"><BookOpen /> {playing.verse}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SermonsFeed;

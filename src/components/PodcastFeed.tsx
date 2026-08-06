import { useEffect, useState } from 'react';
import { Play, Calendar, Clock, Mic, User, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { toEmbedUrl, fmtDate } from '../lib/video';

interface Episode {
  id: string;
  episode_no: number | null;
  sort_order: number | null;
  title_es: string;
  title_en: string | null;
  description_es: string | null;
  description_en: string | null;
  guest: string | null;
  host: string | null;
  published_on: string | null;
  minutes: number | null;
  video_url: string | null;
  cover_url: string | null;
  status: string;
}

const PodcastFeed = () => {
  const { isSpanish } = useLanguage();
  const [eps, setEps] = useState<Episode[] | null>(null);
  const [playing, setPlaying] = useState<Episode | null>(null);

  useEffect(() => {
    supabase
      .from('podcast_episodes')
      .select('*')
      .eq('status', 'published')
      // The running order is set by hand in the portal; date is only a tiebreak.
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => setEps((data as Episode[]) ?? []));
  }, []);

  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [playing]);

  if (eps === null) {
    return <div className="icgg-sermons-loading"><div className="icgg-sermons-spinner" /></div>;
  }

  if (eps.length === 0) {
    return (
      <div className="icgg-sermons-empty">
        <Mic />
        <h3>{isSpanish ? 'Episodios en camino' : 'Episodes coming soon'}</h3>
        <p>
          {isSpanish
            ? 'Pronto publicaremos aquí los episodios del podcast. Vuelve pronto.'
            : 'We will be publishing podcast episodes here soon. Check back shortly.'}
        </p>
      </div>
    );
  }

  const title = (e: Episode) => (isSpanish ? e.title_es : e.title_en || e.title_es);
  const desc = (e: Episode) => (isSpanish ? e.description_es : e.description_en || e.description_es);
  const epLabel = (e: Episode) =>
    e.episode_no ? `${isSpanish ? 'Episodio' : 'Episode'} ${e.episode_no}` : null;

  const featured = eps[0];
  const rest = eps.slice(1);

  const CoverArt = ({ e, size }: { e: Episode; size: 'lg' | 'md' }) => (
    <div className={`icgg-cover icgg-cover-${size}`}>
      {e.cover_url ? (
        <img src={e.cover_url} alt={title(e)} loading="lazy" />
      ) : (
        <div className="icgg-cover-fallback">
          <Mic />
          {epLabel(e) && <span>{epLabel(e)}</span>}
        </div>
      )}
      <div className="icgg-cover-play"><Play /></div>
    </div>
  );

  return (
    <div className="icgg-sermons">
      <div className="icgg-sermon-featured">
        <button className="icgg-sermon-featured-art" onClick={() => featured.video_url && setPlaying(featured)}>
          <CoverArt e={featured} size="lg" />
        </button>
        <div className="icgg-sermon-featured-meta">
          <span className="icgg-sermon-eyebrow">
            {isSpanish ? 'Último episodio' : 'Latest episode'}
          </span>
          {epLabel(featured) && <span className="icgg-sermon-series">{epLabel(featured)}</span>}
          <h2>{title(featured)}</h2>
          {desc(featured) && <p className="icgg-podcast-desc">{desc(featured)}</p>}
          <div className="icgg-sermon-details">
            {featured.host && <span>{featured.host}</span>}
            {featured.guest && <span><User /> {featured.guest}</span>}
            {featured.published_on && <span><Calendar /> {fmtDate(featured.published_on, isSpanish)}</span>}
            {featured.minutes ? <span><Clock /> {featured.minutes} min</span> : null}
          </div>
          {featured.video_url && (
            <button className="icgg-sermon-playbtn" onClick={() => setPlaying(featured)}>
              <Play /> {isSpanish ? 'Reproducir' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="icgg-sermon-group">
          <h3 className="icgg-sermon-grouphead">
            {isSpanish ? 'Todos los episodios' : 'All episodes'}
          </h3>
          <div className="icgg-sermon-shelf">
            {rest.map((e) => (
              <button key={e.id} className="icgg-sermon-tile" onClick={() => e.video_url && setPlaying(e)}>
                <CoverArt e={e} size="md" />
                <div className="icgg-sermon-tile-title">{title(e)}</div>
                <div className="icgg-sermon-tile-sub">
                  {epLabel(e) ? `${epLabel(e)}` : ''}
                  {epLabel(e) && e.published_on ? ' · ' : ''}
                  {e.published_on && fmtDate(e.published_on, isSpanish)}
                  {e.minutes ? ` · ${e.minutes} min` : ''}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {playing && playing.video_url && (
        <div className="icgg-player-overlay" onClick={() => setPlaying(null)}>
          <div className="icgg-player-box" onClick={(ev) => ev.stopPropagation()}>
            <button className="icgg-player-close" onClick={() => setPlaying(null)} aria-label="Close">
              <X />
            </button>
            <div className="icgg-player-frame">
              {(() => {
                const em = toEmbedUrl(playing.video_url);
                if (em.type === 'link') {
                  return (
                    <a className="icgg-player-link" href={em.src} target="_blank" rel="noopener noreferrer">
                      <Play /> {isSpanish ? 'Ver en el sitio original' : 'Watch on source site'}
                    </a>
                  );
                }
                return (
                  <iframe
                    src={em.src}
                    title={title(playing)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                );
              })()}
            </div>
            <div className="icgg-player-meta">
              {epLabel(playing) && <span className="icgg-sermon-series">{epLabel(playing)}</span>}
              <h3>{title(playing)}</h3>
              <div className="icgg-sermon-details">
                {playing.host && <span>{playing.host}</span>}
                {playing.guest && <span><User /> {playing.guest}</span>}
                {playing.published_on && <span><Calendar /> {fmtDate(playing.published_on, isSpanish)}</span>}
                {playing.minutes ? <span><Clock /> {playing.minutes} min</span> : null}
              </div>
              {desc(playing) && <p className="icgg-podcast-desc">{desc(playing)}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastFeed;

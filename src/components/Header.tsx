import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { isLiveNow } from '../lib/liveSchedule';

const LOGO_SRC = '/icgg-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerGroup, setDrawerGroup] = useState<string | null>(null);
  const [live, setLive] = useState(() => isLiveNow());

  useEffect(() => {
    const tick = () => setLive(isLiveNow());
    const id = setInterval(tick, 60_000);
    const onFocus = () => tick();
    window.addEventListener('focus', onFocus);
    return () => { clearInterval(id); window.removeEventListener('focus', onFocus); };
  }, []);
  const { isSpanish, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Home hero is full-bleed, so nav starts transparent there.
  // On inner pages there is no hero behind the nav, so keep it solid.
  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome;

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenGroup(null);
    setDrawerGroup(null);
  };

  const nosotros = [
    { to: '/nosotros', label: t('nav.about') },
    { to: '/ministerios', label: t('nav.ministries') },
    { to: '/ministerios#clase-pastorales', label: isSpanish ? 'Clase Pastorales' : 'Pastoral Classes' },
    { to: '/ministerios#aviva-kids', label: 'Aviva Kids' },
    { to: '/conectate#prayer', label: isSpanish ? 'Oración' : 'Prayer' }
  ];

  const conectate = [
    { to: '/conectate#newcomers', label: isSpanish ? 'Soy Nuevo' : 'Im New' },
    { to: '/eventos', label: t('nav.events') },
    { to: '/conectate#contact', label: t('nav.contact') },
    { to: '/conectate#prayer', label: isSpanish ? 'Peticiones de Oración' : 'Prayer Requests' }
  ];

  return (
    <header className={`icgg-nav ${solid ? 'icgg-nav-scrolled' : ''}`}>
      <div className="icgg-nav-inner">
        <Link to="/" className="icgg-nav-brand" onClick={closeAll}>
          <img src={LOGO_SRC} alt="I.C.G.G." className="icgg-nav-logo" />
          <span className="icgg-nav-brandtext">
            <span className="icgg-nav-brandmark">I.C.G.G.</span>
            <span className="icgg-nav-brandsub">Gracia y Gloria</span>
          </span>
        </Link>

        <nav className="icgg-nav-links">
          <Link to="/" className="icgg-nav-link" onClick={closeAll}>{t('nav.home')}</Link>

          <div
            className="icgg-nav-group"
            onMouseEnter={() => setOpenGroup('nosotros')}
            onMouseLeave={() => setOpenGroup(null)}
          >
            <button className="icgg-nav-link icgg-nav-trigger" type="button">
              {isSpanish ? 'Nosotros' : 'About'}
              <ChevronDown className="icgg-nav-caret" />
            </button>
            <div className={`icgg-nav-dropdown ${openGroup === 'nosotros' ? 'is-open' : ''}`}>
              {nosotros.map((item, i) => (
                <Link key={i} to={item.to} className="icgg-nav-dropitem" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/en-vivo"
            className={`icgg-nav-live ${live ? 'is-live' : ''}`}
            onClick={closeAll}
          >
            <span className="icgg-nav-livedot" aria-hidden="true" />
            <span>{t('nav.live')}</span>
            {live && <span className="sr-only">{isSpanish ? ' — transmitiendo ahora' : ' — streaming now'}</span>}
          </Link>
          <Link to="/predicaciones" className="icgg-nav-link" onClick={closeAll}>{isSpanish ? 'Predicaciones' : 'Sermons'}</Link>
          <Link to="/blog" className="icgg-nav-link" onClick={closeAll}>{isSpanish ? 'Contra la Corriente' : 'Against the Current'}</Link>

          <div
            className="icgg-nav-group"
            onMouseEnter={() => setOpenGroup('conectate')}
            onMouseLeave={() => setOpenGroup(null)}
          >
            <button className="icgg-nav-link icgg-nav-trigger" type="button">
              {isSpanish ? 'Conéctate' : 'Connect'}
              <ChevronDown className="icgg-nav-caret" />
            </button>
            <div className={`icgg-nav-dropdown ${openGroup === 'conectate' ? 'is-open' : ''}`}>
              {conectate.map((item, i) => (
                <Link key={i} to={item.to} className="icgg-nav-dropitem" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="icgg-nav-actions">
          <button
            onClick={toggleLanguage}
            className="icgg-nav-lang"
            title={isSpanish ? 'Switch to English' : 'Cambiar a Espanol'}
            type="button"
          >
            <Languages className="icgg-nav-langicon" />
            <span>{isSpanish ? 'EN' : 'ES'}</span>
          </button>

          <Link to="/dar" className="icgg-nav-give" onClick={closeAll}>
            {t('nav.giving')}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="icgg-nav-burger"
            aria-label="Menu"
            type="button"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`icgg-nav-drawer ${isMenuOpen ? 'is-open' : ''}`}>
        <Link to="/" className="icgg-nav-drawerlink" onClick={closeAll}>{t('nav.home')}</Link>
        <button
          type="button"
          className={`icgg-nav-drawerlink icgg-nav-drawertoggle ${drawerGroup === 'nosotros' ? 'is-open' : ''}`}
          aria-expanded={drawerGroup === 'nosotros'}
          onClick={() => setDrawerGroup(g => (g === 'nosotros' ? null : 'nosotros'))}
        >
          {t('nav.about')}
          <ChevronDown className="icgg-nav-drawerchev" />
        </button>
        {drawerGroup === 'nosotros' && (
          <div className="icgg-nav-drawersub">
            {nosotros.map((item, i) => (
              <Link key={i} to={item.to} className="icgg-nav-drawersublink" onClick={closeAll}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
        <Link
          to="/en-vivo"
          className={`icgg-nav-drawerlink icgg-nav-drawerlive ${live ? 'is-live' : ''}`}
          onClick={closeAll}
        >
          <span className="icgg-nav-livepill">
            <span className="icgg-nav-livedot" aria-hidden="true" />
            <span>{t('nav.live')}</span>
          </span>
          {live && (
            <span className="icgg-nav-livenow">
              {isSpanish ? 'Transmitiendo ahora' : 'Streaming now'}
            </span>
          )}
        </Link>
        <Link to="/predicaciones" className="icgg-nav-drawerlink" onClick={closeAll}>{isSpanish ? 'Predicaciones' : 'Sermons'}</Link>
        <Link to="/blog" className="icgg-nav-drawerlink" onClick={closeAll}>{isSpanish ? 'Contra la Corriente' : 'Against the Current'}</Link>

        {/* Conéctate mirrors the desktop dropdown: tapping it expands the same
            four destinations rather than jumping straight to the page. */}
        <button
          type="button"
          className={`icgg-nav-drawerlink icgg-nav-drawertoggle ${drawerGroup === 'conectate' ? 'is-open' : ''}`}
          aria-expanded={drawerGroup === 'conectate'}
          onClick={() => setDrawerGroup(g => (g === 'conectate' ? null : 'conectate'))}
        >
          {isSpanish ? 'Conéctate' : 'Connect'}
          <ChevronDown className="icgg-nav-drawerchev" />
        </button>
        {drawerGroup === 'conectate' && (
          <div className="icgg-nav-drawersub">
            {conectate.map((item, i) => (
              <Link key={i} to={item.to} className="icgg-nav-drawersublink" onClick={closeAll}>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <Link to="/dar" className="icgg-nav-drawerlink icgg-nav-drawergive" onClick={closeAll}>{t('nav.giving')}</Link>
        <button
          onClick={() => { toggleLanguage(); }}
          className="icgg-nav-drawerlink icgg-nav-drawerlang"
          type="button"
        >
          <Languages className="h-4 w-4" />
          {isSpanish ? 'Switch to English' : 'Cambiar a Español'}
        </button>
      </div>
    </header>
  );
};

export default Header;

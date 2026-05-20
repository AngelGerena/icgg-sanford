import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getRows, getSingleRow } from '../lib/supabase';

type HeroConfig = {
  title?: string;
  subtitle?: string;
  welcome?: string;
  btn1_label?: string;
  btn2_label?: string;
  video_url?: string | null;
  mode?: string | null;
};

type HeroSlide = {
  image_url: string;
  sort_order?: number;
  is_active?: boolean;
};

const fallbackHero: Required<Omit<HeroConfig, 'video_url' | 'mode'>> = {
  title: 'I.C.G.G.',
  subtitle: 'Iglesia Cristiana Gracia y Gloria Sanford',
  welcome: 'Bienvenidos a nuestra familia de fe',
  btn1_label: 'Unete a Nosotros',
  btn2_label: 'Nuestros Servicios',
};

const fallbackSlides = [
  'https://www.dropbox.com/scl/fi/9eaccjgyv8twr0dly12nz/mobile-hero2.jpg?rlkey=erb1bi52pq3xos8z8754yw5oz&st=smnf3h4a&raw=1',
  'https://www.dropbox.com/scl/fi/bjp3ifh6opjn0ug5nfg62/Hero-1.jpg?rlkey=ou63aqgvc47228zv4izc0d3xn&st=q05gq7ol&raw=1',
];

const Hero = () => {
  const { t } = useLanguage();
  const [hero, setHero] = useState<HeroConfig>(fallbackHero);
  const [slides, setSlides] = useState<string[]>(fallbackSlides);

  useEffect(() => {
    let cancelled = false;

    async function loadHero() {
      try {
        const [config, rows] = await Promise.all([
          getSingleRow<HeroConfig>('hero_config', { order: 'updated_at.desc' }),
          getRows<HeroSlide>('hero_slides', {
            order: 'sort_order.asc',
            filters: { is_active: true },
          }),
        ]);

        if (cancelled) return;
        if (config) setHero({ ...fallbackHero, ...config });

        const liveSlides = rows.map((slide) => slide.image_url).filter(Boolean);
        if (liveSlides.length) setSlides(liveSlides);
      } catch (error) {
        console.warn('Using fallback hero content:', error);
      }
    }

    loadHero();
    return () => {
      cancelled = true;
    };
  }, []);

  const backgroundStyle = useMemo(() => {
    const desktop = slides[1] || slides[0] || fallbackSlides[1];
    return {
      backgroundImage: `linear-gradient(to right, rgba(30, 58, 138, 0.8), rgba(30, 64, 175, 0.7), rgba(59, 130, 246, 0.6)), url("${desktop}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }, [slides]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {hero.mode === 'video' && hero.video_url ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.video_url}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}

      <div
        className="absolute inset-0 hero-bg-mobile md:hero-bg-desktop"
        style={backgroundStyle}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {hero.title || t('hero.title')}
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-blue-100 mb-6">
            {hero.subtitle || t('hero.subtitle')}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
        </div>

        <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
          {hero.welcome || t('hero.welcome')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#live" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {hero.btn1_label || t('hero.joinUs')}
          </a>
          <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-block">
            {hero.btn2_label || t('hero.viewServices')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{backgroundColor: 'transparent !important'}}>
        <ChevronDown className="h-8 w-8 text-white opacity-75" />
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const STATIC_SLIDES = [
  {
    desktop: 'https://www.dropbox.com/scl/fi/bjp3ifh6opjn0ug5nfg62/Hero-1.jpg?rlkey=ou63aqgvc47228zv4izc0d3xn&st=q05gq7ol&raw=1',
    mobile: 'https://www.dropbox.com/scl/fi/9eaccjgyv8twr0dly12nz/mobile-hero2.jpg?rlkey=erb1bi52pq3xos8z8754yw5oz&st=smnf3h4a&raw=1'
  },
  {
    desktop: 'https://www.dropbox.com/scl/fi/nx2yvtadqibyn0ui7ldn1/ICGG-23-of-133.jpg?rlkey=lqvr296qej8eqvqyepl9u77lr&st=y6g398tu&raw=1',
    mobile: 'https://www.dropbox.com/scl/fi/nx2yvtadqibyn0ui7ldn1/ICGG-23-of-133.jpg?rlkey=lqvr296qej8eqvqyepl9u77lr&st=y6g398tu&raw=1'
  },
  {
    desktop: 'https://www.dropbox.com/scl/fi/gbb3lkzcqrn7pwz424ryo/ICCG-11-19-53-of-135.jpg?rlkey=5mr4eaq0w91l9odc1cwt5trpy&st=45emqolf&raw=1',
    mobile: 'https://www.dropbox.com/scl/fi/gbb3lkzcqrn7pwz424ryo/ICCG-11-19-53-of-135.jpg?rlkey=5mr4eaq0w91l9odc1cwt5trpy&st=45emqolf&raw=1'
  },
  {
    desktop: 'https://www.dropbox.com/scl/fi/9muoo0s2b2d63f977iea5/FM-1-23-of-38.jpg?rlkey=hezm4qm3ah87atez9fxttty9j&st=mnud5zzd&raw=1',
    mobile: 'https://www.dropbox.com/scl/fi/9muoo0s2b2d63f977iea5/FM-1-23-of-38.jpg?rlkey=hezm4qm3ah87atez9fxttty9j&st=mnud5zzd&raw=1'
  }
];

const DEFAULT_OVERLAY = 'linear-gradient(to right, rgba(30, 58, 138, 0.8), rgba(30, 64, 175, 0.7), rgba(59, 130, 246, 0.6))';

interface HeroSlide { desktop: string; mobile: string; }

const Hero = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroSlide[]>(STATIC_SLIDES);
  const [videoMode, setVideoMode] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [overlay, setOverlay] = useState(DEFAULT_OVERLAY);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const { data: slidesData } = await supabase
          .from('hero_slides')
          .select('image_url')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (slidesData && slidesData.length > 0) {
          setHeroImages(slidesData.map((s: { image_url: string }) => ({
            desktop: s.image_url,
            mobile: s.image_url
          })));
        }

        const { data: configData } = await supabase
          .from('hero_config')
          .select('mode, video_url, overlay')
          .limit(1)
          .maybeSingle();

        if (configData) {
          if (configData.mode === 'video' && configData.video_url) {
            setVideoMode(true);
            setVideoUrl(configData.video_url);
          }
          if (configData.overlay) {
            setOverlay(`linear-gradient(to right, ${configData.overlay})`);
          }
        }
      } catch {
        // Fall back to static data silently
      }
    }
    fetchHeroData();
  }, []);

  useEffect(() => {
    if (videoMode) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length, videoMode]);

  if (videoMode && videoUrl) {
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {isYouTube || isVimeo ? (
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1`}
              className="absolute inset-0 w-full h-full"
              style={{ transform: 'scale(1.5)', border: 'none' }}
              allow="autoplay; fullscreen"
              title="Hero video"
            />
          ) : (
            <video src={videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0" style={{ background: overlay }} />
        </div>
        <HeroContent t={t} />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white opacity-75" />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `${overlay}, url('${image.desktop}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      <HeroContent t={t} />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ backgroundColor: 'transparent' }}>
        <ChevronDown className="h-8 w-8 text-white opacity-75" />
      </div>
    </section>
  );
};

const HeroContent = ({ t }: { t: (key: string) => string }) => (
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <div className="mb-8 animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight animate-slide-up">
        {t('hero.title')}
      </h1>
      <h2 className="text-2xl md:text-4xl font-light text-blue-100 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        Iglesia Cristiana Gracia y Gloria Sanford
      </h2>
      <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}></div>
    </div>
    <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light animate-fade-in" style={{ animationDelay: '0.6s' }}>
      {t('hero.welcome')}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <a href="#live" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
        {t('hero.joinUs')}
      </a>
      <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-block hover:shadow-2xl">
        {t('hero.viewServices')}
      </a>
    </div>
  </div>
);

export default Hero;

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const STATIC_SLIDES = [
  {
    desktop: '/hero-worship-flag.jpg',
    mobile: '/hero-worship-flag.jpg'
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
    desktop: '/hero-pentecostes.jpg',
    mobile: '/hero-pentecostes.jpg'
  },
  {
    desktop: '/hero-congregation.jpg',
    mobile: '/hero-congregation.jpg'
  }
];

const DEFAULT_OVERLAY = 'linear-gradient(to right, rgba(30, 58, 138, 0.8), rgba(30, 64, 175, 0.7), rgba(59, 130, 246, 0.6))';

interface HeroSlide { desktop: string; mobile: string; }

const Hero = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % STATIC_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {STATIC_SLIDES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `${DEFAULT_OVERLAY}, url('${image.desktop}')`,
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

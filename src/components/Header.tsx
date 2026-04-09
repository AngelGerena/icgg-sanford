import React, { useState } from 'react';
import { Menu, X, Languages, Home, Info, HandHeart, GraduationCap, Radio, Clock, Users, Calendar, Mail, DollarSign, Baby, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSpanish, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm shadow-lg z-50 w-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.9)', maxWidth: '100vw'}}>
      <div className="container mx-auto px-4 py-4" style={{maxWidth: '100%'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://www.dropbox.com/scl/fi/vr5ltn3xwe9w2sqvdxxm6/ICGG-Logo.png?rlkey=gnrzkj7bfnp5mfcgkb7bshime&st=0tcedtd4&raw=1"
              alt="I.C.G.G. Logo"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">I.C.G.G.</h1>
              <p className="text-sm text-gray-300">Iglesia Cristiana Gracia y Gloria</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3">
            <a href="#home" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Home className="h-4 w-4" />
              <span>{t('nav.home')}</span>
            </a>
            <a href="#about" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Info className="h-4 w-4" />
              <span>{t('nav.about')}</span>
            </a>
            <a href="#newcomers" className="flex items-center space-x-1.5 text-green-400 hover:text-green-300 transition-colors font-medium">
              <UserPlus className="h-4 w-4" />
              <span>{t('nav.newcomers')}</span>
            </a>
            <a href="#prayer" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <HandHeart className="h-4 w-4" />
              <span>Oración</span>
            </a>
            <a href="#clase-pastorales" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <GraduationCap className="h-4 w-4" />
              <span>Clase Pastorales</span>
            </a>
            <a href="#aviva-kids" className="flex items-center space-x-1.5 text-pink-400 hover:text-pink-300 transition-colors font-medium">
              <Baby className="h-4 w-4" />
              <span>Aviva Kids</span>
            </a>
            <a href="#livestream" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Radio className="h-4 w-4" />
              <span>{t('nav.live')}</span>
            </a>
            <a href="#services" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Clock className="h-4 w-4" />
              <span>{t('nav.services')}</span>
            </a>
            <a href="#ministries" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Users className="h-4 w-4" />
              <span>{t('nav.ministries')}</span>
            </a>
            <a href="#calendario-eventos" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Calendar className="h-4 w-4" />
              <span>{t('nav.events')}</span>
            </a>
            <a href="#contact" className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium">
              <Mail className="h-4 w-4" />
              <span>{t('nav.contact')}</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 text-gray-300 hover:text-amber-400 transition-colors font-medium p-2 rounded-lg hover:bg-white/10"
              title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm">{isSpanish ? 'EN' : 'ES'}</span>
            </button>
            <a href="#giving" className="flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              <DollarSign className="h-4 w-4" />
              <span>{t('nav.giving')}</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-700 z-50 pb-safe">
          <div className="grid grid-cols-5 gap-1 px-2 py-3">
            <a
              href="#home"
              className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">{t('nav.home')}</span>
            </a>
            <a
              href="#livestream"
              className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <Radio className="h-5 w-5" />
              <span className="text-xs">{t('nav.live')}</span>
            </a>
            <a
              href="#giving"
              className="flex flex-col items-center justify-center space-y-1 text-orange-500 hover:text-orange-400 transition-colors"
            >
              <div className="bg-orange-600 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">{t('nav.giving')}</span>
            </a>
            <a
              href="#calendario-eventos"
              className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">{t('nav.events')}</span>
            </a>
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs">Más</span>
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-gray-600">
            <div className="flex flex-col space-y-4">
              <a
                href="#about"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span>{t('nav.about')}</span>
              </a>
              <a
                href="#newcomers"
                className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="h-5 w-5" />
                <span>{t('nav.newcomers')}</span>
              </a>
              <a
                href="#prayer"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <HandHeart className="h-5 w-5" />
                <span>Oración</span>
              </a>
              <a
                href="#clase-pastorales"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-5 w-5" />
                <span>Clase Pastorales</span>
              </a>
              <a
                href="#aviva-kids"
                className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Baby className="h-5 w-5" />
                <span>Aviva Kids</span>
              </a>
              <a
                href="#services"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Clock className="h-5 w-5" />
                <span>{t('nav.services')}</span>
              </a>
              <a
                href="#ministries"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>{t('nav.ministries')}</span>
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="h-5 w-5" />
                <span>{t('nav.contact')}</span>
              </a>
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium p-2 rounded-lg hover:bg-white/10"
              >
                <Languages className="h-5 w-5" />
                <span>{isSpanish ? 'Switch to English' : 'Cambiar a Español'}</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
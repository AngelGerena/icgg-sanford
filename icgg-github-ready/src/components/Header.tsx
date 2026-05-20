import React, { useState } from 'react';
import { Menu, X, Cross, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSpanish, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm shadow-lg z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
      <div className="container mx-auto px-4 py-4">
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
          <nav className="hidden lg:flex items-center space-x-4">
            <a href="#home" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.home')}
            </a>
            <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.about')}
            </a>
            <a href="#prayer" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Oración
            </a>
            <a href="#clase-pastorales" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Clase Pastorales
            </a>
            <a href="#live" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.live')}
            </a>
            <a href="#services" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.services')}
            </a>
            <a href="#ministries" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.ministries')}
            </a>
            <a href="#calendar" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.events')}
            </a>
            <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              {t('nav.contact')}
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium p-2 rounded-lg hover:bg-white/10"
              title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm">{isSpanish ? 'EN' : 'ES'}</span>
            </button>
            <a href="#giving" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              {t('nav.giving')}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-gray-600">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              <a
                href="#prayer"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Oración
              </a>
              <a
                href="#clase-pastorales"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Clase Pastorales
              </a>
              <a
                href="#live"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.live')}
              </a>
              <a
                href="#services"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services')}
              </a>
              <a
                href="#ministries"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.ministries')}
              </a>
              <a
                href="#calendar"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.events')}
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors font-medium p-2 rounded-lg hover:bg-white/10"
              >
                <Languages className="h-4 w-4" />
                <span>{isSpanish ? 'Switch to English' : 'Cambiar a Español'}</span>
              </button>
            <a
              href="#giving"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.giving')}
            </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
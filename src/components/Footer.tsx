import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Cross, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16" style={{backgroundColor: '#111827', color: '#ffffff'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Church Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://www.dropbox.com/scl/fi/vr5ltn3xwe9w2sqvdxxm6/ICGG-Logo.png?rlkey=gnrzkj7bfnp5mfcgkb7bshime&st=ags8m25i&raw=1"
                alt="I.C.G.G. Logo"
                className="w-20 h-20 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">I.C.G.G.</h3>
                <p className="text-gray-300">Iglesia Cristiana Gracia y Gloria</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/irenegraciaygloria" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/icgg.sanford/" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@IglesiaGraciayGloria" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#prayer" className="text-gray-300 hover:text-white transition-colors">
                  Oración
                </a>
              </li>
              <li>
                <a href="#live" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.live')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.ministries')}
                </a>
              </li>
              <li>
                <a href="#calendario-eventos" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.events')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a href="#giving" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.giving')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-300">2560 S. Elm Ave.</p>
                  <p className="text-gray-300">Sanford, FL 32773</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <p className="text-gray-300">info@icgg.us</p>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="font-semibold mb-4 text-gray-200">{t('footer.serviceHours')}</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium">{t('footer.sunday')}</span> 10:00 AM - 12:00 PM</p>
                <p><span className="font-medium">{t('footer.thursday')}</span> 7:30 PM - 9:00 PM</p>
                <p><span className="font-medium">{t('footer.friday')}</span> 7:30 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-gray-400 text-center mb-4">
              {t('footer.copyright')}
            </p>
            <div className="flex justify-center md:justify-end space-x-6 mb-4 md:mb-0">
              <a 
                href="https://adorahub.bolt.host" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Adora Hub"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-500 text-sm text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:mt-8">
              {t('footer.designedBy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
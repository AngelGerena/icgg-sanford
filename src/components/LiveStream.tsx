import React, { useEffect } from 'react';
import { Radio, Calendar, Clock, Users, ArrowRight, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LiveStream = () => {
  const { t } = useLanguage();

  // Load Elfsight script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Load EmbedVid.io script dynamically
  useEffect(() => {
    const embedvidScript = document.createElement('script');
    embedvidScript.type = 'text/javascript';
    embedvidScript.id = 'embedvidio-9fe4eff8-41f9-4d54-aa6c-1d1d2f213aec-widget';
    embedvidScript.src = 'https://www.embedvid.io/embedjs/embedvidio.js';
    
    // Check if script already exists
    if (!document.getElementById('embedvidio-9fe4eff8-41f9-4d54-aa6c-1d1d2f213aec-widget')) {
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(embedvidScript, firstScript);
    }

    return () => {
      // Cleanup script if component unmounts
      const existingEmbedScript = document.getElementById('embedvidio-9fe4eff8-41f9-4d54-aa6c-1d1d2f213aec-widget');
      if (existingEmbedScript) {
        existingEmbedScript.parentNode?.removeChild(existingEmbedScript);
      }
    };
  }, []);

  return (
    <section id="live" className="py-20 bg-gray-50 scroll-mt-24" style={{backgroundColor: '#f9fafb'}}>
      <div className="container mx-auto px-4">
        {/* Radio App Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra Estación de Radio
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escucha música cristiana, predicaciones y programas especiales las 24 horas
          </p>
        </div>

        {/* Radio App Promotion Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative p-8 md:p-12 text-white text-center">
                {/* App Logo */}
                <div className="mb-6">
                  <img 
                    src="https://www.dropbox.com/scl/fi/f1we4ueekdp7cbgwgrtgn/af0942dd-0558-4f1f-8eb7-c89ecb509dd1.png.PNG?rlkey=37vc3nsjtb8mfpbeo05psy8cv&st=k5yu9h2v&raw=1"
                    alt="Reacción en Cadena TV Logo"
                    className="w-40 h-40 mx-auto object-contain drop-shadow-2xl bg-black rounded-2xl p-2"
                  />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Reacción en Cadena TV
                </h3>
                <p className="text-xl md:text-2xl font-light text-purple-100 mb-2">
                  Nuestra Estación de Radio
                </p>
                <p className="text-lg text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Escucha música cristiana, predicaciones y programas especiales las 24 horas. 
                  Descarga nuestra app gratuita y mantente conectado con contenido que edifica tu fe.
                </p>
                
                {/* Download Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* iOS Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                    <div className="mb-4">
                      <img 
                        src="https://www.dropbox.com/scl/fi/e2o6h3q11cb98dnti5uuj/Attachment-1.png?rlkey=brdxdju3hglyk0tdpnj1l5xex&st=udwo88sy&raw=1"
                        alt="iOS QR Code"
                        className="w-32 h-32 mx-auto rounded-xl shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Descargar para iOS</h4>
                    <p className="text-purple-200 text-sm mb-4">
                      Escanea el código QR o haz clic en el botón
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                      App Store
                    </a>
                  </div>
                  
                  {/* Android Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                    <div className="mb-4">
                      <img 
                        src="https://www.dropbox.com/scl/fi/74gy5d2l6mtnt97spe47z/Attachment-1-1.png?rlkey=2s3uqjmg2px80p88q34hawl1i&st=1x1c92u8&raw=1"
                        alt="Android QR Code"
                        className="w-32 h-32 mx-auto rounded-xl shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3">Descargar para Android</h4>
                    <p className="text-purple-200 text-sm mb-4">
                      Escanea el código QR o haz clic en el botón
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      Google Play
                    </a>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-purple-200 text-sm">
                    📱 Disponible para iOS y Android • 🎵 Música cristiana 24/7 • 📖 Predicaciones y estudios bíblicos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stream Section Header */}
        <div id="livestream" className="text-center mb-8 scroll-mt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('live.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('live.description')}
          </p>
        </div>

        {/* Live Stream Embed */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white">
              <div className="flex items-center justify-center space-x-3">
                <Radio className="h-6 w-6 text-red-400 animate-pulse" />
                <h3 className="text-2xl font-bold">{t('live.serviceTitle')}</h3>
              </div>
            </div>
            
            {/* Full Width EmbedVid.io Live Stream */}
            <div className="relative bg-gray-900 p-4">
              <div className="aspect-video overflow-hidden relative bg-gray-900 rounded-lg max-w-6xl mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    id="embedvidio-9fe4eff8-41f9-4d54-aa6c-1d1d2f213aec"
                    className="w-full h-full"
                    style={{ minHeight: '300px' }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Service Information */}
            <div className="bg-white p-8 text-center border-t border-gray-200">
              <div className="max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Únete a Nosotros</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Experimenta la adoración y la enseñanza bíblica en vivo desde la comodidad de tu hogar o únete a nosotros en persona.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-blue-700" />
                        <span className="font-semibold text-blue-900">Domingos</span>
                      </div>
                      <p className="text-blue-800 text-lg font-bold">10:00 AM</p>
                      <p className="text-blue-700 text-sm">Servicio Principal</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-amber-700" />
                        <span className="font-semibold text-amber-900">Jueves</span>
                      </div>
                      <p className="text-amber-800 text-lg font-bold">7:30 PM</p>
                      <p className="text-amber-700 text-sm">Estudio Bíblico</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Calendar Section */}
            <div id="calendar" className="mt-6 bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {t('events.calendarTitle')}
                </h2>
                <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600">{t('events.calendarDescription')}</p>
              </div>
              <div className="w-full">
                <div 
                  className="elfsight-app-2dde9675-3e45-4096-8bee-71440c06bbf4" 
                  data-elfsight-app-lazy
                  style={{ minHeight: '400px', width: '100%' }}
                ></div>
                <noscript>
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center text-gray-600">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="font-semibold">Calendar requires JavaScript</p>
                      <p className="text-sm">Please enable JavaScript to view our events calendar</p>
                    </div>
                  </div>
                </noscript>
              </div>
            </div>
              
            {/* Schedule Information */}
            <div className="m-6 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg p-6 text-white">
              <h4 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <Radio className="h-6 w-6 text-red-400 animate-pulse mr-2" />
                Horarios de Transmisión En Vivo
              </h4>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xl font-semibold">Domingos @ 10:00 AM</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xl font-semibold">Jueves @ 7:30 PM</span>
                </div>
              </div>
              
              {/* Live Stream Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.facebook.com/irenegraciaygloria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ 
                    backgroundColor: '#1877F2',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#166FE5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1877F2';
                  }}
                >
                  <Radio className="h-6 w-6 animate-pulse" />
                  <span>Ver En Vivo en Facebook</span>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Zb4fbOPN2pQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Radio className="h-6 w-6 animate-pulse" />
                  <span>Ver En Vivo en YouTube</span>
                </a>
              </div>
            </div>
            
            <div className="mx-6 mb-6 text-center">
              <p className="text-gray-600 mb-4">
                Cuando no estemos en vivo, visita nuestra página de Facebook
              </p>
              <a
                href="https://www.facebook.com/irenegraciaygloria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{ 
                  backgroundColor: '#1877F2',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#166FE5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1877F2';
                }}
              >
                <ThumbsUp className="h-6 w-6" />
                <span>Visita Nuestra Página de Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-700" />
                  <span className="text-lg font-semibold text-gray-800">10:00 AM</span>
                </div>
                <p className="text-gray-700">{t('live.mainService')}</p>
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <Radio className="h-4 w-4" />
                  <span>{t('live.liveLabel')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-semibold text-gray-800">7:30 PM</span>
                </div>
                <p className="text-gray-700">{t('live.bibleStudy')}</p>
                <p className="text-gray-700">{t('live.prayerPraise')}</p>
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <Radio className="h-4 w-4" />
                  <span>{t('live.liveLabel')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">{t('live.cantAttend')}</h3>
          <p className="text-xl mb-6 text-blue-100">
            {t('live.cantAttendDesc')}
          </p>
          <p className="text-blue-200 mb-4">
            {t('live.scheduleInfo')}
          </p>
          <p className="text-blue-200">
            Experimenta la adoración y la enseñanza desde la comodidad de tu hogar. Pero no dejes de congregarte, es muy importante que te congregues. (Heb. 10:25)
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;
import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Events = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: eventsRef, isVisible: eventsVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const events = [
    {
      titleKey: 'events.prayer',
      dateKey: 'events.everyWednesday',
      time: '8:30 AM',
      location: '2560 S. Elm Ave. Sanford, FL 32773',
      descriptionKey: 'events.prayerDesc',
      typeKey: 'events.weekly',
      image: 'https://www.dropbox.com/scl/fi/nx2yvtadqibyn0ui7ldn1/ICGG-23-of-133.jpg?rlkey=lqvr296qej8eqvqyepl9u77lr&st=y6g398tu&raw=1',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-700'
    },
    {
      titleKey: 'events.bibleStudyThursdays',
      dateKey: 'events.everyThursday',
      time: '7:30 PM',
      location: '2560 S. Elm Ave. Sanford, FL 32773',
      descriptionKey: 'events.bibleStudyDesc',
      typeKey: 'events.weekly',
      image: 'https://www.dropbox.com/scl/fi/gbb3lkzcqrn7pwz424ryo/ICCG-11-19-53-of-135.jpg?rlkey=5mr4eaq0w91l9odc1cwt5trpy&st=45emqolf&raw=1',
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-700'
    },
    {
      titleKey: 'events.sundayService',
      dateKey: 'events.everySunday',
      time: '10:00 AM',
      location: '2560 S. Elm Ave. Sanford, FL 32773',
      descriptionKey: 'events.sundayServiceDesc',
      typeKey: 'events.celebration',
      image: 'https://www.dropbox.com/scl/fi/9muoo0s2b2d63f977iea5/FM-1-23-of-38.jpg?rlkey=hezm4qm3ah87atez9fxttty9j&st=mnud5zzd&raw=1',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-700'
    }
  ];

  return (
    <section
      id="calendario-eventos"
      className="py-20 bg-white"
      style={{ backgroundColor: '#ffffff', scrollMarginTop: '100px' }}
    >
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('events.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('events.description')}
          </p>
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('events.calendarTitle')}
        </h3>

        <div ref={eventsRef} className="grid lg:grid-cols-2 gap-8 mb-16">
          {events.map((event, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden group hover:-translate-y-1 ${
                eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-20`}></div>
                <img
                  src={event.image}
                  alt={t(event.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gray-200 hidden items-center justify-center">
                  <div className="h-12 w-12 bg-gray-400 rounded"></div>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    t(event.typeKey) === t('events.special') ? 'bg-amber-500/90 text-white' :
                    t(event.typeKey) === t('events.celebration') ? 'bg-green-500/90 text-white' :
                    t(event.typeKey) === t('events.weekly') ? 'bg-blue-500/90 text-white' :
                    'bg-purple-500/90 text-white'
                  }`}>
                    {t(event.typeKey)}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {t(event.titleKey)}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className={`p-2 rounded-lg ${event.textColor} bg-current bg-opacity-10`}>
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{t(event.dateKey)}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className={`p-2 rounded-lg ${event.textColor} bg-current bg-opacity-10`}>
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-gray-600">
                    <div className={`p-2 rounded-lg ${event.textColor} bg-current bg-opacity-10`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-sm leading-relaxed">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{t(event.descriptionKey)}</p>

                <div className="flex items-center">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{t('events.allWelcome')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef}
          className={`text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white max-w-4xl mx-auto hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-bold mb-4">¿Quieres estar al día con nuestros eventos?</h3>
            <p className="text-xl text-blue-100 mb-6">
              Síguenos en Facebook y nunca te pierdas nuestras actividades especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/irenegraciaygloria"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center space-x-2"
              >
                <span>Seguir en Facebook</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
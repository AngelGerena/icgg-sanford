import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getRows } from '../lib/supabase';

type ChurchEvent = {
  id: string;
  title_es: string;
  title_en?: string;
  date?: string;
  date_label_es?: string;
  date_label_en?: string;
  time_start?: string;
  time_end?: string;
  location?: string;
  description?: string;
  description_en?: string;
  type?: string;
  color?: string;
  flyer_url?: string;
  is_active?: boolean;
};

const fallbackEvents: ChurchEvent[] = [
  {
    id: 'prayer',
    title_es: 'Oracion',
    title_en: 'Prayer',
    date_label_es: 'Todos los Miercoles',
    date_label_en: 'Every Wednesday',
    time_start: '08:30',
    location: '2560 S. Elm Ave. Sanford, FL 32773',
    description: 'Un tiempo dedicado a la oracion comunitaria, intercesion y busqueda de la presencia de Dios.',
    description_en: 'A time dedicated to community prayer, intercession and seeking the presence of God.',
    type: 'weekly',
    color: '#2563eb',
    flyer_url: 'https://www.dropbox.com/scl/fi/nx2yvtadqibyn0ui7ldn1/ICGG-23-of-133.jpg?rlkey=lqvr296qej8eqvqyepl9u77lr&st=y6g398tu&raw=1',
  },
  {
    id: 'bible-study',
    title_es: 'Estudio Biblico',
    title_en: 'Bible Study',
    date_label_es: 'Todos los Jueves',
    date_label_en: 'Every Thursday',
    time_start: '19:30',
    location: '2560 S. Elm Ave. Sanford, FL 32773',
    description: 'Un tiempo de profundizacion en la Palabra de Dios.',
    description_en: 'A time of deepening in the Word of God.',
    type: 'weekly',
    color: '#d97706',
    flyer_url: 'https://www.dropbox.com/scl/fi/gbb3lkzcqrn7pwz424ryo/ICCG-11-19-53-of-135.jpg?rlkey=5mr4eaq0w91l9odc1cwt5trpy&st=45emqolf&raw=1',
  },
  {
    id: 'sunday-service',
    title_es: 'Servicio de Domingo',
    title_en: 'Sunday Service',
    date_label_es: 'Todos los Domingos',
    date_label_en: 'Every Sunday',
    time_start: '10:00',
    location: '2560 S. Elm Ave. Sanford, FL 32773',
    description: 'Nuestro servicio principal de adoracion dominical con predicacion, alabanza y comunion.',
    description_en: 'Our main Sunday worship service with preaching, praise, and fellowship.',
    type: 'celebration',
    color: '#059669',
    flyer_url: 'https://www.dropbox.com/scl/fi/9muoo0s2b2d63f977iea5/FM-1-23-of-38.jpg?rlkey=hezm4qm3ah87atez9fxttty9j&st=mnud5zzd&raw=1',
  },
];

function formatTime(start?: string, end?: string) {
  if (!start) return '';

  const convert = (value: string) => {
    const [hourText, minute = '00'] = value.split(':');
    const hour = Number(hourText);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${suffix}`;
  };

  return end ? `${convert(start)} - ${convert(end)}` : convert(start);
}

function formatDate(event: ChurchEvent, language: string) {
  if (language === 'en' && event.date_label_en) return event.date_label_en;
  if (event.date_label_es) return event.date_label_es;

  if (!event.date) return language === 'en' ? 'Upcoming' : 'Proximamente';

  const date = new Date(`${event.date}T00:00:00`);
  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-US', {
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function eventAccent(type?: string, color?: string) {
  if (color) return color;
  if (type === 'celebration') return '#059669';
  if (type === 'special') return '#d97706';
  if (type === 'youth') return '#7c3aed';
  return '#2563eb';
}

const Events = () => {
  const { t, isSpanish } = useLanguage();
  const language = isSpanish ? 'es' : 'en';
  const [events, setEvents] = useState<ChurchEvent[]>(fallbackEvents);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const rows = await getRows<ChurchEvent>('events', {
          order: 'date.asc',
          filters: { is_active: true },
        });

        if (!cancelled && rows.length) setEvents(rows);
      } catch (error) {
        console.warn('Using fallback events:', error);
      }
    }

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="events" className="py-20 bg-white" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('events.title')}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('events.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {events.map((event) => {
            const accent = eventAccent(event.type, event.color);
            const title = language === 'en' && event.title_en ? event.title_en : event.title_es;
            const description = language === 'en' && event.description_en ? event.description_en : event.description;

            return (
              <article
                key={event.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {event.flyer_url ? (
                    <img
                      src={event.flyer_url}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <Calendar className="h-14 w-14" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {event.type || 'event'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="p-2 rounded-lg text-white" style={{ backgroundColor: accent }}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{formatDate(event, language)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="p-2 rounded-lg text-white" style={{ backgroundColor: accent }}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{formatTime(event.time_start, event.time_end)}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-600">
                      <div className="p-2 rounded-lg text-white" style={{ backgroundColor: accent }}>
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-sm leading-relaxed">{event.location}</span>
                    </div>
                  </div>

                  {description ? <p className="text-gray-700 leading-relaxed mb-4">{description}</p> : null}

                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Todos bienvenidos</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Quieres estar al dia con nuestros eventos?</h3>
            <p className="text-xl text-blue-100 mb-6">
              Siguenos en Facebook y nunca te pierdas nuestras actividades especiales
            </p>
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
    </section>
  );
};

export default Events;

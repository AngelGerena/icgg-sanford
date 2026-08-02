import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EventsFeed from './EventsFeed';
import { useLanguage } from '../contexts/LanguageContext';

const HomeEvents = () => {
  const { isSpanish } = useLanguage();
  return (
    <section className="icgg-homeevents">
      <div className="icgg-homeevents-inner">
        <div className="icgg-homeevents-head">
          <div>
            <p className="icgg-homeevents-eyebrow">{isSpanish ? 'Calendario' : 'Calendar'}</p>
            <h2 className="icgg-homeevents-title">{isSpanish ? 'Próximos Eventos' : 'Upcoming Events'}</h2>
          </div>
          <Link to="/eventos" className="icgg-homeevents-all">
            {isSpanish ? 'Ver todos' : 'View all'} <ArrowRight />
          </Link>
        </div>
        <EventsFeed limit={3} compact />
      </div>
    </section>
  );
};
export default HomeEvents;

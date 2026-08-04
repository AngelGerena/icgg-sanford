import React from 'react';
import SermonsFeed from '../components/SermonsFeed';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const Predicaciones = () => {
  usePageMeta(
    'Predicaciones - Iglesia Cristiana Gracia y Gloria',
    'Mira y escucha las predicaciones de Iglesia Cristiana Gracia y Gloria en Sanford, FL. Mensajes que edifican tu fe.'
  );
  const { isSpanish } = useLanguage();
  return (
    <div className="icgg-page">
      <PageHeader
        title={isSpanish ? 'Predicaciones' : 'Sermons'}
        subtitle={isSpanish ? 'Mensajes que edifican tu fe' : 'Messages that build your faith'}
      />
      <section className="icgg-sermons-section">
        <div className="icgg-sermons-inner">
          <SermonsFeed />
        </div>
      </section>
    </div>
  );
};

export default Predicaciones;

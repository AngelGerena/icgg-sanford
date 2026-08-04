import React from 'react';
import PodcastFeed from '../components/PodcastFeed';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const ContraCorriente = () => {
  const { isSpanish } = useLanguage();
  usePageMeta(
    isSpanish
      ? 'Contra Corriente - Iglesia Cristiana Gracia y Gloria'
      : 'Against the Current - Iglesia Cristiana Gracia y Gloria',
    isSpanish
      ? 'El podcast de Iglesia Cristiana Gracia y Gloria en Sanford, FL. Conversaciones sobre fe, vida y caminar contra corriente.'
      : 'The podcast of Iglesia Cristiana Gracia y Gloria in Sanford, FL. Conversations about faith, life and going against the current.'
  );

  return (
    <div className="icgg-page">
      <PageHeader
        title={isSpanish ? 'Contra Corriente' : 'Against the Current'}
        subtitle={isSpanish ? 'El podcast de Gracia y Gloria' : 'The Gracia y Gloria podcast'}
      />
      <section className="icgg-sermons-section">
        <div className="icgg-sermons-inner">
          <PodcastFeed />
        </div>
      </section>
    </div>
  );
};

export default ContraCorriente;

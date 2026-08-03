import React from 'react';
import LiveStream from '../components/LiveStream';
import Services from '../components/Services';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const EnVivo = () => {
  usePageMeta('En Vivo - Iglesia Cristiana Gracia y Gloria', 'Únete a nuestros servicios en vivo. Adora con nosotros dondequiera que estés.');
  const { isSpanish } = useLanguage();
  return (
    <div className="icgg-page">
      <PageHeader
        title={isSpanish ? 'En Vivo' : 'Live'}
        subtitle={isSpanish ? 'Adora con nosotros, dondequiera que estés' : 'Worship with us, wherever you are'}
      />
      <LiveStream />
      <Services />
    </div>
  );
};
export default EnVivo;

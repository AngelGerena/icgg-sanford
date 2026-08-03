import React from 'react';
import Giving from '../components/Giving';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const Dar = () => {
  usePageMeta('Diezmos y Ofrendas - Iglesia Cristiana Gracia y Gloria', 'Da tus diezmos y ofrendas de forma segura. Apoya la obra de Iglesia Cristiana Gracia y Gloria, Sanford FL.');
  const { isSpanish } = useLanguage();
  return (
    <div className="icgg-page">
      <PageHeader
        title={isSpanish ? 'Diezmos y Ofrendas' : 'Tithes & Offerings'}
        subtitle={isSpanish ? 'Damos con gratitud y alegría' : 'We give with gratitude and joy'}
      />
      <Giving />
    </div>
  );
};
export default Dar;

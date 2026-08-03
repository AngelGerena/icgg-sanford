import React from 'react';
import Ministries from '../components/Ministries';
import AvivaKids from '../components/AvivaKids';
import ClasePastorales from '../components/ClasePastorales';
import Alineados from '../components/Alineados';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

const Ministerios = () => {
  usePageMeta('Ministerios - Iglesia Cristiana Gracia y Gloria', 'Descubre nuestros ministerios: Aviva Kids, Clase Pastorales y más en ICGG Sanford.');
  const { isSpanish } = useLanguage();
  return (
    <div className="icgg-page">
      <PageHeader
        title={isSpanish ? 'Ministerios' : 'Ministries'}
        subtitle={isSpanish ? 'Crece, sirve y encuentra tu lugar' : 'Grow, serve, and find your place'}
      />
      <Ministries />
      <AvivaKids />
      <ClasePastorales />
      <Alineados />
    </div>
  );
};
export default Ministerios;

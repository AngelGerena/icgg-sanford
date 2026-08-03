import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import HomeTeasers from '../components/HomeTeasers';
import HomeEvents from '../components/HomeEvents';
import GivingCTA from '../components/GivingCTA';

const Home = () => {
  usePageMeta(
    'I.C.G.G. Iglesia Cristiana Gracia y Gloria - Sanford, FL',
    'Bienvenidos a nuestra familia de fe. Servicios dominicales 10:00 AM y estudios bíblicos jueves 7:30 PM en Sanford, Florida.'
  );
  return (
    <>
      <Hero />
      <About />
      <Services />
      <HomeTeasers />
      <HomeEvents />
      <GivingCTA />
    </>
  );
};

export default Home;

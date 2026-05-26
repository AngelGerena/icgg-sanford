import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Newcomers from './components/Newcomers';
import Prayer from './components/Prayer';
import ClasePastorales from './components/ClasePastorales';
import Alineados from './components/Alineados';
import AvivaKids from './components/AvivaKids';
import LiveStream from './components/LiveStream';
import FacebookPageFeed from './components/FacebookPageFeed';
import Services from './components/Services';
import Ministries from './components/Ministries';
import Events from './components/Events';
import Contact from './components/Contact';
import Giving from './components/Giving';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white overflow-x-hidden" style={{backgroundColor: '#ffffff', color: '#000000', width: '100%', margin: 0, padding: 0}}>
        <Header />
        <main className="overflow-x-hidden" style={{width: '100%'}}>
          <Hero />
          <About />
          <Newcomers />
          <Prayer />
          <ClasePastorales />
          <Alineados />
          <AvivaKids />
          <LiveStream />
          <FacebookPageFeed />
          <Services />
          <Ministries />
          <Events />
          <Contact />
          <Giving />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
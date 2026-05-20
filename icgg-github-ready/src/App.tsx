import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Prayer from './components/Prayer';
import ClasePastorales from './components/ClasePastorales';
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
      <div className="min-h-screen bg-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
        <Header />
        <main>
          <Hero />
          <About />
          <Prayer />
          <ClasePastorales />
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

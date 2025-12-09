import React, { Suspense } from 'react';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Realisations from './components/sections/Realisations';
import Innovation from './components/sections/Innovation';
import Contact from './components/sections/Contact';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';
import { Language, SectionId } from './types';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
      <div className="text-2xl font-bold font-display pointer-events-auto cursor-hover">UDEV.</div>
      
      <div className="flex items-center gap-8 pointer-events-auto">
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <button onClick={() => scrollTo(SectionId.ABOUT)} className="hover:text-cyan-400 transition-colors cursor-hover uppercase">{t('nav.about')}</button>
          <button onClick={() => scrollTo(SectionId.SERVICES)} className="hover:text-cyan-400 transition-colors cursor-hover uppercase">{t('nav.work')}</button>
          <button onClick={() => scrollTo(SectionId.INNOVATION)} className="hover:text-cyan-400 transition-colors cursor-hover uppercase text-purple-300">MGAI</button>
          <button onClick={() => scrollTo(SectionId.REALISATIONS)} className="hover:text-cyan-400 transition-colors cursor-hover uppercase">{t('nav.realisation')}</button>
          <button onClick={() => scrollTo(SectionId.CONTACT)} className="hover:text-cyan-400 transition-colors cursor-hover uppercase">{t('nav.contact')}</button>
        </div>

        {/* Language Switcher */}
        <div className="flex gap-2 items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          {(['en', 'fr', 'mg'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`text-xs font-bold uppercase transition-all duration-300 cursor-hover ${
                language === lang 
                  ? 'text-cyan-400 scale-110' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

function AppContent() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30">
      <CustomCursor />
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      
      <NavBar />

      <main>
        <Hero />
        <About />
        <Services />
        <Innovation />
        <Realisations />
        <Contact />
      </main>

      <AIChat />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </LanguageProvider>
  );
}
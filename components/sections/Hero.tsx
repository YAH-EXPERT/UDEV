import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: y1, opacity }}
          className="flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 relative"
          >
             <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-500 text-glow">
              UDEV
            </h1>
            <div className="absolute -inset-2 border border-cyan-500/20 rounded-full blur-xl opacity-50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-cyan-200/80 font-light tracking-wide max-w-3xl leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-[0.3em] text-slate-500 font-display">{t('hero.scroll')}</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
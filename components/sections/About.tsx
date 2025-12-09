import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 z-10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              {t('about.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{t('about.titleSuffix')}</span>
            </h2>
            <p className="text-lg text-slate-300 mb-6 font-light leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              {t('about.p2')}
            </p>
          </motion.div>

          <div className="relative">
             {/* Abstract holographic representation */}
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
             <motion.div
               initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
               whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative glass-panel p-8 rounded-2xl border border-white/10"
             >
               <ul className="space-y-6">
                 {[
                   { year: '2018', ...t('about.timeline.2018') },
                   { year: '2020', ...t('about.timeline.2020') },
                   { year: '2022', ...t('about.timeline.2022') },
                   { year: '2024', ...t('about.timeline.2024') }
                 ].map((item: any, idx) => (
                   <li key={idx} className="flex gap-6 group cursor-default">
                     <span className="text-cyan-400 font-display font-bold text-xl group-hover:text-white transition-colors">{item.year}</span>
                     <div>
                       <h4 className="font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                       <p className="text-sm text-slate-400">{item.desc}</p>
                     </div>
                   </li>
                 ))}
               </ul>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
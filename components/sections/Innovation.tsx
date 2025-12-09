import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useChat } from '../../context/ChatContext';
import { Sparkles, BrainCircuit } from 'lucide-react';

const Innovation: React.FC = () => {
  const { t } = useLanguage();
  const { openChat } = useChat();

  return (
    <section className="relative py-40 z-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-black border border-cyan-500/30 relative flex items-center justify-center mb-12 cursor-pointer group"
            onClick={openChat}
          >
            {/* Simulation of a core */}
            <div className="absolute inset-2 rounded-full border border-purple-500/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-cyan-500/20 animate-[spin_7s_linear_infinite_reverse]" />
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-900 to-purple-900 blur-md animate-pulse group-hover:scale-110 transition-transform duration-500" />
            <BrainCircuit className="absolute text-cyan-200 w-16 h-16 opacity-80 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {t('innovation.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{t('innovation.titleSuffix')}</span>
          </h2>
          
          <p className="max-w-2xl text-lg text-slate-400 mb-8">
            {t('innovation.desc')}
          </p>

          {/* AI Quote Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="mb-12 px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/50 rounded-full text-cyan-300 font-bold tracking-widest uppercase hover:bg-cyan-500/20 transition-all flex items-center gap-3"
          >
            <Sparkles size={18} />
            {t('innovation.button')}
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
             {[
               { val: '99.9%', label: t('innovation.stats.uptime') },
               { val: '<50ms', label: t('innovation.stats.latency') },
               { val: '24/7', label: t('innovation.stats.scale') }
             ].map((stat, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: idx * 0.2 }}
                 className="p-6 glass-panel rounded-xl text-center border-t border-cyan-500/20"
               >
                 <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                 <div className="text-cyan-400 text-xs uppercase tracking-widest">{stat.label}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
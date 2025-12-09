import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SectionId } from '../../types';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id={SectionId.CONTACT} className="relative min-h-screen z-50 overflow-hidden bg-transparent flex flex-col justify-end pointer-events-none">
      
      {/* Slide Up Animation Container */}
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for premium feel
        viewport={{ once: true, amount: 0.1 }} 
        className="w-full bg-[#050505] rounded-t-[3rem] border-t border-cyan-500/20 relative shadow-[0_-20px_100px_rgba(0,255,255,0.15)] pointer-events-auto pb-12 z-50"
      >
        {/* Decorative Top Handle */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-white/10 rounded-full" />

        <div className="container mx-auto px-6 py-24 max-w-5xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Info */}
            <div className="space-y-12">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter"
                >
                  {t('contact.title')}
                </motion.h2>
                <p className="text-xl text-slate-400 font-light max-w-md">{t('contact.subtitle')}</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-hover">
                   <div className="w-14 h-14 rounded-2xl bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                     <Phone size={24} />
                   </div>
                   <div>
                     <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Call Us</span>
                     <span className="font-display font-bold text-xl">{t('contact.phone')}</span>
                   </div>
                </div>

                <div className="flex items-center gap-6 group cursor-hover">
                   <div className="w-14 h-14 rounded-2xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-black transition-all duration-300">
                     <Mail size={24} />
                   </div>
                   <div>
                     <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Email Us</span>
                     <span className="font-display font-bold text-xl">{t('contact.email')}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cyan-500 font-bold">{t('contact.labels.name')}</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cyan-500 font-bold">{t('contact.labels.email')}</label>
                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cyan-500 font-bold">{t('contact.labels.message')}</label>
                  <textarea rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Project details..."></textarea>
                </div>

                <button type="button" className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold uppercase tracking-wider text-white hover:from-cyan-500 hover:to-blue-500 transition-all cursor-hover shadow-lg shadow-cyan-900/20">
                  {t('contact.button')}
                </button>
              </form>
            </div>

          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
            <p>{t('contact.footer')}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-cyan-400 transition-colors cursor-hover">Instagram</a>
              <a href="#" className="hover:text-cyan-400 transition-colors cursor-hover">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400 transition-colors cursor-hover">Twitter</a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
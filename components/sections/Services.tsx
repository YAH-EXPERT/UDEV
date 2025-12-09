import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { Cuboid as Cube, Layers, Cpu, Smartphone } from 'lucide-react';

const iconMap: Record<string, any> = {
  cube: Cube,
  layers: Layers,
  cpu: Cpu,
  smartphone: Smartphone
};

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const currentServices = SERVICES[language];

  return (
    <section className="relative py-32 z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 tracking-[0.2em] text-sm font-bold uppercase">{t('services.label')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">{t('services.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentServices.map((service, idx) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative h-80 perspective"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 transition-all duration-300 group-hover:border-cyan-500/50 backdrop-blur-sm overflow-hidden flex flex-col p-6">
                  
                  {/* Hover Glow */}
                  <div className={`absolute -inset-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                  
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50`}>
                    <Icon className="text-white w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-cyan-200 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto flex justify-end">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-cyan-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
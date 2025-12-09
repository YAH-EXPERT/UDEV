import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const { t, language } = useLanguage();
  const currentProjects = PROJECTS[language];

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] z-10 bg-[#020010]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Header absolute positioned */}
        <div className="absolute top-12 left-6 md:left-24 z-20">
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white/10 tracking-tighter">
            {t('projects.title')}
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-24">
          {currentProjects.map((project) => (
            <div key={project.id} className="relative group w-[85vw] md:w-[60vw] h-[60vh] flex-shrink-0">
              <div className="absolute inset-0 bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                 {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 md:p-12 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold mb-4">{project.title}</h3>
                    <p className="text-slate-300 max-w-xl mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 text-xs border border-white/20 rounded-full text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button className="flex items-center gap-2 text-white font-bold group/btn cursor-hover uppercase">
                      {t('projects.viewCase')}
                      <span className="bg-white text-black rounded-full p-1 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                        <ArrowUpRight size={16} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* End cap */}
          <div className="w-[10vw] flex-shrink-0 flex items-center justify-center">
             <span className="text-white/20 font-display text-4xl rotate-90">{t('projects.fin')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
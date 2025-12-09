import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Activity } from 'lucide-react';
import { SectionId } from '../../types';

const Realisations: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const { t, language } = useLanguage();
  const baseProjects = PROJECTS[language];
  // Triplicate to ensure smooth infinite loop illusion
  const projectsRow1 = [...baseProjects, ...baseProjects, ...baseProjects];
  const projectsRow2 = [...baseProjects.reverse(), ...baseProjects, ...baseProjects];

  // Skewed Parallax Logic
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  
  // The "Descent" Line Logic
  const heightLine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityLine = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section id={SectionId.REALISATIONS} ref={targetRef} className="relative h-[250vh] z-20 bg-[#020010] overflow-hidden">
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(60deg)] origin-top pointer-events-none" />

      <div className="sticky top-0 h-screen flex flex-col justify-center py-12">
        
        {/* Section Title */}
        <div className="absolute top-12 left-6 z-30 mix-blend-difference">
             <div className="flex items-center gap-3">
                <Activity className="text-cyan-400 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500/50 tracking-tighter">
                    {t('nav.realisation')}
                </h2>
             </div>
             <p className="text-xs text-cyan-500/50 font-mono mt-2 tracking-[0.5em] uppercase">System_Load: 100%</p>
        </div>

        {/* The Cyber Stream Container - Skewed */}
        <div className="relative transform -skew-y-3 w-full h-full flex flex-col justify-center gap-12 md:gap-20">
            
            {/* The Descent Line (Vertical connector) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 z-0 -translate-x-1/2 hidden md:block">
                <motion.div 
                    style={{ height: heightLine, opacity: opacityLine }}
                    className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_10px_cyan]"
                />
            </div>

            {/* Stream 1 - Moving Left */}
            <div className="w-full relative z-10">
                <motion.div style={{ x: x1 }} className="flex gap-6 pl-12 w-max">
                {projectsRow1.map((project, idx) => (
                    <ProjectCard key={`r1-${idx}`} project={project} variant="cyber-left" />
                ))}
                </motion.div>
            </div>

            {/* Stream 2 - Moving Right */}
            <div className="w-full relative z-10">
                <motion.div style={{ x: x2 }} className="flex gap-6 pl-12 w-max">
                {projectsRow2.map((project, idx) => (
                    <ProjectCard key={`r2-${idx}`} project={project} variant="cyber-right" />
                ))}
                </motion.div>
            </div>

        </div>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020010] via-transparent to-[#020010]" />
      </div>
    </section>
  );
};

const ProjectCard = ({ project, variant }: { project: any, variant: string }) => {
    return (
        <div className="relative group w-[300px] md:w-[450px] aspect-video flex-shrink-0 cursor-hover">
            {/* Cyber Frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
            
            <motion.div 
                className="w-full h-full bg-slate-900/90 rounded-lg overflow-hidden border border-cyan-500/20 relative group-hover:scale-[1.02] transition-transform duration-300"
            >
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-20 z-10 pointer-events-none transition-opacity" />

                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                />
                
                {/* Content HUD */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end mb-2">
                             <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">{project.title}</h3>
                             <ArrowUpRight className="text-cyan-400 w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                        <div className="h-[1px] w-0 group-hover:w-full bg-cyan-500 transition-all duration-500 mb-2" />
                        <p className="text-xs text-cyan-200 font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            {project.category} // {project.tech[0]}
                        </p>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500 opacity-50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-500 opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-500 opacity-50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500 opacity-50" />
            </motion.div>
        </div>
    )
}

export default Realisations;
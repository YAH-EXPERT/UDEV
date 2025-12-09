import { Project, Service, Language } from './types';

export const PROJECTS: Record<Language, Project[]> = {
  en: [
    {
      id: '1',
      title: 'LUMINA CHAT',
      category: 'AI Assistant',
      image: 'https://picsum.photos/800/600?random=10',
      description: 'A customer support AI agent for a global retail brand, reducing response time by 80%.',
      tech: ['Python', 'Gemini API', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'UNITY BANKING',
      category: 'Mobile App',
      image: 'https://picsum.photos/800/600?random=11',
      description: 'Secure, intuitive mobile banking application focused on accessibility and human-centric design.',
      tech: ['React Native', 'TypeScript', 'Biometrics']
    },
    {
      id: '3',
      title: 'AERO DASHBOARD',
      category: 'Web Platform',
      image: 'https://picsum.photos/800/600?random=12',
      description: 'Comprehensive SaaS platform for logistics management with real-time 3D tracking.',
      tech: ['Next.js', 'WebGL', 'PostgreSQL']
    },
    {
      id: '4',
      title: 'HEALTH CONNECT',
      category: 'Custom Software',
      image: 'https://picsum.photos/800/600?random=13',
      description: 'Telemedicine platform connecting patients with specialists through secure video and chat.',
      tech: ['WebRTC', 'Socket.io', 'Azure']
    }
  ],
  fr: [
    {
      id: '1',
      title: 'LUMINA CHAT',
      category: 'Assistant IA',
      image: 'https://picsum.photos/800/600?random=10',
      description: 'Agent de support client IA pour une marque mondiale, réduisant le temps de réponse de 80%.',
      tech: ['Python', 'Gemini API', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'UNITY BANKING',
      category: 'App Mobile',
      image: 'https://picsum.photos/800/600?random=11',
      description: 'Application bancaire mobile sécurisée et intuitive, axée sur l\'accessibilité et le design humain.',
      tech: ['React Native', 'TypeScript', 'Biometrics']
    },
    {
      id: '3',
      title: 'AERO DASHBOARD',
      category: 'Plateforme Web',
      image: 'https://picsum.photos/800/600?random=12',
      description: 'Plateforme SaaS complète pour la gestion logistique avec suivi 3D en temps réel.',
      tech: ['Next.js', 'WebGL', 'PostgreSQL']
    },
    {
      id: '4',
      title: 'HEALTH CONNECT',
      category: 'Logiciel Sur Mesure',
      image: 'https://picsum.photos/800/600?random=13',
      description: 'Plateforme de télémédecine connectant patients et spécialistes via vidéo sécurisée.',
      tech: ['WebRTC', 'Socket.io', 'Azure']
    }
  ],
  mg: [
    {
      id: '1',
      title: 'LUMINA CHAT',
      category: 'Mpanampy AI',
      image: 'https://picsum.photos/800/600?random=10',
      description: 'Mpanampy mpanjifa AI ho an\'ny marika lehibe, mampihena ny fotoana famaliana 80%.',
      tech: ['Python', 'Gemini API', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'UNITY BANKING',
      category: 'App Finday',
      image: 'https://picsum.photos/800/600?random=11',
      description: 'Fampiharana banky amin\'ny finday azo antoka, mifantoka amin\'ny mpampiasa.',
      tech: ['React Native', 'TypeScript', 'Biometrics']
    },
    {
      id: '3',
      title: 'AERO DASHBOARD',
      category: 'Sehatra Web',
      image: 'https://picsum.photos/800/600?random=12',
      description: 'Sehatra SaaS feno ho an\'ny fitantanana lozisialy miaraka amin\'ny fanaraha-maso 3D.',
      tech: ['Next.js', 'WebGL', 'PostgreSQL']
    },
    {
      id: '4',
      title: 'HEALTH CONNECT',
      category: 'Rindrambaiko Manokana',
      image: 'https://picsum.photos/800/600?random=13',
      description: 'Sehatra fitsaboana an-tserasera mampifandray ny marary sy ny dokotera.',
      tech: ['WebRTC', 'Socket.io', 'Azure']
    }
  ]
};

export const SERVICES: Record<Language, Service[]> = {
  en: [
    {
      id: 'webdev',
      title: 'Web Platforms',
      description: 'Building robust, scalable web applications using React, Next.js, and modern cloud architecture.',
      icon: 'layers',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'apps',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile solutions (iOS & Android) designed for seamless user experiences.',
      icon: 'smartphone',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai_bot',
      title: 'AI & Chatbots',
      description: 'Intelligent conversational agents and custom AI integrations that humanize customer interactions.',
      icon: 'cpu',
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      id: 'custom',
      title: 'Unity & Custom Dev',
      description: 'From 3D visualizations to complex backend systems, we engineer bespoke solutions for unique needs.',
      icon: 'cube',
      color: 'from-orange-500 to-red-500'
    }
  ],
  fr: [
    {
      id: 'webdev',
      title: 'Plateformes Web',
      description: 'Création d\'applications web robustes et évolutives utilisant React, Next.js et une architecture cloud moderne.',
      icon: 'layers',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'apps',
      title: 'Apps Mobiles',
      description: 'Solutions mobiles natives et multiplateformes (iOS & Android) conçues pour une expérience utilisateur fluide.',
      icon: 'smartphone',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai_bot',
      title: 'IA & Chatbots',
      description: 'Agents conversationnels intelligents et intégrations IA sur mesure qui humanisent les interactions client.',
      icon: 'cpu',
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      id: 'custom',
      title: 'Unity & Sur Mesure',
      description: 'De la visualisation 3D aux systèmes backend complexes, nous ingénions des solutions uniques.',
      icon: 'cube',
      color: 'from-orange-500 to-red-500'
    }
  ],
  mg: [
    {
      id: 'webdev',
      title: 'Sehatra Web',
      description: 'Fananganana tranonkala matanjaka amin\'ny fampiasana React, Next.js ary teknolojia maoderina.',
      icon: 'layers',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'apps',
      title: 'Apps Finday',
      description: 'Vahaolana finday (iOS & Android) natao ho an\'ny traikefa mpampiasa milamina sy tsotra.',
      icon: 'smartphone',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai_bot',
      title: 'AI & Chatbots',
      description: 'Agents manan-tsaina sy fampidirana AI manokana izay manamora ny fifandraisana.',
      icon: 'cpu',
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      id: 'custom',
      title: 'Unity & Manokana',
      description: 'Manomboka amin\'ny sary 3D ka hatramin\'ny rafitra sarotra, manamboatra vahaolana mifanaraka amin\'ny filana.',
      icon: 'cube',
      color: 'from-orange-500 to-red-500'
    }
  ]
};
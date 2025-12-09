import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.cursor-hover') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Central Target Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 pointer-events-none z-[9999]"
        style={{ borderRadius: '0px' }} 
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 2 : 1,
          backgroundColor: isHovering ? '#ef4444' : '#22d3ee'
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Inner Bracket/Reticle with Scanner */}
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 border border-cyan-400/80 pointer-events-none z-[9998] flex items-center justify-center overflow-hidden`}
        style={{ 
            clipPath: 'polygon(0 0, 25% 0, 25% 15%, 75% 15%, 75% 0, 100% 0, 100% 100%, 75% 100%, 75% 85%, 25% 85%, 25% 100%, 0 100%)' 
        }}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.3 : 1,
          borderColor: isHovering ? '#ef4444' : '#22d3ee',
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
          {/* Scanner Line Animation */}
          <motion.div 
            className={`w-full h-[2px] bg-cyan-400/80 shadow-[0_0_5px_cyan] ${isHovering ? 'bg-red-500 shadow-red-500' : ''}`}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ position: 'absolute' }}
          />
      </motion.div>

      {/* Rotating Outer HUD Ring */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 border border-dashed border-cyan-500/30 rounded-full pointer-events-none z-[9997]"
        animate={{
          x: position.x - 40,
          y: position.y - 40,
          scale: isHovering ? 1.5 : 0.8,
          opacity: isHovering ? 0.8 : 0.3,
          rotate: 360,
          borderColor: isHovering ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 211, 238, 0.4)'
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: isHovering ? 1 : 8, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 25 }
        }}
      />
      
      {/* Decorative Crosshairs */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9996]"
        animate={{
            x: position.x - 8,
            y: position.y - 8,
            rotate: isHovering ? 45 : 0,
            opacity: isHovering ? 1 : 0
        }}
      >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-500" />
      </motion.div>

      {/* Trailing Text Data */}
      <motion.div
          className="fixed pointer-events-none z-[9996] text-[8px] font-mono font-bold uppercase tracking-widest"
          animate={{
              x: position.x + 28,
              y: position.y + 28,
              color: isHovering ? '#ef4444' : '#22d3ee',
              opacity: isHovering ? 1 : 0
          }}
      >
          {isHovering ? 'ENGAGING...' : 'SCANNING'}
      </motion.div>
    </>
  );
};

export default CustomCursor;
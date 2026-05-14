import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../../store';

export const AnimatedBackground = () => {
  const { appMode } = useStore();
  const isPartner = appMode === 'partner';
  const { scrollY } = useScroll();
  
  // Fade out blobs as we scroll down to focus on content
  const opacity = useTransform(scrollY, [0, 400], [0.6, 0.15]);
  const opacity2 = useTransform(scrollY, [0, 400], [0.7, 0.2]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 scroll-smooth">
      {/* Background base color */}
      <div className="absolute inset-0 bg-bg-base transition-colors duration-1000" />
      
      {/* Subtle floating blobs */}
      <motion.div
        style={{ opacity }}
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 60, 20, 0],
          rotate: [0, 45, -45, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[80%] h-[80%] rounded-[40%] bg-primary/5 blur-[100px]"
      />

      <motion.div
        style={{ 
          opacity: opacity2,
          background: isPartner 
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0) 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 70%)'
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 80, 0],
          rotate: [0, -60, 60, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[20%] -right-[15%] w-[90%] h-[90%] rounded-full blur-[120px]"
      />

      {/* Very faint noise/texture for that "paper" feel */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
    </div>
  );
};

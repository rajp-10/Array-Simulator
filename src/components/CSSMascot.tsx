import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import React from 'react';

interface CSSMascotProps {
  className?: string;
  isFlying?: boolean;
  isActive?: boolean;
  isMini?: boolean;
}

export const CSSMascot: React.FC<CSSMascotProps> = ({ className, isFlying, isActive, isMini }) => {
  return (
    <div 
      className={cn("relative flex flex-col items-center justify-center mascot-container pointer-events-none", className)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={cn(
          "relative preserve-3d mascot-image-wrapper rounded-full overflow-hidden",
          isMini ? "w-10 h-10 border border-white shadow-md" : "w-full h-full border-2 border-white shadow-xl"
        )}
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{
          y: isFlying ? [-5, -15, -5] : isActive ? [-2, -8, -2] : [0, -5, 0],
          rotateX: isFlying ? [15, 25, 15] : isActive ? [0, -10, 0] : [0, 5, 0],
          rotateY: isFlying ? [5, -5, 5] : [-5, 5, -5],
          scale: isFlying ? 1.05 : isActive ? 1.1 : 1,
        }}
        transition={{
          repeat: Infinity,
          duration: isFlying ? 0.8 : isActive ? 1.5 : 3,
          ease: "easeInOut"
        }}
      >
        {/* Glow effect layer */}
        <div className="absolute inset-0 bg-sage/10 mix-blend-overlay z-10 rounded-full" />
        <img 
          src="/assets/doraemon.jpg" 
          alt="Mascot"
          className="w-full h-full object-cover rounded-full"
          style={{ transform: "translateZ(10px)" }}
        />
        {/* Inner shadow for 3D depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_10px_rgba(0,0,0,0.3)] z-20" />
      </motion.div>
      
      {/* Contact shadow */}
      <motion.div 
        className={cn(
          "absolute rounded-[50%] bg-navy/30 blur-md pointer-events-none z-[-1]",
          isMini ? "w-8 h-2 -bottom-3" : "w-3/4 h-4 -bottom-6"
        )}
        initial={false}
        animate={{
          scale: isFlying ? [0.6, 0.4, 0.6] : isActive ? [0.8, 0.6, 0.8] : [1, 0.8, 1],
          opacity: isFlying ? [0.1, 0.05, 0.1] : isActive ? [0.3, 0.15, 0.3] : [0.4, 0.2, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: isFlying ? 0.8 : isActive ? 1.5 : 3,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

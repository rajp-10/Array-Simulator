import { motion } from 'framer-motion';

export function Explorer({ className, status = 'idle' }: { className?: string; status?: 'idle' | 'walking' | 'celebrating' | 'thinking' | 'error' }) {
  // A cute geometric robot/explorer mascot
  
  const getEyeAnimation = () => {
    switch (status) {
      case 'celebrating': return { scaleY: [1, 0.1, 1], transition: { repeat: Infinity, duration: 1.5 } };
      case 'error': return { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } };
      case 'thinking': return { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 2 } };
      default: return { scaleY: [1, 0.1, 1], transition: { repeat: Infinity, repeatDelay: 3, duration: 0.2 } };
    }
  };

  const getBodyAnimation = () => {
    switch (status) {
      case 'walking': return { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.4 } };
      case 'celebrating': return { y: [0, -8, 0], transition: { repeat: Infinity, duration: 0.6 } };
      default: return { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2 } };
    }
  };

  return (
    <motion.div className={`relative w-12 h-12 ${className}`} animate={getBodyAnimation()}>
      {/* Shadow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-navy/20 rounded-full blur-[2px]"></div>
      
      {/* Body */}
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="5" stroke="#223247" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="5" r="4" fill="#78947A" />
        
        {/* Main Box */}
        <rect x="20" y="20" width="60" height="60" rx="12" fill="#F4EFE4" stroke="#223247" strokeWidth="6" />
        
        {/* Screen/Face */}
        <rect x="30" y="30" width="40" height="30" rx="6" fill="#223247" />
        
        {/* Eyes */}
        <motion.circle cx="40" cy="45" r="5" fill="#78947A" animate={getEyeAnimation()} style={{ transformOrigin: '40px 45px' }} />
        <motion.circle cx="60" cy="45" r="5" fill="#78947A" animate={getEyeAnimation()} style={{ transformOrigin: '60px 45px' }} />
        
        {/* Tracks/Feet */}
        <rect x="15" y="70" width="20" height="15" rx="5" fill="#CBBDA8" stroke="#223247" strokeWidth="4" />
        <rect x="65" y="70" width="20" height="15" rx="5" fill="#CBBDA8" stroke="#223247" strokeWidth="4" />
      </svg>
    </motion.div>
  );
}

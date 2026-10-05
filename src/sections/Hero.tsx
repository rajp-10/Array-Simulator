import { motion } from 'framer-motion';
import { Explorer } from '../components/Explorer';

export function Hero({ onStart }: { onStart?: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto pt-4 pb-4 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center relative w-full"
      >
        {/* 3D Gateway Visual */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 transform-style-3d rotate-x-60 rotate-z-neg-45 animate-[spin_30s_linear_infinite] flex items-center justify-center">
            
            {/* Base platform */}
            <div className="absolute w-48 h-48 bg-sand border-4 border-navy shadow-[10px_10px_0_0_#463C32] rounded-xl flex items-center justify-center">
               <div className="w-32 h-32 border-4 border-navy/20 rounded-full"></div>
            </div>

            {/* Gateway Arch */}
            <div className="absolute w-48 h-48 transform-style-3d translate-z-8">
              {/* Left Pillar */}
              <div className="absolute bottom-0 left-0 w-8 h-24 bg-sage border-4 border-navy shadow-[4px_4px_0_0_#463C32] transform rotate-x-neg-90 origin-bottom"></div>
              {/* Right Pillar */}
              <div className="absolute bottom-0 right-0 w-8 h-24 bg-sage border-4 border-navy shadow-[4px_4px_0_0_#463C32] transform rotate-x-neg-90 origin-bottom"></div>
              {/* Top Arch */}
              <div className="absolute top-24 left-0 w-48 h-8 bg-ivory border-4 border-navy shadow-[4px_4px_0_0_#463C32] transform rotate-x-neg-90 origin-bottom"></div>
            </div>
          </div>

          {/* Floating Explorer */}
          <div className="absolute z-10">
             <Explorer status="walking" className="transform scale-150" />
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-navy uppercase tracking-widest mb-6 drop-shadow-sm">
          ARRAY QUEST
        </h2>
        <p className="text-xl md:text-2xl text-navy-light mb-12 max-w-2xl mx-auto font-bold px-4">
          Explore memory. Master arrays. Complete the quest.
        </p>

        {onStart && (
          <button 
            onClick={onStart} 
            className="group relative px-12 py-5 font-black text-xl uppercase tracking-wider text-ivory bg-navy border-4 border-navy rounded-2xl shadow-[6px_6px_0_0_#78947A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0_0_#78947A] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all"
          >
            Enter Array Quest
            <span className="absolute inset-0 border-4 border-white/20 rounded-xl pointer-events-none group-hover:border-white/40 transition-colors"></span>
          </button>
        )}
      </motion.div>
    </section>
  );
}

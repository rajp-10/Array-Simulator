import React from 'react';

interface LandingPageProps {
  onNavigate: (screen: 'simulator' | 'learning') => void;
}

import { CSSMascot } from '../components/CSSMascot';

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
      
      <div className="mb-8 w-40 h-40 md:w-48 md:h-48 relative">
        <CSSMascot isActive={true} />
      </div>

      <h2 className="text-xl md:text-2xl font-black text-navy/60 mb-2 tracking-widest uppercase">
        Array Operations Simulator
      </h2>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-navy mb-6 tracking-tight leading-tight">
        Understand Arrays.<br/>
        <span className="text-sage">See Them in Action.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-navy/80 mb-10 max-w-2xl font-medium">
        Explore array addressing, insertion, deletion and searching through interactive visualizations.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => onNavigate('simulator')}
          className="btn-primary text-lg px-8 py-4"
        >
          START SIMULATOR
        </button>
        <button 
          onClick={() => onNavigate('learning')}
          className="btn-secondary text-lg px-8 py-4"
        >
          LEARN ARRAYS
        </button>
      </div>

    </div>
  );
};

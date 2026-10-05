import React from 'react';

interface LandingPageProps {
  onNavigate: (screen: 'simulator' | 'learning') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
      
      <div 
        className="mb-8 w-28 h-28 bg-white rounded-2xl shadow-card border border-sand flex items-center justify-center"
        style={{ perspective: '1000px', transform: 'rotateX(6deg) rotateY(3deg)' }}
      >
        <div className="flex gap-2 items-end h-16">
          <div className="w-6 h-10 array-block"></div>
          <div className="w-6 h-16 array-block-selected shadow-none"></div>
          <div className="w-6 h-12 array-block"></div>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-navy mb-6 tracking-tight leading-tight">
        Understand Arrays.<br/>
        <span className="text-sage">See Them in Action.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-navy/80 mb-10 max-w-2xl">
        Explore array addressing, insertion, deletion, linear search and binary search through professional, interactive visualizations.
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

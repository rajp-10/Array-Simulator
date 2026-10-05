import { useState } from 'react';
import { LandingPage } from './sections/LandingPage';
import { Simulator } from './sections/Simulator';
import { LearningMode } from './sections/LearningMode';

type AppScreen = 'landing' | 'simulator' | 'learning';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  
  // Global Array State - central source of truth
  const [globalArray, setGlobalArray] = useState<number[]>([10, 20, 30, 40, 50]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-ivory text-navy selection:bg-sage selection:text-white">
      {/* Navbar */}
      <header className="bg-white border-b-2 border-sand-dark shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentScreen('landing')}>
              <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm transition-transform group-hover:-translate-y-0.5 border-2 border-transparent group-hover:border-sage">
                <span className="opacity-90">[ ]</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-navy">ARRAY OPERATIONS SIMULATOR</h1>
            </div>
            
            <nav className="flex gap-2">
              <button 
                onClick={() => setCurrentScreen('landing')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${currentScreen === 'landing' ? 'bg-sand text-navy' : 'text-navy/70 hover:bg-ivory hover:text-navy'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentScreen('simulator')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${currentScreen === 'simulator' ? 'bg-sand text-navy' : 'text-navy/70 hover:bg-ivory hover:text-navy'}`}
              >
                Simulator
              </button>
              <button 
                onClick={() => setCurrentScreen('learning')}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${currentScreen === 'learning' ? 'bg-sand text-navy' : 'text-navy/70 hover:bg-ivory hover:text-navy'}`}
              >
                Learning Mode
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {currentScreen === 'landing' && <LandingPage onNavigate={setCurrentScreen} />}
        {currentScreen === 'simulator' && <Simulator globalArray={globalArray} setGlobalArray={setGlobalArray} />}
        {currentScreen === 'learning' && <LearningMode />}
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CSSMascot } from '../components/CSSMascot';
import { cn } from '../utils/cn';

export function LinearSearch({ globalArray }: { globalArray: number[] }) {
  const [searchValue, setSearchValue] = useState<string>("40");
  
  const [animating, setAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessage("");
  }, [globalArray]);

  const handleSearch = async () => {
    if (animating) return;
    
    if (globalArray.length === 0) {
      alert("The array is empty.");
      return;
    }

    const target = parseInt(searchValue, 10);
    if (isNaN(target)) {
      alert("Please enter a valid number to search for.");
      return;
    }

    setAnimating(true);
    setFoundIndex(null);
    setCurrentIndex(null);
    setMessage(`Starting linear search for value ${target}.`);
    await new Promise(r => setTimeout(r, 1000));

    let found = false;
    for (let i = 0; i < globalArray.length; i++) {
      setCurrentIndex(i);
      setMessage(`Checking index ${i}: is ${globalArray[i]} == ${target}?`);
      await new Promise(r => setTimeout(r, 1000));
      
      if (globalArray[i] === target) {
        setFoundIndex(i);
        setMessage(`Success! Found ${target} at index ${i}.`);
        found = true;
        break;
      }
    }

    if (!found) {
      setMessage(`Search complete. Element ${target} was not found in the array.`);
      setCurrentIndex(null);
    }
    
    setAnimating(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">04. Linear Search</h2>
        <p className="text-navy/70 text-sm">
          Search for an element sequentially from the first index to the last. Works on both sorted and unsorted arrays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy/80 mb-1">Target Value</label>
                <input 
                  type="number" 
                  value={searchValue} 
                  onChange={(e) => setSearchValue(e.target.value)} 
                  disabled={animating}
                  className="input-field py-2" 
                />
              </div>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <button onClick={handleSearch} disabled={animating || globalArray.length === 0} className="btn-primary w-full">Start Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="card p-6 flex-1 flex flex-col">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Visualization</h3>
            
            <div className="flex-1 bg-ivory/50 rounded-xl border border-sand/30 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[300px] relative">
              {globalArray.length === 0 ? (
                <p className="text-navy/50 font-bold">The array is empty.</p>
              ) : (
                <div className="w-full flex justify-start sm:justify-center overflow-x-auto pb-8 hide-scrollbar">
                  <div className="flex gap-4 px-4">
                    {globalArray.map((val, idx) => {
                      const isCurrent = currentIndex === idx;
                      const isFound = foundIndex === idx;
                      
                      return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <span className={cn("text-[10px] font-mono font-bold transition-colors", isCurrent ? "text-sage" : "text-navy/50")}>Idx {idx}</span>
                          <motion.div 
                            animate={{ 
                              y: isFound ? -8 : isCurrent ? -4 : 0,
                              scale: isFound ? 1.1 : 1
                            }}
                            className={cn(
                              "w-14 h-14 mb-12 array-block relative",
                              isFound ? "array-block-selected z-20" :
                              isCurrent ? "border-sage shadow-block-hover -translate-y-1 z-10 text-navy" : ""
                            )}
                          >
                            <span>{val}</span>
                            {(isCurrent || isFound) && (
                              <motion.div layoutId="main-mascot" className="w-10 h-10 absolute -bottom-14 z-30 pointer-events-none">
                                <div className="absolute inset-0 pointer-events-none">
                                  <CSSMascot isMini={true} isActive={isCurrent} />
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                          {isCurrent && !isFound && (
                            <div className="text-[10px] uppercase font-bold text-sage flex flex-col items-center">
                              <span>↑</span>
                              <span>Checking</span>
                            </div>
                          )}
                          {isFound && (
                            <div className="text-[10px] uppercase font-bold text-sage flex flex-col items-center">
                              <span>↑</span>
                              <span>Found</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="h-14 mt-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-white border border-sand px-6 py-3 rounded-lg text-sm text-navy font-medium shadow-sm"
                    >
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

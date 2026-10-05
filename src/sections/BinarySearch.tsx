import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CSSMascot } from '../components/CSSMascot';
import { cn } from '../utils/cn';

export function BinarySearch({ globalArray }: { globalArray: number[] }) {
  const [searchValue, setSearchValue] = useState<string>("40");
  
  const [animating, setAnimating] = useState(false);
  const [leftIndex, setLeftIndex] = useState<number | null>(null);
  const [rightIndex, setRightIndex] = useState<number | null>(null);
  const [midIndex, setMidIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setLeftIndex(null);
    setRightIndex(null);
    setMidIndex(null);
    setFoundIndex(null);
    setMessage("");
  }, [globalArray]);

  const isSorted = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const handleSearch = async () => {
    if (animating) return;
    
    if (globalArray.length === 0) {
      alert("The array is empty.");
      return;
    }

    if (!isSorted(globalArray)) {
      setMessage("Error: Binary Search requires a sorted array. Please edit your array to be in ascending order before running Binary Search.");
      return;
    }

    const target = parseInt(searchValue, 10);
    if (isNaN(target)) {
      alert("Please enter a valid number to search for.");
      return;
    }

    setAnimating(true);
    setFoundIndex(null);
    
    let left = 0;
    let right = globalArray.length - 1;
    
    setLeftIndex(left);
    setRightIndex(right);
    setMessage(`Step 1: Initial search space between index ${left} and ${right}.`);
    await new Promise(r => setTimeout(r, 1500));

    let found = false;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setMidIndex(mid);
      setMessage(`Step 2: Checking the middle index: ⌊(${left} + ${right}) / 2⌋ = ${mid}. Is A[${mid}] (${globalArray[mid]}) == ${target}?`);
      await new Promise(r => setTimeout(r, 2000));
      
      if (globalArray[mid] === target) {
        setFoundIndex(mid);
        setMessage(`Success! Found element ${target} at index ${mid}.`);
        found = true;
        break;
      } else if (globalArray[mid] < target) {
        setMessage(`A[${mid}] (${globalArray[mid]}) is less than ${target}. Target must be in the right half.`);
        await new Promise(r => setTimeout(r, 1500));
        left = mid + 1;
        setLeftIndex(left);
        setMidIndex(null);
        if (left <= right) {
            setMessage(`Updating lower bound (Left) to index ${left}.`);
            await new Promise(r => setTimeout(r, 1000));
        }
      } else {
        setMessage(`A[${mid}] (${globalArray[mid]}) is greater than ${target}. Target must be in the left half.`);
        await new Promise(r => setTimeout(r, 1500));
        right = mid - 1;
        setRightIndex(right);
        setMidIndex(null);
        if (left <= right) {
            setMessage(`Updating upper bound (Right) to index ${right}.`);
            await new Promise(r => setTimeout(r, 1000));
        }
      }
    }

    if (!found) {
      setMessage(`Search complete. Element ${target} was not found in the array.`);
      setLeftIndex(null);
      setRightIndex(null);
      setMidIndex(null);
    }
    
    setAnimating(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">05. Binary Search</h2>
        <p className="text-navy/70 text-sm">
          Efficiently search a SORTED array by dividing the search interval in half at each step.
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
                  <div className="flex gap-4 px-4 pt-8">
                    {globalArray.map((val, idx) => {
                      const isFound = foundIndex === idx;
                      const isMid = midIndex === idx;
                      const isLeft = leftIndex === idx && !isFound && !isMid;
                      const isRight = rightIndex === idx && !isFound && !isMid;
                      const inRange = leftIndex !== null && rightIndex !== null ? (idx >= leftIndex && idx <= rightIndex) : true;
                      
                      return (
                        <div key={idx} className={cn("flex flex-col items-center gap-2 transition-opacity duration-300", inRange ? "opacity-100" : "opacity-30")}>
                          <span className="text-[10px] font-mono font-bold text-navy/50">Idx {idx}</span>
                          <motion.div 
                            animate={{ 
                              y: isFound ? -8 : (isMid || isLeft || isRight) ? -4 : 0,
                              scale: isFound ? 1.1 : 1
                            }}
                            className={cn(
                              "w-14 h-14 mb-12 array-block transition-transform relative",
                              isFound ? "array-block-selected z-20" :
                              isMid ? "border-sage shadow-block-hover -translate-y-1 z-10 text-navy" :
                              isLeft || isRight ? "border-navy-light shadow-block-hover -translate-y-0.5 z-10 text-navy" :
                              ""
                            )}
                          >
                            <span>{val}</span>
                            {(isMid || isFound) && (
                              <motion.div layoutId="main-mascot" className="w-10 h-10 absolute -bottom-14 z-30 pointer-events-none">
                                <div className="absolute inset-0 pointer-events-none">
                                  <CSSMascot isMini={true} isActive={isMid || isFound} />
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                          
                          <div className="h-6 flex flex-col items-center mt-1">
                            {isFound && <span className="text-[10px] uppercase font-bold text-sage">Target</span>}
                            {isMid && !isFound && <span className="text-[10px] uppercase font-bold text-sage">Mid</span>}
                            {isLeft && <span className="text-[10px] uppercase font-bold text-navy">Left</span>}
                            {isRight && <span className="text-[10px] uppercase font-bold text-navy">Right</span>}
                          </div>
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
                      className={cn(
                        "px-6 py-3 rounded-lg text-sm font-medium shadow-sm border",
                        message.includes("Error:") ? "bg-red-50 text-red-800 border-red-200" : "bg-white text-navy border-sand"
                      )}
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

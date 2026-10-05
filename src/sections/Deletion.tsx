import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CSSMascot } from '../components/CSSMascot';
import { cn } from '../utils/cn';

export function Deletion({ globalArray, setGlobalArray }: { globalArray: number[], setGlobalArray: (arr: number[]) => void }) {
  const [deleteIndex, setDeleteIndex] = useState<number>(1);
  
  const [visualArray, setVisualArray] = useState<{val: string | number, id: number}[]>([]);
  const [animating, setAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setVisualArray(globalArray.map((val, i) => ({ val, id: Date.now() + i })));
  }, [globalArray]);

  const handleDelete = async () => {
    if (animating) return;
    
    if (deleteIndex < 0 || deleteIndex >= globalArray.length) {
      alert("Invalid index. Must be between 0 and " + (globalArray.length - 1));
      return;
    }

    setAnimating(true);
    let currentVis = [...visualArray];
    
    setHighlightedIndex(deleteIndex);
    setMessage(`Step 1: Removing element ${currentVis[deleteIndex].val} at index ${deleteIndex}.`);
    await new Promise(r => setTimeout(r, 1000));
    
    // Clear element
    currentVis[deleteIndex].val = "";
    setVisualArray([...currentVis]);
    await new Promise(r => setTimeout(r, 800));

    // Shift elements left
    for (let i = deleteIndex; i < currentVis.length - 1; i++) {
      setMessage(`Step 2: Shifting element ${currentVis[i + 1].val} to the left to close the gap...`);
      setHighlightedIndex(i + 1);
      
      currentVis[i].val = currentVis[i + 1].val;
      currentVis[i + 1].val = "";
      setVisualArray([...currentVis]);
      
      await new Promise(r => setTimeout(r, 800));
    }

    setMessage("Step 3: Removing the leftover empty space at the end of the array.");
    setHighlightedIndex(null);
    await new Promise(r => setTimeout(r, 800));
    
    currentVis.pop();
    setVisualArray([...currentVis]);
    
    // Update global array
    const newGlobalArray = currentVis.map(v => v.val as number);
    setGlobalArray(newGlobalArray);
    
    setMessage(`Success! Element was deleted.`);
    setAnimating(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">03. Array Deletion</h2>
        <p className="text-navy/70 text-sm">
          Remove an element from a specific index. Watch how remaining elements shift to the left to close the gap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy/80 mb-1">Target Index</label>
                <input 
                  type="number" 
                  value={deleteIndex} 
                  onChange={(e) => setDeleteIndex(Number(e.target.value))} 
                  disabled={animating || globalArray.length === 0}
                  className="input-field py-2" 
                  min="0"
                  max={globalArray.length > 0 ? globalArray.length - 1 : 0}
                />
              </div>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <button onClick={handleDelete} disabled={animating || globalArray.length === 0} className="btn-primary w-full">Delete Element</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="card p-6 flex-1 flex flex-col">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Visualization</h3>
            
            <div className="flex-1 bg-ivory/50 rounded-xl border border-sand/30 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[300px] relative">
              {visualArray.length === 0 ? (
                <p className="text-navy/50 font-bold">The array is empty.</p>
              ) : (
                <div className="w-full flex justify-start sm:justify-center overflow-x-auto pb-8 hide-scrollbar">
                  <div className="flex gap-4 px-4">
                    {visualArray.map((item, idx) => (
                      <div key={item.id} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-navy/50">Idx {idx}</span>
                        <motion.div 
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1, y: highlightedIndex === idx ? -4 : 0 }}
                          className={cn(
                            "w-14 h-14 mb-8 array-block relative",
                            item.val === "" ? "bg-sand/10 border-sand/30 border-dashed shadow-none" :
                            highlightedIndex === idx ? "array-block-selected z-10" : ""
                          )}
                        >
                          <span>{item.val}</span>
                          {item.val !== "" && (
                            <div className="absolute -bottom-12 pointer-events-none">
                              <CSSMascot isMini={true} />
                            </div>
                          )}
                        </motion.div>
                        {idx === deleteIndex && !animating && (
                          <div className="text-[10px] uppercase font-bold text-sage flex flex-col items-center">
                            <span>↑</span>
                            <span>Target</span>
                          </div>
                        )}
                      </div>
                    ))}
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

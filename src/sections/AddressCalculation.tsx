import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

type ArrayDimension = '1D' | '2D';

export function AddressCalculation({ globalArray = [] }: { globalArray?: number[] }) {
  const [dimension, setDimension] = useState<ArrayDimension>('1D');
  
  // 1D State
  const [base1D, setBase1D] = useState<number>(1000);
  const [size1D, setSize1D] = useState<number>(4);
  const [len1D, setLen1D] = useState<number>(globalArray.length > 0 ? globalArray.length : 5);
  const [index1D, setIndex1D] = useState<number>(0);
  
  // Sync length with globalArray if 1D and global array changes
  useEffect(() => {
    if (globalArray.length > 0) {
      setLen1D(globalArray.length);
    }
  }, [globalArray]);
  
  // 2D State
  const [base2D, setBase2D] = useState<number>(1000);
  const [size2D, setSize2D] = useState<number>(4);
  const [rows2D, setRows2D] = useState<number>(3);
  const [cols2D, setCols2D] = useState<number>(4);
  const [rowIndex2D, setRowIndex2D] = useState<number>(1);
  const [colIndex2D, setColIndex2D] = useState<number>(2);

  const [calc1D, setCalc1D] = useState<number | null>(null);
  const [calc2D, setCalc2D] = useState<number | null>(null);

  const calculate1D = () => {
    if (index1D < 0 || index1D >= len1D) {
      alert("Index out of bounds");
      return;
    }
    const address = base1D + (index1D * size1D);
    setCalc1D(address);
  };

  const calculate2D = () => {
    if (rowIndex2D < 0 || rowIndex2D >= rows2D || colIndex2D < 0 || colIndex2D >= cols2D) {
      alert("Index out of bounds");
      return;
    }
    const address = base2D + (((rowIndex2D * cols2D) + colIndex2D) * size2D);
    setCalc2D(address);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">01. Array Address Calculation</h2>
        <p className="text-navy/70 text-sm">
          Calculate the exact memory address of an element in 1D and 2D arrays using Base Address and Element Size.
        </p>
      </div>

      <div className="flex border-b-2 border-sand mb-6">
        <button
          onClick={() => { setDimension('1D'); setCalc1D(null); setCalc2D(null); }}
          className={cn("px-6 py-3 font-bold text-sm transition-colors", dimension === '1D' ? 'border-b-4 border-navy text-navy' : 'text-navy/60 hover:text-navy')}
        >
          1D Array
        </button>
        <button
          onClick={() => { setDimension('2D'); setCalc1D(null); setCalc2D(null); }}
          className={cn("px-6 py-3 font-bold text-sm transition-colors", dimension === '2D' ? 'border-b-4 border-navy text-navy' : 'text-navy/60 hover:text-navy')}
        >
          2D Array (Matrix)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Parameters</h3>
            
            {dimension === '1D' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Base Address (Start)</label>
                  <input type="number" value={base1D} onChange={(e) => setBase1D(Number(e.target.value))} className="input-field py-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Element Size (bytes)</label>
                  <input type="number" value={size1D} onChange={(e) => setSize1D(Number(e.target.value))} className="input-field py-2" min="1" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Array Length</label>
                  <input type="number" value={len1D} onChange={(e) => setLen1D(Number(e.target.value))} className="input-field py-2 bg-sand/20" min="1" max="20" disabled={globalArray.length > 0} />
                  {globalArray.length > 0 && <p className="text-[10px] text-sage font-bold mt-1">Synced with Your Array</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Target Index</label>
                  <input type="number" value={index1D} onChange={(e) => setIndex1D(Number(e.target.value))} className="input-field py-2" min="0" />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button onClick={calculate1D} className="btn-primary w-full">Calculate</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Base Address</label>
                  <input type="number" value={base2D} onChange={(e) => setBase2D(Number(e.target.value))} className="input-field py-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">Element Size (bytes)</label>
                  <input type="number" value={size2D} onChange={(e) => setSize2D(Number(e.target.value))} className="input-field py-2" min="1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Rows</label>
                    <input type="number" value={rows2D} onChange={(e) => setRows2D(Number(e.target.value))} className="input-field py-2" min="1" max="10" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Columns</label>
                    <input type="number" value={cols2D} onChange={(e) => setCols2D(Number(e.target.value))} className="input-field py-2" min="1" max="10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Target Row</label>
                    <input type="number" value={rowIndex2D} onChange={(e) => setRowIndex2D(Number(e.target.value))} className="input-field py-2" min="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Target Col</label>
                    <input type="number" value={colIndex2D} onChange={(e) => setColIndex2D(Number(e.target.value))} className="input-field py-2" min="0" />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button onClick={calculate2D} className="btn-primary w-full">Calculate</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VISUALIZATION */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card p-6 min-h-[300px] flex flex-col">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">Memory Visualization</h3>
            
            <div className="flex-1 bg-ivory/50 rounded-xl border border-sand/30 p-6 flex items-center justify-center overflow-x-auto relative">
              {dimension === '1D' ? (
                <div className="w-full">
                  <div className="flex gap-4 justify-start min-w-max pb-4 px-4">
                    {Array.from({ length: Math.min(len1D, 20) }).map((_, i) => {
                      const isTarget = i === index1D && calc1D !== null;
                      const addr = base1D + (i * size1D);
                      const val = globalArray[i] ?? `?`;
                      return (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <span className={cn("text-[10px] font-mono font-bold transition-colors", isTarget ? "text-sage" : "text-navy/50")}>
                            A[{i}]
                          </span>
                          <motion.div 
                            animate={{ y: isTarget ? -4 : 0 }}
                            className={cn(
                              "w-14 h-14 array-block transition-transform",
                              isTarget 
                                ? "array-block-selected z-10" 
                                : "text-navy"
                            )}
                          >
                            {val}
                          </motion.div>
                          <span className={cn("text-[10px] font-mono font-bold transition-colors", isTarget ? "text-sage" : "text-navy/50")}>
                            {addr}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex gap-2 min-w-max pb-2">
                    <div className="w-8"></div>
                    {Array.from({ length: Math.min(cols2D, 10) }).map((_, j) => (
                      <div key={`col-${j}`} className="w-12 sm:w-14 text-center text-[10px] font-mono font-bold text-navy/50">C{j}</div>
                    ))}
                  </div>
                  
                  {Array.from({ length: Math.min(rows2D, 10) }).map((_, i) => (
                    <div key={`row-${i}`} className="flex gap-2 min-w-max items-center">
                      <div className="w-8 text-[10px] font-mono font-bold text-navy/50 text-right pr-2">R{i}</div>
                      {Array.from({ length: Math.min(cols2D, 10) }).map((_, j) => {
                        const isTarget = i === rowIndex2D && j === colIndex2D && calc2D !== null;
                        const addr = base2D + (((i * cols2D) + j) * size2D);
                        return (
                          <div key={`cell-${i}-${j}`} className="flex flex-col items-center">
                            <motion.div 
                              animate={{ y: isTarget ? -2 : 0 }}
                              className={cn(
                                "w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center font-mono font-bold text-xs bg-white border border-sand-dark rounded-md shadow-block transition-all duration-300 transform",
                                isTarget 
                                  ? "bg-sage text-white -translate-y-2 shadow-block-selected border-sage-dark z-10" 
                                  : "hover:shadow-block-hover hover:-translate-y-1 text-navy"
                              )}
                            >
                              <span>[{i}][{j}]</span>
                              <div className={cn("text-[9px] font-mono mt-1", isTarget ? "text-white/80" : "text-navy/50")}>
                                {addr}
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <p className="text-[10px] text-navy/50 mt-4 italic">Row-Major Order visualization</p>
                </div>
              )}
            </div>

            {/* RESULTS */}
            <AnimatePresence mode="wait">
              {(dimension === '1D' ? calc1D : calc2D) !== null && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white border border-sand rounded-xl p-5 overflow-hidden shadow-sm"
                >
                  <h4 className="text-[10px] font-black text-navy/50 uppercase tracking-wider mb-3">Calculation Details</h4>
                  {dimension === '1D' ? (
                    <div className="space-y-2 font-mono text-sm text-navy">
                      <p className="text-navy/70 text-xs">Address(A[i]) = Base + (i × ElementSize)</p>
                      <p>Address = {base1D} + ({index1D} × {size1D})</p>
                      <p>Address = {base1D} + {index1D * size1D}</p>
                      <div className="pt-2 border-t border-sand/50 mt-2">
                        <span className="font-sans font-bold text-xs uppercase text-navy/60 mr-2">Result:</span>
                        <span className="text-lg font-bold text-sage">{calc1D}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 font-mono text-sm text-navy">
                      <p className="text-navy/70 text-xs">Address(A[i][j]) = Base + ((i × Columns) + j) × ElementSize</p>
                      <p>Address = {base2D} + (({rowIndex2D} × {cols2D}) + {colIndex2D}) × {size2D}</p>
                      <p>Address = {base2D} + ({rowIndex2D * cols2D} + {colIndex2D}) × {size2D}</p>
                      <p>Address = {base2D} + ({(rowIndex2D * cols2D) + colIndex2D} × {size2D})</p>
                      <p>Address = {base2D} + {((rowIndex2D * cols2D) + colIndex2D) * size2D}</p>
                      <div className="pt-2 border-t border-sand/50 mt-2">
                        <span className="font-sans font-bold text-xs uppercase text-navy/60 mr-2">Result:</span>
                        <span className="text-lg font-bold text-sage">{calc2D}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

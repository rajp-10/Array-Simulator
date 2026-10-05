import React, { useState } from 'react';
import { AddressCalculation } from './AddressCalculation';
import { Insertion } from './Insertion';
import { Deletion } from './Deletion';
import { LinearSearch } from './LinearSearch';
import { BinarySearch } from './BinarySearch';

interface SimulatorProps {
  globalArray: number[];
  setGlobalArray: React.Dispatch<React.SetStateAction<number[]>>;
}

type OperationType = 'address' | 'insert' | 'delete' | 'linear' | 'binary' | null;

export const Simulator: React.FC<SimulatorProps> = ({ globalArray, setGlobalArray }) => {
  const [arrayInput, setArrayInput] = useState<string>(globalArray.join(', '));
  const [activeOperation, setActiveOperation] = useState<OperationType>(null);

  const handleCreateArray = () => {
    const parsed = arrayInput.split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
      
    if (parsed.length > 0) {
      setGlobalArray(parsed);
      // Reset active operation to ensure clean state with new array
      if (activeOperation) setActiveOperation(null);
    } else {
      alert("Please enter a valid comma-separated list of numbers.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* ARRAY INPUT SECTION */}
      <div className="card p-6 md:p-8">
        <h2 className="text-xl font-bold mb-2">YOUR ARRAY</h2>
        <p className="text-navy/70 mb-6 text-sm">Create or edit the array you want to visualize.</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            className="input-field max-w-lg"
            placeholder="e.g. 10, 20, 30, 40, 50"
          />
          <button 
            onClick={handleCreateArray}
            className="btn-primary whitespace-nowrap"
          >
            CREATE ARRAY
          </button>
        </div>

        {/* ARRAY VISUALIZATION */}
        <div className="bg-ivory/50 rounded-xl p-6 border border-sand/30 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {globalArray.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="array-block w-16 h-16">
                  {val}
                </div>
                <div className="text-xs font-mono text-navy/60 font-bold">{idx}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPERATIONS OR ACTIVE OPERATION */}
      {!activeOperation ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OperationCard 
            title="01. ARRAY ADDRESS CALCULATION"
            desc="Calculate the memory address of a specific element in 1D and 2D arrays."
            onClick={() => setActiveOperation('address')}
          />
          <OperationCard 
            title="02. ARRAY INSERTION"
            desc="Insert a new element at a specific index and watch elements shift right."
            onClick={() => setActiveOperation('insert')}
          />
          <OperationCard 
            title="03. ARRAY DELETION"
            desc="Remove an element from a specific index and watch elements shift left."
            onClick={() => setActiveOperation('delete')}
          />
          <OperationCard 
            title="04. LINEAR SEARCH"
            desc="Search for an element sequentially from the first index to the last."
            onClick={() => setActiveOperation('linear')}
          />
          <OperationCard 
            title="05. BINARY SEARCH"
            desc="Efficiently search for an element in a sorted array using divide and conquer."
            onClick={() => setActiveOperation('binary')}
          />
        </div>
      ) : (
        <div className="card p-6 md:p-8 animate-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => setActiveOperation(null)}
            className="btn-secondary text-sm mb-6 flex items-center gap-2"
          >
            ← Return to Operations
          </button>
          
          <div className="mt-2">
            {activeOperation === 'address' && <AddressCalculation globalArray={globalArray} />}
            {activeOperation === 'insert' && <Insertion globalArray={globalArray} setGlobalArray={setGlobalArray} />}
            {activeOperation === 'delete' && <Deletion globalArray={globalArray} setGlobalArray={setGlobalArray} />}
            {activeOperation === 'linear' && <LinearSearch globalArray={globalArray} />}
            {activeOperation === 'binary' && <BinarySearch globalArray={globalArray} />}
          </div>
        </div>
      )}
    </div>
  );
};

const OperationCard = ({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) => (
  <div className="card p-6 flex flex-col h-full hover:border-navy transition-colors group cursor-pointer" onClick={onClick}>
    <h3 className="text-sm font-black text-navy mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-navy/70 text-sm mb-6 flex-1">{desc}</p>
    <button className="text-sage font-bold text-sm text-left group-hover:text-navy transition-colors flex items-center gap-1">
      Open Operation <span>→</span>
    </button>
  </div>
);

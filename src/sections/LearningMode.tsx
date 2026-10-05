import React, { useState } from 'react';

const TOPICS = [
  {
    id: 'intro',
    title: '1. What is an Array?',
    content: (
      <div className="space-y-4">
        <p>An array is a collection of elements of the same data type stored in contiguous (side-by-side) memory locations. It is one of the simplest and most widely used data structures.</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm">
          Memory: [Block 1] [Block 2] [Block 3] [Block 4]
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Because elements are stored sequentially, you can instantly calculate exactly where any element is located if you know the starting address and the size of each element.</p>
      </div>
    )
  },
  {
    id: '1d',
    title: '2. 1D Array',
    content: (
      <div className="space-y-4">
        <p>A 1-Dimensional (1D) array is a linear list of elements. Each element is accessed by a single index, usually starting at 0.</p>
        <div className="bg-ivory p-4 rounded-lg flex gap-4 overflow-x-auto border border-sand">
          <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 array-block shadow-none text-sm">10</div><span className="text-[10px] font-bold text-navy/50">idx: 0</span></div>
          <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 array-block shadow-none text-sm">20</div><span className="text-[10px] font-bold text-navy/50">idx: 1</span></div>
          <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 array-block shadow-none text-sm">30</div><span className="text-[10px] font-bold text-navy/50">idx: 2</span></div>
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Indices are used as offsets. Index 0 means the element is 0 steps away from the beginning of the array.</p>
      </div>
    )
  },
  {
    id: '2d',
    title: '3. 2D Array',
    content: (
      <div className="space-y-4">
        <p>A 2-Dimensional (2D) array can be visualized as a grid or a table with rows and columns. In computer memory, this grid is still stored as a single flat linear sequence.</p>
        <div className="bg-ivory p-4 rounded-lg flex flex-col gap-2 border border-sand">
          <div className="flex gap-2">
            <div className="w-10 h-10 array-block shadow-none text-sm">10</div>
            <div className="w-10 h-10 array-block shadow-none text-sm">20</div>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 array-block shadow-none text-sm">30</div>
            <div className="w-10 h-10 array-block shadow-none text-sm">40</div>
          </div>
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Row-major order means storing the entire first row in memory sequentially, followed immediately by the entire second row, and so on.</p>
      </div>
    )
  },
  {
    id: 'address',
    title: '4. Array Address Calculation',
    content: (
      <div className="space-y-4">
        <p>Address calculation allows the computer to find the exact memory byte where an element is stored without searching.</p>
        <p><strong>1D Formula:</strong> Base Address + (Index × Element Size)</p>
        <p><strong>2D Formula (Row-Major):</strong> Base + ((Row × TotalColumns) + Column) × Element Size</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm border-l-4 border-sage">
          Example 1D: Base = 1000, Size = 4 bytes.<br/>
          Address of Index 2 = 1000 + (2 × 4) = 1008
        </div>
      </div>
    )
  },
  {
    id: 'insertion',
    title: '5. Array Insertion',
    content: (
      <div className="space-y-4">
        <p>Inserting a new element into an array requires shifting existing elements to the right to make room.</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm">
          Original: [10] [20] [30]<br/>
          Insert 99 at index 1:<br/>
          Shift 30 right: [10] [20] [  ] [30]<br/>
          Shift 20 right: [10] [  ] [20] [30]<br/>
          Place 99:       [10] [99] [20] [30]
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>You must start shifting from the end of the array backwards to avoid overwriting elements.</p>
      </div>
    )
  },
  {
    id: 'deletion',
    title: '6. Array Deletion',
    content: (
      <div className="space-y-4">
        <p>Deleting an element from an array requires shifting the remaining elements to the left to close the gap.</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm">
          Original: [10] [99] [20] [30]<br/>
          Delete index 1:<br/>
          Remove 99:     [10] [  ] [20] [30]<br/>
          Shift 20 left: [10] [20] [  ] [30]<br/>
          Shift 30 left: [10] [20] [30]
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Shifting begins directly after the deleted index and moves leftwards towards the gap.</p>
      </div>
    )
  },
  {
    id: 'linear',
    title: '7. Linear Search',
    content: (
      <div className="space-y-4">
        <p>Linear search is the simplest search method. It examines each element sequentially starting from the first index until the target is found.</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm">
          Target: 30<br/>
          Check idx 0 (10) - No<br/>
          Check idx 1 (20) - No<br/>
          Check idx 2 (30) - Yes! Stop.
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Linear search works on any array, whether the data is sorted or completely randomized.</p>
      </div>
    )
  },
  {
    id: 'binary',
    title: '8. Binary Search',
    content: (
      <div className="space-y-4">
        <p>Binary search is a much faster divide-and-conquer algorithm that works by repeatedly dividing the search interval in half.</p>
        <div className="bg-ivory p-4 rounded-lg font-mono text-sm">
          Target: 60 | Array: [10, 20, 30, 40, 50, 60, 70]<br/>
          Mid is 40. 60 is larger.<br/>
          New range: [50, 60, 70]<br/>
          Mid is 60. Found!
        </div>
        <p className="font-bold">Important Concept:</p>
        <p>Binary search STRICTLY requires the array to be sorted beforehand. It will fail on an unsorted array.</p>
      </div>
    )
  }
];

export const LearningMode: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0].id);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-2 uppercase tracking-wider">Learning Mode</h2>
        <p className="text-navy/70">Review the core concepts behind array operations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-2">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`p-4 text-left rounded-lg font-bold transition-all border-2 ${
                activeTopic === topic.id 
                  ? 'bg-navy text-white border-navy shadow-md translate-x-2' 
                  : 'bg-white text-navy border-transparent hover:border-sand hover:bg-ivory'
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3">
          <div className="card p-6 md:p-8 min-h-[400px]">
            {TOPICS.map((topic) => (
              <div 
                key={topic.id} 
                className={`${activeTopic === topic.id ? 'block animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}`}
              >
                <h3 className="text-2xl font-black mb-6 text-navy border-b-2 border-sand-dark pb-4">{topic.title}</h3>
                <div className="text-lg leading-relaxed text-navy/90">
                  {topic.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

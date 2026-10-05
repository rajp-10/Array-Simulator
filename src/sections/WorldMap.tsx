
import { cn } from '../utils/cn';

export type LevelId = 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'learning';

interface WorldMapProps {
  completedLevels: LevelId[];
  onSelectLevel: (level: LevelId) => void;
}

const mapNodes = [
  { id: 'level1', title: 'Memory Valley', desc: 'Address Calc', x: 20, y: 30, icon: '📍', color: 'bg-ivory border-sand text-navy', type: 'valley' },
  { id: 'level2', title: 'Insertion Bridge', desc: 'Add Block', x: 50, y: 15, icon: '🌉', color: 'bg-sand border-navy text-sage', type: 'bridge' },
  { id: 'level3', title: 'Deletion Trail', desc: 'Remove Block', x: 80, y: 40, icon: '🛤️', color: 'bg-sand border-sage text-navy', type: 'trail' },
  { id: 'level4', title: 'Search Forest', desc: 'Linear Search', x: 65, y: 75, icon: '🌲', color: 'bg-sage border-ivory text-navy', type: 'forest' },
  { id: 'level5', title: 'Binary Tower', desc: 'Binary Search', x: 25, y: 70, icon: '🏰', color: 'bg-navy border-ivory text-sage', type: 'tower' },
  { id: 'learning', title: 'Journal', desc: 'Theory', x: 10, y: 10, icon: '📖', color: 'bg-ivory border-navy text-sage', type: 'book' },
] as const;

export function WorldMap({ completedLevels, onSelectLevel }: WorldMapProps) {
  return (
    <div className="w-full relative rounded-3xl border-4 border-navy overflow-hidden shadow-[8px_8px_0_0_#463C32] h-[650px] bg-ivory flex items-center justify-center">
      
      {/* 3D Container */}
      <div className="absolute w-[800px] h-[800px] transform-style-3d rotate-x-60 rotate-z-neg-45 scale-90 sm:scale-100 flex items-center justify-center transition-transform duration-1000 ease-out hover:scale-105 -translate-y-8">
        
        {/* Terrain Base */}
        <div className="absolute inset-0 bg-sand border-8 border-navy shadow-[20px_20px_0_0_rgba(36,52,71,0.2)] rounded-3xl overflow-hidden grid grid-cols-10 grid-rows-10">
          {/* Grid lines */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-navy/10 w-full h-full" />
          ))}
        </div>

        {/* Isometric Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none transform-style-3d translate-z-1" overflow="visible">
          <path d="M 160 240 L 400 120 L 640 320 L 520 600 L 200 560" fill="none" stroke="#223247" strokeWidth="8" strokeDasharray="16 16" className="opacity-40 drop-shadow-md" />
        </svg>

        {/* Nodes */}
        {mapNodes.map((node) => {
          const isCompleted = completedLevels.includes(node.id as LevelId);
          
          return (
            <div
              key={node.id}
              className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer transform-style-3d"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => onSelectLevel(node.id as LevelId)}
            >
              {/* 3D Structure */}
              <div className="relative w-full h-full transform-style-3d group-hover:translate-z-8 transition-transform duration-300">
                
                {/* Visual Block Representation */}
                <div className={cn(
                  "absolute inset-0 m-auto w-16 h-16 border-4 flex items-center justify-center text-3xl shadow-[4px_4px_0_0_#463C32] group-hover:shadow-[8px_8px_0_0_#463C32] transition-all duration-300 transform group-hover:-translate-y-2",
                  node.color,
                  node.type === 'tower' ? "h-24 -mt-12" : "",
                  node.type === 'valley' ? "rounded-full" : "rounded-xl"
                )}>
                  {node.icon}
                  
                  {isCompleted && (
                    <div className="absolute -top-3 -right-3 bg-sage text-ivory w-6 h-6 rounded-sm text-xs font-black flex items-center justify-center border-2 border-navy transform rotate-x-neg-60 rotate-z-45 shadow-sm">✓</div>
                  )}
                </div>
                
                {/* Floating Label (Counter-rotated to face camera) */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-ivory border-2 border-navy px-4 py-2 rounded-lg shadow-[2px_2px_0_0_#243447] w-max transform rotate-x-neg-60 rotate-z-45 origin-top text-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all pointer-events-none">
                  <h3 className="text-sm font-black text-navy leading-tight uppercase tracking-wide">{node.title}</h3>
                  <p className="text-[10px] font-bold text-sage-dark uppercase tracking-wider">{node.desc}</p>
                  
                  {/* Enter Quest CTA on hover */}
                  <div className="h-0 overflow-hidden group-hover:h-6 transition-all duration-300 mt-0 group-hover:mt-2">
                    <span className="text-[10px] font-black bg-navy text-ivory px-2 py-1 rounded inline-block">ENTER QUEST</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

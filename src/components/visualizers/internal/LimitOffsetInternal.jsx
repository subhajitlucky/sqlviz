import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Box, ArrowRight } from 'lucide-react';

const LimitOffsetInternal = () => {
  const [offset, setOffset] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrent(prev => {
          if (prev >= offset + 5) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, offset]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Box className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Limit_Offset_Treadmill</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[8px] text-muted-foreground">OFFSET:</label>
          <input 
            type="range" min="0" max="50" step="5" 
            value={offset} 
            onChange={(e) => setOffset(parseInt(e.target.value))}
            className="w-20 accent-primary"
          />
          <button onClick={() => { setCurrent(0); setIsPlaying(true); }} className="p-1 text-primary hover:text-accent">
            <Play size={16} />
          </button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Belt */}
        <div className="flex items-center space-x-2 w-[1000px] absolute transition-transform duration-100" style={{ transform: `translateX(-${current * 40}px)` }}>
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-8 h-8 border-2 flex items-center justify-center text-[8px] shrink-0
                ${i < offset ? 'border-destructive/20 text-destructive/40' : i < offset + 5 ? 'border-sql-green bg-sql-green/10 text-white font-black' : 'border-db-border text-slate-700'}`}
            >
              {i}
            </div>
          ))}
        </div>

        {/* The Viewport */}
        <div className="z-10 w-48 h-12 border-4 border-primary rounded-lg flex items-center justify-center relative shadow-[0_0_30px_var(--primary)]">
          <div className="absolute -top-6 text-[8px] text-primary font-black">CLIENT_WINDOW (LIMIT 5)</div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 text-[8px] text-slate-600 font-black space-y-1">
          <p>RED: DISCARDED ROWS (CPU/IO WASTED)</p>
          <p>GREEN: RETURNED ROWS</p>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {`> OFFSET ${offset} LIMIT 5: The database must still generate and skip ${offset} rows before returning the 5 you want. Large offsets are extremely expensive because the engine performs the full retrieval and filtering work, only to throw the results away.`}
        </p>
      </div>
    </div>
  );
};

export default LimitOffsetInternal;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Clock, ArrowRight } from 'lucide-react';

const NestedLoopJoin = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [outerIdx, setOuterIdx] = useState(0);
  const [innerIdx, setInnerIdx] = useState(0);
  const [indexed, setIndexed] = useState(false);

  const outerTable = [1, 2, 3, 4, 5];
  const innerTable = [1, 2, 3, 4, 5];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        if (indexed) {
          // With index, inner scan is skipped
          setOuterIdx(prev => (prev + 1) % outerTable.length);
          setInnerIdx(outerIdx); // Jumps to match
        } else {
          setInnerIdx(prev => {
            if (prev + 1 >= innerTable.length) {
              setOuterIdx(o => (o + 1) % outerTable.length);
              return 0;
            }
            return prev + 1;
          });
        }
      }, indexed ? 800 : 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, outerIdx, indexed]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Nested_Loop_Simulator</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIndexed(!indexed)}
            className={`px-3 py-1 border text-[9px] font-black transition-colors ${indexed ? 'bg-sql-cyan/20 border-sql-cyan text-sql-cyan' : 'bg-muted border-border text-muted-foreground'}`}
          >
            {indexed ? 'Index_Active' : 'No_Index'}
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 text-primary hover:text-accent">
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
          <button onClick={() => { setOuterIdx(0); setInnerIdx(0); setIsPlaying(false); }} className="p-1 text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-10 flex justify-center items-center space-x-20 aspect-video relative">
        {/* Outer Table */}
        <div className="space-y-2">
          <span className="text-[8px] text-slate-500 text-center block">Outer_Table</span>
          {outerTable.map((id, i) => (
            <motion.div 
              key={i}
              animate={{ 
                scale: outerIdx === i ? 1.1 : 1,
                borderColor: outerIdx === i ? '#336791' : '#232735',
                backgroundColor: outerIdx === i ? 'rgba(51, 103, 145, 0.2)' : 'transparent'
              }}
              className="w-12 h-10 border flex items-center justify-center text-[10px]"
            >
              ID_{id}
            </motion.div>
          ))}
        </div>

        {/* The Connector */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <ArrowRight className={`text-sql-gold ${isPlaying ? 'animate-pulse' : ''}`} />
          <div className="text-[8px] text-sql-gold font-black">COMPARISON</div>
        </div>

        {/* Inner Table */}
        <div className="space-y-2">
          <span className="text-[8px] text-slate-500 text-center block">Inner_Table</span>
          {innerTable.map((id, i) => (
            <motion.div 
              key={i}
              animate={{ 
                scale: innerIdx === i ? 1.1 : 1,
                borderColor: innerIdx === i ? (outerTable[outerIdx] === id ? '#00ff9d' : '#ef4444') : '#232735',
                backgroundColor: innerIdx === i ? (outerTable[outerIdx] === id ? 'rgba(0, 255, 157, 0.1)' : 'rgba(239, 68, 68, 0.1)') : 'transparent'
              }}
              className="w-12 h-10 border flex items-center justify-center text-[10px]"
            >
              ID_{id}
            </motion.div>
          ))}
        </div>

        {/* Cost Meter */}
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-[8px] text-muted-foreground">Total_Iterations</div>
          <div className="text-xl font-black text-white">{outerIdx * innerTable.length + innerIdx}</div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {indexed 
            ? "> INDEXED LOOP: The engine uses the inner table's index to jump directly to the matching row. O(N * log M)."
            : "> CARTESIAN WALK: For every row in the outer table, the engine must scan the entire inner table. O(N * M)."}
        </p>
      </div>
    </div>
  );
};

export default NestedLoopJoin;

import React from 'react';
import { motion } from 'framer-motion';

const IndexSeekVisualizer = () => {
  return (
    <div className="w-full h-64 bg-db-black border border-db-border relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl transition-all">
      {/* Structural background lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:12px_12px]" />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 100 60">
        {/* Simplified Tree Paths */}
        <line x1="50" y1="10" x2="25" y2="30" stroke="currentColor" className="text-db-border" strokeWidth="0.3" />
        <line x1="50" y1="10" x2="75" y2="30" stroke="currentColor" className="text-db-border" strokeWidth="0.3" />
        <line x1="75" y1="30" x2="65" y2="50" stroke="currentColor" className="text-db-border" strokeWidth="0.3" />
        <line x1="75" y1="30" x2="85" y2="50" stroke="currentColor" className="text-db-border" strokeWidth="0.3" />

        {/* Seek Path Animation */}
        <motion.path
          d="M 50 10 L 75 30 L 85 50"
          fill="none"
          stroke="currentColor"
          className="text-sql-cyan"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Target Node Glow */}
        <motion.circle
          cx="85" cy="50" r="4"
          fill="#00e5ff"
          className="opacity-20"
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Tree Nodes */}
        {[
          { x: 50, y: 10 }, { x: 25, y: 30 }, { x: 75, y: 30 },
          { x: 15, y: 50 }, { x: 35, y: 50 }, { x: 65, y: 50 }, { x: 85, y: 50 }
        ].map((p, i) => (
          <rect 
            key={i} 
            x={p.x - 1} y={p.y - 1} 
            width="2" height="2" 
            fill="currentColor" 
            className={`${p.x === 85 && p.y === 50 ? 'text-sql-cyan' : 'text-db-border'}`}
          />
        ))}
      </svg>

      <div className="absolute top-4 left-4 font-mono uppercase">
        <div className="text-[8px] text-slate-600 tracking-widest font-black">SEARCH_PARAMETER</div>
        <div className="text-[10px] text-sql-cyan font-bold">KEY_ID: 180</div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-slate-600 font-black tracking-[0.2em] flex items-center bg-db-surface px-2 py-1 border border-db-border">
        BTREE_LOOKUP: O(LOG_N)
      </div>
    </div>
  );
};

export default IndexSeekVisualizer;

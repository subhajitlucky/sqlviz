import React from 'react';
import { motion } from 'framer-motion';

const IndexSeekVisualizer = () => {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6">
      <svg className="w-full h-full" viewBox="0 0 100 60">
        {/* Simplified Tree Paths */}
        <line x1="50" y1="10" x2="25" y2="30" stroke="#1e293b" strokeWidth="0.5" />
        <line x1="50" y1="10" x2="75" y2="30" stroke="#1e293b" strokeWidth="0.5" />
        <line x1="75" y1="30" x2="65" y2="50" stroke="#1e293b" strokeWidth="0.5" />
        <line x1="75" y1="30" x2="85" y2="50" stroke="#1e293b" strokeWidth="0.5" />

        {/* Seek Path Animation */}
        <motion.path
          d="M 50 10 L 75 30 L 85 50"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Target Node */}
        <motion.circle
          cx="85" cy="50" r="3"
          fill="#0ea5e9"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Tree Nodes */}
        {[
          { x: 50, y: 10 }, { x: 25, y: 30 }, { x: 75, y: 30 },
          { x: 15, y: 50 }, { x: 35, y: 50 }, { x: 65, y: 50 }, { x: 85, y: 50 }
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#1e293b" stroke="#334155" strokeWidth="0.2" />
        ))}
      </svg>

      <div className="absolute top-4 left-4 font-mono">
        <div className="text-[10px] text-slate-500 uppercase">Search Key</div>
        <div className="text-xs text-sapphire-400 font-bold">VAL: 180</div>
      </div>

      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest flex items-center">
        Point Lookup O(log N)
      </div>
    </div>
  );
};

export default IndexSeekVisualizer;

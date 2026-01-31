import React from 'react';
import { motion } from 'framer-motion';

const JoinVisualizer = () => {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm flex items-center justify-between">
        {/* Table A */}
        <div className="flex flex-col space-y-2">
          <span className="text-[10px] text-slate-500 font-mono text-center uppercase">Table A</span>
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={`a-${i}`}
              className="w-16 h-8 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              PK: {i}
            </motion.div>
          ))}
        </div>

        {/* Join Logic */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-12 h-12 rounded-full border-2 border-sapphire-500/50 flex items-center justify-center bg-sapphire-950/30"
          >
            <div className="text-sapphire-400 font-bold text-xs font-mono">⋈</div>
          </motion.div>
          <div className="h-24 w-0.5 bg-gradient-to-b from-transparent via-slate-800 to-transparent"></div>
        </div>

        {/* Table B */}
        <div className="flex flex-col space-y-2">
          <span className="text-[10px] text-slate-500 font-mono text-center uppercase">Table B</span>
          {[2, 4, 5, 6].map(i => (
            <motion.div
              key={`b-${i}`}
              className="w-16 h-8 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              FK: {i}
            </motion.div>
          ))}
        </div>

        {/* Dynamic Join Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 64 84 L 120 120 L 176 84"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 64 156 L 120 120 L 176 156"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
        Relational Join Intersection
      </div>
    </div>
  );
};

export default JoinVisualizer;

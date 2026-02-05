import React from 'react';
import { motion } from 'framer-motion';

const JoinVisualizer = () => {
  return (
    <div className="w-full h-64 bg-db-black border border-db-border relative overflow-hidden flex items-center justify-center p-4 shadow-2xl transition-all">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:12px_12px]" />
      
      <div className="relative z-10 w-full max-w-sm flex items-center justify-between">
        {/* Table A */}
        <div className="flex flex-col space-y-2">
          <span className="text-[8px] text-slate-600 font-black tracking-widest text-center uppercase">SRC_PRIMARY</span>
          {[1, 2, 3, 4].map(i => (
            <motion.div
              key={`a-${i}`}
              className="w-16 h-8 bg-db-panel border border-db-border flex items-center justify-center text-[9px] text-slate-500 font-mono font-bold uppercase"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              PK: 0{i}
            </motion.div>
          ))}
        </div>

        {/* Join Operator */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              borderColor: ['rgba(0,229,255,0.2)', 'rgba(0,229,255,0.5)', 'rgba(0,229,255,0.2)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-12 h-12 border-2 flex items-center justify-center bg-db-surface shadow-[0_0_20px_rgba(0,229,255,0.1)]"
          >
            <div className="text-sql-cyan font-black text-sm font-mono tracking-tighter">JOIN</div>
          </motion.div>
          <div className="h-20 w-[1px] bg-db-border"></div>
        </div>

        {/* Table B */}
        <div className="flex flex-col space-y-2">
          <span className="text-[8px] text-slate-600 font-black tracking-widest text-center uppercase">SRC_FOREIGN</span>
          {[2, 4, 5, 6].map(i => (
            <motion.div
              key={`b-${i}`}
              className="w-16 h-8 bg-db-panel border border-db-border flex items-center justify-center text-[9px] text-slate-500 font-mono font-bold uppercase"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              FK: 0{i}
            </motion.div>
          ))}
        </div>

        {/* Dynamic Vector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path
            d="M 64 84 L 120 120 L 176 84"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 64 156 L 120 120 L 176 156"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-slate-600 font-black tracking-[0.2em] flex items-center bg-db-surface px-2 py-1 border border-db-border">
        OP_HASH_JOIN: READY
      </div>
    </div>
  );
};

export default JoinVisualizer;

import React from 'react';
import { motion } from 'framer-motion';

const ScanVisualizer = () => {
  const pages = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="w-full h-64 bg-db-black border border-db-border relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl transition-all">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:12px_12px]" />
      
      <div className="grid grid-cols-4 gap-4 relative z-10">
        {pages.map((page, i) => (
          <div key={i} className="relative w-12 h-10 rounded-none border border-db-border bg-db-surface overflow-hidden group">
            {/* Page content lines */}
            <div className="p-1.5 space-y-1.5">
              <div className="h-0.5 w-full bg-slate-800"></div>
              <div className="h-0.5 w-3/4 bg-slate-800"></div>
              <div className="h-0.5 w-full bg-slate-800"></div>
            </div>
            
            {/* Scan highlight */}
            <motion.div
              className="absolute inset-0 bg-sql-cyan/10 border border-sql-cyan/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: pages.length * 0.08,
                delay: i * 0.08
              }}
            />
          </div>
        ))}
      </div>

      {/* Industrial Progress Bar */}
      <div className="w-48 mt-8 h-1.5 bg-db-panel border border-db-border overflow-hidden relative">
        <motion.div
          className="h-full bg-sql-cyan shadow-[0_0_15px_#00e5ff] w-1/3"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-slate-600 font-black tracking-[0.2em] flex items-center bg-db-surface px-2 py-1 border border-db-border">
        <motion.div 
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-1 h-1 bg-sql-cyan mr-2"
        />
        OP_SEQ_SCAN: O(N)
      </div>
    </div>
  );
};

export default ScanVisualizer;

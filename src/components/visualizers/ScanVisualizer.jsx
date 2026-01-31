import React from 'react';
import { motion } from 'framer-motion';

const ScanVisualizer = () => {
  const pages = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="w-full h-64 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 transition-colors shadow-sm">
      <div className="grid grid-cols-4 gap-3">
        {pages.map((page, i) => (
          <div key={i} className="relative w-12 h-10 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Page content lines */}
            <div className="p-1 space-y-1">
              <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-0.5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            
            {/* Scan highlight */}
            <motion.div
              className="absolute inset-0 bg-sapphire-500/20 border border-sapphire-500/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: pages.length * 0.1,
                delay: i * 0.1
              }}
            />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-6 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
        <motion.div
          className="h-full bg-sapphire-500 shadow-[0_0_10px_#0ea5e9]"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
        <motion.div 
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"
        />
        Full Table Scan O(N)
      </div>
    </div>
  );
};

export default ScanVisualizer;

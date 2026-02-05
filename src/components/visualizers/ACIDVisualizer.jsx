import React from 'react';
import { motion } from 'framer-motion';

const ACIDVisualizer = () => {
  const letters = [
    { char: 'A', name: 'Atomicity', desc: 'ALL_OR_NOTHING' },
    { char: 'C', name: 'Consistency', desc: 'VALID_TRANSITION' },
    { char: 'I', name: 'Isolation', desc: 'CONCURRENCY_LOCK' },
    { char: 'D', name: 'Durability', desc: 'NON_VOLATILE' },
  ];

  return (
    <div className="w-full h-64 bg-db-black border border-db-border relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
      <div className="grid grid-cols-2 gap-px w-full h-full bg-db-border border border-db-border">
        {letters.map((item, i) => (
          <motion.div
            key={item.char}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center justify-center bg-db-surface hover:bg-db-panel transition-all group relative overflow-hidden"
          >
            {/* Corner decorator */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-db-border group-hover:border-sql-cyan transition-colors" />
            
            <motion.span 
              className="text-3xl font-black text-sql-cyan mb-1 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              {item.char}
            </motion.span>
            
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-transparent group-hover:border-sql-cyan transition-all">
              {item.name}
            </span>
            
            <span className="text-[7px] text-slate-600 font-mono font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; {item.desc}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Structural Scanner Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        animate={{ 
          backgroundPosition: ['0px 0px', '0px 40px']
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px)', backgroundSize: '100% 40px' }}
      />
    </div>
  );
};

export default ACIDVisualizer;

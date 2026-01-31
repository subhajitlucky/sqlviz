import React from 'react';
import { motion } from 'framer-motion';

const ACIDVisualizer = () => {
  const letters = [
    { char: 'A', name: 'Atomicity', desc: 'All or Nothing' },
    { char: 'C', name: 'Consistency', desc: 'Valid State' },
    { char: 'I', name: 'Isolation', desc: 'Concurrent Safe' },
    { char: 'D', name: 'Durability', desc: 'Committed Forever' },
  ];

  return (
    <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        {letters.map((item, i) => (
          <motion.div
            key={item.char}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-sapphire-500/50 transition-colors group"
          >
            <motion.span 
              className="text-2xl font-black text-sapphire-500 mb-1"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              {item.char}
            </motion.span>
            <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter">{item.name}</span>
            <span className="text-[8px] text-slate-500 font-mono text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.desc}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Background Pulsing Pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default ACIDVisualizer;

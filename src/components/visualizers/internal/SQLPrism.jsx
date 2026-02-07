import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Play, Search, Cpu, Database, Table } from 'lucide-react';

const SQLPrism = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Code className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">The_Declarative_Prism</span>
        </div>
        <button 
          onClick={() => setActive(!active)}
          className="px-4 py-1 bg-sql-blue text-white text-[9px] font-black skew-x-[-12deg]"
        >
          <span className="skew-x-[12deg]">{active ? 'RESET_PRISM' : 'EMIT_INTENT'}</span>
        </button>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Intent Beam */}
        <div className="flex items-center space-x-4 absolute left-10 top-1/2 -translate-y-1/2">
          <div className="text-[8px] font-black text-primary">INTENT (SQL)</div>
          <div className="w-20 h-1 bg-primary relative">
            {active && (
              <motion.div 
                initial={{ left: -20 }} animate={{ left: '100%' }} transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-0 w-4 h-full bg-sql-cyan shadow-[0_0_10px_var(--sql-cyan)]"
              />
            )}
          </div>
        </div>

        {/* The Prism */}
        <div className="w-32 h-32 relative flex items-center justify-center">
          <motion.div 
            animate={{ rotate: active ? 360 : 0 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-db-border rotate-45"
          />
          <div className="z-10 bg-db-panel p-4 border border-primary text-primary shadow-[0_0_30px_rgba(51,103,145,0.3)]">
            <Search size={32} />
          </div>
        </div>

        {/* The Refracted Execution Paths */}
        <AnimatePresence>
          {active && (
            <>
              <motion.div 
                initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x: 150, y: -80 }}
                className="absolute flex items-center space-x-4 text-sql-cyan"
              >
                <div className="w-20 h-[1px] bg-sql-cyan" />
                <div className="flex flex-col items-center">
                  <Database size={20} />
                  <span className="text-[7px] mt-1">INDEX_SEEK</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x: 150, y: 0 }}
                className="absolute flex items-center space-x-4 text-sql-gold"
              >
                <div className="w-20 h-[1px] bg-sql-gold" />
                <div className="flex flex-col items-center">
                  <Cpu size={20} />
                  <span className="text-[7px] mt-1">NESTED_JOIN</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x: 150, y: 80 }}
                className="absolute flex items-center space-x-4 text-sql-green"
              >
                <div className="w-20 h-[1px] bg-sql-green" />
                <div className="flex flex-col items-center">
                  <Table size={20} />
                  <span className="text-[7px] mt-1">MATERIALIZE</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> SQL is Declarative. You specify WHAT you want (the intent beam). The Database Engine (the prism) handles the HOW by splitting that intent into a complex web of physical operations."}
        </p>
      </div>
    </div>
  );
};

export default SQLPrism;

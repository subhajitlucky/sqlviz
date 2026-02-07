import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Filter, GitMerge, Layout, Terminal } from 'lucide-react';

const ExecutionPlanInternal = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Logical_Execution_DAG</span>
        </div>
        <button onClick={() => setActive(!active)} className="px-4 py-1 bg-primary text-white text-[9px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">EXPLAIN_ANALYZE</span></button>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* Top: Result */}
        <div className="mb-10 w-24 h-12 bg-sql-green/10 border-2 border-sql-green flex items-center justify-center text-sql-green relative">
          <Layout size={16} />
          <span className="ml-2 text-[8px] font-black">RESULT</span>
          {active && <motion.div initial={{ y: 20 }} animate={{ y: -50, opacity: 0 }} transition={{ duration: 1, repeat: Infinity }} className="absolute text-[6px]">10 ROWS</motion.div>}
        </div>

        {/* Level 1: Filter */}
        <div className="mb-10 w-32 h-12 bg-sql-gold/10 border-2 border-sql-gold flex items-center justify-center text-sql-gold relative">
          <Filter size={16} />
          <span className="ml-2 text-[8px] font-black">FILTER (age {'>'} 25)</span>
          <div className="absolute -top-10 left-1/2 w-[2px] h-10 bg-db-border -translate-x-1/2" />
        </div>

        {/* Level 2: Join */}
        <div className="mb-10 w-40 h-14 bg-primary/10 border-2 border-primary flex items-center justify-center text-primary relative">
          <GitMerge size={16} />
          <span className="ml-2 text-[8px] font-black">HASH_INNER_JOIN</span>
          <div className="absolute -top-10 left-1/2 w-[2px] h-10 bg-db-border -translate-x-1/2" />
        </div>

        {/* Level 3: Scans */}
        <div className="flex space-x-10 relative">
          <div className="absolute -top-10 left-1/2 w-48 h-10 border-t-2 border-x-2 border-db-border -translate-x-1/2 rounded-t-lg" />
          
          <div className="w-24 h-12 bg-db-panel border-2 border-db-border flex items-center justify-center text-slate-500">
            <FileSearch size={14} />
            <span className="ml-2 text-[7px] font-black">SEQ_SCAN (users)</span>
          </div>

          <div className="w-24 h-12 bg-db-panel border-2 border-db-border flex items-center justify-center text-slate-500">
            <FileSearch size={14} />
            <span className="ml-2 text-[7px] font-black">INDEX_SEEK (orders)</span>
          </div>
        </div>

        {/* Cost labels */}
        {active && (
          <div className="absolute top-4 right-4 text-right space-y-1">
            <div className="text-[7px] text-muted-foreground">Estimated_Cost</div>
            <div className="text-xl font-black text-white">142.50</div>
          </div>
        )}
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> AN EXECUTION PLAN is a tree of physical operators. The engine reads the tree from BOTTOM TO TOP. Data is pulled from storage nodes, transformed by joins/filters, and finally emitted as the result set."}
        </p>
      </div>
    </div>
  );
};

export default ExecutionPlanInternal;

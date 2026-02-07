import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Search, AlertTriangle } from 'lucide-react';

const IndexMisuseInternal = () => {
  const [useFunction, setUseFunction] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Sargable_Predicate_Check</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setUseFunction(!useFunction)}
            className={`px-3 py-1 border text-[9px] font-black ${useFunction ? 'bg-destructive/20 text-destructive border-destructive' : 'bg-sql-green/20 text-sql-green border-sql-green'}`}
          >
            {useFunction ? 'Wrapped_in_UPPER()' : 'Raw_Column'}
          </button>
          <button onClick={() => { setActive(true); setTimeout(() => setActive(false), 2000); }} className="px-3 py-1 bg-primary text-white text-[9px] font-black">RUN_EXPLAIN</button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50">
        <div className="bg-db-panel p-6 border border-db-border font-mono text-sm mb-10 w-full max-w-sm">
          <span className="text-primary font-black">WHERE</span> {useFunction ? <span className="text-destructive">UPPER(name) = 'SIRIUS'</span> : <span className="text-sql-green">name = 'Sirius'</span>}
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 border-2 flex items-center justify-center transition-colors ${!useFunction && active ? 'border-sql-green shadow-[0_0_20px_var(--sql-green)]' : 'border-db-border'}`}>
              <Search className={!useFunction ? 'text-sql-green' : 'text-slate-700'} />
            </div>
            <span className="mt-2 text-[8px] font-black">INDEX_SEEK</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 border-2 flex items-center justify-center transition-colors ${useFunction && active ? 'border-destructive shadow-[0_0_20px_var(--destructive)]' : 'border-db-border'}`}>
              <Database className={useFunction ? 'text-destructive' : 'text-slate-700'} />
            </div>
            <span className="mt-2 text-[8px] font-black">FULL_TABLE_SCAN</span>
          </div>
        </div>

        {active && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute bottom-10 px-6 py-2 border bg-db-panel text-[10px] font-black"
          >
            {useFunction ? "WARNING: NON-SARGABLE DETECTED" : "OPTIMIZATION: INDEX HIT"}
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> Wrapping a column in a function (UPPER, DATE, etc.) means the engine must calculate that function for EVERY row in the table to compare it. The index, which contains raw values, becomes useless. Result: Index is ignored, Table Scan ensues."}
        </p>
      </div>
    </div>
  );
};

export default IndexMisuseInternal;

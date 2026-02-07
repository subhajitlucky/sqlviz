import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Search, Database } from 'lucide-react';

const SlowPatternsInternal = () => {
  const [wildcard, setWildcard] = useState('leading'); // 'leading', 'trailing'

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-muted-foreground">Wildcard_Scan_Efficiency</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setWildcard('trailing')} className={`px-3 py-1 text-[8px] font-black border transition-all ${wildcard === 'trailing' ? 'bg-sql-green text-db-black' : 'bg-muted border-border text-slate-500'}`}>TRAILING_WILDCARD</button>
          <button onClick={() => setWildcard('leading')} className={`px-3 py-1 text-[8px] font-black border transition-all ${wildcard === 'leading' ? 'bg-destructive text-white' : 'bg-muted border-border text-slate-500'}`}>LEADING_WILDCARD</button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        <div className="p-6 border border-db-border bg-db-panel font-mono text-sm mb-10 w-full max-w-sm">
          <span className="text-primary">WHERE</span> name <span className="text-sql-gold">LIKE</span> {wildcard === 'leading' ? "'%SIRIUS'" : "'SIRIUS%'" }
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col items-center">
            <motion.div animate={{ opacity: wildcard === 'trailing' ? 1 : 0.2 }} className={`w-24 h-24 border-2 flex items-center justify-center ${wildcard === 'trailing' ? 'border-sql-green shadow-[0_0_20px_var(--sql-green)]' : 'border-db-border'}`}>
              <Search className={wildcard === 'trailing' ? 'text-sql-green' : 'text-slate-700'} />
            </motion.div>
            <span className="mt-2 text-[8px] font-black">INDEX_RANGE_SCAN</span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div animate={{ opacity: wildcard === 'leading' ? 1 : 0.2 }} className={`w-24 h-24 border-2 flex items-center justify-center ${wildcard === 'leading' ? 'border-destructive shadow-[0_0_20px_var(--destructive)]' : 'border-db-border'}`}>
              <Database className={wildcard === 'leading' ? 'text-destructive' : 'text-slate-700'} />
            </motion.div>
            <span className="mt-2 text-[8px] font-black">FULL_TABLE_SCAN</span>
          </div>
        </div>

        <div className="absolute bottom-10 px-6 py-2 bg-db-panel border border-db-border text-[10px] font-black">
          {wildcard === 'leading' 
            ? "REASON:: CANNOT PREDICT STARTING CHARACTER (O(N))" 
            : "REASON:: SORTED PREFIX ALLOWS RANGE SEEK (O(log N))"}
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> LEADING WILDCARDS (%abc) force the engine to check every single row because it doesn't know where the match starts. TRAILING WILDCARDS (abc%) can use the index because the engine can navigate to the 'abc' range and stop once 'abd' starts."}
        </p>
      </div>
    </div>
  );
};

export default SlowPatternsInternal;

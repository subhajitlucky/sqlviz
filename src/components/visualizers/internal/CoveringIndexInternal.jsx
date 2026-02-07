import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Search, CheckCircle, Zap } from 'lucide-react';

const CoveringIndexInternal = () => {
  const [useCovering, setUseCovering] = useState(false);
  const [phase, setPhase] = useState('idle');

  const start = () => {
    setPhase('index');
    if (!useCovering) {
      setTimeout(() => setPhase('lookup'), 1000);
      setTimeout(() => setPhase('done'), 2000);
    } else {
      setTimeout(() => setPhase('done'), 1000);
    }
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Covering_Index_Optimization</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setUseCovering(!useCovering)} 
            className={`px-3 py-1 border text-[9px] font-black ${useCovering ? 'bg-sql-green/20 text-sql-green border-sql-green' : 'bg-muted border-border'}`}
          >
            {useCovering ? 'Covering_Active' : 'No_Coverage'}
          </button>
          <button onClick={start} className="px-3 py-1 bg-primary text-white text-[9px] font-black">RUN_QUERY</button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        <div className="text-[10px] font-black text-white mb-10">SELECT name FROM stars WHERE id = 10;</div>

        <div className="flex space-x-20 relative">
          {/* Index Storage */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-40 border-2 transition-colors ${phase === 'index' ? 'border-primary shadow-[0_0_20px_var(--primary)]' : 'border-db-border'} bg-db-panel p-4 flex flex-col`}>
              <span className="text-[8px] font-black mb-4">INDEX_PAGES</span>
              <div className="space-y-2">
                <div className="h-4 bg-muted border border-border flex items-center px-2 text-[6px]">ID: 10</div>
                {useCovering && <div className="h-4 bg-sql-green/20 border border-sql-green/40 flex items-center px-2 text-[6px] text-sql-green">NAME: SIRIUS</div>}
              </div>
            </div>
            <span className="mt-2 text-[7px] font-black">BTREE_STORAGE</span>
          </div>

          {/* Table Heap Storage */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-40 border-2 transition-colors ${phase === 'lookup' ? 'border-sql-gold shadow-[0_0_20px_var(--sql-gold)]' : 'border-db-border opacity-40'} bg-db-panel p-4`}>
              <span className="text-[8px] font-black mb-4">HEAP_PAGES</span>
              <div className="space-y-2">
                <div className="h-4 bg-muted border border-border flex items-center px-2 text-[6px]">NAME: SIRIUS</div>
                <div className="h-4 bg-muted border border-border flex items-center px-2 text-[6px]">MAG: -1.46</div>
              </div>
            </div>
            <span className="mt-2 text-[7px] font-black text-slate-600">TABLE_HEAP</span>
          </div>

          {/* Trace Line */}
          {phase !== 'idle' && (
            <motion.div 
              initial={{ x: -100 }}
              animate={{ 
                x: phase === 'lookup' ? 100 : phase === 'done' ? 300 : -100,
                opacity: phase === 'done' ? 0 : 1
              }}
              className="absolute top-20 left-1/2 w-4 h-4 bg-sql-cyan rounded-full shadow-[0_0_10px_var(--sql-cyan)] z-20"
            />
          )}
        </div>

        {phase === 'done' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-10 flex flex-col items-center">
            <CheckCircle className="text-sql-green mb-2" size={32} />
            <span className="text-[10px] font-black text-white">
              {useCovering ? "INSTANT_COVERAGE_HIT (0 LOOKUPS)" : "TABLE_LOOKUP_COMPLETE (1 IO)"}
            </span>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {useCovering 
            ? "> COVERING INDEX: The name 'Sirius' is stored directly in the index leaf. The engine never needs to visit the actual table storage. 100% faster."
            : "> STANDARD INDEX: The index only has the ID. The engine must perform a 'Bookmark Lookup' or 'Key Lookup' to the Table Heap to find the name."}
        </p>
      </div>
    </div>
  );
};

export default CoveringIndexInternal;

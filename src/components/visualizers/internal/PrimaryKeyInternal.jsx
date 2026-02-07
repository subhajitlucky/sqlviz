import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, LayoutList, MoveRight } from 'lucide-react';

const PrimaryKeyInternal = () => {
  const [data, setData] = useState([
    { id: 45, val: 'Z' },
    { id: 12, val: 'A' },
    { id: 89, val: 'X' },
    { id: 3, val: 'B' }
  ]);
  const [isClustered, setIsClustered] = useState(false);

  const cluster = () => {
    setIsClustered(true);
    const sorted = [...data].sort((a, b) => a.id - b.id);
    setData(sorted);
  };

  const reset = () => {
    setIsClustered(false);
    setData([
      { id: 45, val: 'Z' },
      { id: 12, val: 'A' },
      { id: 89, val: 'X' },
      { id: 3, val: 'B' }
    ]);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Key className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Clustered_PK_Enforcement</span>
        </div>
        <div className="flex space-x-2">
          {!isClustered ? (
            <button onClick={cluster} className="px-3 py-1 bg-primary text-white text-[9px] font-black">APPLY_PK</button>
          ) : (
            <button onClick={reset} className="px-3 py-1 bg-muted border border-border text-[9px] font-black">REMOVE_PK</button>
          )}
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50">
        <div className="flex gap-20">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black mb-4">LOGICAL_INPUT</span>
            <div className="space-y-2">
              {[45, 12, 89, 3].map(id => (
                <div key={id} className="w-16 h-8 border border-db-border flex items-center justify-center text-[10px]">ID_{id}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <motion.div animate={{ rotate: isClustered ? 90 : 0 }} className="text-primary"><MoveRight size={32} /></motion.div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black mb-4">PHYSICAL_STORAGE</span>
            <div className="space-y-2 relative">
              {data.map((item, i) => (
                <motion.div 
                  key={item.id} layout
                  className={`w-32 h-10 border-2 flex items-center px-4 justify-between transition-colors ${isClustered ? 'border-sql-cyan bg-sql-cyan/5' : 'border-db-border'}`}
                >
                  <span className="text-[10px] font-black">ID_{item.id}</span>
                  <span className="text-[8px] text-slate-600">PAGE_{i}</span>
                </motion.div>
              ))}
              <AnimatePresence>
                {isClustered && (
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: '100%' }}
                    className="absolute -left-4 top-0 w-1 bg-primary shadow-[0_0_10px_var(--primary)]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {isClustered 
            ? "> CLUSTERED INDEX: The primary key physically reorders the rows on disk. Data retrieval for ranges (WHERE id BETWEEN 1 AND 10) becomes extremely fast because rows are contiguous."
            : "> HEAP STORAGE: Without a primary key, rows are stored in 'random' order (wherever space was available). Reading a range requires multiple random IO jumps."}
        </p>
      </div>
    </div>
  );
};

export default PrimaryKeyInternal;

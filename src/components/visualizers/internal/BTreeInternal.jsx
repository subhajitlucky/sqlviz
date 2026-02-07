import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, ChevronRight } from 'lucide-react';

const BTreeInternal = () => {
  const [depth, setDepth] = useState(0); // 0: Root, 1: Branch, 2: Leaf
  
  const nodes = {
    root: { id: 'ROOT', range: '1-1000' },
    branches: [
      { id: 'B1', range: '1-333' },
      { id: 'B2', range: '334-666' },
      { id: 'B3', range: '667-1000' }
    ],
    leaves: [
      { id: 'L1', val: '452' },
      { id: 'L2', val: '453' },
      { id: 'L3', val: '454' }
    ]
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">B-Tree_Search_Traversal</span>
        </div>
        <div className="flex space-x-2">
          {[0, 1, 2].map((d) => (
            <button 
              key={d} 
              onClick={() => setDepth(d)}
              className={`px-3 py-1 text-[8px] font-black border transition-all ${depth === d ? 'bg-primary text-white border-primary' : 'bg-muted border-border text-slate-500'}`}
            >
              Level_{d}
            </button>
          ))}
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* Traversal Line */}
        <div className="absolute top-0 w-px h-full bg-db-border -z-0" />

        <AnimatePresence mode="wait">
          {depth === 0 && (
            <motion.div 
              key="root" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}
              className="z-10 w-32 h-20 bg-db-panel border-2 border-primary flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="text-[10px] font-black text-primary">ROOT_NODE</span>
              <span className="text-[8px] text-slate-500">{nodes.root.range}</span>
            </motion.div>
          )}

          {depth === 1 && (
            <motion.div 
              key="branch" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}
              className="z-10 flex space-x-4"
            >
              {nodes.branches.map((b, i) => (
                <div key={b.id} className={`w-24 h-16 bg-db-panel border-2 flex flex-col items-center justify-center ${i === 1 ? 'border-sql-gold' : 'border-db-border opacity-40'}`}>
                  <span className="text-[8px] font-black">{b.id}</span>
                  <span className="text-[7px] text-slate-500">{b.range}</span>
                  {i === 1 && <ChevronRight className="rotate-90 text-sql-gold mt-1" size={12} />}
                </div>
              ))}
            </motion.div>
          )}

          {depth === 2 && (
            <motion.div 
              key="leaf" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }}
              className="z-10 flex space-x-2"
            >
              {nodes.leaves.map((l, i) => (
                <div key={l.id} className={`w-16 h-12 bg-db-panel border-2 flex flex-col items-center justify-center ${i === 0 ? 'border-sql-green' : 'border-db-border opacity-40'}`}>
                  <span className="text-[8px] font-black">ID_{l.val}</span>
                  {i === 0 && <span className="text-[6px] text-sql-green animate-pulse">MATCH_FOUND</span>}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Target Indicator */}
        <div className="absolute top-4 right-4 bg-muted border border-border p-3">
          <div className="text-[7px] text-muted-foreground">Target_Lookup</div>
          <div className="text-xs font-black text-white">ID_452</div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {depth === 0 && "> Traversal starts at the Root. The engine checks which child node contains the target range."}
          {depth === 1 && "> At the Branch level, the search space is narrowed down. We follow the link to the relevant leaf page."}
          {depth === 2 && "> Target located in the Leaf node. Total operations: 3. Even with millions of rows, depth stays low."}
        </p>
      </div>
    </div>
  );
};

export default BTreeInternal;

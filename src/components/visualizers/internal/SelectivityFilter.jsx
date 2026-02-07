import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, BarChart3, AlertCircle } from 'lucide-react';

const SelectivityFilter = () => {
  const [selectivity, setSelectivity] = useState(0.1); // 0.1 to 0.9
  
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    pass: Math.random() < selectivity
  }));

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Selectivity_Mesh</span>
        </div>
        <div className="flex items-center space-x-4">
          <input 
            type="range" min="0.05" max="0.95" step="0.05" 
            value={selectivity} 
            onChange={(e) => setSelectivity(parseFloat(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="text-[10px] font-black text-white w-8">{(selectivity * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative overflow-hidden bg-db-black/50">
        {/* The Mesh */}
        <div className="w-full h-1 bg-db-border relative mb-20">
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary shadow-[0_0_20px_var(--primary)]"
          />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] text-primary font-black">PLANNER_FILTER_PREDICATE</div>
        </div>

        {/* Particles */}
        <div className="grid grid-cols-10 gap-4">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: p.pass ? 150 : 0, 
                opacity: 1,
                backgroundColor: p.pass ? '#00e5ff' : '#1e293b',
                scale: p.pass ? 1.2 : 0.8
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, delay: Math.random() * 2 },
                opacity: { duration: 0.5 }
              }}
              className="w-3 h-3 rounded-sm"
            />
          ))}
        </div>

        {/* Recommendation */}
        <div className="absolute bottom-4 left-4 bg-db-panel border border-db-border p-4 shadow-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <Search className={`w-3 h-3 ${selectivity < 0.2 ? 'text-sql-green' : 'text-slate-500'}`} />
            <span className="text-[9px] font-black">Plan_Decision</span>
          </div>
          <p className="text-[10px] text-white">
            {selectivity < 0.2 
              ? "STRATEGY: INDEX_SEEK (Highly Selective)" 
              : selectivity < 0.5 
                ? "STRATEGY: INDEX_SCAN (Moderately Selective)"
                : "STRATEGY: FULL_TABLE_SCAN (Low Selectivity)"}
          </p>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> SELECTIVITY measures how many rows a filter returns. High selectivity (returning few rows) makes indexes powerful. Low selectivity (returning many rows) makes scanning the whole table faster due to sequential IO benefits."}
        </p>
      </div>
    </div>
  );
};

export default SelectivityFilter;

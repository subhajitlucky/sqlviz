import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Play, Cpu, AlertCircle } from 'lucide-react';

const QueryPlannerInternal = () => {
  const [phase, setPhase] = useState('stats'); // 'stats', 'search', 'plan'

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Optimizer_Decision_Engine</span>
        </div>
        <div className="flex space-x-2">
          {['stats', 'search', 'plan'].map((p) => (
            <button key={p} onClick={() => setPhase(p)} className={`px-3 py-1 text-[8px] font-black border transition-all ${phase === p ? 'bg-primary text-white' : 'bg-muted text-slate-500'}`}>{p.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {phase === 'stats' && (
          <div className="flex gap-10">
            {[
              { label: 'ROWS', val: '1.2M' },
              { label: 'SELECTIVITY', val: '0.004' },
              { label: 'PAGES', val: '45,000' }
            ].map((s) => (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={s.label} className="p-6 border border-primary bg-db-panel flex flex-col items-center">
                <span className="text-[8px] text-slate-500">{s.label}</span>
                <span className="text-xl font-black text-white">{s.val}</span>
              </motion.div>
            ))}
          </div>
        )}

        {phase === 'search' && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Plan_A: Hash_Join', cost: 1450 },
              { label: 'Plan_B: Nested_Loop', cost: 120 },
              { label: 'Plan_C: Merge_Join', cost: 890 },
              { label: 'Plan_D: Parallel_Scan', cost: 2300 }
            ].map((p) => (
              <motion.div animate={{ borderColor: p.cost === 120 ? '#00e5ff' : '#232735' }} key={p.label} className="p-4 border bg-db-panel flex justify-between items-center">
                <span className="text-[10px] text-white font-black">{p.label}</span>
                <span className="text-[8px] text-primary">COST: {p.cost}</span>
              </motion.div>
            ))}
          </div>
        )}

        {phase === 'plan' && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-10 border-4 border-sql-green bg-db-panel flex flex-col items-center text-center">
            <Cpu size={48} className="text-sql-green mb-4" />
            <h3 className="text-white font-black">CHOSEN_TRAJECTORY</h3>
            <p className="text-[10px] text-sql-green">NESTED_LOOP + INDEX_SEEK</p>
            <div className="mt-4 px-4 py-1 bg-sql-green text-db-black text-[8px] font-black">LOWEST_COST_CONFIRMED</div>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> THE QUERY PLANNER doesn't 'know' which path is best—it guesses based on STATISTICS. It explores thousands of combinations (Search Space) and uses cost models to pick the one with the lowest estimated energy requirement."}
        </p>
      </div>
    </div>
  );
};

export default QueryPlannerInternal;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play, CornerDownRight } from 'lucide-react';

const CTERecursion = () => {
  const [step, setStep] = useState(0);
  const [history, setStepHistory] = useState([{ id: 1, depth: 0 }]);

  const next = () => {
    if (step >= 5) return;
    const newStep = step + 1;
    setStep(newStep);
    setStepHistory([...history, { id: history.length + 1, depth: newStep }]);
  };

  const reset = () => {
    setStep(0);
    setStepHistory([{ id: 1, depth: 0 }]);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <CornerDownRight className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Recursive_CTE_Expansion</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={next} className="px-3 py-1 bg-primary text-white text-[9px] font-black">STEP_RECURSE</button>
          <button onClick={reset} className="p-1 text-muted-foreground hover:text-white"><RotateCcw size={16}/></button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Recursion Loop */}
        <div className="flex flex-col space-y-2 w-full max-w-xs h-64 overflow-y-auto custom-scrollbar pr-4">
          <AnimatePresence>
            {history.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: h.depth * 20, opacity: 1 }}
                className={`p-3 border flex justify-between items-center ${i === history.length - 1 ? 'border-sql-cyan bg-sql-cyan/5' : 'border-db-border bg-db-panel/20 text-slate-600'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[8px] font-black">L_{h.depth}</span>
                  <span className="text-[10px] font-black">NODE_ID_{h.id}</span>
                </div>
                {i < history.length - 1 && <span className="text-[6px] text-slate-700">OUTPUT_FEEDBACK →</span>}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* The Machine */}
        <div className="absolute top-10 right-10 flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-dashed border-primary rounded-full animate-[spin_10s_linear_infinite]" />
          <span className="mt-2 text-[7px] text-primary font-black">RECURSION_ENGINE</span>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {`> RECURSIVE CTEs work in two parts: 1. Anchor Member (the starting row). 2. Recursive Member (the logic that takes the output of step N and uses it as input for N+1). Loop continues until no more rows are returned.`}
        </p>
      </div>
    </div>
  );
};

export default CTERecursion;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertCircle, CheckCircle, ArrowLeftRight } from 'lucide-react';

const ACIDVisualizer = () => {
  const [status, setStatus] = useState('idle'); // idle, processing, committed, aborted
  const [items, setItems] = useState([]);

  const startTx = () => {
    setStatus('processing');
    setItems(['📦', '📦', '📦']);
    
    // Simulate some work
    setTimeout(() => {
      // In a real app, user would choose, but here we simulate the "all or nothing"
    }, 1000);
  };

  const commit = () => setStatus('committed');
  const abort = () => {
    setStatus('aborted');
    // All items fly back out
  };

  const reset = () => {
    setStatus('idle');
    setItems([]);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">ACID_Transaction_Shield</span>
        </div>
        <button onClick={reset} className="text-[9px] font-black text-slate-500 hover:text-white transition-colors">RESET_VAULT</button>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Vault */}
        <div className="w-64 h-48 border-4 border-db-border relative flex items-center justify-center bg-db-panel/20">
          <div className="absolute inset-0 border border-white/5" />
          
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -200, opacity: 0 }}
                animate={{ 
                  x: status === 'aborted' ? -300 : 0, 
                  opacity: status === 'aborted' ? 0 : 1,
                  y: i * 20 - 20
                }}
                className="absolute text-2xl"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>

          {status === 'committed' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="z-20 text-sql-green flex flex-col items-center">
              <CheckCircle size={48} />
              <span className="mt-2 text-[10px] font-black">ATOMIC_SUCCESS</span>
            </motion.div>
          )}

          {status === 'aborted' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="z-20 text-destructive flex flex-col items-center">
              <AlertCircle size={48} />
              <span className="mt-2 text-[10px] font-black">ROLLBACK_TRIGGERED</span>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-10 flex gap-4">
          {status === 'idle' && (
            <button onClick={startTx} className="px-6 py-2 bg-primary text-white text-[10px] font-black skew-x-[-12deg] shadow-lg"><span className="skew-x-[12deg]">BEGIN_TRANSACTION</span></button>
          )}
          {status === 'processing' && (
            <>
              <button onClick={commit} className="px-6 py-2 bg-sql-green text-db-black text-[10px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">COMMIT</span></button>
              <button onClick={abort} className="px-6 py-2 bg-destructive text-white text-[10px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">ABORT</span></button>
            </>
          )}
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 text-[8px] text-slate-600 font-black space-y-1">
          <p>A - ATOMICITY: ALL OR NOTHING</p>
          <p>C - CONSISTENCY: VALID STATE ONLY</p>
          <p>I - ISOLATION: NO INTERFERENCE</p>
          <p>D - DURABILITY: SAVED TO DISK</p>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {status === 'idle' && "> System ready. A transaction ensures that multiple operations succeed or fail as a single unit."}
          {status === 'processing' && "> Data is in a 'Pending' state. It is isolated from other users until you Commit."}
          {status === 'committed' && "> Success. All changes are now permanent and visible to the entire system."}
          {status === 'aborted' && "> Failure detected. The engine undoes all pending changes to protect data integrity."}
        </p>
      </div>
    </div>
  );
};

export default ACIDVisualizer;

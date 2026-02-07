import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle, Database } from 'lucide-react';

const UniqueIndexInternal = () => {
  const [existing, setExisting] = useState(['ID_101', 'ID_102']);
  const [input, setInput] = useState('ID_101');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const insert = () => {
    setError(false);
    setSuccess(false);
    if (existing.includes(input)) {
      setError(true);
    } else {
      setSuccess(true);
      setExisting([...existing, input]);
    }
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <ShieldAlert className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Unique_Constraint_Guardian</span>
        </div>
        <button onClick={() => setExisting(['ID_101', 'ID_102'])} className="text-[9px] font-black text-slate-500 hover:text-white transition-colors">RESET_INDEX</button>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50">
        <div className="flex gap-4 mb-10">
          <input 
            value={input} onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="bg-db-panel border border-db-border p-2 text-xs text-white outline-none focus:border-primary"
          />
          <button onClick={insert} className="px-6 py-2 bg-primary text-white text-[10px] font-black">INSERT_KEY</button>
        </div>

        <div className="flex gap-4">
          <div className="w-48 h-48 border-2 border-dashed border-db-border p-4 relative flex flex-col items-center">
            <span className="text-[8px] font-black mb-4">UNIQUE_INDEX_SPACE</span>
            <div className="space-y-2 w-full">
              {existing.map((key) => (
                <motion.div key={key} layout className="p-2 bg-muted border border-border text-[10px] text-center">{key}</motion.div>
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute inset-0 bg-destructive/90 flex flex-col items-center justify-center p-4 text-center z-20"
                >
                  <AlertTriangle size={32} className="mb-2" />
                  <span className="text-[10px] font-black">ERROR:: DUPLICATE_KEY</span>
                  <p className="text-[8px] mt-2">Constraint violation: {input} already exists in the index.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center">
            <Database size={48} className={success ? 'text-sql-green animate-bounce' : 'text-slate-700'} />
            <span className="mt-2 text-[7px] text-center font-black">CORE_STORAGE</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> UNIQUE INDEXES check for existence before permitting a write. It is an atomic check: the engine must find the leaf page for the key; if found, the write is rejected immediately. This ensures business logic at the data layer."}
        </p>
      </div>
    </div>
  );
};

export default UniqueIndexInternal;

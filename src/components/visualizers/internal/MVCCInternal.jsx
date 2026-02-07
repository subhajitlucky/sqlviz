import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Eye, Layers, User } from 'lucide-react';

const MVCCInternal = () => {
  const [snapshot, setSnapshot] = useState(1); // Timeline version
  
  const dataVersions = [
    { version: 1, val: 'Alice', color: '#336791' },
    { version: 2, val: 'Bob', color: '#00e5ff' },
    { version: 3, val: 'Charlie', color: '#00ff9d' }
  ];

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">MVCC_Snapshot_Isolation</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[8px] text-muted-foreground">Snapshot_TS:</label>
          <input 
            type="range" min="1" max="3" step="1" 
            value={snapshot} 
            onChange={(e) => setSnapshot(parseInt(e.target.value))}
            className="w-20 accent-primary"
          />
          <span className="text-xs font-black text-white w-4">T{snapshot}</span>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Lens */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-dashed border-primary rounded-full animate-[spin_20s_linear_infinite] opacity-20 pointer-events-none" />
        
        {/* Readers */}
        <div className="absolute top-10 left-10 flex items-center space-x-2 text-sql-cyan">
          <User size={16} />
          <span className="text-[8px] font-black">READER_A (TS=1)</span>
        </div>

        {/* Versions Stack */}
        <div className="flex flex-col-reverse space-y-reverse -space-y-10 mt-10">
          {dataVersions.map((v) => {
            const isVisible = v.version <= snapshot;
            const isCurrent = v.version === snapshot;

            return (
              <motion.div
                key={v.version}
                initial={false}
                animate={{ 
                  opacity: isVisible ? 1 : 0.1,
                  scale: isCurrent ? 1.1 : 0.9,
                  y: isVisible ? 0 : -20,
                  z: v.version * 10
                }}
                className={`w-48 h-20 border-2 bg-db-panel flex flex-col items-center justify-center relative shadow-2xl transition-colors`}
                style={{ borderColor: isCurrent ? v.color : '#232735' }}
              >
                <div className="absolute top-2 left-2 text-[6px] text-slate-500 font-black">VERSION_{v.version}</div>
                <span className={`text-xl font-black ${isCurrent ? 'text-white' : 'text-slate-700'}`}>{v.val}</span>
                {isCurrent && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-10 flex items-center space-x-2 text-sql-green">
                    <Eye size={12} />
                    <span className="text-[7px] font-black">VISIBLE</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Indicator */}
        <div className="absolute bottom-10 left-0 w-full px-10">
          <div className="h-[1px] bg-db-border w-full relative">
            {[1, 2, 3].map((t) => (
              <div key={t} className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${t <= snapshot ? 'bg-primary' : 'bg-db-border'}`} style={{ left: `${(t - 1) * 50}%` }}>
                <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[6px] font-black">T{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {`> MULTI-VERSION CONCURRENCY CONTROL (MVCC) allows readers to never block writers. Instead of overwriting data, the engine stores multiple versions. A reader at T1 sees the version created at T1, even if T3 has already written a newer version.`}
        </p>
      </div>
    </div>
  );
};

export default MVCCInternal;

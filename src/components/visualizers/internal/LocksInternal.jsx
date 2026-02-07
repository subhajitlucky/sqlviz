import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, AlertTriangle, User } from 'lucide-react';

const LocksInternal = () => {
  const [activeUser, setActiveUser] = useState(null); // 'A', 'B'
  const [lockType, setLockType] = useState(null); // 'S', 'X'
  const [conflict, setConflict] = useState(false);

  const requestLock = (user, type) => {
    if (activeUser && activeUser !== user && (lockType === 'X' || type === 'X')) {
      setConflict(true);
      setTimeout(() => setConflict(false), 2000);
      return;
    }
    setActiveUser(user);
    setLockType(type);
  };

  const release = () => {
    setActiveUser(null);
    setLockType(null);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Concurrency_Lock_Manager</span>
        </div>
        <button onClick={release} className="text-[9px] font-black text-slate-500 hover:text-white transition-colors">RELEASE_ALL</button>
      </div>

      <div className="p-10 grid grid-cols-2 gap-10 aspect-video relative bg-db-black/50 overflow-hidden">
        {/* User A */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className={`p-4 border-2 rounded-full transition-colors ${activeUser === 'A' ? 'border-sql-cyan bg-sql-cyan/10' : 'border-db-border text-slate-700'}`}>
            <User size={32} />
          </div>
          <span className="text-[10px] font-black">PROCESS_ALPHA</span>
          <div className="flex gap-2">
            <button onClick={() => requestLock('A', 'S')} className="px-3 py-1 bg-db-panel border border-db-border text-[8px] font-black hover:text-sql-blue">GET_SHARED (S)</button>
            <button onClick={() => requestLock('A', 'X')} className="px-3 py-1 bg-db-panel border border-db-border text-[8px] font-black hover:text-destructive">GET_EXCL (X)</button>
          </div>
        </div>

        {/* The Resource */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <motion.div 
            animate={{ 
              scale: conflict ? [1, 1.2, 1] : 1,
              backgroundColor: activeUser ? (lockType === 'X' ? '#ef4444' : '#336791') : '#1e293b'
            }}
            className="w-24 h-24 border-4 border-db-border flex items-center justify-center relative shadow-2xl"
          >
            {activeUser ? <Lock className="text-white" size={32} /> : <Unlock className="text-slate-700" size={32} />}
            {conflict && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-10 text-destructive font-black text-[10px] animate-bounce">LOCK_WAIT_BLOCKING!</motion.div>}
          </motion.div>
          <span className="mt-4 text-[8px] font-black text-slate-500">TARGET_RESOURCE::ROW_452</span>
        </div>

        {/* User B */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className={`p-4 border-2 rounded-full transition-colors ${activeUser === 'B' ? 'border-sql-gold bg-sql-gold/10' : 'border-db-border text-slate-700'}`}>
            <User size={32} />
          </div>
          <span className="text-[10px] font-black">PROCESS_BETA</span>
          <div className="flex gap-2">
            <button onClick={() => requestLock('B', 'S')} className="px-3 py-1 bg-db-panel border border-db-border text-[8px] font-black hover:text-sql-blue">GET_SHARED (S)</button>
            <button onClick={() => requestLock('B', 'X')} className="px-3 py-1 bg-db-panel border border-db-border text-[8px] font-black hover:text-destructive">GET_EXCL (X)</button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> SHARED LOCKS (S) are compatible with other readers. EXCLUSIVE LOCKS (X) block everything. A conflict occurs when one process holds a lock that prevents another from obtaining its requested type, leading to 'Lock Wait'."}
        </p>
      </div>
    </div>
  );
};

export default LocksInternal;

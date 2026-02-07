import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Server, Send, AlertTriangle, CheckCircle } from 'lucide-react';

const TwoPhaseCommit = () => {
  const [phase, setPhase] = useState('idle'); // idle, prepare, commit, abort
  const [nodes, setNodes] = useState([
    { id: 1, status: 'idle' },
    { id: 2, status: 'idle' },
    { id: 3, status: 'idle' }
  ]);

  const startPrepare = () => {
    setPhase('prepare');
    setNodes(nodes.map(n => ({ ...n, status: 'preparing' })));
    
    setTimeout(() => {
      // One node might fail randomly for demo
      setNodes(nodes.map(n => ({ ...n, status: 'ready' })));
    }, 1500);
  };

  const handleCommit = () => {
    setPhase('commit');
    setNodes(nodes.map(n => ({ ...n, status: 'committed' })));
  };

  const handleAbort = () => {
    setPhase('abort');
    setNodes(nodes.map(n => ({ ...n, status: 'aborted' })));
  };

  const reset = () => {
    setPhase('idle');
    setNodes([
      { id: 1, status: 'idle' },
      { id: 2, status: 'idle' },
      { id: 3, status: 'idle' }
    ]);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Distributed_Consensus_2PC</span>
        </div>
        <button onClick={reset} className="text-[9px] font-black text-slate-500 hover:text-white transition-colors">RESET_SYSTEM</button>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50">
        {/* Coordinator */}
        <div className="mb-20 flex flex-col items-center relative">
          <div className="w-16 h-16 border-2 border-primary bg-db-panel flex items-center justify-center text-primary shadow-[0_0_20px_var(--primary)]">
            <Server size={24} />
          </div>
          <span className="mt-2 text-[8px] font-black">COORDINATOR</span>
          
          {phase === 'prepare' && (
            <motion.div initial={{ y: 0 }} animate={{ y: 50, opacity: 0 }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-20 text-sql-cyan"><Send size={16} /></motion.div>
          )}
        </div>

        {/* Nodes */}
        <div className="flex justify-between w-full max-w-sm">
          {nodes.map((n) => (
            <div key={n.id} className="flex flex-col items-center">
              <motion.div 
                animate={{ 
                  borderColor: n.status === 'ready' ? '#00ff9d' : n.status === 'aborted' ? '#ef4444' : n.status === 'committed' ? '#00e5ff' : '#232735',
                  scale: n.status !== 'idle' ? 1.1 : 1
                }}
                className="w-12 h-12 border-2 bg-db-panel flex items-center justify-center text-slate-500 transition-colors"
              >
                {n.status === 'ready' ? <CheckCircle size={20} className="text-sql-green" /> : <Server size={20} />}
              </motion.div>
              <span className="mt-2 text-[7px] font-black">NODE_0{n.id}</span>
              <span className="text-[6px] text-slate-600">{n.status.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-4">
          {phase === 'idle' && (
            <button onClick={startPrepare} className="px-4 py-2 bg-sql-blue text-white text-[9px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">START_PREPARE</span></button>
          )}
          {phase === 'prepare' && nodes.every(n => n.status === 'ready') && (
            <>
              <button onClick={handleCommit} className="px-4 py-2 bg-sql-green text-db-black text-[9px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">VOTE_COMMIT</span></button>
              <button onClick={handleAbort} className="px-4 py-2 bg-destructive text-white text-[9px] font-black skew-x-[-12deg]"><span className="skew-x-[12deg]">VOTE_ABORT</span></button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {phase === 'idle' && "> System is idle. Waiting for transaction request."}
          {phase === 'prepare' && "> PHASE 1: Coordinator asks nodes if they can commit. Nodes lock resources and reply 'READY'."}
          {phase === 'commit' && "> PHASE 2: All nodes were ready. Coordinator sends 'COMMIT' command. Atomic success."}
          {phase === 'abort' && "> FAILURE: Transaction aborted. Coordinator sends 'ROLLBACK' to all nodes to release locks."}
        </p>
      </div>
    </div>
  );
};

export default TwoPhaseCommit;

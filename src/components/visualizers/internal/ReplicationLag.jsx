import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Network, Clock, Activity } from 'lucide-react';

const ReplicationLag = () => {
  const [packets, setPackets] = useState([]);
  const [lag, setLag] = useState(2); // 1 to 5 seconds
  const [primarySeq, setPrimarySeq] = useState(0);
  const [replicaSeq, setReplicaSeq] = useState(0);

  const addTransaction = () => {
    const newSeq = primarySeq + 1;
    setPrimarySeq(newSeq);
    
    const packetId = Math.random();
    setPackets(prev => [...prev, { id: packetId, seq: newSeq }]);
    
    setTimeout(() => {
      setReplicaSeq(newSeq);
      setPackets(prev => prev.filter(p => p.id !== packetId));
    }, lag * 1000);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Replication_Lag_Sync</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[8px] text-muted-foreground">Network_Lag:</label>
          <input 
            type="range" min="0.5" max="5" step="0.5" 
            value={lag} 
            onChange={(e) => setLag(parseFloat(e.target.value))}
            className="w-20 accent-primary"
          />
          <span className="text-[10px] font-black text-white w-8">{lag}s</span>
        </div>
      </div>

      <div className="p-10 flex justify-between items-center aspect-video relative bg-db-black/50">
        {/* Primary */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-24 border-2 border-primary bg-db-panel flex flex-col items-center justify-center p-2 relative">
            <Database size={32} className="text-primary" />
            <span className="text-[8px] mt-2 font-black">PRIMARY</span>
            <div className="mt-2 text-xs font-black text-white">LSN_{primarySeq}</div>
            <motion.div 
              onClick={addTransaction}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-4 -right-4 w-10 h-10 bg-sql-blue rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-primary transition-all"
            >
              +
            </motion.div>
          </div>
        </div>

        {/* Network Pipe */}
        <div className="flex-grow mx-8 h-12 border-y border-db-border relative flex items-center">
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          <AnimatePresence>
            {packets.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 300, opacity: 1 }}
                exit={{ x: 350, opacity: 0 }}
                transition={{ duration: lag, ease: "linear" }}
                className="absolute w-6 h-6 bg-sql-cyan border border-white/20 flex items-center justify-center text-[8px] font-black text-db-black"
              >
                TX
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="w-full text-center text-[8px] text-slate-600 font-black tracking-widest">
            {packets.length > 0 ? "STREAMING_WAL_LOGS" : "IDLE_CONNECTION"}
          </div>
        </div>

        {/* Replica */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-24 border-2 border-slate-700 bg-db-panel flex flex-col items-center justify-center p-2">
            <Database size={32} className="text-slate-500" />
            <span className="text-[8px] mt-2 font-black text-slate-500">REPLICA</span>
            <div className="mt-2 text-xs font-black text-slate-400">LSN_{replicaSeq}</div>
          </div>
          {primarySeq > replicaSeq && (
            <div className="mt-4 flex items-center space-x-2 text-sql-gold animate-pulse">
              <Clock size={12} />
              <span className="text-[8px] font-black">LAG: {primarySeq - replicaSeq}_TXS</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> Transcribing data from Primary to Replica takes time. This 'Replication Lag' creates a window of 'Inconsistency' where a read from the replica might return old data (Stale Read)."}
        </p>
      </div>
    </div>
  );
};

export default ReplicationLag;

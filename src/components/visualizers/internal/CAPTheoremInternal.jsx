import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Lock, Activity, AlertTriangle } from 'lucide-react';

const CAPTheoremInternal = () => {
  const [active, setActive] = useState('C'); // 'C', 'A', 'P'

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Share2 className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">The_CAP_Triangle</span>
        </div>
        <div className="flex space-x-2">
          {['C', 'A', 'P'].map((t) => (
            <button 
              key={t} onClick={() => setActive(t)}
              className={`px-3 py-1 text-[9px] font-black border transition-all ${active === t ? 'bg-primary text-white border-primary' : 'bg-muted border-border text-slate-500'}`}
            >
              PRIORITIZE_{t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50 overflow-hidden">
        {/* The Triangle */}
        <div className="relative w-64 h-64 border-2 border-db-border rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
          <div className="absolute inset-0 bg-primary/5" />
        </div>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: active === 'C' ? 1.5 : 1, color: active === 'C' ? '#00e5ff' : '#64748b' }} className="absolute -top-10 flex flex-col items-center rotate-180">
            <Lock size={32} />
            <span className="text-[10px] font-black mt-2">CONSISTENCY</span>
          </motion.div>
          
          <motion.div animate={{ scale: active === 'A' ? 1.5 : 1, color: active === 'A' ? '#00ff9d' : '#64748b' }} className="absolute -bottom-10 -left-10 flex flex-col items-center rotate-180">
            <Activity size={32} />
            <span className="text-[10px] font-black mt-2">AVAILABILITY</span>
          </motion.div>

          <motion.div animate={{ scale: active === 'P' ? 1.5 : 1, color: active === 'P' ? '#ffcc00' : '#64748b' }} className="absolute -bottom-10 -right-10 flex flex-col items-center rotate-180">
            <Share2 size={32} />
            <span className="text-[10px] font-black mt-2">PARTITION_TOLERANCE</span>
          </motion.div>
        </div>

        {/* Description overlay */}
        <div className="absolute bottom-4 right-4 bg-db-panel p-4 border border-db-border max-w-[200px]">
          <h4 className="text-[8px] font-black text-primary mb-2">ENGINE_CHOICE</h4>
          <p className="text-[9px] text-white">
            {active === 'C' && "CP (MongoDB): Data is always identical on all nodes, but system will stop if network breaks."}
            {active === 'A' && "AP (Cassandra): System always answers, but data might be old on some nodes (Eventual Consistency)."}
            {active === 'P' && "Distributed systems MUST have P. You are choosing between C and A."}
          </p>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> THE CAP THEOREM states that in the event of a network partition (network break), you must choose between Consistency (identical data) or Availability (always responding). You cannot have both."}
        </p>
      </div>
    </div>
  );
};

export default CAPTheoremInternal;

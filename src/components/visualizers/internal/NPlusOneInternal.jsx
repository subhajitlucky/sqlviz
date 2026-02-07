import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Send, User, Server } from 'lucide-react';

const NPlusOneInternal = () => {
  const [active, setActive] = useState(false);
  const [requests, setRequests] = useState([]);
  const [mode, setMode] = useState('bad'); // 'bad', 'good'

  const run = () => {
    setActive(true);
    setRequests([]);
    if (mode === 'bad') {
      // One request for IDs
      setRequests([{ id: 0, label: 'FETCH_IDS' }]);
      // N requests for data
      for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
          setRequests(prev => [...prev, { id: i, label: `FETCH_ROW_${i}` }]);
        }, i * 500);
      }
      setTimeout(() => setActive(false), 3500);
    } else {
      // One single JOIN request
      setRequests([{ id: 0, label: 'FETCH_ALL_JOIN' }]);
      setTimeout(() => setActive(false), 1000);
    }
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Network className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Network_Chatter_Monitor</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setMode(mode === 'bad' ? 'good' : 'bad')}
            className={`px-3 py-1 border text-[9px] font-black ${mode === 'good' ? 'bg-sql-green/20 text-sql-green border-sql-green' : 'bg-destructive/20 text-destructive border-destructive'}`}
          >
            {mode === 'good' ? 'Optimized_JOIN' : 'N+1_Problem'}
          </button>
          <button onClick={run} disabled={active} className="px-3 py-1 bg-primary text-white text-[9px] font-black disabled:opacity-50">EXECUTE</button>
        </div>
      </div>

      <div className="p-10 flex justify-between items-center aspect-video relative bg-db-black/50 overflow-hidden">
        <div className="flex flex-col items-center">
          <User size={32} className="text-slate-500" />
          <span className="mt-2 text-[8px] font-black">CLIENT (APP)</span>
        </div>

        <div className="flex-grow flex flex-col items-center relative h-full">
          <AnimatePresence>
            {requests.map((r) => (
              <motion.div
                key={r.id}
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 150, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2"
              >
                <div className="px-2 py-1 bg-primary text-white text-[6px] font-black rounded-sm">{r.label}</div>
                <Send size={10} className="text-primary" />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="w-full h-[1px] bg-db-border absolute top-1/2" />
        </div>

        <div className="flex flex-col items-center">
          <Server size={32} className="text-slate-500" />
          <span className="mt-2 text-[8px] font-black">DATABASE_SERVER</span>
        </div>

        {/* Roundtrip counter */}
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-[8px] text-muted-foreground">Network_Roundtrips</div>
          <div className={`text-xl font-black ${requests.length > 1 ? 'text-destructive' : 'text-sql-green'}`}>{requests.length}</div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {mode === 'bad' 
            ? "> N+1 PROBLEM: The application sends one query to get 5 IDs, then sends 5 INDIVIDUAL queries to get the data for each. Total: 6 network roundtrips. Latency kills performance."
            : "> OPTIMIZED: The application sends ONE query with a JOIN or WHERE IN. The database processes everything in one pass. Total: 1 network roundtrip."}
        </p>
      </div>
    </div>
  );
};

export default NPlusOneInternal;

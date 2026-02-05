import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  Clock, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  Activity
} from 'lucide-react';

const ReplicationLagVisualizer = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('stable'); // stable, congested, offline
  const [primaryData, setPrimaryData] = useState({ version: 1, lastTx: 'TX_INIT' });
  const [replicaData, setReplicaData] = useState({ version: 1, lastTx: 'TX_INIT' });
  const [lagMs, setLagMs] = useState(0);
  const [pendingWrites, setPendingWrites] = useState(0);

  const simulateWrite = () => {
    if (networkStatus === 'offline') return;
    
    const newVersion = primaryData.version + 1;
    const newTx = `TX_ID_00${newVersion}`;
    
    setPrimaryData({ version: newVersion, lastTx: newTx });
    setPendingWrites(prev => prev + 1);
    
    const lagBase = networkStatus === 'congested' ? 3000 : 1000;
    const actualLag = lagBase + Math.random() * 500;
    setLagMs(actualLag);

    setTimeout(() => {
      setReplicaData({ version: newVersion, lastTx: newTx });
      setPendingWrites(prev => Math.max(0, prev - 1));
    }, actualLag);
  };

  return (
    <div className="w-full bg-db-black border border-db-border shadow-2xl overflow-hidden font-mono uppercase transition-all">
      {/* Header */}
      <div className="px-6 py-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Activity className="w-3 h-3 text-sql-cyan animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-slate-500">NET_TOPOLOGY: PRIMARY_REPLICA_SYNC</span>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={networkStatus}
            onChange={(e) => setNetworkStatus(e.target.value)}
            className="bg-db-surface border border-db-border text-[9px] font-black text-slate-400 px-2 py-1 outline-none focus:border-sql-cyan transition-all"
          >
            <option value="stable">NET_STABLE</option>
            <option value="congested">NET_CONGESTED</option>
            <option value="offline">NET_OFFLINE</option>
          </select>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center max-w-xl relative">
          
          {/* Primary Node */}
          <div className="flex flex-col items-center space-y-4 relative z-10">
            <span className="text-[8px] font-black text-sql-cyan tracking-widest">SRV_PRIMARY_RW</span>
            <motion.div 
              animate={{ 
                borderColor: pendingWrites > 0 ? '#00e5ff' : '#232735',
                boxShadow: pendingWrites > 0 ? '0 0 20px rgba(0,229,255,0.1)' : 'none'
              }}
              className="w-32 p-4 border bg-db-surface relative"
            >
              <Database className="w-8 h-8 text-sql-cyan mb-2" />
              <div className="space-y-1">
                <div className="text-[7px] text-slate-600">VERSION: {primaryData.version}</div>
                <div className="text-[7px] text-sql-green truncate">{primaryData.lastTx}</div>
              </div>
              {pendingWrites > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-sql-cyan text-db-black text-[10px] font-black flex items-center justify-center animate-bounce">
                  {pendingWrites}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sync Pipe */}
          <div className="flex-grow mx-4 flex flex-col items-center relative h-20 justify-center">
            {/* Pipe Background */}
            <div className="w-full h-1 bg-db-panel border border-db-border rounded-full" />
            
            {/* Animated Data Packets */}
            <AnimatePresence>
              {pendingWrites > 0 && networkStatus !== 'offline' && (
                <motion.div
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    duration: lagMs / 1000, 
                    ease: "linear",
                    repeat: Infinity
                  }}
                  className="absolute w-2 h-2 bg-sql-cyan shadow-[0_0_10px_#00e5ff] rotate-45"
                />
              )}
            </AnimatePresence>

            {/* Network Overlay Icons */}
            <div className="absolute -top-8 flex flex-col items-center">
              {networkStatus === 'stable' && <Wifi className="w-4 h-4 text-sql-green opacity-50" />}
              {networkStatus === 'congested' && <Clock className="w-4 h-4 text-sql-gold animate-pulse" />}
              {networkStatus === 'offline' && <WifiOff className="w-4 h-4 text-rose-500" />}
              <span className="text-[8px] mt-1 font-black text-slate-600">
                {networkStatus === 'stable' ? 'LOW_LATENCY' : networkStatus === 'congested' ? 'HIGH_LAG' : 'LINK_SEVERED'}
              </span>
            </div>

            {/* Metrics */}
            <div className="absolute -bottom-8 text-[9px] font-black tracking-widest text-slate-500">
              LAG_TIME: <span className={lagMs > 2000 ? 'text-sql-gold' : 'text-sql-cyan'}>{Math.round(lagMs)}MS</span>
            </div>
          </div>

          {/* Replica Node */}
          <div className="flex flex-col items-center space-y-4 relative z-10">
            <span className="text-[8px] font-black text-slate-500 tracking-widest">SRV_REPLICA_RO</span>
            <div className={`w-32 p-4 border transition-all ${replicaData.version === primaryData.version ? 'border-db-border' : 'border-sql-gold bg-sql-gold/5'}`}>
              <Database className={`w-8 h-8 ${replicaData.version === primaryData.version ? 'text-slate-700' : 'text-sql-gold animate-pulse'} mb-2`} />
              <div className="space-y-1">
                <div className="text-[7px] text-slate-600">VERSION: {replicaData.version}</div>
                <div className="text-[7px] text-slate-500 truncate">{replicaData.lastTx}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 w-full max-w-sm flex flex-col space-y-4">
          <button 
            onClick={simulateWrite}
            disabled={networkStatus === 'offline'}
            className={`w-full py-4 skew-x-[-12deg] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              networkStatus === 'offline' 
                ? 'bg-slate-900 text-slate-700 border border-db-border cursor-not-allowed'
                : 'bg-sql-blue hover:bg-sql-cyan text-white shadow-[6px_6px_0_0_#050507]'
            }`}
          >
            <span className="skew-x-[12deg] flex items-center gap-2">
              <Zap size={14} fill="currentColor" />
              EMIT_WRITE_COMMAND
            </span>
          </button>

          <div className="p-4 bg-db-panel/50 border border-db-border">
            <div className="text-[8px] font-black text-sql-cyan mb-2 tracking-[0.2em]">EVENT_LOG::SYNC_PROTOCOL</div>
            <p className="text-[9px] text-slate-500 leading-relaxed normal-case font-mono">
              {networkStatus === 'stable' && '> Replication stream is healthy. Consistent reads guaranteed within 1s.'}
              {networkStatus === 'congested' && '> Warning: Network congestion detected. High replication lag causing stale reads on replica.'}
              {networkStatus === 'offline' && '> Critical: Replication link severed. Primary and Replica are now inconsistent.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplicationLagVisualizer;

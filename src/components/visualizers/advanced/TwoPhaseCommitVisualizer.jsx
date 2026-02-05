import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Cpu, 
  ArrowRight, 
  Database, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Unlock,
  RefreshCw
} from 'lucide-react';

const TwoPhaseCommitVisualizer = () => {
  const [step, setPhaseStep] = useState('idle'); // idle, prepare, voting, commit, done
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Auth Service', status: 'idle', response: null },
    { id: 2, name: 'Billing Service', status: 'idle', response: null },
    { id: 3, name: 'Inventory Service', status: 'idle', response: null }
  ]);
  const [coordinatorStatus, setCoordinatorStatus] = useState('idle');

  const start2PC = () => {
    setPhaseStep('prepare');
    setCoordinatorStatus('preparing');
    setNodes(prev => prev.map(n => ({ ...n, status: 'receiving_prepare', response: null })));
  };

  const reset = () => {
    setPhaseStep('idle');
    setCoordinatorStatus('idle');
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle', response: null })));
  };

  useEffect(() => {
    if (step === 'prepare') {
      const timer = setTimeout(() => {
        setPhaseStep('voting');
        setNodes(prev => prev.map(n => ({ ...n, status: 'voting', response: 'READY' })));
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (step === 'voting') {
      const timer = setTimeout(() => {
        setPhaseStep('commit');
        setCoordinatorStatus('committing');
        setNodes(prev => prev.map(n => ({ ...n, status: 'committing' })));
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (step === 'commit') {
      const timer = setTimeout(() => {
        setPhaseStep('done');
        setCoordinatorStatus('success');
        setNodes(prev => prev.map(n => ({ ...n, status: 'done' })));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Network className="w-4 h-4 text-sapphire-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Distributed Consensus: 2PC</span>
        </div>
        {step !== 'idle' && (
          <button onClick={reset} className="text-slate-400 hover:text-sapphire-500 transition-colors flex items-center space-x-1 uppercase text-[10px] font-black">
            <RefreshCw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="p-8 flex flex-col items-center">
        {/* Coordinator Node */}
        <div className="relative mb-20">
          <motion.div 
            animate={{ 
              scale: coordinatorStatus === 'preparing' ? [1, 1.05, 1] : 1,
              borderColor: coordinatorStatus === 'success' ? '#10b981' : '#3b82f6'
            }}
            transition={{ duration: 0.5, repeat: coordinatorStatus === 'preparing' ? Infinity : 0 }}
            className={`w-48 p-4 rounded-2xl border-2 bg-white dark:bg-slate-950 shadow-xl flex flex-col items-center z-20 relative`}
          >
            <div className="p-2 rounded-xl bg-sapphire-500/10 text-sapphire-500 mb-2">
              <Cpu size={24} />
            </div>
            <span className="text-xs font-black uppercase text-slate-900 dark:text-white">Transaction Coordinator</span>
            <div className="mt-2 flex items-center space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full ${step === 'idle' ? 'bg-slate-300' : 'bg-sapphire-500 animate-pulse'}`} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {step === 'idle' ? 'Awaiting Tx' : step.toUpperCase()}
              </span>
            </div>
          </motion.div>

          {/* Connection Lines (SVGs) */}
          <svg className="absolute top-full left-1/2 -translate-x-1/2 w-full h-20 -z-10 pointer-events-none overflow-visible">
            {nodes.map((node, i) => {
              const xPos = (i - 1) * 160;
              return (
                <g key={node.id}>
                  <path 
                    d={`M 0 0 L ${xPos} 80`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-slate-200 dark:text-slate-800"
                  />
                  {step === 'prepare' && (
                    <motion.circle 
                      r="4" 
                      fill="#3b82f6"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ 
                        cx: xPos * 1, // Simplified path animation
                        cy: 80 
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Worker Nodes */}
        <div className="flex justify-center gap-8 w-full">
          {nodes.map((node) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex-1 max-w-[160px] p-4 rounded-2xl border bg-white dark:bg-slate-950 shadow-lg relative ${
                node.status === 'done' ? 'border-emerald-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Database className="w-4 h-4 text-slate-400" />
                {node.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : node.status === 'voting' ? (
                  <Lock className="w-4 h-4 text-amber-500" />
                ) : (
                  <Unlock className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <h5 className="text-[10px] font-black uppercase text-slate-900 dark:text-white truncate">{node.name}</h5>
              <div className="mt-2 min-h-[16px]">
                {node.response && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-black tracking-widest"
                  >
                    {node.response}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls & Description */}
        <div className="mt-12 w-full max-w-lg">
          {step === 'idle' ? (
            <button 
              onClick={start2PC}
              className="w-full py-4 bg-sapphire-600 hover:bg-sapphire-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-sapphire-500/20 flex items-center justify-center gap-3"
            >
              Simulate Distributed Tx
              <Zap size={16} fill="currentColor" />
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
              <h6 className="text-[10px] font-black uppercase text-sapphire-500 mb-2 tracking-widest">
                {step === 'prepare' && 'Phase 1: Prepare'}
                {step === 'voting' && 'Phase 1: Voting'}
                {step === 'commit' && 'Phase 2: Commit'}
                {step === 'done' && 'Transaction Finalized'}
              </h6>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {step === 'prepare' && 'The coordinator sends a "PREPARE" message to all nodes. Each node must check if it can locally commit the change.'}
                {step === 'voting' && 'All nodes have responded with "READY". They have now acquired local locks and are waiting for the final word.'}
                {step === 'commit' && 'The coordinator has received unanimous "READY" votes. It now sends the "COMMIT" command to materialize changes.'}
                {step === 'done' && 'All nodes have successfully committed. The distributed transaction is complete and consistent across all services.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoPhaseCommitVisualizer;

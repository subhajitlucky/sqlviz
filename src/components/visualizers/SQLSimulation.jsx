import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Database, Cpu, BarChart3, Search, Sparkles } from 'lucide-react';

const SQLSimulation = () => {
  const [step, setStep] = useState('idle'); // idle, parsing, optimizing, executing, finished
  const [planType, setPlanType] = useState(null); // 'index' or 'scan'

  const startSim = (type) => {
    setPlanType(type);
    setStep('parsing');
    setTimeout(() => setStep('optimizing'), 1000);
    setTimeout(() => setStep('executing'), 2500);
    setTimeout(() => setStep('finished'), 4500);
  };

  const reset = () => {
    setStep('idle');
    setPlanType(null);
  };

  const containerVariants = {
    idle: { opacity: 1 },
    parsing: { scale: 1 },
    optimizing: { scale: 1.02 },
    executing: { scale: 1 },
    finished: { scale: 1 }
  };

  return (
    <div className="relative w-full min-h-[350px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-8 transition-all">
      {/* Simulation Header */}
      <div className="absolute top-0 left-0 right-0 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-sapphire-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Live Engine Simulation</span>
        </div>
        {step !== 'idle' && (
          <button onClick={reset} className="text-slate-400 hover:text-sapphire-500 transition-colors">
            <RotateCcw size={14} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 'idle' ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="p-4 rounded-3xl bg-sapphire-500/10 text-sapphire-600 dark:text-sapphire-400">
              <Database size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">Interactive Declarative Contract</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Select a requirement to see how the engine handles the "How" automatically.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => startSim('index')}
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Query with Index
              </button>
              <button 
                onClick={() => startSim('scan')}
                className="px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Full Table Scan
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            variants={containerVariants}
            animate={step}
            className="w-full flex flex-col items-center justify-center space-y-12 py-10"
          >
            {/* Visual Pipeline */}
            <div className="flex items-center justify-between w-full max-w-md relative">
              {/* Connector Lines */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: step === 'finished' ? '100%' : '0%' }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-sapphire-500 to-transparent"
                />
              </div>

              {/* Node 1: Parser */}
              <div className="relative flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl border-2 transition-all flex items-center justify-center ${step === 'parsing' ? 'bg-sapphire-600 border-sapphire-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  <Search size={24} />
                </div>
                <span className="absolute -bottom-6 text-[8px] font-black uppercase tracking-widest text-slate-400">Parse</span>
              </div>

              {/* Node 2: Optimizer */}
              <div className="relative flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl border-2 transition-all flex items-center justify-center ${step === 'optimizing' ? 'bg-amber-500 border-amber-300 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  <Cpu size={24} />
                </div>
                <span className="absolute -bottom-6 text-[8px] font-black uppercase tracking-widest text-slate-400">Optimize</span>
              </div>

              {/* Node 3: Execution */}
              <div className="relative flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl border-2 transition-all flex items-center justify-center ${step === 'executing' ? 'bg-emerald-500 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  <Play size={24} className="fill-current" />
                </div>
                <span className="absolute -bottom-6 text-[8px] font-black uppercase tracking-widest text-slate-400">Execute</span>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center h-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {step === 'parsing' && "Deconstructing SQL Contract..."}
                    {step === 'optimizing' && (planType === 'index' ? "Optimizer chose INDEX SEEK (Cost: 0.004)" : "Optimizer chose SEQ SCAN (Cost: 45.2)")}
                    {step === 'executing' && (planType === 'index' ? "Navigating B-Tree for ID..." : "Scanning blocks 0-1042...")}
                    {step === 'finished' && "Data materialization complete!"}
                  </span>
                  {step === 'finished' && (
                    <motion.button 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      onClick={reset}
                      className="text-[10px] font-black text-sapphire-600 dark:text-sapphire-400 mt-2 uppercase tracking-widest"
                    >
                      Run Another Scenario
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Sparkle */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sapphire-500/10 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};

export default SQLSimulation;

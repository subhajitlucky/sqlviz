import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Database, Cpu, BarChart3, Search, Code, Table as TableIcon, ArrowDown } from 'lucide-react';

const SQLSimulation = () => {
  const [phase, setPhase] = useState('input'); // input, result, engine
  const [planType, setPlanType] = useState('index');

  const startSimulation = (type) => {
    setPlanType(type);
    setPhase('result');
    // Result shows for 1.5s, then automatically triggers engine explanation
    setTimeout(() => setPhase('engine'), 1500);
  };

  const reset = () => {
    setPhase('input');
  };

  const queryText = planType === 'index' 
    ? "SELECT * FROM stars WHERE id = 1;" 
    : "SELECT * FROM stars WHERE mag > 2.0;";

  const tableData = planType === 'index' 
    ? [{ id: 1, name: 'Sirius', mag: -1.46 }]
    : [{ id: 2, name: 'Canopus', mag: -0.74 }, { id: 4, name: 'Arcturus', mag: -0.05 }];

  return (
    <div className="w-full min-h-[450px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all">
      {/* Simulation Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-sapphire-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">The Declarative Process</span>
        </div>
        {phase !== 'input' && (
          <button onClick={reset} className="text-slate-400 hover:text-sapphire-500 transition-colors flex items-center space-x-1 uppercase text-[10px] font-black">
            <RotateCcw size={12} />
            <span>Restart</span>
          </button>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col">
        {/* STEP 1: THE SQL CONTRACT */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
              <Code size={14} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">1. The Declarative Contract (The "What")</h4>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-sm shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database size={40} />
            </div>
            <p className="text-white relative z-10">
              <span className="text-sapphire-400 font-bold">SELECT</span> * <br/>
              <span className="text-sapphire-400 font-bold">FROM</span> stars <br/>
              <span className="text-sapphire-400 font-bold">WHERE</span> {planType === 'index' ? 'id = 1' : 'mag > 2.0'};
            </p>
            {phase === 'input' && (
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => startSimulation('index')}
                  className="px-4 py-2 bg-sapphire-600 hover:bg-sapphire-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sapphire-500/20 transition-all active:scale-95"
                >
                  Run (Indexed)
                </button>
                <button 
                  onClick={() => startSimulation('scan')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  Run (Full Scan)
                </button>
              </div>
            )}
          </div>
        </section>

        {/* STEP 2: THE MATERIALIZED RESULT */}
        <AnimatePresence>
          {phase !== 'input' && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <TableIcon size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">2. Result Set (Immediate Outcome)</h4>
              </div>
              <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-4 py-2 text-slate-400 uppercase">ID</th>
                      <th className="px-4 py-2 text-slate-400 uppercase">Name</th>
                      <th className="px-4 py-2 text-slate-400 uppercase">Mag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <motion.tr 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-b border-slate-50 dark:border-slate-800/50"
                      >
                        <td className="px-4 py-2 text-sapphire-500 font-bold">{row.id}</td>
                        <td className="px-4 py-2 text-slate-900 dark:text-slate-300">{row.name}</td>
                        <td className="px-4 py-2 text-slate-400">{row.mag}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* STEP 3: THE ENGINE PROCESS */}
        <AnimatePresence>
          {phase === 'engine' && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Cpu size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">3. Under the Hood (The "How")</h4>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 relative">
                <div className="flex justify-between items-center max-w-sm mx-auto relative px-4">
                  {/* Connector */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 -z-0" />
                  
                  {[
                    { icon: Search, label: 'Parse', color: 'bg-sapphire-500', delay: 0 },
                    { icon: Cpu, label: 'Optimize', color: 'bg-amber-500', delay: 1 },
                    { icon: Play, label: 'Execute', color: 'bg-emerald-500', delay: 2 }
                  ].map((node, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: node.delay * 0.5 }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div className={`w-10 h-10 rounded-xl ${node.color} text-white flex items-center justify-center shadow-lg`}>
                        <node.icon size={18} />
                      </div>
                      <span className="mt-2 text-[8px] font-black uppercase tracking-tighter text-slate-400">{node.label}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-tight">
                    {planType === 'index' ? "Strategy: Index Seek" : "Strategy: Sequential Scan"}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {planType === 'index' 
                      ? "The optimizer found a B-Tree index on 'id'. Estimated cost: 0.004 units." 
                      : "No index covers 'mag'. Falling back to full table scan. Estimated cost: 45.2 units."}
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SQLSimulation;

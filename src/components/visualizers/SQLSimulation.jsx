import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Database, Cpu, BarChart3, Search, Code, Table as TableIcon, ArrowDown, TerminalSquare, HardDrive } from 'lucide-react';

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
    <div className="w-full min-h-[450px] flex flex-col bg-db-black border border-db-border shadow-2xl overflow-hidden transition-all font-mono uppercase">
      {/* Simulation Header */}
      <div className="px-6 py-4 bg-db-panel border-b border-db-border flex justify-between items-center relative">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-1.5 rounded-full bg-sql-green animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-slate-500">ENGINE_ORCHESTRATOR_V1.0</span>
        </div>
        {phase !== 'input' && (
          <button onClick={reset} className="text-slate-600 hover:text-sql-cyan transition-colors flex items-center space-x-2 text-[9px] font-black tracking-tighter">
            <RotateCcw size={12} />
            <span>RESET_STATE</span>
          </button>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col space-y-12">
        {/* STEP 1: THE SQL CONTRACT */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-1.5 border border-db-border bg-db-surface text-slate-600">
              <TerminalSquare size={14} />
            </div>
            <h4 className="text-[9px] font-black tracking-widest text-slate-600">01. DECLARATIVE_COMMAND (INPUT)</h4>
          </div>
          
          <div className="bg-db-surface/60 p-8 border border-db-border font-mono text-sm shadow-inner relative overflow-hidden group">
            {/* Terminal Glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-sql-cyan opacity-20 shadow-[0_0_10px_#00e5ff]" />
            
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <HardDrive size={48} />
            </div>
            
            <p className="text-slate-300 relative z-10 leading-relaxed">
              <span className="text-sql-cyan font-black tracking-tighter">SELECT</span> * <br/>
              <span className="text-sql-cyan font-black tracking-tighter">FROM</span> stars <br/>
              <span className="text-sql-cyan font-black tracking-tighter">WHERE</span> {planType === 'index' ? 'id = 1' : 'mag > 2.0'};
            </p>
            
            {phase === 'input' && (
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => startSimulation('index')}
                  className="px-6 py-3 bg-sql-blue hover:bg-sql-cyan text-white skew-x-[-12deg] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-sql-blue/10 transition-all active:scale-95"
                >
                  <span className="skew-x-[12deg]">RUN_INDEX_SEEK</span>
                </button>
                <button 
                  onClick={() => startSimulation('scan')}
                  className="px-6 py-3 bg-db-panel border border-db-border hover:bg-db-surface text-slate-400 skew-x-[-12deg] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  <span className="skew-x-[12deg]">RUN_SEQ_SCAN</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* STEP 2: THE MATERIALIZED RESULT */}
        <AnimatePresence>
          {phase !== 'input' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-1.5 border border-db-border bg-db-surface text-sql-green">
                  <TableIcon size={14} />
                </div>
                <h4 className="text-[9px] font-black tracking-widest text-slate-600">02. RESULT_SET (OUTPUT)</h4>
              </div>
              <div className="bg-db-panel border border-db-border overflow-hidden shadow-2xl">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead className="bg-db-black/40 border-b border-db-border text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-black tracking-tighter">ID</th>
                      <th className="px-4 py-3 font-black tracking-tighter">NAME</th>
                      <th className="px-4 py-3 font-black tracking-tighter">MAG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <motion.tr 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-b border-db-border/20 last:border-0"
                      >
                        <td className="px-4 py-2.5 text-sql-cyan font-bold">0{row.id}</td>
                        <td className="px-4 py-2.5 text-slate-300">{row.name}</td>
                        <td className="px-4 py-2.5 text-slate-500">{row.mag}</td>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-1.5 border border-db-border bg-db-surface text-sql-gold">
                  <Cpu size={14} />
                </div>
                <h4 className="text-[9px] font-black tracking-widest text-slate-600">03. ENGINE_INTERNALS (HOW)</h4>
              </div>
              
              <div className="bg-db-surface p-8 border border-db-border relative overflow-hidden">
                <div className="flex justify-between items-center max-w-sm mx-auto relative px-4">
                  {/* Connector */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-db-border -translate-y-1/2 -z-0" />
                  
                  {[
                    { icon: Search, label: 'PARSE', color: 'text-sql-cyan', delay: 0 },
                    { icon: Cpu, label: 'OPTIMIZE', color: 'text-sql-gold', delay: 1 },
                    { icon: Play, label: 'EXECUTE', color: 'text-sql-green', delay: 2 }
                  ].map((node, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: node.delay * 0.3 }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div className={`w-12 h-12 border-2 border-db-border bg-db-panel ${node.color} flex items-center justify-center shadow-xl`}>
                        <node.icon size={20} />
                      </div>
                      <span className="mt-3 text-[8px] font-black tracking-tighter text-slate-600">{node.label}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-10 pt-8 border-t border-db-border text-center"
                >
                  <p className="text-[10px] font-black text-white mb-2 tracking-widest">
                    {planType === 'index' ? "EXECUTION_STRATEGY:: INDEX_SEEK" : "EXECUTION_STRATEGY:: SEQUENTIAL_SCAN"}
                  </p>
                  <p className="text-[9px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                    {planType === 'index' 
                      ? "BTREE_MATCH_DETECTED: TARGET_BLOCK_ID_004. ESTIMATED_COST: 0.004_UNIT." 
                      : "INDEX_MISS: FALLBACK_TO_CORE_STORAGE. ESTIMATED_COST: 45.2_UNIT."}
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

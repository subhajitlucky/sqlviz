import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Database, 
  Table as TableIcon, 
  Activity, 
  CheckCircle, 
  Search, 
  Layers, 
  ChevronRight, 
  Cpu, 
  TerminalSquare, 
  Binary, 
  ShieldCheck, 
  DatabaseZap,
  HardDrive
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Playground = () => {
  const { theme, playgroundState, setQuery } = useStore();
  const [activeTab, setActiveTab] = useState('editor');
  const [localQuery, setLocalQuery] = useState(playgroundState.query);
  const [activeHighlights, setActiveHighlights] = useState({}); // {tableName: [indices]}
  const [resultRows, setResultRows] = useState([]);
  const [currentPlanStep, setCurrentPlanStep] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);

  const tables = playgroundState.tables;

  const runQuery = async () => {
    setIsExecuting(true);
    setActiveHighlights({});
    setResultRows([]);
    setCurrentPlanStep(-1);
    setActiveTab('plan');

    const query = localQuery.toLowerCase();
    
    // --- QUERY PARSING & EXECUTION SIMULATION ---
    let steps = [];
    
    if (query.includes('join')) {
      steps = [
        { type: 'info', text: 'INITIATING_HASH_JOIN...' },
        { type: 'scan', text: 'SCANNING_USERS_TABLE...', table: 'users' },
        { type: 'scan', text: 'SCANNING_ORDERS_TABLE...', table: 'orders' },
        { type: 'match', text: 'REMAP_MATCH: users.id = orders.user_id' },
        { type: 'success', text: 'JOIN_COMPLETE: RESULT_SET_GENERATED' }
      ];
      setExecutionSteps(steps);

      for (let i = 0; i < steps.length; i++) {
        setCurrentPlanStep(i);
        if (steps[i].table) {
          const table = tables.find(t => t.name === steps[i].table);
          for (let j = 0; j < table.data.length; j++) {
            setActiveHighlights({ [steps[i].table]: [j] });
            await new Promise(r => setTimeout(r, 200));
          }
        } else if (steps[i].type === 'match') {
          const users = tables.find(t => t.name === 'users');
          const orders = tables.find(t => t.name === 'orders');
          for (let uIdx = 0; uIdx < users.data.length; uIdx++) {
            setActiveHighlights({ users: [uIdx] });
            for (let oIdx = 0; oIdx < orders.data.length; oIdx++) {
              setActiveHighlights({ users: [uIdx], orders: [oIdx] });
              await new Promise(r => setTimeout(r, 100));
              if (users.data[uIdx].id === orders.data[oIdx].user_id) {
                const combinedRow = { ...users.data[uIdx], ...orders.data[oIdx] };
                setResultRows(prev => [...prev, combinedRow]);
              }
            }
          }
        }
        await new Promise(r => setTimeout(r, 400));
      }
    } else if (query.includes('id = 1')) {
      steps = [
        { type: 'info', text: 'PLAN_SEEK: users.id' },
        { type: 'seek', text: 'BTREE_SEEK: users_pkey (id=1)' },
        { type: 'success', text: 'DATA_LOCATED: FETCHING_PAGES' }
      ];
      setExecutionSteps(steps);
      for (let i = 0; i < steps.length; i++) {
        setCurrentPlanStep(i);
        if (steps[i].type === 'seek') {
          await new Promise(r => setTimeout(r, 800));
          setActiveHighlights({ users: [0] });
          setResultRows([tables[0].data[0]]);
        }
        await new Promise(r => setTimeout(r, 600));
      }
    } else if (query.includes('age > 25')) {
      steps = [
        { type: 'info', text: 'MISSING_INDEX: "age". PLANNING_SEQ_SCAN.' },
        { type: 'scan', text: 'SEQ_SCAN: users_storage' },
        { type: 'filter', text: 'FILTER_PREDICATE: age > 25' },
        { type: 'success', text: 'SCAN_COMPLETE: BUFFER_FLUSHED' }
      ];
      setExecutionSteps(steps);
      const userTable = tables.find(t => t.name === 'users');
      for (let i = 0; i < steps.length; i++) {
        setCurrentPlanStep(i);
        if (steps[i].type === 'scan' || steps[i].type === 'filter') {
          for (let j = 0; j < userTable.data.length; j++) {
            setActiveHighlights({ users: [j] });
            if (steps[i].type === 'filter' && userTable.data[j].age > 25) {
              setResultRows(prev => [...prev, userTable.data[j]]);
            }
            await new Promise(r => setTimeout(r, 300));
          }
        }
        await new Promise(r => setTimeout(r, 400));
      }
    } else {
      setExecutionSteps([{ type: 'error', text: 'UNSUPPORTED_OP: Supports id=1, age>25, or JOIN' }]);
    }

    setIsExecuting(false);
    setActiveHighlights({});
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden bg-db-black transition-colors duration-300 relative">
      {/* Structural Data Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        {/* Sidebar / Table Explorer (Col 1-2) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col border-r border-db-border bg-db-surface/80 backdrop-blur-xl p-4 space-y-8 font-mono">
          <div className="flex items-center space-x-2 text-white font-black text-[10px] uppercase tracking-widest border-b border-db-border pb-4">
            <HardDrive className="w-3 h-3 text-sql-cyan" />
            <span>SCHEMA_BROWSER</span>
          </div>
          <div className="space-y-6">
            {tables.map(table => (
              <div key={table.name} className="group cursor-pointer">
                <div className="flex items-center space-x-2 text-slate-500 hover:text-sql-cyan transition-colors">
                  <TableIcon className="w-3 h-3" />
                  <span className="text-[11px] font-black tracking-tighter uppercase">{table.name}</span>
                </div>
                <div className="mt-3 ml-2 space-y-1.5 border-l border-db-border pl-4 hidden group-hover:block transition-all">
                  {table.columns.map(col => (
                    <div key={col} className="text-[9px] text-slate-600 hover:text-sql-green font-mono py-0.5 transition-colors cursor-default">
                      {col.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area (Col 3-7) */}
        <div className="lg:col-span-5 flex flex-col border-r border-db-border bg-db-surface shadow-2xl relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-db-border bg-db-panel/50">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`text-[9px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all ${activeTab === 'editor' ? 'border-sql-cyan text-sql-cyan' : 'border-transparent text-slate-600 hover:text-slate-400'}`}
              >
                SQL_EDITOR
              </button>
              <button 
                onClick={() => setActiveTab('plan')}
                className={`text-[9px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all ${activeTab === 'plan' ? 'border-sql-cyan text-sql-cyan' : 'border-transparent text-slate-600 hover:text-slate-400'}`}
              >
                ENGINE_LOG
              </button>
            </div>
            <button 
              onClick={runQuery}
              disabled={isExecuting}
              className={`group px-6 py-2 rounded-none skew-x-[-12deg] font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isExecuting ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-sql-blue hover:bg-sql-cyan text-white shadow-[4px_4px_0_0_#050507]'}`}
            >
              <span className="skew-x-[12deg] flex items-center">
                <Play className={`w-3 h-3 mr-2 fill-current ${isExecuting ? 'animate-pulse' : ''}`} /> 
                {isExecuting ? 'EXECUTING...' : 'RUN_COMMAND'}
              </span>
            </button>
          </div>

          <div className="flex-grow relative overflow-hidden bg-black/40">
            {/* Terminal Scanline Effect */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,2px_100%]" />
            
            <AnimatePresence mode="wait">
              {activeTab === 'editor' ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <textarea
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="w-full h-full bg-transparent text-slate-300 p-8 font-mono text-sm focus:outline-none resize-none placeholder-slate-800 uppercase leading-relaxed"
                    spellCheck="false"
                    placeholder="-- ENTER_SQL_COMMAND_HERE..."
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-8 font-mono text-[10px] overflow-y-auto h-full space-y-8"
                >
                  <div className="mb-10 p-4 border border-db-border bg-db-panel text-sql-cyan/80 flex items-center shadow-inner relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-sql-cyan/20 shadow-[0_0_10px_#00e5ff]" />
                    <TerminalSquare className="w-4 h-4 mr-3" />
                    <span className="font-black uppercase tracking-widest text-[9px]">DEBUG:: EXPLAIN ANALYZE {localQuery}</span>
                  </div>
                  
                  <div className="space-y-10 border-l border-db-border ml-2">
                    {executionSteps.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: idx <= currentPlanStep ? 1 : 0.2,
                        }}
                        className={`relative flex items-start space-x-6 pl-8 transition-all`}
                      >
                        {/* Node Marker */}
                        <div className={`absolute left-[-5px] top-1.5 w-2 h-2 rotate-45 border ${idx === currentPlanStep ? 'bg-sql-cyan border-sql-cyan animate-pulse' : 'bg-db-surface border-db-border'}`} />
                        
                        <div className={`p-2 border transition-colors ${idx === currentPlanStep ? 'bg-sql-cyan/10 border-sql-cyan text-sql-cyan shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-db-panel border-db-border text-slate-600'}`}>
                          {step.type === 'success' ? <CheckCircle className="w-3 h-3" /> : 
                           step.type === 'scan' ? <Search className="w-3 h-3" /> : 
                           <Activity className="w-3 h-3" />}
                        </div>
                        <div className="flex flex-col uppercase">
                          <span className={`text-xs tracking-widest ${idx === currentPlanStep ? "font-black text-white" : "text-slate-600"}`}>
                            {step.text}
                          </span>
                          {step.table && idx === currentPlanStep && (
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-[8px] bg-sql-blue/20 text-sql-cyan px-1.5 py-0.5 font-black border border-sql-blue/30">IO_ACCESS</span>
                              <span className="text-[8px] text-slate-500 font-bold tracking-tighter">STORAGE_TARGET: {step.table.toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Visualization Area (Col 8-12) */}
        <div className="lg:col-span-5 flex flex-col bg-db-panel/20 backdrop-blur-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-db-border bg-db-black/20">
             <div className="flex items-center space-x-3">
               <CpuChip className="w-4 h-4 text-slate-600" />
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">COMPUTE_VISUALIZER_V4.0</span>
             </div>
          </div>
          
          <div className="flex-grow p-10 flex flex-col items-center space-y-12 overflow-y-auto custom-scrollbar relative">
            <div className="grid grid-cols-1 gap-10 w-full max-w-lg">
              {tables.map((table) => (
                <motion.div 
                  key={table.name} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-db-border bg-db-surface/40 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                >
                  <div className="bg-db-panel/80 px-4 py-3 flex items-center justify-between border-b border-db-border">
                    <div className="flex items-center space-x-2">
                      <TableIcon className="w-3 h-3 text-sql-cyan" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{table.name}</span>
                    </div>
                    <div className="text-[8px] font-black text-slate-600 tracking-widest border border-db-border px-2 py-0.5">
                      {table.data.length}_ROWS
                    </div>
                  </div>
                  <div className="overflow-x-auto font-mono uppercase">
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr className="bg-db-black/40 text-slate-600 text-[9px] border-b border-db-border">
                          {table.columns.map(col => <th key={col} className="px-4 py-3 font-black tracking-tighter">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-db-border/20">
                        {table.data.map((row, i) => (
                          <motion.tr 
                            key={i} 
                            animate={{ 
                              backgroundColor: activeHighlights[table.name]?.includes(i) 
                                ? 'rgba(0, 229, 255, 0.1)'
                                : 'transparent',
                              borderLeft: activeHighlights[table.name]?.includes(i)
                                ? '2px solid #00e5ff'
                                : '0px solid transparent',
                              color: activeHighlights[table.name]?.includes(i)
                                ? '#00e5ff'
                                : '#475569'
                            }}
                            className="transition-all"
                          >
                            {table.columns.map(col => <td key={col} className="px-4 py-2.5">{row[col]}</td>)}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results Area */}
            <AnimatePresence>
              {resultRows.length > 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full max-w-lg border border-sql-green/30 bg-db-black/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,255,157,0.1)] relative"
                >
                  <div className="bg-sql-green/10 border-b border-sql-green/20 px-4 py-3 flex items-center justify-between text-sql-green">
                    <div className="flex items-center space-x-3">
                      <Layers className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Query_Results</span>
                    </div>
                    <span className="text-[9px] font-black border border-sql-green/30 px-2 py-0.5">{resultRows.length}_FOUND</span>
                  </div>
                  <div className="max-h-64 overflow-auto custom-scrollbar font-mono uppercase">
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr className="bg-db-panel/40 text-slate-600 text-[9px] border-b border-db-border">
                          {Object.keys(resultRows[0]).map(col => <th key={col} className="px-4 py-3 tracking-tighter">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-db-border/20">
                        {resultRows.map((row, i) => (
                          <motion.tr 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-sql-green/5 transition-colors"
                          >
                            {Object.values(row).map((val, j) => <td key={j} className="px-4 py-2.5 text-slate-300">{val}</td>)}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;

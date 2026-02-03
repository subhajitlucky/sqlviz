import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RotateCcw, Database, Table as TableIcon, Activity, CheckCircle, Search, Layers, ChevronRight, Cpu } from 'lucide-react';
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
        { type: 'info', text: 'Initiating Hash Join...' },
        { type: 'scan', text: 'Scanning users table...', table: 'users' },
        { type: 'scan', text: 'Scanning orders table...', table: 'orders' },
        { type: 'match', text: 'Matching rows on users.id = orders.user_id' },
        { type: 'success', text: 'Join complete. Returning results.' }
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
        { type: 'info', text: 'Planning Index Seek on users.id' },
        { type: 'seek', text: 'Index Seek (B-Tree) on users_pkey (id=1)' },
        { type: 'success', text: 'Row found. Fetching data.' }
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
        { type: 'info', text: 'No index found for "age". Planning Sequential Scan.' },
        { type: 'scan', text: 'Seq Scan on users...' },
        { type: 'filter', text: 'Filtering: age > 25' },
        { type: 'success', text: 'Scan complete.' }
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
      setExecutionSteps([{ type: 'error', text: 'Simulated engine supports: id=1, age>25, or JOIN' }]);
    }

    setIsExecuting(false);
    setActiveHighlights({});
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sapphire-500/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        {/* Sidebar / Table Explorer (Col 1-2) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-tighter">
            <Database className="w-4 h-4 text-sapphire-600" />
            <span>Schema Browser</span>
          </div>
          <div className="space-y-4">
            {tables.map(table => (
              <div key={table.name} className="group cursor-pointer">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-sapphire-600 transition-colors">
                  <TableIcon className="w-3 h-3" />
                  <span className="text-sm font-bold font-mono">{table.name}</span>
                </div>
                <div className="mt-2 ml-5 space-y-1 border-l border-slate-200 dark:border-slate-800 pl-3 hidden group-hover:block">
                  {table.columns.map(col => (
                    <div key={col} className="text-[10px] text-slate-400 font-mono py-0.5">{col}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area (Col 3-7) */}
        <div className="lg:col-span-5 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'editor' ? 'border-sapphire-600 text-slate-900 dark:text-white' : 'border-transparent text-slate-400'}`}
              >
                Query Editor
              </button>
              <button 
                onClick={() => setActiveTab('plan')}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'plan' ? 'border-sapphire-600 text-slate-900 dark:text-white' : 'border-transparent text-slate-400'}`}
              >
                Engine Output
              </button>
            </div>
            <button 
              onClick={runQuery}
              disabled={isExecuting}
              className={`group bg-sapphire-600 hover:bg-sapphire-700 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center transition-all shadow-lg shadow-sapphire-500/20 ${isExecuting ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
            >
              <Play className={`w-3 h-3 mr-2 fill-current ${isExecuting ? 'animate-pulse' : ''}`} /> 
              {isExecuting ? 'RUNNING...' : 'EXECUTE'}
            </button>
          </div>

          <div className="flex-grow relative overflow-hidden">
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
                    className="w-full h-full bg-transparent text-slate-800 dark:text-sapphire-50 p-8 font-mono text-base focus:outline-none resize-none placeholder-slate-300 dark:placeholder-slate-700"
                    spellCheck="false"
                    placeholder="-- Select users from table..."
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 font-mono text-xs overflow-y-auto h-full"
                >
                  <div className="mb-8 p-4 rounded-xl bg-slate-900 text-sapphire-400 border border-slate-800 flex items-center shadow-inner">
                    <Terminal className="w-4 h-4 mr-3" />
                    <span className="font-bold uppercase tracking-tighter text-[10px]">EXPLAIN ANALYZE {localQuery}</span>
                  </div>
                  <div className="space-y-6">
                    {executionSteps.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: idx <= currentPlanStep ? 1 : 0.3,
                        }}
                        className={`flex items-start space-x-4 pl-4 border-l-2 transition-all ${idx === currentPlanStep ? 'border-sapphire-500' : 'border-slate-200 dark:border-slate-800'}`}
                      >
                        <div className={`mt-0.5 p-1 rounded-md ${idx === currentPlanStep ? 'bg-sapphire-500 text-white shadow-lg shadow-sapphire-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                          {step.type === 'success' ? <CheckCircle className="w-3 h-3" /> : 
                           step.type === 'scan' ? <Search className="w-3 h-3" /> : 
                           <Activity className="w-3 h-3" />}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm ${idx === currentPlanStep ? "font-black text-slate-900 dark:text-white" : "text-slate-400"}`}>
                            {step.text}
                          </span>
                          {step.table && idx === currentPlanStep && (
                            <span className="text-[9px] text-sapphire-500 font-bold uppercase mt-1">Accessing Storage: {step.table}</span>
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
        <div className="lg:col-span-5 flex flex-col bg-slate-100/50 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
             <div className="flex items-center space-x-2">
               <Cpu className="w-4 h-4 text-slate-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Engine v4.0</span>
             </div>
          </div>
          
          <div className="flex-grow p-6 md:p-10 flex flex-col items-center space-y-10 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-8 w-full max-w-lg">
              {tables.map((table) => (
                <motion.div 
                  key={table.name} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl"
                >
                  <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <TableIcon className="w-4 h-4 text-sapphire-600" />
                      <span className="text-xs font-black font-mono uppercase tracking-tighter text-slate-900 dark:text-white">{table.name}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-[8px] font-bold text-slate-500">
                      {table.data.length} ROWS
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-[10px] border-b border-slate-100 dark:border-slate-800">
                          {table.columns.map(col => <th key={col} className="px-4 py-2 font-black uppercase">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {table.data.map((row, i) => (
                          <motion.tr 
                            key={i} 
                            animate={{ 
                              backgroundColor: activeHighlights[table.name]?.includes(i) 
                                ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.1)')
                                : 'transparent',
                              x: activeHighlights[table.name]?.includes(i) ? 4 : 0,
                              color: activeHighlights[table.name]?.includes(i)
                                ? (theme === 'dark' ? '#fff' : '#1e293b')
                                : (theme === 'dark' ? '#64748b' : '#94a3b8')
                            }}
                            className="transition-colors"
                          >
                            {table.columns.map(col => <td key={col} className="px-4 py-2">{row[col]}</td>)}
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
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  className="w-full max-w-lg border-2 border-emerald-500/20 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-[0_32px_64px_-12px_rgba(16,185,129,0.2)]"
                >
                  <div className="bg-emerald-500 dark:bg-emerald-600 px-4 py-3 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Query Results</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 rounded-full">{resultRows.length} ROWS FOUND</span>
                  </div>
                  <div className="max-h-64 overflow-auto custom-scrollbar">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-[10px] border-b border-slate-200 dark:border-slate-700">
                          {Object.keys(resultRows[0]).map(col => <th key={col} className="px-4 py-2 uppercase font-black">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {resultRows.map((row, i) => (
                          <motion.tr 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            {Object.values(row).map((val, j) => <td key={j} className="px-4 py-2 text-slate-700 dark:text-slate-200 font-medium">{val}</td>)}
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

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RotateCcw, Database, Table as TableIcon, Activity, CheckCircle, Search, Layers } from 'lucide-react';
import { useStore } from '../store/useStore';

const Playground = () => {
  const { theme, playgroundState, setQuery, setIsExecuting, setExecutionSteps } = useStore();
  const [activeTab, setActiveTab] = useState('editor');
  const [localQuery, setLocalQuery] = useState(playgroundState.query);
  const [activeHighlights, setActiveHighlights] = useState({}); // {tableName: [indices]}
  const [resultRows, setResultRows] = useState([]);
  const [currentPlanStep, setCurrentPlanStep] = useState(-1);

  const tables = playgroundState.tables;

  const runQuery = async () => {
    setIsExecuting(true);
    setActiveHighlights({});
    setResultRows([]);
    setCurrentPlanStep(-1);
    setActiveTab('plan');

    const query = localQuery.toLowerCase();
    
    // --- QUERY PARSING & EXECUTION SIMULATION ---
    
    if (query.includes('join')) {
      // JOIN SIMULATION
      const steps = [
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
          // Animate join matching
          const users = tables.find(t => t.name === 'users');
          const orders = tables.find(t => t.name === 'orders');
          const matches = [];
          
          for (let uIdx = 0; uIdx < users.data.length; uIdx++) {
            setActiveHighlights({ users: [uIdx] });
            for (let oIdx = 0; oIdx < orders.data.length; oIdx++) {
              setActiveHighlights({ users: [uIdx], orders: [oIdx] });
              await new Promise(r => setTimeout(r, 150));
              
              if (users.data[uIdx].id === orders.data[oIdx].user_id) {
                const combinedRow = { ...users.data[uIdx], ...orders.data[oIdx] };
                matches.push(combinedRow);
                setResultRows(prev => [...prev, combinedRow]);
              }
            }
          }
        }
        await new Promise(r => setTimeout(r, 500));
      }

    } else if (query.includes('id = 1')) {
      // INDEX SEEK SIMULATION
      const steps = [
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
      // SEQUENTIAL SCAN SIMULATION
      const steps = [
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
            if (userTable.data[j].age > 25) {
              setResultRows(prev => [...prev, userTable.data[j]]);
            }
            await new Promise(r => setTimeout(r, 400));
          }
        }
        await new Promise(r => setTimeout(r, 500));
      }
    } else {
      setExecutionSteps([{ type: 'error', text: 'Simulated engine supports: id=1, age>25, or JOIN' }]);
    }

    setIsExecuting(false);
    setActiveHighlights({});
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden transition-colors duration-300">
      {/* Mobile Toggle Tabs */}
      <div className="flex lg:hidden items-center justify-around bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2">
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'editor' || activeTab === 'plan' ? 'bg-white dark:bg-slate-800 text-sapphire-600 shadow-sm' : 'text-slate-400'}`}
        >
          EDITOR
        </button>
        <button 
          onClick={() => setActiveTab('viz')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'viz' ? 'bg-white dark:bg-slate-800 text-sapphire-600 shadow-sm' : 'text-slate-400'}`}
        >
          VISUALIZATION
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Side: Editor & Steps */}
        <div className={`flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 ${(activeTab === 'editor' || activeTab === 'plan') ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`text-xs font-mono uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'editor' ? 'border-sapphire-600 dark:border-sapphire-500 text-slate-900 dark:text-white font-bold' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
              >
                SQL Editor
              </button>
              <button 
                onClick={() => setActiveTab('plan')}
                className={`text-xs font-mono uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'plan' ? 'border-sapphire-600 dark:border-sapphire-500 text-slate-900 dark:text-white font-bold' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
              >
                Execution Plan
              </button>
            </div>
            <button 
              onClick={runQuery}
              disabled={playgroundState.isExecuting}
              className={`bg-sapphire-600 hover:bg-sapphire-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center transition-all shadow-md shadow-sapphire-500/20 ${playgroundState.isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Play className="w-3 h-3 mr-1 fill-current" /> EXECUTE
            </button>
          </div>

          <div className="flex-grow relative overflow-auto">
            {activeTab === 'editor' ? (
              <textarea
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-sapphire-100 p-6 font-mono text-sm focus:outline-none resize-none"
                spellCheck="false"
                placeholder="Type your query here..."
              />
            ) : (
              <div className="p-6 font-mono text-xs">
                <div className="mb-6 text-sapphire-600 dark:text-sapphire-400 flex items-center font-bold">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>EXPLAIN ANALYZE {localQuery}</span>
                </div>
                <div className="space-y-4">
                  {playgroundState.executionSteps.map((step, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: idx <= currentPlanStep ? 1 : 0.3,
                        color: idx === currentPlanStep 
                          ? (theme === 'dark' ? '#60a5fa' : '#2563eb') 
                          : (theme === 'dark' ? '#94a3b8' : '#64748b')
                      }}
                      className={`flex items-start space-x-3 pl-4 border-l-2 ${idx === currentPlanStep ? 'border-sapphire-500' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      {step.type === 'success' ? <CheckCircle className="w-3 h-3 mt-0.5 text-emerald-500" /> : 
                       step.type === 'scan' ? <Search className="w-3 h-3 mt-0.5" /> : 
                       <Activity className="w-3 h-3 mt-0.5" />}
                      <span className={idx === currentPlanStep ? "font-bold" : ""}>{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visualization */}
        <div className={`bg-slate-100 dark:bg-slate-900 flex flex-col overflow-hidden ${activeTab === 'viz' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
             <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">Visualization Engine</span>
          </div>
          
          <div className="flex-grow p-4 md:p-8 flex flex-col items-center justify-start space-y-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
              {tables.map((table) => (
                <div key={table.name} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-950 shadow-lg min-w-0">
                  <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700">
                    <TableIcon className="w-3 h-3 text-sapphire-600 dark:text-sapphire-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">{table.name}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] font-mono text-left min-w-[200px]">
                      <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                          {table.columns.map(col => <th key={col} className="px-2 py-1">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {table.data.map((row, i) => (
                          <motion.tr 
                            key={i} 
                            animate={{ 
                              backgroundColor: activeHighlights[table.name]?.includes(i) 
                                ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.1)')
                                : 'transparent',
                              scale: activeHighlights[table.name]?.includes(i) ? 1.02 : 1,
                              color: activeHighlights[table.name]?.includes(i)
                                ? (theme === 'dark' ? '#fff' : '#1e293b')
                                : (theme === 'dark' ? '#94a3b8' : '#64748b')
                            }}
                            className="border-b border-slate-50 dark:border-slate-800/50 transition-colors"
                          >
                            {table.columns.map(col => <td key={col} className="px-2 py-1">{row[col]}</td>)}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Area */}
            <AnimatePresence>
              {resultRows.length > 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full max-w-2xl border border-emerald-500/30 rounded-lg overflow-hidden bg-white dark:bg-slate-950 shadow-2xl min-w-0"
                >
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 flex items-center justify-between border-b border-emerald-500/30">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300">QUERY RESULT</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500/70">{resultRows.length} rows returned</span>
                  </div>
                  <div className="max-h-60 overflow-auto">
                    <table className="w-full text-[10px] font-mono text-left min-w-[300px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800">
                          {Object.keys(resultRows[0]).map(col => <th key={col} className="px-2 py-1">{col}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {resultRows.map((row, i) => (
                          <motion.tr 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                          >
                            {Object.values(row).map((val, j) => <td key={j} className="px-2 py-1 text-slate-700 dark:text-slate-300">{val}</td>)}
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

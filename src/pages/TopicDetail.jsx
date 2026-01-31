import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, Zap, Database, Play, BarChart3, AlertCircle, Code, ChevronRight } from 'lucide-react';
import { concepts } from '../data/blueprint';

// --- Visual Components ---

const TableVisualizer = ({ id }) => {
  const rows = [
    { id: 1, name: 'Sirius', mag: -1.46, type: 'Main' },
    { id: 2, name: 'Canopus', mag: -0.74, type: 'Giant' },
    { id: 3, name: 'Rigil Kent', mag: -0.27, type: 'Triple' },
    { id: 4, name: 'Arcturus', mag: -0.05, type: 'Giant' },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden font-mono text-[11px] transition-colors shadow-sm">
      <div className="grid grid-cols-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 p-2 text-slate-500 uppercase tracking-tighter">
        <div>ID</div><div>Name</div><div>Magnitude</div><div>Type</div>
      </div>
      {rows.map((row, i) => (
        <motion.div 
          key={row.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="grid grid-cols-4 p-2 border-b border-slate-100 dark:border-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-sapphire-50 dark:hover:bg-sapphire-900/10 transition-colors"
        >
          <div className="text-sapphire-600 dark:text-sapphire-500 font-bold">{row.id}</div>
          <div>{row.name}</div>
          <div className={row.mag < 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-500 dark:text-slate-400"}>{row.mag}</div>
          <div className="text-slate-400 dark:text-slate-500">{row.type}</div>
        </motion.div>
      ))}
    </div>
  );
};

const ExecutionFlow = ({ type }) => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/50 overflow-hidden shadow-sm transition-colors">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Dynamic Flow Visual */}
      <div className="flex items-center space-x-8 z-10">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], borderColor: ['#e2e8f0', '#3b82f6', '#e2e8f0'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-sapphire-600 dark:text-sapphire-400 shadow-sm"
        >
          <Database size={24} />
        </motion.div>
        
        <div className="relative w-24 h-2">
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
          <motion.div 
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-4 h-full bg-sapphire-500 dark:bg-sapphire-400 rounded-full shadow-[0_0_10px_#3b82f6]"
          ></motion.div>
        </div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-sm"
        >
          <Zap size={24} />
        </motion.div>

        <div className="relative w-24 h-2">
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
          <motion.div 
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
            className="absolute top-0 w-4 h-full bg-sapphire-500 dark:bg-sapphire-400 rounded-full shadow-[0_0_10px_#3b82f6]"
          ></motion.div>
        </div>

        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm"
        >
          <BarChart3 size={24} />
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-around text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        <span>Storage</span>
        <span>Optimization</span>
        <span>Results</span>
      </div>
    </div>
  );
};

const QueryExample = ({ query }) => {
  const parts = query.split(' ');
  const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'OFFSET', 'JOIN', 'ON', 'GROUP', 'HAVING', 'WITH', 'CREATE', 'INDEX', 'ALTER', 'TABLE', 'ADD', 'PRIMARY', 'KEY', 'INSERT', 'INTO', 'VALUES'];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed group shadow-inner transition-colors">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-900 pb-2">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest">SQL EXECUTOR</span>
      </div>
      <p className="text-slate-600 dark:text-slate-400">
        {parts.map((part, i) => (
          <span key={i} className={keywords.includes(part.toUpperCase()) ? "text-sapphire-600 dark:text-sapphire-400 font-bold" : "text-slate-800 dark:text-slate-300"}>
            {part}{' '}
          </span>
        ))}
      </p>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        className="h-0.5 bg-sapphire-500/30 mt-4 rounded-full"
      ></motion.div>
    </div>
  );
};

// --- Main Page Component ---

const TopicDetail = () => {
  const { id } = useParams();
  const concept = concepts.find(c => c.id === id);

  if (!concept) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 dark:bg-slate-950">
        <AlertCircle size={48} className="mb-4 text-slate-300 dark:text-slate-800" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Concept Orbit Not Found</h2>
        <Link to="/path" className="mt-4 text-sapphire-600 dark:text-sapphire-400 hover:underline">Return to Learning Path</Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-200 selection:bg-sapphire-500/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Navigation */}
        <nav className="mb-12 flex items-center justify-between">
          <Link to="/path" className="group flex items-center text-sm text-slate-500 dark:text-slate-500 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Map
          </Link>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-tighter">
            <span>INDEX: {concept.path}</span>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{concept.id}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sapphire-50 dark:bg-sapphire-950/30 border border-sapphire-100 dark:border-sapphire-900/50 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-sapphire-600 dark:bg-sapphire-400 animate-pulse"></div>
                <span className="text-[10px] font-bold text-sapphire-600 dark:text-sapphire-400 uppercase tracking-widest">{concept.difficulty}</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-500 dark:bg-clip-text dark:text-transparent mb-6">
                {concept.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {concept.definition}
              </p>
            </motion.header>

            {/* Performance Panel */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 relative overflow-hidden group shadow-sm"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} />
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-sapphire-100 dark:bg-sapphire-500/10 text-sapphire-600 dark:text-sapphire-400">
                  <Zap size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Performance Implications</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-sapphire-200 dark:border-sapphire-900/50 pl-6">
                "{concept.performance}"
              </p>
            </motion.section>

            {/* Query Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Code size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Query Pattern</h3>
                </div>
              </div>
              <QueryExample query={concept.exampleQuery} />
            </section>
          </div>

          {/* Right Column: Visuals */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Table Visualizer */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
                <Database size={14} className="mr-2" /> Data Representation
              </h4>
              <TableVisualizer id={concept.id} />
            </div>

            {/* Animated Flow */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
                <Play size={14} className="mr-2" /> Execution Flow
              </h4>
              <ExecutionFlow type={concept.visualType} />
            </div>

            {/* Metadata Card */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm">
              <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                <BarChart3 size={18} className="text-sapphire-600 dark:text-sapphire-400" />
                <span className="text-sm font-bold uppercase tracking-tighter text-slate-900 dark:text-slate-200">Cosmic Metadata</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-mono">Storage Engine</span>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">InnoDB / WiredTiger</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-mono">Access Pattern</span>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">Random I/O</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-mono">Complexity</span>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">{concept.difficulty === 'Expert' ? 'O(N²)' : 'O(log N)'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-mono">Consistency</span>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">ACID Compliant</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;

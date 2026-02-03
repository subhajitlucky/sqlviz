import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, Zap, Database, Play, BarChart3, AlertCircle, Code, ChevronRight, ChevronLeft, Sparkles, Cpu } from 'lucide-react';
import { concepts } from '../data/blueprint';

// --- Visualizers ---
import BTreeVisualizer from '../components/visualizers/BTreeVisualizer';
import JoinVisualizer from '../components/visualizers/JoinVisualizer';
import ACIDVisualizer from '../components/visualizers/ACIDVisualizer';
import ScanVisualizer from '../components/visualizers/ScanVisualizer';
import IndexSeekVisualizer from '../components/visualizers/IndexSeekVisualizer';

const VisualizerSelector = ({ type, id }) => {
  switch (type) {
    case 'tree': return <BTreeVisualizer />;
    case 'join':
    case 'algorithm': return <JoinVisualizer />;
    case 'acid': return <ACIDVisualizer />;
    case 'scan': return <ScanVisualizer />;
    case 'search': return <IndexSeekVisualizer />;
    default: return <ExecutionFlow type={type} />;
  }
};

const TableVisualizer = ({ id }) => {
  const rows = [
    { id: 1, name: 'Sirius', mag: -1.46, type: 'Main' },
    { id: 2, name: 'Canopus', mag: -0.74, type: 'Giant' },
    { id: 3, name: 'Rigil Kent', mag: -0.27, type: 'Triple' },
    { id: 4, name: 'Arcturus', mag: -0.05, type: 'Giant' },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl transition-all">
      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memory Snapshot: stars</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left font-mono text-[11px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="pb-2 font-black uppercase">ID</th>
              <th className="pb-2 font-black uppercase">Name</th>
              <th className="pb-2 font-black uppercase">Mag</th>
              <th className="pb-2 font-black uppercase">Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr 
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-slate-50 last:border-0 dark:border-slate-800/50 hover:bg-sapphire-500/5 transition-colors"
              >
                <td className="py-2 text-sapphire-600 dark:text-sapphire-400 font-bold">{row.id}</td>
                <td className="py-2 text-slate-900 dark:text-slate-200 font-medium">{row.name}</td>
                <td className={`py-2 ${row.mag < 0 ? "text-amber-500" : "text-slate-400"}`}>{row.mag}</td>
                <td className="py-2 text-slate-400 dark:text-slate-500">{row.type}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ExecutionFlow = ({ type }) => {
  return (
    <div className="relative w-full h-56 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all group">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] bg-[bottom_left_-4px]" />
      </div>
      
      <div className="flex items-center space-x-12 z-10 scale-90 md:scale-100">
        <motion.div 
          animate={{ y: [0, -5, 0], filter: ['drop-shadow(0 0 0px #3b82f6)', 'drop-shadow(0 0 10px #3b82f6)', 'drop-shadow(0 0 0px #3b82f6)'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-sapphire-600 dark:text-sapphire-400 shadow-xl"
        >
          <Database size={28} />
          <span className="text-[8px] mt-1 font-black uppercase">IO</span>
        </motion.div>
        
        <div className="relative w-24 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-sapphire-500 to-transparent"
          />
        </div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-2 border-amber-500/30 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-amber-500 shadow-xl"
        >
          <Cpu size={32} />
          <span className="text-[8px] mt-1 font-black uppercase tracking-widest">Plan</span>
        </motion.div>

        <div className="relative w-24 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          />
        </div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-3xl border-2 border-emerald-500/20 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-emerald-500 shadow-xl"
        >
          <BarChart3 size={28} />
          <span className="text-[8px] mt-1 font-black uppercase">Result</span>
        </motion.div>
      </div>
    </div>
  );
};

const QueryExample = ({ query }) => {
  const parts = query.split(' ');
  const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'OFFSET', 'JOIN', 'ON', 'GROUP', 'HAVING', 'WITH', 'CREATE', 'INDEX', 'ALTER', 'TABLE', 'ADD', 'PRIMARY', 'KEY', 'INSERT', 'INTO', 'VALUES'];

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 font-mono text-base leading-relaxed relative group shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sapphire-600 to-blue-400 opacity-50" />
      <div className="flex items-center space-x-2 mb-6 opacity-50">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <p className="text-slate-300">
        {parts.map((part, i) => (
          <span key={i} className={keywords.includes(part.toUpperCase()) ? "text-sapphire-400 font-black" : "text-white"}>
            {part}{' '}
          </span>
        ))}
      </p>
    </div>
  );
};

const TopicDetail = () => {
  const { id } = useParams();
  const conceptIndex = useMemo(() => concepts.findIndex(c => c.id === id), [id]);
  const concept = concepts[conceptIndex];

  const prevConcept = conceptIndex > 0 ? concepts[conceptIndex - 1] : null;
  const nextConcept = conceptIndex < concepts.length - 1 ? concepts[conceptIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!concept) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <AlertCircle size={48} className="mb-4 text-slate-800" />
        <h2 className="text-2xl font-black text-white">Orbit Lost</h2>
        <Link to="/path" className="mt-4 text-sapphire-400 hover:underline">Return to Sector Map</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sapphire-600/5 rounded-full blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex-grow">
        <nav className="mb-16 flex items-center justify-between">
          <Link to="/path" className="group flex items-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sapphire-500 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Map
          </Link>
          <div className="flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{concept.path}</span>
            <ChevronRight size={10} className="text-slate-700" />
            <span className="text-[10px] font-black text-sapphire-400 uppercase tracking-widest">{concept.id}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <motion.div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-sapphire-500/10 border border-sapphire-500/20 mb-8">
                <Sparkles size={12} className="text-sapphire-400" />
                <span className="text-[10px] font-black text-sapphire-400 uppercase tracking-[0.2em]">{concept.difficulty}</span>
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-none mb-8 tracking-tighter">
                {concept.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                {concept.definition}
              </p>
            </motion.div>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-sapphire-600/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 rounded-2xl bg-sapphire-600 text-white shadow-lg shadow-sapphire-500/40">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence Briefing</h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-bold border-l-4 border-sapphire-600 pl-8">
                  {concept.performance}
                </p>
              </div>
            </motion.section>

            <section className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Code size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Syntactic Pattern</h3>
              </div>
              <QueryExample query={concept.exampleQuery} />
            </section>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Data Snapshot</h4>
                <Database size={14} className="text-slate-700" />
              </div>
              <TableVisualizer id={concept.id} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Engine Simulation</h4>
                <Play size={14} className="text-slate-700" />
              </div>
              <VisualizerSelector type={concept.visualType} id={concept.id} />
            </div>

            <div className="p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-sapphire-600/10 rounded-full blur-[60px] group-hover:bg-sapphire-600/20 transition-all" />
              <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                <BarChart3 size={24} className="text-sapphire-600" />
                <span className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white">Relational Metadata</span>
              </div>
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                {[
                  { label: "Storage Engine", val: "InnoDB / WiredTiger" },
                  { label: "Access Method", val: "Random I/O" },
                  { label: "Complexity", val: concept.difficulty === 'Expert' ? 'O(N²)' : 'O(log N)' },
                  { label: "Consistency", val: "ACID Compliant" }
                ].map((item, i) => (
                  <div key={i}>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{item.label}</span>
                    <p className="text-sm font-mono font-bold text-sapphire-600 dark:text-sapphire-400">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-8">
          {prevConcept && (
            <Link to={`/topic/${prevConcept.id}`} className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sapphire-500 transition-all shadow-xl">
              <div className="flex items-center space-x-6">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-sapphire-600 group-hover:text-white transition-all">
                  <ChevronLeft size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Concept</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white">{prevConcept.title}</div>
                </div>
              </div>
            </Link>
          )}
          {nextConcept && (
            <Link to={`/topic/${nextConcept.id}`} className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sapphire-500 transition-all shadow-xl text-right">
              <div className="flex items-center justify-end space-x-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Concept</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white">{nextConcept.title}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-sapphire-600 group-hover:text-white transition-all">
                  <ChevronRight size={24} />
                </div>
              </div>
            </Link>
          )}
        </footer>
      </div>
    </div>
  );
};

export default TopicDetail;

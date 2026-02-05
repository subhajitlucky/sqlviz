import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Database, 
  Play, 
  Code, 
  Binary, 
  Terminal, 
  Cpu, 
  AlertCircle,
  FileSearch,
  Activity,
  Box,
  Layout,
  Filter,
  ArrowUpDown,
  Layers,
  Share2,
  Star,
  Zap,
  GitMerge,
  ShieldCheck,
  Network,
  CpuChip
} from 'lucide-react';
import { concepts } from '../data/blueprint';

// --- Visualizers ---
import BTreeVisualizer from '../components/visualizers/BTreeVisualizer';
import JoinVisualizer from '../components/visualizers/JoinVisualizer';
import ACIDVisualizer from '../components/visualizers/ACIDVisualizer';
import ScanVisualizer from '../components/visualizers/ScanVisualizer';
import IndexSeekVisualizer from '../components/visualizers/IndexSeekVisualizer';
import SQLSimulation from '../components/visualizers/SQLSimulation';
import TwoPhaseCommitVisualizer from '../components/visualizers/advanced/TwoPhaseCommitVisualizer';

const VisualizerSelector = ({ type, id }) => {
  if (id === 'what-is-sql') return <SQLSimulation />;
  switch (type) {
    case 'tree': return <BTreeVisualizer />;
    case 'join':
    case 'algorithm': return <JoinVisualizer />;
    case 'acid': return <ACIDVisualizer />;
    case 'scan': return <ScanVisualizer />;
    case 'search': return <IndexSeekVisualizer />;
    case '2pc': return <TwoPhaseCommitVisualizer />;
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
    <div className="w-full bg-db-surface/60 border border-db-border rounded-none shadow-2xl overflow-hidden font-mono uppercase transition-all">
      <div className="bg-db-panel px-4 py-2 border-b border-db-border flex justify-between items-center">
        <span className="text-[9px] font-black tracking-widest text-slate-500">MEMORY_DUMP: stars</span>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-sql-cyan/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-sql-cyan/20" />
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="text-slate-600 border-b border-db-border/50">
              <th className="pb-2 font-black tracking-tighter">ID</th>
              <th className="pb-2 font-black tracking-tighter">NAME</th>
              <th className="pb-2 font-black tracking-tighter">MAG</th>
              <th className="pb-2 font-black tracking-tighter">TYPE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr 
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group border-b border-db-border/30 last:border-0 hover:bg-sql-cyan/5 transition-colors"
              >
                <td className="py-2 text-sql-cyan font-bold">{row.id}</td>
                <td className="py-2 text-slate-300">{row.name}</td>
                <td className={`py-2 ${row.mag < 0 ? "text-sql-gold" : "text-slate-500"}`}>{row.mag}</td>
                <td className="py-2 text-slate-600">{row.type}</td>
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
    <div className="relative w-full h-56 flex items-center justify-center bg-db-surface/40 border border-db-border shadow-2xl overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="flex items-center space-x-12 z-10 scale-90 md:scale-100">
        <motion.div 
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-16 h-16 border border-db-border bg-db-panel flex flex-col items-center justify-center text-sql-blue shadow-xl"
        >
          <Database size={24} />
          <span className="text-[7px] mt-1 font-black uppercase tracking-widest">IO_LAYER</span>
        </motion.div>
        
        <div className="relative w-20 h-1 bg-db-border rounded-full overflow-hidden">
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-8 h-full bg-sql-cyan shadow-[0_0_8px_#00e5ff]"
          />
        </div>

        <motion.div 
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-none border border-sql-gold/30 bg-db-panel flex flex-col items-center justify-center text-sql-gold shadow-xl relative"
        >
          <div className="absolute inset-0 border border-sql-gold/10 scale-110" />
          <Cpu size={28} />
          <span className="text-[7px] mt-1 font-black uppercase tracking-widest">EXEC_PLAN</span>
        </motion.div>

        <div className="relative w-20 h-1 bg-db-border rounded-full overflow-hidden">
          <motion.div 
            animate={{ left: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 w-8 h-full bg-sql-green shadow-[0_0_8px_#00ff9d]"
          />
        </div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border border-db-border bg-db-panel flex flex-col items-center justify-center text-sql-green shadow-xl"
        >
          <Binary size={24} />
          <span className="text-[7px] mt-1 font-black uppercase tracking-widest">RESULT_SET</span>
        </motion.div>
      </div>
    </div>
  );
};

const QueryExample = ({ query }) => {
  const parts = query.split(' ');
  const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'OFFSET', 'JOIN', 'ON', 'GROUP', 'HAVING', 'WITH', 'CREATE', 'INDEX', 'ALTER', 'TABLE', 'ADD', 'PRIMARY', 'KEY', 'INSERT', 'INTO', 'VALUES'];

  return (
    <div className="bg-black/60 p-8 border border-db-border font-mono text-sm leading-relaxed relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-sql-cyan opacity-30 shadow-[0_0_10px_#00e5ff]" />
      {/* CRT scanline simulation */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,2px_100%]" />
      
      <div className="flex items-center space-x-2 mb-6 opacity-30">
        <div className="w-2 h-2 bg-sql-cyan" />
        <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">Terminal_Input_V1.0.4</div>
      </div>
      <p className="text-slate-400 relative z-10">
        {parts.map((part, i) => (
          <span key={i} className={keywords.includes(part.toUpperCase()) ? "text-sql-cyan font-black" : "text-slate-200"}>
            {part}{' '}
          </span>
        ))}
      </p>
    </div>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    'Beginner': 'text-sql-green border-sql-green/20 bg-sql-green/5',
    'Intermediate': 'text-sql-blue border-sql-blue/20 bg-sql-blue/5',
    'Advanced': 'text-sql-gold border-sql-gold/20 bg-sql-gold/5',
    'Expert': 'text-rose-500 border-rose-500/20 bg-rose-500/5',
  };
  
  return (
    <span className={`px-3 py-1 border text-[9px] font-black uppercase tracking-[0.2em] ${colors[difficulty] || colors['Beginner']}`}>
      {difficulty}
    </span>
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono">
        <AlertCircle size={48} className="mb-6 text-db-border animate-pulse" />
        <h2 className="text-2xl font-black text-white uppercase tracking-widest">Target_Null: Object_Not_Found</h2>
        <Link to="/path" className="mt-6 text-sql-cyan text-xs uppercase tracking-widest hover:underline">Return to System_Map</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Structural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(35,39,53,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(35,39,53,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex-grow w-full relative z-10">
        <nav className="mb-20 flex items-center justify-between">
          <Link to="/path" className="group flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-sql-cyan transition-all">
            <ArrowLeft className="w-3 h-3 mr-3 group-hover:-translate-x-1 transition-transform" /> 
            &lt; Return_To_Index
          </Link>
          <div className="flex items-center space-x-4 px-5 py-2 bg-db-surface border border-db-border uppercase">
            <span className="text-[9px] font-black text-slate-600 tracking-widest">Path: {concept.path}</span>
            <div className="w-1 h-1 rounded-full bg-db-border" />
            <span className="text-[9px] font-black text-sql-cyan tracking-widest">{concept.id}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-20">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <DifficultyBadge difficulty={concept.difficulty} />
              
              <h1 className="text-6xl md:text-9xl font-black text-white leading-none mt-10 mb-10 tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                {concept.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-mono leading-relaxed max-w-2xl uppercase">
                &gt; {concept.definition}
              </p>
            </motion.div>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative group">
              <div className="p-10 bg-db-surface/40 border border-db-border relative overflow-hidden shadow-2xl">
                {/* Tech bar decoration */}
                <div className="absolute top-0 left-0 w-1 h-full bg-sql-cyan shadow-[0_0_15px_#00e5ff]" />
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-2 border border-sql-cyan/20 bg-sql-cyan/5 text-sql-cyan">
                    <Terminal size={20} />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Core_Optimization_Protocol</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed font-bold uppercase tracking-tight italic">
                  "{concept.performance}"
                </p>
              </div>
            </motion.section>

            <section className="space-y-10">
              <div className="flex items-center space-x-4">
                <div className="p-2 border border-db-border bg-db-panel text-slate-500">
                  <Code size={20} />
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">SYNTAX_MODEL</h3>
              </div>
              <QueryExample query={concept.exampleQuery} />
            </section>
          </div>

          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Data_Schema_Snapshot</h4>
                <Database size={12} className="text-db-border" />
              </div>
              <TableVisualizer id={concept.id} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Engine_Compute_Visual</h4>
                <Play size={12} className="text-db-border" />
              </div>
              <div className="relative">
                <VisualizerSelector type={concept.visualType} id={concept.id} />
              </div>
            </div>

            <div className="p-10 border border-db-border bg-db-surface/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden font-mono uppercase">
              <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-db-border">
                <Binary size={20} className="text-sql-cyan" />
                <span className="text-xs font-black tracking-widest text-white">System_Metadata</span>
              </div>
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                {[
                  { label: "Storage_Engine", val: "POSTGRES_V15" },
                  { label: "Access_Method", val: "RANDOM_IO" },
                  { label: "O_Complexity", val: concept.difficulty === 'Expert' ? 'O(N²)' : 'O(LOG N)' },
                  { label: "Status", val: "ACID_SYNC" }
                ].map((item, i) => (
                  <div key={i}>
                    <span className="text-[8px] font-black text-slate-600 tracking-widest block mb-2">{item.label}</span>
                    <p className="text-[10px] font-bold text-sql-cyan tracking-tighter">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-40 pt-16 border-t border-db-border flex flex-col md:flex-row justify-between gap-1">
          {prevConcept && (
            <Link to={`/topic/${prevConcept.id}`} className="group p-8 border border-db-border bg-db-surface/40 hover:bg-db-panel hover:border-sql-cyan transition-all flex-1">
              <div className="flex items-center space-x-6">
                <ChevronLeft size={24} className="text-slate-700 group-hover:text-sql-cyan transition-colors" />
                <div>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Previous_Node</span>
                  <div className="text-sm font-black text-white uppercase tracking-widest mt-1">{prevConcept.title}</div>
                </div>
              </div>
            </Link>
          )}
          {nextConcept && (
            <Link to={`/topic/${nextConcept.id}`} className="group p-8 border border-db-border bg-db-surface/40 hover:bg-db-panel hover:border-sql-cyan transition-all flex-1 text-right">
              <div className="flex items-center justify-end space-x-6">
                <div>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Next_Node</span>
                  <div className="text-sm font-black text-white uppercase tracking-widest mt-1">{nextConcept.title}</div>
                </div>
                <ChevronRight size={24} className="text-slate-700 group-hover:text-sql-cyan transition-colors" />
              </div>
            </Link>
          )}
        </footer>
      </div>
    </div>
  );
};

export default TopicDetail;

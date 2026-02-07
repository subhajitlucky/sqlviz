import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { paths, concepts } from '../data/blueprint';
import AnimatedStarField from '../components/AnimatedStarField';
import { 
  Search, 
  ChevronRight, 
  Orbit, 
  Database, 
  Layers, 
  Share2, 
  Zap, 
  Cpu,
  Star,
  Compass,
  Layout,
  Filter,
  ArrowUpDown,
  FileSearch,
  Hash,
  Box,
  Binary,
  GitMerge,
  Table as TableIcon,
  Activity,
  AlertTriangle,
  Flame,
  Clock,
  ExternalLink,
  Sparkles,
  Terminal,
  ActivitySquare,
  HardDrive,
  ShieldCheck,
  Network
} from 'lucide-react';

const IconMap = {
  'what-is-sql': Binary,
  'tables-rows-columns': TableIcon,
  'primary-keys': Hash,
  'select-basics': Layout,
  'where-filtering': Filter,
  'order-by': ArrowUpDown,
  'limit-offset': Box,
  'dml-conceptual': Activity,
  'indexes-overview': FileSearch,
  'b-tree-structure': Layers,
  'index-seek-vs-scan': Binary,
  'table-scan': FileSearch,
  'composite-indexes': Share2,
  'covering-indexes': Star,
  'unique-indexes': ShieldCheck,
  'joins-basics': GitMerge,
  'join-algorithms': Cpu,
  'subqueries': Layers,
  'ctes': Box,
  'group-by': Box,
  'aggregations': ActivitySquare,
  'having': Filter,
  'query-planner': Cpu,
  'execution-plans': Terminal,
  'cost-estimation': Activity,
  'cardinality': Hash,
  'selectivity': Filter,
  'index-misuse': AlertTriangle,
  'over-indexing': Flame,
  'write-amplification': HardDrive,
  'pagination-pitfalls': Clock,
  'n-plus-one': Network,
  'slow-query-patterns': AlertTriangle,
  'two-phase-commit': Network,
  'cap-theorem': Share2,
  'replication-lag': Clock,
};

const PathIcon = {
  'basics': Database,
  'indexing': HardDrive,
  'relationships': GitMerge,
  'aggregation': ActivitySquare,
  'internals': Cpu,
  'performance': Zap,
  'distributed': Network
};

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    'Beginner': 'text-sql-green border-sql-green/20 bg-sql-green/5',
    'Intermediate': 'text-sql-blue border-sql-blue/20 bg-sql-blue/5',
    'Advanced': 'text-sql-gold border-sql-gold/20 bg-sql-gold/5',
    'Expert': 'text-rose-500 border-rose-500/20 bg-rose-500/5',
  };
  
  return (
    <span className={`px-2 py-0.5 border text-[8px] font-black uppercase tracking-[0.2em] ${colors[difficulty] || colors['Beginner']}`}>
      {difficulty}
    </span>
  );
};

const TopicCard = ({ concept, index }) => {
  const Icon = IconMap[concept.id] || Compass;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="h-full"
    >
      <Link 
        to={`/topic/${concept.id}`}
        className="group block h-full p-6 bg-white/40 dark:bg-db-surface/40 backdrop-blur-sm border border-slate-200 dark:border-db-border hover:border-sql-blue dark:hover:border-sql-cyan transition-all relative overflow-hidden shadow-2xl"
      >
        {/* Terminal Scanline Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,2px_100%]" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-db-border bg-slate-50 dark:bg-db-panel text-slate-400 dark:text-slate-500 group-hover:text-sql-blue dark:group-hover:text-sql-cyan group-hover:border-sql-blue dark:group-hover:border-sql-cyan transition-colors">
              <Icon size={20} />
            </div>
            <DifficultyBadge difficulty={concept.difficulty} />
          </div>
          
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-2 tracking-widest uppercase group-hover:text-sql-blue dark:group-hover:text-sql-cyan transition-colors">
            {concept.title}
          </h3>
          
          <p className="text-[11px] text-slate-600 dark:text-slate-500 line-clamp-2 mb-6 font-mono leading-relaxed uppercase">
            {concept.definition}
          </p>
          
          <div className="mt-auto flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 group-hover:text-sql-blue dark:group-hover:text-sql-cyan transition-all">
            &gt; INIT_MODULE <ChevronRight size={10} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const LearningPath = () => {
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  
  const filteredConcepts = useMemo(() => {
    if (!search.trim()) return concepts;
    const query = search.toLowerCase();
    return concepts.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.definition.toLowerCase().includes(query) ||
      c.path.toLowerCase().includes(query)
    );
  }, [search]);

  const groupedConcepts = useMemo(() => {
    const groups = {};
    paths.forEach(p => {
      groups[p.id] = filteredConcepts.filter(c => c.path === p.id);
    });
    return groups;
  }, [filteredConcepts]);

  const hasResults = filteredConcepts.length > 0;

  return (
    <div className="min-h-screen relative flex flex-col" ref={containerRef}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex-grow w-full">
        
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-db-surface border border-db-border text-sql-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_15px_rgba(0,229,255,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sql-green animate-pulse" />
            <span>Navigation Terminal: Path_Map</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-12 uppercase"
          >
            SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-b from-sql-cyan to-sql-blue">INDEX</span>
          </motion.h1>
          
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-sql-cyan/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-600 group-focus-within:text-sql-cyan transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH_COSMOS_OBJECTS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50/60 dark:bg-db-surface/60 border border-slate-200 dark:border-db-border text-xs font-black tracking-widest text-slate-900 dark:text-white focus:outline-none focus:border-sql-blue dark:focus:border-sql-cyan transition-all uppercase placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>
          </div>
        </header>

        {/* Galaxies (Sectors) */}
        <div className="space-y-32">
          {paths.map((path, pIdx) => {
            const pathConcepts = groupedConcepts[path.id];
            if (pathConcepts.length === 0) return null;
            const Icon = PathIcon[path.id] || Compass;

            return (
              <section key={path.id} className="relative">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-8 border-l-2 border-slate-200 dark:border-db-border pl-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-db-panel border border-slate-200 dark:border-db-border flex items-center justify-center text-sql-blue dark:text-sql-cyan shadow-xl">
                      <Icon size={28} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Sector_0{pIdx + 1}</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-widest uppercase">{path.title}</h2>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-500 max-w-sm font-mono leading-relaxed uppercase">
                    &gt; {path.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1">
                  {pathConcepts.map((concept, cIdx) => (
                    <TopicCard key={concept.id} concept={concept} index={cIdx} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {!hasResults && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40">
            <Terminal size={48} className="mx-auto text-db-border animate-pulse mb-6" />
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Target Not Found</h3>
            <p className="text-slate-600 text-xs mb-10 font-mono">OBJECT_NOT_IN_INDEX: CHECK_QUERY_SYNTAX</p>
            <button 
              onClick={() => setSearch('')} 
              className="px-8 py-3 bg-db-surface border border-db-border text-[10px] font-black text-sql-cyan uppercase tracking-widest hover:bg-db-panel transition-all"
            >
              Reset_Terminal
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearningPath;

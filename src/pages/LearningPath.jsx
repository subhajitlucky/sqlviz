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
  Sparkles
} from 'lucide-react';

const IconMap = {
  'what-is-sql': Orbit,
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
  'unique-indexes': Zap,
  'joins-basics': GitMerge,
  'join-algorithms': Cpu,
  'subqueries': Layers,
  'ctes': Box,
  'group-by': Box,
  'aggregations': Activity,
  'having': Filter,
  'query-planner': Cpu,
  'execution-plans': FileSearch,
  'cost-estimation': Activity,
  'cardinality': Hash,
  'selectivity': Filter,
  'index-misuse': AlertTriangle,
  'over-indexing': Flame,
  'write-amplification': Activity,
  'pagination-pitfalls': Clock,
  'n-plus-one': Share2,
  'slow-query-patterns': AlertTriangle,
};

const PathIcon = {
  'basics': Database,
  'indexing': Layers,
  'relationships': Share2,
  'aggregation': Zap,
  'internals': Cpu,
  'performance': Activity
};

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    'Beginner': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    'Intermediate': 'text-sapphire-600 bg-sapphire-50 dark:bg-sapphire-500/10 dark:text-sapphire-400 border-sapphire-100 dark:border-sapphire-500/20',
    'Advanced': 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
    'Expert': 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20',
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${colors[difficulty] || colors['Beginner']}`}>
      {difficulty}
    </span>
  );
};

const TopicCard = ({ concept, index }) => {
  const Icon = IconMap[concept.id] || Compass;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <Link 
        to={`/topic/${concept.id}`}
        className="group block h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sapphire-500 dark:hover:border-sapphire-500 transition-all shadow-xl hover:shadow-sapphire-500/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-sapphire-500/5 rounded-full blur-2xl group-hover:bg-sapphire-500/15 transition-all" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-sapphire-600 group-hover:text-white transition-all shadow-inner">
              <Icon size={24} />
            </div>
            <DifficultyBadge difficulty={concept.difficulty} />
          </div>
          
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            {concept.concept_title || concept.title}
          </h3>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-8 font-medium leading-relaxed">
            {concept.definition}
          </p>
          
          <div className="mt-auto flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-sapphire-600 dark:text-sapphire-400 group-hover:translate-x-2 transition-all">
            Initialize Module <ChevronRight size={12} className="ml-1" />
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
      <AnimatedStarField />
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-0 w-[800px] h-[800px] bg-sapphire-600/5 rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-[10%] right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex-grow w-full">
        
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10"
          >
            <Sparkles size={14} className="text-sapphire-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Relational Universe Explorer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-12"
          >
            The <span className="bg-gradient-to-r from-sapphire-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Cosmos</span> Map
          </motion.h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sapphire-600 to-blue-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-1000" />
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
              <input 
                type="text"
                placeholder="Search galaxies, concepts, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl text-lg text-slate-900 dark:text-white focus:outline-none focus:border-sapphire-600 transition-all shadow-2xl"
              />
            </div>
          </div>
        </header>

        {/* Galaxies */}
        <div className="space-y-40">
          {paths.map((path, pIdx) => {
            const pathConcepts = groupedConcepts[path.id];
            if (pathConcepts.length === 0) return null;
            const Icon = PathIcon[path.id] || Compass;

            return (
              <section key={path.id} className="relative">
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 px-2"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-sapphire-600 flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
                      <Icon size={36} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="w-8 h-px bg-sapphire-600 opacity-50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sapphire-600">Galaxy {pIdx + 1}</span>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">{path.title}</h2>
                    </div>
                  </div>
                  <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
                    {path.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
            <Orbit size={64} className="mx-auto text-slate-800 animate-pulse mb-8" />
            <h3 className="text-3xl font-black text-white mb-4">Galaxy Hidden in Shadows</h3>
            <p className="text-slate-500 text-lg mb-12">Adjust your trajectory or return to the main sectors.</p>
            <button onClick={() => setSearch('')} className="px-8 py-4 bg-sapphire-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sapphire-500/20">Reset Navigation</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearningPath;

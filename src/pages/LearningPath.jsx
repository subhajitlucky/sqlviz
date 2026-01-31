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
  ExternalLink
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
    'Beginner': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400',
    'Intermediate': 'text-sapphire-600 bg-sapphire-50 dark:bg-sapphire-500/10 dark:text-sapphire-400',
    'Advanced': 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    'Expert': 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400',
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[difficulty] || colors['Beginner']}`}>
      {difficulty}
    </span>
  );
};

const TopicCard = ({ concept, index }) => {
  const Icon = IconMap[concept.id] || Compass;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1] 
      }}
      className="h-full"
    >
      <Link 
        to={`/topic/${concept.id}`}
        className="group flex flex-col h-full p-6 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 backdrop-blur-xl hover:border-sapphire-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 relative overflow-hidden ring-1 ring-inset ring-slate-200/50 dark:ring-white/5"
      >
        {/* Sapphire Pulse Hover Effect */}
        <div className="absolute inset-0 bg-sapphire-500/0 group-hover:bg-sapphire-500/5 transition-colors duration-500" />
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-35deg] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 group-hover:bg-sapphire-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icon className="w-6 h-6 md:w-5 md:h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" />
            </div>
            <DifficultyBadge difficulty={concept.difficulty} />
          </div>
          
          <h3 className="text-lg md:text-base font-bold text-slate-900 dark:text-white group-hover:text-sapphire-600 dark:group-hover:text-sapphire-400 transition-colors mb-2">
            {concept.title}
          </h3>
          
          <p className="text-sm md:text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-grow">
            {concept.definition}
          </p>
          
          <div className="flex items-center text-sm md:text-xs font-semibold text-sapphire-600 dark:text-sapphire-400 group-hover:text-sapphire-500 dark:group-hover:text-sapphire-300 mt-auto">
            Launch Module <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* Inner Glow Border */}
        <div className="absolute inset-0 rounded-2xl border border-slate-200 dark:border-white/5 pointer-events-none" />
        <div className="absolute inset-[1px] rounded-[15px] border border-slate-100 dark:border-white/5 pointer-events-none" />
        
        {/* Dynamic Glow effect */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sapphire-500/10 blur-3xl rounded-full group-hover:bg-sapphire-500/20 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
};

const LearningPath = () => {
  const [search, setSearch] = useState('');
  const [svgHeight, setSvgHeight] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  
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

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.scrollHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [groupedConcepts]);

  const hasResults = filteredConcepts.length > 0;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden" ref={containerRef}>
      <AnimatedStarField />
      
      {/* Constellation Connectors */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height={svgHeight} className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {paths.map((path, idx) => {
            if (idx === paths.length - 1 || !hasResults) return null;
            
            // Connect the center-bottom of current galaxy section to center-top of next
            const startY = 150 + (idx * 500); // Rough approximation based on section spacing
            const endY = 150 + ((idx + 1) * 500);
            
            return (
              <motion.path
                key={`line-${idx}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 + idx * 0.2 }}
                d={`M ${typeof window !== 'undefined' ? window.innerWidth / 2 : 500} ${startY} L ${typeof window !== 'undefined' ? window.innerWidth / 2 : 500} ${endY}`}
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="4,8"
                fill="none"
                filter="url(#glow)"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header & Search */}
        <header className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sapphire-500/10 blur-[120px] rounded-full -z-10" />
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-600 to-sapphire-400">Cosmos</span> Map
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-lg"
          >
            Navigate the relational universe. From atomic queries to distributed engine internals.
          </motion.p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sapphire-600 to-sapphire-400 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sapphire-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search galaxies, concepts, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sapphire-500 transition-all outline-none shadow-xl"
              />
            </div>
          </div>
        </header>

        {/* Empty State */}
        <AnimatePresence>
          {!hasResults && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 relative z-10"
            >
              <div className="inline-flex p-6 rounded-full bg-slate-100 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 mb-6">
                <Orbit className="w-12 h-12 text-slate-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Concept not found in this galaxy</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or explore the main paths below.</p>
              <button 
                onClick={() => setSearch('')}
                className="mt-6 px-6 py-2 bg-sapphire-600 hover:bg-sapphire-500 text-white rounded-lg transition-all font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Reset Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paths & Topics */}
        <div className="space-y-24 relative z-10">
          {paths.map((path, pIdx) => {
            const pathConcepts = groupedConcepts[path.id];
            if (pathConcepts.length === 0) return null;

            const Icon = PathIcon[path.id] || Compass;

            return (
              <section 
                key={path.id} 
                className="relative"
                ref={el => sectionRefs.current[path.id] = el}
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sapphire-600 to-sapphire-400 flex items-center justify-center text-white shadow-lg shadow-sapphire-500/20 relative group">
                      <Icon className="w-7 h-7 relative z-10" />
                      <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sapphire-600 dark:text-sapphire-400 mb-1 block">
                        Galaxy {pIdx + 1}
                      </span>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{path.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm md:text-right">
                    {path.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pathConcepts.map((concept, cIdx) => (
                    <TopicCard key={concept.id} concept={concept} index={cIdx} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;

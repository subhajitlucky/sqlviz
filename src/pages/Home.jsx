import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Zap, ArrowRight, Layers, Cpu, ShieldCheck, Terminal, Sparkles, Binary, TerminalSquare } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex-grow relative flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Structural Data Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#232735_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* System Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#0d0e12] border border-slate-200 dark:border-[#232735] text-sql-blue dark:text-[#00e5ff] text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-sql-green animate-pulse" />
            <span>Connection Established: Cluster_Alpha</span>
          </motion.div>

          {/* Core Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-10"
          >
            THE DATA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-sql-blue dark:from-sql-cyan to-indigo-600 dark:to-sql-blue drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]">
              ARCHITECTURE
            </span>
          </motion.h1>

          {/* Monospace Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-mono leading-relaxed"
          >
            &gt; Initializing visual model of the relational universe... <br />
            &gt; Mapping B-Tree traversal paths... <br />
            &gt; Analyzing execution cost vectors...
          </motion.p>

          {/* Industrial Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link 
              to="/path" 
              className="group relative px-12 py-6 bg-sql-blue hover:bg-sql-cyan text-white rounded-none skew-x-[-12deg] font-black text-xl flex items-center transition-all shadow-[8px_8px_0_0_#050507,10px_10px_0_0_#232735]"
            >
              <span className="skew-x-[12deg] flex items-center">
                START_QUERY
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            
            <Link 
              to="/playground" 
              className="px-12 py-6 bg-slate-100 dark:bg-[#0d0e12] hover:bg-slate-200 dark:hover:bg-[#14161f] text-slate-900 dark:text-white rounded-none skew-x-[-12deg] font-black text-xl flex items-center transition-all border border-slate-200 dark:border-[#232735] shadow-xl group"
            >
              <span className="skew-x-[12deg] flex items-center">
                OPEN_TERMINAL
                <TerminalSquare className="ml-3 w-6 h-6 text-sql-gold group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Technical Specs Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-1"
          >
            {[
              { icon: Binary, title: "01. ENGINE_INTERNALS", desc: "Low-level visualization of query parsing and relational algebra." },
              { icon: Layers, title: "02. STORAGE_MODELS", desc: "Physical data layout across B-Tree nodes and memory pages." },
              { icon: Cpu, title: "03. DISTRIBUTED_LOGIC", desc: "Distributed consensus algorithms and multi-node synchronization." }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-slate-50 dark:bg-[#0d0e12] border border-slate-200 dark:border-[#232735] text-left hover:bg-white dark:hover:bg-[#14161f] transition-all group shadow-xl">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#14161f] flex items-center justify-center mb-8 border border-slate-200 dark:border-[#232735] group-hover:border-sql-blue dark:group-hover:border-[#00e5ff] transition-colors">
                  <feature.icon className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-sql-blue dark:group-hover:text-[#00e5ff] transition-colors" />
                </div>
                <h3 className="text-xs font-black text-sql-blue dark:text-[#00e5ff] mb-4 tracking-widest">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-mono">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

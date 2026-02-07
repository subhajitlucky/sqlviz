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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* System Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-muted border border-border text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sql-green animate-pulse" />
            <span>Connection Established: Cluster_Alpha</span>
          </motion.div>

          {/* Core Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.9] mb-10"
          >
            THE DATA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-sql-blue drop-shadow-sm">
              ARCHITECTURE
            </span>
          </motion.h1>

          {/* Monospace Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-mono leading-relaxed"
          >
            &gt; Initializing visual model of the relational universe... <br />
            &gt; Mapping B-Tree traversal paths... <br />
            &gt; Analyzing execution cost vectors...
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link 
              to="/path" 
              className="group relative px-12 py-6 bg-primary hover:opacity-90 text-primary-foreground rounded-none skew-x-[-12deg] font-black text-xl flex items-center transition-all shadow-lg"
            >
              <span className="skew-x-[12deg] flex items-center">
                START_QUERY
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            
            <Link 
              to="/playground" 
              className="px-12 py-6 bg-secondary hover:bg-muted text-secondary-foreground rounded-none skew-x-[-12deg] font-black text-xl flex items-center transition-all border border-border shadow-xl group"
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
            className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border shadow-2xl"
          >
            {[
              { icon: Binary, title: "01. ENGINE_INTERNALS", desc: "Low-level visualization of query parsing and relational algebra." },
              { icon: Layers, title: "02. STORAGE_MODELS", desc: "Physical data layout across B-Tree nodes and memory pages." },
              { icon: Cpu, title: "03. DISTRIBUTED_LOGIC", desc: "Distributed consensus algorithms and multi-node synchronization." }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-card text-left hover:bg-muted transition-all group">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-8 border border-border group-hover:border-primary transition-colors">
                  <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xs font-black text-primary mb-4 tracking-widest">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-mono">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

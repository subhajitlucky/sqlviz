import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Zap, ArrowRight, Layers, Cpu, Share2, Terminal, Sparkles, ShieldCheck, Box } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex-grow relative flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sapphire-500/10 dark:bg-sapphire-500/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sapphire-100 dark:bg-sapphire-900/30 border border-sapphire-200 dark:border-sapphire-800 text-sapphire-700 dark:text-sapphire-300 text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-3 h-3" />
            <span>The Future of SQL Learning</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-8"
          >
            Master the <br />
            <span className="bg-gradient-to-r from-sapphire-600 to-blue-500 bg-clip-text text-transparent">
              SQL Cosmos
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 font-medium"
          >
            Don't just write queries. Visualize the execution path, understand the architecture, and conquer complex data structures through interactive mental models.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/path" 
              className="group relative px-10 py-5 bg-sapphire-600 hover:bg-sapphire-700 text-white rounded-2xl font-black text-lg flex items-center transition-all transform hover:scale-105 shadow-2xl shadow-sapphire-500/40"
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/playground" 
              className="px-10 py-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg flex items-center transition-all border-2 border-slate-200 dark:border-slate-800 shadow-xl transform hover:scale-105"
            >
              Open Playground
              <Terminal className="ml-3 w-6 h-6 text-sapphire-500" />
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Layers, title: "Query Parsing", desc: "See how your SQL is broken down into relational algebra." },
              { icon: Cpu, title: "Execution Plans", desc: "Watch the optimizer choose between Index Seeks and Seq Scans." },
              { icon: ShieldCheck, title: "Isolation Levels", desc: "Simulate race conditions and understand transaction safety." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-left hover:border-sapphire-500 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-sapphire-500/10 flex items-center justify-center mb-6 group-hover:bg-sapphire-500 group-hover:text-white transition-all">
                  <feature.icon className="w-7 h-7 text-sapphire-600 dark:text-sapphire-400 group-hover:text-inherit" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Zap, ArrowRight, Layers, Cpu, Share2, Terminal } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-sapphire-400 dark:bg-sapphire-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white px-2">
              Visualize the <span className="text-sapphire-600 dark:text-sapphire-400">Core</span> <br className="hidden sm:block" />
              of Your Data
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 px-4">
              Master SQL through interactive mental models. From B-Trees to Isolation Levels, see how your database actually works under the hood.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/path" className="px-8 py-4 bg-sapphire-600 hover:bg-sapphire-700 text-white rounded-lg font-bold flex items-center justify-center transition-all shadow-lg shadow-sapphire-500/20">
              Start Learning <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/playground" className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-bold flex items-center justify-center transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
              Try Playground <Terminal className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {/* Execution Flow Visualization Preview */}
          <motion.div
            className="relative max-w-4xl mx-auto p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-mono ml-2">query_optimizer.v1</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="p-3 rounded-full bg-sapphire-50 dark:bg-sapphire-900/30 mb-3">
                  <Layers className="w-6 h-6 md:w-8 md:h-8 text-sapphire-600 dark:text-sapphire-400" />
                </div>
                <span className="text-xs md:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">SQL Parser</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 mt-4 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-sapphire-500 dark:bg-sapphire-400"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="p-3 rounded-full bg-sapphire-50 dark:bg-sapphire-900/30 mb-3">
                  <Cpu className="w-6 h-6 md:w-8 md:h-8 text-sapphire-600 dark:text-sapphire-400" />
                </div>
                <span className="text-xs md:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">Planner</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 mt-4 rounded-full overflow-hidden">
                   <motion.div 
                    className="h-full bg-sapphire-500 dark:bg-sapphire-400"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="p-3 rounded-full bg-sapphire-50 dark:bg-sapphire-900/30 mb-3">
                  <Share2 className="w-6 h-6 md:w-8 md:h-8 text-sapphire-600 dark:text-sapphire-400" />
                </div>
                <span className="text-xs md:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">Execution</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 mt-4 rounded-full overflow-hidden">
                   <motion.div 
                    className="h-full bg-sapphire-500 dark:bg-sapphire-400"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;

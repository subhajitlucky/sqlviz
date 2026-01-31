import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { paths } from '../data/blueprint';
import { ChevronRight, MapPin } from 'lucide-react';

const LearningPath = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">The Cosmic Map</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          Follow the curated journey from SQL basics to advanced distributed systems internals. Each node is a gateway to deeper understanding.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sapphire-500/50 dark:hover:border-sapphire-500/50 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MapPin className="w-16 h-16 text-sapphire-600 dark:text-sapphire-400" />
            </div>
            
            <span className="text-xs font-mono text-sapphire-600 dark:text-sapphire-400 mb-2 block uppercase tracking-widest">Path {index + 1}</span>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-sapphire-600 dark:group-hover:text-sapphire-400 transition-colors">{path.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">{path.description}</p>
            
            <div className="space-y-2">
              {path.concepts.map((conceptId) => (
                <Link 
                  key={conceptId}
                  to={`/topic/${conceptId}`}
                  className="flex items-center text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 mr-1 text-sapphire-500 dark:text-sapphire-600" />
                  {conceptId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;

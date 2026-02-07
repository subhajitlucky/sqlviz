import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LearningPath from './pages/LearningPath';
import TopicDetail from './pages/TopicDetail';
import Playground from './pages/Playground';
import { Database, BookOpen, Terminal, Moon, Sun, Menu, X } from 'lucide-react';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { theme, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  if (!mounted) return null;

  return (
    <Router>
      {/* THEME WRAPPER: Root level classes are now handled in index.css body layer */}
      <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen flex flex-col transition-colors duration-300`}>
        
        {/* Navigation */}
        <nav className="border-b border-slate-200 dark:border-[#232735] bg-white dark:bg-[#050507] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link to="/" className="flex items-center space-x-3 z-50" onClick={closeMenu}>
                <div className="p-2 rounded-xl bg-sql-blue dark:bg-sql-blue">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                  SQL<span className="text-sql-blue dark:text-[#00e5ff]">COSMOS</span>
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { path: '/path', label: 'PATH_MAP', icon: BookOpen },
                  { path: '/playground', label: 'TERMINAL', icon: Terminal }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="group relative flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 hover:text-sql-blue dark:hover:text-[#00e5ff] transition-all"
                  >
                    <item.icon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <div className="h-4 w-px bg-slate-200 dark:border-[#232735]" />
                
                {/* THEME TOGGLE BUTTON */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#14161f] transition-colors text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#232735]"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Menu Buttons */}
              <div className="flex md:hidden items-center space-x-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#14161f] transition-colors text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#232735]"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#14161f] transition-colors z-50"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-16 left-0 right-0 bg-white dark:bg-[#0d0e12] border-b border-slate-200 dark:border-[#232735] md:hidden shadow-xl z-40"
              >
                <div className="flex flex-col p-4 space-y-2">
                  <Link 
                    to="/path" 
                    onClick={closeMenu}
                    className="flex items-center space-x-3 p-4 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#14161f] transition-all font-bold"
                  >
                    <BookOpen className="w-5 h-5 text-sql-blue dark:text-[#00e5ff]" />
                    <span>Learning Path</span>
                  </Link>
                  <Link 
                    to="/playground" 
                    onClick={closeMenu}
                    className="flex items-center space-x-3 p-4 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#14161f] transition-all font-bold"
                  >
                    <Terminal className="w-5 h-5 text-sql-blue dark:text-[#00e5ff]" />
                    <span>Playground</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/path" element={<LearningPath />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-[#232735] py-12 bg-white dark:bg-[#050507] transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm italic font-light">"Visualizing the core of your data."</p>
            <p className="mt-4 text-slate-400 dark:text-slate-600 text-xs font-mono uppercase tracking-widest">© 2026 SQL Cosmos • Built by OpenClaw</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

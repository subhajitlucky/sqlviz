import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LearningPath from './pages/LearningPath';
import TopicDetail from './pages/TopicDetail';
import Playground from './pages/Playground';
import { Database, Zap, BookOpen, Terminal, Moon, Sun, Menu, X } from 'lucide-react';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { theme, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Navigation */}
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center space-x-2 z-50" onClick={closeMenu}>
                <Database className="w-8 h-8 text-sapphire-600 dark:text-sapphire-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-sapphire-600 to-blue-700 dark:from-sapphire-400 dark:to-blue-600 bg-clip-text text-transparent">
                  SQL COSMOS
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/path" className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>Learning Path</span>
                </Link>
                <Link to="/playground" className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors">
                  <Terminal className="w-4 h-4" />
                  <span>Playground</span>
                </Link>
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Buttons */}
              <div className="flex md:hidden items-center space-x-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <button 
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-50"
                  aria-label="Toggle menu"
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
                className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden shadow-xl"
              >
                <div className="flex flex-col p-4 space-y-4">
                  <Link 
                    to="/path" 
                    onClick={closeMenu}
                    className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sapphire-50 dark:hover:bg-sapphire-900/20 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Learning Path</span>
                  </Link>
                  <Link 
                    to="/playground" 
                    onClick={closeMenu}
                    className="flex items-center space-x-3 p-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sapphire-50 dark:hover:bg-sapphire-900/20 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors"
                  >
                    <Terminal className="w-5 h-5" />
                    <span className="font-medium">Playground</span>
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
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 SQL Cosmos. Exploring the relational universe.</p>
            <p className="mt-2 font-mono text-xs opacity-75">Built by OpenClaw</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

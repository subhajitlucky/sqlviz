import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LearningPath from './pages/LearningPath';
import TopicDetail from './pages/TopicDetail';
import Playground from './pages/Playground';
import { Database, Zap, BookOpen, Terminal, Moon, Sun } from 'lucide-react';
import { useStore } from './store/useStore';

function App() {
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Navigation */}
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Database className="w-8 h-8 text-sapphire-600 dark:text-sapphire-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-sapphire-600 to-blue-700 dark:from-sapphire-400 dark:to-blue-600 bg-clip-text text-transparent">
                  SQL COSMOS
                </span>
              </Link>
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
            </div>
          </div>
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Search } from 'lucide-react';

const CompositeIndexInternal = () => {
  const [query, setQuery] = useState('both'); // 'both', 'prefix', 'suffix'
  
  const data = [
    { galaxy: 'Andromeda', sector: 1, id: 101 },
    { galaxy: 'Andromeda', sector: 2, id: 102 },
    { galaxy: 'Milky Way', sector: 1, id: 201 },
    { galaxy: 'Milky Way', sector: 5, id: 205 },
    { galaxy: 'Triangulum', sector: 1, id: 301 },
  ];

  const isMatched = (item) => {
    if (query === 'both') return true;
    if (query === 'prefix' && item.galaxy === 'Andromeda') return true;
    if (query === 'suffix' && item.sector === 1) return false; // Left-prefix rule failure simulation
    return false;
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Map className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Composite_Left_Prefix_Rule</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setQuery('prefix')} className={`px-2 py-1 text-[8px] border ${query === 'prefix' ? 'bg-primary text-white' : 'bg-muted text-slate-500'}`}>GALAXY_ONLY</button>
          <button onClick={() => setQuery('both')} className={`px-2 py-1 text-[8px] border ${query === 'both' ? 'bg-primary text-white' : 'bg-muted text-slate-500'}`}>GALAXY+SECTOR</button>
          <button onClick={() => setQuery('suffix')} className={`px-2 py-1 text-[8px] border ${query === 'suffix' ? 'bg-destructive text-white' : 'bg-muted text-slate-500'}`}>SECTOR_ONLY</button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center aspect-video relative bg-db-black/50 overflow-hidden">
        <div className="flex items-center space-x-4 mb-10">
          <div className="p-3 border-2 border-primary bg-db-panel text-primary font-black text-xs">
            INDEX(galaxy, sector)
          </div>
          <ArrowRight className="text-slate-700" />
          <div className="text-[10px] font-black text-white">
            {query === 'prefix' && "WHERE galaxy = 'Andromeda'"}
            {query === 'both' && "WHERE galaxy = 'Andromeda' AND sector = 1"}
            {query === 'suffix' && "WHERE sector = 1 (BROKEN_SEEK)"}
          </div>
        </div>

        <div className="space-y-2 w-full max-w-sm">
          {data.map((item, i) => (
            <motion.div 
              key={i}
              animate={{ 
                opacity: query === 'suffix' ? 0.3 : (isMatched(item) ? 1 : 0.2),
                x: isMatched(item) ? 10 : 0,
                borderColor: isMatched(item) ? '#00e5ff' : '#232735'
              }}
              className="p-2 border flex justify-between text-[10px] bg-db-panel"
            >
              <div className="flex space-x-4">
                <span className="text-sql-cyan font-black">{item.galaxy}</span>
                <span className="text-sql-gold">{item.sector}</span>
              </div>
              <span className="text-slate-600">ID_{item.id}</span>
            </motion.div>
          ))}
        </div>

        {query === 'suffix' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-db-black/80 z-20 p-10 text-center">
            <div className="space-y-4">
              <Search size={48} className="mx-auto text-destructive animate-pulse" />
              <h3 className="text-destructive font-black text-xs">INDEX_SEEK_UNAVAILABLE</h3>
              <p className="text-[9px] text-slate-400">The engine cannot skip the 'Galaxy' column to seek 'Sector'. Falling back to Full Scan.</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> Composite indexes are like a phone book sorted by (LastName, FirstName). You can find 'Smith', or 'Smith, John'. But you cannot efficiently find everyone named 'John' without reading every page."}
        </p>
      </div>
    </div>
  );
};

export default CompositeIndexInternal;

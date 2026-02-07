import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Orbit, Search, Database } from 'lucide-react';

const SubqueryInternal = () => {
  const [active, setActive] = useState(false);
  const [isCorrelated, setIsCorrelated] = useState(false);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Orbit className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Subquery_Logic_Orbits</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsCorrelated(!isCorrelated)} 
            className={`px-3 py-1 border text-[9px] font-black ${isCorrelated ? 'bg-sql-gold/20 text-sql-gold border-sql-gold' : 'bg-muted border-border'}`}
          >
            {isCorrelated ? 'Correlated' : 'Standard'}
          </button>
          <button onClick={() => setActive(!active)} className="px-3 py-1 bg-primary text-white text-[9px] font-black">RUN_LOGIC</button>
        </div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center aspect-video relative bg-db-black/50">
        {/* Main Query Circle */}
        <div className="w-64 h-64 border-2 border-db-border rounded-full flex items-center justify-center relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600">OUTER_QUERY_SCAN</div>
          
          <div className="w-12 h-12 bg-db-panel border border-primary flex items-center justify-center text-primary relative z-10 shadow-2xl">
            <Database size={24} />
          </div>

          {/* Subquery Satellite */}
          <motion.div 
            animate={{ 
              rotate: active ? 360 : 0,
              x: 120 * Math.cos(0),
              y: 120 * Math.sin(0)
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
            <div className="w-20 h-12 bg-db-panel border-2 border-sql-cyan flex flex-col items-center justify-center shadow-xl">
              <span className="text-[7px] font-black text-sql-cyan">SUBQUERY</span>
              <Search size={14} className="text-sql-cyan" />
            </div>
            
            {/* Correlation ping */}
            {isCorrelated && active && (
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: 120 }} 
                transition={{ duration: 0.5, repeat: Infinity }} 
                className="absolute top-1/2 right-full h-[1px] bg-sql-gold origin-right"
              />
            )}
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 text-[8px] text-slate-600 font-black space-y-1">
          <p>OUTER: SELECT * FROM orders</p>
          <p>INNER: SELECT id FROM users WHERE ...</p>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {isCorrelated 
            ? "> CORRELATED SUBQUERY: The inner query refers to columns from the outer query. It must execute ONCE FOR EVERY ROW processed by the outer query. High CPU cost."
            : "> STANDARD SUBQUERY: The inner query executes once, its result is cached, and then the outer query uses that constant result set."}
        </p>
      </div>
    </div>
  );
};

export default SubqueryInternal;

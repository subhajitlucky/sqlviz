import React from 'react';
import { motion } from 'framer-motion';

const BTreeVisualizer = () => {
  const nodes = [
    { id: 'root', label: '100', x: 50, y: 10, children: ['l1', 'r1'] },
    { id: 'l1', label: '50', x: 25, y: 40, children: ['l2', 'm2'] },
    { id: 'r1', label: '150', x: 75, y: 40, children: ['m2', 'r2'] },
    { id: 'l2', label: '10, 20', x: 10, y: 80 },
    { id: 'm2', label: '60, 70', x: 50, y: 80 },
    { id: 'r2', label: '160, 180', x: 90, y: 80 },
  ];

  const connections = [
    { from: 'root', to: 'l1' },
    { from: 'root', to: 'r1' },
    { from: 'l1', to: 'l2' },
    { from: 'l1', to: 'm2' },
    { from: 'r1', to: 'm2' },
    { from: 'r1', to: 'r2' },
  ];

  return (
    <div className="w-full h-64 bg-db-black border border-db-border relative overflow-hidden p-4 shadow-2xl transition-all">
      <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from);
          const to = nodes.find(n => n.id === conn.to);
          return (
            <motion.line
              key={i}
              x1={from.x} y1={from.y + 5} x2={to.x} y2={to.y - 5}
              stroke="currentColor"
              className="text-db-border"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <rect
              x={node.x - 8} y={node.y - 4} width={16} height={8}
              fill="currentColor"
              className="text-db-surface"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle"
              fill="currentColor"
              fontSize="3.5"
              fontWeight="black"
              className="font-mono text-slate-400 tracking-tighter"
            >
              {node.label}
            </text>
            <rect
              x={node.x - 8} y={node.y - 4} width={16} height={8}
              fill="none"
              stroke="currentColor"
              className="text-db-border group-hover:text-sql-cyan transition-colors"
              strokeWidth="0.5"
            />
            {/* Connection ports */}
            <circle cx={node.x} cy={node.y-4} r="0.5" className="fill-sql-cyan/30" />
            <circle cx={node.x} cy={node.y+4} r="0.5" className="fill-sql-cyan/30" />
          </motion.g>
        ))}
      </svg>
      
      <div className="absolute top-4 left-4 font-mono uppercase">
        <div className="text-[8px] text-slate-600 tracking-widest font-black">BTREE_INDEX_MAP</div>
        <div className="text-[10px] text-sql-gold font-bold">MODE: BALANCED</div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-slate-600 font-black tracking-[0.2em] flex items-center bg-db-surface px-2 py-1 border border-db-border">
        FANOUT_FACTOR: 3
      </div>
    </div>
  );
};

export default BTreeVisualizer;

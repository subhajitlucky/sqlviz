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
    <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden p-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from);
          const to = nodes.find(n => n.id === conn.to);
          return (
            <motion.line
              key={i}
              x1={from.x} y1={from.y + 5} x2={to.x} y2={to.y - 5}
              stroke="#1e293b"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: i * 0.1 }}
          >
            <rect
              x={node.x - 8} y={node.y - 4} width={16} height={8}
              rx="2"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="0.5"
            />
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="3"
              fontWeight="bold"
              className="font-mono"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
        Balanced Tree Hierarchy
      </div>
    </div>
  );
};

export default BTreeVisualizer;

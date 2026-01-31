import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedStarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      {/* Background Glows (Nebulas) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sapphire-900/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-indigo-900/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-900/5 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '15s' }} />
      
      {/* Stars */}
      <svg className="w-full h-full opacity-60">
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, star.opacity, 0],
              y: [`${star.y}%`, `${star.y - 5}%`],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedStarField;

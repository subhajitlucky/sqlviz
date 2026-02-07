import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, GitMerge, Database, Cpu } from 'lucide-react';

const HashJoinVisualizer = () => {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('build'); // build, probe
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const buckets = 8;
  const buildItems = 12;
  const probeItems = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Buckets
      for (let i = 0; i < buckets; i++) {
        ctx.strokeStyle = '#232735';
        ctx.setLineDash([2, 2]);
        ctx.strokeRect(100 + i * 50, 150, 40, 40);
        ctx.setLineDash([]);
        ctx.fillStyle = '#1e293b';
        ctx.fillText(`H(${i})`, 110 + i * 50, 205);
      }

      if (phase === 'build') {
        // Build phase: rows from Table A fly into buckets
        for (let i = 0; i < buildItems; i++) {
          const hash = i % buckets;
          const targetX = 120 + hash * 50;
          const targetY = 170;
          
          let curX = 50;
          let curY = 50 + i * 20;
          
          if (isPlaying) {
            const p = Math.min(1, progress * 2 - (i / buildItems));
            if (p > 0) {
              curX = 50 + (targetX - 50) * p;
              curY = (50 + i * 20) + (targetY - (50 + i * 20)) * p;
            }
          }

          ctx.fillStyle = '#336791';
          ctx.beginPath();
          ctx.arc(curX, curY, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Probe phase: rows from Table B fly past buckets
        for (let i = 0; i < probeItems; i++) {
          const hash = i % buckets;
          const targetX = 120 + hash * 50;
          
          let curX = 550;
          let curY = 50 + i * 15;
          
          if (isPlaying) {
            const p = Math.min(1, progress * 3 - (i / probeItems));
            if (p > 0) {
              curX = 550 + (0 - 550) * p;
              
              // If match
              if (Math.abs(curX - targetX) < 10) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00ff9d';
                ctx.fillStyle = '#00ff9d';
              } else {
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#00e5ff';
              }
            }
          }

          ctx.beginPath();
          ctx.rect(curX - 5, curY - 5, 10, 10);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (isPlaying) {
        setProgress(prev => (prev + 0.005) % 1.01);
        if (progress >= 1) setIsPlaying(false);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [phase, isPlaying, progress]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <GitMerge className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Hash_Join_Orchestrator</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => { setPhase(phase === 'build' ? 'probe' : 'build'); setProgress(0); setIsPlaying(false); }}
            className="px-3 py-1 bg-muted border border-border text-[9px] font-black hover:bg-secondary transition-colors"
          >
            Phase: {phase === 'build' ? '1. Build_Hash' : '2. Probe_Hash'}
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-primary hover:text-accent transition-colors"
          >
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => { setProgress(0); setIsPlaying(false); }}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-db-black/80 p-4">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={300} 
          className="w-full h-full"
        />
        
        <div className="absolute top-4 left-4 flex space-x-8 text-[8px] font-black uppercase">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#336791] rounded-full" /> <span>Table_A (Build)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#00e5ff]" /> <span>Table_B (Probe)</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <div className="flex items-center space-x-3 mb-4">
          <Cpu className="w-4 h-4 text-sql-gold" />
          <h4 className="text-[10px] font-black text-foreground tracking-widest">Logic_Trace</h4>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {phase === 'build' 
            ? "> PHASE 1: Small table is scanned and a hash table is built in memory. O(N)." 
            : "> PHASE 2: Large table is scanned. Each row is hashed and checked against the buckets. O(M)."}
        </p>
      </div>
    </div>
  );
};

export default HashJoinVisualizer;

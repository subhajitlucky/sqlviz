import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Target, Zap, Search } from 'lucide-react';

const IndexSeekVsScan = () => {
  const canvasRef = useRef(null);
  const [strategy, setStrategy] = useState('scan'); // seek, scan
  const [isPlaying, setIsPlaying] = useState(false);
  const [frame, setFrame] = useState(0);

  const particleCount = 2000;
  const particles = useRef([]);

  useEffect(() => {
    // Init particles
    const p = [];
    for (let i = 0; i < particleCount; i++) {
      p.push({
        x: Math.random() * 600,
        y: Math.random() * 300,
        target: i === 452, // The one we want
        found: false
      });
    }
    particles.current = p;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const p = particles.current;
      const isScan = strategy === 'scan';
      const scanX = (frame * 5) % 600;

      p.forEach((particle, idx) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        
        if (particle.target) {
          ctx.fillStyle = '#00ff9d';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ff9d';
        } else {
          ctx.fillStyle = '#334155';
          ctx.shadowBlur = 0;
        }

        if (isPlaying) {
          if (isScan) {
            // Flashlight effect
            if (particle.x < scanX) {
              ctx.fillStyle = particle.target ? '#00ff9d' : '#64748b';
            }
          } else {
            // Seek effect - directly highlight target
            if (frame > 20) {
              ctx.fillStyle = particle.target ? '#00ff9d' : '#1e293b';
            }
          }
        }
        
        ctx.fill();
      });

      // Draw Tool
      if (isPlaying) {
        if (isScan) {
          ctx.strokeStyle = '#336791';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(scanX, 0);
          ctx.lineTo(scanX, 300);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(51, 103, 145, 0.1)';
          ctx.fillRect(0, 0, scanX, 300);
        } else {
          if (frame < 25) {
            ctx.strokeStyle = '#00e5ff';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(300, 150);
            ctx.lineTo(p[452].x, p[452].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
        setFrame(f => f + 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [strategy, isPlaying, frame]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Seek_vs_Scan_Engine</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => { setStrategy(strategy === 'scan' ? 'seek' : 'scan'); setFrame(0); setIsPlaying(false); }}
            className="px-3 py-1 bg-muted border border-border text-[9px] font-black hover:bg-secondary transition-colors"
          >
            Mode: {strategy === 'scan' ? 'Full_Scan' : 'Index_Seek'}
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-primary hover:text-accent transition-colors"
          >
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => { setFrame(0); setIsPlaying(false); }}
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
        
        <div className="absolute top-4 left-4 text-[10px] font-black">
          <div className="flex flex-col space-y-1">
            <span className={strategy === 'scan' ? 'text-sql-blue' : 'text-muted-foreground'}>IO_COST: {strategy === 'scan' ? frame * 10 : 1} ops</span>
            <span className={strategy === 'seek' ? 'text-sql-cyan' : 'text-muted-foreground'}>METHOD: {strategy.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-4 h-4 text-sql-gold" />
          <h4 className="text-[10px] font-black text-foreground tracking-widest">Physics_Explanation</h4>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {strategy === 'scan' 
            ? "> SEQUENTIAL SCAN: The engine visits every data page in the heap. Cost increases linearly O(N)." 
            : "> INDEX SEEK: The engine uses the B-Tree map to navigate directly to the target. Cost is logarithmic O(log N)."}
        </p>
      </div>
    </div>
  );
};

export default IndexSeekVsScan;

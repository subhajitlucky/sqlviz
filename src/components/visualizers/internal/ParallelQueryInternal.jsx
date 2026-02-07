import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Cpu, Layers } from 'lucide-react';

const ParallelQueryInternal = () => {
  const canvasRef = useRef(null);
  const [workers, setWorkers] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const pipeWidth = 400;
      const startX = 100;
      const workerGap = 60;
      const workerY = (300 - (workers - 1) * workerGap) / 2;

      // Draw Main Stream
      ctx.strokeStyle = '#232735';
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(50, 140, 50, 20);
      ctx.setLineDash([]);

      // Draw Workers and Lanes
      for (let i = 0; i < workers; i++) {
        const y = workerY + i * workerGap;
        
        // Lane lines
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.bezierCurveTo(150, 150, 150, y, 200, y);
        ctx.lineTo(400, y);
        ctx.bezierCurveTo(450, y, 450, 150, 500, 150);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Worker node
        ctx.fillStyle = '#0d0e12';
        ctx.fillRect(280, y - 15, 40, 30);
        ctx.strokeStyle = isPlaying ? '#336791' : '#232735';
        ctx.strokeRect(280, y - 15, 40, 30);
        ctx.fillStyle = '#64748b';
        ctx.font = '8px monospace';
        ctx.fillText(`W${i}`, 292, y + 5);

        // Data particles
        if (isPlaying) {
          const p = (progress + (i / workers)) % 1;
          const x = 100 + p * 400;
          let curY;
          if (x < 200) {
            const bp = (x - 100) / 100;
            curY = 150 + (y - 150) * bp;
          } else if (x < 400) {
            curY = y;
          } else {
            const bp = (x - 400) / 100;
            curY = y + (150 - y) * bp;
          }

          ctx.fillStyle = '#00e5ff';
          ctx.beginPath();
          ctx.arc(x, curY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Gather point
      ctx.fillStyle = '#00ff9d';
      ctx.fillRect(500, 140, 50, 20);
      ctx.font = '8px monospace';
      ctx.fillText('MERGE', 510, 153);

      if (isPlaying) {
        setProgress(prev => (prev + 0.01) % 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [workers, isPlaying, progress]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Parallel_Worker_Orchestration</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[8px] text-muted-foreground">Workers:</label>
          <input 
            type="range" min="1" max="4" step="1" 
            value={workers} 
            onChange={(e) => setWorkers(parseInt(e.target.value))}
            className="w-20 accent-primary"
          />
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 text-primary hover:text-accent">
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-db-black/80">
        <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> PARALLEL QUERY splitting a single scan into multiple chunks. Each worker processes a chunk independently. The Gather node then merges the results. Throughput scales with CPU cores."}
        </p>
      </div>
    </div>
  );
};

export default ParallelQueryInternal;

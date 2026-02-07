import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Box, Layers } from 'lucide-react';

const AggregationInternal = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const categories = ['DEPT_A', 'DEPT_B', 'DEPT_C'];
  const items = useRef(Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    cat: categories[i % 3],
    x: 50 + Math.random() * 200,
    y: 50 + Math.random() * 200,
    merged: false
  })));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const wells = categories.map((c, i) => ({
        name: c,
        x: 400,
        y: 50 + i * 80,
        color: i === 0 ? '#336791' : i === 1 ? '#00e5ff' : '#ffcc00'
      }));

      // Draw Wells
      wells.forEach(w => {
        ctx.strokeStyle = w.color;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(w.x, w.y, 60, 40);
        ctx.setLineDash([]);
        ctx.fillStyle = w.color;
        ctx.font = '8px monospace';
        ctx.fillText(w.name, w.x, w.y - 5);
      });

      // Draw Items
      items.current.forEach(item => {
        const well = wells.find(w => w.name === item.cat);
        let curX = item.x;
        let curY = item.y;

        if (isPlaying) {
          const p = Math.max(0, Math.min(1, progress * 2 - (item.id / 30)));
          curX = item.x + (well.x + 20 - item.x) * p;
          curY = item.y + (well.y + 15 - item.y) * p;
          
          if (p >= 1) {
            ctx.globalAlpha = 0.2; // Melt effect
          }
        }

        ctx.fillStyle = '#64748b';
        ctx.fillRect(curX, curY, 6, 6);
        ctx.globalAlpha = 1.0;
      });

      // Draw Aggregated Result
      if (progress > 0.8) {
        wells.forEach((w, i) => {
          const opacity = (progress - 0.8) * 5;
          ctx.globalAlpha = opacity;
          ctx.fillStyle = w.color;
          ctx.font = '12px font-black';
          ctx.fillText("SUM: 450", w.x + 5, w.y + 25);
          ctx.globalAlpha = 1.0;
        });
      }

      if (isPlaying) {
        setProgress(prev => (prev + 0.005) % 1.01);
        if (progress >= 1) setIsPlaying(false);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, progress]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Aggregation_Gravity_Well</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 text-primary hover:text-accent">
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
          <button onClick={() => { setProgress(0); setIsPlaying(false); }} className="p-1 text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-db-black/80">
        <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> GROUP BY shatters the result set into distinct buckets (wells). Once grouped, the Aggregation function (SUM, AVG, COUNT) collapses all rows in that bucket into a single scalar value."}
        </p>
      </div>
    </div>
  );
};

export default AggregationInternal;

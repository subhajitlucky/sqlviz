import React, { useRef, useEffect, useState } from 'react';
import { Play, Flame, Database, Zap } from 'lucide-react';

const WriteAmplification = () => {
  const canvasRef = useRef(null);
  const [indexCount, setIndexCount] = useState(1);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw storage blocks
      const blocks = [
        { name: 'HEAP', x: 300, y: 150 },
        { name: 'WAL', x: 100, y: 100 },
        { name: 'METADATA', x: 100, y: 200 },
        ...Array.from({ length: indexCount }).map((_, i) => ({
          name: `INDEX_${i + 1}`,
          x: 500,
          y: 50 + (i * 200 / indexCount)
        }))
      ];

      blocks.forEach(b => {
        ctx.strokeStyle = '#232735';
        ctx.strokeRect(b.x - 30, b.y - 15, 60, 30);
        ctx.fillStyle = '#64748b';
        ctx.font = '8px monospace';
        ctx.fillText(b.name, b.x - 25, b.y + 5);
      });

      // Update ripples
      setRipples(prev => {
        const next = prev.map(r => ({
          ...r,
          size: r.size + 2,
          alpha: r.alpha - 0.01
        })).filter(r => r.alpha > 0);
        
        next.forEach(r => {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${r.alpha})`;
          ctx.stroke();
        });
        
        return next;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [indexCount]);

  const triggerUpdate = () => {
    // Single update event
    const start = { x: 300, y: 150 };
    setRipples([{ x: start.x, y: start.y, size: 0, alpha: 1 }]);
    
    // Simulate propagation to other blocks
    setTimeout(() => {
      const effectRipples = [
        { x: 100, y: 100, size: 0, alpha: 1 }, // WAL
        { x: 100, y: 200, size: 0, alpha: 1 }, // META
        ...Array.from({ length: indexCount }).map((_, i) => ({
          x: 500,
          y: 50 + (i * 200 / indexCount),
          size: 0, alpha: 1
        }))
      ];
      setRipples(prev => [...prev, ...effectRipples]);
    }, 500);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <Flame className="w-4 h-4 text-destructive" />
          <span className="text-muted-foreground">Write_Amplification_Monitor</span>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-[8px] text-muted-foreground">Extra_Indexes:</label>
          <input 
            type="number" min="0" max="8" 
            value={indexCount} 
            onChange={(e) => setIndexCount(parseInt(e.target.value))}
            className="w-12 bg-muted border border-border text-[10px] px-2"
          />
          <button 
            onClick={triggerUpdate}
            className="p-1 bg-sql-blue text-white rounded hover:bg-primary transition-all"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-db-black/80">
        <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
          <Database size={120} />
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {`> A single row update doesn't just touch one file. It must ripple through the WAL (Write Ahead Log), the Heap, and every single Index defined on that table. Result: 1 update event triggers ${3 + indexCount} IO operations.`}
        </p>
      </div>
    </div>
  );
};

export default WriteAmplification;

import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Box, HardDrive, Layers } from 'lucide-react';

const StorageBlockVisualizer = () => {
  const canvasRef = useRef(null);
  const [mode, setPhase] = useState('logical'); // logical, physical
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const rows = 10;
  const cols = 4;
  const cellSize = 40;
  const gap = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isPhysical = mode === 'physical';
      const totalCells = rows * cols;
      
      for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        let targetX, targetY;
        
        if (isPhysical) {
          // Linear layout
          const itemsPerRow = 12;
          targetX = 50 + (i % itemsPerRow) * (cellSize + gap);
          targetY = 100 + Math.floor(i / itemsPerRow) * (cellSize + gap);
        } else {
          // Grid layout
          targetX = 150 + col * (cellSize + gap);
          targetY = 50 + row * (cellSize + gap);
        }

        // Color based on column
        const colors = ['#336791', '#00e5ff', '#ffcc00', '#00ff9d'];
        ctx.fillStyle = colors[col % colors.length];
        ctx.globalAlpha = 0.8;
        
        // Draw cell
        ctx.beginPath();
        ctx.roundRect(targetX, targetY, cellSize, cellSize, 4);
        ctx.fill();
        
        // Highlight active scan
        if (isPlaying && i / totalCells < progress) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
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
  }, [mode, isPlaying, progress]);

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <HardDrive className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Physical_Storage_Layout</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => { setPhase(mode === 'logical' ? 'physical' : 'logical'); setProgress(0); }}
            className="px-3 py-1 bg-muted border border-border text-[9px] font-black hover:bg-secondary transition-colors"
          >
            Switch_to_{mode === 'logical' ? 'Physical' : 'Logical'}
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

      <div className="relative aspect-video bg-db-black/50 p-4">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={300} 
          className="w-full h-full"
        />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[8px] text-muted-foreground font-black">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#336791]" /> <span>ID (Fixed)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#00e5ff]" /> <span>Name (Var)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#ffcc00]" /> <span>Age (Fixed)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#00ff9d]" /> <span>Metadata</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <div className="flex items-center space-x-3 mb-4">
          <Layers className="w-4 h-4 text-sql-gold" />
          <h4 className="text-[10px] font-black text-foreground tracking-widest">Execution_Trace</h4>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {mode === 'logical' 
            ? "> Data is abstracted into rows and columns for human readability." 
            : "> Data is stored as a linear sequence of bytes on disk. A 'Full Table Scan' must iterate through every block sequentially."}
        </p>
      </div>
    </div>
  );
};

export default StorageBlockVisualizer;

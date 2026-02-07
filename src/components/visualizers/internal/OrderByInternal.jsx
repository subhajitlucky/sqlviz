import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, RotateCcw, Play } from 'lucide-react';

const OrderByInternal = () => {
  const [items, setItems] = useState([45, 12, 89, 3, 67, 34, 56]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState([-1, -1]);

  const bubbleSort = async () => {
    let arr = [...items];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIdx([j, j + 1]);
        await new Promise(r => setTimeout(r, 400));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setItems([...arr]);
        }
      }
    }
    setActiveIdx([-1, -1]);
    setIsPlaying(false);
  };

  const reset = () => {
    setItems([45, 12, 89, 3, 67, 34, 56]);
    setActiveIdx([-1, -1]);
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-db-black border border-db-border rounded-xl overflow-hidden font-mono uppercase">
      <div className="p-4 bg-db-panel border-b border-db-border flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs font-black">
          <ArrowUpDown className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Order_By_Sort_Engine</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => { setIsPlaying(true); bubbleSort(); }} className="p-1 text-primary">
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-current' : ''}`} />
          </button>
          <button onClick={reset} className="p-1 text-muted-foreground"><RotateCcw size={16}/></button>
        </div>
      </div>

      <div className="p-10 flex justify-center items-end space-x-4 aspect-video relative bg-db-black/50">
        {items.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              layout
              animate={{ 
                height: val, 
                backgroundColor: activeIdx.includes(i) ? '#00e5ff' : '#1e293b',
                borderColor: activeIdx.includes(i) ? '#ffffff' : '#232735'
              }}
              className="w-8 border-2 relative"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black">{val}</span>
            </motion.div>
            <span className="mt-2 text-[6px] text-slate-600">OFFSET_{i}</span>
          </div>
        ))}

        <div className="absolute top-4 left-4 text-[8px] text-slate-600 font-black">STRATEGY:: IN_MEMORY_QUICKSORT</div>
      </div>

      <div className="p-6 bg-db-panel border-t border-db-border">
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          {"> ORDER BY requires a sort operation. If the data fits in work_mem, it uses Quicksort. If not, it spills to disk and uses an External Merge Sort. Indexes can bypass this step entirely by providing pre-sorted data."}
        </p>
      </div>
    </div>
  );
};

export default OrderByInternal;

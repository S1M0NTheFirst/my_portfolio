'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowStore, Window } from '@/store/windowStore';

interface WindowFrameProps {
  window: Window;
}

const windowVariants: Variants = {
  initial: { 
    scale: 0.9, 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  minimized: { 
    scale: 0, 
    opacity: 0, 
    y: 400,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

const WindowFrame: React.FC<WindowFrameProps> = ({ window }) => {
  const { focusApp, closeApp, minimizeApp, toggleMaximize, activeWindowId } = useWindowStore();
  const [isClient, setIsClient] = useState(false);

  const isActive = activeWindowId === window.id;

  useEffect(() => {
    setIsClient(true);
    console.log(`Window mounted: ${window.title} (${window.id})`);
  }, [window.id, window.title]);

  if (!isClient) return null;

  return (
    <motion.div
      drag={!window.isMaximized}
      dragMomentum={false}
      dragElastic={0.05}
      layout // Enables smooth layout transitions (e.g. Maximize/Restore)
      initial="initial"
      animate={window.isMinimized ? "minimized" : "visible"}
      variants={windowVariants}
      style={{
        zIndex: isActive ? 40 + window.zIndex : 10 + window.zIndex, 
        position: window.isMaximized ? 'fixed' : 'absolute',
        // Fix: When maximized, account for TopBar (32px) so controls aren't covered
        top: window.isMaximized ? 32 : window.position.y,
        left: window.isMaximized ? 0 : window.position.x,
        width: window.isMaximized ? "100%" : 800,
        height: window.isMaximized ? "calc(100% - 32px)" : 500,
        borderRadius: window.isMaximized ? 0 : 12,
        pointerEvents: window.isMinimized ? 'none' : 'auto',
      }}
      className={`overflow-hidden shadow-2xl border border-white/40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex flex-col ${window.isMaximized ? '!transform-none' : ''}`}
      onMouseDown={() => focusApp(window.id)}
    >
      {/* Window Header */}
      <div 
        className={`h-10 border-b border-white/10 flex items-center px-4 justify-between cursor-default shrink-0 select-none transition-colors ${isActive ? 'bg-white/80 backdrop-blur-md' : 'bg-white/50 backdrop-blur-sm'}`}
        onDoubleClick={() => toggleMaximize(window.id)}
      >
        <div className="flex items-center gap-2 group" onMouseDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(window.id); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors group-hover:scale-110 shadow-sm"
          >
            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(window.id); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors group-hover:scale-110 shadow-sm"
          >
             <Minus size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximize(window.id); }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors group-hover:scale-110 shadow-sm"
          >
             <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        
        <span className={`text-sm font-medium pointer-events-none transition-colors ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
            {window.title}
        </span>
        
        <div className="w-14" />
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white/50 dark:bg-zinc-950/50 relative">
        {window.content}
      </div>
    </motion.div>
  );
};

export default WindowFrame;
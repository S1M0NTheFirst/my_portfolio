'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Image, Info } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible Overlay to close menu on click outside */}
          <div 
            className="fixed inset-0 z-[100]" 
            onContextMenu={(e) => { e.preventDefault(); onClose(); }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ top: y, left: x }}
            className="fixed z-[101] w-48 bg-zinc-800/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-1.5 flex flex-col gap-1"
          >
             <button 
                onClick={() => onAction('refresh')}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-200 hover:bg-blue-600 hover:text-white rounded transition-colors text-left"
             >
                <RefreshCw size={14} />
                Refresh
             </button>

             <button 
                onClick={() => onAction('info')}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-200 hover:bg-blue-600 hover:text-white rounded transition-colors text-left"
             >
                <Info size={14} />
                System Info
             </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;

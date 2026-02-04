'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Volume2, Wifi, Bluetooth } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const [volume, setVolume] = useState(80);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay to close */}
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={onClose} 
          />

          {/* Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            className="fixed top-10 right-4 z-[61] w-80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700 rounded-2xl shadow-2xl p-4 text-zinc-900 dark:text-white"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Connectivity Toggles */}
              <div className="col-span-2 grid grid-cols-4 gap-2 bg-zinc-100/50 dark:bg-zinc-800/50 p-2 rounded-xl">
                <button 
                  onClick={() => setWifi(!wifi)}
                  className={`flex flex-col items-center justify-center gap-1 aspect-square rounded-lg transition-all ${wifi ? 'bg-blue-500 text-white shadow-lg' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}
                >
                  <Wifi size={20} />
                </button>
                <button 
                  onClick={() => setBluetooth(!bluetooth)}
                  className={`flex flex-col items-center justify-center gap-1 aspect-square rounded-lg transition-all ${bluetooth ? 'bg-blue-500 text-white shadow-lg' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}
                >
                  <Bluetooth size={20} />
                </button>
                <button 
                  onClick={toggleTheme}
                  className={`flex flex-col items-center justify-center gap-1 aspect-square rounded-lg transition-all ${isDark ? 'bg-zinc-700 text-white' : 'bg-amber-100 text-amber-500'}`}
                >
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                 {/* Placeholder for 4th grid item */}
                 <div className="rounded-lg bg-zinc-200/20 dark:bg-zinc-700/20" />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 bg-zinc-100/50 dark:bg-zinc-800/50 p-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>Display</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sun size={16} className="text-zinc-400" />
                  <input 
                    type="range" 
                    className="flex-1 h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>Sound</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 size={16} className="text-zinc-400" />
                  <input 
                    type="range" 
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ControlCenter;

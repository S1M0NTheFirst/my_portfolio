'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

const BootScreen = () => {
  const { hasBooted, setBooted } = useWindowStore();

  useEffect(() => {
    if (!hasBooted) {
      const timer = setTimeout(() => {
        setBooted();
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [hasBooted, setBooted]);

  return (
    <AnimatePresence>
      {!hasBooted && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
               <h1 className="text-6xl font-thin tracking-widest">SZ.OS</h1>
            </motion.div>

            <div className="h-1 w-64 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
            
            <motion.p
              className="text-xs text-zinc-500 font-mono mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing Environment...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
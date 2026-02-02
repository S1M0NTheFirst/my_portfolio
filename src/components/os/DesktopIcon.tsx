'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AppConfig } from '@/config/apps';
import { useWindowStore } from '../../store/windowStore';

interface DesktopIconProps {
  app: AppConfig;
  dragConstraints?: React.RefObject<Element>;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app, dragConstraints }) => {
  const { launchApp } = useWindowStore();
  const ref = useRef(null);

  const handleClick = (e: React.MouseEvent) => {
    // We use single click for better web usability, ensuring immediate feedback.
    e.stopPropagation();
    console.log("Opening app (Single Click):", app.id);
    launchApp(app.id, app.title, app.component);
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={dragConstraints}
      dragMomentum={false}
      // Removed dragElastic to reduce "sticky" feel when trying to click
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-1 w-24 p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer group pointer-events-auto"
      onClick={handleClick}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
        <app.icon className="text-white w-6 h-6" strokeWidth={2} />
      </div>
      <span className="text-xs text-slate-900 font-bold text-center select-none bg-white/50 px-2 py-0.5 rounded-full mt-1 backdrop-blur-sm border border-black/5 shadow-sm">
        {app.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
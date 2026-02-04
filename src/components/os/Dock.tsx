'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import { apps, AppConfig } from '@/config/apps';

const DockIcon = ({ app, mouseX }: { app: AppConfig; mouseX: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { launchApp, minimizeApp, windows, activeWindowId } = useWindowStore();
  const [isHovered, setIsHovered] = useState(false);

  const windowState = windows.find(w => w.id === app.id);
  const isOpen = !!windowState;
  const isMinimized = windowState?.isMinimized;
  const isActive = activeWindowId === app.id;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 85, 48]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen && isActive && !isMinimized) {
        minimizeApp(app.id);
    } else {
        launchApp(app.id, app.title, app.component);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-1">
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -16 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-full mb-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl z-[60] whitespace-nowrap"
                >
                    {app.title}
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div
            ref={ref}
            style={{ width, height }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-xl bg-black/10 backdrop-blur-2xl border border-white/20 shadow-2xl transition-colors hover:bg-black/20"
            whileTap={{ scale: 0.85 }}
        >
            <app.icon className="w-1/2 h-1/2 text-slate-700" strokeWidth={2} />
        </motion.div>
        
        {isOpen && (
            <div className="w-1 h-1 bg-white rounded-full" />
        )}
    </div>
  );
};

const Dock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="h-16 px-4 flex items-end gap-4 pb-3 rounded-2xl bg-black/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
      >
        {apps.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;

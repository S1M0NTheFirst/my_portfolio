'use client';

import React, { useRef, useState } from 'react';
import TopBar from './TopBar';
import DesktopIcon from './DesktopIcon';
import WindowFrame from './WindowFrame';
import ContextMenu from './ContextMenu';
import { useWindowStore } from '@/store/windowStore';
import { apps } from '@/config/apps';
import { Spotlight } from './Spotlight';

interface DesktopProps {
  children?: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const { windows } = useWindowStore();
  const desktopRef = useRef<HTMLDivElement>(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  // Fix: Check if any window is maximized to lift the layer above the Dock
  const isAnyMaximized = windows.some(w => w.isMaximized);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.pageX, y: e.pageY });
    setMenuOpen(true);
  };

  const handleMenuAction = (action: string) => {
    setMenuOpen(false);
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'info':
        alert('SZ.OS v2.0\nBuild: 2026.01.31\nUser: s1m0n');
        break;
    }
  };

  return (
    <div 
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-300 via-indigo-200 to-cyan-200 dark:bg-slate-950 dark:from-slate-900 dark:to-zinc-900 selection:bg-indigo-500/30 text-slate-900 dark:text-zinc-100 transition-colors duration-500"
    >
      {/* Top Bar */}
      <TopBar />

      {/* Desktop Hero Text */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0 flex flex-col items-center">
          <h1 className="text-7xl font-bold tracking-tighter text-slate-800 dark:text-white/90 drop-shadow-sm select-none">
            Hi, I&apos;m Simon.
          </h1>
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-2xl font-medium text-slate-500 dark:text-zinc-400 tracking-wide select-none drop-shadow-sm">
              Master&apos;s Student in CS at CSULB | Full-Stack Developer
            </p>
            <p className="text-2xl font-medium text-slate-500 dark:text-zinc-400 tracking-wide select-none drop-shadow-sm">
              Machine Learning Engineer | Deep Learning Researcher
            </p>
          </div>
      </div>

      {/* Desktop Icons Grid */}
      <div className="absolute inset-0 pt-16 pl-6 flex flex-col flex-wrap content-start gap-6 z-0 pointer-events-none">
          {apps.filter(app => app.id !== 'resume').map((app) => (
             <div key={app.id} className="pointer-events-auto">
                <DesktopIcon app={app} dragConstraints={desktopRef as any} />
             </div>
          ))}
      </div>

      {/* Windows Layer */}
      <main className={`relative h-full w-full pointer-events-none transition-all duration-300 ${isAnyMaximized ? 'z-[100]' : 'z-10'}`}>
         {windows.map((window) => (
            <div key={window.id} className="pointer-events-auto">
               <WindowFrame window={window} />
            </div>
         ))}
      </main>

      {/* Dock and other children */}
      {children}

      <Spotlight />

      <ContextMenu 
        x={menuPos.x} 
        y={menuPos.y} 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onAction={handleMenuAction} 
      />
    </div>
  );
};

export default Desktop;

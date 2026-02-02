'use client';

import React, { useRef, useState } from 'react';
import TopBar from './TopBar';
import DesktopIcon from './DesktopIcon';
import WindowFrame from './WindowFrame';
import ContextMenu from './ContextMenu';
import { useWindowStore } from '@/store/windowStore';
import { apps } from '@/config/apps';

interface DesktopProps {
  children?: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const { windows } = useWindowStore();
  const desktopRef = useRef<HTMLDivElement>(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

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
      // Made background slightly darker/richer while keeping it "light theme"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-300 via-indigo-200 to-cyan-200 selection:bg-indigo-500/30 text-slate-900"
    >
      {/* Top Bar */}
      <TopBar />

      {/* Desktop Widget - High Contrast */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0">
          <h1 className="text-6xl font-bold tracking-tighter text-slate-800 drop-shadow-sm select-none">
            Hi, I&apos;m Simon.
          </h1>
          <p className="mt-4 text-xl font-medium text-slate-700 tracking-widest uppercase select-none drop-shadow-sm">
            Master&apos;s Student in CS at CSULB | Full-Stack Developer
          </p>
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
      <main className="relative h-full w-full z-10 pointer-events-none">
         {windows.map((window) => (
            <div key={window.id} className="pointer-events-auto">
               <WindowFrame window={window} />
            </div>
         ))}
      </main>

      {/* Dock and other children */}
      {children}

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

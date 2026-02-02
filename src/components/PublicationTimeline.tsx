'use client';

import { Publication } from '@/types/api';
import { useState } from 'react';

interface PublicationTimelineProps {
  items: Publication[];
}

export default function PublicationTimeline({ items }: PublicationTimelineProps) {
  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-700 ml-4 md:ml-6 space-y-12 py-8">
      {items.map((pub, index) => (
        <PublicationItem key={index} pub={pub} />
      ))}
    </div>
  );
}

function PublicationItem({ pub }: { pub: Publication }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative pl-8 md:pl-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dot */}
      <span className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-zinc-950 transition-colors duration-300 ${isHovered ? 'bg-blue-500' : 'bg-zinc-400 dark:bg-zinc-500'}`} />
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {pub.title}
          </h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {pub.date}
          </span>
        </div>
        
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {pub.conference}
        </div>

        {/* Paper Representation with Fade Out Effect */}
        <div className="relative w-full max-w-md h-32 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md p-4 overflow-hidden transition-all duration-500">
          
          {/* The "First Page" Overlay */}
          <div className={`absolute inset-0 bg-white dark:bg-zinc-800 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <div className="w-16 h-20 bg-zinc-200 dark:bg-zinc-700 rounded shadow-sm flex flex-col gap-1 p-1">
                <div className="w-full h-1 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
                <div className="w-3/4 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
                <div className="w-full h-1 bg-zinc-300 dark:bg-zinc-600 rounded-sm mt-2"></div>
                <div className="w-full h-1 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
                <div className="w-1/2 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
             </div>
             <span className="text-xs text-zinc-500 font-mono">Hover to view abstract</span>
          </div>

          {/* The Abstract Content (Revealed on Hover) */}
          <div className="h-full overflow-y-auto">
             <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
              &quot;{pub.description}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { FileText, Maximize2 } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  type: string;
  link: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: '1',
    title: "SwiftBot: A Lightweight Platform for Adaptive Multi-Robot Task Execution",
    type: "Distributed Systems / Robotics",
    link: "/paper/SwiftBot_Multi_Robot_FL_CCGrid_2026_12_15.pdf"
  },
  {
    id: '2',
    title: "MATLAB-Based Lightweight Workload Prediction via Machine Learning",
    type: "Machine Learning / Cloud Computing",
    link: "/paper/IEEE Final.pdf"
  },
  {
    id: '3',
    title: "Pronunciation Deviation Analysis Through Voice Cloning",
    type: "Audio Processing / AI",
    link: "/paper/voice_cloning_for_speach_detection.pdf"
  }
];

export const PublicationsApp = () => {
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);

  const handleOpenFullScreen = () => {
    if (selectedPaper) {
      window.open(selectedPaper.link, '_blank');
    }
  };

  return (
    <div className="flex h-full bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 overflow-hidden">
      
      {/* Left Sidebar: List */}
      <div className="w-1/3 min-w-[250px] border-r border-zinc-200 dark:border-zinc-700 flex flex-col bg-zinc-100 dark:bg-zinc-800/50">
         {/* Toolbar */}
         <div className="h-10 border-b border-zinc-200 dark:border-zinc-700 flex items-center px-4 gap-2 bg-zinc-100 dark:bg-zinc-800 sticky top-0 z-10">
             <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Publications</span>
         </div>
         
         <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {PUBLICATIONS.map((paper) => (
              <div 
                key={paper.id}
                onClick={() => setSelectedPaper(paper)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedPaper?.id === paper.id ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
              >
                 <FileText className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedPaper?.id === paper.id ? 'text-white' : 'text-zinc-400'}`} />
                 <div className="flex flex-col gap-0.5 min-w-0">
                    <span className={`text-sm font-medium leading-tight line-clamp-2 ${selectedPaper?.id === paper.id ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        {paper.title}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wide truncate ${selectedPaper?.id === paper.id ? 'text-blue-100' : 'text-zinc-500'}`}>
                        {paper.type}
                    </span>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="p-3 border-t border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-400 text-center">
            {PUBLICATIONS.length} documents
         </div>
      </div>

      {/* Right Pane: Preview */}
      <div className="flex-1 flex flex-col h-full bg-zinc-200 dark:bg-zinc-900/50 relative">
          {selectedPaper ? (
             <>
               <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={handleOpenFullScreen}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs rounded-full backdrop-blur transition-colors shadow-lg"
                  >
                    <Maximize2 size={12} />
                    Open Full Screen
                  </button>
               </div>
               <iframe 
                 src={selectedPaper.link} 
                 className="w-full h-full border-0" 
                 title="PDF Preview"
               />
             </>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">Select a paper to preview</p>
             </div>
          )}
      </div>

    </div>
  );
};
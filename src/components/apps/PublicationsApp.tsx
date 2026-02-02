'use client';

import React, { useState, useEffect } from 'react';
import { FileText, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface File extends DocumentData {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  link?: string;
}

export const PublicationsApp = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      // Check for placeholder config to avoid hanging requests
      if (db.app.options.projectId?.includes('placeholder')) {
        console.warn("Using mock data (Firebase not configured)");
        setFiles([
            { id: '1', title: 'SwiftBot_Multi_Robot_FL_CCGrid_2026_12_15.pdf', type: 'pdf', date: '2026-12-15', size: '2.4 MB', link: '#' },
            { id: '2', title: 'Voice_Cloning_for_Speech_Detection.pdf', type: 'pdf', date: '2025-08-10', size: '1.8 MB', link: '#' },
            { id: '3', title: 'Optimizing_Neural_Networks_Edge.pdf', type: 'pdf', date: '2024-11-22', size: '3.1 MB', link: '#' }
        ]);
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'publications'));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as File[];
        setFiles(docs);
      } catch (err) {
        console.error("Error fetching publications:", err);
        setError("Failed to load publications.");
        // Fallback to mock data for demo/offline
        setFiles([
            { id: '1', title: 'Offline_Mode_Paper.pdf', type: 'pdf', date: 'N/A', size: '0 KB', link: '#' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      {/* Toolbar */}
      <div className="h-10 border-b border-zinc-200 dark:border-zinc-700 flex items-center px-4 gap-4 bg-zinc-100 dark:bg-zinc-800/50">
         <div className="flex gap-1">
           <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
           <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
         </div>
         <span className="text-xs text-zinc-500 font-medium">~/Documents/Publications</span>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <Loader2 className="animate-spin mr-2" /> Loading...
            </div>
        ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 content-start">
                {files.map((file) => (
                <div 
                    key={file.id}
                    className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedFile(file)}
                >
                    <div className="w-16 h-20 bg-white border border-zinc-300 shadow-sm flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 flex items-center justify-center rounded-bl-md">
                        <span className="text-[8px] text-white font-bold">PDF</span>
                    </div>
                    <FileText className="text-zinc-400 w-8 h-8" />
                    <div className="w-10 h-1 bg-zinc-100 mt-2"></div>
                    <div className="w-8 h-1 bg-zinc-100 mt-1"></div>
                    </div>
                    <span className="text-xs text-center font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 break-words w-full px-1 line-clamp-2">
                    {file.title}
                    </span>
                </div>
                ))}
            </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-8"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="bg-white dark:bg-zinc-800 w-full max-w-2xl h-[80%] rounded-lg shadow-2xl flex flex-col overflow-hidden relative">
                <div className="h-10 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between px-4 bg-zinc-100 dark:bg-zinc-900">
                   <span className="font-medium text-sm truncate max-w-[80%]">{selectedFile.title}</span>
                   <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded">
                      <X size={16} />
                   </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                   <FileText size={64} className="text-zinc-300 mb-4" />
                   <h3 className="text-xl font-bold mb-2">Preview Not Available</h3>
                   <p className="text-zinc-500 text-sm max-w-xs">
                     This is a prototype. In a real app, this would render the PDF.<br/>
                     <span className="italic text-xs mt-2 block">
                        (Connected to Firebase: {selectedFile.id})
                     </span>
                   </p>
                   <div className="mt-8 text-xs text-zinc-400 font-mono">
                     Size: {selectedFile.size} • Created: {selectedFile.date}
                   </div>
                   {selectedFile.link && (
                       <a 
                         href={selectedFile.link} 
                         target="_blank" 
                         rel="noreferrer"
                         className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                       >
                           Download PDF
                       </a>
                   )}
                </div>
             </div>
             {/* Click outside to close */}
             <div className="absolute inset-0 -z-10" onClick={() => setSelectedFile(null)}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
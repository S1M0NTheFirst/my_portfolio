'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, AppWindow, Cpu } from 'lucide-react';
import { useWindowStore } from '@/store/windowStore';
import { apps } from '@/config/apps';

// Search Data
const SEARCH_ITEMS = [
  // Apps
  ...apps.map(app => ({ type: 'app', id: app.id, label: app.title, icon: AppWindow })),
  // Skills (mapped to About App)
  { type: 'skill', id: 'python', label: 'Python', icon: Cpu },
  { type: 'skill', id: 'react', label: 'React', icon: Cpu },
  { type: 'skill', id: 'typescript', label: 'TypeScript', icon: Cpu },
  { type: 'skill', id: 'nextjs', label: 'Next.js', icon: Cpu },
  { type: 'skill', id: 'pytorch', label: 'PyTorch', icon: Cpu },
  { type: 'skill', id: 'tensorflow', label: 'TensorFlow', icon: Cpu },
  { type: 'skill', id: 'docker', label: 'Docker', icon: Cpu },
  { type: 'skill', id: 'aws', label: 'AWS', icon: Cpu },
  { type: 'skill', id: 'git', label: 'Git', icon: Cpu },
  { type: 'skill', id: 'linux', label: 'Linux', icon: Cpu },
];

export const Spotlight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { launchApp, setHighlightedSkill } = useWindowStore();

  // Toggle on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items
  const filteredItems = SEARCH_ITEMS.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  // Handle Selection
  const handleSelect = (item: typeof SEARCH_ITEMS[0]) => {
    if (item.type === 'app') {
      const app = apps.find(a => a.id === item.id);
      if (app) launchApp(app.id, app.title, app.component);
    } else if (item.type === 'skill') {
      // Launch About Me and Highlight Skill
      const aboutApp = apps.find(a => a.id === 'about');
      if (aboutApp) {
        launchApp(aboutApp.id, aboutApp.title, aboutApp.component);
        setHighlightedSkill(item.label);
        // Clear highlight after 3 seconds
        setTimeout(() => setHighlightedSkill(null), 3000);
      }
    }
    setIsOpen(false);
  };

  // Keyboard Navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
              <Search className="text-zinc-400 w-6 h-6" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search apps or skills..."
                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-zinc-500 font-light"
              />
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs text-zinc-400 font-mono">
                <Command size={12} />
                <span>K</span>
              </div>
            </div>

            {/* Results */}
            {filteredItems.length > 0 && (
              <div className="p-2">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id + item.type}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors ${index === selectedIndex ? 'bg-blue-600/20' : 'hover:bg-white/5'}`}
                  >
                    <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${index === selectedIndex ? 'text-blue-100' : 'text-zinc-200'}`}>
                        {item.label}
                      </h4>
                      <span className="text-xs text-zinc-500 capitalize">{item.type}</span>
                    </div>
                    {index === selectedIndex && (
                        <span className="text-xs text-zinc-500">Enter to select</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {filteredItems.length === 0 && query && (
                <div className="p-8 text-center text-zinc-500">
                    No results found.
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { create } from 'zustand';
import { ReactNode } from 'react';

export interface Window {
  id: string;
  title: string;
  content: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

interface WindowState {
  hasBooted: boolean;
  windows: Window[];
  activeWindowId: string | null;
  highlightedSkill: string | null; // For Spotlight skill linking
  setBooted: () => void;
  launchApp: (id: string, title: string, content: ReactNode) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusApp: (id: string) => void;
  setHighlightedSkill: (skill: string | null) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  hasBooted: false,
  windows: [],
  activeWindowId: null,
  highlightedSkill: null,

  setBooted: () => set({ hasBooted: true }),

  setHighlightedSkill: (skill) => set({ highlightedSkill: skill }),

  launchApp: (id, title, content) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === id);
      if (existingWindow) {
        // Restore if minimized, and focus
        return {
          activeWindowId: id,
          windows: state.windows.map((w) =>
            w.id === id 
              ? { ...w, isOpen: true, isMinimized: false, zIndex: getNextZIndex(state.windows) } 
              : w
          ),
        };
      }
      
      // Open new window
      const newWindow: Window = {
        id,
        title,
        content,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + state.windows.length * 20, y: 100 + state.windows.length * 20 }, // Cascade effect
        zIndex: getNextZIndex(state.windows),
      };

      return {
        windows: [...state.windows, newWindow],
        activeWindowId: id,
      };
    }),

  closeApp: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId:
        state.activeWindowId === id
          ? state.windows.filter((w) => w.id !== id).sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null
          : state.activeWindowId,
    })),

  minimizeApp: (id) =>
    set((state) => ({
      activeWindowId: null, // Clear active focus when minimizing
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    })),

  toggleMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: getNextZIndex(state.windows) } : w
      ),
      activeWindowId: id,
    })),

  focusApp: (id) =>
    set((state) => ({
      activeWindowId: id,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: getNextZIndex(state.windows) } : w
      ),
    })),
}));

// Helper to calculate the next highest z-index
function getNextZIndex(windows: Window[]) {
  if (windows.length === 0) return 1;
  const maxZ = Math.max(...windows.map((w) => w.zIndex));
  return maxZ + 1;
}
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '@/store/windowStore';

interface HistoryItem {
  id: number;
  type: 'command' | 'output';
  content: string;
}

export const TerminalApp = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 0, type: 'output', content: 'Welcome to SZ.OS Terminal v2.0' },
    { id: 1, type: 'output', content: 'Type "help" for available commands.' },
    { id: 2, type: 'output', content: 'Hint: Try typing "train model" to see something cool.' },
  ]);
  const [isTraining, setIsTraining] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef(history); // Ref to access latest state in intervals

  useEffect(() => {
    historyRef.current = history;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addToHistory = (type: 'command' | 'output', content: string) => {
    setHistory(prev => [...prev, { id: Date.now() + Math.random(), type, content }]);
  };

  const runTrainingSimulation = async () => {
    setIsTraining(true);
    addToHistory('output', 'Initializing training simulation...');
    
    // Simulate loading
    await new Promise(r => setTimeout(r, 800));
    addToHistory('output', 'Dataset: "MNIST_Fashion" (60,000 images)');
    await new Promise(r => setTimeout(r, 800));
    addToHistory('output', 'Model: Sequential (Conv2D -> MaxPooling2D -> Flatten -> Dense)');
    
    const totalEpochs = 5;
    
    for (let i = 1; i <= totalEpochs; i++) {
        await new Promise(r => setTimeout(r, 1000));
        
        // Randomize metrics slightly for realism
        const loss = (0.9 * Math.pow(0.5, i)) + (Math.random() * 0.05);
        const acc = Math.min(0.99, (0.4 + (i * 0.12)) + (Math.random() * 0.02));
        
        // Progress bar simulation
        const progress = '='.repeat(i * 3) + '>'.padEnd(10 - i * 2, '.');
        
        addToHistory('output', `Epoch ${i}/${totalEpochs} [${progress}] loss: ${loss.toFixed(4)} - acc: ${acc.toFixed(4)}`);
    }

    await new Promise(r => setTimeout(r, 800));
    addToHistory('output', 'Training complete.');
    addToHistory('output', 'Model saved to ./checkpoints/best_model.h5');
    setIsTraining(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    addToHistory('command', cleanCmd);
    setInput('');

    // Split by whitespace to handle multiple spaces
    const args = cleanCmd.toLowerCase().split(/\s+/);
    const command = args[0];

    switch (command) {
      case 'help':
        addToHistory('output', 
`Available commands:
  help          - Show this help message
  clear         - Clear terminal output
  whoami        - Print current user
  cat resume    - Download resume PDF
  train model   - Run ML training simulation
  ls            - List directory contents`);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        addToHistory('output', 'simon_master_student');
        break;

      case 'cat':
        if (args[1] === 'resume') {
          addToHistory('output', 'Downloading resume.pdf...');
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Simon_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          addToHistory('output', 'cat: file not found. Try "cat resume"');
        }
        break;

      case 'train':
        if (args[1] === 'model') {
            await runTrainingSimulation();
        } else {
            addToHistory('output', 'Usage: train model');
        }
        break;
      
      case 'ls':
        addToHistory('output', 'resume.pdf  projects/  experience/  about_me.txt');
        break;

      default:
        addToHistory('output', `Command not found: ${command}. Type "help" for info.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTraining) {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="h-full w-full bg-black/95 text-green-500 font-mono text-sm p-4 overflow-y-auto selection:bg-green-500/30 selection:text-white"
      onClick={() => !isTraining && inputRef.current?.focus()}
    >
      <div className="flex flex-col gap-1">
        {history.map((item) => (
          <div key={item.id} className={`${item.type === 'command' ? 'text-white font-bold mt-2' : 'opacity-90'} whitespace-pre-wrap break-words`}>
            {item.type === 'command' ? `$ ${item.content}` : item.content}
          </div>
        ))}
      </div>
      
      {!isTraining && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-bold focus:ring-0 p-0"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          <div className="w-2.5 h-5 bg-green-500 animate-pulse" />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

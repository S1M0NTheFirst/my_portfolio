'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { apps } from '@/config/apps';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to SZ.OS Terminal',
    'Type "help" for a list of commands.',
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { launchApp } = useWindowStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Auto-focus input on click anywhere in terminal
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let output = '';

    switch (cleanCmd) {
      case 'help':
        output = 'Available commands: help, clear, resume, about, projects, contact, ls, whoami';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = 'user@sz.os';
        break;
      case 'ls':
        output = 'Applications: ' + apps.map(a => a.id).join('  ');
        break;
      case 'resume':
      case 'about':
      case 'projects':
      case 'contact':
        const app = apps.find(a => a.id === cleanCmd);
        if (app) {
          launchApp(app.id, app.title, app.component);
          output = `Launching ${app.title}...`;
        } else {
          output = `Command not found: ${cleanCmd}`;
        }
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${cleanCmd}`;
    }

    if (output) {
      setHistory(prev => [...prev, `$ ${cmd}`, output]);
    } else if (cleanCmd !== 'clear') {
       setHistory(prev => [...prev, `$ ${cmd}`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="h-full w-full bg-black/90 text-green-400 font-mono text-sm p-4 overflow-y-auto"
      onClick={handleContainerClick}
    >
      <div className="flex flex-col gap-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 p-0"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default InteractiveTerminal;

import React from 'react';
import { User, Code, Mail, Terminal, FileText, Briefcase, FolderOpen } from 'lucide-react';
import { ProjectsApp, ContactApp } from '@/components/apps/DummyApps'; // Keeping others dummy for now
import { AboutApp } from '@/components/apps/AboutApp';
import { ExperienceApp } from '@/components/apps/ExperienceApp';
import { PublicationsApp } from '@/components/apps/PublicationsApp';
import InteractiveTerminal from '@/components/apps/InteractiveTerminal';

export interface AppConfig {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ReactNode;
}

export const apps: AppConfig[] = [
  { id: 'about', title: 'About Me', icon: User, component: <AboutApp /> },
  { id: 'projects', title: 'Projects', icon: Code, component: <ProjectsApp /> },
  { id: 'experience', title: 'Experience', icon: Briefcase, component: <ExperienceApp /> },
  { id: 'publications', title: 'Publications', icon: FolderOpen, component: <PublicationsApp /> },
  { id: 'contact', title: 'Contact', icon: Mail, component: <ContactApp /> },
  { id: 'terminal', title: 'Terminal', icon: Terminal, component: <InteractiveTerminal /> },
  { 
    id: 'resume', 
    title: 'Resume', 
    icon: FileText, 
    component: (
      <div className="w-full h-full bg-zinc-100 flex items-center justify-center p-4">
        <iframe src="/resume.pdf" className="w-full h-full rounded-lg shadow-inner" title="Resume" />
      </div>
    ) 
  },
];

export const getApp = (id: string) => apps.find((app) => app.id === id);
import React from 'react';
import { User, Code, Mail, Terminal, FileText, Briefcase, FolderOpen } from 'lucide-react';
import { ProjectsApp, ContactApp } from '@/components/apps/DummyApps'; // Keeping others dummy for now
import { AboutApp } from '@/components/apps/AboutApp';
import { ExperienceApp } from '@/components/apps/ExperienceApp';
import { PublicationsApp } from '@/components/apps/PublicationsApp';
import { ResumeApp } from '@/components/apps/ResumeApp';
import { TerminalApp } from '@/components/apps/TerminalApp';

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
  { id: 'terminal', title: 'Terminal', icon: Terminal, component: <TerminalApp /> },
  { id: 'resume', title: 'Resume', icon: FileText, component: <ResumeApp /> },
];

export const getApp = (id: string) => apps.find((app) => app.id === id);
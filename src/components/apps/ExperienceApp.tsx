import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  color: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'csulb-research',
    role: 'Software Research Engineer (Federated Learning)',
    company: 'California State University, Long Beach',
    period: 'Jan 2026 - Present',
    color: 'bg-blue-500',
    description: [
      'Architecting SwiftBot, a distributed microservices platform that orchestrates robot tasks using Docker containers and LLM agents.',
      'Reduced system cold-start latency by 95% (to 120ms) by implementing a warm-container orchestration strategy and optimizing network overhead.',
      'Developing a custom DHT (Distributed Hash Table) overlay in Python to handle service discovery and fault tolerance across distributed nodes.',
    ],
  },
  {
    id: 'nps',
    role: 'Machine Learning Engineer Intern',
    company: 'National Park Service',
    period: 'Dec 2024 - May 2025',
    color: 'bg-emerald-500',
    description: [
      'Engineered a scalable AWS ETL pipeline (S3, Lambda) to ingest and process a 90 GB dataset, automating the transformation of raw aerial imagery for analysis.',
      'Deployed an EfficientDet object detection model into production using SageMaker, enabling real-time environmental monitoring on resource-constrained edge devices.',
    ],
  },
  {
    id: 'csulb-ug',
    role: 'Undergraduate Research Engineer',
    company: 'California State University, Long Beach',
    period: 'May 2024 - May 2025',
    color: 'bg-amber-500',
    description: [
      'Built a lightweight Federated Learning platform (HumanSys \'25) optimized for resource-constrained IoT devices.',
      'Designed algorithms for workload prediction using SQL to aggregate and analyze historical performance data, optimizing resource allocation for edge architectures.',
    ],
  },
];

const ExperienceNode = ({ data, index }: { data: ExperienceItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-700 group-last:hidden" />

      {/* Node Dot */}
      <motion.div 
        animate={{
          scale: isHovered ? 1.5 : 1,
          boxShadow: isHovered ? "0 0 10px rgba(0,0,0,0.2)" : "none"
        }}
        className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-white dark:border-zinc-900 ${data.color} z-10 transition-colors`}
      />

      {/* Content Card */}
      <motion.div 
        className={`
            cursor-pointer rounded-xl border border-transparent p-4 transition-all duration-300
            ${isHovered ? 'bg-white dark:bg-zinc-800 shadow-lg border-zinc-200 dark:border-zinc-700' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}
        `}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className={`text-lg font-bold transition-colors ${isHovered ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {data.role}
            </h3>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                {data.period}
            </span>
        </div>
        
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
            {data.company}
        </p>

        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                >
                    <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {data.description.map((point, i) => (
                            <li key={i} className="leading-relaxed">
                                {point}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceApp = () => {
  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900 overflow-y-auto p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white flex items-center gap-3">
            <span className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800">💼</span>
            Work Experience
        </h2>
        
        <div className="mt-4">
            {EXPERIENCE_DATA.map((exp, index) => (
                <ExperienceNode key={exp.id} data={exp} index={index} />
            ))}
        </div>

        <div className="mt-12 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-center">
             <p className="text-sm text-blue-800 dark:text-blue-200">
                Download my full resume for more details.
             </p>
        </div>
      </div>
    </div>
  );
};
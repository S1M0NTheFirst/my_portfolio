import { Experience } from '@/types/api';

interface TimelineProps {
  items: Experience[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-700 ml-4 md:ml-6 space-y-12 py-8">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-12">
          {/* Dot */}
          <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-zinc-400 ring-4 ring-white dark:bg-zinc-500 dark:ring-zinc-950" />
          
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              {item.date}
            </span>
          </div>
          
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {item.company} <span className="text-zinc-400 mx-2">•</span> {item.location}
          </div>
          
          <ul className="mt-4 space-y-2 list-disc list-outside ml-4 text-zinc-600 dark:text-zinc-400">
            {item.description.map((desc, i) => (
              <li key={i} className="text-sm leading-relaxed">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

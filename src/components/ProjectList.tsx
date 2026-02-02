import { Project } from '@/types/api';

interface ProjectListProps {
  items: Project[];
}

export default function ProjectList({ items }: ProjectListProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {items.map((project, index) => (
        <div key={index} className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {project.date}
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {project.stack}
          </p>
          <ul className="mt-2 space-y-2 list-disc list-outside ml-4 text-zinc-600 dark:text-zinc-400">
            {project.description.map((desc, i) => (
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
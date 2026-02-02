import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Projects
        </h1>
        <ProjectList items={projects} />
      </div>
    </main>
  );
}
import Timeline from "@/components/Timeline";
import { getExperience } from "@/lib/api";

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Experience
        </h1>
        <Timeline items={experience} />
      </div>
    </main>
  );
}
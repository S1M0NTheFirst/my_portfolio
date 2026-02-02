import PublicationTimeline from "@/components/PublicationTimeline";
import { getPublications } from '@/lib/api';

export default async function Publications() {
  const publications = await getPublications();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Publications
        </h1>
        
        <PublicationTimeline items={publications} />
          
        {publications.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400">
            No publications listed yet.
          </p>
        )}
      </div>
    </main>
  );
}

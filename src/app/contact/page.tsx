export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Contact
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
          Feel free to reach out for collaborations, research opportunities, or just a friendly hello.
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Email</span>
            <a href="mailto:blmoond6@gmail.com" className="text-lg text-zinc-900 dark:text-zinc-50 hover:underline">
              blmoond6@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Phone</span>
            <a href="tel:6576427779" className="text-lg text-zinc-900 dark:text-zinc-50 hover:underline">
              (657) 642-7779
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Social</span>
            <a 
              href="https://linkedin.com/in/simon-zhang-b83580315/" 
              target="_blank" 
              className="text-lg text-zinc-900 dark:text-zinc-50 hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
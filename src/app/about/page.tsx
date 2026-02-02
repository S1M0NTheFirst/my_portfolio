export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 sm:py-24 lg:px-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          About Me
        </h1>
        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            I am currently pursuing my Master of Science in Computer Science at California State University, Long Beach, expecting to graduate in Dec 2027. I previously completed my Bachelor&apos;s in Computer Science at the same institution with a GPA of 3.7.
          </p>
          <p>
            My research and work focus on <strong>Distributed Systems</strong>, <strong>Federated Learning</strong>, and building scalable <strong>Full-Stack Applications</strong>. I enjoy solving complex problems that sit at the intersection of systems engineering and machine learning.
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Key Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Languages</h4>
                <p className="text-sm">Python, TypeScript, JavaScript, C++, C, SQL, HTML/CSS</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Backend & Cloud</h4>
                <p className="text-sm">FastAPI, Node.js, Next.js, Docker, AWS (Lambda, S3, SageMaker)</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">AI & Machine Learning</h4>
                <p className="text-sm">PyTorch, TensorFlow, OpenCV, LLMs, AI Agents</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">Databases</h4>
                <p className="text-sm">PostgreSQL (Supabase), Firebase, MongoDB, SQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
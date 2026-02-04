import React from 'react';
import { Download, Printer } from 'lucide-react';

export const ResumeApp = () => {
  return (
    <div className="flex h-full w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold mb-4">Actions</h2>
        
        <a 
          href="/resume.pdf" 
          download="Simon_Resume.pdf"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors font-medium"
        >
          <Download size={18} />
          Download PDF
        </a>

        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white dark:bg-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600 border border-zinc-200 dark:border-zinc-600 rounded-lg shadow-sm transition-colors font-medium"
        >
          <Printer size={18} />
          Print
        </button>

        <div className="mt-auto text-xs text-zinc-500 dark:text-zinc-400">
          <p>Last Updated: Feb 2026</p>
          <p>Size: 142 KB</p>
        </div>
      </div>

      {/* Right Preview */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white dark:bg-zinc-900">
        <div className="max-w-[21cm] mx-auto bg-white dark:bg-zinc-950 shadow-xl min-h-[29.7cm] p-[2cm] text-sm leading-normal">
          {/* Header */}
          <header className="border-b border-zinc-300 dark:border-zinc-700 pb-6 mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">Simon</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1 font-medium">Machine Learning Engineer | Full-Stack Developer</p>
            <div className="flex flex-wrap gap-4 mt-4 text-zinc-500 dark:text-zinc-500 text-xs font-mono">
              <span>Long Beach, CA</span>
              <span>•</span>
              <span>simon@example.com</span>
              <span>•</span>
              <span>github.com/s1m0n</span>
              <span>•</span>
              <span>linkedin.com/in/s1m0n</span>
            </div>
          </header>

          {/* Content Grid */}
          <div className="space-y-6">
            
            {/* Education */}
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-1">Education</h3>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200">California State University, Long Beach</h4>
                <span className="text-zinc-500 text-xs">Expected May 2026</span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="italic text-zinc-600 dark:text-zinc-400">Master of Science in Computer Science</p>
                <span className="text-zinc-500 text-xs">GPA: 4.0</span>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-1">Technical Skills</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-2 text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">Languages</span>
                <span>Python, C++, TypeScript, SQL, JavaScript, C</span>
                
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">Frontend/Backend</span>
                <span>Next.js, React, Node.js, Flask, Tailwind CSS, PostgreSQL, Firebase</span>
                
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">AI & Tools</span>
                <span>PyTorch, TensorFlow, Docker, AWS (S3, Lambda, SageMaker), Git, Linux</span>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-1">Professional Experience</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Software Research Engineer (Federated Learning)</h4>
                  <span className="text-zinc-500 text-xs">Jan 2026 - Present</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-wide mb-2">CSULB Research Foundation</p>
                <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-700 dark:text-zinc-300 marker:text-zinc-400">
                  <li>Architecting <strong>SwiftBot</strong>, a distributed microservices platform orchestrating robot tasks using Docker & LLM agents.</li>
                  <li>Reduced system cold-start latency by 95% (to 120ms) via warm-container orchestration strategies.</li>
                  <li>Developing a custom DHT (Distributed Hash Table) overlay in Python for resilient service discovery.</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Machine Learning Engineer Intern</h4>
                  <span className="text-zinc-500 text-xs">Dec 2024 - May 2025</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-wide mb-2">National Park Service</p>
                <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-700 dark:text-zinc-300 marker:text-zinc-400">
                  <li>Engineered a scalable AWS ETL pipeline (S3, Lambda) to ingest and process a 90 GB aerial imagery dataset.</li>
                  <li>Deployed an EfficientDet object detection model into production using SageMaker for real-time environmental monitoring.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Undergraduate Research Engineer</h4>
                  <span className="text-zinc-500 text-xs">May 2024 - May 2025</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-wide mb-2">CSULB</p>
                <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-700 dark:text-zinc-300 marker:text-zinc-400">
                  <li>Built a lightweight Federated Learning platform (HumanSys '25) optimized for resource-constrained IoT devices.</li>
                  <li>Designed workload prediction algorithms using SQL for historical performance data analysis.</li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
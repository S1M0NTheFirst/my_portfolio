import React from 'react';

export const AboutApp = () => (
  <div className="p-8 h-full bg-white dark:bg-zinc-900 overflow-y-auto text-zinc-800 dark:text-zinc-200">
    <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-zinc-200 dark:border-zinc-700">About Me</h2>
    
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <div className="mb-4">
          <p className="font-medium">Master of Science in Computer Science</p>
          <p className="text-sm text-zinc-500">California State University, Long Beach | Jan 2026 - Dec 2027</p>
        </div>
        <div>
          <p className="font-medium">Bachelor of Science in Computer Science</p>
          <p className="text-sm text-zinc-500">California State University, Long Beach | Aug 2022 - May 2025</p>
          <p className="text-sm font-mono mt-1">GPA: 3.7</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Languages:</strong> Python, TypeScript, JavaScript, C++, C, SQL, HTML/CSS</li>
          <li><strong>Frontend/Backend:</strong> React.js, Next.js, Node.js, Flask, Express.js, Tailwind CSS</li>
          <li><strong>Databases:</strong> PostgreSQL (Supabase), Firebase, MongoDB, SQL</li>
          <li><strong>DevOps & Tools:</strong> Docker, AWS (SageMaker, Lambda, S3), Git, Linux, CI/CD</li>
          <li><strong>Machine Learning:</strong> PyTorch, TensorFlow, OpenCV, LLMs, AI Agents</li>
        </ul>
      </section>
    </div>
  </div>
);

export const ProjectsApp = () => (
  <div className="p-8 h-full bg-white dark:bg-zinc-900 overflow-y-auto text-zinc-800 dark:text-zinc-200">
    <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-zinc-200 dark:border-zinc-700">Projects</h2>
    
    <div className="space-y-8">
      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-bold">Lingo AI: Full Stack Language Application</h3>
        <p className="text-xs font-mono text-zinc-500 mb-2">TypeScript, Next.js, Firebase, OpenAI | June 2024 - Aug 2024</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Collaborated in an engineering team to build a responsive web application using React/Next.js and Tailwind CSS for real-time language tutoring.</li>
          <li>Implemented Firebase for real-time database management and authentication, securing user session history and chat logs.</li>
          <li>Utilized Git for version control and code reviews, ensuring smooth integration of frontend components with backend API services.</li>
        </ul>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-bold">NestDetector: Cloud-Native Vision System</h3>
        <p className="text-xs font-mono text-zinc-500 mb-2">Python, AWS, PyTorch | Jan 2025 - May 2025</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Designed a cloud-native vision system capable of processing large-scale datasets, leveraging AWS Lambda for serverless event triggers.</li>
          <li>Implemented automated data validation and preprocessing scripts to ensure high-quality input for model training pipelines.</li>
        </ul>
      </div>
      
       <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-bold">SwiftBot (Research)</h3>
        <p className="text-xs font-mono text-zinc-500 mb-2">Docker, Microservices, LLM Agents | Jan 2026 - Present</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Architecting a distributed microservices platform that orchestrates robot tasks using Docker containers and LLM agents.</li>
          <li>Reduced system cold-start latency by 95% (to 120ms) by implementing a warm-container orchestration strategy.</li>
        </ul>
      </div>
    </div>
  </div>
);

export const ContactApp = () => (
  <div className="p-8 h-full bg-white dark:bg-zinc-900 overflow-y-auto text-zinc-800 dark:text-zinc-200 flex flex-col items-center justify-center text-center">
    <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
    
    <div className="space-y-6 max-w-md w-full">
      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center gap-4">
        <div className="p-3 bg-blue-500 rounded-full text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <div className="text-left">
          <p className="text-xs uppercase text-zinc-500 font-bold">Email</p>
          <a href="mailto:bhuoond6@gmail.com" className="hover:text-blue-500 transition-colors">bhuoond6@gmail.com</a>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center gap-4">
        <div className="p-3 bg-blue-500 rounded-full text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        </div>
        <div className="text-left">
          <p className="text-xs uppercase text-zinc-500 font-bold">Phone</p>
          <p>657-642-7779</p>
        </div>
      </div>

       <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center gap-4">
        <div className="p-3 bg-blue-500 rounded-full text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <div className="text-left">
          <p className="text-xs uppercase text-zinc-500 font-bold">LinkedIn</p>
          <a href="https://linkedin.com/in/simon-zhang-b83580315" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">simon-zhang-b83580315</a>
        </div>
      </div>
    </div>
  </div>
);
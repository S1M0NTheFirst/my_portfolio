import React, { useState } from 'react';
import { motion, AnimatePresence, useTime, useTransform } from 'framer-motion';
import { 
  siPython, siTypescript, siJavascript, siCplusplus, siPostgresql, 
  siFirebase, siMongodb, siRedis, siReact, siNextdotjs, siNodedotjs, 
  siFlask, siTailwindcss, siDocker, 
  siGit, siLinux, siPytorch, siTensorflow, siOpencv,
  siKubernetes, siSupabase, siHtml5, siCss, siScikitlearn
} from 'simple-icons/icons';
import { 
  Code, Layout, Database, Server, Brain, ChevronDown, Terminal, Cpu, Cloud 
} from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';

// --- Configuration & Data ---

const SKILL_DATA: Record<string, any[]> = {
  "Languages": [
    { name: 'Python', icon: siPython, color: '#3776AB' },
    { name: 'TypeScript', icon: siTypescript, color: '#3178C6' },
    { name: 'C++', icon: siCplusplus, color: '#00599C' },
    { name: 'Java', icon: Code, color: '#f89820' },
    { name: 'SQL', icon: Database, color: '#336791' },
    { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E' },
  ],
  "Full Stack": [
    { name: 'React', icon: siReact, color: '#61DAFB' },
    { name: 'Next.js', icon: siNextdotjs, color: '#000000' },
    { name: 'Node.js', icon: siNodedotjs, color: '#339933' },
    { name: 'Flask', icon: siFlask, color: '#000000' },
    { name: 'Tailwind', icon: siTailwindcss, color: '#06B6D4' },
    { name: 'HTML/CSS', icon: siHtml5, color: '#E34F26' },
  ],
  "Databases": [
    { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
    { name: 'Firebase', icon: siFirebase, color: '#FFCA28' },
    { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
    { name: 'Redis', icon: siRedis, color: '#DC382D' },
    { name: 'Supabase', icon: siSupabase, color: '#3FCF8E' },
  ],
  "DevOps": [
    { name: 'Docker', icon: siDocker, color: '#2496ED' },
    { name: 'AWS', icon: Cloud, color: '#FF9900' },
    { name: 'Git', icon: siGit, color: '#F05032' },
    { name: 'Linux', icon: siLinux, color: '#FCC624' },
    { name: 'CI/CD', icon: Terminal, color: '#4CAF50' },
    { name: 'Kubernetes', icon: siKubernetes, color: '#326CE5' },
  ],
  "Machine Learning": [
    { name: 'PyTorch', icon: siPytorch, color: '#EE4C2C' },
    { name: 'TensorFlow', icon: siTensorflow, color: '#FF6F00' },
    { name: 'OpenCV', icon: siOpencv, color: '#5C3EE8' },
    { name: 'LLMs', icon: Brain, color: '#8E24AA' },
    { name: 'Scikit-Learn', icon: siScikitlearn, color: '#F7931E' },
  ]
};

const CATEGORY_CONFIG: Record<string, { icon: any, color: string }> = {
  "Languages": { icon: Code, color: '#22d3ee' },
  "Full Stack": { icon: Layout, color: '#818cf8' },
  "Databases": { icon: Database, color: '#f472b6' },
  "DevOps": { icon: Server, color: '#34d399' },
  "Machine Learning": { icon: Brain, color: '#fbbf24' },
};

// --- Helper Functions ---

const getPosition = (index: number, total: number, radius: number) => {
  const angle = (index / total) * 360 - 90; // Start at -90deg (top)
  const rad = (angle * Math.PI) / 180;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad)
  };
};

// --- Components ---

const OrbitNode = ({ 
  x, y, item, onClick, isActive, isSkill, delay, highlightedSkill, counterRotate 
}: { 
  x: number, y: number, item: any, onClick?: () => void, isActive?: boolean, isSkill?: boolean, delay?: number, highlightedSkill?: string | null, counterRotate: any 
}) => {
  
  const isHighlighted = highlightedSkill?.toLowerCase() === item.name?.toLowerCase();
  
  const renderIcon = () => {
    const iconClass = isSkill ? "w-5 h-5" : "w-6 h-6";
    const color = isActive || isSkill || isHighlighted ? (item.color || '#22d3ee') : '#94a3b8';

    if (item.icon?.path) {
      return (
        <svg role="img" viewBox="0 0 24 24" className={`${iconClass} fill-current transition-colors duration-300 group-hover:text-white`} style={{ color }}>
          <path d={item.icon.path} />
        </svg>
      );
    }
    const IconComp = item.icon || Terminal;
    return <IconComp className={`${iconClass} transition-colors duration-300 group-hover:text-white`} style={{ color }} />;
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`, 
        marginLeft: -24, 
        marginTop: -24,
        rotate: counterRotate // Apply inverse rotation to keep upright
      }}
      className="absolute flex flex-col items-center justify-center cursor-pointer group z-50 pointer-events-auto"
      onClick={(e) => { e.stopPropagation(); onClick && onClick?.(); }}
    >
      <div className={`
        relative rounded-full bg-[#11111e]/90 backdrop-blur-md border transition-all duration-300 flex items-center justify-center shadow-lg
        ${isSkill ? 'w-12 h-12 border-slate-700/50 hover:border-cyan-400/50' : 'w-16 h-16 border-slate-600/50 hover:border-cyan-400/80'}
        ${isActive ? '!border-cyan-400 !bg-[#11111e] ring-2 ring-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : ''}
        ${isHighlighted ? '!border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''}
      `}>
        {renderIcon()}
      </div>

      <motion.span 
        className={`
          absolute top-full mt-2 text-[10px] font-bold tracking-wider uppercase bg-[#0B0B15]/90 text-slate-400 px-2 py-1 rounded-full border border-slate-800 shadow-md backdrop-blur-sm whitespace-nowrap z-50 pointer-events-none
          ${isActive || isHighlighted ? 'text-cyan-300 border-cyan-400/30 opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        {item.name || item.label}
      </motion.span>
    </motion.div>
  );
};

export const AboutApp = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { highlightedSkill } = useWindowStore();

  // --- Animation Sync Logic ---
  const time = useTime();
  // Rotate 360 degrees every 60 seconds (60000ms)
  const rotate = useTransform(time, [0, 60000], [0, 360], { clamp: false });
  const rotateReverse = useTransform(rotate, (r) => -r);

  // --- Layout Calculation ---
  
  // Ring 1: Categories (Radius 160)
  const categoryKeys = Object.keys(SKILL_DATA);
  const categoryNodes = categoryKeys.map((key, i) => ({
    id: key,
    label: key,
    ...CATEGORY_CONFIG[key],
    pos: getPosition(i, categoryKeys.length, 160)
  }));

  // Ring 2: Skills (Radius 300) - Only populated if activeCategory is set
  const activeSkills = activeCategory ? SKILL_DATA[activeCategory] : [];
  const skillNodes = activeSkills.map((skill, i) => ({
    ...skill,
    pos: getPosition(i, activeSkills.length, 300)
  }));

  // Helper to find position of currently active category node for drawing lines
  const activeCategoryNode = categoryNodes.find(n => n.id === activeCategory);

  return (
    <div className="h-full w-full overflow-y-auto bg-[#0B0B15] text-white scrollbar-hide scroll-smooth">
      
      {/* Background HUD Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0B15] to-black opacity-80" />
          <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      {/* Section 1: Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center p-8 lg:p-20 z-10">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mx-auto">
              
              {/* Left Column: Profile Picture (5 cols) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                  <div className="relative group">
                      {/* Ambient Glow behind image */}
                      <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full -z-10 scale-75 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <img 
                          src="/images/IMG_7367.JPG" 
                          alt="Simon" 
                          className="w-64 h-64 lg:w-80 lg:h-80 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white/10 transition-transform duration-500 group-hover:scale-[1.02] relative z-10"
                      />
                      
                      {/* Decorative accents */}
                      <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-[2.5rem] -z-0" />
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-[2.5rem] -z-0" />
                  </div>
              </div>

              {/* Right Column: Info Stack (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-8 text-left">
                  <div className="space-y-3">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Available for Research & Engineering
                    </motion.div>
                    <h1 className="text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-400">Simon.</span>
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-400 font-medium tracking-wide">
                        Architecting <span className="text-white">Decentralized Intelligence</span> & Scalable Systems
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-5">
                      {/* Box 1: Research Focus */}
                      <div className="group bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                          <div className="flex items-center gap-4 mb-3">
                              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                                  <Brain size={22} />
                              </div>
                              <h3 className="text-xl font-bold text-white">Research Focus</h3>
                          </div>
                          <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                              Pioneering work in <span className="text-cyan-300 font-medium">Federated Learning</span> and <span className="text-cyan-300 font-medium">Multi-Robot Collaboration</span>. I design decentralized algorithms (DHT) that enable edge devices to learn and adapt in real-time without compromising data privacy.
                          </p>
                      </div>

                      {/* Box 2: Full Stack Engineering */}
                      <div className="group bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
                          <div className="flex items-center gap-4 mb-3">
                              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                                  <Code size={22} />
                              </div>
                              <h3 className="text-xl font-bold text-white">Full Stack Engineering</h3>
                          </div>
                          <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                              Translating complex models into production-ready applications. I build <span className="text-indigo-300 font-medium">Cloud-Native</span> architectures using <span className="text-indigo-300 font-medium">Docker</span>, <span className="text-indigo-300 font-medium">React</span>, and <span className="text-indigo-300 font-medium">Node.js</span> to create seamless, low-latency interfaces for next-gen AI tools.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 pointer-events-none hidden lg:block">
              <ChevronDown className="w-6 h-6 text-cyan-400" />
          </div>
      </section>

      {/* Section 2: Galaxy Section */}
      <section className="min-h-[120vh] w-full relative flex flex-col items-center justify-center overflow-hidden py-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0f0f1a] to-[#000000]">
          
          {/* Distant Stars Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '100px 100px', backgroundPosition: '20px 20px' }} />

          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20 mb-16 text-center"
          >
              <h2 className="text-4xl font-bold text-white tracking-[0.3em] uppercase mb-4">
                  Technical Expertise
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <p className="mt-6 text-cyan-400/60 text-sm tracking-widest uppercase font-light">
                  Interactive Skill Mapping System
              </p>
          </motion.div>

          <div className="relative w-[800px] h-[800px] flex items-center justify-center">
              
              {/* --- STATIC BACKGROUND RINGS (Guides) --- */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <g transform="translate(400, 400)">
                          {/* Inner Ring Guide (CORE SKILLS) */}
                          <circle 
                            r="160" 
                            fill="none" 
                            stroke="#06b6d4" 
                            strokeWidth="3" 
                            className="opacity-80" 
                            strokeDasharray="6 6" 
                            style={{ filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.8))' }}
                          />
                          {/* Outer Ring Guide (SPECIALIZED TECH) */}
                          <circle 
                            r="300" 
                            fill="none" 
                            stroke="#06b6d4" 
                            strokeWidth="2" 
                            className="opacity-40" 
                            strokeDasharray="10 10" 
                            style={{ filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.5))' }}
                          />
                      </g>
                  </svg>
                  
                  {/* Orbit Labels */}
                  <div className="absolute top-[220px] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <span className="text-[10px] font-bold tracking-[0.5em] text-cyan-300 uppercase opacity-60">CORE SKILLS</span>
                  </div>
                  <div className="absolute top-[85px] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <span className="text-[10px] font-bold tracking-[0.5em] text-blue-400 uppercase opacity-40">SPECIALIZED TECH</span>
                  </div>
              </div>

              {/* --- ROTATING UNIVERSE CONTAINER --- */}
              <motion.div 
                className="absolute inset-0 w-full h-full flex items-center justify-center"
                style={{ rotate }} // The entire container spins
              >
                  {/* --- SVG CONNECTOR LINES --- */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
                      <g transform="translate(400, 400)">
                          {categoryNodes.map((node) => (
                              <line 
                                  key={`line-c-${node.id}`} 
                                  x1="0" y1="0" 
                                  x2={node.pos.x} y2={node.pos.y} 
                                  stroke={activeCategory === node.id ? node.color : 'white'} 
                                  strokeWidth="1.5"
                                  className={`transition-all duration-300 ${activeCategory === node.id ? 'opacity-60' : 'opacity-10'}`}
                              />
                          ))}
                          <AnimatePresence>
                              {activeCategory && activeCategoryNode && skillNodes.map(skill => (
                                  <motion.line 
                                      key={`line-s-${skill.name}`}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 0.4 }}
                                      exit={{ opacity: 0 }}
                                      x1={activeCategoryNode.pos.x} y1={activeCategoryNode.pos.y}
                                      x2={skill.pos.x} y2={skill.pos.y}
                                      stroke={activeCategoryNode.color}
                                      strokeWidth="1"
                                  />
                              ))}
                          </AnimatePresence>
                      </g>
                  </svg>

                  {/* --- RING 1 NODES --- */}
                  {categoryNodes.map((node, i) => (
                      <OrbitNode 
                          key={node.id}
                          item={node}
                          x={node.pos.x}
                          y={node.pos.y}
                          isActive={activeCategory === node.id}
                          onClick={() => setActiveCategory(activeCategory === node.id ? null : node.id)}
                          delay={i * 0.05}
                          highlightedSkill={highlightedSkill}
                          counterRotate={rotateReverse} 
                      />
                  ))}

                  {/* --- RING 2 NODES --- */}
                  <AnimatePresence>
                      {activeCategory && skillNodes.map((node, i) => (
                          <OrbitNode 
                              key={node.name}
                              item={node}
                              x={node.pos.x}
                              y={node.pos.y}
                              isSkill={true}
                              delay={i * 0.03}
                              highlightedSkill={highlightedSkill}
                              counterRotate={rotateReverse}
                          />
                      ))}
                  </AnimatePresence>

                  {/* --- CENTER CORE NODE (Spins with orbit but stays upright) --- */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-50">
                    <motion.div 
                        style={{ rotate: rotateReverse }} // Counter-rotate to stay upright
                        className="w-32 h-32 flex items-center justify-center pointer-events-auto cursor-pointer"
                        onClick={() => setActiveCategory(null)}
                    >
                        <Cpu className="w-full h-full text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]" strokeWidth={1} />
                    </motion.div>
                  </div>
              </motion.div>

              {/* Instructions */}
              <div className="absolute top-[95%] text-center opacity-40 pointer-events-none">
                  <p className="text-xs tracking-[0.2em] text-cyan-400 uppercase">
                      {activeCategory ? "System Expanded" : "Select a Domain"}
                  </p>
              </div>

          </div>
      </section>

      {/* OS Decor */}
      <div className="fixed bottom-6 right-6 text-cyan-400/20 text-[10px] tracking-[0.3em] uppercase opacity-40 pointer-events-none z-0">
          Deep Space Neural Network
      </div>
    </div>
  );
};
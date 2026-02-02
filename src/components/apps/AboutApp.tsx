import React from 'react';
import { motion } from 'framer-motion';
import { 
  siPython, 
  siDocker, 
  siNextdotjs, 
  siTypescript, 
  siTailwindcss, 
  siFirebase,
} from 'simple-icons/icons';

const skills = [
  { icon: siPython, name: 'Python', color: '#3776AB' },
  { icon: siDocker, name: 'Docker', color: '#2496ED' },
  { icon: siNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: siTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: siTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: siFirebase, name: 'Firebase', color: '#FFCA28' },
];

export const AboutApp = () => {
  const radius = 140; // Final distance from center
  const center = { x: 200, y: 200 }; // Center of the canvas (400x400 viewbox equivalent)

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-900 overflow-hidden relative">
      {/* Background Starfield Effect (Subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-50" />

      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        
        {/* Connecting Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {skills.map((_, index) => {
            const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2; // Start from top
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            
            return (
              <motion.line
                key={`line-${index}`}
                x1={center.x}
                y1={center.y}
                x2={x} // These will be the final positions; line will animate drawing out
                y2={y}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* Central Avatar */}
        <motion.div
          className="relative z-20 w-24 h-24 rounded-full bg-zinc-100 border-4 border-white/10 shadow-2xl overflow-hidden flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Simon" 
            alt="Avatar" 
            className="w-full h-full object-cover bg-zinc-800"
          />
        </motion.div>

        {/* Orbiting Skill Nodes */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
          // Final positions
          const finalX = center.x + radius * Math.cos(angle); 
          const finalY = center.y + radius * Math.sin(angle);
          
          return (
            <motion.div
              key={skill.name}
              className="absolute z-10 w-12 h-12 -ml-6 -mt-6 rounded-full bg-zinc-800 border border-zinc-700 shadow-lg flex items-center justify-center group cursor-pointer"
              // Animate from center (200px) to final position (finalX/Y)
              initial={{ left: center.x, top: center.y, opacity: 0, scale: 0 }}
              animate={{ left: finalX, top: finalY, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.2 + index * 0.1, 
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ scale: 1.2, zIndex: 30 }}
            >
              <svg 
                role="img" 
                viewBox="0 0 24 24" 
                className="w-6 h-6 fill-current text-zinc-400 group-hover:text-white transition-colors"
                style={{ fill: skill.color }}
              >
                 <path d={skill.icon.path} />
              </svg>
              
              {/* Tooltip */}
              <div className="absolute top-full mt-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.name}
              </div>
            </motion.div>
          );
        })}

      </div>
      
      <div className="absolute bottom-6 text-zinc-500 text-xs tracking-widest uppercase">
        Constellation Mode
      </div>
    </div>
  );
};
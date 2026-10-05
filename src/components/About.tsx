/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Code, Brain, Cloud, Database, Sparkles, MapPin, Target, Eye } from 'lucide-react';
import { personalInfo, educationList } from '../data';

const coreFocusAreas = [
  { 
    name: 'Data Structures & Algorithms', 
    icon: Code, 
    desc: 'Deep interest in computational efficiency, graph systems, and indexing optimization.', 
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' 
  },
  { 
    name: 'Machine Learning Pipelines', 
    icon: Brain, 
    desc: 'Training gradient-boosted trees (LightGBM), hyperparameter sweeps, and handling imbalanced arrays.', 
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' 
  },
  { 
    name: 'Distributed Cloud Systems', 
    icon: Cloud, 
    desc: 'Containerizing prediction pipelines with Docker and testing scalability across cloud servers.', 
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' 
  },
  { 
    name: 'Relational query optimization', 
    icon: Database, 
    desc: 'Exploring structured databases, index trees, schema integrity constraints, and query parsing.', 
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <section id="about" className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            01 . BACKGROUND & PHILOSOPHY
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Engineering pragmatic, data-driven systems.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block: Narrative Background (col-span-7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-base font-bold text-zinc-300 uppercase tracking-wider font-mono flex items-center space-x-2">
                <Target className="h-4.5 w-4.5 text-blue-400" />
                <span>My Philosophy & Mission</span>
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                I believe software engineering is more than just writing syntax — it's about structuring data, managing latency, and scaling computational capacity. Whether I'm tackling extreme class imbalance in transactions or optimizing custom binary relational parsers in C++, I focus intensely on algorithmic accuracy and runtime resources.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Currently, I'm pursuing my <strong>B.Tech in Computer Science</strong> with a specialization in Cloud Computing and Machine Learning. By building projects in high-availability environments and leading technical teams, my goal is to bridge the gap between machine intelligence pipelines and robust backend infrastructure.
              </p>
            </motion.div>

            {/* Structured focus highlights */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-550 text-zinc-500">
                Core Domains of Execution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreFocusAreas.map((interest, idx) => {
                  const Icon = interest.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center space-x-3 mb-2.5">
                        <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${interest.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="text-xs font-bold font-mono tracking-tight text-zinc-200">{interest.name}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">{interest.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Block: Pure Education Bento Panel (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 15 }}
            className="lg:col-span-5 text-left"
          >
            <div className="p-6 md:p-8 rounded-2xl border border-zinc-805 border-zinc-800/85 bg-[#09090b]/80 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-base font-bold text-zinc-100 flex items-center space-x-2.5 border-b border-zinc-800/80 pb-4">
                  <GraduationCap className="h-5 w-5 text-blue-400" />
                  <span className="font-mono tracking-tight uppercase text-xs">ACADEMIC TIMELINE</span>
                </h3>

                <div className="relative border-l border-zinc-800 pl-4 space-y-6 ml-2">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="relative">
                      {/* Active timeline circle node */}
                      <span className="absolute -left-[21px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-blue-500 ring-4 ring-[#09090b]" />
                      
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-wider font-semibold text-zinc-500">
                          <span>{edu.duration}</span>
                          <span className="flex items-center space-x-1 font-mono text-zinc-500">
                            <MapPin className="h-3 w-3" />
                            <span>{edu.location}</span>
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-extrabold text-zinc-100 leading-tight">
                          {edu.institution}
                        </h4>
                        
                        <p className="text-xs text-zinc-400 font-medium">
                          {edu.degree}
                        </p>
                        
                        {edu.description && (
                          <p className="text-[11px] text-zinc-500 leading-relaxed pt-1 font-normal">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified academic note */}
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <div className="text-[9px] font-mono tracking-wider uppercase text-zinc-550 text-zinc-550 text-zinc-505 text-zinc-500 flex items-center"><Eye className="h-3 w-3 mr-1 text-blue-400" />VERIFIED STANDARDS</div>
                <div className="text-[11px] text-zinc-400 leading-normal">
                  CS Specialization in Cloud Computing & Machine Learning. Confirmed PCM & high-school graduate.
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

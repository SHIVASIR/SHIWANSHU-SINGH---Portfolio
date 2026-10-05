/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { experienceList } from '../data';

export default function Experience() {
  const [selectedId, setSelectedId] = useState(experienceList[0].id);

  const selectedExp = experienceList.find((exp) => exp.id === selectedId) || experienceList[0];

  return (
    <section id="experience" className="py-24 bg-[#030303] text-zinc-100 relative z-25 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            02 . RELEVANT EXPERIENCE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Internship history & active engineering roles.
          </motion.h2>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Selector on the Left (col-span-4) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2.5 lg:pb-0 space-x-2 lg:space-x-0 lg:space-y-1.5 scrollbar-hide border-b border-zinc-800 lg:border-b-0 lg:border-l lg:border-zinc-800">
            {experienceList.map((exp) => {
              const isSelected = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg text-left transition-all shrink-0 relative ${
                    isSelected
                      ? 'text-blue-400 bg-zinc-900 border border-zinc-805 border-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 border border-transparent'
                  }`}
                >
                  {/* Left desktop status line */}
                  {isSelected && (
                    <motion.div
                      layoutId="experienceTabIndicator"
                      className="hidden lg:block absolute left-[-1px] top-1 bottom-1 w-[3px] bg-blue-505 bg-blue-500 rounded-full"
                    />
                  )}
                  <div className="font-bold tracking-tight font-mono">{exp.role}</div>
                  <div className="text-[11px] font-normal text-zinc-500 mt-1">{exp.company}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Panel (col-span-8) */}
          <div className="lg:col-span-8 min-h-[320px] text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 rounded-2xl border border-zinc-805 border-zinc-850 border-zinc-800 bg-[#09090b]/45 shadow-2xl relative"
              >
                {/* Panel Header */}
                <div className="space-y-3 pb-5 border-b border-zinc-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-left">
                    <h3 className="text-lg md:text-xl font-extrabold text-white">
                      {selectedExp.role}{' '}
                      <span className="text-blue-400">@ {selectedExp.company}</span>
                    </h3>
                    
                    <span className="inline-flex items-center space-x-1 px-3 py-1 text-xs font-mono font-medium rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300 shrink-0">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                      <span>{selectedExp.duration}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center space-x-4 text-xs font-semibold font-mono text-zinc-500">
                    <span className="inline-flex items-center space-x-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-505 text-zinc-500" />
                      <span>{selectedExp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Job Description Points */}
                <div className="py-4">
                  <ul className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {selectedExp.points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3 text-left">
                        <ChevronRight className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{
                          __html: point
                            .replace(/(Credit Card Fraud Detection System)/g, '<strong>$1</strong>')
                            .replace(/(LightGBM)/g, '<strong>$1</strong>')
                            .replace(/(end-to-end ML pipeline)/g, '<strong>$1</strong>')
                            .replace(/(Python, Pandas, NumPy, Scikit-learn)/g, '<strong>$1</strong>')
                            .replace(/(Awishkari Syndicate)/g, '<strong>$1</strong>')
                            .replace(/(Smart India Hackathon 2025)/g, '<strong>$1</strong>')
                            .replace(/(multidose team|multidisciplinary team)/g, '<strong>$1</strong>')
                            .replace(/(system architecture)/g, '<strong>$1</strong>')
                            .replace(/(Google Developer Groups \(GDG\))/g, '<strong>$1</strong>')
                        }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Utilized Tools / Technologies */}
                <div className="border-t border-zinc-800/85 pt-5 space-y-2.5">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#858585] text-zinc-500 flex items-center">
                    <Sparkles className="h-3.5 w-3.5 text-blue-400 mr-1.5" />
                    Stack Driven Execution
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-805 border-zinc-800/80 text-zinc-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

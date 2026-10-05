/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Trophy, Users, BookOpen, Star, Sparkles } from 'lucide-react';
import { achievements } from '../data';

const achievementIcons: { [key: string]: any } = {
  'ach-1': Users,
  'ach-2': Trophy,
  'ach-3': Sparkles
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            05 . RECOGNITION HIGHLIGHTS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Selected SDE honors & accomplishments.
          </motion.h2>
        </div>

        {/* Bento Grid Design Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach) => {
            const IconComponent = achievementIcons[ach.id] || Award;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-150px' }}
                transition={{ type: 'spring', stiffness: 95, damping: 14 }}
                key={ach.id}
                className={`p-6 rounded-2xl border bg-[#09090b]/55 flex flex-col justify-between hover:border-zinc-700 hover:shadow-2xl transition-all text-left ${
                  ach.highlight
                    ? 'border-blue-900 shadow-xl ring-1 ring-blue-950/20'
                    : 'border-zinc-805 border-zinc-800'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${
                      ach.highlight
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold tracking-wider">{ach.date}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 leading-none">
                      {ach.issuer}
                    </span>
                    <h4 className="text-base font-extrabold text-[#fff] dark:text-white leading-tight">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1 select-text font-normal">
                      {ach.description}
                    </p>
                  </div>
                </div>

                {/* Verified footer badge context */}
                <div className="border-t border-zinc-800 pt-3 mt-6 flex items-center justify-between text-[10px] text-zinc-505 text-zinc-500 uppercase font-bold font-mono">
                  <span>Verified milestone</span>
                  {ach.highlight && (
                    <span className="text-blue-400 lowercase tracking-wider flex items-center">
                      <Star className="h-2.5 w-2.5 mr-0.5 fill-current text-blue-400" />
                      featured
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

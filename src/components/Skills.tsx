/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Brain, 
  Cloud, 
  Database, 
  Cpu, 
  Grid, 
  Sparkles, 
  BarChart2, 
  Compass, 
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { skillCategories } from '../data';

const categoryIcons: { [key: string]: any } = {
  lang: Terminal,
  mlds: Brain,
  cloud: Cloud,
  db: Database,
  tools: Cpu
};

// Summary radar overview data calculated from core domains
const radarSpectrumData = [
  { domain: 'Programming', score: 90, fullMark: 100, count: '5 Languages' },
  { domain: 'Machine Learning', score: 92, fullMark: 100, count: '7 Algorithms & Frameworks' },
  { domain: 'Cloud & DevOps', score: 82, fullMark: 100, count: '5 Cloud Platforms' },
  { domain: 'Databases & Web', score: 85, fullMark: 100, count: '4 Storage Techs' },
  { domain: 'Tools & Workflows', score: 88, fullMark: 100, count: '5 Tools' },
  { domain: 'Data Engineering', score: 89, fullMark: 100, count: 'Pandas / NumPy / ML' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayMode, setDisplayMode] = useState<'both' | 'radar' | 'bars'>('both');

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.id === activeCategory);

  // Custom Recharts Radar Tooltip
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#09090b] border border-blue-500/40 p-3 rounded-xl shadow-2xl backdrop-blur-md text-left text-xs font-mono">
          <div className="font-bold text-white flex items-center space-x-1.5 mb-1">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span>{data.domain}</span>
          </div>
          <div className="text-blue-400 font-extrabold text-sm">
            Proficiency: {data.score}%
          </div>
          <div className="text-[10px] text-zinc-400 mt-1">
            {data.count}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="skills" className="py-24 bg-[#030303] text-zinc-100 relative z-25 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
            >
              03 . VISUAL PROFICIENCY SPECTRUM
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Engineering Skills & Mastery Levels
            </motion.h2>
          </div>

          {/* Display Mode Toggle Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0 flex items-center justify-center space-x-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl"
          >
            <button
              id="skill-mode-both"
              onClick={() => setDisplayMode('both')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                displayMode === 'both'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Full View</span>
            </button>
            <button
              id="skill-mode-radar"
              onClick={() => setDisplayMode('radar')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                displayMode === 'radar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Radar Spectrum</span>
            </button>
            <button
              id="skill-mode-bars"
              onClick={() => setDisplayMode('bars')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                displayMode === 'bars'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              <span>Skill Bars</span>
            </button>
          </motion.div>
        </div>

        {/* RADAR CHART OVERVIEW PANEL */}
        {(displayMode === 'both' || displayMode === 'radar') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-[#09090b]/80 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Radar Chart Display */}
              <div className="lg:col-span-7 h-[340px] sm:h-[380px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSpectrumData}>
                    <PolarGrid stroke="#27272a" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                      dataKey="domain" 
                      tick={{ fill: '#a1a1aa', fontSize: 12, fontFamily: 'monospace' }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: '#52525b', fontSize: 10 }}
                      stroke="#27272a"
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      fill="#3b82f6"
                      fillOpacity={0.35}
                      isAnimationActive={true}
                    />
                    <Tooltip content={<CustomRadarTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Metrics Overview Side Panel */}
              <div className="lg:col-span-5 text-left space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-blue-400 font-bold mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>DOMAIN BALANCE MATRIX</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Technical Capabilities Radar
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Quantified proficiency distribution across modern Machine Learning pipelines, distributed cloud systems, algorithmic problem solving, and backend database engineering.
                  </p>
                </div>

                {/* Domain Quick Metric Pills */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Avg Proficiency</div>
                    <div className="text-xl font-mono font-bold text-blue-400 mt-0.5">87.5%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Primary Focus</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 mt-1">ML & Cloud</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Top Language</div>
                    <div className="text-sm font-mono font-bold text-amber-400 mt-1">Python (92%)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Verified Techs</div>
                    <div className="text-sm font-mono font-bold text-cyan-400 mt-1">26 Technologies</div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Evaluated based on production project deployment and SIH Hackathon benchmarking.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DETAILED PROFICIENCY BARS SECTION */}
        {(displayMode === 'both' || displayMode === 'bars') && (
          <div className="space-y-8">
            {/* Tab Filter Pills */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 border-b border-zinc-800/80">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
                  activeCategory === 'all'
                    ? 'bg-zinc-100 text-black shadow-lg border border-transparent'
                    : 'text-zinc-400 bg-zinc-900/40 border border-zinc-800 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Show All Categories
              </button>
              {skillCategories.map((cat) => {
                const IconComp = categoryIcons[cat.id] || Grid;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg border border-transparent'
                        : 'text-zinc-400 bg-zinc-900/40 border border-zinc-800 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Categories Bento Board Grid with Animated Progress Bars */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((category) => {
                  const IconComponent = categoryIcons[category.id] || Grid;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      key={category.id}
                      className="p-6 rounded-2xl border border-zinc-800 bg-[#09090b]/60 relative hover:border-zinc-700 transition-all group flex flex-col justify-between text-left shadow-lg"
                    >
                      <div className="space-y-6 w-full">
                        {/* Category Title Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <IconComponent className="h-4.5 w-4.5" />
                            </div>
                            <h3 className="font-extrabold text-zinc-100 text-base leading-tight">
                              {category.name}
                            </h3>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                            {category.skills.length} Items
                          </span>
                        </div>

                        {/* Skill List with Animated Progress Bars */}
                        <div className="space-y-4">
                          {category.skills.map((skill) => (
                            <div key={skill.name} className="space-y-1.5">
                              {/* Header: Skill Name, Percentage & Level Badge */}
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-zinc-200 font-medium">{skill.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-blue-400 font-bold">{skill.proficiency}%</span>
                                  <span className="text-zinc-500 text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                                    {skill.level}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Animated Progress Bar */}
                              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-zinc-800/50">
                                <motion.div
                                  initial={{ width: '0%' }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  viewport={{ once: true, margin: '-20px' }}
                                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="border-t border-zinc-800/80 pt-3 mt-6 text-[10px] text-zinc-500 font-mono flex items-center justify-between select-none">
                        <span className="flex items-center">
                          <Sparkles className="h-2.5 w-2.5 text-blue-400 mr-1" />
                          Validated Competency
                        </span>
                        <span>{category.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}


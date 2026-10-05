/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  ShieldAlert, 
  Cloud, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  X, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Cpu, 
  Target, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { projectList } from '../data';
import { Project } from '../types';

const categoryLabels = [
  { id: 'all', name: 'All Architecture' },
  { id: 'ml', name: 'Machine Learning' },
  { id: 'cloud', name: 'Cloud & DevOps' },
  { id: 'fullstack', name: 'Distributed Systems & DB' },
  { id: 'data-science', name: 'Data Systems & Visuals' }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = activeTab === 'all'
    ? projectList
    : projectList.filter((proj) => proj.category === activeTab);

  // Custom mockups for each project
  const renderProjectMockupImage = (id: string) => {
    switch (id) {
      case 'proj-1':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-zinc-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-5 overflow-hidden group-hover:via-slate-850/80 transition-all border-b border-zinc-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-mono font-bold px-2 py-1 bg-red-500/15 border border-red-500/25 text-red-400 uppercase rounded">Anomalies Detected</span>
              <ShieldAlert className="h-4.5 w-4.5 text-red-400 animate-pulse" />
            </div>

            <div className="w-full h-16 flex items-end space-x-1.5 z-10 bg-black/40 p-2.5 rounded border border-zinc-800/80 font-mono">
              <div className="text-[9px] text-zinc-500 absolute top-1.5 left-2">LIGHTGBM CLASSIFIER / ROC-AUC</div>
              <div className="h-6 w-full bg-zinc-800 rounded-sm relative"><span className="absolute bottom-0 inset-x-0 h-1/4 bg-blue-500 rounded-sm" /></div>
              <div className="h-10 w-full bg-zinc-800 rounded-sm relative"><span className="absolute bottom-0 inset-x-0 h-3/4 bg-blue-500 rounded-sm" /></div>
              <div className="h-4 w-full bg-zinc-805 bg-red-500/80 rounded-sm animate-pulse" />
              <div className="h-8 w-full bg-zinc-800 rounded-sm relative"><span className="absolute bottom-0 inset-x-0 h-2/4 bg-blue-500 rounded-sm" /></div>
            </div>
          </div>
        );
      case 'proj-2':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-zinc-950 via-[#111827] to-cyan-950 flex flex-col justify-between p-5 overflow-hidden group-hover:via-[#111827]/80 transition-all border-b border-zinc-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-mono font-bold px-2 py-1 bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 uppercase rounded">Docker Active</span>
              <Cloud className="h-4.5 w-4.5 text-cyan-400 animate-bounce" style={{ animationDuration: '4s' }} />
            </div>

            <div className="w-full h-16 bg-zinc-950/70 border border-zinc-800 p-3 rounded font-mono text-[9px] text-zinc-400 z-10 space-y-1">
              <div className="flex items-center justify-between text-[8px] text-zinc-500">
                <span>API ROUTE: /api/predict</span>
                <span className="text-emerald-400">● 200 OK</span>
              </div>
              <div className="text-zinc-300"># docker run -p 3000:3000 inference-engine</div>
              <div className="text-[8px] text-cyan-400">Loading model weights... Success in 14ms.</div>
            </div>
          </div>
        );
      case 'proj-3':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-zinc-950 via-slate-900 to-amber-950 flex flex-col justify-between p-5 overflow-hidden group-hover:via-slate-850/80 transition-all border-b border-zinc-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-mono font-bold px-2 py-1 bg-amber-500/15 border border-amber-500/25 text-amber-500 uppercase rounded">B-Tree Indices OK</span>
              <Database className="h-4.5 w-4.5 text-amber-500" />
            </div>

            <div className="w-full bg-zinc-950/70 py-2.5 px-3 rounded z-10 border border-zinc-800 font-mono text-[9px] text-zinc-400 flex justify-between items-center space-x-2">
              <div className="space-y-0.5">
                <div className="text-[8px] text-zinc-500">QUERY PARSER ENGINE</div>
                <div className="text-zinc-200">SELECT * FROM users WHERE age &gt;= 21</div>
                <div className="text-emerald-400">Cost: 0.04 (Index Sweep)</div>
              </div>
              <div className="flex flex-col space-y-1 shrink-0 bg-zinc-900 px-1.5 py-1 rounded border border-zinc-800">
                <span className="text-[8px] font-bold text-zinc-400">Tree Nodes</span>
                <span className="h-1 w-4 bg-amber-400 rounded-sm" />
                <span className="h-1 w-6 bg-blue-500 rounded-sm" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 flex flex-col justify-between p-5 overflow-hidden group-hover:via-zinc-850/80 transition-all border-b border-zinc-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-mono font-bold px-2 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 uppercase rounded">SPA Reactive</span>
              <BarChart3 className="h-4.5 w-4.5 text-blue-400" />
            </div>

            <div className="w-full h-16 bg-[#09090b]/80 border border-zinc-800 p-2 rounded z-10 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                <span>Demand Forecast</span>
                <span className="text-cyan-400">+18.5% YoY</span>
              </div>
              <div className="flex items-end space-x-1.5 pb-1">
                <span className="h-3.5 w-full bg-blue-500/40 rounded-sm" />
                <span className="h-5 w-full bg-blue-500/60 rounded-sm" />
                <span className="h-8 w-full bg-blue-500 rounded-sm" />
                <span className="h-6 w-full bg-indigo-500 rounded-sm" />
                <span className="h-10 w-full bg-cyan-400 rounded-sm" />
              </div>
            </div>
          </div>
        );
    }
  };

  const getProblemSolvedText = (id: string) => {
    switch (id) {
      case 'proj-1':
        return "Resolving extreme 99.8% class imbalance in financial logging data where fraud items make up less than 0.2% of entries. Standard models overfit and completely miss anomalous patterns.";
      case 'proj-2':
        return "Achieving robust sub-second API model classifications in production while maintaining development/production parity across Azure and AWS machines.";
      case 'proj-3':
        return "Simulating relational databases compile-free with efficient index structure traversals, without relying on huge memory overhead or external libraries.";
      default:
        return "Translating large-scale analytical Timeseries exports from backend models into clean, responsive web user views that can run cleanly on lower-spec mobile devices.";
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#030303] text-zinc-100 relative z-25 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            04 . SYSTEM SHOWCASES
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Featured projects, engines & pipelines.
          </motion.h2>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 border-b border-zinc-800/80">
          {categoryLabels.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all relative shrink-0 ${
                activeTab === tab.id
                  ? 'text-blue-400 bg-zinc-900 border border-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="projectsTabIndicator"
                  className="absolute bottom-[-1px] left-3 right-3 h-[2px] bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid Display */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                key={proj.id}
                className="flex flex-col h-full rounded-2xl border border-zinc-800 bg-[#09090b]/50 overflow-hidden hover:border-zinc-700 hover:shadow-2xl group transition-all"
              >
                {/* 1. Custom Technical Vector Mockup (Project Image) */}
                {renderProjectMockupImage(proj.id)}

                {/* 2. Core Body Segment */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    
                    {/* Title + Label */}
                    <div className="space-y-1.5 text-left">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 mr-1.5" />
                        PROVEN SDE SOLUTION
                      </div>
                      <h3 className="text-lg font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Overview description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {proj.description}
                    </p>

                    {/* Problem Solved Module */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1 text-left">
                      <div className="text-[9px] font-mono font-bold tracking-wider uppercase text-red-400 flex items-center">
                        Problem Solved
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {getProblemSolvedText(proj.id)}
                      </p>
                    </div>

                    {/* Selected Achievements / System Milestones list */}
                    <div className="space-y-2 text-left">
                      <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-500">
                        IMPLEMENTATION RESOLUTION
                      </div>
                      <ul className="space-y-2.5 pl-1.5 text-xs text-zinc-300 font-normal leading-relaxed">
                        {proj.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-400 font-bold mr-2 text-[11px] font-mono mt-0.5">·</span>
                            <span dangerouslySetInnerHTML={{
                              __html: pt
                                .replace(/(LightGBM)/g, '<strong>$1</strong>')
                                .replace(/(SMOTE| Synthetic Minority Over-sampling Technique)/g, '<strong>$1</strong>')
                                .replace(/(API server)/g, '<strong>$1</strong>')
                                .replace(/(C\+\+|SQL)/g, '<strong>$1</strong>')
                                .replace(/(Docker)/g, '<strong>$1</strong>')
                                .replace(/(React)/g, '<strong>$1</strong>')
                            }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 3. Tech Stack Tags + Code Links & View Details Modal Trigger */}
                  <div className="space-y-4 pt-5 border-t border-zinc-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
                      <div className="flex items-center space-x-4 text-xs font-bold">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 transition-all font-mono"
                          >
                            <Github className="h-4 w-4" />
                            <span>Code</span>
                          </a>
                        )}
                        {proj.liveUrl ? (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 text-zinc-300 hover:text-white transition-all font-mono"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Live Demo</span>
                          </a>
                        ) : null}
                      </div>

                      {/* View Details / Full Case Study Button */}
                      <button
                        id={`view-details-${proj.id}`}
                        onClick={() => setSelectedProject(proj)}
                        className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold font-mono transition-all group/btn"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-400" />
                        <span>View Details</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULL CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#09090b] border border-zinc-800 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col p-6 sm:p-8 text-left scrollbar-thin scrollbar-thumb-zinc-800"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-6 border-b border-zinc-800/80">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      FULL CASE STUDY
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      ID: {selectedProject.id}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  id="close-case-study-modal"
                  onClick={() => setSelectedProject(null)}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  aria-label="Close Case Study"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 space-y-8 text-zinc-300 text-sm leading-relaxed">
                
                {/* Key Metrics Banner Grid if available */}
                {selectedProject.caseStudy?.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                    {selectedProject.caseStudy.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{m.label}</div>
                        <div className="text-lg font-mono font-bold text-blue-400 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 1. Problem Statement */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>01 . Problem Statement</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/30 text-zinc-300 leading-relaxed">
                    {selectedProject.caseStudy?.problemStatement || selectedProject.description}
                  </div>
                </div>

                {/* 2. Detailed Tech Stack Breakdown */}
                {selectedProject.caseStudy?.techStackDetailed && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                      <Cpu className="h-4 w-4" />
                      <span>02 . Tech Stack & Architectural Component Roles</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.caseStudy.techStackDetailed.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                          <span className="text-xs font-mono font-bold text-white bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 inline-block">
                            {item.name}
                          </span>
                          <p className="text-xs text-zinc-400 leading-snug">
                            {item.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Technical Challenges Faced */}
                {selectedProject.caseStudy?.challengesFaced && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      <AlertTriangle className="h-4 w-4" />
                      <span>03 . Engineering Challenges Encountered</span>
                    </div>
                    <ul className="space-y-2.5">
                      {selectedProject.caseStudy.challengesFaced.map((challenge, idx) => (
                        <li key={idx} className="flex items-start space-x-3 p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80">
                          <span className="h-2 w-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Results & Business Impact */}
                {selectedProject.caseStudy?.resultsAndImpact && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      <TrendingUp className="h-4 w-4" />
                      <span>04 . Results & System Impact</span>
                    </div>
                    <ul className="space-y-2.5">
                      {selectedProject.caseStudy.resultsAndImpact.map((res, idx) => (
                        <li key={idx} className="flex items-start space-x-3 p-3 bg-emerald-950/15 rounded-xl border border-emerald-900/30">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-600/20"
                    >
                      <Github className="h-4 w-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live App Demo</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Close Window
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal, Github, Linkedin, Mail, Cloud, Cpu, Server, Trophy, Flame, ChevronRight, CheckCircle, Sparkles, User } from 'lucide-react';
import { personalInfo } from '../data';
import profileImg from '../assets/images/profile_photo_1785702409286.jpg';
import VisitorCounter from './VisitorCounter';
import TerminalWidget from './TerminalWidget';

const TYPING_WORDS = [
  "Software Engineer",
  "Machine Learning Engineer",
  "Cloud Native Developer",
  "Full Stack Problem Solver"
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [heroView, setHeroView] = useState<'terminal' | 'portrait'>('terminal');

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = TYPING_WORDS[wordIdx];
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        setTypingSpeed(80);

        if (typedText === currentWord) {
          setIsDeleting(false);
          // Pause at full word
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        setTypingSpeed(40);

        if (typedText === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-[#030303] text-zinc-100">
      {/* Premium Tech Grid Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />
      
      {/* High-Fidelity Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
          
          {/* Column 1: Core Copywriting Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Status Indicator Pill & Live Visitor Counter */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                <Terminal className="h-3 w-3 text-blue-400" />
                <span>Seeking Internships & SDE Roles</span>
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <VisitorCounter variant="badge" />
            </motion.div>

            {/* Title Display */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Shiwanshu <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Kumar Singh
                </span>
              </h1>
              
              {/* Typing Subtitle */}
              <div className="h-8 flex items-center text-lg sm:text-xl font-medium text-zinc-400">
                <span className="mr-1.5 text-zinc-500 font-mono text-base">&gt;</span>
                <span className="font-mono text-blue-400 font-semibold">{typedText}</span>
                <span className="w-1.5 h-5 bg-blue-400 ml-1 animate-pulse" />
              </div>
            </motion.div>

            {/* Professional Summary Quote */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed space-y-4">
              <span>
                Computer Science major with specialized training in <strong>Cloud Architectures</strong> and <strong>Machine Learning workflows</strong>. Experienced in building high-fidelity detection systems, deploying Docker microservices, and parsing SQL schema queries.
              </span>
              <span className="block mt-3 text-xs text-zinc-500 italic border-l-2 border-zinc-700 pl-3">
                "Focused on creating production-ready systems that solve challenging architectural problems with optimal space-time complexity."
              </span>
            </motion.p>

            {/* Quick Actions Bar */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#projects"
                onClick={(e) => handleScrollToSegment(e, '#projects')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#resume"
                onClick={(e) => handleScrollToSegment(e, '#resume')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <span>ATS Resume Preview</span>
              </a>

              <a
                href="#coding-profiles"
                onClick={(e) => handleScrollToSegment(e, '#coding-profiles')}
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all"
              >
                <span>Live Metrics</span>
              </a>
            </motion.div>

            {/* Quick Social Verification Rails */}
            <motion.div variants={itemVariants} className="flex items-center space-x-3.5 pt-5 border-t border-zinc-900 w-fit">
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-semibold">Verify Credentials:</span>
              <a
                href="https://github.com/SHIVASIR"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:shadow-sm transition-all"
                title="GitHub Real Profile"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/shiwanshukumar-singh"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:shadow-sm transition-all"
                title="LinkedIn Network"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://leetcode.com/u/shiwanshu0711/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:shadow-sm transition-all text-xs font-mono font-bold flex items-center space-x-1"
                title="LeetCode Profile"
              >
                <span className="text-yellow-500 font-extrabold text-sm font-sans">L</span>
                <span>LC</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700 hover:shadow-sm transition-all"
                title="Send Email Direct"
              >
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Column 2: Developer Portrait Photo & Interactive Terminal Widget */}
          <motion.div
            className="lg:col-span-5 relative flex flex-col justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Elegant glowing backdrop aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-transparent rounded-3xl blur-2xl opacity-70 pointer-events-none" />

            {/* View Switcher Controls */}
            <div className="flex items-center space-x-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl mb-4 z-10 shadow-lg font-mono text-xs">
              <button
                id="hero-view-terminal"
                onClick={() => setHeroView('terminal')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  heroView === 'terminal'
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Interactive Terminal</span>
              </button>
              <button
                id="hero-view-portrait"
                onClick={() => setHeroView('portrait')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  heroView === 'portrait'
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Developer Photo</span>
              </button>
            </div>

            {/* Container for Terminal Widget or Portrait */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {heroView === 'terminal' ? (
                  <motion.div
                    key="terminal-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    <TerminalWidget />
                  </motion.div>
                ) : (
                  <motion.div
                    key="portrait-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl sm:rounded-3xl p-2.5 bg-zinc-900/90 border border-zinc-800 shadow-2xl shadow-blue-950/40 backdrop-blur-sm group"
                  >
                    {/* Profile Image with Rounded Corners & Subtle Shadow */}
                    <div className="overflow-hidden rounded-xl sm:rounded-2xl relative w-full bg-zinc-950 shadow-xl">
                      <img
                        src={profileImg}
                        alt="Shiwanshu Kumar Singh"
                        className="w-full h-auto object-cover rounded-xl sm:rounded-2xl shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Floating Badge Overlay - Top Right */}
                    <div className="absolute top-6 -right-3 sm:-right-4 px-3 py-1.5 bg-zinc-900/95 border border-zinc-800/90 rounded-xl shadow-xl flex items-center space-x-2 text-[11px] font-semibold text-zinc-200 backdrop-blur-md select-none">
                      <div className="p-1 rounded-md bg-amber-500/10 text-amber-400">
                        <Trophy className="h-3.5 w-3.5" />
                      </div>
                      <span>SIH Team Leader</span>
                    </div>

                    {/* Floating Badge Overlay - Bottom Left */}
                    <div className="absolute bottom-6 -left-3 sm:-left-4 px-3 py-1.5 bg-zinc-900/95 border border-zinc-800/90 rounded-xl shadow-xl flex items-center space-x-2 text-[11px] font-semibold text-zinc-200 backdrop-blur-md select-none">
                      <div className="p-1 rounded-md bg-blue-500/10 text-blue-400">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <span>Cloud & ML Specialist</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

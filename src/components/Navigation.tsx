/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Sparkles, FileText, Search, Command } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { personalInfo } from '../data';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Metrics(LeetCode)', href: '#coding-profiles' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Writing', href: '#writing' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const sectionId = item.href.slice(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? 'py-3 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 border-b border-gray-200/80 dark:border-zinc-800/80'
            : 'py-5 bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 font-sans font-semibold tracking-tight text-lg text-slate-900 dark:text-zinc-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">S</div>
              <span className="hover:text-blue-500 transition-colors tracking-tight font-semibold">
                SHIWANSHU<span className="text-blue-500">.DEV</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-blue-600 dark:bg-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}

              <div className="h-4 w-[1px] bg-gray-200 dark:bg-zinc-800 mx-1.5" />

              {/* Command Palette Trigger */}
              <button
                id="cmd-k-trigger"
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl transition-all shadow-sm group"
                title="Search or jump to section (Cmd + K)"
              >
                <Search className="h-3.5 w-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-[11px]">Search</span>
                <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-full transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Resume CTA */}
              <a
                href="#resume"
                onClick={(e) => handleClick(e, '#resume')}
                className="ml-3 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile menu button, search palette trigger, and theme toggle */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:hidden">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="p-2 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg flex items-center space-x-1 font-mono text-xs"
                title="Command Palette (Cmd+K)"
              >
                <Search className="h-4 w-4" />
                <span className="text-[10px] bg-slate-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-zinc-700">⌘K</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-40 lg:hidden border-b border-gray-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg px-4 pt-4 pb-6 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'bg-blue-50 dark:bg-zinc-900 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-gray-100 dark:border-zinc-800 my-2 pt-2" />
              <a
                href="#resume"
                onClick={(e) => handleClick(e, '#resume')}
                className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>View & Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

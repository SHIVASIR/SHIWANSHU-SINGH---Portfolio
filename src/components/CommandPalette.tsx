/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Command, 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Sun, 
  Moon, 
  MessageSquare, 
  User, 
  Briefcase, 
  Cpu, 
  Code2, 
  Trophy, 
  Award, 
  BookOpen, 
  MessageCircle, 
  Send,
  CornerDownLeft,
  X
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { personalInfo } from '../data';
import { trackEvent } from '../lib/analytics';

export interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'Social Links';
  icon: any;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CommandPalette({ isOpen: externalIsOpen, onClose }: CommandPaletteProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
    setQuery('');
    setSelectedIndex(0);
  };

  const jumpToSection = (sectionId: string) => {
    handleClose();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }, 100);
  };

  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About Me',
      description: 'Background, CS background, and core specialization',
      category: 'Navigation',
      icon: User,
      action: () => jumpToSection('about'),
    },
    {
      id: 'nav-experience',
      title: 'Work Experience',
      description: 'SDE Internships, Hackathon wins, and leadership roles',
      category: 'Navigation',
      icon: Briefcase,
      action: () => jumpToSection('experience'),
    },
    {
      id: 'nav-skills',
      title: 'Skills & Proficiency',
      description: 'Python, ML, Cloud Architecture, C++, and DB Spectrum',
      category: 'Navigation',
      icon: Cpu,
      action: () => jumpToSection('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      description: 'Fraud detection, Docker inference engine, and query optimizer',
      category: 'Navigation',
      icon: Code2,
      action: () => jumpToSection('projects'),
    },
    {
      id: 'nav-leetcode',
      title: 'LeetCode & Metrics',
      description: 'Coding performance, problem-solving stats, and platforms',
      category: 'Navigation',
      icon: Trophy,
      action: () => jumpToSection('coding-profiles'),
    },
    {
      id: 'nav-[#achievements]',
      title: 'Achievements & Hackathons',
      description: 'Smart India Hackathon Finalist, rank metrics, and awards',
      category: 'Navigation',
      icon: Award,
      action: () => jumpToSection('achievements'),
    },
    {
      id: 'nav-testimonials',
      title: 'Testimonials & Endorsements',
      description: 'Recommendations from professors and engineering leads',
      category: 'Navigation',
      icon: MessageCircle,
      action: () => jumpToSection('testimonials'),
    },
    {
      id: 'nav-writing',
      title: 'Technical Publications',
      description: 'Medium articles and systems engineering blogs',
      category: 'Navigation',
      icon: BookOpen,
      action: () => jumpToSection('writing'),
    },
    {
      id: 'nav-certifications',
      title: 'Certifications',
      description: 'NPTEL, Cloud, and ML credentials',
      category: 'Navigation',
      icon: Award,
      action: () => jumpToSection('certifications'),
    },
    {
      id: 'nav-resume',
      title: 'Interactive Resume',
      description: 'PDF resume preview, viewer, and direct download',
      category: 'Navigation',
      icon: FileText,
      action: () => jumpToSection('resume'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Form',
      description: 'Send direct message, schedule a call, or email',
      category: 'Navigation',
      icon: Send,
      action: () => jumpToSection('contact'),
    },

    // Quick Actions
    {
      id: 'action-resume',
      title: 'Download / Print Resume (PDF)',
      description: 'Generate and save official SDE resume PDF',
      category: 'Actions',
      icon: FileText,
      shortcut: '⌘P',
      action: () => {
        trackEvent('download', 'resume', 'command_palette');
        handleClose();
        setTimeout(() => {
          jumpToSection('resume');
          window.print();
        }, 150);
      },
    },
    {
      id: 'action-theme',
      title: `Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'} Mode)`,
      description: 'Switch application visual color theme',
      category: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      shortcut: '⌘T',
      action: () => {
        toggleTheme();
        handleClose();
      },
    },
    {
      id: 'action-chatbot',
      title: 'Open AI Assistant Chatbot',
      description: 'Ask AI questions about Shiwanshu\'s experience',
      category: 'Actions',
      icon: MessageSquare,
      action: () => {
        handleClose();
        const chatButton = document.getElementById('ai-chatbot-trigger');
        if (chatButton) {
          chatButton.click();
        }
      },
    },

    // Social Links
    {
      id: 'social-github',
      title: 'Open GitHub Profile',
      description: 'github.com/shiwanshusingh-code',
      category: 'Social Links',
      icon: Github,
      action: () => {
        window.open(personalInfo.github, '_blank');
        handleClose();
      },
    },
    {
      id: 'social-linkedin',
      title: 'Open LinkedIn Profile',
      description: 'linkedin.com/in/shiwanshu-kumar-singh',
      category: 'Social Links',
      icon: Linkedin,
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        handleClose();
      },
    },
    {
      id: 'social-email',
      title: 'Send Direct Email',
      description: personalInfo.email,
      category: 'Social Links',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${personalInfo.email}`;
        handleClose();
      },
    },
  ];

  // Filter items
  const filteredItems = commandItems.filter(item => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Handle custom trigger event
  useEffect(() => {
    const handleCustomOpen = () => {
      setInternalIsOpen(true);
    };
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => window.removeEventListener('open-command-palette', handleCustomOpen);
  }, []);

  // Handle global shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (externalIsOpen === undefined) {
          setInternalIsOpen(prev => !prev);
        } else if (onClose && isOpen) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [externalIsOpen, isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation within palette modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#09090b] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-left flex flex-col"
          >
            {/* Search Bar Input */}
            <div className="relative flex items-center border-b border-zinc-800/80 px-4 py-3.5 bg-zinc-950/60">
              <Search className="h-5 w-5 text-blue-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search section..."
                className="w-full bg-transparent text-sm font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-zinc-500 hover:text-white mr-2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center space-x-1 px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
                <span>ESC</span>
              </kbd>
            </div>

            {/* Command Item Results */}
            <div
              ref={listRef}
              className="max-h-[360px] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const IconComp = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left group ${
                        isSelected
                          ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                          : 'text-zinc-300 hover:bg-zinc-900/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 pr-2">
                        <div
                          className={`p-2 rounded-lg shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-zinc-900 text-zinc-400 group-hover:text-white'
                          }`}
                        >
                          <IconComp className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold font-mono tracking-tight text-white truncate">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {item.shortcut && (
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                            {item.shortcut}
                          </span>
                        )}
                        <CornerDownLeft
                          className={`h-3.5 w-3.5 transition-opacity ${
                            isSelected ? 'opacity-100 text-blue-400' : 'opacity-0'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-zinc-500 text-xs font-mono space-y-2">
                  <p>No matching commands or sections found for "{query}"</p>
                  <p className="text-[10px] text-zinc-600">
                    Try searching for "Skills", "Resume", "Projects", or "GitHub".
                  </p>
                </div>
              )}
            </div>

            {/* Footer Legend */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 px-4 py-2.5 bg-zinc-950/80 text-[10px] font-mono text-zinc-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded">↵</kbd>
                  <span>Select</span>
                </span>
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <Command className="h-3 w-3" />
                <span>Cmd + K Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-900 bg-[#030303] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Credit trademark */}
          <div className="flex items-center space-x-2 font-semibold text-slate-850 dark:text-white text-sm">
            <span className="p-1 rounded bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span>Shiwanshu Kumar Singh</span>
          </div>

          {/* Live Visitor Counter */}
          <VisitorCounter variant="footer" />

          {/* Minimal license trademark & Back to top button */}
          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono tracking-wider text-center md:text-left">
              <span>&copy; {currentYear}</span>
            </div>
            <button
              onClick={handleScrollTop}
              className="p-2 bg-slate-100 dark:bg-zinc-900 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

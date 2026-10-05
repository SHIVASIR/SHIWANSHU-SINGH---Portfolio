/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  durationMs?: number;
}

export default function Preloader({ onComplete, durationMs = 1200 }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = "SHIWANSHU.INIT()";

  useEffect(() => {
    let charIdx = 0;
    const typingInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        setTypedText(fullText.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] bg-[#030303] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle Ambient Background Light */}
          <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Central Animated Badge with Initial 'S' */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-900 p-[2px] shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-6"
            >
              <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm" />
                
                {/* Initial 'S' */}
                <span className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-tr from-blue-400 via-indigo-300 to-cyan-300 relative z-10 font-mono">
                  S
                </span>
              </div>
            </motion.div>

            {/* Typing Command Line */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center space-x-2 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full shadow-lg"
            >
              <Terminal className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              <span className="font-mono text-xs text-zinc-300 tracking-wider">
                {typedText}
                <span className="animate-ping inline-block w-1.5 h-3 bg-blue-400 ml-1 rounded-sm" />
              </span>
            </motion.div>

            {/* Minimal Loading Bar Indicator */}
            <motion.div className="w-36 h-1 bg-zinc-900 rounded-full mt-6 overflow-hidden relative">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

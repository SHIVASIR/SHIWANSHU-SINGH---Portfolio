/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  UserCheck, 
  Sparkles, 
  Grid, 
  Play, 
  Pause,
  MessageSquareQuote,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { testimonialList } from '../data';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isAutoplay, setIsAutoplay] = useState(true);

  const total = testimonialList.length;

  // Autoplay functionality for carousel
  useEffect(() => {
    if (!isAutoplay || viewMode !== 'carousel') return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoplay, viewMode]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentTestimonial: Testimonial = testimonialList[currentIndex];

  // Animation variants for carousel slides
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Subtle Gradient Lights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
            >
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>06 . TESTIMONIALS & ENDORSEMENTS</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              What mentors & collaborators say.
            </motion.h2>
          </div>

          {/* View Controls & Autoplay Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 self-start md:self-auto"
          >
            {/* Carousel / Grid Toggle */}
            <div className="bg-[#09090b] p-1 rounded-xl border border-zinc-800 flex items-center space-x-1">
              <button
                id="testimonial-view-carousel"
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Carousel</span>
              </button>
              <button
                id="testimonial-view-grid"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>All Grid</span>
              </button>
            </div>

            {/* Play/Pause Autoplay button when in Carousel mode */}
            {viewMode === 'carousel' && (
              <button
                id="testimonial-toggle-autoplay"
                onClick={() => setIsAutoplay(!isAutoplay)}
                title={isAutoplay ? "Pause Autoplay" : "Start Autoplay"}
                className={`p-2 rounded-xl border transition-all ${
                  isAutoplay 
                    ? 'bg-zinc-900 text-blue-400 border-blue-900/50 hover:bg-zinc-800' 
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                }`}
              >
                {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            )}
          </motion.div>
        </div>

        {/* CAROUSEL VIEW */}
        {viewMode === 'carousel' && (
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {/* Main Carousel Card Container */}
            <div className="min-h-[320px] sm:min-h-[300px] flex items-center justify-center relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full max-w-4xl p-6 sm:p-10 rounded-3xl bg-[#09090b]/80 border border-zinc-800 shadow-2xl relative overflow-hidden backdrop-blur-md group"
                >
                  {/* Decorative Subtle Glowing Border & Watermark Quote Icon */}
                  <div className="absolute -right-6 -bottom-6 opacity-5 text-blue-400 pointer-events-none">
                    <Quote className="h-48 w-48 rotate-12" />
                  </div>

                  {/* Header Row: Badge & Rating */}
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-blue-400" />
                        {currentTestimonial.highlightBadge || 'Endorsement'}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {currentTestimonial.date}
                      </span>
                    </div>

                    {/* 5 Star Rating */}
                    <div className="flex items-center space-x-1 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800">
                      {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative z-10 my-4">
                    <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-medium leading-relaxed italic select-text">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>

                  {/* Author Info Block */}
                  <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-4 relative z-10">
                    <div className="flex items-center space-x-4">
                      {/* Avatar Initials Badge */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-blue-600/20 shrink-0 border border-blue-400/30">
                        {currentTestimonial.initials}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white flex items-center">
                          {currentTestimonial.author}
                          <UserCheck className="h-4 w-4 text-blue-400 ml-1.5" />
                        </h4>
                        <p className="text-xs text-zinc-400 font-medium">
                          {currentTestimonial.designation}
                        </p>
                        <p className="text-[11px] text-zinc-500 flex items-center mt-0.5 font-mono">
                          <Building2 className="h-3 w-3 mr-1 text-zinc-500" />
                          {currentTestimonial.organization} • <span className="text-blue-400/90 ml-1">{currentTestimonial.relationship}</span>
                        </p>
                      </div>
                    </div>

                    {/* Counter Indicator */}
                    <div className="text-xs font-mono text-zinc-500 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800 font-bold">
                      <span className="text-blue-400">0{currentIndex + 1}</span> / 0{total}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls Row */}
            <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto px-2">
              {/* Dots */}
              <div className="flex items-center space-x-2">
                {testimonialList.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-8 bg-blue-500 shadow-md shadow-blue-500/50'
                        : 'w-2.5 bg-zinc-800 hover:bg-zinc-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  id="testimonial-prev-btn"
                  onClick={handlePrev}
                  className="p-3 rounded-2xl bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500/50 hover:bg-zinc-900 transition-all shadow-md group active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  id="testimonial-next-btn"
                  onClick={handleNext}
                  className="p-3 rounded-2xl bg-[#09090b] border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500/50 hover:bg-zinc-900 transition-all shadow-md group active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonialList.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#09090b]/80 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 hover:shadow-2xl transition-all relative overflow-hidden backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                      {item.highlightBadge}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none flex items-center">
                      {item.author}
                      <UserCheck className="h-3.5 w-3.5 text-blue-400 ml-1" />
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      {item.designation}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      {item.organization} • <span className="text-blue-400/80">{item.relationship}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}

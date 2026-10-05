/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowUpRight, 
  Sparkles, 
  Search,
  Bookmark,
  Share2
} from 'lucide-react';
import { articlesList } from '../data';
import { Article } from '../types';

const CATEGORIES = [
  'All',
  'Machine Learning',
  'Cloud Architecture',
  'Software Engineering',
  'Algorithms & DSA'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = articlesList.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="writing" 
      className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900"
    >
      {/* Background Gradient Lights */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>07 . WRITING & TECHNICAL ARTICLES</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Technical Insights & Engineering Blogs.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-zinc-400 text-sm max-w-2xl mt-2"
            >
              Documenting ML optimization, cloud architecture setups, competitive algorithm breakdowns, and software engineering practices.
            </motion.p>
          </div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full md:w-72"
          >
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full pl-10 pr-4 py-2 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/80 transition-colors"
            />
          </motion.div>
        </div>

        {/* Category Filters Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30'
                    : 'bg-[#09090b] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Sparkles className="h-3 w-3 text-white" />}
              </button>
            );
          })}
        </motion.div>

        {/* Article Cards Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center bg-[#09090b]/50 rounded-2xl border border-zinc-800"
            >
              <BookOpen className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm font-medium">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold hover:bg-blue-600/30 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {filteredArticles.map((art, index) => (
                <motion.article
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group rounded-3xl bg-[#09090b]/80 border border-zinc-800 p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-700 hover:shadow-2xl transition-all relative overflow-hidden backdrop-blur-md"
                >
                  {/* Top Header Row: Category Badge & Platform */}
                  <div>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                          {art.category}
                        </span>
                        {art.featured && (
                          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-400">
                        <span className="px-2 py-0.5 bg-zinc-800/80 rounded border border-zinc-700/60 text-zinc-300">
                          {art.platform}
                        </span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <a
                      href={art.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group-hover:text-blue-400 transition-colors"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-3 flex items-start justify-between">
                        <span className="group-hover:translate-x-0.5 transition-transform">{art.title}</span>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-2" />
                      </h3>
                    </a>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  {/* Bottom Footer: Tags & Metadata & Read Link */}
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {art.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-lg flex items-center"
                        >
                          <Tag className="h-2.5 w-2.5 mr-1 text-zinc-500" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info & Read Button */}
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                          {art.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                          {art.readTime}
                        </span>
                      </div>

                      <a
                        href={art.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                      >
                        <span>Read Article</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    // Simulate API delivery
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            08 . DIRECT PLACEMENT HUB
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Get in touch.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Information block - Column 5 */}
          <div className="lg:col-span-5 space-y-8 text-left animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Let's build something remarkable.</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                I am actively seeking internships, student placements, and full-time SDE/Software Engineer opportunities in
                <span className="font-semibold text-white"> Software Engineering, Cloud Systems, and ML Pipelines</span>.
                My channels are open, and I look forward to contributing to high-impact products.
              </p>
            </div>

            {/* Quick credentials cards */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5 p-4 rounded-xl border border-zinc-800 bg-[#09090b]/40">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-550 text-zinc-500 uppercase font-bold tracking-wider font-mono">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold text-zinc-200 hover:text-blue-400 hover:underline transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-xl border border-zinc-805 border-zinc-800 bg-[#09090b]/40">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-550 text-zinc-500 uppercase font-bold tracking-wider font-mono">Mobile Number</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-bold text-zinc-200 hover:text-blue-400 hover:underline transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-xl border border-zinc-805 border-zinc-800 bg-[#09090b]/40">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-550 text-zinc-500 uppercase font-bold tracking-wider font-mono">Base Location</div>
                  <div className="text-sm font-bold text-zinc-250 text-zinc-200">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels horizontal list */}
            <div className="space-y-4 pt-5 border-t border-zinc-800">
              <h4 className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider font-mono">SDE Portals</h4>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs rounded-lg font-bold border border-zinc-800 bg-[#09090b]/40 text-zinc-300 hover:border-blue-500/50 hover:text-white transition-all flex items-center space-x-1.5"
                >
                  <Linkedin className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn Network</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs rounded-lg font-bold border border-zinc-800 bg-[#09090b]/40 text-zinc-300 hover:border-slate-600 hover:text-white transition-all flex items-center space-x-1.5"
                >
                  <Github className="h-4 w-4 text-white" />
                  <span>GitHub Repos</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Block - Column 7 */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl border border-zinc-805 border-zinc-800 bg-[#09090b]/45 relative">
              <h3 className="text-lg font-extrabold text-white mb-6 text-left flex items-center justify-between">
                <span>Direct Message Routing</span>
                <span className="text-[9px] font-mono uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-500">Secure SMTP</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Input Fields */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Recruiter or Engineering Lead name"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-zinc-800 bg-zinc-950/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-100 placeholder-zinc-500 font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="recruiter@techcompany.com"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-zinc-800 bg-zinc-950/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-100 placeholder-zinc-500 font-medium font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Message Context</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message regarding active listings, placement interview coordinate, or referrals..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg border border-zinc-800 bg-zinc-950/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-100 placeholder-zinc-500 font-medium resize-none font-sans"
                  />
                </div>

                {/* State Alerts */}
                {status === 'error' && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs border border-rose-500/20 flex items-center space-x-2 font-semibold">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>Please ensure all fields are correctly filled.</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 flex items-center space-x-2 font-semibold">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                    <span>Pipeline connected! Thank you, Shiwanshu will answer this work coordination mail immediately.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-bold font-mono uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Routing Node...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Deliver Direct Mail</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

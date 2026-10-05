/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Calendar, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';
import { certifications } from '../data';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-[#030303] text-zinc-100 relative z-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/30 border border-blue-900/50 px-3.5 py-1.5 rounded-full mb-4"
          >
            06 . PROFESSIONAL CREDENTIALS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Verified industry certifications.
          </motion.h2>
        </div>

        {/* Elegant Certifications Timeline */}
        <div className="relative border-l border-zinc-800 pl-6 sm:pl-8 space-y-10 max-w-3xl mx-auto md:mx-0">
          {certifications.map((cert) => (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              key={cert.id}
              className="relative text-left animate-fade-in"
            >
              {/* Node Verification Marker on the timeline */}
              <span className="absolute -left-[33px] sm:-left-[37px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 border-2 border-blue-500 shadow-xl z-20 text-blue-400">
                <ShieldCheck className="h-4 w-4" />
              </span>

              {/* Certification Detail Box */}
              <div className="p-5 rounded-2xl border border-zinc-805 border-zinc-800 bg-[#09090b]/40 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-wider">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>ISSUED: {cert.date}</span>
                  </div>
                  
                  <h3 className="font-extrabold text-white text-md sm:text-base leading-tight">
                    {cert.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase font-mono">
                    <span>{cert.issuer}</span>
                    {cert.credentialId && (
                      <span className="text-[10px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800/80">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:text-blue-305 hover:text-blue-300 sm:shrink-0 transition-colors font-mono"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

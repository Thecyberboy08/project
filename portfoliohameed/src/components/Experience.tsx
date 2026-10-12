"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { Briefcase, CheckCircle2, TrendingUp, Users, Presentation, MessageSquare } from "lucide-react";

export const Experience: React.FC = () => {
  const exp = experienceData[0];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">06 /</span> PRACTICAL EXPOSURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            STARTUP SALES <span className="tech-text-gradient">EXPERIENCE.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
            Hands-on business exposure navigating early-stage sales, customer discovery, product demonstration, and market communication.
          </p>
        </div>

        {/* Experience Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {exp.category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300">
                PRACTICAL FIELD EXPOSURE
              </span>
            </div>
          </div>

          <div className="py-6">
            <p className="text-base text-slate-300 font-sans leading-relaxed max-w-4xl mb-8">
              {exp.summary}
            </p>

            {/* Highlights Grid */}
            <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-4">
              CORE RESPONSIBILITIES & LEARNINGS:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exp.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

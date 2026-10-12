"use client";

import React from "react";
import { motion } from "framer-motion";
import { achievementsData } from "@/data/achievements";
import { Award, Trophy, CheckCircle, Sparkles } from "lucide-react";

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">07 /</span> RECOGNITION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            HONORS & <span className="tech-text-gradient">ACHIEVEMENTS.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
            Official recognition, innovation milestones, and state-level engineering selections.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#06b6d4]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Card Body */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative hover:border-cyan-500/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold w-fit">
                    {item.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>ORGANIZATION: <strong className="text-white">{item.organization}</strong></span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> VERIFIED SELECTION
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Expansion Architecture Notice */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 font-mono text-xs text-slate-500 flex items-center justify-between">
          <span>FUTURE ACHIEVEMENTS ARCHITECTURE READY FOR DYNAMIC INGESTION</span>
          <span className="text-cyan-500/60">[SYSTEM NODE ACTIVE]</span>
        </div>

      </div>
    </section>
  );
};

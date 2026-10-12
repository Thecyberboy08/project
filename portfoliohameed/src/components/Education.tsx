"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Cpu, BookOpen, CircuitBoard } from "lucide-react";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">08 /</span> ACADEMIC FOUNDATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ENGINEERING <span className="tech-text-gradient">EDUCATION.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
            Grounding theoretical hardware principles, circuit design, signal processing, and telecommunications in practical lab experimentation.
          </p>
        </div>

        {/* Education Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-10 rounded-2xl border border-slate-800 relative overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
                  BACHELOR OF ENGINEERING (B.E.)
                </span>
                <span className="font-mono text-xs text-slate-500">
                  UNDERGRADUATE DEGREE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Electronics & Communication Engineering
              </h3>

              <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-semibold">Anjuman Institute of Technology and Management (AITM)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span>Bhatkal, Karnataka, India</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Specializing in digital electronics, microprocessors, embedded systems, signal theory, telecommunication networks, and IoT hardware integration. Actively participating in technical clubs, robotics workshops, and innovation challenges.
              </p>

              {/* Core Subject Pillars */}
              <div className="pt-2">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  CORE ACADEMIC DOMAINS:
                </span>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {[
                    "Analog & Digital Circuits",
                    "Microcontrollers & Microprocessors",
                    "Embedded Systems & C++",
                    "Signals & Systems",
                    "Wireless Communication",
                    "VLSI & Logic Design",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 flex items-center gap-1.5"
                    >
                      <CircuitBoard className="w-3.5 h-3.5 text-cyan-500" />
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Institution Badge Visual */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Cpu className="w-10 h-10" />
              </div>
              <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">
                AITM BHATKAL
              </span>
              <span className="text-xs text-slate-400 font-mono mt-1">
                Dept. of Electronics & Communication
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

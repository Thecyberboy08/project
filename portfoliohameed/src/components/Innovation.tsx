"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Search,
  Lightbulb,
  Cpu,
  TestTube2,
  RefreshCw,
  Target,
  ArrowDown,
  Sparkles,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "PROBLEM",
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    description: "Identifying real-world friction, safety concerns, workflow bottlenecks, or agricultural challenges.",
  },
  {
    step: "02",
    title: "RESEARCH",
    icon: Search,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    description: "Analyzing root causes, existing technical constraints, customer pain points, and market feasibility.",
  },
  {
    step: "03",
    title: "IDEA",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    description: "Formulating novel architectures combining AI, sensors, embedded hardware, and software logic.",
  },
  {
    step: "04",
    title: "PROTOTYPE",
    icon: Cpu,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/30",
    description: "Building functional hardware circuits, micro-rovers, microcontrollers, and application code.",
  },
  {
    step: "05",
    title: "TEST",
    icon: TestTube2,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
    description: "Deploying prototypes in real field conditions, gathering user feedback, and measuring performance metrics.",
  },
  {
    step: "06",
    title: "IMPROVE",
    icon: RefreshCw,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/30",
    description: "Refining hardware layouts, optimizing code pipelines, and hardening security and usability.",
  },
  {
    step: "07",
    title: "IMPACT",
    icon: Target,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    description: "Delivering scalable, reliable, and accessible technology solutions that solve actual problems.",
  },
];

export const Innovation: React.FC = () => {
  return (
    <section id="innovation" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center items-center">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">05 /</span> STARTUP METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            FROM PROBLEM <span className="text-cyan-400">→</span> IDEA <span className="text-cyan-400">→</span> PROTOTYPE <span className="text-cyan-400">→</span> <span className="tech-text-gradient">SOLUTION</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            I approach engineering like a founder: discovering unaddressed challenges, engineering low-cost functional hardware, and iteratively testing with users.
          </p>
        </div>

        {/* Process Flow Cards Horizontal / Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-stretch">
          {processSteps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center relative group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center border mb-3 mx-auto transition-transform group-hover:scale-110 shadow-sm font-mono font-bold text-xs">
                    <IconComp className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 block mb-1">
                    STEP // {item.step}
                  </span>
                  <h3 className="font-mono text-xs font-bold text-white tracking-wider mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    {item.description}
                  </p>
                </div>

                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-500/50">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Pitch Deck Style Banner */}
        <div className="mt-16 glass-panel p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block mb-2 font-semibold">
                THE MINDSET
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                User & Problem Obsessed
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Technology is useless without real-world utility. My focus is identifying high-friction problems in agriculture, safety, and surveillance, then engineering lean software and hardware.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block mb-2 font-semibold">
                THE EXECUTION
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Rapid Prototyping
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Moving rapidly from breadboard circuits to microcontroller code, custom enclosures, and live field experiments to gather immediate, unfiltered feedback.
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block mb-2 font-semibold">
                THE GOAL
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Building Venture-Scale Solutions
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exploring technology concepts that have clear pathways to commercial viability, market adoption, and long-term societal value.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

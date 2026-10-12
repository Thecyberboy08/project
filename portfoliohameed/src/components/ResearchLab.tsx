"use client";

import React from "react";
import { motion } from "framer-motion";
import { researchLabData } from "@/data/research";
import { Microscope, Cpu, ArrowRight, Layers, Beaker, Terminal } from "lucide-react";

export const ResearchLab: React.FC = () => {
  return (
    <section id="research" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">04 /</span> ADVANCED R&D
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            THE RESEARCH <span className="tech-text-gradient">LAB.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            "Exploring ideas at the intersection of engineering, emerging technology, business and real-world problems."
          </p>
        </div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchLabData.map((research, idx) => {
            const getStatusBadge = (status: string) => {
              switch (status) {
                case "PROTOTYPING":
                  return "bg-cyan-950/90 border-cyan-400 text-cyan-300";
                case "TESTING":
                  return "bg-indigo-950/90 border-indigo-400 text-indigo-300";
                case "RESEARCHING":
                  return "bg-blue-950/90 border-blue-400 text-blue-300";
                default:
                  return "bg-slate-900 border-slate-700 text-slate-300";
              }
            };

            return (
              <motion.div
                key={research.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative group h-full"
              >
                <div>
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] text-cyan-500/80 uppercase tracking-widest">
                      {research.category}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        research.status
                      )}`}
                    >
                      {research.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                    {research.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    {research.description}
                  </p>
                </div>

                {/* Focus Nodes Footer */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block mb-2">
                    KEY FOCUS NODES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {research.focusNodes.map((node) => (
                      <span
                        key={node}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-cyan-400"
                      >
                        • {node}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

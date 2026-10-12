"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { skillsData, SkillCategory } from "@/data/skills";
import { Cpu, Microscope, Layout, TrendingUp, CheckCircle2 } from "lucide-react";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "TECHNOLOGY", "RESEARCH", "PRODUCT", "BUSINESS"];

  const filteredData =
    activeCategory === "ALL"
      ? skillsData
      : skillsData.filter((cat) => cat.category === activeCategory);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "APPLYING":
        return "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
      case "BUILDING":
        return "bg-blue-950/80 border-blue-400 text-blue-300";
      case "LEARNING":
        return "bg-indigo-950/80 border-indigo-400 text-indigo-300";
      case "EXPLORING":
        return "bg-slate-900 border-slate-700 text-slate-400";
      default:
        return "bg-slate-900 border-slate-700 text-slate-300";
    }
  };

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case "TECHNOLOGY":
        return Cpu;
      case "RESEARCH":
        return Microscope;
      case "PRODUCT":
        return Layout;
      case "BUSINESS":
        return TrendingUp;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">09 /</span> TECHNICAL & DOMAIN SKILLS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SKILLS & <span className="tech-text-gradient">CAPABILITIES.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4 font-sans">
            Categorized capabilities classified by practical application status—from active building and deployment to ongoing learning and exploration.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredData.map((catGroup, idx) => {
            const IconComp = getIconForCategory(catGroup.category);
            return (
              <motion.div
                key={catGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white tracking-wider">
                        {catGroup.category}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        {catGroup.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-6 space-y-3">
                    {catGroup.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-4"
                      >
                        <span className="font-sans text-sm text-slate-200 font-medium">
                          {skill.name}
                        </span>

                        <span
                          className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getLevelBadge(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
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

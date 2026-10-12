"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projectsData, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, Award, Layers, Sparkles, FolderCode } from "lucide-react";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
              <span className="text-slate-500">03 /</span> PORTFOLIO SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              FEATURED <span className="tech-text-gradient">PROJECTS & SYSTEMS.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-sans">
            Real-world engineering implementations across AI, robotics, road safety, smart agriculture, software, and accessibility.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative group cursor-pointer h-full"
            >
              <div>
                {/* Header Meta & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>

                {/* Achievement Highlight if present */}
                {project.achievement && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-semibold mb-3">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.achievement}</span>
                  </div>
                )}

                {/* Tagline / Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                  {project.description}
                </p>
              </div>

              {/* Technologies Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-500">
                      +{project.technologies.length - 3} MORE
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW DETAILS →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { X, ExternalLink, FileText, CheckCircle, Sparkles, AlertCircle, Video, Code } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-panel bg-[#0b1329] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 font-semibold tracking-widest uppercase">
                PROJECT DOSSIER // {project.id.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Title & Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest block mb-1">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-wider bg-cyan-950/80 border border-cyan-500/50 text-cyan-300">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Achievement Badge if present */}
            {project.achievement && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-mono text-amber-300 font-medium">
                  {project.achievement}
                </span>
              </div>
            )}

            {/* Main Image Banner / Placeholder */}
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              {!imgError && project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-sm text-cyan-400 uppercase font-bold tracking-wider">
                    {project.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-mono">
                    IMAGE & ARCHITECTURE DIAGRAM COMING SOON
                  </span>
                </div>
              )}
            </div>

            {/* Tagline & Overview */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                OVERVIEW
              </h4>
              <p className="text-base text-slate-200 leading-relaxed font-sans">
                {project.fullDescription}
              </p>
            </div>

            {/* Technologies Grid */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                TECHNOLOGY STACK & CONCEPTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links Section */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    <Code className="w-4 h-4" /> GitHub
                  </a>
                ) : null}

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                ) : null}

                {project.youtubeUrl ? (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-500/40 font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    <Video className="w-4 h-4" /> Video Showcase
                  </a>
                ) : null}
              </div>

              {!project.githubUrl && !project.demoUrl && !project.youtubeUrl && (
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <AlertCircle className="w-4 h-4 text-cyan-500" />
                  <span>PUBLIC LINKS & DEMO VIDEO COMING SOON</span>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

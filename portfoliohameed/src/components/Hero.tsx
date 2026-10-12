"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, UserCheck, Sparkles, Code2, CircuitBoard } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ThreeScene to avoid SSR canvas hydration issues
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
    </div>
  ),
});

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Typography & Action CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Sub-headline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ENGINEERING • INNOVATION • RESEARCH • ENTREPRENEURSHIP</span>
          </motion.div>

          {/* Primary Name Display */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base font-mono tracking-[0.25em] text-cyan-500 uppercase font-semibold mb-3 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" /> SAYED HAMEED PEERZADE
          </motion.h2>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            BUILDING IDEAS <br />
            <span className="tech-text-gradient">INTO REAL-WORLD</span> <br />
            TECHNOLOGY.
          </motion.h1>

          {/* Supporting Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-sans"
          >
            Electronics & Communication Engineering student at{" "}
            <span className="text-white font-medium border-b border-cyan-500/40">
              AITM Bhatkal
            </span>{" "}
            exploring robotics, AI, automation, research, product development, and entrepreneurial ideas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-mono text-xs font-bold tracking-wider text-slate-950 uppercase flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#connect"
              className="px-6 py-3.5 rounded-lg bg-slate-900/80 border border-slate-700 font-mono text-xs font-bold tracking-wider text-slate-200 uppercase hover:border-cyan-400 hover:text-cyan-300 transition-all backdrop-blur-md"
            >
              LET'S CONNECT
            </a>
          </motion.div>

          {/* Quick Status Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">STATUS: BUILDING & RESEARCHING</span>
            </div>
            <div className="flex items-center gap-2">
              <CircuitBoard className="w-3.5 h-3.5 text-cyan-400" />
              <span>ECE @ AITM BHATKAL</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Visualization + Profile Photo Presentation */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Background 3D Canvas Box */}
          <div className="w-full h-[400px] sm:h-[480px] relative">
            <ThreeScene />

            {/* Profile Photo Presentation Card Floating Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-6 glass-panel p-4 rounded-xl border border-cyan-500/30 flex items-center gap-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-cyan-400/80 shrink-0 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                {!imgError ? (
                  <img
                    src="/profile/sayed-hameed.jpg"
                    alt="Sayed Hameed Peerzade"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-2 text-center text-cyan-400 font-mono text-[10px]">
                    <UserCheck className="w-6 h-6 mb-1 text-cyan-400" />
                    <span>SHP PHOTO</span>
                  </div>
                )}
                {/* HUD Corners */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                  SAYED HAMEED PEERZADE
                </span>
                <span className="text-xs text-slate-300 font-sans mt-0.5">
                  ECE Student & Innovator
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-cyan-500" /> AITM Bhatkal, Karnataka
                </span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

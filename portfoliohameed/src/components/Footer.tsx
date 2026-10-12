"use client";

import React from "react";
import { ArrowUp, Cpu } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#02050e] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800/80 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                SHP
              </div>
              <span className="font-mono text-base font-bold text-white tracking-wider">
                SAYED HAMEED PEERZADE
              </span>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              Electronics & Communication Engineering student at{" "}
              <strong className="text-slate-300">AITM Bhatkal</strong> exploring robotics, AI, automation, research, and innovation.
            </p>

            <span className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
              INNOVATION • RESEARCH • TECHNOLOGY
            </span>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-2.5">
              <span className="text-slate-500 uppercase tracking-wider block mb-1">NAVIGATION</span>
              <a href="#hero" className="block text-slate-400 hover:text-cyan-400 transition-colors">HOME</a>
              <a href="#about" className="block text-slate-400 hover:text-cyan-400 transition-colors">ABOUT</a>
              <a href="#engineering-dna" className="block text-slate-400 hover:text-cyan-400 transition-colors">DNA</a>
              <a href="#projects" className="block text-slate-400 hover:text-cyan-400 transition-colors">PROJECTS</a>
            </div>

            <div className="space-y-2.5">
              <span className="text-slate-500 uppercase tracking-wider block mb-1">DOMAINS</span>
              <a href="#research" className="block text-slate-400 hover:text-cyan-400 transition-colors">RESEARCH LAB</a>
              <a href="#innovation" className="block text-slate-400 hover:text-cyan-400 transition-colors">INNOVATION</a>
              <a href="#experience" className="block text-slate-400 hover:text-cyan-400 transition-colors">EXPERIENCE</a>
              <a href="#connect" className="block text-slate-400 hover:text-cyan-400 transition-colors">CONNECT</a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 font-mono text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-all shadow-md"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} SAYED HAMEED PEERZADE. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-1.5">
            <span>ENGINEERED WITH NEXT.JS, TAILWIND & THREE.JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

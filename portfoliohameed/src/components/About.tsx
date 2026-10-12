"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Rocket, Microscope, Lightbulb, Award, CheckCircle2 } from "lucide-react";

const profileCards = [
  {
    title: "ECE ENGINEERING",
    subtitle: "AITM BHATKAL",
    icon: Cpu,
    desc: "Gaining strong fundamentals in circuit design, embedded hardware, signal processing, and communication networks.",
  },
  {
    title: "PROJECT BUILDER",
    subtitle: "HARDWARE & SOFTWARE",
    icon: Rocket,
    desc: "Translating theoretical concepts into functional prototypes, rovers, IoT alerts, and software applications.",
  },
  {
    title: "RESEARCH EXPLORER",
    subtitle: "INNOVATION LAB",
    icon: Microscope,
    desc: "Investigating emerging tech frontiers in Smart Agriculture, AI validation, and autonomous robotics systems.",
  },
  {
    title: "ASPIRING ENTREPRENEUR",
    subtitle: "STARTUP MINDSET",
    icon: Lightbulb,
    desc: "Exploring real-world market problems, early-stage customer discovery, and scalable tech business models.",
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">01 /</span> ABOUT IDENTITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            MORE THAN AN <span className="tech-text-gradient">ENGINEERING STUDENT.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-slate-300 text-base leading-relaxed"
          >
            <p className="text-lg text-slate-200 font-sans leading-relaxed">
              I am currently pursuing my degree in{" "}
              <strong className="text-white font-semibold">
                Electronics & Communication Engineering at AITM Bhatkal
              </strong>
              . For me, engineering is not merely an academic discipline—it is a superpower to construct real solutions for complex problems.
            </p>

            <p>
              My journey spans across hardware design, embedded systems, robotics, artificial intelligence, and startup validation. Whether constructing autonomous rovers like Astra Sense or designing AI tools like Truth Lens, I operate at the intersection of curiosity, experimentation, and execution.
            </p>

            {/* Philosophy Callout Box */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-400 border-cyan-500/20 my-8">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2 font-semibold">
                MY PHILOSOPHY
              </span>
              <blockquote className="text-lg font-serif italic text-white leading-snug">
                "Don't just learn technology. Build with it, experiment with it, research it, and turn ideas into solutions."
              </blockquote>
            </div>

            <p>
              I believe in getting hands-on early—interacting with customers, testing market demand, presenting ideas, and constantly iterating based on feedback. Technology achieves its highest value when it solves genuine human challenges.
            </p>

            {/* Key Value Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {[
                "PRACTICAL PROBLEM SOLVER",
                "RAPID HARDWARE PROTOTYPING",
                "AI & EMBEDDED INTEGRATION",
                "ENTREPRENEURIAL INITIATIVE",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {profileCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-full relative group"
                >
                  {/* Subtle Top Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono text-sm font-bold text-white tracking-wider mb-1 group-hover:text-cyan-400 transition-colors">
                      {card.title}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest block mb-3">
                      {card.subtitle}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Highlight Banner */}
        <div className="mt-16 glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                FEATURED ACHIEVEMENT
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Accident Alert System selected by <strong className="text-cyan-300 font-medium">Innovation Karnataka</strong>.
              </p>
            </div>
          </div>
          <a
            href="#achievements"
            className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:bg-cyan-500/20 transition-colors whitespace-nowrap"
          >
            VIEW TIMELINE →
          </a>
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Zap,
  Settings,
  Wifi,
  Microscope,
  Layout,
  TrendingUp,
} from "lucide-react";

const dnaCards = [
  {
    title: "ROBOTICS",
    icon: Bot,
    tagline: "Intelligent Machines & Autonomous Rovers",
    description: "Exploring autonomous movement, obstacle detection telemetry, micro-rovers, and perimeter monitoring.",
    tech: ["Sensor Fusion", "Chassis Control", "Motor Drivers", "Real-time Telemetry"],
  },
  {
    title: "AI & ML",
    icon: Brain,
    tagline: "Reasoning & Contextual Intelligence",
    description: "Exploring artificial intelligence models to evaluate information integrity and process complex data streams.",
    tech: ["Context Analysis", "NLP", "Pattern Recognition", "Data Pipelines"],
  },
  {
    title: "ELECTRONICS",
    icon: Zap,
    tagline: "Circuitry & Signal Integrity",
    description: "Designing embedded circuits, PCB layouts, microcontrollers, and low-power sensor interfaces.",
    tech: ["Circuit Design", "Embedded C++", "Microcontrollers", "PCB Prototyping"],
  },
  {
    title: "AUTOMATION",
    icon: Settings,
    tagline: "Smart Control Loops & Industrial Logic",
    description: "Building automated triggering mechanisms and safety loops to eliminate human error in critical tasks.",
    tech: ["Actuators", "Relay Logic", "Feedback Loops", "Smart Switches"],
  },
  {
    title: "IoT",
    icon: Wifi,
    tagline: "Connected Sensors & Remote Telemetry",
    description: "Connecting physical sensors to wireless networks for real-time tracking, alerts, and remote monitoring.",
    tech: ["GPS/GSM Modules", "Cloud Telemetry", "Low-power Mesh", "MQTT/HTTP"],
  },
  {
    title: "RESEARCH & DEV",
    icon: Microscope,
    tagline: "Rigorous Inquiry & Experimentation",
    description: "Conducting systematic technical investigations to address agricultural challenges and assistive hardware.",
    tech: ["Hypothesis Testing", "Data Collection", "Prototyping", "Validation"],
  },
  {
    title: "PRODUCT DESIGN",
    icon: Layout,
    tagline: "User-Centric Hardware & Interface",
    description: "Transforming functional electronic breadboards into polished, intuitive hardware and software products.",
    tech: ["CAD Modeling", "Enclosure Design", "UX Architecture", "Usability Testing"],
  },
  {
    title: "ENTREPRENEURSHIP",
    icon: TrendingUp,
    tagline: "Market Discovery & Value Creation",
    description: "Validating customer demand, presenting startup ideas, executing sales outreach, and iterating products.",
    tech: ["Customer Discovery", "Pitching", "Sales Operations", "Value Models"],
  },
];

export const EngineeringDNA: React.FC = () => {
  return (
    <section id="engineering-dna" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">02 /</span> CORE COMPETENCIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ENGINEERING <span className="tech-text-gradient">DNA & FOCUS.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
            The core technology pillars and interdisciplinary domains driving my projects, research, and startup explorations.
          </p>
        </div>

        {/* 8 Pillar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dnaCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between h-full relative group cursor-pointer"
              >
                {/* Header Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                      PILLAR // 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-mono text-base font-bold text-white tracking-wider mb-1 group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs font-mono text-cyan-500/90 mb-3">
                    "{card.tagline}"
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                    {card.description}
                  </p>
                </div>

                {/* Tech Pills Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {card.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { socialsData } from "@/data/socials";
import { Mail, Send, CheckCircle2, MessageSquare, ArrowUpRight, Share2, Globe, Code } from "lucide-react";

export const Connect: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return Globe;
      case "Github":
        return Code;
      case "Instagram":
        return Share2;
      case "Mail":
        return Mail;
      default:
        return Mail;
    }
  };

  return (
    <section id="connect" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Callout Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase">
              <span className="text-slate-500">11 /</span> INITIATE CONTACT
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              HAVE AN IDEA? <br />
              <span className="tech-text-gradient">LET'S BUILD IT.</span>
            </h2>

            <p className="text-lg text-slate-300 font-sans leading-relaxed">
              "Interested in technology, innovation, research or building something meaningful? Let's connect."
            </p>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Whether you are a fellow developer, founder, professor, mentor, or investor exploring early-stage prototypes—my door is always open for technology discussions and collaboration.
            </p>

            {/* Social Links List */}
            <div className="pt-6 space-y-3">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-2">
                DIRECT CONNECT NODES:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialsData.map((s) => {
                  const IconComp = getSocialIcon(s.iconName);
                  return (
                    <a
                      key={s.platform}
                      href={s.isAvailable && s.url ? s.url : "#connect"}
                      className={`p-3.5 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                        s.isAvailable && s.url
                          ? "glass-panel glass-panel-hover text-white border-slate-800 hover:border-cyan-400"
                          : "bg-slate-900/40 border-slate-800/80 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className="w-4 h-4 text-cyan-400" />
                        <span>{s.platform}</span>
                      </div>
                      {s.isAvailable && s.url ? (
                        <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <span className="text-[9px] text-slate-600">[LINK COMING]</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 relative"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> TRANSMIT MESSAGE
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">[DISPATCH NODE]</span>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                      YOUR NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                      MESSAGE DETAILS
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your idea, project scope, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-mono text-xs font-bold tracking-wider text-slate-950 uppercase flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm font-sans">
                    Thank you for reaching out, <strong className="text-cyan-300">{formData.name}</strong>. Sayed Hameed Peerzade will respond to your email shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400 hover:text-white"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

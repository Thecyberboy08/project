"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { galleryData, galleryCategories, GalleryItem } from "@/data/gallery";
import { GalleryModal } from "./GalleryModal";
import { Image as ImageIcon, Sparkles, Eye, Camera } from "lucide-react";

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeTab === "ALL"
      ? galleryData
      : galleryData.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            <span className="text-slate-500">10 /</span> VISUAL ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            INNOVATION <span className="tech-text-gradient">GALLERY.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-4 font-sans">
            Snapshots of hardware development, campus lab experiments, competition showcases, and robotics testing.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-800 pb-4 overflow-x-auto">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                activeTab === cat
                  ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedItem(item)}
              className="glass-panel glass-panel-hover rounded-2xl border border-slate-800 overflow-hidden group cursor-pointer relative"
            >
              {/* Image Aspect Box */}
              <div className="relative w-full h-56 bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 z-10" />

                <div className="flex flex-col items-center justify-center p-4 text-center z-0">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-cyan-500/80 font-mono mt-0.5">
                    {item.category}
                  </span>
                </div>

                {/* Hover Eye Overlay */}
                <div className="absolute inset-0 bg-cyan-950/60 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                  <Eye className="w-5 h-5" /> EXPAND VIEW
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-4 bg-slate-950/80 relative z-10 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-cyan-500 block mb-1 uppercase tracking-widest">
                  {item.category}
                </span>
                <p className="text-xs text-slate-300 font-sans line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

      </div>
    </section>
  );
};

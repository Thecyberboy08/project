"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/data/gallery";
import { X, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel bg-[#0b1329] border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-widest uppercase">
              GALLERY LIGHTBOX // {item.category}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Image Container */}
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-sm text-cyan-400 font-bold uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-mono">
                    MEDIA PLACEHOLDER • EDIT PATH IN gallery.ts
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest block mb-1">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

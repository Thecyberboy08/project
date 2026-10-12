"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingSteps = [
  "INITIALIZING SYSTEM...",
  "LOADING INNOVATION LAB...",
  "CONNECTING NODES...",
  "SYSTEM ONLINE",
];

export const LoadingScreen: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 350);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-white select-none px-4"
        >
          {/* Tech Grid Effect in Background */}
          <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

          {/* Central Logo / Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center font-mono text-2xl font-bold tracking-widest text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              SHP
            </div>
            {/* Corner Tech Indicators */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
          </motion.div>

          {/* Text Console Display */}
          <div className="h-8 flex items-center justify-center mb-6">
            <motion.p
              key={currentStep}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] text-cyan-300 font-medium"
            >
              {loadingSteps[currentStep]}
            </motion.p>
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 sm:w-80 h-1 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_12px_#06b6d4]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-3 font-mono text-xs text-slate-500 tracking-widest">
            [{progress}%]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

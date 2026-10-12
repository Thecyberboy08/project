"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { EngineeringDNA } from "@/components/EngineeringDNA";
import { Projects } from "@/components/Projects";
import { ResearchLab } from "@/components/ResearchLab";
import { Innovation } from "@/components/Innovation";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Gallery } from "@/components/Gallery";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundGrid } from "@/components/BackgroundGrid";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#030712] text-white selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Loading Sequence */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Futuristic Background Grid & Ambient Lighting */}
      <BackgroundGrid />

      {/* Main Page Layout Content */}
      <div className={`transition-opacity duration-700 ${loadingComplete ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        <Hero />
        <About />
        <EngineeringDNA />
        <Projects />
        <ResearchLab />
        <Innovation />
        <Experience />
        <Achievements />
        <Education />
        <Skills />
        <Gallery />
        <Connect />
        <Footer />
      </div>
    </main>
  );
}

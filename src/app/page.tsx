"use client";

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/Hero/HeroSection";
import ArchitectureSection from "@/components/Architecture/ArchitectureSection";
import PipelineSection from "@/components/Pipeline/PipelineSection";
import ProtocolsSection from "@/components/Protocols/ProtocolsSection";
import ControlNodesSection from "@/components/ControlNodes/ControlNodesSection";

function NavIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["HOME", "EDU", "EXP", "PROJ", "LEAD"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const index = Math.floor((scrollY + windowH * 0.3) / windowH);
      setActiveSection(Math.min(Math.max(index, 0), sections.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6">
      {sections.map((label, i) => (
        <button
          key={label}
          onClick={() =>
            window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" })
          }
          className="group flex items-center gap-3"
        >
          <span
            className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-300 ${
              i === activeSection ? "text-exec-green" : "text-wireframe-grey/30"
            }`}
          >
            {label}
          </span>
          <div
            className={`w-8 h-[1px] transition-all duration-300 ${
              i === activeSection
                ? "bg-exec-green w-12"
                : "bg-wireframe-grey/20 group-hover:bg-wireframe-grey/40"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="relative z-20 bg-ide-black border-t border-wireframe-grey/5 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-[10px] tracking-[0.3em] text-wireframe-grey opacity-40 mb-6">
          // END OF LINE
        </div>
        <p className="font-mono text-sm text-exec-green mb-4">TEJAS RAMANUJAM</p>
        <p className="font-sans text-xs text-wireframe-grey opacity-50 mb-6">
          Software Engineer — UTD &apos;26
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/tejas-ramanujam"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider text-wireframe-grey hover:text-exec-green transition-colors duration-300"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/tejas-ramanujam"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider text-wireframe-grey hover:text-logic-blue transition-colors duration-300"
          >
            LINKEDIN
          </a>
          <span className="font-mono text-[10px] tracking-wider text-wireframe-grey opacity-40">
            UTD &apos;26
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative bg-ide-black">
      <NavIndicator />
      <HeroSection />
      <ArchitectureSection />
      <PipelineSection />
      <ProtocolsSection />
      <ControlNodesSection />
      <Footer />
    </main>
  );
}

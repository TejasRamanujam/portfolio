"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectWindowProps {
  title: string;
  subtitle: string;
  tech: string[];
  description: string;
  highlights: string[];
  position: "left" | "right";
}

function ProjectWindow({
  title,
  subtitle,
  tech,
  description,
  highlights,
  position,
}: ProjectWindowProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), position === "left" ? 600 : 1200);
    return () => clearTimeout(timer);
  }, [position]);

  return (
    <div
      className={`terminal-box p-6 md:p-8 transition-all duration-1000 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-wireframe-grey/10">
        <span className="w-3 h-3 rounded-full bg-exec-green opacity-60" />
        <span className="w-3 h-3 rounded-full bg-logic-blue opacity-40" />
        <span className="w-3 h-3 rounded-full bg-wireframe-grey opacity-30" />
        <span className="font-mono text-[10px] text-wireframe-grey ml-2 tracking-wider">
          {title.toLowerCase().replace(/\s+/g, "-")}.app
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-exec-green mb-2 opacity-60">
          $ ls -la projects/
        </div>
        <h3 className="font-mono text-xl md:text-2xl text-syntax-white font-light tracking-wide mb-1">
          {title}
        </h3>
        <p className="font-mono text-sm text-logic-blue mb-2">{subtitle}</p>
        <p className="font-sans text-sm text-wireframe-grey leading-relaxed mb-4">
          {description}
        </p>

        <div className="mb-4">
          <div className="font-mono text-[10px] text-wireframe-grey mb-2 tracking-wider">
            TECH STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 border border-wireframe-grey/20 text-wireframe-grey"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] text-wireframe-grey mb-2 tracking-wider">
            HIGHLIGHTS
          </div>
          <ul className="space-y-1.5">
            {highlights.map((h, i) => (
              <li key={i} className="font-sans text-sm text-wireframe-grey flex gap-2">
                <span className="text-exec-green font-mono text-xs mt-0.5">&gt;</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Running indicator */}
      <div className="flex items-center gap-2 pt-3 border-t border-wireframe-grey/10">
        <div className="w-1.5 h-1.5 rounded-full bg-exec-green animate-pulse" />
        <span className="font-mono text-[10px] text-exec-green">process running</span>
      </div>
    </div>
  );
}

export default function ProtocolsSection() {
  return (
    <section className="relative w-full min-h-screen bg-ide-black overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1565C0 1px, transparent 1px), linear-gradient(90deg, #1565C0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,0,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="scanline-overlay" />

      <div className="relative z-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-4 font-mono text-xs tracking-[0.5em] text-exec-green opacity-60">
            // EXECUTED PROTOCOLS
          </div>
          <h2 className="font-mono text-3xl md:text-5xl tracking-[0.2em] text-syntax-white mb-4 font-light">
            PROJECTS
          </h2>
          <div className="w-16 h-[1px] bg-exec-green mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectWindow
            title="Prophecy ML"
            subtitle="Web Assessor Application"
            position="left"
            tech={["Flutter", "Firebase", "Node.js", "REST API"]}
            description="Full-stack ML-driven web application for automated assessment and analytics. Real-time predictive modeling with serverless backend infrastructure."
            highlights={[
              "ML model integration with sub-100ms inference",
              "Real-time dashboard with live data streaming",
              "Firebase auth & serverless architecture",
              "Cross-platform Flutter frontend",
            ]}
          />

          <ProjectWindow
            title="Fool's Gold"
            subtitle="Side-Scroller Game"
            position="right"
            tech={["Python", "Pygame", "Custom Engine", "Sprite System"]}
            description="Retro-styled side-scrolling game built from scratch with a custom physics engine and procedural level generation system."
            highlights={[
              "Custom 2D physics engine with collision detection",
              "Procedural level generation algorithm",
              "Sprite animation system with state machines",
              "Score tracking & leaderboard integration",
            ]}
          />
        </div>

        <div className="text-center mt-16">
          <p className="font-mono text-xs tracking-[0.3em] text-wireframe-grey opacity-50">
            // ADDITIONAL: QUANTUM MINDS (DATA SCIENCE) · INTRACTABLE (ALGORITHMS)
          </p>
        </div>
      </div>
    </section>
  );
}

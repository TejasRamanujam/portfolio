"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataStructureScene from "./DataStructureScene";

const terminalScript = `$ init --portfolio tejas-ramanujam
> Loading modules...
> Education: UTD '26 | GPA 3.87
> Experience: NexRev | Synergy Sparq | Bytepoint
> Projects: Prophecy ML | Fool's Gold
> Leadership: DECA | Design Society | Nebula Labs
> [████████████████████████] 100%
> System ready.
$ _`;

export default function HeroSection() {
  const [typedScript, setTypedScript] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setTypedScript("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setTypedScript(terminalScript.slice(0, i));
      i++;
      if (i > terminalScript.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-ide-black">
      <DataStructureScene />
      <div className="scanline-overlay" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1
            className="font-mono text-5xl md:text-7xl lg:text-8xl tracking-[0.3em] text-syntax-white mb-6 glow-text"
            style={{ fontWeight: 300 }}
          >
            TEJAS RAMANUJAM
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
            className="font-mono text-base md:text-lg tracking-[0.4em] text-wireframe-grey mb-16"
            style={{ fontWeight: 300 }}
          >
            SOFTWARE ENGINEER &mdash; UTD &apos;26
          </motion.p>

          {/* CTA Terminal Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <div
              className="terminal-box max-w-lg mx-auto px-6 py-4 rounded cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-exec-green opacity-60" />
                <span className="w-2.5 h-2.5 rounded-full bg-logic-blue opacity-40" />
                <span className="w-2.5 h-2.5 rounded-full bg-wireframe-grey opacity-30" />
                <span className="font-mono text-[10px] text-wireframe-grey ml-2 tracking-wider">
                  terminal — tej.as
                </span>
              </div>
              <pre className="font-mono text-xs md:text-sm text-exec-green whitespace-pre-wrap leading-relaxed min-h-[20px]">
                {isHovering ? typedScript : "$ ./portfolio.sh"}
                <span className="terminal-cursor" />
              </pre>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-wireframe-grey opacity-50">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-exec-green opacity-30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

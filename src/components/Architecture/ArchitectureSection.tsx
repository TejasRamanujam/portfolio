"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function CampusWireframe() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);

  const buildings = useMemo(() => {
    const bldgs: {
      pos: [number, number, number];
      size: [number, number, number];
      color: string;
    }[] = [
      { pos: [0, 0.8, 0], size: [1.2, 1.6, 0.8], color: "#1565C0" },
      { pos: [1.8, 0.6, 0.5], size: [0.8, 1.2, 0.6], color: "#00FF00" },
      { pos: [-1.6, 0.5, -0.5], size: [0.9, 1.0, 0.7], color: "#1565C0" },
      { pos: [0.5, 1.2, -1.2], size: [0.6, 2.4, 0.5], color: "#B0BEC5" },
      { pos: [-1.0, 0.7, 1.0], size: [0.7, 1.4, 0.6], color: "#00FF00" },
      { pos: [2.2, 0.4, -0.8], size: [0.5, 0.8, 0.5], color: "#B0BEC5" },
      { pos: [-2.0, 0.9, 0.3], size: [0.4, 1.8, 0.4], color: "#1565C0" },
    ];
    return bldgs;
  }, []);

  const dataFlows = useMemo(() => {
    const flows: [number, number, number][][] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < 10; i++) {
      const theta1 = (i / 10) * Math.PI * 2 * phi;
      const theta2 = ((i + 0.3) / 10) * Math.PI * 2 * phi;
      const r1 = 2.5 + Math.sin(i * 1.2) * 0.5;
      const r2 = 2.5 + Math.sin((i + 0.3) * 1.2) * 0.5;
      flows.push([
        [Math.cos(theta1) * r1, Math.sin(theta1 * 0.7) * 1.5, Math.sin(theta1) * r1],
        [Math.cos(theta2) * r2, Math.sin(theta2 * 0.7) * 1.5, Math.sin(theta2) * r2],
      ]);
    }
    return flows;
  }, []);

  const particles = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6
        )
      );
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Campus grid */}
      <gridHelper args={[8, 30, "#B0BEC5", "#B0BEC5"]} position={[0, -1.5, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.51, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      {/* Buildings */}
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshBasicMaterial color={b.color} wireframe transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Data flow lines */}
      {dataFlows.map((flow, i) => (
        <Line
          key={i}
          points={flow}
          color={i % 2 === 0 ? "#00FF00" : "#1565C0"}
          lineWidth={0.5}
          transparent
          opacity={0.3}
          dashed={i % 3 === 0}
        />
      ))}

      {/* Floating particles */}
      {particles.map((pos, i) => (
        <mesh key={i} position={pos.toArray()}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial
            color={i % 5 === 0 ? "#00FF00" : "#B0BEC5"}
            transparent
            opacity={0.15 + Math.random() * 0.2}
          />
        </mesh>
      ))}

      {/* Central beacon */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function CountUpStat({
  prefix,
  value,
  suffix,
  label,
  delay,
}: {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="text-center">
      <div
        className={`font-mono text-3xl md:text-4xl text-exec-green transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {prefix}
        <CountUpNumber target={value} visible={visible} />
        {suffix}
      </div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-wireframe-grey mt-2 uppercase">
        {label}
      </div>
    </div>
  );
}

function CountUpNumber({ target, visible }: { target: string; visible: boolean }) {
  const [current, setCurrent] = useState(0);
  const num = parseFloat(target);

  useEffect(() => {
    if (!visible) {
      setCurrent(0);
      return;
    }
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrent(Math.min(increment * step, num));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible, num]);

  return <span>{current.toFixed(target.includes(".") ? 2 : 0)}</span>;
}

export default function ArchitectureSection() {
  return (
    <section className="relative w-full min-h-screen bg-ide-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#1565C0" />
          <CampusWireframe />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ide-black/80 via-transparent to-ide-black/80 pointer-events-none" />
      <div className="scanline-overlay" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-24">
        <div className="mb-4 font-mono text-xs tracking-[0.5em] text-exec-green opacity-60">
          // ARCHITECTURE
        </div>
        <h2 className="font-mono text-3xl md:text-5xl tracking-[0.2em] text-syntax-white mb-4 font-light">
          EDUCATION
        </h2>
        <div className="w-16 h-[1px] bg-exec-green mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
          <CountUpStat prefix="" value="3.87" suffix="" label="GPA" delay={500} />
          <CountUpStat prefix="" value="2026" suffix="" label="Graduation" delay={1000} />
          <CountUpStat prefix="" value="40" suffix="+" label="Credit Hours Completed" delay={1500} />
        </div>

        <div className="text-center max-w-xl">
          <p className="font-sans text-base text-wireframe-grey leading-relaxed mb-2">
            B.S. Computer Science
          </p>
          <p className="font-mono text-2xl md:text-3xl tracking-wider text-syntax-white mb-6 glow-text font-light">
            The University of Texas at Dallas
          </p>
          <p className="font-mono text-xs tracking-[0.3em] text-logic-blue">
            Erik Jonsson School of Engineering &amp; Computer Science
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl w-full">
          {[
            { code: "CS 1337", name: "Computer Science I", grade: "A-" },
            { code: "CS 1336", name: "Programming Fundamentals", grade: "A" },
            { code: "ECS 1100", name: "First Year Experience", grade: "A" },
            { code: "CS 1200", name: "Prof. Development", grade: "A" },
          ].map((course) => (
            <div
              key={course.code}
              className="terminal-box px-5 py-3 flex justify-between items-center"
            >
              <div>
                <span className="font-mono text-xs text-exec-green">{course.code}</span>
                <span className="font-mono text-xs text-wireframe-grey ml-3">
                  {course.name}
                </span>
              </div>
              <span className="font-mono text-sm text-logic-blue">{course.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

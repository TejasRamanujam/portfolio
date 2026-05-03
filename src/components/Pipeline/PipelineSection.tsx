"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function CloudInfrastructure() {
  const groupRef = useRef<THREE.Group>(null);
  const flowRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const n: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 2 * phi;
      const r = 2 + Math.sin(i * 0.5) * 0.8;
      n.push(
        new THREE.Vector3(
          Math.cos(t) * r,
          Math.sin(t * 1.3) * 1.5,
          Math.sin(t) * r * 0.8
        )
      );
    }
    return n;
  }, []);

  const rings = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      radius: 0.8 + i * 0.7,
      rotation: [0, (i * Math.PI) / 6, 0] as [number, number, number],
      color: i % 2 === 0 ? "#00FF00" : "#1565C0",
    }));
  }, []);

  const driveCluster = useMemo(() => {
    const drives: { pos: THREE.Vector3; size: number }[] = [];
    for (let x = -2; x <= 2; x += 0.3) {
      for (let y = -1; y <= 1; y += 0.3) {
        drives.push({
          pos: new THREE.Vector3(x + (Math.random() - 0.5) * 0.1, y + (Math.random() - 0.5) * 0.1, 1.5),
          size: 0.08 + Math.random() * 0.06,
        });
      }
    }
    return drives;
  }, []);

  const particles = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 400; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * r,
          (Math.random() - 0.5) * 3,
          Math.sin(t) * r
        )
      );
    }
    return pts;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
    if (flowRef.current) {
      flowRef.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <group>
      {/* Orbiting ring infrastructure */}
      {rings.map((ring, i) => (
        <group key={i} rotation={ring.rotation}>
          <Line
            points={Array.from({ length: 64 }, (_, j) => {
              const angle = (j / 64) * Math.PI * 2;
              return [
                Math.cos(angle) * ring.radius,
                0,
                Math.sin(angle) * ring.radius * 0.6,
              ] as [number, number, number];
            })}
            color={ring.color}
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        </group>
      ))}

      {/* Main structure */}
      <group ref={groupRef}>
        {/* Central core */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.15, 4, 16]} />
          <meshBasicMaterial color="#B0BEC5" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Node connections */}
        {nodes.map((node, i) => (
          <mesh key={i} position={node.toArray()}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00FF00" : i % 3 === 1 ? "#1565C0" : "#B0BEC5"}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Drive array representation */}
      <group ref={flowRef} position={[0, 0, 0]}>
        {driveCluster.map((drive, i) => (
          <mesh key={i} position={drive.pos.toArray()}>
            <boxGeometry args={[drive.size, drive.size * 1.5, drive.size * 0.5]} />
            <meshBasicMaterial
              color={Math.random() > 0.3 ? "#00FF00" : "#B0BEC5"}
              transparent
              opacity={0.2 + Math.random() * 0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Floating data particles */}
      {particles.map((pos, i) => (
        <mesh key={i} position={pos.toArray()}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshBasicMaterial
            color={i % 10 === 0 ? "#00FF00" : "#1565C0"}
            transparent
            opacity={0.1 + Math.random() * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  index: number;
}

function ExperienceCard({ company, role, period, highlights, index }: ExperienceCardProps) {
  return (
    <div className="terminal-box p-6 md:p-8 flex flex-col justify-between group">
      <div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-exec-green mb-3 opacity-60">
          0x0{index + 1}
        </div>
        <h3 className="font-mono text-xl md:text-2xl text-syntax-white mb-1 font-light tracking-wide">
          {company}
        </h3>
        <p className="font-mono text-sm text-logic-blue mb-3">{role}</p>
        <p className="font-sans text-xs text-wireframe-grey mb-4 tracking-wider">{period}</p>
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="font-sans text-sm text-wireframe-grey flex gap-2">
              <span className="text-exec-green font-mono text-xs mt-0.5">&gt;</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 h-[1px] bg-gradient-to-r from-exec-green/50 to-transparent group-hover:from-exec-green transition-all duration-700" />
    </div>
  );
}

export default function PipelineSection() {
  const experiences = [
    {
      company: "NexRev",
      role: "Software Engineer Intern",
      period: "Jun 2024 - Apr 2025",
      highlights: [
        "Automated reformatting & syncing of 600+ drives with Python",
        "Built PyQt GUI, eliminating manual CLI processes",
        "Designed cloud sync architecture with AWS ECS + Docker",
        "Slashed MD5 hashing time 62% via async processing",
      ],
    },
    {
      company: "Synergy Sparq",
      role: "Software Engineer Intern",
      period: "May 2023 - Aug 2024",
      highlights: [
        "Engineered Flutter voice-to-drilldown sales dashboard",
        "Integrated REST API + vendor data aggregation",
        "Real-time metric transformation pipeline",
      ],
    },
    {
      company: "Bytepoint",
      role: "CTO Intern",
      period: "Dec 2023 — Present",
      highlights: [
        "Full-stack web & mobile products for 6+ clients",
        "Synthetic data pipelines for startup clients",
        "Led technical architecture decisions",
      ],
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-ide-black overflow-hidden py-24">
      <div className="absolute inset-0 opacity-20">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 3, 3]} intensity={0.4} color="#00FF00" />
          <CloudInfrastructure />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ide-black/90 via-transparent to-ide-black/90 pointer-events-none" />
      <div className="scanline-overlay" />

      <div className="relative z-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-4 font-mono text-xs tracking-[0.5em] text-exec-green opacity-60">
            // THE PIPELINE
          </div>
          <h2 className="font-mono text-3xl md:text-5xl tracking-[0.2em] text-syntax-white mb-4 font-light">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="w-16 h-[1px] bg-exec-green mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} {...exp} index={i} />
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="font-mono text-xs tracking-[0.3em] text-wireframe-grey opacity-50">
            // SKILLSET: PYTHON · C++ · C# · AWS ECS · DOCKER · FLUTTER · REACT · NEXT.JS
            <br />
            // PYTORCH · SCIKIT-LEARN · TENSORFLOW · GIT · REST API · POSTGRESQL
          </p>
        </div>
      </div>
    </section>
  );
}

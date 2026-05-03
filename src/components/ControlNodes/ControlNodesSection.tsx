"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function CommandCenter() {
  const groupRef = useRef<THREE.Group>(null);
  const gaugesRef = useRef<THREE.Group>(null);

  const radialNodes = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      nodes.push(
        new THREE.Vector3(Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5)
      );
    }
    return nodes;
  }, []);

  const dataStreams = useMemo(() => {
    const streams: THREE.Vector3[][] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = 1.5;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j < 20; j++) {
        const t = j / 20;
        const lift = Math.sin(t * Math.PI) * 0.5;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * r * (0.3 + t * 0.7),
            lift,
            Math.sin(angle) * r * (0.3 + t * 0.7)
          )
        );
      }
      streams.push(points);
    }
    return streams;
  }, []);

  const particles = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 150; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 3;
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * r,
          (Math.random() - 0.5) * 2,
          Math.sin(a) * r
        )
      );
    }
    return pts;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
    if (gaugesRef.current) {
      gaugesRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group>
      {/* Center hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.3, 6]} />
        <meshBasicMaterial color="#1565C0" wireframe transparent opacity={0.4} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.15} />
      </mesh>

      {/* Radial rings */}
      <group ref={groupRef}>
        {[1, 1.8].map((radius, i) => (
          <Line
            key={i}
            points={Array.from({ length: 64 }, (_, j) => {
              const angle = (j / 64) * Math.PI * 2;
              return [
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius,
              ] as [number, number, number];
            })}
            color={i === 0 ? "#00FF00" : "#1565C0"}
            lineWidth={0.5}
            transparent
            opacity={0.25}
          />
        ))}
      </group>

      {/* Gauge arcs */}
      <group ref={gaugesRef}>
        {[0.4, 0.7, 1.0].map((completion, i) => (
          <Line
            key={i}
            points={Array.from({ length: 32 }, (_, j) => {
              const angle = (j / 32) * Math.PI * 2 * completion;
              return [
                Math.cos(angle) * (2.2 + i * 0.3),
                0.1 + i * 0.15,
                Math.sin(angle) * (2.2 + i * 0.3),
              ] as [number, number, number];
            })}
            color={i === 0 ? "#00FF00" : i === 1 ? "#1565C0" : "#B0BEC5"}
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        ))}
      </group>

      {/* Radial nodes */}
      {radialNodes.map((pos, i) => (
        <mesh key={i} position={pos.toArray()}>
          <boxGeometry args={[0.04, 0.04, 0.15]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? "#00FF00" : "#B0BEC5"}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Data streams */}
      {dataStreams.map((stream, i) => (
        <Line
          key={i}
          points={stream.map((p) => [p.x, p.y, p.z] as [number, number, number])}
          color="#00FF00"
          lineWidth={0.3}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Particles */}
      {particles.map((pos, i) => (
        <mesh key={i} position={pos.toArray()}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial
            color="#1565C0"
            transparent
            opacity={0.1 + Math.random() * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function MetricGauge({
  label,
  value,
  maxValue,
  unit,
  percent,
  delay,
}: {
  label: string;
  value: string;
  maxValue: string;
  unit: string;
  percent?: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const targetNum = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(showTimer);
  }, [delay]);

  useEffect(() => {
    if (!visible) {
      setDisplayValue(0);
      return;
    }
    const duration = 2500;
    const steps = 60;
    const increment = targetNum / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDisplayValue(Math.min(increment * step, targetNum));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible, targetNum]);

  const pct = Math.min((displayValue / parseFloat(maxValue.replace(/[^0-9.]/g, ""))) * 100, 100);

  return (
    <div className="terminal-box p-4 md:p-5">
      <div className="font-mono text-[10px] tracking-[0.3em] text-wireframe-grey mb-3 opacity-60 uppercase">
        {label}
      </div>
      <div className="flex items-end justify-between mb-2">
        <span className="font-mono text-2xl md:text-3xl text-exec-green">
          {unit}
          {displayValue.toFixed(0).toLocaleString()}
        </span>
        {percent && (
          <span className="font-mono text-sm text-logic-blue">{percent}</span>
        )}
      </div>
      {/* Progress bar */}
      <div className="w-full h-[2px] bg-wireframe-grey/10 rounded overflow-hidden">
        <div
          className="h-full bg-exec-green transition-all duration-1000 ease-out"
          style={{ width: `${visible ? pct : 0}%` }}
        />
      </div>
      <div className="font-mono text-[9px] text-wireframe-grey mt-1 text-right">
        max: {unit}{maxValue}
      </div>
    </div>
  );
}

export default function ControlNodesSection() {
  return (
    <section className="relative w-full min-h-screen bg-ide-black overflow-hidden py-24">
      <div className="absolute inset-0 opacity-25">
        <Canvas
          camera={{ position: [0, 3, 4.5], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 5, 3]} intensity={0.5} color="#00FF00" />
          <CommandCenter />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ide-black/90 via-transparent to-ide-black/90 pointer-events-none" />
      <div className="scanline-overlay" />

      <div className="relative z-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-4 font-mono text-xs tracking-[0.5em] text-exec-green opacity-60">
            // CONTROL NODES
          </div>
          <h2 className="font-mono text-3xl md:text-5xl tracking-[0.2em] text-syntax-white mb-4 font-light">
            ORGANIZATIONS &amp; LEADERSHIP
          </h2>
          <div className="w-16 h-[1px] bg-exec-green mx-auto" />
        </div>

        {/* Org Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* DECA */}
          <div className="terminal-box p-6 flex flex-col gap-4">
            <div className="font-mono text-xs tracking-[0.3em] text-exec-green opacity-60">
              NODE_01
            </div>
            <h3 className="font-mono text-xl text-syntax-white font-light">DECA</h3>
            <p className="font-sans text-sm text-wireframe-grey leading-relaxed">
              International business organization. Competed at state &amp; international
              levels in Business Law &amp; Ethics, Team Decision Making events.
            </p>
            <div className="flex gap-4 mt-auto pt-3 border-t border-wireframe-grey/10">
              <div>
                <div className="font-mono text-xs text-exec-green">2x</div>
                <div className="font-mono text-[9px] text-wireframe-grey">State Qualifier</div>
              </div>
              <div>
                <div className="font-mono text-xs text-logic-blue">ICDC</div>
                <div className="font-mono text-[9px] text-wireframe-grey">International</div>
              </div>
            </div>
          </div>

          {/* The Design Society */}
          <div className="terminal-box p-6 flex flex-col gap-4">
            <div className="font-mono text-xs tracking-[0.3em] text-exec-green opacity-60">
              NODE_02
            </div>
            <h3 className="font-mono text-xl text-syntax-white font-light">
              The Design Society
            </h3>
            <p className="font-sans text-sm text-wireframe-grey leading-relaxed">
              Creative collective bridging design thinking with software engineering.
              Led cross-functional workshops and design sprints for campus initiatives.
            </p>
            <div className="flex gap-4 mt-auto pt-3 border-t border-wireframe-grey/10">
              <div>
                <div className="font-mono text-xs text-exec-green">20%</div>
                <div className="font-mono text-[9px] text-wireframe-grey">Member Growth</div>
              </div>
              <div>
                <div className="font-mono text-xs text-logic-blue">Lead</div>
                <div className="font-mono text-[9px] text-wireframe-grey">Workshops</div>
              </div>
            </div>
          </div>

          {/* Nebula Labs */}
          <div className="terminal-box p-6 flex flex-col gap-4">
            <div className="font-mono text-xs tracking-[0.3em] text-exec-green opacity-60">
              NODE_03
            </div>
            <h3 className="font-mono text-xl text-syntax-white font-light">Nebula Labs</h3>
            <p className="font-sans text-sm text-wireframe-grey leading-relaxed">
              Student-led software lab building production-grade tools and
              contributing to open-source. Mentored 5+ junior developers through code review cycles.
            </p>
            <div className="flex gap-4 mt-auto pt-3 border-t border-wireframe-grey/10">
              <div>
                <div className="font-mono text-xs text-exec-green">30%</div>
                <div className="font-mono text-[9px] text-wireframe-grey">Growth Rate</div>
              </div>
              <div>
                <div className="font-mono text-xs text-logic-blue">5+</div>
                <div className="font-mono text-[9px] text-wireframe-grey">Mentored</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricGauge
            label="Budget Managed"
            value="3000"
            maxValue="5000"
            unit="$"
            delay={300}
          />
          <MetricGauge
            label="Member Growth (YOY)"
            value="30"
            maxValue="50"
            unit=""
            percent="+30%"
            delay={600}
          />
          <MetricGauge
            label="Events Organized"
            value="12"
            maxValue="20"
            unit=""
            delay={900}
          />
          <MetricGauge
            label="Teams Directed"
            value="8"
            maxValue="15"
            unit=""
            delay={1200}
          />
        </div>

        <div className="text-center mt-16">
          <div className="terminal-box inline-block px-6 py-3">
            <p className="font-mono text-xs text-exec-green tracking-wider">
              $ systemctl status leadership.nodes — <span className="text-logic-blue">ACTIVE</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Line,
  Environment,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

function QuantumDataStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const hullRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const scanlineRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  const hullGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 4);
    return geo;
  }, []);

  const hullEdges = useMemo(() => {
    return new THREE.EdgesGeometry(hullGeometry);
  }, [hullGeometry]);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const count = 80;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 * phi;
      const radius = 2.2 + Math.sin(i * 0.5) * 0.4;
      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * radius * Math.cos(i * 0.3),
          Math.sin(theta * 0.7) * radius * 0.8,
          Math.sin(theta) * radius * Math.sin(i * 0.3)
        )
      );
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    time.current += delta;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
      groupRef.current.rotation.z += delta * 0.01;
    }

    if (scanlineRef.current) {
      scanlineRef.current.position.y = Math.sin(time.current * 0.5) * 3;
    }

    if (glowRef.current) {
      const s = 1 + Math.sin(time.current * 1.5) * 0.15;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(time.current * 1.5) * 0.04;
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        const basePos = nodePositions[i % nodePositions.length];
        const pulse = Math.sin(time.current * 3 + i * 0.3) * 0.15 + 1;
        node.position.copy(basePos).multiplyScalar(pulse);
        const mat = (node as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = 0.3 + Math.sin(time.current * 2 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe hull */}
      <lineSegments ref={hullRef} geometry={hullEdges}>
        <lineBasicMaterial
          color="#B0BEC5"
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>

      {/* Secondary inner structure */}
      <mesh>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial
          color="#1565C0"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#00FF00"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Scanline */}
      <mesh ref={scanlineRef} position={[0, 0, 3.1]}>
        <planeGeometry args={[8, 0.05]} />
        <meshBasicMaterial
          color="#00FF00"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing nodes */}
      <group ref={nodesRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos.toArray()}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00FF00" : i % 3 === 1 ? "#1565C0" : "#B0BEC5"}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Orbital rings */}
      {[0, Math.PI / 3, -Math.PI / 3].map((angle, i) => (
        <mesh key={`ring-${i}`} rotation={[angle, i * 0.8, 0]}>
          <torusGeometry args={[2.7, 0.01, 16, 120]} />
          <meshBasicMaterial color="#B0BEC5" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function ServerLights() {
  const count = 40;
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 15,
      y: (Math.random() - 0.5) * 10,
      z: -3 - Math.random() * 5,
    }));
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial
            color={
              Math.random() > 0.7 ? "#00FF00" : Math.random() > 0.5 ? "#1565C0" : "#B0BEC5"
            }
            transparent
            opacity={0.3 + Math.random() * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const slowZoom = 5 + Math.sin(t * 0.1) * 0.3 - t * 0.02;
    camera.position.lerp(
      vec.set(
        Math.sin(t * 0.08) * 0.3,
        Math.cos(t * 0.06) * 0.2,
        Math.max(slowZoom, 3.5)
      ),
      0.003
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function DataStructureScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 8, 20]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#1565C0" />
      <pointLight position={[-5, -5, -5]} intensity={0.1} color="#00FF00" />
      <QuantumDataStructure />
      <ServerLights />
      <Stars
        radius={10}
        depth={5}
        count={200}
        factor={3}
        saturation={0}
        fade
        speed={0.2}
      />
      <CameraRig />
    </Canvas>
  );
}

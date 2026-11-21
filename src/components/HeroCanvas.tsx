import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OBSIDIAN = '#09080f';
const AMBER = '#f59e0b';
const CYAN = '#06b6d4';

/** True on touch-first devices — keeps the scene light there. */
function useIsCoarsePointer(): boolean {
  return useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  );
}

/** Flat dot-grid floor, faded into the fog. */
function DotGrid({ dense }: { dense: boolean }) {
  const geometry = useMemo(() => {
    const cols = dense ? 90 : 50;
    const rows = dense ? 52 : 30;
    const gap = 0.55;
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let cx = 0; cx < cols; cx++) {
      for (let cz = 0; cz < rows; cz++) {
        positions[i++] = (cx - cols / 2) * gap;
        positions[i++] = -1.35;
        positions[i++] = (cz - rows / 2) * gap;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [dense]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color="#241f33"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Glowing amber/cyan particle shell with additive blending. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const amber = new THREE.Color(AMBER).convertSRGBToLinear();
    const cyan = new THREE.Color(CYAN).convertSRGBToLinear();
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.55 + 1.1;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      color.copy(Math.random() < 0.6 ? amber : cyan);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Wireframe torus-knot centerpiece + cyan icosahedron cage + glow core. */
function Centerpiece() {
  const scrollGroup = useRef<THREE.Group>(null);
  const tiltGroup = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.LineSegments>(null);
  const scrollY = useRef(0);

  const cageGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.7, 0)),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    // once the hero is far off-screen, stop burning frames on animation math
    if (scrollY.current > window.innerHeight * 1.25) return;
    const t = state.clock.elapsedTime;
    const ease = Math.min(delta * 3.2, 1);

    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.16;
      knotRef.current.rotation.y = t * 0.22;
      knotRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.02);
    }
    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.09;
      cageRef.current.rotation.y = -t * 0.14;
    }
    // pointer tilt (r3f normalises pointer to [-1, 1] on the canvas)
    if (tiltGroup.current) {
      tiltGroup.current.rotation.y += (state.pointer.x * 0.4 - tiltGroup.current.rotation.y) * ease;
      tiltGroup.current.rotation.x += (-state.pointer.y * 0.22 - tiltGroup.current.rotation.x) * ease;
    }
    // scroll parallax: the whole centerpiece drifts up and rolls slightly
    if (scrollGroup.current) {
      scrollGroup.current.position.y = 1.15 + scrollY.current * 0.0011;
      scrollGroup.current.rotation.z = scrollY.current * 0.00006;
    }
  });

  return (
    <group ref={scrollGroup}>
      <group ref={tiltGroup}>
        {/* knot */}
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.5, 0.42, 170, 20]} />
          <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.32} />
        </mesh>
        {/* dark occluder so the far side of the wireframe reads cleanly */}
        <mesh>
          <torusKnotGeometry args={[1.47, 0.4, 170, 20]} />
          <meshBasicMaterial
            color={OBSIDIAN}
            polygonOffset
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
        {/* icosahedron cage */}
        <lineSegments ref={cageRef} geometry={cageGeometry}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.25} />
        </lineSegments>
        {/* glow core */}
        <mesh>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
        <pointLight color={AMBER} intensity={20} distance={9} decay={2} />
      </group>
    </group>
  );
}

/**
 * Full-viewport interactive WebGL scene for the hero.
 * r3f auto-resizes via ResizeObserver (no manual handler needed); dpr capped
 * at 2; default raf frameloop; light-weight variant on coarse pointers.
 */
export default function HeroCanvas() {
  const isCoarse = useIsCoarsePointer();
  const particleCount = isCoarse ? 420 : 1400;
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        flat
        dpr={dpr}
        camera={{ position: [0, 1.7, 9], fov: 55, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={[OBSIDIAN]} />
        <fog attach="fog" args={[OBSIDIAN, 10, 26]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[5, 4, 4]} intensity={16} distance={14} color={CYAN} />
        <pointLight position={[-5, 3, -3]} intensity={12} distance={12} color={AMBER} />

        <DotGrid dense={!isCoarse} />
        <Particles count={particleCount} />
        <Centerpiece />
      </Canvas>
    </div>
  );
}

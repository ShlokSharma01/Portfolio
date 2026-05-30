/**
 * Lightweight 3-D liquid-metallic blob for the Skills section.
 * – Lazy-loaded via React.lazy in Skills.tsx
 * – frameloop="never" when off-screen (IntersectionObserver)
 * – dpr capped at 1.5, antialias off, alpha canvas
 */
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.11;
    meshRef.current.rotation.y = t * 0.17;
    // gentle breathing scale
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.55) * 0.028);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.25, 48, 48]} />
      <MeshDistortMaterial
        color="#5A0710"
        distort={0.38}
        speed={1.6}
        roughness={0.06}
        metalness={0.96}
      />
    </mesh>
  );
}

export default function SkillsBlob() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0, rootMargin: '100px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', minHeight: '280px' }}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 3.6], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.18} />
        {/* Primary crimson key light */}
        <pointLight position={[3, 3, 3]}   color="#E10E1F" intensity={4.5} />
        {/* Gold rim light */}
        <pointLight position={[-3, -2, -2]} color="#D4AF37" intensity={1.2} />
        {/* Faint fill */}
        <pointLight position={[0, -4, 2]}   color="#160A0D"  intensity={0.8} />
        <Blob />
      </Canvas>
    </div>
  );
}

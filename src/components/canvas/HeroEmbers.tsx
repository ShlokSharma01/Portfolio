import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 22;

function EmberParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef  = useRef<THREE.Group>(null!);
  const mouseRef  = useRef({ x: 0, y: 0 });

  const [geo, velocities] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() * 0.7 + 0.3 - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i] = 0.003 + Math.random() * 0.005;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return [g, vel] as const;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += velocities[i];
        arr[i * 3]     += (Math.random() - 0.5) * 0.003;
        if (arr[i * 3 + 1] > 5.5) {
          arr[i * 3]     = (Math.random() * 0.7 + 0.3 - 0.5) * 10;
          arr[i * 3 + 1] = -5.5;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (groupRef.current) {
      const { x, y } = mouseRef.current;
      groupRef.current.rotation.y +=
        (x * 0.07 - groupRef.current.rotation.y) * Math.min(2.5 * delta, 0.1);
      groupRef.current.rotation.x +=
        (y * 0.045 - groupRef.current.rotation.x) * Math.min(2.5 * delta, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geo}>
        <pointsMaterial
          color={new THREE.Color('#E10E1F')}
          size={0.038}
          sizeAttenuation
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroEmbers() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Start as true — hero is at the top and initially visible
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '100px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        /* frameloop="never" stops the render loop (and useFrame) when hero is off-screen */
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <EmberParticles />
      </Canvas>
    </div>
  );
}

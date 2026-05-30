import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { skillGroups } from '../../data/skills';

/* One colour per skill group */
const GROUP_COLORS = [
  '#E10E1F', // Languages — crimson
  '#D4AF37', // Web — gold
  '#FF2D3F', // Data / DB — crimson-glow
  '#D4AF37', // AI / ML — gold
  '#A2969A', // Tools — muted
  '#F5F1F0', // Design / Analytics — off-white
];

/* Flatten all skills with their group colour */
const ALL_SKILLS = skillGroups.flatMap((g, gi) =>
  g.skills.map(skill => ({ skill, color: GROUP_COLORS[gi] })),
);

/* Fibonacci sphere — evenly distributes N points on a sphere of radius r */
function fibSphere(n: number, r: number): THREE.Vector3[] {
  return Array.from({ length: n }, (_, i) => {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  });
}

function SkillNodes() {
  const positions = useMemo(() => fibSphere(ALL_SKILLS.length, 3.2), []);

  return (
    <>
      {ALL_SKILLS.map(({ skill, color }, i) => (
        <group key={skill} position={positions[i].toArray()}>
          {/* Tiny dot at node */}
          <mesh>
            <sphereGeometry args={[0.028, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>

          {/* Label — fades in with a per-node CSS delay */}
          <Html
            center
            distanceFactor={9}
            style={{ pointerEvents: 'none' }}
          >
            <span
              className="constellation-label"
              style={{
                color,
                animationDelay: `${i * 0.045}s`,
                borderColor: `${color}30`,
              }}
            >
              {skill}
            </span>
          </Html>
        </group>
      ))}
    </>
  );
}

export default function SkillsConstellation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      aria-label="Interactive 3D skills constellation — drag to rotate"
    >
      <SkillNodes />

      {/* Drag to rotate + auto-rotate until touched */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </Canvas>
  );
}

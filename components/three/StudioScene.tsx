"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  PerformanceMonitor,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

// What the laptop screen shows as the visitor scrolls through the hero, in order.
export const STUDIO_SCREENS = [
  { tex: "/textures/sc-home.webp", phone: "/work/sc-home-phone.webp" },
  { tex: "/textures/yo-home.webp", phone: "/work/yo-home-phone.webp" },
  { tex: "/textures/unwind-yoga.webp", phone: "/work/sc-home-phone.webp" },
];

useTexture.preload(STUDIO_SCREENS.map((s) => s.tex));
useTexture.preload(["/work/sc-home-phone.webp", "/work/yo-home-phone.webp"]);

const CLAY = "#c7834a";
const SAGE = "#6f8562";
const TAN = "#b8925f";
const ALU = "#b9aea2";

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// Camera keyframes along the scroll: [progress, position, look-at]
const KEYS: [number, THREE.Vector3, THREE.Vector3][] = [
  [0, new THREE.Vector3(5.4, 3.4, 7.6), new THREE.Vector3(0.35, 0.8, 0)],
  [0.5, new THREE.Vector3(-5.0, 2.6, 6.2), new THREE.Vector3(0.1, 0.9, 0)],
  [1, new THREE.Vector3(0.6, 2.0, 5.4), new THREE.Vector3(0, 1.1, -0.6)],
];

function useSrgb(urls: string[]) {
  const tex = useTexture(urls);
  useMemo(() => {
    tex.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    });
  }, [tex]);
  return tex;
}

function Laptop({ progress }: { progress: MutableRefObject<number> }) {
  const lid = useRef<THREE.Group>(null);
  const over = useRef<THREE.MeshBasicMaterial>(null);
  const base = useRef<THREE.MeshBasicMaterial>(null);
  const screens = useSrgb(STUDIO_SCREENS.map((s) => s.tex));
  const opened = useRef(0);

  const keys = useMemo(() => {
    const out: [number, number][] = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 13; c++) out.push([-1.26 + c * 0.21, -0.78 + r * 0.2]);
    return out;
  }, []);

  useFrame((_, dt) => {
    // Lid swings open once on load.
    opened.current = Math.min(1, opened.current + dt * 0.7);
    if (lid.current) lid.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2 + 0.02, -0.22, smooth(opened.current));

    // Cross-fade the screen between sites as the visitor scrolls.
    const p = clamp01(progress.current) * (screens.length - 1);
    const i = Math.min(screens.length - 1, Math.floor(p));
    const f = smooth(clamp01((p - i - 0.55) / 0.4));
    if (base.current && over.current) {
      if (base.current.map !== screens[i]) {
        base.current.map = screens[i];
        base.current.needsUpdate = true;
      }
      const next = screens[Math.min(screens.length - 1, i + 1)];
      if (over.current.map !== next) {
        over.current.map = next;
        over.current.needsUpdate = true;
      }
      over.current.opacity = i === screens.length - 1 ? 0 : f;
    }
  });

  return (
    <group>
      {/* base */}
      <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.05} smoothness={3} position={[0, 0.06, 0]}>
        <meshStandardMaterial color={ALU} metalness={0.85} roughness={0.32} />
      </RoundedBox>
      {/* keyboard well */}
      <mesh position={[0, 0.121, -0.38]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.86, 1.08]} />
        <meshStandardMaterial color="#1b1714" roughness={0.8} />
      </mesh>
      <Instances limit={keys.length} position={[0, 0.135, 0]}>
        <boxGeometry args={[0.17, 0.025, 0.16]} />
        <meshStandardMaterial color="#2b2521" roughness={0.6} />
        {keys.map(([x, z], k) => (
          <Instance key={k} position={[x, 0, z]} />
        ))}
      </Instances>
      {/* trackpad */}
      <mesh position={[0, 0.1215, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 0.62]} />
        <meshStandardMaterial color="#a69a8d" metalness={0.6} roughness={0.25} />
      </mesh>

      {/* lid, hinged at the back edge */}
      <group ref={lid} position={[0, 0.12, -1.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <RoundedBox args={[3.2, 2.1, 0.07]} radius={0.04} smoothness={3} position={[0, 1.05, -0.035]}>
          <meshStandardMaterial color={ALU} metalness={0.85} roughness={0.32} />
        </RoundedBox>
        <mesh position={[0, 1.05, 0.0015]}>
          <planeGeometry args={[3.08, 1.98]} />
          <meshStandardMaterial color="#0c0a09" roughness={0.15} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.07, 0.003]}>
          <planeGeometry args={[2.92, 1.825]} />
          <meshBasicMaterial ref={base} map={screens[0]} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.07, 0.004]}>
          <planeGeometry args={[2.92, 1.825]} />
          <meshBasicMaterial ref={over} map={screens[1]} transparent opacity={0} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Phone({ progress }: { progress: MutableRefObject<number> }) {
  const [a, b] = useSrgb(["/work/sc-home-phone.webp", "/work/yo-home-phone.webp"]);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    const want = progress.current > 0.33 && progress.current < 0.75 ? b : a;
    if (mat.current && mat.current.map !== want) {
      mat.current.map = want;
      mat.current.needsUpdate = true;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group position={[2.25, 1.05, 0.85]} rotation={[-0.12, -0.55, 0.06]}>
        <RoundedBox args={[0.78, 1.62, 0.08]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#2a2420" metalness={0.9} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0415]}>
          <planeGeometry args={[0.7, 1.52]} />
          <meshBasicMaterial ref={mat} map={a} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function Props() {
  return (
    <>
      {/* plinth */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <cylinderGeometry args={[2.9, 3.0, 0.3, 72]} />
        <meshStandardMaterial color="#9c7b55" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.78, 2.84, 72]} />
        <meshStandardMaterial color={CLAY} roughness={0.6} />
      </mesh>
      <Float speed={1.1} floatIntensity={1.1} rotationIntensity={0.4}>
        <mesh position={[-1.9, 2.5, -1.7]}>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshStandardMaterial color={SAGE} roughness={0.55} />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={1.4} rotationIntensity={0.6}>
        <mesh position={[2.9, 2.75, -1.3]}>
          <sphereGeometry args={[0.24, 40, 40]} />
          <meshStandardMaterial color={CLAY} roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
      <Float speed={0.9} floatIntensity={0.9} rotationIntensity={1.2}>
        <mesh position={[-1.4, 3.0, -2.6]} rotation={[0.9, 0.3, 0]}>
          <torusGeometry args={[0.32, 0.11, 32, 64]} />
          <meshPhysicalMaterial color="#f4e6d4" roughness={0.12} metalness={0} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
      </Float>
      <Float speed={1.3} floatIntensity={1.2} rotationIntensity={0.8}>
        <RoundedBox args={[0.42, 0.42, 0.42]} radius={0.08} position={[1.2, 2.95, -2.2]} rotation={[0.5, 0.6, 0]}>
          <meshStandardMaterial color={TAN} roughness={0.5} />
        </RoundedBox>
      </Float>
    </>
  );
}

function Rig({ progress }: { progress: MutableRefObject<number> }) {
  const look = useRef(new THREE.Vector3().copy(KEYS[0][2]));
  const posRef = useRef(new THREE.Vector3());
  const tgtRef = useRef(new THREE.Vector3());

  const offsetFor = useRef(0);

  useFrame((state, dt) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    // Shift the scene into the right side of the full-width canvas, beside the headline.
    const { width, height } = state.size;
    if (offsetFor.current !== width * 10000 + height) {
      offsetFor.current = width * 10000 + height;
      camera.setViewOffset(width, height, -width * 0.24, 0, width, height);
      camera.updateProjectionMatrix();
    }
    const pos = posRef.current;
    const tgt = tgtRef.current;
    const p = clamp01(progress.current);
    const seg = p < KEYS[1][0] ? 0 : 1;
    const [p0, a0, t0] = KEYS[seg];
    const [p1, a1, t1] = KEYS[seg + 1];
    const t = smooth(clamp01((p - p0) / (p1 - p0)));
    pos.lerpVectors(a0, a1, t);
    tgt.lerpVectors(t0, t1, t);
    // A little pointer parallax on top of the scroll path.
    pos.x += state.pointer.x * 0.35;
    pos.y += state.pointer.y * 0.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pos.x, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pos.y, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pos.z, 4, dt);
    look.current.x = THREE.MathUtils.damp(look.current.x, tgt.x, 4, dt);
    look.current.y = THREE.MathUtils.damp(look.current.y, tgt.y, 4, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, tgt.z, 4, dt);
    camera.lookAt(look.current);
  });
  return null;
}

export default function StudioScene({
  progress,
  onReady,
}: {
  progress: MutableRefObject<number>;
  onReady?: () => void;
}) {
  const [dpr, setDpr] = useState(1.5);
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, Math.min(dpr, 1.75)]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: KEYS[0][1].toArray(), fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} color="#ffe6cc" />
        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={2.2} color="#ffe2c4" position={[0, 5, -2]} scale={[10, 3, 1]} rotation-x={Math.PI / 2} />
            <Lightformer intensity={1.4} color={CLAY} position={[-6, 1.5, 2]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
            <Lightformer intensity={1.1} color="#d9e4cf" position={[6, 2, 1]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
            <Lightformer intensity={0.6} color="#ffffff" position={[0, 1, 6]} scale={[8, 3, 1]} />
          </Environment>
          <Laptop progress={progress} />
          <Phone progress={progress} />
          <Props />
          <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={7} blur={2.6} far={3} resolution={512} color="#2a1a10" />
        </Suspense>
        <Rig progress={progress} />
      </Canvas>
    </div>
  );
}

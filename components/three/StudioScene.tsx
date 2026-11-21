"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  Instance,
  Instances,
  Lightformer,
  PerformanceMonitor,
  RandomizedLight,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

// What the laptop screen shows as the visitor scrolls through the hero, in order.
export const STUDIO_SCREENS = ["/textures/sc-home.webp", "/textures/yo-home.webp", "/textures/unwind-yoga.webp"];
const PHONE_SCREENS = ["/work/sc-home-phone.webp", "/work/yo-home-phone.webp"];

useTexture.preload([...STUDIO_SCREENS, ...PHONE_SCREENS, "/textures/walnut.webp", "/textures/walnut-rough.webp"]);

const BG = "#15120e";
const CLAY = "#c7834a";
const TAN = "#b8925f";
const ALU = "#a9a6a2"; // space-grey aluminium

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// Camera keyframes along the scroll, like a product photographer moving around a desk:
// [progress, position, look-at]
const KEYS: [number, THREE.Vector3, THREE.Vector3][] = [
  [0, new THREE.Vector3(5.0, 4.1, 10.2), new THREE.Vector3(0.3, 0.7, 0)],
  [0.5, new THREE.Vector3(-4.0, 3.3, 9.6), new THREE.Vector3(0.2, 0.75, 0)],
  [1, new THREE.Vector3(0.5, 2.2, 7.2), new THREE.Vector3(0.1, 1.0, -0.5)],
];

function useSrgb(urls: string[], repeat?: number) {
  const tex = useTexture(urls);
  useMemo(() => {
    tex.forEach((t, i) => {
      if (!(repeat && i > 0)) t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      if (repeat) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(repeat, repeat * 0.6);
      }
    });
  }, [tex, repeat]);
  return tex;
}

function Desk() {
  const [map, rough] = useSrgb(["/textures/walnut.webp", "/textures/walnut-rough.webp"], 2.2);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[22, 13]} />
      <meshStandardMaterial map={map} roughnessMap={rough} roughness={1} metalness={0} envMapIntensity={0.6} />
    </mesh>
  );
}

function Laptop({ progress }: { progress: MutableRefObject<number> }) {
  const over = useRef<THREE.MeshBasicMaterial>(null);
  const base = useRef<THREE.MeshBasicMaterial>(null);
  const screens = useSrgb(STUDIO_SCREENS);

  const keys = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let r = 0; r < 6; r++) {
      const cols = r === 0 ? 14 : 13;
      const w = r === 0 ? 0.17 : 0.19;
      for (let c = 0; c < cols; c++) out.push([-1.24 + c * (2.48 / (cols - 1)), -0.86 + r * 0.17, w]);
    }
    return out;
  }, []);

  useFrame(() => {
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

  const metal = (
    <meshPhysicalMaterial color={ALU} metalness={1} roughness={0.36} anisotropy={0.7} anisotropyRotation={Math.PI / 2} clearcoat={0.15} />
  );

  return (
    <group rotation={[0, -0.12, 0]}>
      {/* base: thin slab with soft edges */}
      <RoundedBox args={[3.1, 0.07, 2.15]} radius={0.03} smoothness={4} position={[0, 0.035, 0]} castShadow receiveShadow>
        {metal}
      </RoundedBox>
      {/* keyboard well and keys */}
      <mesh position={[0, 0.0705, -0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.72, 1.12]} />
        <meshStandardMaterial color="#111" roughness={0.7} />
      </mesh>
      <Instances limit={keys.length} position={[0, 0.076, 0]}>
        <boxGeometry args={[1, 0.012, 0.145]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.55} />
        {keys.map(([x, z, w], k) => (
          <Instance key={k} position={[x, 0, z]} scale={[w, 1, 1]} />
        ))}
      </Instances>
      {/* trackpad: a slightly smoother glass panel */}
      <mesh position={[0, 0.0712, 0.58]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.25, 0.72]} />
        <meshPhysicalMaterial color="#9d9a96" metalness={0.6} roughness={0.18} clearcoat={0.6} />
      </mesh>
      {/* hinge */}
      <mesh position={[0, 0.075, -1.06]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.4, 24]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* lid, tilted back about 15 degrees */}
      <group position={[0, 0.08, -1.07]} rotation={[-0.26, 0, 0]}>
        <RoundedBox args={[3.1, 2.05, 0.035]} radius={0.016} smoothness={4} position={[0, 1.025, -0.0175]} castShadow>
          {metal}
        </RoundedBox>
        {/* black glass bezel */}
        <mesh position={[0, 1.025, 0.0006]}>
          <planeGeometry args={[3.04, 1.99]} />
          <meshPhysicalMaterial color="#050505" roughness={0.05} metalness={0} clearcoat={1} />
        </mesh>
        {/* the display */}
        <mesh position={[0, 1.04, 0.0012]}>
          <planeGeometry args={[2.92, 1.825]} />
          <meshBasicMaterial ref={base} map={screens[0]} toneMapped={false} color="#f2f2f2" />
        </mesh>
        <mesh position={[0, 1.04, 0.0016]}>
          <planeGeometry args={[2.92, 1.825]} />
          <meshBasicMaterial ref={over} map={screens[1]} transparent opacity={0} toneMapped={false} color="#f2f2f2" />
        </mesh>
        {/* faint reflection on the glass */}
        <mesh position={[0, 1.04, 0.0022]}>
          <planeGeometry args={[2.92, 1.825]} />
          <meshPhysicalMaterial transparent opacity={0.08} roughness={0.02} metalness={1} color="#ffffff" depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function Phone({ progress }: { progress: MutableRefObject<number> }) {
  const [a, b] = useSrgb(PHONE_SCREENS);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    const want = progress.current > 0.33 && progress.current < 0.75 ? b : a;
    if (mat.current && mat.current.map !== want) {
      mat.current.map = want;
      mat.current.needsUpdate = true;
    }
  });
  return (
    // Leaning on a small walnut stand, to the right of the laptop.
    <group position={[2.35, 0, 0.75]} rotation={[0, -0.42, 0]}>
      <RoundedBox args={[0.7, 0.14, 0.42]} radius={0.04} smoothness={3} position={[0, 0.07, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#4a3222" roughness={0.6} />
      </RoundedBox>
      <group position={[0, 0.82, -0.06]} rotation={[-0.2, 0, 0]}>
        <RoundedBox args={[0.74, 1.54, 0.06]} radius={0.09} smoothness={5} castShadow>
          <meshPhysicalMaterial color="#3a3836" metalness={0.9} roughness={0.3} clearcoat={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0305]}>
          <planeGeometry args={[0.69, 1.49]} />
          <meshPhysicalMaterial color="#050505" roughness={0.04} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[0.66, 1.44]} />
          <meshBasicMaterial ref={mat} map={a} toneMapped={false} color="#f2f2f2" />
        </mesh>
      </group>
    </group>
  );
}

function Mug() {
  const points = useMemo(
    () =>
      [
        [0.0, 0],
        [0.27, 0],
        [0.3, 0.03],
        [0.31, 0.55],
        [0.3, 0.58],
        [0.28, 0.58],
        [0.27, 0.08],
        [0.0, 0.08],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );
  return (
    <group position={[-2.05, 0, -1.2]} rotation={[0, 0.9, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 48]} />
        <meshPhysicalMaterial color={CLAY} roughness={0.42} clearcoat={0.5} clearcoatRoughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.31, 0.3, 0]} castShadow>
        <torusGeometry args={[0.14, 0.035, 16, 32, Math.PI]} />
        <meshPhysicalMaterial color={CLAY} roughness={0.42} clearcoat={0.5} />
      </mesh>
      {/* coffee */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.275, 40]} />
        <meshPhysicalMaterial color="#2a160b" roughness={0.12} clearcoat={1} />
      </mesh>
    </group>
  );
}

function Notebook() {
  return (
    <group position={[-1.75, 0, 1.35]} rotation={[0, 0.3, 0]}>
      {/* pages */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.05, 1.4]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.95} />
      </mesh>
      {/* linen cover */}
      <mesh position={[0, 0.058, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.03, 0.008, 1.42]} />
        <meshStandardMaterial color={TAN} roughness={0.9} />
      </mesh>
      {/* pen */}
      <group position={[0.15, 0.085, 0.05]} rotation={[0, 0.5, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.022, 1.0, 20]} />
          <meshPhysicalMaterial color="#1d1d1d" roughness={0.25} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.53, 0]}>
          <coneGeometry args={[0.022, 0.06, 20]} />
          <meshStandardMaterial color="#b9a27a" metalness={1} roughness={0.25} />
        </mesh>
      </group>
    </group>
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
    // A touch of pointer parallax, like a handheld camera.
    pos.x += state.pointer.x * 0.18;
    pos.y += state.pointer.y * 0.1;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pos.x, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pos.y, 3, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pos.z, 3, dt);
    look.current.x = THREE.MathUtils.damp(look.current.x, tgt.x, 3, dt);
    look.current.y = THREE.MathUtils.damp(look.current.y, tgt.y, 3, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, tgt.z, 3, dt);
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
        shadows
        dpr={[1, Math.min(dpr, 1.75)]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: KEYS[0][1].toArray(), fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        {/* The desk fades into the dark page so there is no visible edge. */}
        <fog attach="fog" args={[BG, 12, 22]} />
        <ambientLight intensity={0.12} />
        <Suspense fallback={null}>
          {/* Softbox-style studio lighting, no HDR download needed. */}
          <Environment resolution={512} frames={1}>
            <Lightformer form="rect" intensity={3.2} color="#fff1e2" position={[2, 6, 2]} scale={[6, 4, 1]} rotation-x={Math.PI / 2} />
            <Lightformer form="rect" intensity={1.6} color="#ffd9b3" position={[-6, 2.5, 2]} scale={[4, 5, 1]} rotation-y={Math.PI / 2} />
            <Lightformer form="rect" intensity={0.8} color="#e3ead8" position={[6, 2, -1]} scale={[3, 5, 1]} rotation-y={-Math.PI / 2} />
            <Lightformer form="ring" intensity={0.6} color="#ffffff" position={[0, 2, 7]} scale={2} />
          </Environment>
          <directionalLight position={[3.5, 6, 2.5]} intensity={0.9} color="#ffe9d2" />
          <Desk />
          <Laptop progress={progress} />
          <Phone progress={progress} />
          <Mug />
          <Notebook />
          {/* Soft shadows baked over the first frames, like a photo studio's diffused light. */}
          <AccumulativeShadows temporal frames={80} alphaTest={0.8} opacity={0.9} scale={12} position={[0, 0.003, 0]} color="#1c120a">
            <RandomizedLight amount={8} radius={3.5} ambient={0.55} intensity={1.1} position={[3.5, 6, 2.5]} bias={0.001} />
          </AccumulativeShadows>
        </Suspense>
        <Rig progress={progress} />
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Image as ScreenImage, PerformanceMonitor, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Three real screens from recent work, floating in an arc. Hover lifts a screen, click jumps to its case study.
const SCREENS = [
  { url: "/textures/yo-home.webp", href: "#work-yes-organics", pos: [-0.8, 0.95, -1.1], rot: 0.32 },
  { url: "/textures/sc-product.webp", href: "#work-sacred-creations", pos: [0.8, -0.95, -0.8], rot: -0.32 },
  { url: "/textures/sc-home.webp", href: "#work-sacred-creations", pos: [0, 0, 0.35], rot: 0 },
] as const;

useTexture.preload(SCREENS.map((s) => s.url));

function Screen({ url, href, pos, rot, index }: (typeof SCREENS)[number] & { index: number }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const targetZ = pos[2] + (hovered ? 0.45 : 0);
    g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 6, dt);
    const s = THREE.MathUtils.damp(g.scale.x, hovered ? 1.04 : 1, 6, dt);
    g.scale.setScalar(s);
    if (Math.abs(g.position.z - targetZ) > 0.001) invalidate();
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
      <group ref={ref} position={[pos[0], pos[1], pos[2]]} rotation={[0, rot, 0]}>
        <ScreenImage
          url={url}
          scale={[3.04, 1.9]}
          radius={0.09}
          toneMapped={false}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          renderOrder={index}
        />
      </group>
    </Float>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.22, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 3, dt);
  });
  return (
    <group ref={group}>
      {SCREENS.map((s, i) => (
        <Screen key={s.url + i} {...s} index={i} />
      ))}
    </group>
  );
}

export default function ScreensScene({ onReady }: { onReady?: () => void }) {
  const [dpr, setDpr] = useState(1.5);
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely when the hero is off-screen.
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
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        <Suspense fallback={null}>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}

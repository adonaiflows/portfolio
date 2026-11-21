"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as ScreenImage, PerformanceMonitor, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CONCEPTS } from "@/lib/site";

const W = 2.72;
const H = 1.7;

useTexture.preload(CONCEPTS.map((c) => c.texture));

const N = CONCEPTS.length;
// Wrap an offset into the range [-N/2, N/2) so the strip loops endlessly.
const wrap = (k: number) => ((((k + N / 2) % N) + N) % N) - N / 2;

/** Five concept screens in a looping 3D cover-flow. Drag to spin, click a screen to jump to its card. */
function Ring({ onFocus }: { onFocus: (i: number) => void }) {
  const panels = useRef<(THREE.Group | null)[]>([]);
  const target = useRef(0);
  const current = useRef(0);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const idle = useRef(0);
  const gl = useThree((s) => s.gl);
  const [hovered, setHovered] = useState<number | null>(null);
  const lastFront = useRef(-1);

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, start: target.current, moved: false };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      target.current = drag.current.start - dx / 260;
      idle.current = 0;
    };
    const up = () => {
      if (!drag.current) return;
      target.current = Math.round(target.current); // settle on the nearest screen
      setTimeout(() => (drag.current = null), 0);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useEffect(() => {
    document.body.style.cursor = hovered !== null ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((state, dt) => {
    idle.current += dt;
    // After a few quiet seconds, move to the next screen on its own.
    if (!drag.current && hovered === null && idle.current > 3.2) {
      target.current += 1;
      idle.current = 0;
    }
    current.current = THREE.MathUtils.damp(current.current, target.current, 3.2, dt);
    const tiltX = -state.pointer.y * 0.05;
    panels.current.forEach((g, i) => {
      if (!g) return;
      const k = wrap(i - current.current);
      const ak = Math.abs(k);
      g.position.set(k * 2.05, 0, -Math.min(ak, 2.2) * 1.15 - (ak > 2 ? (ak - 2) * 3 : 0));
      g.rotation.set(tiltX, -Math.sign(k) * Math.min(ak, 1) * 0.62, 0);
      g.visible = ak < 2.45;
    });
    const front = ((Math.round(current.current) % N) + N) % N;
    if (front !== lastFront.current) {
      lastFront.current = front;
      onFocus(front);
    }
  });

  return (
    <group>
      {CONCEPTS.map((c, i) => (
        <group key={c.slug} ref={(g) => { panels.current[i] = g; }}>
          <ScreenImage
            url={c.texture}
            scale={[W, H]}
            radius={0.08}
            toneMapped={false}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(i);
            }}
            onPointerOut={() => setHovered(null)}
            onClick={() => {
              if (drag.current?.moved) return;
              document.getElementById(`concept-${c.slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
        </group>
      ))}
    </group>
  );
}

export default function ConceptRing({ onReady, onFocus }: { onReady?: () => void; onFocus: (i: number) => void }) {
  const [dpr, setDpr] = useState(1.5);
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 touch-pan-y">
      <Canvas
        dpr={[1, Math.min(dpr, 1.75)]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.15, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        <Suspense fallback={null}>
          <Ring onFocus={onFocus} />
        </Suspense>
      </Canvas>
    </div>
  );
}

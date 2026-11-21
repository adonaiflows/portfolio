"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const StudioScene = dynamic(() => import("@/components/three/StudioScene"), { ssr: false });

// Labels for what the laptop shows at each stage of the scroll (matches STUDIO_SCREENS).
const LABELS = [
  { name: "Sacred Creations", note: "Client · Shopify store" },
  { name: "Yes Organic Boutique & Spa", note: "Concept · booking flow" },
  { name: "Unwind Yoga", note: "Concept · class booking" },
];

/**
 * The hero visual. Phones and reduced-motion visitors get a still render of the scene.
 * Wide screens with a fine pointer get the live 3D studio, driven by scroll through the hero.
 */
export function HeroStage() {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const progress = useRef(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setUse3D(wide.matches && !calm.matches && (navigator.hardwareConcurrency ?? 8) > 2);
    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  // Scroll progress through the (tall, sticky) hero section, 0 at the top and 1 at the end.
  useEffect(() => {
    if (!use3D) return;
    const section = root.current?.closest("section");
    if (!section) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      progress.current = p;
      setStage(Math.min(LABELS.length - 1, Math.floor(p * (LABELS.length - 1) + 0.45)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [use3D]);

  const label = LABELS[stage];

  return (
    <div ref={root} className="relative aspect-[8/7] w-full lg:absolute lg:inset-y-0 lg:left-1/2 lg:aspect-auto lg:w-screen lg:-translate-x-1/2">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[68%] lg:w-[55%] bg-[radial-gradient(closest-side,rgb(199_131_74/0.22),rgb(111_133_98/0.08)_60%,transparent)] blur-2xl"
      />
      <div className={`absolute inset-0 transition-opacity duration-700 [mask-image:radial-gradient(closest-side,black_70%,transparent)] ${use3D && ready ? "opacity-0" : "opacity-100"}`}>
        <Image
          src="/posters/hero-studio.webp"
          alt="A 3D laptop and phone on a clay plinth, showing the Sacred Creations website"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain lg:object-right lg:pr-[4%]"
        />
      </div>
      {use3D && (
        <>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            <StudioScene progress={progress} onReady={() => setTimeout(() => setReady(true), 400)} />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-night from-40% via-night/85 to-transparent" />
          <p
            aria-live="polite"
            className={`absolute bottom-8 left-[70%] -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-night/70 px-4 py-2 text-sm backdrop-blur transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <span className="font-semibold">{label.name}</span>
            <span className="text-mist"> · {label.note}</span>
          </p>
        </>
      )}
    </div>
  );
}

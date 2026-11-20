"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const ScreensScene = dynamic(() => import("@/components/three/ScreensScene"), { ssr: false });

/**
 * The hero visual. Everyone gets a static collage of real project screens first.
 * Wide, capable screens without reduced motion then swap in the interactive 3D version.
 */
export function HeroStage() {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 2;
    const decide = () => setUse3D(wide.matches && !calm.matches && !lowPower);
    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div className="relative aspect-[16/11] w-full lg:aspect-[1/0.92]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(242_182_94/0.22),rgb(155_123_255/0.12)_55%,transparent)] blur-2xl"
      />
      <div className={`absolute inset-0 transition-opacity duration-700 ${use3D && ready ? "opacity-0" : "opacity-100"}`}>
        <Collage />
      </div>
      {use3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <ScreensScene onReady={() => setTimeout(() => setReady(true), 350)} />
        </div>
      )}
    </div>
  );
}

function Frame({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <figure className={`absolute overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/60 ${className}`}>
      <Image src={src} alt={alt} width={1024} height={640} sizes="(min-width: 1024px) 34vw, 60vw" className="h-auto w-full" />
    </figure>
  );
}

function Collage() {
  return (
    <div className="absolute inset-0">
      <Frame
        src="/textures/yo-home.webp"
        alt="Yes Organic spa concept site"
        className="drift left-0 top-[4%] w-[62%] opacity-80 [--r:-4deg] [animation-delay:-2s]"
      />
      <Frame
        src="/textures/sc-product.webp"
        alt="Liquid Gold product page with a drag to turn bottle"
        className="drift right-0 top-[46%] w-[62%] lg:top-[52%] opacity-80 [--r:4deg] [animation-delay:-4s]"
      />
      <Frame
        src="/textures/sc-home.webp"
        alt="Sacred Creations home page"
        className="drift left-[13%] top-[22%] w-[74%] lg:top-[26%] [--r:0deg]"
      />
    </div>
  );
}

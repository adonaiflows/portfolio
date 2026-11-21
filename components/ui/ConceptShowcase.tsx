"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CONCEPTS } from "@/lib/site";
import { Tilt } from "@/components/ui/Tilt";

const ConceptRing = dynamic(() => import("@/components/three/ConceptRing"), { ssr: false });

export function ConceptShowcase() {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [front, setFront] = useState(0);

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

  const current = CONCEPTS[front];

  return (
    <div>
      {use3D && (
        <div className="relative mt-12 hidden lg:block">
          <div aria-hidden className="pointer-events-none absolute inset-x-[15%] bottom-6 h-24 rounded-[50%] bg-clay/15 blur-3xl" />
          <div className={`relative h-[430px] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
            <ConceptRing onReady={() => setTimeout(() => setReady(true), 300)} onFocus={setFront} />
          </div>
          <p className="mt-2 text-center text-sm text-mist" aria-live="polite">
            <span className="font-semibold text-fog">{current.name}</span> · {current.place}
            <span className="ml-3 text-mist/70">Drag to spin</span>
          </p>
        </div>
      )}

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTS.map((c) => (
          <li key={c.slug} id={`concept-${c.slug}`} className="reveal scroll-mt-28">
            <Tilt className="h-full rounded-2xl">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-night-2">
                <Image src={c.image} alt={`${c.name} concept site home page`} width={1440} height={900} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full border-b border-line" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-mist">{c.place}</p>
                  <h4 className="mt-1 font-display text-xl font-bold tracking-[-0.01em]">{c.name}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{c.idea}</p>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay hover:underline">
                      View the concept <span aria-hidden>↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </article>
            </Tilt>
          </li>
        ))}
        <li className="reveal">
          <a
            href="#contact"
            className="flex h-full min-h-56 flex-col justify-between rounded-2xl border border-dashed border-clay/40 p-6 transition hover:border-clay hover:bg-clay/5"
          >
            <span className="font-display text-xl font-bold tracking-[-0.01em]">Your business could be next.</span>
            <span className="text-sm text-mist">Tell me about it and I&apos;ll show you what your site could do better.</span>
            <span className="font-semibold text-clay">Start a project →</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

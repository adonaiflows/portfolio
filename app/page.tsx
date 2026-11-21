import Image from "next/image";
import { ConceptShowcase } from "@/components/ui/ConceptShowcase";
import { ContactForm } from "@/components/ui/ContactForm";
import { Header } from "@/components/ui/Header";
import { HeroStage } from "@/components/ui/HeroStage";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Tilt } from "@/components/ui/Tilt";
import {
  CTA,
  EXPERIENCE,
  NAV,
  OVERVIEW,
  PERSON,
  PROCESS,
  PROJECTS,
  SERVICES,
  SKILLS,
  STACK,
  TESTIMONIALS,
  type Project,
} from "@/lib/site";

const VALUES = [
  "Fast on every phone",
  "One clear next step on every page",
  "Built around your real photos",
  "A live preview link from week one",
];

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-night">
        Skip to content
      </a>
      <Header />
      <RevealObserver />
      <main id="main">
        <Hero />
        <ValueStrip />
        <Work />
        <Services />
        <Process />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tan">{children}</p>;
}

function PrimaryButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CTA.href}
      className={`inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3.5 font-semibold text-night shadow-[0_8px_30px_-8px_rgb(199_131_74/0.6)] transition hover:bg-clay-deep ${className}`}
    >
      {CTA.label}
      <span aria-hidden>→</span>
    </a>
  );
}

function Hero() {
  const kaylee = TESTIMONIALS[0];
  return (
    <section id="top" className="grain relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgb(199_131_74/0.13),transparent_70%),radial-gradient(45%_45%_at_5%_0%,rgb(111_133_98/0.16),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24">
        <div>
          <Eyebrow>Web design &amp; development for local businesses</Eyebrow>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
            Websites that bring local businesses more <span className="text-clay">bookings</span> and{" "}
            <span className="text-clay">sales</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            I&apos;m {PERSON.name}, a full stack engineer who designs and builds fast, interactive sites, from 3D
            product showcases to online stores and booking flows.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton />
            <a href="#work" className="rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-fog/40">
              See my work
            </a>
          </div>
          <figure className="mt-10 flex max-w-md items-start gap-3 border-l-2 border-clay/60 pl-4">
            <Image src={kaylee.photo} alt="" width={40} height={40} className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover" />
            <div>
              <blockquote className="text-[15px] leading-snug text-fog/90">
                &ldquo;He navigates spontaneous tasks with ease and delivers a beautiful outcome.&rdquo;
              </blockquote>
              <figcaption className="mt-1 text-xs text-mist">
                {kaylee.name}, {kaylee.role}
              </figcaption>
            </div>
          </figure>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}

function ValueStrip() {
  return (
    <div className="border-y border-line bg-night-2">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-4 py-6 text-sm text-mist sm:px-6 lg:grid-cols-4">
        {VALUES.map((v) => (
          <li key={v} className="flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-mist">{intro}</p>}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHead
        eyebrow="Selected work"
        title="Recent sites"
        intro="Each one starts with the business goal, a sale or a booking, and every design choice serves it."
      />
      <div className="mt-14 grid gap-24 lg:mt-20 lg:gap-32">
        {PROJECTS.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
      <div className="mt-32">
        <div className="reveal max-w-2xl">
          <Eyebrow>Concept sites</Eyebrow>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Five local businesses, reimagined</h3>
          <p className="mt-4 text-lg leading-relaxed text-mist">
            Unsolicited concepts for Albuquerque and Rio Rancho businesses, each built around the one thing their current
            site makes hard: booking, buying, or finding the door.
          </p>
        </div>
        <ConceptShowcase />
      </div>
    </section>
  );
}

function BrowserFrame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/50">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" priority={priority} />
    </div>
  );
}

function ProjectFeature({ project: p, flip }: { project: Project; flip: boolean }) {
  return (
    <article id={`work-${p.slug}`} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={`reveal relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Tilt className="rounded-2xl" max={5}>
          <BrowserFrame src={p.image.src} alt={p.image.alt} />
        </Tilt>
        {p.phone && (
          <div className={`absolute -bottom-8 hidden w-[23%] overflow-hidden rounded-[1.4rem] border-4 border-night-2 shadow-2xl shadow-black/60 sm:block ${flip ? "-left-4" : "-right-4"}`}>
            <Image src={p.phone.src} alt={p.phone.alt} width={540} height={1169} sizes="160px" className="h-auto w-full" />
          </div>
        )}
      </div>
      <div className={`reveal lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="text-sm text-mist">{p.label}</p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{p.name}</h3>
        <p className="mt-4 leading-relaxed text-mist">{p.summary}</p>
        <ul className="mt-6 grid gap-3">
          {p.built.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              {b}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-mist">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-clay underline-offset-4 hover:underline"
            >
              {l.label} <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-line bg-night-2">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <SectionHead
          eyebrow="What I build"
          title="Sites with one job: turn visitors into customers"
          intro="Whether you take appointments, sell products, or both, the site is built around the moment someone decides to book or buy."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="reveal group rounded-3xl border border-line bg-night p-7 transition hover:border-clay/40 sm:p-8">
              <span className="font-display text-sm font-medium text-clay">0{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="reveal mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-mist">
          <span>Behind the scenes:</span>
          <ul className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHead eyebrow="How it works" title="From first call to launch" />
      <ol className="mt-14 grid gap-4 lg:grid-cols-3">
        {PROCESS.map((s, i) => (
          <li key={s.title} className="reveal relative rounded-3xl border border-line p-7 sm:p-8">
            <span className="font-display text-6xl font-bold text-white/10">{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.01em]">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="reveal mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-clay/15 via-sage/10 to-transparent p-8 ring-1 ring-clay/20 sm:flex-row sm:items-center sm:p-10">
        <div>
          <p className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Curious what your site could do better?</p>
          <p className="mt-2 text-mist">Start with a free review of your current site.</p>
        </div>
        <PrimaryButton />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-y border-line bg-night-2">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="reveal max-w-2xl">
          <Eyebrow>What others say</Eyebrow>
          <h2 id="testimonials-title" className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
            Kind words
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="reveal flex flex-col justify-between rounded-3xl border border-line bg-night p-7 sm:p-9">
              <blockquote className="text-lg leading-relaxed">
                <span aria-hidden className="mb-4 block font-display text-5xl leading-none text-clay">&ldquo;</span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-mist">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="reveal">
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
            Greetings, I&apos;m {PERSON.shortName}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mist">{OVERVIEW}</p>
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-fog/80">Tools I use</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s} className="rounded-full border border-line bg-night-2 px-3 py-1.5 text-sm text-mist">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="reveal text-sm font-semibold uppercase tracking-[0.18em] text-fog/80">Web work</h3>
          <ol className="mt-6 border-l border-line">
            {EXPERIENCE.map((job) => (
              <li key={job.title} className="reveal relative pb-10 pl-7 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-clay" />
                <p className="text-sm text-mist">{job.dates}</p>
                <h4 className="mt-1 font-display text-xl font-bold tracking-[-0.01em]">{job.title}</h4>
                <p className="text-mist">{job.company}</p>
                <details className="group mt-3">
                  <summary className="cursor-pointer list-none text-sm font-medium text-clay">
                    <span className="group-open:hidden">Show details</span>
                    <span className="hidden group-open:inline">Hide details</span>
                  </summary>
                  <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-mist">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mist" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="grain relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_100%,rgb(199_131_74/0.12),transparent_70%),radial-gradient(40%_50%_at_100%_0%,rgb(111_133_98/0.14),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <div className="reveal">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
            Let&apos;s get your site working as hard as you do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mist">
            Tell me a little about your business. I&apos;ll reply with a few honest ideas for your site, no strings
            attached.
          </p>
        </div>
        <div className="reveal rounded-3xl border border-line bg-night-2/80 p-6 backdrop-blur sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {PERSON.name}. {PERSON.role}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-fog">
              {n.label}
            </a>
          ))}
          <a href={CTA.href} className="font-semibold text-clay hover:underline">
            {CTA.label}
          </a>
        </nav>
      </div>
    </footer>
  );
}

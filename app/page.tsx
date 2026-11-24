import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";
import { Header } from "@/components/ui/Header";
import {
  CONCEPTS,
  CTA,
  EXPERIENCE,
  FAQ,
  OVERVIEW,
  PERSON,
  PROCESS,
  PROJECTS,
  STACK,
  TESTIMONIALS,
  type Concept,
  type Project,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-night">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Concepts />
        <ClientWork />
        <Process />
        <Testimonials />
        <Faq />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

/* ---------- building blocks ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tan">{children}</p>;
}

function PrimaryButton({ className = "", label = CTA.label }: { className?: string; label?: string }) {
  return (
    <a
      href={CTA.href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-4 font-semibold text-night shadow-[0_10px_30px_-10px_rgb(199_131_74/0.7)] hover:bg-clay-deep ${className}`}
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: React.ReactNode; intro?: string; id?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-mist">{intro}</p>}
    </div>
  );
}

/** A browser window with a real screenshot. */
function Screen({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-night-2 px-3 py-2" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <Image src={src} alt={alt} width={1600} height={1000} sizes={sizes} priority={priority} className="h-auto w-full" />
    </div>
  );
}

/** A phone with a real screenshot, cropped to the first screen. */
function Phone({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-[#0d0b08] bg-[#0d0b08] ring-1 ring-white/10">
      <Image src={src} alt={alt} width={600} height={1299} sizes={sizes} priority={priority} className="aspect-[390/780] h-auto w-full rounded-[1.25rem] object-cover object-top" />
    </div>
  );
}

/**
 * A still 3D scene: a site and its phone version set at different depths in perspective, with real shadows.
 * Nothing moves. `side` picks which way it turns.
 */
function DepthPair({
  image,
  phone,
  side = "left",
}: {
  image: { src: string; alt: string };
  phone?: { src: string; alt: string };
  side?: "left" | "right";
}) {
  const turn = side === "left" ? "[transform:rotateY(-16deg)_rotateX(5deg)]" : "[transform:rotateY(16deg)_rotateX(5deg)]";
  return (
    <div className="[perspective:1600px]">
      <div className={`relative [transform-style:preserve-3d] ${turn}`}>
        <div className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)]">
          <Screen src={image.src} alt={image.alt} sizes="(min-width: 1024px) 560px, 92vw" />
        </div>
        {phone && (
          <div
            className={`absolute -bottom-[12%] w-[25%] shadow-[0_40px_60px_-20px_rgb(0_0_0/0.9)] [transform:translateZ(90px)] ${side === "left" ? "-right-[3%]" : "-left-[3%]"}`}
          >
            <Phone src={phone.src} alt={phone.alt} sizes="150px" />
          </div>
        )}
      </div>
      <div aria-hidden className="mx-auto mt-12 h-6 w-[78%] rounded-[50%] bg-black/45 blur-xl" />
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const kaylee = TESTIMONIALS[0];
  const [duggans, daily, santa] = CONCEPTS;
  return (
    <section id="top" className="grain relative overflow-x-clip pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_78%_40%,rgb(199_131_74/0.16),transparent_70%),radial-gradient(40%_40%_at_0%_0%,rgb(111_133_98/0.18),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-6 lg:pb-28">
        <div>
          <Eyebrow>Websites for local businesses</Eyebrow>
          <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[4rem]">
            Turn the people looking you up into <span className="text-clay">orders and bookings</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            I design and build websites for cafés, spas, gyms and shops, with online ordering and booking built in.
            See your new homepage <strong className="font-semibold text-fog">free</strong>, before you spend a dollar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton label="Get my free mockup" />
            <a href="#work" className="inline-flex items-center justify-center rounded-full border border-line px-7 py-4 font-medium hover:border-fog/40">
              See before &amp; after
            </a>
          </div>
          <p className="mt-4 text-sm text-mist">No cost and no obligation. I usually reply within a day.</p>

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

        {/* Still 3D stack of three real concept sites at different depths. Nothing moves. */}
        <div className="relative mx-auto w-full max-w-[560px] pt-[8%] [perspective:1800px] lg:-mr-12 lg:max-w-none">
          <div className="relative [transform-style:preserve-3d] [transform:rotateY(-20deg)_rotateX(8deg)]">
            <div className="absolute -top-[16%] left-[18%] w-[80%] opacity-80 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] [transform:translateZ(-180px)]">
              <Screen src={santa.image.src} alt="" sizes="(min-width: 1024px) 440px, 70vw" />
            </div>
            <div className="relative w-[88%] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.9)]">
              <Screen src={daily.image.src} alt={daily.image.alt} sizes="(min-width: 1024px) 520px, 80vw" priority />
            </div>
            <div className="absolute -bottom-[18%] right-0 w-[27%] shadow-[0_40px_60px_-20px_rgb(0_0_0/0.95)] [transform:translateZ(120px)]">
              <Phone src={duggans.phone.src} alt={duggans.phone.alt} sizes="150px" priority />
            </div>
          </div>
          <div aria-hidden className="mx-auto mt-12 h-8 w-[75%] lg:mt-16 rounded-[50%] bg-black/55 blur-2xl" />
        </div>
      </div>

      <div className="relative border-y border-line bg-night-2">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-4 py-6 text-sm text-mist sm:px-6 lg:grid-cols-4">
          {[
            "7 sites designed since October 2026",
            "Online ordering & booking built in",
            "Fast on every phone",
            "Live Shopify store for Sacred Creations",
          ].map((v) => (
            <li key={v} className="flex items-center gap-2.5">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    {
      title: "They can't find you",
      body: "No website, or one nobody has touched in years, and a hungry customer picks the place down the street that has one.",
    },
    {
      title: "They can't order or book",
      body: "If the only way in is a phone call during business hours, you lose everyone who decides at 10 p.m. or while standing in someone else's line.",
    },
    {
      title: "They don't trust what they see",
      body: "Old notices, broken pages or a “not secure” warning make people wonder if you're still open.",
    },
  ];
  return (
    <section aria-labelledby="problem-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
      <SectionHead
        id="problem-title"
        eyebrow="Why it matters"
        title="Your website is the first visit."
        intro="Most customers look you up before they walk in. Here's where local businesses quietly lose them."
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title} className="rounded-3xl border border-line bg-night-2 p-7">
            <span className="font-display text-sm font-medium text-clay">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.01em]">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-mist">{it.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Concepts() {
  return (
    <section id="work" className="border-t border-line bg-night-2">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <SectionHead
          eyebrow="Before & after"
          title="Five local businesses, rebuilt to sell"
          intro="Concept sites I built for real New Mexico businesses with no website or a broken one. Same business, now with a clear way to order or book."
        />
        <div className="mt-16 grid gap-24 lg:gap-32">
          {CONCEPTS.map((c, i) => (
            <ConceptRow key={c.slug} concept={c} flip={i % 2 === 1} />
          ))}
        </div>
        <div className="mt-24 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-clay/20 via-sage/10 to-transparent p-8 ring-1 ring-clay/25 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Want to see yours?</p>
            <p className="mt-2 text-mist">I&apos;ll build your homepage mockup the same way, free.</p>
          </div>
          <PrimaryButton label="Get my free mockup" />
        </div>
      </div>
    </section>
  );
}

function ConceptRow({ concept: c, flip }: { concept: Concept; flip: boolean }) {
  return (
    <article id={`concept-${c.slug}`} className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <DepthPair image={c.image} phone={c.phone} side={flip ? "right" : "left"} />
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="text-sm text-mist">Concept · {c.place}</p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{c.name}</h3>
        <dl className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-line bg-night p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Before</dt>
            <dd className="mt-2 leading-relaxed text-mist">{c.before}</dd>
          </div>
          <div className="rounded-2xl border border-sage/50 bg-sage/15 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5c9a8]">After</dt>
            <dd className="mt-2 leading-relaxed text-fog">{c.after}</dd>
          </div>
        </dl>
        {c.href && (
          <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-clay underline-offset-4 hover:underline">
            Try the live demo <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

function ClientWork() {
  return (
    <section aria-labelledby="client-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHead id="client-title" eyebrow="Case studies" title="Built for real brands" />
      <div className="mt-16 grid gap-24 lg:gap-32">
        {PROJECTS.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectFeature({ project: p, flip }: { project: Project; flip: boolean }) {
  return (
    <article id={`work-${p.slug}`} className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <DepthPair image={p.image} phone={p.phone} side={flip ? "right" : "left"} />
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="text-sm text-mist">{p.label}</p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{p.name}</h3>
        <p className="mt-4 leading-relaxed text-mist">{p.summary}</p>
        <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-fog/80">What I built</h4>
        <ul className="mt-3 grid gap-3">
          {p.built.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-clay underline-offset-4 hover:underline">
              {l.label} <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Process() {
  return (
    <section id="process" className="border-y border-line bg-night-2">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <SectionHead eyebrow="How it works" title="See it first. Decide after." intro="You never pay for something you haven't seen." />
        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <li key={s.title} className={`relative rounded-3xl border p-7 sm:p-8 ${i === 0 ? "border-clay/50 bg-clay/10" : "border-line bg-night"}`}>
              <span className={`font-display text-6xl font-bold ${i === 0 ? "text-clay/70" : "text-white/15"}`}>{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <PrimaryButton label="Start with step 1, free" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHead id="testimonials-title" eyebrow="What people say" title="Kind words" />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="flex flex-col justify-between rounded-3xl border border-line bg-night-2 p-7 sm:p-9">
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
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-night-2">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
        <div>
          <SectionHead eyebrow="Questions" title="Before you ask" />
          <p className="mt-4 text-mist">
            Something else on your mind?{" "}
            <a href="#contact" className="font-semibold text-clay underline-offset-4 hover:underline">
              Just ask me.
            </a>
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold tracking-[-0.01em] sm:text-xl">
                {f.q}
                <span aria-hidden className="text-2xl font-normal text-clay group-open:hidden">+</span>
                <span aria-hidden className="hidden text-2xl font-normal text-clay group-open:inline">−</span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-mist">{f.a}</p>
            </details>
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
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">Greetings, I&apos;m {PERSON.shortName}</h2>
          <p className="mt-6 text-lg leading-relaxed text-mist">
            I run small businesses myself, so I know what it&apos;s like to want more customers without more hours in
            the day. I design the site, build the ordering and booking, and stay your one point of contact.
          </p>
          <p className="mt-4 leading-relaxed text-mist">{OVERVIEW}</p>
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-fog/80">Web work</h3>
          <ol className="mt-6 border-l border-line">
            {EXPERIENCE.map((job) => (
              <li key={job.title} className="relative pb-9 pl-7 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-clay" />
                <p className="text-sm text-mist">{job.dates}</p>
                <h4 className="mt-1 font-display text-xl font-bold tracking-[-0.01em]">{job.title}</h4>
                <p className="text-mist">{job.company}</p>
                <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-mist">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mist" />
                      {pt}
                    </li>
                  ))}
                </ul>
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
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_100%,rgb(199_131_74/0.16),transparent_70%),radial-gradient(40%_50%_at_100%_0%,rgb(111_133_98/0.16),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <div>
          <Eyebrow>Free homepage mockup</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">See your new site before you spend a dollar.</h2>
          <p className="mt-5 text-lg leading-relaxed text-mist">
            Tell me your business name and what you want more of. I&apos;ll design your homepage and send it to you.
          </p>
          <ul className="mt-8 grid gap-3 text-[15px]">
            {["No cost, no obligation", "Built with your real photos and details", "A reply within about a day"].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/25 text-xs text-[#b5c9a8]">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-night-2/90 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line pb-24 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {PERSON.name}. {PERSON.role}.
        </p>
        <a href={CTA.href} className="font-semibold text-clay hover:underline">
          {CTA.label}
        </a>
      </div>
    </footer>
  );
}

/** Phones: the offer stays one thumb away. */
function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-night/95 px-4 py-3 backdrop-blur md:hidden">
      <a href={CTA.href} className="flex w-full items-center justify-center gap-2 rounded-full bg-clay py-3.5 font-semibold text-night">
        Get my free mockup <span aria-hidden>→</span>
      </a>
    </div>
  );
}

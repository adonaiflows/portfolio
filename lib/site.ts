// Every fact on the site lives here. Text marked "verbatim" is copied word for word from
// Adonai's previous portfolio (adonairomero.onrender.com). Never invent testimonials,
// prices or stats: add a TODO instead.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const PERSON = {
  name: "Adonai Romero",
  shortName: "Adonai",
  role: "Web designer & full stack developer",
};

export const NAV = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About" },
];

// One offer, repeated everywhere: a free homepage mockup before any money changes hands.
// TODO(Adonai): confirm you're happy offering this free mockup publicly.
export const CTA = { href: "#contact", label: "Get a free mockup" };

// Contact form delivery (same EmailJS service the previous portfolio used; these are public client-side ids).
export const EMAILJS = {
  serviceId: "service_osm5jy4",
  templateId: "template_zb4rwa2",
  publicKey: "0CHTE3Yoa5hPJ5mgc",
  toName: "Adonai",
  toEmail: "adonai.devs@gmail.com",
};

export type Project = {
  slug: string;
  name: string;
  label: string;
  summary: string;
  built: string[];
  stack: string[];
  image: { src: string; alt: string };
  phone?: { src: string; alt: string };
  detail?: { src: string; alt: string };
  links: { href: string; label: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "sacred-creations",
    name: "Sacred Creations",
    label: "Client · Skincare brand · Albuquerque, NM",
    summary:
      "A one-product skincare brand selling Liquid Gold, a handmade frankincense face oil. The goal: make a single bottle feel worth $66 and send every visitor straight to checkout.",
    built: [
      "Editorial, photo-led site built around the brand's real product photography",
      "Drag-to-turn bottle viewer made from 40 product frames, so shoppers can see the label up close",
      "Custom Shopify theme for the live store, with a one-tap buy button repeated through the page",
    ],
    stack: ["Next.js", "Three.js", "Shopify Liquid", "Tailwind"],
    image: {
      src: "/work/sc-home.webp",
      alt: "Sacred Creations home page: two bottles of Liquid Gold oil on sandstone with the headline Deep hydration, made with intention",
    },
    phone: {
      src: "/work/sc-home-phone.webp",
      alt: "Sacred Creations home page on a phone",
    },
    detail: {
      src: "/work/sc-product.webp",
      alt: "Liquid Gold product page with a bottle in a limewash niche and a drag to turn control",
    },
    links: [{ href: "https://sacredcreations.shop", label: "Visit the live store" }],
  },
  {
    slug: "yes-organics",
    name: "Yes Organic Boutique & Spa",
    label: "Concept redesign · Spa & nail boutique · Albuquerque, NM",
    summary:
      "An unsolicited redesign for an organic spa and natural nail boutique, showing how their site could turn more visitors into booked appointments.",
    built: [
      "A Book Now chooser that sends guests to the right booking page for the spa or the nail boutique",
      "Their full apothecary catalogue, 97 products, brought into one searchable shop page",
      "A calm 3D herbal-drop hero that loads after the headline and button, never before",
    ],
    stack: ["Next.js", "React Three Fiber", "Tailwind", "Square"],
    image: {
      src: "/work/yo-home.webp",
      alt: "Yes Organic home page concept with the headline Organic facials, natural nails and massage and a 3D herbal drop",
    },
    phone: {
      src: "/work/yo-home-phone.webp",
      alt: "Yes Organic home page concept on a phone",
    },
    links: [{ href: "https://yes-organics.vercel.app", label: "View the live demo" }],
  },
];

export type Concept = {
  slug: string;
  name: string;
  place: string;
  before: string; // what we saw on Nov 22, 2026 (Google Maps + their current site)
  after: string;
  image: { src: string; alt: string };
  phone: { src: string; alt: string };
  href?: string; // TODO: add each Vercel demo link once Adonai imports adonaiflows/prospect-demos
};

// Five concept sites for local businesses that are not clients (adonaiflows/prospect-demos).
// "Before" facts come from the demos' README, checked on Google Maps and the live sites on Nov 22, 2026.
export const CONCEPTS: Concept[] = [
  {
    slug: "duggans-coffee",
    name: "Duggan's Coffee",
    place: "Coffee & breakfast · Albuquerque (UNM)",
    before: "No website, despite 390+ Google reviews.",
    after: "Order ahead from a phone, pick a pickup time, and walk in to a hot cup.",
    image: { src: "/work/duggans-coffee-order-d.webp", alt: "Duggan's Coffee concept order page with the headline Skip the line. Keep the plate." },
    phone: { src: "/work/duggans-coffee-p.webp", alt: "Duggan's Coffee concept home page on a phone" },
  },
  {
    slug: "daily-rituals",
    name: "Daily Rituals",
    place: "Café & gift shop · Albuquerque (Nob Hill)",
    before: "No website for a new café rated 4.9 on Google.",
    after: "Order-ahead coffee plus a separate gift-shop bag, in the café's real colors and photos.",
    image: { src: "/work/daily-rituals-d.webp", alt: "Daily Rituals concept home page with the headline A daily ritual, poured slow" },
    phone: { src: "/work/daily-rituals-order-p.webp", alt: "Daily Rituals concept order page on a phone" },
  },
  {
    slug: "santa-cecilia",
    name: "Santa Cecilia",
    place: "Patio café · Albuquerque (Old Town)",
    before: "No website and no phone number listed anywhere.",
    after: "Hours, directions and order-ahead pickup, one tap from the first screen.",
    image: { src: "/work/santa-cecilia-d.webp", alt: "Santa Cecilia concept home page with the headline Coffee on the patio in Old Town" },
    phone: { src: "/work/santa-cecilia-order-p.webp", alt: "Santa Cecilia concept order page on a phone" },
  },
  {
    slug: "banya-spa",
    name: "Massage & Banya Spa",
    place: "Banya & massage · Santa Fe",
    before: "A default WordPress site still showing pandemic notices.",
    after: "A calm walkthrough of how a session works, so first-timers feel ready to call and book.",
    image: { src: "/work/banya-spa-d.webp", alt: "Banya Spa concept home page with the headline Heat, cold, rest. The banya, in Santa Fe." },
    phone: { src: "/work/banya-spa-p.webp", alt: "Banya Spa concept home page on a phone" },
  },
  {
    slug: "x-tactics",
    name: "X-Tactics",
    place: "Training & performance · Rio Rancho",
    before: "A broken template site with no secure connection.",
    after: "A free-consult button up front and memberships laid out plainly.",
    image: { src: "/work/x-tactics-d.webp", alt: "X-Tactics concept home page with the headline Train with 27 years of military and law-enforcement experience" },
    phone: { src: "/work/x-tactics-p.webp", alt: "X-Tactics concept home page on a phone" },
  },
];

export const SERVICES = [
  {
    title: "Websites for local businesses",
    body: "Spas, salons, studios and shops. Clear about what you offer, quick on any phone, and built so a visitor knows the next step in seconds.",
  },
  {
    title: "Online stores",
    body: "Shopify themes and product pages that let your photos sell, with a buy button that is never more than a thumb away.",
  },
  {
    title: "Booking & lead flows",
    body: "Book Now buttons wired to the booking tools you already use, plus short contact forms that land straight in your inbox.",
  },
  {
    title: "3D & interactive showcases",
    body: "Product turntables and 3D scenes that make people stop scrolling, built to load fast and fall back gracefully on older phones.",
  },
];

// The four skill cards from the previous portfolio, kept verbatim.
export const SKILLS = ["Full Stack Developer", "API Developer", "Database Management", "Deployment and Maintenance"];

export const PROCESS = [
  {
    title: "Free homepage mockup",
    body: "Tell me about your business. I design your new homepage with your real photos and details, and you see it before you spend anything.",
  },
  {
    title: "Design and build, in the open",
    body: "You get a live preview link from the first week and see every change as it happens, so there are no surprises at launch.",
  },
  {
    title: "Launch and care",
    body: "I handle the domain, hosting and launch, then keep the site fast, secure and up to date.",
  },
];
// TODO: pricing / packages. Add only real numbers Adonai confirms.

// Answers to the usual objections. TODO(Adonai): confirm each answer matches how you work.
export const FAQ = [
  {
    q: "What does a website cost?",
    a: "It depends on the pages and features you need, like online ordering or booking. You get a clear quote before any work starts, and the homepage mockup is free either way.",
  },
  {
    q: "Is the mockup really free?",
    a: "Yes. If you don't love it, you walk away and owe nothing.",
  },
  {
    q: "How long does it take?",
    a: "Your mockup comes first. After you say yes, you get a live preview link and watch the site come together, so you always know where things stand.",
  },
  {
    q: "Can customers order or book online?",
    a: "Yes. That's the point of most sites I build: order-ahead with pickup times for cafés, and Book Now buttons wired to the booking tool you already use.",
  },
  {
    q: "Do I own the site?",
    a: "Yes. Your domain and your site are yours.",
  },
  {
    q: "What do you need from me?",
    a: "A short conversation, your logo if you have one, and any photos you like. I can work from what's already on your Google listing to start.",
  },
];

// Verbatim from the previous portfolio.
export const TESTIMONIALS = [
  {
    quote:
      "Working with Adonai is always such a pleasure, he quickly accomplishes any given tasks efficiently. He navigates spontaneous tasks with ease and delivers a beautiful outcome. He adds a unique atmosphere to anywhere he works that makes him a very valuable addition to any project/team.",
    name: "Kaylee",
    role: "CEO of Adonai & Kaylee | Holistic Wellness",
    photo: "/people/kaylee.webp",
  },
  {
    quote:
      "Adonai is a dedicated and creative individual who consistently demonstrated excellent communication and collaboration skills. His ability to translate conceptual ideas into functional solutions, as seen in his innovative yoga app capstone project, truly sets him apart.",
    name: "Travis Peck",
    role: "Instructor of Coding Temple",
    photo: "/people/travis.webp",
  },
];

// Verbatim from the previous portfolio.
export const OVERVIEW =
  "In the dynamic realm of software development, my expertise in Python, React.js, and building RESTful APIs fuels innovation. With meticulous debugging skills honed through hands-on experience, I swiftly navigate challenges across the full stack. Versatile and collaborative, I facilitate cohesive teamwork, driving the realization of robust, scalable software solutions that exceed expectations.";

// Web work timeline. Coding Temple and Adonai & Kaylee lines are verbatim from the previous portfolio.
export const EXPERIENCE = [
  {
    title: "Five concept sites for local businesses",
    company: "Duggan's Coffee, Daily Rituals, Santa Cecilia, Massage & Banya Spa, X-Tactics",
    dates: "November 2026",
    points: [
      "Checked each business on Google Maps and on its current site, then built a concept that fixes what was costing them customers.",
      "Online ordering with pickup times for the three cafés; clear booking paths for the spa and the gym.",
    ],
  },
  {
    title: "Concept redesign",
    company: "Yes Organic Boutique & Spa",
    dates: "October 2026 - November 2026",
    points: [
      "Multi-page Next.js site with a 3D hero, a Book Now chooser for the spa and nail boutique, and a 97-product shop page.",
    ],
  },
  {
    title: "Website & Shopify theme",
    company: "Sacred Creations",
    dates: "October 2026 - Present",
    points: [
      "Designed and built the Liquid Gold site around the brand's own photography, with a drag-to-turn bottle viewer.",
      "Ported it to a custom Shopify theme that now runs the live store.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Coding Temple",
    dates: "February 2024 - Present",
    points: [
      "Developed and maintained robust, scalable web applications utilizing a full stack of technologies including HTML, Python, React, and Flask.",
      "Created dynamic and responsive UIs using React, focusing on enhancing user engagement and interaction, while implementing server-side logic and routing using Flask, ensuring smooth data flow and efficient request handling.",
    ],
  },
  {
    title: "Facilitator | CEO",
    company: "Adonai & Kaylee | Holistic Wellness",
    dates: "July 2022 - Present",
    points: ["Enhanced our digital presence through website development, optimizing user experience and operations."],
  },
];

// From the previous portfolio's tech grid, plus the tools used on the client work above.
export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Three.js",
  "Tailwind CSS",
  "Shopify Liquid",
  "Node.js",
  "Python",
  "Flask",
  "MongoDB",
  "HTML",
  "CSS",
  "Swift",
  "Git",
];

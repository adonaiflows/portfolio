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
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export const CTA = { href: "#contact", label: "Start a project" };

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

// Verbatim from the previous portfolio.
export const LEGACY_PROJECT = {
  name: "Blissful Balance Yoga",
  summary:
    "Web-based platform that allows users to create, retrieve, update, and delete a user and posts. Utilizes user authentication and authorization to ensure secure access to the platform.",
  tags: ["react", "python", "flask"],
  image: {
    src: "/work/blissful-balance.webp",
    alt: "Blissful Balance Yoga app showing a feed of community posts over a beach photo",
  },
};

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
    title: "A free call and site review",
    body: "We talk through your business and your current site, and I show you where visitors drop off before they book or buy.",
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

// Verbatim from the previous portfolio.
export const EXPERIENCE = [
  {
    title: "Software Engineer Intern",
    company: "Coding Temple",
    dates: "February 2024 - Present",
    points: [
      "Developed and maintained robust, scalable web applications utilizing a full stack of technologies including HTML, Python, React, and Flask.",
      "Leveraged Python to design and implement RESTful APIs, facilitating communication between the front-end and back-end systems.",
      "Created dynamic and responsive UIs using React, focusing on enhancing user engagement and interaction, while implementing server-side logic and routing using Flask, ensuring smooth data flow and efficient request handling.",
    ],
  },
  {
    title: "Facilitator | CEO",
    company: "Adonai & Kaylee | Holistic Wellness",
    dates: "July 2022 - Present",
    points: [
      "Juggled multiple roles to ensure the seamless operation of the establishment.",
      "Focused on client satisfaction, I oversaw operations, led teams, and formed strategic partnerships.",
      "Enhanced our digital presence through website development, optimizing user experience and operations.",
      "Honed my skills in project management, problem-solving, and adaptability.",
    ],
  },
  {
    title: "Case Analyst II",
    company: "Cognosante MVH, LLC",
    dates: "January 2018 - August 2022",
    points: [
      "Identifying and remediating consumer data issues related to health insurance exchange coverage.",
      "Apply appropriate research and technical knowledge to resolve outstanding issues in a timely and accurate manner.",
      "Responsible for making outbound calls to gather additional information as well as inform the consumer of the disposition of their care.",
    ],
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

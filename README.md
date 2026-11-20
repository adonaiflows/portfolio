# Adonai Romero portfolio

Personal site presenting Adonai as a web designer and developer for local businesses.
Next.js (App Router) + TypeScript + Tailwind, with a lazy-loaded react-three-fiber hero.

- `npm run dev` / `npm run build` / `npm run lint`
- All copy and facts live in `lib/site.ts`. Text from the previous portfolio is kept verbatim there.
- Hero 3D (`components/three/ScreensScene.tsx`) loads only on wide screens with a fine pointer and no
  reduced-motion preference; everyone else sees the static collage in `components/ui/HeroStage.tsx`.
- Contact form posts to EmailJS (same service and template as the old site).
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once the final domain is known (used for canonical/OG/sitemap).

## Open TODOs
- Pricing or packages (none shown until confirmed).
- Analytics: the form pushes a `generate_lead` event to `dataLayer`; connect Vercel Analytics or GA4.
- A headshot for the About section, if wanted.

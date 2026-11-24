# Adonai Romero portfolio

Personal site presenting Adonai as a web designer and developer for local businesses.
Next.js (App Router) + TypeScript + Tailwind. No JavaScript animation and no WebGL: the 3D look is
still CSS perspective (real screenshots set at different depths), so nothing moves on its own.

- `npm run dev` / `npm run build` / `npm run lint`
- All copy and facts live in `lib/site.ts`. Text from the previous portfolio is kept verbatim there.
- Page order follows a conversion flow: offer + free mockup CTA, problem, before/after concepts, case
  studies, process, testimonials, FAQ, about, form. A sticky CTA bar shows on phones.
- Concept screenshots in `public/work/` come from adonaiflows/prospect-demos (hero switcher hidden).
- Contact form posts to EmailJS (same service and template as the old site).
- Set `NEXT_PUBLIC_SITE_URL` in Vercel once the final domain is known (used for canonical/OG/sitemap).

## Open TODOs
- Confirm the free homepage mockup offer and the FAQ answers (`CTA`, `FAQ` in `lib/site.ts`).
- Pricing or packages (none shown until confirmed).
- Analytics: the form pushes a `generate_lead` event to `dataLayer`; connect Vercel Analytics or GA4.
- A headshot for the About section, if wanted.
- Live links for the five concept sites (add `href` in `CONCEPTS` once each is on Vercel).

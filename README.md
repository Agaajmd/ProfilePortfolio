# Agaaa Portfolio

Personal portfolio website built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- English/Indonesian language toggle (client-side i18n)
- Dark and light mode support
- Responsive one-page portfolio layout
- Work showcase with project-specific share pages
- Social preview image per project URL
- SEO-ready metadata, sitemap, robots, and structured data
- Optimized for mobile scrolling and smoother interactions

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Embla Carousel

## Project Structure

- `app/` route files, metadata routes, and dynamic share pages
- `components/` UI sections and reusable components
- `lib/` shared data (`projects.ts`) and utilities
- `public/` static assets (CV, photos, project images)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Start production server

```bash
npm run start
```

## i18n (EN / ID)

Language logic is handled in:

- `components/language-provider.tsx`
- `components/language-toggle.tsx`

Notes:

- Current implementation is client-side language switching.
- Selected language is persisted in `localStorage` key: `portfolio-lang`.

## SEO Setup

Global SEO config:

- `app/layout.tsx`

SEO routes:

- `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`
- `app/opengraph-image.png`
- `app/twitter-image.png`

Project share SEO:

- `app/work/[slug]/page.tsx`
- `app/work/[slug]/opengraph-image.tsx`

Each `/work/[slug]` route has dedicated Open Graph/Twitter metadata and image preview.

## Social Share Behavior

In project cards:

- Desktop: Share button with icon + text
- Mobile: Share icon-only button in top-right card corner

Share URL format:

- `https://nurjagadmuhammaddani.vercel.app/work/[slug]`

## Performance Notes

Key optimizations implemented:

- Heavy animated background disabled on mobile
- Throttled scroll handling with `requestAnimationFrame`
- Passive scroll listeners for smoother interactions
- Lower image quality settings for card/carousel media
- AVIF/WebP image format optimization in Next.js config

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Deploy.
4. Re-check SEO endpoints:
   - `/robots.txt`
   - `/sitemap.xml`
   - `/manifest.webmanifest`

## Troubleshooting

### Shared link preview image does not update

- Social platforms cache previews aggressively.
- Re-scrape using platform debuggers after deploy:
  - Facebook Sharing Debugger
  - LinkedIn Post Inspector
  - X Card Validator

### Project image not showing

- Verify exact filename and case sensitivity in `public/WORK/` and `lib/projects.ts`.

## Author

Nur Jagad Muhammad Dani

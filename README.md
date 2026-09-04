# Uncommon Kitchen (Next.js)

Technique-forward recipe site for **Uncommon Kitchen** — Next.js 15 App Router, TypeScript, and Tailwind CSS. Pages are SSR/SSG by default for Google indexing.

Brand: teal `#0F6B5C`, Inter, white background. Layout matches the finalized HTML mockups in `recipe-mockups/sites/v3-blend/`.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Static generation for recipes + category hubs (`generateStaticParams`)
- `generateMetadata`, `sitemap.ts`, `robots.ts`
- Security headers in `next.config.ts`

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (no phone mocks) |
| `/recipes` | Recipe index + filters |
| `/recipes/[slug]` | Recipe detail |
| `/shop` | Kits & gear |
| `/chef` | Chef AI mock chat |
| `/about` | About |
| `/categories` | Pillar hub |
| `/categories/{continent\|country\|type\|diet-occasion}` | Pillar indexes |
| `/categories/.../[slug]` | Category landing pages |

Seed data lives in `data/taxonomy.ts` and `data/recipes.ts` (includes `smoked-honey-duck-with-fermented-plum`).

## Local development (Node package manager)

```bash
cd uncommon-kitchen-next
npm install
npm run dev
```

Production:

```bash
npm install
npm run build
npm start
```

## Local development (Bun)

```bash
cd uncommon-kitchen-next
bun install          # or: the Node package manager install command
bun run dev          # or: run the `dev` script
```

Open http://localhost:3000

Production build:

```bash
bun install
bun run build
bun run start
```

Equivalent Node package manager commands also work (`install`, then `run build`, then `run start`).

Optional env:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deploy on Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repo (or import the directory).
2. In Vercel, **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Root directory: this project folder.
4. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://uncommonkitchen.com`).
5. Deploy. Vercel installs dependencies and runs the production build automatically.

After deploy, confirm:

- `/sitemap.xml` and `/robots.txt`
- Recipe and category URLs return `200`
- Security headers via browser Network inspector

## SEO & GEO

Default rendering is static/SSR (route pages are Server Components; only widgets use client components). Helpers live in `lib/seo/`.

### Metadata

- `buildPageMetadata({ title, description, path, image? })` sets absolute canonical, Open Graph (`url` + images), and Twitter cards.
- Layout `metadataBase` is `SITE_URL` (`NEXT_PUBLIC_SITE_URL` or `https://uncommonkitchen.com`).
- Homepage uses an absolute title (no `| Uncommon Kitchen` suffix) and canonical `/`.
- Recipe pages add `keywords` from type / country / continent / diet-occasion tags.

### JSON-LD (schema.org)

`JsonLd` is a server component that stringifies safely (escapes `<` / `>` / `&` to block script breakout).

| Page | Types |
|------|--------|
| Layout (every page) | `Organization` + `WebSite` (SearchAction → `/recipes?q={search_term_string}`) |
| Home | `WebPage` + `ItemList` of featured recipes |
| `/recipes` | `CollectionPage` + `ItemList` |
| `/recipes/[slug]` | `Recipe` (HowToStep, ISO-8601 times, aggregateRating) + `BreadcrumbList` + `WebPage` |
| Category hubs / slugs | `CollectionPage` + `BreadcrumbList` |
| About | `AboutPage` |
| Shop | `WebPage` + `Store` |
| Chef | `WebPage` |

Nutrition is omitted when not present. Recipe URLs, images, and canonicals are absolute.

### Generative engine optimization

- `public/llms.txt` — plain-text site summary, entities, routes, and content principles for AI crawlers.
- `app/robots.ts` allows `*`, plus GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, and Google-Extended.
- `app/sitemap.ts` lists static pages, recipes, and all category hubs/slugs.
- Recipe HTML always includes an H1, meta description, and a visible **Why this recipe works** section.

After deploy, confirm `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and a recipe page contains `application/ld+json` with `"@type":"Recipe"`.

## License

Private / all rights reserved unless otherwise noted.

# Karina Elizondo Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page bilingual portfolio landing page for audiovisual producer Karina Disondo using the Ochre & Clay design variation.

**Architecture:** Astro static site with Tailwind CSS for styling. Sanity headless CMS for content management (Karina edits projects via Sanity Studio). Video.js modal for YouTube embeds; Instagram reels open externally. Bilingual (ES/EN) via Sanity i18n fields.

**Tech Stack:** Astro 5, Tailwind CSS 4, Sanity v3, Video.js 8, TypeScript

---

## Color Palette — Ochre & Clay

| Token | Hex | Usage |
|---|---|---|
| `--bg-page` | `#FAF3EB` | Page background (warm cream) |
| `--bg-dark` | `#2C2420` | Hero, CTA button, dark surfaces |
| `--bg-video-placeholder` | `#E6D9C8` | Video thumbnail slots |
| `--text-primary` | `#3A2E24` | Headlines, high-emphasis |
| `--text-secondary` | `#5B4D40` | Body text, descriptions |
| `--text-tertiary` | `#786A5C` | Social icons, supporting |
| `--text-muted` | `#8C7D6E` | Captions, low-emphasis |
| `--text-white` | `#FFFFFF` | On dark surfaces |
| `--accent-ochre` | `#C4953A` | Project numbers, gold accent |
| `--accent-sienna` | `#9E5A3C` | Links, interactive elements |
| `--border-warm` | `#D4C4AB` | Ruled lines, dividers |

## Typography

| Role | Font | Size | Weight | Spacing |
|---|---|---|---|---|
| Hero name / Project titles | Playfair Display | 72px / 36px | 400 (regular) | 0.5px |
| Role subtitle | IBM Plex Mono | 13px | 500 (medium) | 3px |
| Body / Descriptions | Geist | 15px | 400 (regular) | 0 |
| Labels / Links / CTA | IBM Plex Mono | 11-13px | 500 (medium) | 1.5-2px |
| Tagline | IBM Plex Mono | 12px | 400 (regular) | 1.5px |

---

## Project Data (8 projects)

### 1. Mujeres Fuertes
- **Desc ES:** Dirección y Co-producción del documental. Material educativo sobre la prevención de violencia para inspirar a vivir en libertad.
- **Links:** Teaser (YouTube: `S7LNQHob1AY`), Documental Completo (YouTube: `S7LNQHob1AY`)
- **Media type:** YouTube

### 2. Recuperación Histórica Centro Científico Tropical
- **Desc ES:** Edición y musicalización para una serie de videos en homenaje a personas clave dentro del CCT.
- **Links:** Ana Baez (YouTube: `6FjA_as6UXU`), Vivienne Solís (YouTube: `3797QaUp3vU`), Katiana Completo (YouTube: `HyN3LsIS4Tk`), Teaser Katiana IG (Instagram: `/reel/DHBo510vS8y/`)
- **Media type:** YouTube + Instagram

### 3. Mujer Salvaje
- **Desc ES:** Grabación y Edición para el aftermovie del encuentro de highline femenino en las montañas del Valle Diamante, CR.
- **Links:** Mujer Salvaje II (Google Drive: `1ZfDQrP0cDI3bJjveYfg6Val3QhMfJbE4`), Versión Reel IG (Instagram: `/reel/DF0aNbLReEi/`)
- **Media type:** Google Drive + Instagram

### 4. Producers Trust
- **Desc ES:** Coordinación del equipo digital y creación de contenido en formato horizontal y vertical.
- **Links:** The Journey of Quinoa (YouTube: `uaI_5sYb754`), What is StoryBird (YouTube: `pXpoXD8k1F0`), Alaffia (YouTube: `03jLgAV0FlI`), IG (`@producersmarket`)
- **Media type:** YouTube + Instagram

### 5. Regenerative Homestead Blue Print
- **Desc ES:** Grabación y montaje para el video promocional de una propiedad en venta en La Alfombra, Pérez Zeledón, CR.
- **Links:** Promo video (YouTube: `OwBdLVUE9Jw`)
- **Media type:** YouTube

### 6. ESD Professionals
- **Desc ES:** Montaje de campaña para visibilizar la diversidad de personas instructoras de autodefensa bajo el método de la organización ESD.
- **Links:** Campaign video (Google Drive: `1c7O1Vxg8Cjc7NoKbyznwow-vk8fjfI4G`)
- **Media type:** Google Drive

### 7. Curso en Línea Mujeres Fuertes
- **Desc ES:** Producción completa del curso virtual de Autodefensa y Empoderamiento de Mujeres Fuertes.
- **Links:** Comprar Curso (Hotmart: `mujeresfuertes/M53477666S`)
- **Media type:** External link

### 8. Freelance en Reels
- **Desc ES:** Grabación y/o montaje de reels para diferentes artistas, emprendimientos y organizaciones.
- **Links:** Janzu (Instagram: `/reel/C6M3CqXxSET/`), Hilando Fino (Instagram: `/reel/CtH17SPLkLO/`), Coral Sintético (Instagram: `/reel/CNQPb8CBBjQ/`)
- **Media type:** Instagram

---

## Sanity Schema

### `project` document
```
- title (string, i18n: { es, en })
- slug (slug, i18n: { es, en })
- description (text, i18n: { es, en })
- order (number) — for manual sorting
- thumbnail (image) — project thumbnail/poster
- media: array of {
    title (string)
    url (url)
    type (string: "youtube" | "instagram" | "drive" | "external")
  }
- featured (boolean)
```

### `siteSettings` singleton
```
- heroName (string) — "Karina Elizondo"
- heroRole (string, i18n: { es, en })
- heroTagline (string, i18n: { es, en })
- heroVideo (file) — background video
- footerQuote (text, i18n: { es, en })
- colaboremosEmail (string)
- socialLinks: array of {
    platform (string: "instagram" | "twitter" | "linkedin")
    url (url)
  }
```

---

## Tasks

### Task 1: Scaffold Astro project with dependencies

**Files:**
- Create: Astro project at repo root
- `package.json` additions
- `astro.config.mjs`

**Step 1: Create Astro project**

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

**Step 2: Install dependencies**

```bash
npm install
npx astro add tailwind
npm install @sanity/client @sanity/image-url video.js
npm install -D @types/video.js
```

**Step 3: Configure Astro**

Update `astro.config.mjs`:
```ts
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://karinadisondo.com', // placeholder
});
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold astro project with tailwind, sanity, video.js"
```

---

### Task 2: Set up Tailwind with Ochre & Clay palette

**Files:**
- Modify: `src/styles/global.css`
- Create: `tailwind.config.mjs`

**Step 1: Configure Tailwind theme**

Create `tailwind.config.mjs` with the full Ochre & Clay color palette, font families (Playfair Display, IBM Plex Mono, Geist), and spacing tokens from the design.

**Step 2: Create global styles**

Set up `src/styles/global.css` with:
- Import Google Fonts (Playfair Display, IBM Plex Mono, Geist)
- CSS reset overrides for the editorial feel
- Base typography defaults
- Ruled-line utility class (1px warm beige border)
- Video.js modal overlay styles

**Step 3: Commit**

```bash
git add -A
git commit -m "style: configure tailwind with ochre & clay palette and typography"
```

---

### Task 3: Set up Sanity CMS

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/env.ts`
- Create: `sanity/schemas/project.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemas/index.ts`

**Step 1: Install Sanity in monorepo**

```bash
cd sanity
npx sanity@latest init --env
```

Or use `next-sanity` / `@sanity/vision` within the Astro project for embedded studio.

**Step 2: Define schemas**

Create `project` schema with i18n fields (title, description), order number, thumbnail image, and media array (title, url, type).

Create `siteSettings` singleton schema for hero content, footer quote, social links, colaboremos email.

**Step 3: Configure CORS and dataset**

Set up `sanity.config.ts` with project ID, dataset name, CORS origins for localhost and production domain.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: set up sanity schemas for projects and site settings"
```

---

### Task 4: Create base layout and language context

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/LanguageToggle.astro`
- Create: `src/context/LanguageContext.ts`

**Step 1: Create language context**

Build a lightweight client-side language switcher using Astro's `viewTransitions` and a `<script>` that stores locale in localStorage and toggles data attributes on `<html>`.

**Step 2: Create base layout**

```astro
---
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- Fonts, Video.js CSS -->
  </head>
  <body class="bg-[#FAF3EB] text-[#3A2E24] antialiased">
    <slot />
    <script>
      // Language toggle logic
      // Video.js modal logic
    </script>
  </body>
</html>
```

**Step 3: Create language toggle component**

Top-right positioned, monospace, `ES | EN` format matching design. Active language is full opacity, inactive is 40% opacity.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: create base layout with language toggle context"
```

---

### Task 5: Build Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/VideoModal.tsx` (React component for Video.js)

**Step 1: Build Hero component**

Full viewport height section with:
- Dark background (`#2C2420`) with optional background video
- Bottom gradient overlay (transparent → dark)
- Left-aligned: "Karina Elizondo" in Playfair Display 72px, "PRODUCTORA AUDIOVISUAL" in IBM Plex Mono 13px uppercase, tagline below
- Top-right: Language toggle
- Bottom-center: Chevron-down scroll indicator

**Step 2: Build VideoModal React component**

Video.js based modal:
- Overlay with dark backdrop
- Centers a 16:9 video player
- Supports YouTube URLs (via videojs-youtube plugin)
- Close button (X icon)
- ESC key to close
- Body scroll lock when open

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build hero section and video modal component"
```

---

### Task 6: Build Project section component

**Files:**
- Create: `src/components/ProjectSection.astro`
- Create: `src/components/VideoPlaceholder.astro`
- Create: `src/components/ProjectLinks.astro`

**Step 1: Build ProjectSection component**

Alternating layout:
- Odd projects: video left, text right
- Even projects: text left, video right
- Bottom ruled-line divider (`border-b border-[#D4C4AB]`)
- Vertical padding 60px, horizontal padding 120px
- Gap 60px between columns

**Step 2: Build VideoPlaceholder component**

- 16:9 aspect ratio container
- Warm beige background (`#E6D9C8`)
- Centered play icon (Lucide)
- On hover: subtle scale + shadow effect
- On click: opens VideoModal with project's first video URL

**Step 3: Build ProjectLinks component**

- Horizontal row of link chips
- IBM Plex Mono 11px uppercase, ochre/sienna color (`#9E5A3C`)
- 24px gap between links
- YouTube links → open modal
- Instagram links → open in new tab
- External links → open in new tab

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build project section with video placeholder and links"
```

---

### Task 7: Build Footer component

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Build Footer**

- Parchment background (same as page)
- Top ruled-line divider
- Centered layout, max-width 800px
- Playfair Display italic quote: "« Gratitud al reconocimiento »"
- Geist body paragraph: "Mi intención es mostrar..."
- "COLABOREMOS" CTA button: dark fill, monospace, mail icon, mailto link
- Social icons row: Instagram, Twitter/X, LinkedIn in tertiary text color

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: build footer with colaboremos CTA and social links"
```

---

### Task 8: Wire up Sanity data fetching

**Files:**
- Create: `src/lib/sanity.ts`
- Create: `src/lib/queries.ts`
- Modify: `src/pages/index.astro`

**Step 1: Create Sanity client**

```ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

**Step 2: Create GROQ queries**

- `getProjects(locale)` — fetch all projects ordered by `order`, return title/description in requested locale, media array, thumbnail
- `getSiteSettings(locale)` — fetch hero content, footer quote, social links in requested locale

**Step 3: Build index page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ProjectSection from '../components/ProjectSection.astro';
import Footer from '../components/Footer.astro';
import { client } from '../lib/sanity';
import { getProjects, getSiteSettings } from '../lib/queries';

const locale = 'es'; // default, client-side toggle
const projects = await client.fetch(getProjects(locale));
const settings = await client.fetch(getSiteSettings(locale));
---
<BaseLayout>
  <Hero settings={settings} />
  {projects.map((project, i) => (
    <ProjectSection project={project} index={i} />
  ))}
  <Footer settings={settings} />
</BaseLayout>
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire up sanity data fetching with index page"
```

---

### Task 9: Implement bilingual support

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/ProjectSection.astro`
- Modify: `src/components/Footer.astro`
- Create: `src/scripts/language.ts`

**Step 1: Implement language switching**

- Store locale in localStorage
- On toggle: re-fetch content from Sanity with new locale
- Use Astro's `data-*` attributes to render both languages in HTML, toggle visibility via CSS
- OR: Use client-side fetch to reload content without page reload

**Approach:** Since this is a single-page site, render both language versions in the HTML and toggle visibility. This avoids client-side Sanity fetches and works with SSG.

**Step 2: Update all components with i18n data attributes**

Each text element gets `data-lang-es` and `data-lang-en` attributes. The toggle script shows/hides based on active locale.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement bilingual ES/EN toggle"
```

---

### Task 10: Responsive design

**Files:**
- Modify: All components for mobile/tablet breakpoints

**Step 1: Hero responsive**
- Mobile: name 40px, padding 24px vertical
- Tablet: name 56px

**Step 2: Project sections responsive**
- Mobile: Stack vertically (video on top, text below), no alternating
- Tablet: Reduce gap, smaller padding

**Step 3: Footer responsive**
- Mobile: Stack centered, reduce padding
- Social icons: smaller gap

**Step 4: Test on 375px, 768px, 1440px**

```bash
npx astro dev
# Manual visual check at each breakpoint
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add responsive breakpoints for mobile and tablet"
```

---

### Task 11: Seed Sanity with project data

**Files:**
- Create: `sanity/seed-data/projects.json`

**Step 1: Create seed data**

Write all 8 projects with their ES/EN content, media URLs, and types into a JSON seed file. Import into Sanity via CLI or manually via Studio.

**Step 2: Verify in Sanity Studio**

Open Sanity Studio, confirm all 8 projects display correctly with media links.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: add sanity seed data for all 8 projects"
```

---

### Task 12: Final polish and verification

**Step 1: Visual comparison with .pen design**

Open the Pencil design side-by-side with the running site. Verify:
- Colors match the Ochre & Clay palette exactly
- Typography hierarchy matches (sizes, weights, spacing)
- Ruled-line dividers are 1px `#D4C4AB`
- Project alternating layout is correct
- Footer matches design

**Step 2: Test video modal**
- Click project 1 placeholder → YouTube modal opens
- Click Instagram link → opens in new tab
- Click close / ESC → modal closes

**Step 3: Test language toggle**
- Toggle ES → EN → verify all text switches
- Refresh page → verify locale persists from localStorage

**Step 4: Run build**

```bash
npx astro build
```
Expected: Exit code 0, no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "polish: final visual alignment and verification"
```

---

## Notes

- **Instagram reels** cannot be embedded in Video.js. They open in a new tab via `target="_blank"`.
- **Google Drive videos** need the `export/view` embed URL format for the modal.
- **Producers Trust** has two links with the same YouTube URL — verify with Karina if these are actually different videos.
- **Hotmart link** for Mujeres Fuertes course is an external product page, not a video.
- **Sanity Studio** can be embedded in the Astro site at `/admin` route for easy access.
- **Journey of Quinoa** confirmed as YouTube `uaI_5sYb754` (different from StoryBird `pXpoXD8k1F0`).

# Fotografía Gallery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add photo gallery preview section to home page + new /fotografia page with CSS masonry

**Architecture:** 
- Preview: Horizontal scroll row with 4-5 thumbnails below project sections
- Full page: CSS Columns masonry for responsive image grid
- Images loaded from public/photos/ directory using Astro's import.meta.glob

**Tech Stack:** Astro, Tailwind CSS, vanilla JS (no external libraries)

---

### Task 1: Create fotografia page with image loading

**Files:**
- Create: `src/pages/fotografia.astro`

**Step 1: Create fotografia page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getImage } from 'astro:assets';

const photos = import.meta.glob('/public/photos/*.webp', { eager: true });
const photoList = Object.values(photos).map((img: any) => ({
  src: img.src || '/photos/' + img.default.split('/').pop(),
  width: img.width,
  height: img.height
})).sort((a, b) => a.src.localeCompare(b.src));
---

<BaseLayout title="Fotografía — Karina Elizondo">
  <section class="py-20 px-6 md:px-[120px]">
    <h1 class="font-display text-[36px] md:text-[48px] text-text-primary mb-12" data-es>Fotografía</h1>
    <h1 class="font-display text-[36px] md:text-[48px] text-text-primary mb-12 hidden" data-en>Photography</h1>
    
    <div class="masonry">
      {photoList.map((photo) => (
        <img src={photo.src} alt="" loading="lazy" class="w-full mb-4" />
      ))}
    </div>
  </section>
</BaseLayout>

<style>
.masonry {
  column-count: 1;
  column-gap: 1rem;
}
.masonry img {
  break-inside: avoid;
}
@media (min-width: 640px) {
  .masonry { column-count: 2; }
}
@media (min-width: 1024px) {
  .masonry { column-count: 3; }
}
</style>
```

**Step 2: Test page renders**

Run: `npm run build && npm run preview`
Expected: /fotografia page loads with images in masonry

**Step 3: Commit**
```bash
git add src/pages/fotografia.astro
git commit -m "feat: add fotografia page with masonry gallery"
```

---

### Task 2: Add preview section to home page

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Add gallery preview section**

Add after ProjectSection mapping (before Footer):

```astro
<section class="py-16 px-6 md:px-[120px] border-b border-border-warm">
  <h2 class="font-display text-[28px] md:text-[36px] text-text-primary mb-8" data-es>Fotografía</h2>
  <h2 class="font-display text-[28px] md:text-[36px] text-text-primary mb-8 hidden" data-en>Photography</h2>
  
  <a href="/fotografia" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
    {previewPhotos.map((photo) => (
      <img 
        src={photo} 
        alt="" 
        class="w-[280px] h-[180px] object-cover flex-shrink-0" 
        loading="lazy"
      />
    ))}
  </a>
  
  <a href="/fotografia" class="inline-block mt-6 font-mono text-[13px] tracking-[1.5px] text-accent-sienna hover:text-accent-ochre">
    <span data-es>VER TODOS</span>
    <span data-en class="hidden">VIEW ALL</span>
  </a>
</section>
```

**Step 2: Add preview photos data**

At top of index.astro, add:

```typescript
const previewPhotos = [
  '/photos/DSC00329.webp',
  '/photos/DSC00485.webp',
  '/photos/DSC00541-2.webp',
  '/photos/DSC01256.webp',
  '/photos/DSC03854.webp',
].slice(0, 5);
```

**Step 3: Test and commit**
Run: `npm run build`
Expected: Preview section appears below projects

```bash
git add src/pages/index.astro
git commit -m "feat: add foto preview section to home page"
```

---

### Task 3: Test bilingual toggle on fotografia page

**Files:**
- Modify: `src/pages/fotografia.astro`

**Step 1: Add bilingual support**

Ensure title and any text has data-es/data-en attributes matching existing pattern.

**Step 2: Test language toggle**

Run preview, click language toggle - page title should switch ES/EN

**Step 3: Commit**
```bash
git commit -m "fix: add bilingual support to fotografia page"
```

---

### Task 4: Final build and verify

**Step 1: Build production**

Run: `npm run build`

**Step 2: Verify dist output**

Check:
- dist/fotografia/index.html exists
- Preview section in dist/index.html

**Step 3: Commit and push**
```bash
git add -A
git commit -m "feat: add fotografia gallery"
git push
```

---

**Plan complete.** Run with subagent-driven-development or execute manually.

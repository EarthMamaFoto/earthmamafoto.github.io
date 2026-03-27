# Fotografía Gallery Design

## Overview
Add photo gallery to Karina Elizondo portfolio: preview section on home page + dedicated bilingual gallery page.

## Components

### 1. Preview Section (Home Page)
- Horizontal scrollable row below project sections
- Shows 4-5 thumbnail images from `public/photos/`
- Click navigates to `/fotografia` page
- Flat design: no border-radius, ochre/clay colors

### 2. New Page: `/fotografia`
- Route: `src/pages/fotografia.astro`
- Bilingual title: "Fotografía" (ES) / "Photography" (EN)
- CSS Columns masonry layout
- Responsive breakpoints:
  - Mobile (<640px): 1 column
  - Tablet (640-1024px): 2 columns
  - Desktop (>1024px): 3-4 columns
- Images from `public/photos/` directory

## Technical

### Image Loading
- Use Astro's `import.meta.glob` or fs readdir to get photo list
- Filter for `.webp` files only
- Sort by filename

### CSS Masonry (CSS Columns)
```css
.masonry {
  column-count: 1;
  column-gap: 1rem;
}
.masonry img {
  break-inside: avoid;
  margin-bottom: 1rem;
}
@media (min-width: 640px) { .masonry { column-count: 2; } }
@media (min-width: 1024px) { .masonry { column-count: 3; } }
```

### Bilingual
- Reuse existing language toggle system
- Add data attributes for ES/EN

## Acceptance Criteria
- [ ] Preview row shows 4-5 images on home page
- [ ] Click preview opens /fotografia page
- [ ] /fotografia shows all WebP images in masonry layout
- [ ] Responsive: 1→2→3 columns at breakpoints
- [ ] Bilingual toggle works on new page
- [ ] Matches flat design (no rounded corners, shadows)
- [ ] No external JS libraries required

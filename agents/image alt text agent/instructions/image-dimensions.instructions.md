---
description: "Enforces accessible image markup in web files. Covers alt text, width/height, lazy loading, responsive images, srcset, picture elements, and performance attributes. Applies to HTML, JSX, TSX, Vue, Svelte, and Astro files."
applyTo: "**/*.{html,jsx,tsx,vue,svelte,astro}"
---

## Accessible Image Markup Requirements

When writing or reviewing `<img>` tags in this project, always follow these rules:

### Required attributes

1. **`alt`** - Always present. Use descriptive text for informational images, action text for functional images, or empty string (`alt=""`) for decorative images.
2. **`width` and `height`** - Always include both to prevent Cumulative Layout Shift (CLS). Use the image's intrinsic pixel dimensions.
3. **`loading="lazy"`** - Include on all images below the fold. Omit or use `loading="eager"` for above-the-fold hero images.

### Recommended attributes

1. **`decoding="async"`** - Improves rendering performance.
2. **`aria-hidden="true"`** - Add alongside `alt=""` for purely decorative images.
3. **`fetchpriority="high"`** - Add on hero/above-the-fold images alongside `loading="eager"`.

### Responsive images

1. **`srcset` and `sizes`** - When serving multiple image sizes, always include both. The `sizes` attribute tells the browser which size to download before layout is computed.
2. **`<picture>` element** - Use for art direction (different crops at different breakpoints) or format switching (AVIF/WebP with JPEG fallback). The `<img>` inside `<picture>` must still have `alt`, `width`, and `height`.
3. **Format fallbacks** - When using modern formats (AVIF, WebP), always provide a JPEG/PNG fallback as the `<img>` src inside `<picture>`.

### Performance for hero images

For above-the-fold images:

```html
<img src="hero.jpg" alt="..." width="1920" height="1080" loading="eager" decoding="async" fetchpriority="high">
```

And in the `<head>`:

```html
<link rel="preload" as="image" href="hero.jpg">
```

### Things to avoid

- Never use `title` on images unless specifically required (creates noisy tooltips for screen readers)
- Never start alt text with "image of", "picture of", or "photo of" (the screen reader already announces it as an image)
- Never leave `alt` undefined or missing entirely (this causes screen readers to read the file name)
- Never use CSS background images for content that conveys meaning (they have no alt text mechanism)
- Never omit `loading="lazy"` on below-the-fold images (wastes bandwidth and slows page load)
- Never use `loading="lazy"` on above-the-fold images (delays the largest contentful paint)
- Never use `loading="lazy"` on tiny icons under 64px (the lazy loading overhead exceeds any savings)

### Image-of-text warning

If an image contains text as its primary content, add a warning comment and consider replacing with actual HTML text:

```html
<!-- WARNING: WCAG 1.4.5 - Consider replacing this image-of-text with actual HTML text -->
<img src="banner-text.png" alt="Spring Sale - 50% off all items" width="800" height="200" loading="lazy" decoding="async">
```

### Dimension extraction

To get accurate dimensions, run the utility script:

```bash
python ~/.agents/scripts/get_image_info.py path/to/image.jpg --json
```

Or for a whole folder:

```bash
python ~/.agents/scripts/get_image_info.py path/to/images/ --batch --json
```

The script also extracts EXIF data, dominant colors, SVG viewBox, and a text-content heuristic.

# Image Alt Text Agent -- Enhanced Documentation

## Overview

The Image Alt Text agent is an accessibility-focused toolchain that automates the process of analyzing images, generating alternative text, extracting dimensions, building accessible markup, and maintaining an image inventory. It is designed for developers, content authors, and accessibility practitioners who need to produce WCAG-compliant image markup efficiently.

The agent runs entirely within VS Code via GitHub Copilot custom agents. It works across all workspaces and supports single-image analysis, batch folder scanning, persistent catalog management, confidence scoring, content flagging, responsive image patterns, and accessibility scoring.

### What Changed in the Enhanced Version

| Feature | Original | Enhanced |
|---------|----------|----------|
| Classification output | 4 categories | 4 categories + confidence scoring (high/medium/low) |
| Content analysis | Basic | Flags: image-of-text, screenshot, logo, icon, meme, chart, diagram, photograph, illustration |
| Markup formats | HTML, Markdown, JSX, Next.js | + Responsive srcset, `<picture>` element, Astro `<Image>`, hero/above-the-fold mode |
| Catalog | Counts only | Accessibility scoring (per-image + project-level), action items section, delta mode |
| Utility script | Dimensions + format | + EXIF extraction, dominant colors, SVG viewBox parsing, text-content heuristic |
| Orchestrator modes | Standard only | Standard, Quick, Responsive, Hero |
| Pipeline flow | Linear | + Delta mode, low-confidence review gates, handoffs to related agents |
| Instruction file | Basic rules | + Responsive image guidance, hero patterns, image-of-text warnings |

## Table of Contents

- [Architecture](#architecture)
- [Components](#components)
  - [Orchestrator: image-alt-text](#orchestrator-image-alt-text)
  - [Sub-Agent: image-analyzer](#sub-agent-image-analyzer)
  - [Sub-Agent: tag-builder](#sub-agent-tag-builder)
  - [Sub-Agent: image-cataloger](#sub-agent-image-cataloger)
  - [Utility Script: get_image_info.py](#utility-script-get_image_infopy)
  - [Instruction: image-dimensions](#instruction-image-dimensions)
  - [Prompt Files](#prompt-files)
- [Installation and Prerequisites](#installation-and-prerequisites)
- [Operating Modes](#operating-modes)
- [Usage Guide](#usage-guide)
  - [Single Image Analysis](#single-image-analysis)
  - [Batch Folder Processing](#batch-folder-processing)
  - [Delta Mode (Changed Images Only)](#delta-mode-changed-images-only)
  - [Quick Mode (Alt Text Only)](#quick-mode-alt-text-only)
  - [Responsive Mode](#responsive-mode)
  - [Hero Mode (Above the Fold)](#hero-mode-above-the-fold)
  - [Catalog Management](#catalog-management)
  - [Output Format Selection](#output-format-selection)
- [Image Classification Reference](#image-classification-reference)
  - [Classification Categories](#classification-categories)
  - [Classification Decision Tree](#classification-decision-tree)
  - [Confidence Scoring](#confidence-scoring)
  - [Content Flags](#content-flags)
- [Supported Image Formats](#supported-image-formats)
- [Output Formats](#output-formats)
  - [HTML](#html)
  - [HTML Figure with Figcaption](#html-figure-with-figcaption)
  - [Hero / Above-the-Fold HTML](#hero--above-the-fold-html)
  - [Responsive HTML (srcset)](#responsive-html-srcset)
  - [Picture Element](#picture-element)
  - [Markdown](#markdown)
  - [JSX and React](#jsx-and-react)
  - [Next.js Image Component](#nextjs-image-component)
  - [Astro Image Component](#astro-image-component)
- [Accessibility Scoring](#accessibility-scoring)
  - [Per-Image Scoring](#per-image-scoring)
  - [Project-Level Scoring](#project-level-scoring)
- [Catalog File Formats](#catalog-file-formats)
  - [Markdown Catalog](#markdown-catalog)
  - [JSON Catalog](#json-catalog)
  - [CSV Catalog](#csv-catalog)
- [Alt Text Quality Standards](#alt-text-quality-standards)
- [Edge Case Handling](#edge-case-handling)
- [WCAG Compliance Reference](#wcag-compliance-reference)
- [Utility Script Reference](#utility-script-reference)
  - [Command-Line Interface](#command-line-interface)
  - [Output Fields](#output-fields)
  - [SVG Handling](#svg-handling)
  - [EXIF Data](#exif-data)
  - [Dominant Colors](#dominant-colors)
  - [Text-Content Heuristic](#text-content-heuristic)
- [Agent Handoffs](#agent-handoffs)
- [File Manifest](#file-manifest)
- [Relationship to Other Agents](#relationship-to-other-agents)
- [Troubleshooting](#troubleshooting)
- [Example Prompts](#example-prompts)
  - [Analysis](#analysis)
  - [Markup Generation](#markup-generation)
  - [Responsive and Performance](#responsive-and-performance)
  - [Batch Processing](#batch-processing)
  - [Cataloging](#cataloging)
  - [Combined Workflows](#combined-workflows)

---

## Architecture

The system follows a modular orchestrator/sub-agent pattern. The top-level agent coordinates the pipeline and delegates specialist work to three internal sub-agents. A Python utility script handles dimension extraction independently of the LLM.

```
User request
    |
    v
@image-alt-text (orchestrator)
    |
    |-- Step 1: Validate image file, determine operating mode
    |-- Step 2: Run get_image_info.py --> dimensions, EXIF, colors, SVG viewBox, text heuristic
    |-- Step 3: Delegate to @image-analyzer --> classification + alt text + confidence + flags
    |       |
    |       +-- If confidence is LOW --> pause and ask user to confirm
    |
    |-- Step 4: Delegate to @tag-builder --> markup (HTML/Markdown/JSX/responsive/picture/Astro)
    |       |
    |       +-- Apply flag-specific adjustments (image-of-text warning, icon optimization, etc.)
    |
    |-- Step 5: Delegate to @image-cataloger --> persist to catalog with scoring
    |       |
    |       +-- Calculate per-image and project-level accessibility scores
    |       +-- Generate action items (low confidence, image-of-text)
    |
    |-- Step 6: Present formatted results with confidence and flags
    |-- Step 7: Offer handoffs to related agents (accessibility-lead, text-quality-reviewer)
```

### Design Principles

- **Single responsibility**: Each sub-agent does exactly one thing. The analyzer does not build tags. The tag builder does not analyze images. The cataloger does not generate alt text.
- **Minimal tools**: Sub-agents have only the tool permissions they need. The tag-builder has read-only access. The analyzer has read and execute. The cataloger has read, edit, and search.
- **No guessing**: Dimensions are always extracted from the actual image binary via the Python script. Alt text is always generated by examining the image content through a vision-capable model.
- **Vision model preferred**: Both the orchestrator and image-analyzer specify a vision-capable model (Claude Sonnet 4.5 or GPT-5) to ensure image content can be examined directly.
- **Confidence gates**: When the analyzer returns low confidence, the orchestrator pauses for human confirmation before proceeding.
- **Scoring over checklists**: The cataloger calculates a numeric accessibility score rather than just a pass/fail, making it easy to track improvements over time.

---

## Components

### Orchestrator: image-alt-text

**File**: `agents/image-alt-text.agent.md`
**Invocation**: `@image-alt-text` in Copilot Chat

The orchestrator is the user-facing entry point. It:

1. Accepts the user's request and determines the operating mode (standard, quick, responsive, hero)
2. Validates the image file(s) exist and are supported formats
3. Runs the Python utility script to extract dimensions and metadata
4. Delegates to sub-agents for analysis, markup building, and cataloging
5. Handles low-confidence review gates
6. Assembles and presents the final results
7. Offers handoffs to related accessibility agents

**Tools available**: read, edit, search, execute, agent, todo
**Sub-agents**: image-analyzer, tag-builder, image-cataloger
**Model preference**: Claude Sonnet 4.5 (copilot), GPT-5 (copilot)
**Handoffs**: accessibility-lead, alt-text-headings, text-quality-reviewer

### Sub-Agent: image-analyzer

**File**: `agents/image-analyzer.agent.md`
**User-invocable**: No (internal helper only)

The image analyzer examines an image visually using the LLM's vision capabilities. It classifies the image, generates alt text, scores confidence, and flags special content.

**New capabilities in enhanced version**:

- **Confidence scoring**: Each analysis includes a high/medium/low confidence rating
- **Content flags**: Detects 11 content types (image-of-text, screenshot, logo, icon, meme, photograph, illustration, chart, diagram, has-text-overlay, none)
- **Edge case handling**: Specific rules for screenshots, memes, logos, icons, images-of-text, and SVGs
- **Context-aware analysis**: When told where an image appears on the page, adjusts classification accordingly
- **Multiple examples**: Built-in examples for each classification + confidence + flag combination

**Tools available**: read, execute
**Model preference**: Claude Sonnet 4.5 (copilot), GPT-5 (copilot)

**Output format**:

```
CLASSIFICATION: [informational | functional | decorative | complex]
SHORT_ALT: [concise alt text or empty string]
LONG_DESCRIPTION: [detailed description or "N/A"]
CONFIDENCE: [high | medium | low]
FLAGS: [comma-separated flags or "none"]
REASONING: [1-3 sentences explaining the classification, confidence level, and any recommendations]
```

### Sub-Agent: tag-builder

**File**: `agents/tag-builder.agent.md`
**User-invocable**: No (internal helper only)

The tag builder takes structured data and produces copy-paste-ready markup. It does not analyze images or generate alt text.

**New capabilities in enhanced version**:

- **Responsive srcset**: Generates `srcset` and `sizes` attributes with common breakpoints
- **Picture element**: Generates `<picture>` with AVIF/WebP/JPEG format fallbacks
- **Astro Image**: Generates Astro `<Image>` component syntax
- **Hero optimization**: Uses `loading="eager"`, `fetchpriority="high"`, and suggests `<link rel="preload">`
- **Flag-specific adjustments**: Image-of-text warnings, icon loading optimization, logo link context
- **Developer action items**: Comments noting what image variants need to be created

**Tools available**: read (read-only agent)

**Supported output formats**: HTML, Markdown, JSX/React, Next.js Image, Astro Image, responsive srcset, picture element, HTML figure block

### Sub-Agent: image-cataloger

**File**: `agents/image-cataloger.agent.md`
**User-invocable**: No (internal helper only)

The image cataloger maintains a persistent file that records accessibility metadata.

**New capabilities in enhanced version**:

- **Accessibility scoring**: Per-image scores (0-100) based on alt text, confidence, flags, dimensions
- **Project-level score**: Average of all image scores with a rating (Excellent/Good/Needs review/Action required)
- **Action items section**: Lists images needing human review (low confidence) and image-of-text warnings
- **CSV export**: Third catalog format option alongside Markdown and JSON
- **Delta mode**: Only processes new or changed images, reports skipped unchanged images
- **Confidence tracking**: Records and displays confidence level per image

**Tools available**: read, edit, search

**Default catalog file**: `image-catalog.md` in workspace root
**Alternative formats**: `image-catalog.json`, `image-catalog.csv`

### Utility Script: get_image_info.py

**File**: `scripts/get_image_info.py`
**Language**: Python 3
**Dependency**: Pillow (`pip install Pillow`)

A standalone command-line script that extracts image metadata.

**New capabilities in enhanced version**:

- **EXIF extraction**: Pulls ImageDescription, camera Make/Model, DateTime, Orientation, GPS, resolution
- **Dominant colors**: Extracts top 3 dominant colors as hex values (useful for contrast checking)
- **SVG viewBox parsing**: Reads SVG files directly to extract `viewBox`, explicit `width`/`height` attributes
- **Text-content heuristic**: Analyzes color distribution to flag likely text-or-graphic images vs photographs
- **`if __name__` guard**: Proper Python entry point for import safety

### Instruction: image-dimensions

**File**: `instructions/image-dimensions.instructions.md`
**Applies to**: `**/*.{html,jsx,tsx,vue,svelte,astro}`

An always-on instruction file that automatically activates whenever you work on web files.

**New content in enhanced version**:

- **Responsive image rules**: `srcset`/`sizes` guidance, `<picture>` element rules, format fallback requirements
- **Hero optimization pattern**: Complete code example for above-the-fold images with `fetchpriority` and `<link rel="preload">`
- **Image-of-text warning**: HTML comment template for WCAG 1.4.5
- **Expanded avoid list**: Warnings against lazy-loading above-the-fold images and lazy-loading tiny icons

### Prompt Files

Three routing prompts that direct work to the appropriate sub-agent:

| File | Routes to | Enhanced description |
|------|-----------|---------------------|
| `prompts/image-analyzer.prompt.md` | image-analyzer | Now mentions confidence scoring and content flags |
| `prompts/tag-builder.prompt.md` | tag-builder | Now lists all 8 output formats |
| `prompts/image-cataloger.prompt.md` | image-cataloger | Now mentions scoring and action items |

---

## Installation and Prerequisites

### Requirements

1. **VS Code** with GitHub Copilot Chat extension
2. **Python 3.8+** available in your PATH
3. **Pillow** Python library: `pip install Pillow`

### Verify Pillow

```bash
python -c "from PIL import Image; print('Pillow OK')"
```

### Verify the utility script

```bash
python scripts/get_image_info.py --help
```

### To install as user-level agents

Copy the files from this workspace folder to your VS Code user prompts and agents directories:

| Source | Destination |
|--------|------------|
| `agents/*.agent.md` | `%APPDATA%/Code/User/prompts/` |
| `prompts/*.prompt.md` | `%APPDATA%/Code/User/prompts/` |
| `instructions/*.instructions.md` | `%APPDATA%/Code/User/prompts/` |
| `scripts/get_image_info.py` | `%USERPROFILE%/.agents/scripts/` |

---

## Operating Modes

The orchestrator supports four operating modes, activated by keywords in the user's request:

| Mode | Trigger Keywords | Behavior |
|------|-----------------|----------|
| **Standard** | (default) | Full pipeline: dimensions, analysis, markup, optional catalog |
| **Quick** | "quick", "just alt text", "alt only" | Returns only classification + alt text. No markup, no catalog. |
| **Responsive** | "responsive", "srcset", "picture element" | Generates responsive markup with srcset/sizes or picture element |
| **Hero** | "hero", "above the fold", "banner" | Uses `loading="eager"`, `fetchpriority="high"`, suggests preload |

Modes can be combined: `@image-alt-text responsive hero markup for banner.jpg`

---

## Usage Guide

### Single Image Analysis

```
@image-alt-text analyze assets/hero-banner.jpg
```

The agent returns:

```
## hero-banner.jpg

- Classification: informational (confidence: high)
- Alt text: Mountain landscape at sunset with hiking trail in foreground
- Dimensions: 1920 x 1080 (16:9)
- Size: 245.3 KB
- Flags: photograph

### Ready-to-use markup

<img src="assets/hero-banner.jpg" alt="Mountain landscape at sunset with hiking trail in foreground"
     width="1920" height="1080" loading="lazy" decoding="async">
```

### Batch Folder Processing

```
@image-alt-text process all images in /public/images
```

The agent creates a todo list with one task per image, processes each, and presents a summary table:

```
| Image | Classification | Alt Text | Confidence | Score |
|-------|---------------|----------|------------|-------|
| hero.jpg | informational | Mountain landscape... | high | 95 |
| logo.png | functional | Navigate to home | high | 100 |
| divider.svg | decorative | (empty) | high | 100 |
| chart.png | complex | Q3 revenue... | high | 85 |
| banner-text.png | informational | Spring Sale... | medium | 60 |

Project Score: 88/100 (Good)
Needs Review: 1 image (banner-text.png - image-of-text flag)
```

### Delta Mode (Changed Images Only)

```
@image-alt-text update catalog with new images only
```

Compares against the existing catalog and only processes images that are new or have changed file sizes. Reports:

```
3 new, 1 updated, 12 unchanged (skipped)
```

### Quick Mode (Alt Text Only)

```
@image-alt-text quick alt text for screenshot.png
```

Returns only:

```
Classification: informational (confidence: high)
Alt text: VS Code editor showing Python file with syntax highlighting and terminal output
Flags: screenshot
```

### Responsive Mode

```
@image-alt-text responsive markup for hero-banner.jpg
```

Returns:

```html
<img
  src="assets/hero-banner.jpg"
  srcset="assets/hero-banner-480.jpg 480w, assets/hero-banner-768.jpg 768w, assets/hero-banner-1200.jpg 1200w, assets/hero-banner.jpg 1920w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
  alt="Mountain landscape at sunset with hiking trail in foreground"
  width="1920"
  height="1080"
  loading="lazy"
  decoding="async">
<!-- Developer: create resized variants at 480px, 768px, and 1200px widths -->
```

### Hero Mode (Above the Fold)

```
@image-alt-text hero markup for banner.webp
```

Returns:

```html
<!-- Add to <head>: <link rel="preload" as="image" href="assets/banner.webp"> -->
<img src="assets/banner.webp" alt="Product launch announcement"
     width="1920" height="600" loading="eager" decoding="async" fetchpriority="high">
```

### Catalog Management

```
@image-alt-text catalog all images in this project
```

Creates `image-catalog.md` with:

- Project-level accessibility score
- Summary counts by classification
- Low-confidence and image-of-text warnings
- Per-image table with alt text, dimensions, confidence, and score

### Output Format Selection

```
@image-alt-text generate Markdown image syntax for logo.png
@image-alt-text build a JSX img tag for hero.webp
@image-alt-text create a figure block with figcaption for the chart
@image-alt-text generate Next.js Image component for banner.avif
@image-alt-text Astro Image component for hero.jpg
@image-alt-text picture element with AVIF and WebP for photo.jpg
```

---

## Image Classification Reference

### Classification Categories

| Classification | When to Use | Alt Text Rule | Long Description |
|----------------|-------------|---------------|-----------------|
| **Informational** | Photos, screenshots, illustrations, diagrams that convey content | Describe the content and purpose (under 125 chars) | Optional |
| **Functional** | Icon buttons, logo links, image-based navigation, interactive controls | Describe the action or destination, not the image | Not needed |
| **Decorative** | Background textures, dividers, aesthetic flourishes, spacer images | Empty string (`alt=""`) | Not needed |
| **Complex** | Charts, graphs, infographics, data visualizations, detailed diagrams | Brief summary (under 125 chars) | Required -- full text equivalent |

### Classification Decision Tree

```
1. Does the image convey information the user needs?
   |
   +-- NO --> DECORATIVE (alt="")
   |
   +-- YES
       |
       2. Is the image interactive (link, button, control)?
          |
          +-- YES --> FUNCTIONAL (alt = action/destination)
          |
          +-- NO
              |
              3. Can the content be fully described in under 125 characters?
                 |
                 +-- YES --> INFORMATIONAL (alt = content description)
                 |
                 +-- NO --> COMPLEX (short alt + long description)
```

### Confidence Scoring

| Level | When Assigned | Orchestrator Behavior |
|-------|--------------|----------------------|
| **high** | Clear-cut classification, no ambiguity | Proceeds automatically |
| **medium** | Reasonable classification but some ambiguity possible | Proceeds with a note |
| **low** | Uncertain -- context needed, image is ambiguous | Pauses and asks user to confirm before proceeding |

Low confidence triggers include:

- Cannot determine if an icon is functional or decorative without page context
- Image could be either informational or decorative depending on surrounding text
- Screenshot content is partially obscured or unclear
- Abstract art that may or may not convey meaning

### Content Flags

| Flag | Description | Triggered By |
|------|-------------|-------------|
| `image-of-text` | Image contains rendered text as primary content | Text rendered as image (WCAG 1.4.5 risk) |
| `has-text-overlay` | Image has text overlaid on photo/illustration | Marketing banners, social media graphics |
| `screenshot` | Image is a screenshot of a UI or application | App screenshots, browser screenshots |
| `logo` | Image is a brand logo or wordmark | Company logos, product logos |
| `icon` | Image is a small icon or symbol (typically under 64px) | UI icons, nav icons |
| `meme` | Image is a meme or image macro with text | Memes, image macros |
| `photograph` | Image is a real photograph | Photos from cameras |
| `illustration` | Image is drawn illustration, cartoon, or vector art | Illustrations, cartoons |
| `chart` | Image contains a data visualization | Bar charts, line charts, pie charts |
| `diagram` | Image is a flowchart, architecture diagram, or process diagram | Technical diagrams |
| `none` | No special flags apply | Simple graphics |

Multiple flags can apply to a single image (e.g., `screenshot, has-text-overlay`).

---

## Supported Image Formats

| Format | Extension(s) | Script Support | Notes |
|--------|-------------|---------------|-------|
| JPEG | .jpg, .jpeg | Full (EXIF, colors, text heuristic) | Most common photo format |
| PNG | .png | Full | Supports transparency |
| WebP | .webp | Full | Modern format, smaller file sizes |
| GIF | .gif | Full | Animated and static |
| AVIF | .avif | Full | Next-gen format, excellent compression |
| SVG | .svg | viewBox + dimensions parsed from XML | Vector format, viewBox used for sizing |
| BMP | .bmp | Full | Uncompressed bitmap |
| TIFF | .tiff, .tif | Full | High-quality, large files |
| ICO | .ico | Full | Favicons and small icons |

---

## Output Formats

### HTML

Standard `<img>` tag with all accessibility and performance attributes:

```html
<img src="assets/photo.jpg" alt="Team celebrating product launch" width="1200" height="800" loading="lazy" decoding="async">
```

For decorative images:

```html
<img src="assets/bg.jpg" alt="" width="1200" height="800" loading="lazy" decoding="async" aria-hidden="true">
```

### HTML Figure with Figcaption

For complex images requiring a long description:

```html
<figure>
  <img src="assets/chart.png" alt="Q3 2025 revenue by region" width="960" height="540" loading="lazy" decoding="async">
  <figcaption>Bar chart showing Q3 2025 revenue. North America: $4.2M (42%), Europe: $2.8M (28%), Asia-Pacific: $1.9M (19%), Other: $1.1M (11%). Total revenue increased 15% over Q2.</figcaption>
</figure>
```

### Hero / Above-the-Fold HTML

```html
<!-- Add to <head>: <link rel="preload" as="image" href="assets/hero.jpg"> -->
<img src="assets/hero.jpg" alt="Mountain landscape at sunset" width="1920" height="1080" loading="eager" decoding="async" fetchpriority="high">
```

### Responsive HTML (srcset)

```html
<img
  src="assets/photo.jpg"
  srcset="assets/photo-480.jpg 480w, assets/photo-768.jpg 768w, assets/photo-1200.jpg 1200w, assets/photo.jpg 1920w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
  alt="Team celebrating product launch"
  width="1920"
  height="1080"
  loading="lazy"
  decoding="async">
<!-- Developer: create resized variants at 480px, 768px, and 1200px widths -->
```

### Picture Element

```html
<picture>
  <source srcset="assets/photo.avif" type="image/avif">
  <source srcset="assets/photo.webp" type="image/webp">
  <img src="assets/photo.jpg" alt="Team celebrating product launch" width="1920" height="1080" loading="lazy" decoding="async">
</picture>
<!-- Developer: create AVIF and WebP versions of photo.jpg -->
```

### Markdown

```markdown
![Team celebrating product launch](assets/photo.jpg)
```

For complex images:

```markdown
![Q3 2025 revenue by region](assets/chart.png)

Bar chart showing Q3 2025 revenue. North America: $4.2M (42%), Europe: $2.8M (28%), Asia-Pacific: $1.9M (19%), Other: $1.1M (11%). Total revenue increased 15% over Q2.
```

### JSX and React

```jsx
<img src="assets/photo.jpg" alt="Team celebrating product launch" width={1200} height={800} loading="lazy" decoding="async" />
```

### Next.js Image Component

```jsx
import Image from 'next/image';

<Image src="assets/photo.jpg" alt="Team celebrating product launch" width={1200} height={800} />
```

Hero variant:

```jsx
<Image src="assets/hero.jpg" alt="Mountain landscape" width={1920} height={1080} priority />
```

### Astro Image Component

```astro
---
import { Image } from 'astro:assets';
import photo from 'assets/photo.jpg';
---

<Image src={photo} alt="Team celebrating product launch" width={1200} height={800} loading="lazy" decoding="async" />
```

---

## Accessibility Scoring

### Per-Image Scoring

Each image receives a score out of 100 based on:

| Criterion | Points | Condition |
|-----------|--------|-----------|
| Has appropriate alt text | +40 | Non-empty for non-decorative; empty for decorative |
| Confidence is high | +20 | Analyzer returned "high" confidence |
| Confidence is medium | +10 | Analyzer returned "medium" confidence |
| No image-of-text flag | +15 | Image does NOT have the image-of-text flag |
| Has dimensions | +15 | Width and height are both present |
| Classification matches flags | +10 | e.g., icon+functional, chart+complex |

**Rating scale**:

| Score | Rating | Meaning |
|-------|--------|---------|
| 90-100 | Excellent | Fully accessible, no action needed |
| 70-89 | Good | Accessible with minor improvements possible |
| 50-69 | Needs review | Human review recommended |
| 0-49 | Action required | Accessibility issues that must be fixed |

### Project-Level Scoring

The project score is the average of all individual image scores. It appears at the top of the catalog file and provides a quick health check for the project's image accessibility.

---

## Catalog File Formats

### Markdown Catalog

Default file: `image-catalog.md`

```markdown
# Image Accessibility Catalog

Last updated: 2026-03-08

## Project Score: 88/100 (Good)

## Summary

- Total images: 12
- Informational: 8
- Functional: 2
- Decorative: 1
- Complex: 1
- Needs review (low confidence): 1
- Image-of-text warnings: 1

## Images

| Image | Alt Text | Dims | Format | Size | Class | Confidence | Score |
|-------|----------|------|--------|------|-------|------------|-------|
| `hero.jpg` | Mountain landscape at sunset | 1920x1080 | JPEG | 245 KB | informational | high | 95 |
| `logo.png` | Navigate to home page | 200x60 | PNG | 12 KB | functional | high | 100 |
| `divider.svg` |  | 1200x2 | SVG | 1 KB | decorative | high | 100 |
| `chart.png` | Q3 revenue by region | 960x540 | PNG | 89 KB | complex | high | 85 |
| `banner.png` | Spring Sale 50% off | 800x200 | PNG | 45 KB | informational | medium | 60 |

## Action Items

### Needs Human Review (Low Confidence)

(none)

### Image-of-Text Warnings (WCAG 1.4.5)

- `banner.png` -- Contains rendered text "Spring Sale 50% off". Consider replacing with HTML text over a background image for better accessibility, searchability, and performance.
```

### JSON Catalog

Alternative file: `image-catalog.json`

```json
{
  "lastUpdated": "2026-03-08T12:00:00Z",
  "projectScore": {
    "score": 88,
    "rating": "Good"
  },
  "summary": {
    "total": 12,
    "informational": 8,
    "functional": 2,
    "decorative": 1,
    "complex": 1,
    "needsReview": 1,
    "imageOfTextWarnings": 1
  },
  "images": [
    {
      "path": "assets/hero.jpg",
      "alt": "Mountain landscape at sunset",
      "width": 1920,
      "height": 1080,
      "format": "JPEG",
      "fileSizeKb": 245.3,
      "classification": "informational",
      "confidence": "high",
      "flags": ["photograph"],
      "score": 95
    }
  ],
  "actionItems": {
    "needsReview": [],
    "imageOfText": ["assets/banner.png"]
  }
}
```

### CSV Catalog

Alternative file: `image-catalog.csv`

```csv
Path,Filename,Alt Text,Width,Height,Format,Size KB,Classification,Confidence,Flags,Score
assets/hero.jpg,hero.jpg,Mountain landscape at sunset,1920,1080,JPEG,245.3,informational,high,photograph,95
assets/logo.png,logo.png,Navigate to home page,200,60,PNG,12.4,functional,high,logo,100
```

---

## Alt Text Quality Standards

The image-analyzer enforces these 8 quality rules:

1. **Describe content and purpose, not appearance.** "Graph showing Q3 revenue growth of 15%" not "colorful bar chart with blue and green bars."

2. **Avoid redundant prefixes.** Never start with "image of", "picture of", "photo of", "graphic of", or "icon of". Screen readers already announce the element as an image.

3. **Be specific.** "Golden retriever catching a frisbee in a park" not "dog playing."

4. **Describe the action for functional images.** A magnifying glass icon used as a search button gets `alt="Search"`, not `alt="magnifying glass."

5. **Keep short alt under 125 characters.** Most screen readers handle this length well. Longer content uses the long description mechanism.

6. **Use sentence case.** Start with a capital letter. No trailing period unless the text contains multiple sentences.

7. **Empty alt for decorative images.** Use `alt=""` (not omitting the attribute, which causes screen readers to read the file name).

8. **Include text from images-of-text.** If an image contains text, include that exact text in the alt attribute.

---

## Edge Case Handling

The enhanced image-analyzer includes specific rules for these edge cases:

| Edge Case | Classification | Alt Text Approach | Flags |
|-----------|---------------|-------------------|-------|
| **Screenshots** | informational or complex | Describe the app, visible UI elements, and key data | `screenshot` |
| **Memes** | informational | Describe both the visual and the text | `meme`, `has-text-overlay` |
| **Logos (linked)** | functional | Alt = destination ("Acme Corp home page") | `logo` |
| **Logos (standalone)** | informational | Alt = brand name ("Acme Corp") | `logo` |
| **Icons (interactive)** | functional | Alt = the action ("Search", "Close", "Menu") | `icon` |
| **Icons (decorative)** | decorative | `alt=""` (next to descriptive text) | `icon` |
| **Images of text** | informational | Include the full text; recommend replacing with HTML | `image-of-text` |
| **SVGs** | (any) | Same rules; note viewBox instead of pixel dimensions | (varies) |
| **Charts** | complex | Short summary + full data table in long description | `chart` |
| **Diagrams** | complex | Short summary + flow/relationship description | `diagram` |

---

## WCAG Compliance Reference

### Success Criteria Addressed

| Success Criterion | Level | How This Agent Helps |
|-------------------|-------|---------------------|
| 1.1.1 Non-text Content | A | Generates alt text for all images; classifies decorative with empty alt |
| 1.4.5 Images of Text | AA | Flags images containing text and recommends HTML text replacement |
| 1.4.11 Non-text Contrast | AA | Extracts dominant colors for contrast checking |
| 2.4.4 Link Purpose (In Context) | A | Generates action-oriented alt for functional/linked images |
| 4.1.2 Name, Role, Value | A | Ensures all interactive images have accessible names |

### Additional Reinforcement via Instruction File

| Success Criterion | Level | How the Instruction Helps |
|-------------------|-------|--------------------------|
| 1.1.1 Non-text Content | A | Always-on reminder to include alt attribute |
| 1.4.5 Images of Text | AA | HTML comment warning template |
| 2.4.7 Focus Visible | AA | Guidance against removing focus outlines on image links |

---

## Utility Script Reference

### Command-Line Interface

```
usage: get_image_info.py [-h] [--batch] [--json] path

Extract image metadata for accessibility markup.

positional arguments:
  path        Path to an image file or folder

options:
  -h, --help  show this help message and exit
  --batch     Scan all images in folder recursively
  --json      Output as JSON
```

### Output Fields

| Field | Type | Description | New? |
|-------|------|-------------|------|
| path | string | Absolute file path | |
| filename | string | File name only | |
| format | string | Image format (JPEG, PNG, WEBP, SVG, etc.) | |
| width | integer | Pixel width | |
| height | integer | Pixel height | |
| aspect_ratio | string | Simplified ratio (e.g., "16:9") | |
| file_size_bytes | integer | Raw file size | |
| file_size_kb | float | File size in kilobytes (1 decimal) | |
| mode | string | Color mode (RGB, RGBA, L, P, vector) | |
| exif | object | EXIF tag key-value pairs (if present) | Yes |
| dominant_colors | string[] | Top 3 hex color values (e.g., "#2b5797") | Yes |
| text_heuristic | string | "likely-text-or-graphic", "possible-text-or-graphic", or "likely-photograph" | Yes |
| viewBox | string | SVG viewBox attribute value | Yes |
| svg_width | string | SVG explicit width attribute | Yes |
| svg_height | string | SVG explicit height attribute | Yes |

### SVG Handling

SVGs are parsed directly from XML rather than opened with Pillow. The script extracts:

- `viewBox` attribute (used to calculate dimensions and aspect ratio)
- Explicit `width` and `height` attributes on the `<svg>` element
- File size

If no `viewBox` is present, width and height report as 0 and aspect_ratio as "N/A".

### EXIF Data

The script extracts these EXIF tags when present:

| Tag | Useful For |
|-----|-----------|
| ImageDescription | Pre-existing description the author embedded |
| Make / Model | Camera info (for photo credits or context) |
| DateTime / DateTimeOriginal | When the photo was taken |
| Orientation | Whether the image needs rotation |
| GPSInfo | Location data (for geographic context in alt text) |
| XResolution / YResolution | Print resolution |

### Dominant Colors

The top 3 most frequent colors are extracted by:

1. Resizing the image to a 50x50 thumbnail (for speed)
2. Converting to RGB (compositing RGBA on white background)
3. Counting color frequencies
4. Returning the top 3 as hex strings

This is useful for:

- Quick contrast checking against background colors
- Identifying images that are primarily one color (possibly text/graphic)
- Documenting brand colors in logos

### Text-Content Heuristic

The script analyzes color distribution to estimate whether an image contains text/graphics or is a photograph:

| Value | Color Ratio | Unique Colors | Interpretation |
|-------|------------|---------------|----------------|
| `likely-text-or-graphic` | < 5% | < 50 | Very few colors, probably text or simple graphic |
| `possible-text-or-graphic` | < 15% | any | Moderate color variety, could be either |
| `likely-photograph` | >= 15% | any | Many colors, likely a photo |

This heuristic is a hint, not a definitive classification. The image-analyzer makes the final determination using vision.

---

## Agent Handoffs

After completing image analysis, the orchestrator offers handoffs to complementary agents:

| Handoff | Target Agent | When Offered |
|---------|-------------|-------------|
| Full Web Audit | `accessibility-lead` | When working on a web page with images |
| Review Existing Alt Text | `alt-text-headings` | After processing images that already had alt text |
| Check Text Quality | `text-quality-reviewer` | When image-of-text flags or low confidence results are found |

Handoffs are defined in the orchestrator's YAML frontmatter and appear as suggested actions after analysis completes.

---

## File Manifest

| File | Location | Type | Purpose |
|------|----------|------|---------|
| `image-alt-text.agent.md` | agents/ | Agent (orchestrator) | User-facing entry point, coordinates pipeline |
| `image-analyzer.agent.md` | agents/ | Agent (sub-agent) | Vision analysis, classification, alt text, confidence, flags |
| `tag-builder.agent.md` | agents/ | Agent (sub-agent) | HTML/Markdown/JSX/responsive/picture markup assembly |
| `image-cataloger.agent.md` | agents/ | Agent (sub-agent) | Catalog management with scoring and action items |
| `image-analyzer.prompt.md` | prompts/ | Prompt | Routing prompt for image-analyzer |
| `tag-builder.prompt.md` | prompts/ | Prompt | Routing prompt for tag-builder |
| `image-cataloger.prompt.md` | prompts/ | Prompt | Routing prompt for image-cataloger |
| `image-dimensions.instructions.md` | instructions/ | Instruction | Always-on reminder for accessible img attributes |
| `get_image_info.py` | scripts/ | Python script | Dimension, EXIF, color, SVG, and text heuristic extraction |
| `IMAGE-ALT-TEXT-DOCS.md` | (root) | Documentation | This file |

---

## Relationship to Other Agents

| Agent | Relationship |
|-------|-------------|
| **Alt Text and Headings** (`alt-text-headings`) | Reviews alt text quality in existing web pages. Image-alt-text generates alt text from scratch for new images. Complementary: generate then review. |
| **Accessibility Lead** (`accessibility-lead`) | Full WCAG audit orchestrator. Can delegate image-specific work to image-alt-text. Handoff target after image processing. |
| **Text Quality Reviewer** (`text-quality-reviewer`) | Detects low-quality alt text (template variables, placeholder text) in existing code. Complementary post-processing check. Handoff target. |
| **Web Accessibility Wizard** (`web-accessibility-wizard`) | Full web audit wizard. Image-alt-text handles the image-specific slice of that workflow. |
| **Contrast Master** (`contrast-master`) | The dominant colors extracted by the utility script can feed into contrast checking. |
| **Design System Auditor** (`design-system-auditor`) | Token-level analysis. Image-alt-text handles instance-level image markup. |

---

## Troubleshooting

### Pillow is not installed

**Symptom**: The utility script prints "Error: Pillow is required" and exits.
**Fix**: `pip install Pillow`

### Script cannot find the image

**Symptom**: JSON output contains `"error": "File not found"`.
**Fix**: Check the file path. Use absolute paths or paths relative to where you run the command.

### SVG dimensions are 0x0

**Symptom**: An SVG reports width=0, height=0.
**Fix**: The SVG likely has no `viewBox` attribute. Open the SVG source and add an explicit `viewBox`. Or specify `width` and `height` manually in your markup.

### Agent does not appear in Copilot chat

**Symptom**: `@image-alt-text` does not appear in the picker.
**Fix**: Confirm the agent file is in your VS Code user prompts folder (`%APPDATA%/Code/User/prompts/`). Restart VS Code.

### Sub-agents appear in the picker

**Symptom**: `image-analyzer`, `tag-builder`, or `image-cataloger` show up in the agent list.
**Fix**: Verify each has `user-invocable: false` in its YAML frontmatter.

### Model does not support vision

**Symptom**: The analyzer cannot examine image content and returns generic results.
**Fix**: Select a vision-capable model (Claude Sonnet 4.5, GPT-5) in the Copilot model picker.

### Low confidence on every image

**Symptom**: The analyzer returns "low" confidence for images that seem straightforward.
**Fix**: Provide page context when asking ("this icon is a search button in the nav bar"). Context helps the analyzer classify correctly.

### Batch scan finds no images

**Symptom**: "No supported images found" error.
**Fix**: Confirm the folder contains files with supported extensions. The script scans recursively, so subdirectories are included. Check for unusual extensions (e.g., `.jpeg2000` is not supported).

### EXIF data is empty

**Symptom**: The `exif` field is missing from script output.
**Fix**: Not all images contain EXIF data. PNGs, SVGs, and WebPs typically do not. JPEGs from cameras usually do. This is expected behavior.

### Text heuristic gives wrong result

**Symptom**: A photograph is flagged as "likely-text-or-graphic" or vice versa.
**Fix**: The heuristic is a rough estimate based on color distribution. It is not authoritative. The image-analyzer makes the final determination using actual image examination via the vision model.

---

## Example Prompts

### Analysis

```
@image-alt-text analyze the hero image at public/hero-banner.jpg
@image-alt-text what kind of image is assets/icon-search.svg -- functional or decorative?
@image-alt-text describe this chart image and provide a full text equivalent
@image-alt-text analyze screenshot.png -- it's from the settings page of our app
@image-alt-text classify all icons in /assets/icons -- they're used as navigation buttons
```

### Markup Generation

```
@image-alt-text generate an img tag for logo.png
@image-alt-text build Markdown image syntax for all screenshots in /docs/images
@image-alt-text create a figure block with figcaption for the revenue chart
@image-alt-text generate Next.js Image components for all images in /public
@image-alt-text Astro Image component for hero.jpg
```

### Responsive and Performance

```
@image-alt-text responsive srcset markup for hero-banner.jpg
@image-alt-text picture element with AVIF and WebP fallback for photo.jpg
@image-alt-text hero above-the-fold markup for banner.webp with preload tag
@image-alt-text responsive hero markup for landing-page-hero.avif
```

### Batch Processing

```
@image-alt-text process all images in the /assets folder
@image-alt-text scan /public/images and generate img tags for each one
@image-alt-text analyze every image in this project
@image-alt-text quick alt text for all images in /docs/screenshots
@image-alt-text update -- only process new images since last catalog
```

### Cataloging

```
@image-alt-text catalog all images in this project
@image-alt-text update the image catalog with new images in /assets/v2
@image-alt-text create a JSON image catalog for the /public folder
@image-alt-text export the catalog as CSV
@image-alt-text show me the current project accessibility score
@image-alt-text what images need human review?
```

### Combined Workflows

```
@image-alt-text analyze all images in /assets, generate HTML tags, and save a catalog
@image-alt-text batch process /public/images with JSX output and update the catalog
@image-alt-text responsive hero markup for all images in /public/heroes, then catalog them
@image-alt-text quick analysis of /assets, then hand off to accessibility-lead for full audit
```

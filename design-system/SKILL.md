---
name: "CodeGraphLabs"
description: "A restrained design system using Slate for structure and a single Crimson element per screen for signature accent."
---

# CodeGraphLabs

> **Source**: Brand extraction
> **Category**: `brand-system`

## What it does

Applies the **CodeGraphLabs** visual language to artifacts and prototypes.

## Core Rules

1. **Colors**: Strictly use the declared Slate palette (`#ffffff`, `#f7f8fa`, `#1c2029`, `#8a90a2`, `#dfe2ea`, `#2b3040`) for structure, surfaces, and text. Use Crimson (`#c81d25`) for primary CTA, key stats, or section dividers.
2. **Typography**: Use **Manrope** for display and body, and **Source Code Pro** for monospace code/data blocks. Fallback to `system-ui, -apple-system, sans-serif` if unavailable.
3. **Layout & Posture**: 
   - 8px max border radius. Never use pill-shaped or fully rounded borders.
   - Hierarchy is achieved via font weight (`600`, `700`) rather than dramatic size jumps.
   - Use only *one* crimson element per screen or slide. Three or more is considered decoration and should be avoided.
4. **Voice**: Tone is restrained, engineered, and structured. Avoid playful, decorative, or "friendly" elements.

## How to use

When generating UI, prototypes, or decks for this brand, read `DESIGN.md` in this directory to load the specific tokens, and refer to `system/variables.css` for pre-computed CSS custom properties.

Ensure the final artifact passes the validation check: "Only one Crimson accent used", "Radius is max 8px", and "Manrope / Source Code Pro typography used".

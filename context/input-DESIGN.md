# DESIGN.md — Personal Brand System

## Tokens

```yaml
system: Slate & Crimson
typography:
  sans: Manrope         # all text by default — headings, body, UI
  mono: Source Code Pro # code, technical labels, data, timestamps
radius:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
color:
  surface:
    base: "#FFFFFF"
    subtle: "#F7F8FA"
    muted: "#ECEEF2"
    overlay: "#E2E5EB"
  slate:
    "900": "#1C2029"
    "800": "#2B3040"
    "700": "#3A4055"
    "600": "#4A5168"
    "400": "#8A90A2"
    "200": "#C8CBD6"
    "100": "#DFE2EA"
    "050": "#F2F3F7"
  crimson:
    "700": "#9B1C1C"
    "600": "#C81D25"
    "500": "#E02020"
    "400": "#F05050"
    "100": "#FCE8E8"
    "050": "#FFF5F5"
```

## Direction

Structure does the talking. Slate carries every surface, border, and line of text. Crimson exists to mark the one thing that matters on a page — a primary action, a key number, a section break. When both are used correctly, nothing on the page has to compete for attention.

## Color

Slate is the full working range — 900 down to 050. Default to slate-900 for primary text, slate-600 for secondary text, slate-400 for anything muted or disabled. Surfaces stay near-white: base white, subtle off-white, muted grey for hover and zebra states. No dark-mode-by-default, no gradients, no drop shadows.

Crimson is the signature accent, and its value comes from scarcity. One crimson element per screen or per slide is a signal. Three is decoration. Reach for it on: a primary CTA, a key stat, a section divider, the single thing you want someone's eye to land on first. Everything else stays slate.

## Typography

Manrope for everything by default — headings, body, UI, across every medium. Source Code Pro is the exception, reserved for anything that reads as data or code: numbers in a table, a snippet in a post, a timestamp.

Hierarchy comes from weight, not size jumps. Prefer 600–700 weight for headings over dramatically larger point sizes. It keeps things feeling engineered rather than decorated.

## Radius

Tight scale: 2 / 4 / 6 / 8px. Nothing rounder. This one rule does more for the identity than almost anything else — rounder corners read as consumer-friendly, and that's not the register this system is built for.

## Applying across mediums

**Product / app UI:** slate for structure, crimson reserved for primary actions — one emphasis point per screen.

**Website:** more open spacing than a product UI, same restraint on crimson — one CTA color, not several. Slate-900 headlines on white, not dark-mode-first by default.

**Slide decks:** crimson gets the most room here — divider slides, key stat callouts, section markers — because a deck is read once, quickly, and needs sharper visual punctuation than something used daily. Still one crimson moment per slide, not per bullet.
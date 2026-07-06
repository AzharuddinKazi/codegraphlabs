# Azharuddin Kazi — Personal Portfolio & Blog Website

A premium, highly interactive personal branding and portfolio website for **Azharuddin Kazi**, Specialist Data Scientist in Fraud Prevention and Supervision.

This repository is built strictly using the **CodeGraphLabs** design system specification (Slate structure, Manrope typography, Source Code Pro code specimens, and a single Crimson accent per screen).

## 📂 Repository Structure

- `index.html` - The primary landing website. Includes professional summary, stats, work experience timeline, Agent-DASC case study overview, blog, and contact panel.
- `assets/` - Website-specific visual assets (e.g. generated abstract tech hero visual).
- `projects/` - Individual project case study files (e.g. `agent-dasc-lifecycle.html`).
- `design-system/` - Reorganized subfolder housing the original design system resources:
  - `system/` - CSS variable tokens (`variables.css`, `variables.dark.css`), seed tokens, and preview kits.
  - `fonts/` - Typographic files and specimens.
  - `assets/` - Original brand logo vectors.
  - `DESIGN.md` - Design decisions and postures.
  - `brand.html` / `logo.html` - Brand kit visualizations.

## 🛠️ Features

- **Light/Dark Mode Toggling:** Fully dynamic variable swapping.
- **Embedded Design System:** Styles are loaded dynamically from `/design-system/system/variables.css`.
- **Slide-in Modals:** Dynamic reading drawer for blog posts and project details.
- **Agent-DASC Case Study:** Dedicated documentation of the Agent-DASC compiler based on the Google DS-STAR paper.
- **Strict radii constraint (8px max)** and structured visual hierarchy.

## 🚀 Running Locally

Open `index.html` directly in any web browser, or serve using a simple HTTP server:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

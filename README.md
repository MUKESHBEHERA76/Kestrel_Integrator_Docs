# Kestrel Integrator Docs

This folder contains a static documentation app that can be hosted independently, including on GitHub Pages.

## Structure

- `index.html` - entry page
- `assets/css/tailwind.css` - locally built Tailwind base layer
- `assets/css/styles.css` - docs styling and knowledge-base overrides
- `assets/js/app.js` - UI behavior, tabs, search, and rendering
- `assets/js/docs-data.js` - documentation content and utility catalog
- `assets/js/icons.js` - SVG icon helpers
- `assets/images/kestrel-logo.png` - local logo asset used by the header

## What it covers

- Overview and platform concepts
- Projects, connectors, workflows, services, and consoles
- Utility reference with parameters, usage, and outputs
- Search-driven browsing for quick lookup

## Hosting

Open `index.html` directly for local preview or publish the folder contents to GitHub Pages.

Because the app uses relative paths, the site can be hosted from this folder without additional build steps.

## Rebuilding Tailwind

If you update the docs HTML or JS and want to regenerate the local Tailwind output, run the Tailwind CLI from the repo root or this folder:

```bash
cd Kestrel_Integrator_Docs
../frontend/node_modules/.bin/tailwindcss -c tailwind.config.cjs -i assets/css/tailwind.input.css -o assets/css/tailwind.css
```

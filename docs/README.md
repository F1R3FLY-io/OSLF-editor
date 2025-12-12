# OSLF Editor - GitHub Pages Demo

This directory contains the source code for the GitHub Pages demo site of the OSLF Editor.

## Development

```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build

# Development with watch mode
pnpm run dev

# Serve locally
pnpm run serve
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## Structure

- `index.html` - Main HTML file
- `main.js` - JavaScript entry point
- `style.css` - Styles for the demo page
- `custom_blocks.json` - Example block definitions
- `bundle.js` - Built JavaScript bundle (generated)

## Live Demo

Visit the live demo at: https://f1r3fly-io.github.io/OSLF-editor/

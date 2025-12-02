# Playground

Development playground for testing and demonstrating the `f1r3fly-io-oslf-editor` package.

## Purpose

This is a local development environment for:
- Testing editor changes in a real React application
- Demonstrating editor features
- Debugging block behavior
- Visual testing of the Blockly workspace

## Setup

```bash
# Install dependencies (from playground directory)
pnpm install

# Or install from root (installs all workspaces)
cd ..
pnpm install
```

## Development

```bash
# Build once
npm run build

# Watch mode - rebuilds on changes
npm run dev

# In another terminal - serve the playground
npm run serve

# Or do both in one command
npm start
```

Then open http://localhost:3000 in your browser.

## Structure

- `index.html` - Simple HTML page to load the playground
- `index.tsx` - React app that renders the Blockly workspace
- `index.js` - Built output (generated, not committed to git)
- `style.css` - Minimal styling

## How it works

The playground uses the local editor package via `link:../editor` dependency:
1. Changes to `../editor/src/` require rebuilding the editor: `cd ../editor && npm run build`
2. The playground automatically picks up the rebuilt editor
3. Refresh the browser to see changes

## Notes

- This is NOT a publishable package (`"private": true`)
- `index.js` is generated and excluded from git (see `.gitignore`)
- The playground is for development only and not included in the npm package

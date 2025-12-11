# Vanilla JavaScript Playground

A simple demonstration of how to embed the `@f1r3fly-io/oslf-editor` package in a plain HTML page using vanilla JavaScript.

## Features

- Pure vanilla JavaScript (no frameworks required)
- Simple HTML structure
- Custom blocks loading from JSON
- Auto-save workspace to localStorage
- Example blocks included

## Quick Start

### 1. Install dependencies

```bash
cd playground/vanilla
pnpm install
```

### 2. Build the project

```bash
pnpm run build
```

Or run in development mode with watch:

```bash
pnpm run dev
```

### 3. Serve the application

In another terminal:

```bash
pnpm run serve
```

Then open your browser to the URL shown (typically http://localhost:3000).

Or use the combined command:

```bash
pnpm start
```

## Project Structure

```
vanilla/
├── index.html           # Main HTML page
├── index.js             # Vanilla JavaScript logic
├── style.css            # Styles for the demo
├── custom_blocks.json   # Example custom blocks definitions
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## How It Works

### 1. Import the Editor

The editor is imported as an ES module in `index.js`:

```javascript
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";
```

### 2. Add the Custom Element

The editor is used in HTML as a custom element:

```html
<oslf-editor></oslf-editor>
```

### 3. Listen to Events

The JavaScript code listens for workspace changes:

```javascript
editor.addEventListener(Events.ON_CHANGE, handleBlocklyChange);
```

### 4. Load Custom Blocks

Custom blocks can be loaded by dispatching the INIT event:

```javascript
editor.dispatchEvent(
  new CustomEvent(Events.INIT, {
    detail: blocksJson,
  })
);
```

## Key Features

### Auto-save

The workspace state is automatically saved to localStorage whenever changes occur:

```javascript
const handleBlocklyChange = (event) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(event.detail));
  console.log("Workspace changed:", event.detail);
};
```

### Load Example Blocks

Click the "Load Example Blocks" button to load the example blocks from `custom_blocks.json`:

```javascript
const response = await fetch("custom_blocks.json");
const blocks = await response.json();
editor.dispatchEvent(
  new CustomEvent(Events.INIT, {
    detail: blocks,
  })
);
```

### Load Custom Blocks

Paste your own block definitions in JSON format and click "Apply Custom Blocks" to load them.

## Differences from React Version

This vanilla version provides the same functionality as the React playground but without any framework dependencies:

- No React, no JSX
- Direct DOM manipulation
- Standard event listeners
- Simpler build process

## Development

The playground uses the local editor package via `link:../../editor` dependency:

1. Make changes to the editor source code
2. Rebuild the editor (`pnpm run build` in editor directory)
3. The playground automatically picks up the rebuilt editor

## Notes

- The playground is for development and demonstration only
- It is not included in the npm package
- All workspace changes are logged to the browser console
- The build output goes to `dist/bundle.js`

## Browser Compatibility

Works in all modern browsers that support:
- ES6 modules
- Custom Elements (Web Components)
- Fetch API

## Learn More

- [Editor API Documentation](../../README.md#api-documentation)
- [Blockly Custom Blocks](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks)
- [GitHub Repository](https://github.com/F1R3FLY-io/OSLF-editor)

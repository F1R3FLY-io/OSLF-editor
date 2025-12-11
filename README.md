# OSLF-editor
Operational Semantics in Logical Form editor

**[Installation](#installation)** | **[API Documentation](#api-documentation)** | **[Development](#development)** | **[Releases](#releasing-a-new-version-for-contributors)**

## Installation

To use this editor in your project:

### 1. Configure GitHub Packages Authentication

GitHub Packages requires authentication to download packages. You'll need a Personal Access Token (PAT) with the `read:packages` permission.

#### Create a GitHub Personal Access Token

1. Navigate to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Generate a new token
3. Grant it the following scope:
   - `read:packages` (required)
   - `repo` (optional, only if accessing private repositories)
4. Save the token securely - you'll need it in the next step

#### Configure npm Authentication

Add authentication to your `.npmrc` file. You can configure this at the project level or globally:

**Project-level** (create `.npmrc` in your project root):

```
@f1r3fly-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
```

**Global** (edit `~/.npmrc` in your home directory):

```
@f1r3fly-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
```

**Important:** Replace `YOUR_GITHUB_PAT_HERE` with your actual token. Never commit `.npmrc` files containing tokens to version control.

**Tip:** For project-level configuration, add `.npmrc` to your `.gitignore` and provide a `.npmrc.example` file for team members:

```
# .npmrc.example
@f1r3fly-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=REPLACE_WITH_YOUR_TOKEN
```

### 2. Install the package

```bash
npm install @f1r3fly-io/oslf-editor
# or
pnpm add @f1r3fly-io/oslf-editor
# or
yarn add @f1r3fly-io/oslf-editor
```

### 3. Use in your application

```typescript
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";

// Use the custom element in your HTML
<oslf-editor></oslf-editor>
```

## API Documentation

The OSLF Editor is a web component built on top of Blockly that provides a visual editor for Operational Semantics in Logical Form (OSLF).

### Table of Contents

- [Basic Usage](#basic-usage)
- [Custom Element](#custom-element)
- [Events](#events)
- [Loading Custom Blocks](#loading-custom-blocks)
- [Listening to Changes](#listening-to-changes)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)

### Basic Usage

#### Import the editor

```typescript
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";
```

#### Use in HTML

```html
<oslf-editor></oslf-editor>
```

#### Use with React

```tsx
import { useRef, useEffect } from "react";
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";

function App() {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Add event listeners here
  }, []);

  return <oslf-editor ref={editorRef}></oslf-editor>;
}
```

### Custom Element

#### `<oslf-editor>`

The main editor component implemented as a custom element.

##### Attributes

- `width` (optional) - Sets the width of the editor
- `height` (optional) - Sets the height of the editor

##### Methods

The editor element exposes standard DOM methods. Interact with it primarily through Custom Events.

### Events

The editor uses Custom Events for communication. Import the `Events` enum to access event names:

```typescript
import { Events } from "@f1r3fly-io/oslf-editor";
```

#### Event Types

##### `Events.INIT`

Dispatched **to** the editor to load custom block definitions.

**Event Name:** `"blockly:init"`

**Usage:**
```typescript
const editor = document.querySelector("oslf-editor");

const blockDefinitions = [
  {
    type: "custom_block",
    message0: "custom block %1",
    args0: [
      {
        type: "input_value",
        name: "INPUT"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230
  }
];

editor.dispatchEvent(
  new CustomEvent(Events.INIT, {
    detail: blockDefinitions
  })
);
```

**Event Detail:** Array of Blockly block definitions (JSON format)

##### `Events.ON_CHANGE`

Dispatched **by** the editor when the workspace changes.

**Event Name:** `"blockly:on_change"`

**Usage:**
```typescript
const editor = document.querySelector("oslf-editor");

editor.addEventListener(Events.ON_CHANGE, (event: CustomEvent) => {
  const { state } = event.detail;
  console.log("Workspace changed:", state);

  // Save to localStorage
  localStorage.setItem("workspace", JSON.stringify(state));
});
```

**Event Detail:**
```typescript
{
  state: {
    blocks: {
      languageVersion: number,
      blocks: Array<BlockState>
    }
  }
}
```

**Note:** Changes are debounced by 1 second to avoid excessive event firing.

### Loading Custom Blocks

Custom blocks are defined using [Blockly's JSON format](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks).

#### Block Definition Structure

```typescript
interface BlockDefinition {
  type: string;              // Unique block type identifier
  message0: string;          // Block text with %1, %2 placeholders
  args0?: Array<{           // Input definitions
    type: string;
    name: string;
    check?: string;
  }>;
  previousStatement?: null | string;  // Connection type above
  nextStatement?: null | string;      // Connection type below
  output?: null | string;             // Output type (for value blocks)
  colour: number;                     // Block color (HSV hue)
  tooltip?: string;                   // Hover tooltip
  helpUrl?: string;                   // Help documentation URL
}
```

#### Example: Loading Multiple Blocks

```typescript
const blocks = [
  {
    type: "process",
    message0: "process %1",
    args0: [
      {
        type: "input_value",
        name: "NAME",
        check: "String"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Define a process",
    helpUrl: ""
  },
  {
    type: "send",
    message0: "send %1 on %2",
    args0: [
      {
        type: "input_value",
        name: "MESSAGE"
      },
      {
        type: "input_value",
        name: "CHANNEL"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Send a message on a channel"
  }
];

editor.dispatchEvent(
  new CustomEvent(Events.INIT, {
    detail: blocks
  })
);
```

### Listening to Changes

The editor emits workspace changes that you can listen to for:
- Auto-saving
- Syncing with external state
- Validation
- Code generation

#### Auto-save Example

```typescript
const AUTOSAVE_KEY = "oslf-workspace";

editor.addEventListener(Events.ON_CHANGE, (event: CustomEvent) => {
  const { state } = event.detail;
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(state));
});
```

#### React State Sync Example

```tsx
const [workspaceState, setWorkspaceState] = useState(null);

useEffect(() => {
  const editor = editorRef.current;
  if (!editor) return;

  const handleChange = (event: CustomEvent) => {
    setWorkspaceState(event.detail.state);
  };

  editor.addEventListener(Events.ON_CHANGE, handleChange);

  return () => {
    editor.removeEventListener(Events.ON_CHANGE, handleChange);
  };
}, []);
```

### Examples

#### Complete React Example

```tsx
import { useRef, useState, useEffect } from "react";
import "@f1r3fly-io/oslf-editor";
import { Events } from "@f1r3fly-io/oslf-editor";

function Editor() {
  const editorRef = useRef<HTMLElement>(null);
  const [blocksJson, setBlocksJson] = useState("");

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleChange = (event: CustomEvent) => {
      console.log("Workspace changed:", event.detail.state);
    };

    editor.addEventListener(Events.ON_CHANGE, handleChange);

    return () => {
      editor.removeEventListener(Events.ON_CHANGE, handleChange);
    };
  }, []);

  const loadCustomBlocks = () => {
    if (!editorRef.current || !blocksJson) return;

    try {
      const blocks = JSON.parse(blocksJson);
      editorRef.current.dispatchEvent(
        new CustomEvent(Events.INIT, {
          detail: blocks
        })
      );
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  return (
    <div>
      <div>
        <textarea
          value={blocksJson}
          onChange={(e) => setBlocksJson(e.target.value)}
          placeholder="Paste block definitions JSON..."
          rows={10}
          cols={50}
        />
        <button onClick={loadCustomBlocks}>Load Blocks</button>
      </div>
      <oslf-editor ref={editorRef}></oslf-editor>
    </div>
  );
}
```

#### Vanilla JavaScript Example

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import "@f1r3fly-io/oslf-editor";
    import { Events } from "@f1r3fly-io/oslf-editor";

    document.addEventListener("DOMContentLoaded", () => {
      const editor = document.querySelector("oslf-editor");

      // Listen to changes
      editor.addEventListener(Events.ON_CHANGE, (event) => {
        console.log("Changed:", event.detail.state);
      });

      // Load custom blocks
      const blocks = [
        {
          type: "custom_block",
          message0: "custom block",
          colour: 160
        }
      ];

      editor.dispatchEvent(
        new CustomEvent(Events.INIT, {
          detail: blocks
        })
      );
    });
  </script>
</head>
<body>
  <oslf-editor></oslf-editor>
</body>
</html>
```

### TypeScript Support

The package includes TypeScript type definitions. Import the Events enum for type safety:

```typescript
import { Events } from "@f1r3fly-io/oslf-editor";

// TypeScript will recognize the event names
editor.addEventListener(Events.ON_CHANGE, (event: CustomEvent) => {
  // Type-safe event handling
});
```

### Browser Support

The editor uses Web Components (Custom Elements) which are supported in all modern browsers:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+

For older browsers, you may need to include polyfills.

### Troubleshooting

#### Installation errors

**`E401 Unauthorized` error:**
- Your authentication token is missing, incorrect, or expired
- Verify your `.npmrc` file contains the correct token
- Regenerate your GitHub PAT if needed
- Ensure the token has `read:packages` permission

**`E404 Not Found` error:**
- The package scope might be incorrect (should be `@f1r3fly-io/oslf-editor`)
- The package may be private and your token lacks access
- Check that you're using the correct registry URL in `.npmrc`

**Authentication in CI/CD:**
- Use GitHub Actions token with `permissions: packages: read`
- Or provide a PAT as a repository secret
- Example GitHub Actions configuration:
  ```yaml
  - name: Setup Node.js
    uses: actions/setup-node@v4
    with:
      registry-url: 'https://npm.pkg.github.com'
      scope: '@f1r3fly-io'
  - name: Install dependencies
    run: npm install
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```

#### Editor not rendering

Make sure you:
1. Imported the editor: `import "@f1r3fly-io/oslf-editor"`
2. Used the correct element name: `<oslf-editor></oslf-editor>`
3. The element is added to the DOM before dispatching events

#### Custom blocks not appearing

Ensure:
1. Block definitions are valid JSON
2. The `type` field is unique for each block
3. You dispatch the `INIT` event after the editor is mounted

#### Changes not firing

The change event:
- Is debounced by 1 second
- Only fires for actual workspace changes (not UI events)
- Bubbles up, so you can listen on parent elements

### Additional Resources

- [Blockly Documentation](https://developers.google.com/blockly)
- [Custom Block Definitions](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks)
- [GitHub Repository](https://github.com/F1R3FLY-io/OSLF-editor)

## Project Structure

- `/editor` - Main editor package (published to GitHub Packages)
- `/playground` - Development playground for testing (not published)

## Development

### Quick Start

```bash
# Install all dependencies
make install

# Build editor in watch mode
make dev

# Build playground in watch mode (in a separate terminal)
make playground-dev
```

### Available Commands

#### Installation
- `make install` - Install all dependencies (editor + playground)
- `make install-editor` - Install editor dependencies only
- `make install-playground` - Install playground dependencies only

#### Editor Commands
- `make editor-dev` - Build editor in watch mode
- `make editor-build` - Build and minify editor for production
- `make editor-test` - Run editor tests
- `make editor-clean` - Clean editor build artifacts

#### Playground Commands
- `make playground-dev` - Build playground in watch mode
- `make playground-open` - Serve playground locally

#### Shortcut Commands
- `make dev` - Alias for `make editor-dev`
- `make build` - Alias for `make editor-build`
- `make clean` - Alias for `make editor-clean`
- `make test` - Alias for `make editor-test`

#### Release Commands
- `make release-fix` - Create and push fix version release
- `make release-feature` - Create and push feature version release
- `make release-breaking` - Create and push breaking version release

## Releasing a New Version (For Contributors)

### Create a Release

Use one command to bump the version, create a tag, and push:

```bash
make release-fix       # 0.0.1 → 0.0.2 (bug fixes)
make release-feature   # 0.0.1 → 0.1.0 (new features)
make release-breaking  # 0.0.1 → 1.0.0 (breaking changes)
```

This will:
1. Bump the version in `editor/package.json`
2. Commit the version change
3. Create and push a git tag
4. Push the commit to main

### Publish to GitHub Packages

After creating a release, publish it on GitHub:

1. Go to [Releases](https://github.com/F1R3FLY-io/OSLF-editor/releases/new)
2. Select the tag that was just created
3. Add release notes
4. Click "Publish release"

The GitHub Actions workflow will automatically build and publish the package to GitHub Packages.

### Manual Publishing

To publish without creating a GitHub release:

```bash
make build
cd editor
pnpm publish
```

## Design

Figma design: https://www.figma.com/design/mcnjC8JQvGml8Wmm6idTJz/OSLF?node-id=124-7075&p=f&t=9kPJbhxDzvLMc0I1-0

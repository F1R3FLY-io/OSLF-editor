# OSLF-editor
Operational Semantics in Logical Form editor

## Installation

To use this editor in your project:

### 1. Configure GitHub Packages

Create or update `.npmrc` in your project root:

```
@f1r3fly-io:registry=https://npm.pkg.github.com
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

## Releasing a New Version (For Contributors)

### Create a Release

Use one command to bump the version, create a tag, and push:

```bash
make release-patch   # 0.0.1 → 0.0.2
make release-minor   # 0.0.1 → 0.1.0
make release-major   # 0.0.1 → 1.0.0
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

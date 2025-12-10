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

Git tags are the source of truth for versioning. The package.json version is synced from git tags.

### GitHub Release (Recommended)

1. Create and push a git tag:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. Sync package.json version with the tag:
   ```bash
   cd editor
   npm version from-git
   ```

3. Commit and push the version change:
   ```bash
   git add package.json
   git commit -m "chore: bump version to $(node -p "require('./package.json').version")"
   git push origin main
   ```

4. Create a release on GitHub:
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Select the tag you created
   - Add release notes
   - Click "Publish release"

The GitHub Actions workflow will automatically build and publish the package to GitHub Packages.

### Manual Publishing

1. Create a git tag and sync version (steps 1-3 above)
2. Build and publish:
   ```bash
   make build
   cd editor
   pnpm publish
   ```

## Design

Figma design: https://www.figma.com/design/mcnjC8JQvGml8Wmm6idTJz/OSLF?node-id=124-7075&p=f&t=9kPJbhxDzvLMc0I1-0

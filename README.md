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

### Option 1: GitHub Release (Recommended)

1. Update the version in `editor/package.json`:
   ```bash
   cd editor
   npm version patch  # or minor, or major
   ```

2. Commit and push the version change:
   ```bash
   git add editor/package.json
   git commit -m "Bump version to x.x.x"
   git push origin main
   ```

3. Create and push a git tag:
   ```bash
   git tag v0.0.1
   git push origin v0.0.1
   ```

4. Create a release on GitHub:
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Select the tag you just created
   - Add release notes
   - Click "Publish release"

The GitHub Actions workflow will automatically build and publish the package to GitHub Packages.

### Option 2: Manual Publishing

1. Update the version in `editor/package.json`

2. Build the package:
   ```bash
   make build
   ```

3. Publish to GitHub Packages:
   ```bash
   cd editor
   echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
   pnpm publish
   ```

### Option 3: Trigger Workflow Manually

1. Update the version in `editor/package.json`
2. Commit and push changes
3. Go to Actions tab in GitHub
4. Select "Publish Package to GitHub Packages"
5. Click "Run workflow"

## Design

Figma design: https://www.figma.com/design/mcnjC8JQvGml8Wmm6idTJz/OSLF?node-id=124-7075&p=f&t=9kPJbhxDzvLMc0I1-0

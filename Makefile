.PHONY: help release-fix release-feature release-breaking

# Default target
help:
	@echo "Available targets:"
	@echo ""
	@echo "Editor commands:"
	@echo "  make editor-dev          - Build editor in watch mode"
	@echo "  make editor-build        - Build and minify editor"
	@echo "  make editor-test         - Run editor tests"
	@echo "  make editor-clean        - Clean editor build artifacts"
	@echo ""
	@echo "Playground commands:"
	@echo "  make playground-react-dev      - Build React playground in watch mode"
	@echo "  make playground-react-open     - Serve React playground locally"
	@echo "  make playground-vanilla-dev    - Build Vanilla playground in watch mode"
	@echo "  make playground-vanilla-open   - Serve Vanilla playground locally"
	@echo ""
	@echo "Documentation/GitHub Pages commands:"
	@echo "  make docs-dev            - Build docs in watch mode"
	@echo "  make docs-build          - Build docs for production"
	@echo "  make docs-open           - Serve docs locally"
	@echo ""
	@echo "Combined commands:"
	@echo "  make dev                 - Run editor dev (watch mode)"
	@echo "  make build               - Build editor"
	@echo "  make clean               - Clean all build artifacts"
	@echo "  make install                    - Install all dependencies"
	@echo "  make install-editor             - Install editor dependencies"
	@echo "  make install-playground-react   - Install React playground dependencies"
	@echo "  make install-playground-vanilla - Install Vanilla playground dependencies"
	@echo ""
	@echo "CI/Testing commands:"
	@echo "  make test-ci             - Run CI tests locally (simulates GitHub Actions)"
	@echo ""
	@echo "Release commands:"
	@echo "  make release-fix         - Create and push fix version release"
	@echo "  make release-feature     - Create and push feature version release"
	@echo "  make release-breaking    - Create and push breaking version release"

# Editor commands
editor-test:
	cd editor && pnpm test

editor-clean:
	cd editor && pnpm run clean

editor-dev:
	cd editor && pnpm run dev

editor-build:
	cd editor && pnpm run build

# Playground commands
playground-react-dev:
	cd playground/react && pnpm run dev

playground-react-open:
	cd playground/react && pnpm run start

playground-vanilla-dev:
	cd playground/vanilla && pnpm run dev

playground-vanilla-open:
	cd playground/vanilla && pnpm run start

# Documentation/GitHub Pages commands
docs-dev:
	cd docs && pnpm run dev

docs-build:
	cd docs && pnpm run build

docs-open:
	cd docs && pnpm run start

# Combined/shortcut commands
dev: editor-dev

build: editor-build

clean: editor-clean

test: editor-test

# Installation commands
install-editor:
	cd editor && pnpm install

install-playground-react:
	cd playground/react && pnpm install

install-playground-vanilla:
	cd playground/vanilla && pnpm install

install-docs:
	cd docs && pnpm install

install: install-editor install-playground-react install-playground-vanilla install-docs

# CI/Testing commands
test-ci:
	@echo "Running GitHub Actions workflows locally with act..."
	@command -v act &> /dev/null || (echo "Error: 'act' is not installed." && echo "Install with: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash" && exit 1)
	@command -v docker &> /dev/null || (echo "Error: Docker is required to run act." && echo "Please install Docker: https://docs.docker.com/get-docker/" && exit 1)
	@act -W .github/workflows/github-pages.yml -j build

# Release commands
release-fix:
	@echo "Creating fix release..."
	@cd editor && npm version patch --no-git-tag-version
	@NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	git push origin main && \
	git push origin "v$$NEW_VERSION"
	@echo "Fix release created! Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

release-feature:
	@echo "Creating feature release..."
	@cd editor && npm version minor --no-git-tag-version
	@NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	git push origin main && \
	git push origin "v$$NEW_VERSION"
	@echo "Feature release created! Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

release-breaking:
	@echo "Creating breaking release..."
	@cd editor && npm version major --no-git-tag-version
	@NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	git push origin main && \
	git push origin "v$$NEW_VERSION"
	@echo "Breaking release created! Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

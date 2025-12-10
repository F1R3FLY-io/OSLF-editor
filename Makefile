.PHONY: help release-fix release-minor release-major

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
	@echo "  make playground-dev      - Build playground in watch mode"
	@echo "  make playground-open     - Serve playground locally"
	@echo ""
	@echo "Combined commands:"
	@echo "  make dev                 - Run editor dev (watch mode)"
	@echo "  make build               - Build editor"
	@echo "  make clean               - Clean all build artifacts"
	@echo "  make install             - Install all dependencies"
	@echo "  make install-editor      - Install editor dependencies"
	@echo "  make install-playground  - Install playground dependencies"
	@echo ""
	@echo "Release commands:"
	@echo "  make release-fix         - Create and push fix version release"
	@echo "  make release-minor       - Create and push minor version release"
	@echo "  make release-major       - Create and push major version release"

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
playground-dev:
	cd playground && pnpm run dev

playground-open:
	cd playground && pnpm run start

# Combined/shortcut commands
dev: editor-dev

build: editor-build

clean: editor-clean

test: editor-test

# Installation commands
install-editor:
	cd editor && pnpm install

install-playground:
	cd playground && pnpm install

install: install-editor install-playground

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

release-minor:
	@echo "Creating minor release..."
	@cd editor && npm version minor --no-git-tag-version
	@NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	git push origin main && \
	git push origin "v$$NEW_VERSION"
	@echo "Minor release created! Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

release-major:
	@echo "Creating major release..."
	@cd editor && npm version major --no-git-tag-version
	@NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	git push origin main && \
	git push origin "v$$NEW_VERSION"
	@echo "Major release created! Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

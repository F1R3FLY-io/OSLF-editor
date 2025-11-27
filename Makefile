.PHONY: help

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
	cd playground && pnpm run open

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

.PHONY: help release-fix release-feature release-breaking install-gh-act prefetch-act-image setup-hooks test-ci

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
	@echo "  make install-gh-act      - Install gh act extension for local CI testing"
	@echo "  make prefetch-act-image  - Download and configure gh act medium Docker image (~500MB)"
	@echo "  make test-ci             - Run CI tests locally (simulates GitHub Actions)"
	@echo "  make setup-hooks         - Install git hooks for local CI testing"
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
install-gh-act:
	@echo "Installing gh act extension..."
	@command -v gh &> /dev/null || (echo "Error: 'gh' (GitHub CLI) is not installed." && echo "Install with: https://cli.github.com/" && exit 1)
	@gh extension install https://github.com/nektos/gh-act || (echo "Note: gh act extension may already be installed" && gh extension upgrade act)
	@echo "✅ gh act extension installed successfully!"
	@echo "Note: Docker is required to run gh act. Install from: https://docs.docker.com/get-docker/"

prefetch-act-image:
	@echo "Configuring and prefetching gh act medium image..."
	@command -v docker &> /dev/null || (echo "Error: Docker is required to prefetch images." && echo "Please install Docker: https://docs.docker.com/get-docker/" && exit 1)
	@mkdir -p ~/.config/act
	@echo "-P ubuntu-latest=catthehacker/ubuntu:act-latest" > ~/.config/act/actrc
	@echo "✅ Act config created at ~/.config/act/actrc"
	@echo "Pulling medium-size Docker image (catthehacker/ubuntu:act-latest, ~500MB)..."
	@docker pull catthehacker/ubuntu:act-latest
	@echo "✅ gh act medium image prefetched successfully!"

setup-hooks:
	@echo "Installing git hooks..."
	@cp .githooks/pre-commit .git/hooks/pre-commit
	@cp .githooks/pre-push .git/hooks/pre-push
	@chmod +x .git/hooks/pre-commit .git/hooks/pre-push
	@echo "✅ Git hooks installed successfully!"

test-ci:
	@echo "Running GitHub Actions workflows locally with gh act..."
	@command -v gh &> /dev/null || (echo "Error: 'gh' (GitHub CLI) is not installed." && echo "Install with: https://cli.github.com/" && exit 1)
	@gh act --version &> /dev/null || (echo "Error: 'gh act' extension is not installed." && echo "Install with: gh extension install https://github.com/nektos/gh-act" && exit 1)
	@command -v docker &> /dev/null || (echo "Error: Docker is required to run gh act." && echo "Please install Docker: https://docs.docker.com/get-docker/" && exit 1)
	@gh act -e .github/workflows/.event.json --action-offline-mode -W .github/workflows/github-pages.yml -j build
	@gh act -e .github/workflows/.event.json --action-offline-mode -W .github/workflows/publish.yml -j build

# Release commands
release-fix:
	@CURRENT_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "" && \
	echo "📦 Release Preview - Fix (Patch)" && \
	echo "================================" && \
	echo "" && \
	echo "Current version: $$CURRENT_VERSION" && \
	cd editor && PREVIEW_VERSION=$$(npm version patch --no-git-tag-version 2>/dev/null) && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "New version:     $$NEW_VERSION" && \
	echo "" && \
	echo "Recent commits:" && \
	git log --oneline -5 && \
	echo "" && \
	git checkout editor/package.json 2>/dev/null && \
	read -p "Proceed with release? (y/N): " -n 1 -r && \
	echo "" && \
	if [[ ! $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "❌ Release cancelled"; \
		exit 1; \
	fi && \
	echo "" && \
	echo "Creating fix release..." && \
	cd editor && npm version patch --no-git-tag-version && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	echo "✅ Release v$$NEW_VERSION created locally" && \
	echo "📝 Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

release-feature:
	@CURRENT_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "" && \
	echo "📦 Release Preview - Feature (Minor)" && \
	echo "====================================" && \
	echo "" && \
	echo "Current version: $$CURRENT_VERSION" && \
	cd editor && PREVIEW_VERSION=$$(npm version minor --no-git-tag-version 2>/dev/null) && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "New version:     $$NEW_VERSION" && \
	echo "" && \
	echo "Recent commits:" && \
	git log --oneline -5 && \
	echo "" && \
	git checkout editor/package.json 2>/dev/null && \
	read -p "Proceed with release? (y/N): " -n 1 -r && \
	echo "" && \
	if [[ ! $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "❌ Release cancelled"; \
		exit 1; \
	fi && \
	echo "" && \
	echo "Creating feature release..." && \
	cd editor && npm version minor --no-git-tag-version && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	echo "✅ Release v$$NEW_VERSION created locally" && \
	echo "📝 Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

release-breaking:
	@CURRENT_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "" && \
	echo "📦 Release Preview - Breaking (Major)" && \
	echo "=====================================" && \
	echo "" && \
	echo "Current version: $$CURRENT_VERSION" && \
	cd editor && PREVIEW_VERSION=$$(npm version major --no-git-tag-version 2>/dev/null) && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	echo "New version:     $$NEW_VERSION" && \
	echo "" && \
	echo "Recent commits:" && \
	git log --oneline -5 && \
	echo "" && \
	git checkout editor/package.json 2>/dev/null && \
	read -p "⚠️  Proceed with BREAKING release? (y/N): " -n 1 -r && \
	echo "" && \
	if [[ ! $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "❌ Release cancelled"; \
		exit 1; \
	fi && \
	echo "" && \
	echo "Creating breaking release..." && \
	cd editor && npm version major --no-git-tag-version && cd .. && \
	NEW_VERSION=$$(node -p "require('./editor/package.json').version") && \
	git add editor/package.json && \
	git commit -m "chore: bump version to $$NEW_VERSION" && \
	git tag "v$$NEW_VERSION" && \
	echo "✅ Release v$$NEW_VERSION created locally" && \
	echo "📝 Create a GitHub release at https://github.com/F1R3FLY-io/OSLF-editor/releases/new"

# Using `act` to Test GitHub Actions Locally

This project uses [`act`](https://github.com/nektos/act) to run GitHub Actions workflows locally before pushing to GitHub.

## Prerequisites

### 1. Install `act`

```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

### 2. Install Docker

`act` requires Docker to run containers that simulate GitHub Actions runners.

- **macOS**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: Install Docker Engine: https://docs.docker.com/engine/install/
- **Windows**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Usage

### Run CI Tests Manually

```bash
# Run the GitHub Pages build workflow
make test-ci

# Or run act directly
act -W .github/workflows/github-pages.yml -j build
```

### Automatic Testing with Git Hooks

The repository includes pre-commit and pre-push hooks that automatically run CI tests:

**Pre-commit**: Runs before each commit
```bash
git commit -m "your message"
# → Automatically runs act if Docker is available
```

**Pre-push**: Runs before pushing to remote
```bash
git push
# → Automatically runs act if Docker is available
```

**Skip hooks** (not recommended):
```bash
git commit --no-verify -m "your message"
git push --no-verify
```

## Available Workflows

List all workflows:
```bash
act --list
```

Output:
- `Deploy to GitHub Pages` - Builds editor and docs for GitHub Pages
- `Publish Package to npm` - Publishes package to npm registry

## Configuration

The default configuration is set in `~/.config/act/actrc`:
```
-P ubuntu-latest=catthehacker/ubuntu:act-latest
```

This uses the medium-sized runner image (~500MB).

## Troubleshooting

### Docker not available

If Docker is not installed, the hooks will display a warning but won't block commits/pushes. Install Docker to enable local CI testing.

### Workflow fails locally but passes on GitHub

This can happen due to differences between the act runner image and GitHub's hosted runners. The act image tries to be compatible, but some differences may exist.

### Want to test a specific workflow?

```bash
# Test the publish workflow
act -W .github/workflows/publish.yml -j build

# Test with specific event
act release -W .github/workflows/github-pages.yml
```

## Resources

- [act Documentation](https://nektosact.com/)
- [act GitHub Repository](https://github.com/nektos/act)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

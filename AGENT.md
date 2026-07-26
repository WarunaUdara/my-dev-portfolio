# Agent Configuration & Git Workflow Guidelines

This document outlines the guidelines and specific Git workflow rules that Antigravity and other development agents must strictly follow when working on the **my-dev-portfolio** project.

---

## 🔄 Git Workflow (Trunk-Based Development)

All development agents must follow this exact workflow:

```bash
# 1. Sync with remote main branch
git checkout main
git pull origin main

# 2. Develop modular change
# ... modify code, tests, or documentation ...

# 3. Stage and commit changes (Conventional Commit style)
git add <modified-files>
git commit -m "type(scope): description"

# 4. Sync again and push to remote
git pull origin main
# resolve conflicts locally if any
git push origin main
```

### Workflow Rules
* **Target Branch**: Work directly on `main` unless explicitly instructed to use a feature branch.
* **Frequency**: Commit early and commit often. Each small, logical, and modular change (e.g., adding a helper, updating a section, writing documentation, fixing a lint error) should be committed separately to build a rich and clear history.
* **Pre-push Sync**: Always execute `git pull origin main` immediately before pushing.
* **Safe Pushes**: Never use force-push (`-f` or `--force`) on the `main` branch.
* **Clutter Management**: Do not commit large generated files, caches, or virtual environments (`.venv`, `node_modules`, `.next`, etc.). Verify that they are covered by `.gitignore`.

---

## 💬 Commit Message Convention

We strictly follow the **Conventional Commits** specification. Commit messages must use the following structure:

```
type(scope): description

[optional body]

[optional footer]
```

### Allowed Scopes
For this portfolio project, standard scopes include:
* `hero` - Landing page hero section
* `bento` - Bento Grid layout and elements
* `spotify` - Spotify integration/API
* `github` - GitHub stats/contributions/API
* `guestbook` - Firebase guestbook page/components
* `cv-download` - CV download tracking API/button
* `uses` - Uses setup page/components
* `nav` - Navigation bars & footer
* `deps` - Tooling, package managers (Bun/npm)
* `docs` - Markdown and code documentation
* `styling` - CSS variables, global CSS, Tailwind v4 config

### Allowed Types

| Type | Use Case |
| :--- | :--- |
| `feat` | Adding a new feature or interactive element |
| `fix` | Bug fixes or resolving console/lint warnings |
| `docs` | Documentation modifications (e.g., updating README, ARCHITECTURE, or AGENT files) |
| `style` | Layout changes, formatting, spacing, missing semicolons (no logic change) |
| `refactor` | Code restructuring or cleaning without changing behavior |
| `perf` | Performance improvements |
| `test` | Adding or fixing test suites/telemetry checks |
| `chore` | Dependency installations, config edits, environment setup, lockfile updates |
| `ci` | CI/CD automation modifications |

---

## 🎯 Modular Commit History Strategy

To maintain a highly readable version history, agents must avoid "megacommits". Instead, split changes into distinct commits:
* **Step 1**: Commit structural analysis output and tool graphs separately (`docs(graphify): ...`).
* **Step 2**: Commit main documentation updates separately (`docs(readme): ...` & `docs(architecture): ...`).
* **Step 3**: Commit agent workflow configuration (`docs(agent): ...`).

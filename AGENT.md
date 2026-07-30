# Agent Configuration & Mandatory Guidelines

This document outlines the guidelines and specific mandatory rules that Antigravity and all development subagents must strictly follow when working on the **my-dev-portfolio** project.

---

## ⚡ CRITICAL DIRECTIVE: PACKAGE MANAGER (BUN EXCLUSIVELY)

> [!IMPORTANT]
> **DO NOT USE `npm` UNDER ANY CIRCUMSTANCES.**
> This project uses **Bun (`bun`)** exclusively for package management, dependency installations, script execution, and task running.

### Mandatory Command Substitutions:
- **Installing Packages**: Use `bun add <package>` (or `bun add -d <package>`). **NEVER use `npm install`**.
- **Running Scripts**: Use `bun run <script>` (e.g. `bun run dev`, `bun run build`). **NEVER use `npm run`**.
- **Executing CLI Tools**: Use `bunx <tool>` (e.g. `bunx vite build`). **NEVER use `npx`**.
- **Installing Dependencies**: Use `bun install`.

---

## 🔄 Git Workflow (Trunk-Based Development)

All development agents must follow this exact workflow:

```bash
# 1. Sync with remote main branch before starting work
git checkout main
git pull origin main

# 2. Develop modular changes locally
# ... edit code, assets, or docs ...

# 3. Stage and commit granular changes locally (Conventional Commit style)
git add <modified-files>
git commit -m "type(scope): description"
# Repeat step 3 for each small, logical change to build a rich local history

# 4. Push to remote origin ONLY after completing a significant milestone or task phase
git pull origin main
# resolve conflicts locally if any
git push origin main
```

### Workflow Rules
* **Target Branch**: Work directly on `main` unless explicitly instructed to use a feature branch.
* **Granular Local Commits**: Commit early and commit often locally. Each small, logical, and modular change (e.g., adding a component, tweaking styling, updating docs) should be committed separately to build a rich version history.
* **Batching Pushes**: Collect commits locally. Do NOT push every single commit to `origin/main`. Push to remote origin only upon completing a significant milestone, feature block, or when explicitly requested by the user.
* **Pre-push Sync**: Always execute `git pull origin main` immediately before pushing to remote.
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
* `deps` - Tooling, package managers (Bun)
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

# Graph Report - /Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio  (2026-07-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 283 nodes · 347 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e2f896a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- cn
- devDependencies
- app/page.tsx
- compilerOptions
- guestbook/page.tsx
- components.json
- now-playing/route.ts
- layout.tsx
- confetti.tsx
- Explore.tsx
- Projects.tsx
- firebase-admin.ts
- TechStack.tsx
- eslint.config.mjs
- under-construction/page.tsx
- stats/route.ts
- next.config.ts
- postcss.config.mjs
- tailwind.config.ts
- Confetti
- ConfettiButton

## God Nodes (most connected - your core abstractions)
1. `cn()` - 19 edges
2. `compilerOptions` - 16 edges
3. `NavBar()` - 7 edges
4. `GET()` - 6 edges
5. `Footer()` - 6 edges
6. `tailwind` - 6 edges
7. `aliases` - 6 edges
8. `scripts` - 5 edges
9. `include` - 5 edges
10. `BentoCard()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `BucketList()` --calls--> `cn()`  [EXTRACTED]
  app/sections/BucketList.tsx → lib/utils.ts
- `NavBar()` --calls--> `cn()`  [EXTRACTED]
  app/ui/TubelightNavbar.tsx → lib/utils.ts
- `GuestbookPage()` --calls--> `useAuth()`  [EXTRACTED]
  app/guestbook/page.tsx → contexts/AuthContext.tsx
- `BentoDemo()` --calls--> `cn()`  [EXTRACTED]
  app/sections/BentoDemo.tsx → lib/utils.ts
- `RevealingQuote()` --references--> `split-type`  [EXTRACTED]
  app/sections/RevealingQuote.tsx → package.json

## Import Cycles
- None detected.

## Communities (23 total, 9 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.04
Nodes (45): canvas-confetti, class-variance-authority, clsx, cobe, firebase, firebase-admin, gsap, lucide-react (+37 more)

### Community 1 - "cn"
Cohesion: 0.11
Nodes (22): articles, BentoDemo(), features, BucketItem, bucketItems, BucketList(), Aurora(), AuroraProps (+14 more)

### Community 2 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, tailwindcss (+19 more)

### Community 3 - "app/page.tsx"
Cohesion: 0.11
Nodes (10): Footer(), GitHubActivity(), RevealingQuote(), NavBar(), NavBarProps, NavItem, Tool, tools (+2 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 5 - "guestbook/page.tsx"
Cohesion: 0.14
Nodes (16): GuestbookPage(), Message, placeholders, ToastState, MessageSkeleton(), Toast(), ToastProps, AuthContext (+8 more)

### Community 6 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 7 - "now-playing/route.ts"
Cohesion: 0.24
Nodes (12): formatEpisode(), formatTrack(), GET(), getAccessToken(), getNowPlaying(), getRecentlyPlayed(), getSpotifyError(), SpotifyEpisode (+4 more)

### Community 8 - "layout.tsx"
Cohesion: 0.18
Nodes (9): instrumentSerif, inter, metadata, siteUrl, socialImageUrl, SmoothScroll(), SmoothScrollProps, lenis (+1 more)

### Community 9 - "confetti.tsx"
Cohesion: 0.18
Nodes (9): Button, ButtonProps, buttonVariants, Api, ConfettiButtonProps, ConfettiComponent, ConfettiContext, ConfettiRef (+1 more)

### Community 10 - "Explore.tsx"
Cohesion: 0.40
Nodes (3): SpotifyData, DottedGlowBackground(), DottedGlowBackgroundProps

### Community 11 - "Projects.tsx"
Cohesion: 0.40
Nodes (3): ProjectData, Lens(), LensProps

### Community 14 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **134 isolated node(s):** `octokit`, `SpotifyToken`, `SpotifyTrack`, `SpotifyEpisode`, `SpotifyNowPlaying` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `layout.tsx`, `devDependencies`, `app/page.tsx`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **Why does `split-type` connect `app/page.tsx` to `dependencies`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **What connects `octokit`, `SpotifyToken`, `SpotifyTrack` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.10873440285204991 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
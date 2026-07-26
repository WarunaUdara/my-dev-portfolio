# Waruna Udara Sampath — Full-Stack Developer Portfolio

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.app/)

A modern, high-performance, dark-themed developer portfolio built by **Waruna Udara Sampath** (Full-Stack Software Developer, BICT Hons undergraduate at the University of Sri Jayewardenepura).

The application features custom WebGL/GSAP smooth animations, real-time Spotify playing integration, live GitHub activity visualization, an authenticated interactive Guestbook powered by Firebase Auth & Firestore, privacy-preserving CV download telemetry, and an expandable interactive Bento Grid layout.

---

## 🚀 Key Features

* **Interactive Hero & Bento Grid**: Dynamic hero section featuring smooth GSAP entrance timelines, Aurora background shaders, floating sparkles, and a responsive Bento Grid showcasing core skills, blog highlights, and location telemetry.
* **Live Spotify Integration**: Serverless API route fetching real-time currently playing tracks or recently played history using Spotify OAuth 2.0 refresh tokens.
* **GitHub Activity & Telemetry**: Dynamic GraphQL contribution calendar rendering live commit contributions alongside repository statistics via Octokit.
* **Authenticated Guestbook**: Real-time message board supporting Google & GitHub OAuth via Firebase Authentication, with real-time Firestore database sync (`onSnapshot`), infinite scroll pagination, and owner moderation tools.
* **Privacy-Preserving Telemetry**: Serverless CV download tracker extracting edge geo-location headers (country, region, city) and device types via Vercel Edge runtime without storing personal identifiable information (PII).
* **Interactive Tools ("Uses") Page**: Scroll-driven expand-and-contract GSAP layout revealing developer tools, IDEs, and workflow setups.
* **Smooth Lenis Scrolling**: Native-feeling physics-based smooth scrolling integrated across all pages with GSAP ScrollTrigger compatibility.

---

## 🛠️ Technology Stack

### Frontend & Core
* **Framework**: Next.js 15 (App Router with Turbopack)
* **Library**: React 19 & TypeScript 5
* **Styling**: Tailwind CSS v4, `tw-animate-css`, `clsx`, `tailwind-merge`
* **Animations**: GSAP 3 (ScrollTrigger), Framer Motion 12, Lenis Smooth Scroll
* **Graphics & Visuals**: Canvas Confetti, Cobe (3D Globe), OGL (WebGL)

### Backend & Cloud
* **Authentication**: Firebase Auth (Google & GitHub OAuth popup providers)
* **Database**: Firebase Firestore (Client SDK & Firebase Admin SDK)
* **Deployment**: Vercel Edge Platform with global CDN asset delivery
* **APIs & Integrations**: GitHub REST/GraphQL API (Octokit), Spotify Web API

---

## 📐 System Architecture

```mermaid
graph TD
    Client["User Browser / Client (React 19 + Next.js App Router)"]
    
    subgraph Frontend Services
        Lenis["Lenis Smooth Scroll & GSAP ScrollTrigger"]
        AuthCtx["AuthContext (Firebase Client Auth)"]
        UI["UI Components & Bento Grid"]
    end

    subgraph Serverless API Routes
        SpotifyAPI["/api/spotify/now-playing"]
        GithubAPI["/api/github/stats & /contributions"]
        CvAPI["/api/cv-download"]
    end

    subgraph Cloud Infrastructure
        FirebaseAuth["Firebase Auth (Google & GitHub OAuth)"]
        Firestore["Cloud Firestore Database"]
        SpotifyOAuth["Spotify Web API"]
        GithubGraphQL["GitHub GraphQL & REST API"]
    end

    Client --> Frontend Services
    AuthCtx --> FirebaseAuth
    UI --> Firestore
    Client --> SpotifyAPI
    Client --> GithubAPI
    Client --> CvAPI
    SpotifyAPI --> SpotifyOAuth
    GithubAPI --> GithubGraphQL
    CvAPI --> Firestore
```

---

## 📁 Directory Structure

```
my-dev-portfolio/
├── app/
│   ├── api/
│   │   ├── cv-download/        # Privacy-preserving CV download tracking API
│   │   ├── github/             # GitHub GraphQL contributions & Octokit stats API
│   │   └── spotify/            # Spotify Live / Recently Played OAuth API
│   ├── bucket-list/            # Personal milestone & goals page
│   ├── guestbook/             # Real-time Firestore authenticated guestbook page
│   ├── links/                  # Quick links & social tree page
│   ├── sections/               # Modular landing page section components
│   │   ├── About.tsx           # Developer bio section
│   │   ├── BentoDemo.tsx       # Feature Bento grid layout
│   │   ├── BucketList.tsx      # Goals grid component
│   │   ├── Explore.tsx         # Interactive Spotify & status section
│   │   ├── Footer.tsx          # Dynamic site footer & quick links
│   │   ├── GitHubActivity.tsx  # GitHub contribution calendar
│   │   ├── Hero.tsx            # Hero section with GSAP timelines
│   │   ├── Links.tsx           # Social links component
│   │   ├── Projects.tsx        # Highlighted projects showcasing Lens UI
│   │   ├── RevealingQuote.tsx # Text-reveal quote component
│   │   └── TechStack.tsx       # Interactive technology pills
│   ├── ui/                     # Special visual FX components (Aurora, Globe, etc.)
│   ├── uses/                   # Developer setup & tool inventory page
│   ├── globals.css             # Design tokens & Tailwind CSS rules
│   ├── layout.tsx              # Root layout with SEO JSON-LD & AuthProvider
│   └── page.tsx                # Portfolio main landing page
├── components/
│   ├── ui/                     # Reusable primitive components (Buttons, Modals, Inputs)
│   ├── MessageSkeleton.tsx     # Skeleton loader for Guestbook entries
│   ├── SmoothScroll.tsx        # Lenis smooth scroll provider wrapper
│   └── Toast.tsx               # Notification toast component
├── contexts/
│   └── AuthContext.tsx         # Firebase React Context provider
├── lib/
│   ├── firebase.ts             # Firebase client initialisation
│   ├── firebase-admin.ts       # Firebase Admin SDK setup for server routes
│   └── utils.ts                # Class merging utility (clsx + tailwind-merge)
└── public/                     # Static images, icons, and downloadable assets
```

---

## ⚡ Getting Started

### Prerequisites

* Node.js 20+ or Bun 1.1+
* Firebase Project (Firestore + Authentication enabled)
* GitHub Personal Access Token
* Spotify Developer Application (Client ID, Secret & Refresh Token)

### Environment Setup

Create a `.env` file in the root directory using `.env.example` as a template:

```bash
# Firebase Client Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Server Admin SDK (JSON stringified Service Account)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# GitHub Credentials
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME="WarunaUdara"
NEXT_PUBLIC_GITHUB_USERNAME="WarunaUdara"

# Spotify OAuth Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

### Installation & Development

```bash
# Install dependencies
bun install
# or
npm install

# Run development server
bun dev
# or
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🔗 Related Documentation

* For deep architectural details, data flow sequences, and database schemas, see [ARCHITECTURE.md](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/ARCHITECTURE.md).
* For AST code dependency graphs, see [GRAPH_REPORT.md](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/graphify-out/GRAPH_REPORT.md).

# Architectural Specification & Technical Blueprints

This document outlines the software architecture, design patterns, API integrations, data flows, database schemas, and animation pipelines for **Waruna Udara Sampath's Developer Portfolio** (`my-dev-portfolio`).

---

## 1. System Overview & Architecture

The application is engineered as a modern, serverless web application built on **Next.js 15 (App Router)** with **React 19** and **TypeScript 5**. It combines static asset optimization with serverless Edge API routes and client-side real-time rendering.

### High-Level Architectural Layers

```mermaid
graph TB
    subgraph Client Layer
        A[Next.js App Router Page]
        B[Lenis Smooth Scroll Engine]
        C[GSAP & Framer Motion Pipelines]
        D[AuthContext / Firebase Client SDK]
    end

    subgraph Edge / API Route Layer
        E[/api/spotify/now-playing]
        F[/api/github/stats]
        G[/api/github/contributions]
        H[/api/cv-download]
    end

    subgraph External Infrastructure
        I[(Cloud Firestore)]
        J[Firebase Auth Provider]
        K[Spotify Web API]
        L[GitHub GraphQL & REST API]
    end

    A --> B
    A --> C
    A --> D
    D <--> J
    A --> I
    A --> E
    A --> F
    A --> G
    A --> H
    E --> K
    F --> L
    G --> L
    H --> I
```

---

## 2. Real-Time Guestbook & Authentication Flow

The Guestbook feature enables authenticated visitors to post comments. Authentication is handled via Firebase Authentication popups (Google and GitHub providers), while real-time updates are driven by Firestore listeners.

### Authentication & Message Posting Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Visitor
    participant UI as Guestbook UI (React)
    participant Auth as AuthContext (Firebase Client)
    participant OAuth as Google / GitHub OAuth
    participant DB as Cloud Firestore

    User->>UI: Clicks "Sign in to post"
    UI->>Auth: Trigger signInWithGoogle() or signInWithGitHub()
    Auth->>OAuth: Open OAuth Popup Window
    OAuth-->>Auth: Return Firebase User Credential
    Auth-->>UI: Update Auth State (User object set)

    User->>UI: Types message & submits form
    UI->>DB: addDoc(collection(db, 'guestbook'), payload)
    DB-->>UI: Real-time Snapshot Update (onSnapshot)
    UI-->>User: Render new message in feed with Toast notification
```

---

## 3. Spotify Live Activity Integration Pipeline

The `/api/spotify/now-playing` endpoint provides real-time music updates or falls back to recently played history when no track is active.

### Spotify OAuth 2.0 Refresh & Fallback Sequence

```mermaid
sequenceDiagram
    autonumber
    participant Client as Frontend (Explore.tsx)
    participant API as /api/spotify/now-playing
    participant SpotifyAuth as Spotify Accounts API
    participant SpotifyPlayer as Spotify Player API

    Client->>API: GET request (poll every 15s)
    API->>SpotifyAuth: POST refresh_token request (Basic auth)
    SpotifyAuth-->>API: Return temporary access_token
    
    API->>SpotifyPlayer: GET /v1/me/player/currently-playing
    
    alt Currently Playing Track / Episode
        SpotifyPlayer-->>API: 200 OK (Track or Episode JSON)
        API-->>Client: { isPlaying: true, title, artist, album, albumImageUrl, songUrl }
    else Player Idle (HTTP 204 or no item)
        API->>SpotifyPlayer: GET /v1/me/player/recently-played?limit=1
        SpotifyPlayer-->>API: 200 OK (Recently Played Item)
        API-->>Client: { isPlaying: false, title, artist, album, albumImageUrl, songUrl }
    end
```

---

## 4. Privacy-Preserving Telemetry & CV Download Tracking

The `/api/cv-download` route logs anonymized metadata when visitors download the developer's resume. Geolocation headers provided by the Vercel Edge Runtime are captured without recording IP addresses or personal identity.

### Telemetry Pipeline Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Visitor
    participant Page as Portfolio Page
    participant API as /api/cv-download
    participant AdminDB as Firebase Admin SDK (Firestore)
    participant CDN as Resume Asset (/Waruna_Udara_Sampath.pdf)

    Visitor->>Page: Clicks "Download CV"
    Page->>CDN: Trigger direct PDF download
    Page->>API: POST request with client headers
    API->>API: Parse Vercel headers (x-vercel-ip-country, city, region)
    API->>API: Parse User-Agent (deviceType, browser) - NO PII
    API->>AdminDB: adminDb.collection('cv_downloads').add(telemetryData)
    AdminDB-->>API: Document Created
    API-->>Page: HTTP 200 { success: true }
```

---

## 5. Data Models & Database Schemas

### 5.1 Firestore `guestbook` Collection

Each entry in `guestbook` represents a user comment:

```json
{
  "id": "auto_generated_firestore_doc_id",
  "uid": "firebase_auth_user_uid",
  "name": "Waruna Udara Sampath",
  "email": "user@example.com",
  "photoURL": "https://lh3.googleusercontent.com/a/...",
  "message": "Great portfolio! Outstanding design and smooth animations.",
  "timestamp": "Timestamp(seconds=1740000000, nanoseconds=0)"
}
```

### 5.2 Firestore `cv_downloads` Collection

Each entry in `cv_downloads` records anonymized analytics:

```json
{
  "id": "auto_generated_firestore_doc_id",
  "country": "LK",
  "region": "11",
  "city": "Colombo",
  "deviceType": "desktop",
  "browser": "Chrome",
  "referer": "https://warunadev.vercel.app/",
  "timestamp": "FieldValue.serverTimestamp()"
}
```

---

## 6. UI Animation & Scroll Pipeline

The portfolio relies on a synchronized animation setup linking **Lenis** smooth scrolling with **GSAP ScrollTrigger** and **Framer Motion**:

```mermaid
flowchart LR
    A[Native Scroll Event] --> B[Lenis Smooth Scroll Engine]
    B --> C[GSAP ScrollTrigger Engine]
    C --> D[Hero Text Zoom & Fade]
    C --> E[Bento Card Scroll Expansions]
    C --> F[Project Lens Focus Effects]
    C --> G[Uses Tool Grid Scroll Timeline]
```

### Scroll & Animation Synchronization Rules
1. **Lenis Integration**: Wrapped at root level via [`components/SmoothScroll.tsx`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/components/SmoothScroll.tsx).
2. **GSAP ScrollTrigger**: Configured with `scrub: true` or custom ease functions across sections ([`app/sections/Hero.tsx`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/sections/Hero.tsx), [`app/sections/Projects.tsx`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/sections/Projects.tsx), [`app/uses/page.tsx`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/uses/page.tsx)).
3. **Typography**: Split-type typography effects integrated for smooth letter and word reveals.

---

## 7. Structural Hubs & Core Modules

According to graph analysis performed via AST extraction (`graphify`):

| Structural Hub | Hub Type | Edges / Connectors | Responsibilities |
| :--- | :--- | :--- | :--- |
| [`cn()`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/lib/utils.ts#L4) | Utility Hub | 19 Edges | Merges Tailwind classes dynamically using `clsx` and `tailwind-merge` |
| [`NavBar()`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/ui/TubelightNavbar.tsx#L40) | Navigation Hub | 7 Edges | Floating tubelight navigation bar across main routes |
| [`Footer()`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/sections/Footer.tsx#L8) | Section Hub | 6 Edges | Site-wide footer with quick links, status indicators, and branding |
| [`GET()`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/api/spotify/now-playing/route.ts#L159) | Server API Hub | 6 Edges | Serverless route handlers processing external API requests |
| [`GuestbookPage()`](file:///Users/warunaudarasampath/Documents/projects/my-portfolio/my-dev-portfolio/app/guestbook/page.tsx#L54) | Feature Hub | 4 Edges | Real-time guestbook UI with Firebase authentication and Firestore listeners |

# BokehTV — Frontend (Next.js 14)

The BokehTV frontend is a high-performance, responsive web application built with **Next.js 14 (App Router)**. It provides a seamless media exploration and tracking experience with a focus on modern UX aesthetics and performance.

---

## 🏗 Core Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (Infinite Scroll and Cache-aside)
- **Image Optimization**: NextImage with TMDB remote patterns configured.
- **SEO**: Dynamic metadata API (Title Templates, OpenGraph, Twitter Cards).
- **Deployment**: Vercel

---

## 🚀 Development Setup

### 1. Environment Configuration
Copy the template and fill in your details:
```bash
cp .env.example .env
```
Ensure you have `NEXT_PUBLIC_API_URL` pointing to your backend (default: `http://localhost:5000/api/v1`).

### 2. Install & Start
```bash
npm install
npm run dev
```
The app will start at `http://localhost:3000`.

---

## 🎯 Architecture & Performance Highlights

### 1. UX Polish & Performance
- **React Suspense Skeletons**: Dynamic loading states for movie grids and detail pages (no "layout-shifts").
- **NextImage Optimization**: Integrated TMDB image domain with custom `sizes` and `priority` for LCP optimization.
- **Server Component First**: Logic is kept in server components wherever possible to minimize hydration costs.

### 2. SEO & Social Presence
- **Dynamic Meta Tags**: Automated title templates and OG/Twitter cards for all core routes.
- **Robots & Sitemap**: Auto-generated indexing protocols via the Next.js `metadata` API.
- **Analytic Integration**: Ready-to-use Vercel Analytics integration.

---

## 🏗 Deployment
Automatic high-availability deployments to **Vercel Edge Network** for all PRs and merges to `main`.
Features "Wait for CI" gates to ensure only passing code hits production.

---

## 🛡 License
MIT

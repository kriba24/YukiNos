# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

The repo has two levels:
- `/` — root workspace with only a `geist` font dependency and `node_modules`
- `/yukinos/` — the actual Next.js application (work here for all app changes)

All development commands should be run from inside the `yukinos/` directory.

## Commands

```bash
cd yukinos

npm run dev      # Start dev server (Next.js with Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router (`yukinos/app/`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (configured via `postcss.config.mjs`, imported via `@import "tailwindcss"` in `globals.css`)
- **Geist** font family (sans + mono) loaded via `next/font/google`

## Architecture

This is a standard Next.js App Router project. The entry point is `yukinos/app/page.tsx` and the root layout (`yukinos/app/layout.tsx`) sets up the Geist font variables and wraps all pages.

CSS theming uses CSS custom properties (`--background`, `--foreground`) defined in `globals.css` with a `@media (prefers-color-scheme: dark)` block for dark mode. Tailwind's `@theme inline` block maps these to Tailwind color utilities.

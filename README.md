# 1ce Frontend Public

This is the public frontend for **1ce**, a simple link sharer/shortener with analytics. Built with [SvelteKit](https://svelte.dev/docs/kit/introduction), it lets users access shortened links by connecting to the [1ce Backend](https://github.com/redi-b/1ce-backend). For creating or managing links, check out the [1ce Frontend Dashboard](https://github.com/redi-b/1ce-frontend-dashboard). It uses [Tailwind CSS](https://tailwindcss.com) for styling and [shadcn-svelte](https://www.shadcn-svelte.com) for UI components, with [Bun](https://bun.sh) as the package manager.

---

## Features

- Access and redirect shortened links with a clean, responsive UI
- Password-protected link access (if set up in the backend)
- Fast and lightweight frontend built with SvelteKit
- Styled with Tailwind CSS and shadcn-svelte components
- Modular component structure for easy maintenance

---

## Prerequisites

- [Bun](https://bun.sh/) ≥ 1.0 (package manager)
- [Node.js](https://nodejs.org/) ≥ 18 (optional, for non-Bun usage)
- Access to the [1ce Backend](https://github.com/redi-b/1ce-backend) API

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/redi-b/1ce-frontend-public.git
cd 1ce-frontend-public
```

### 2. Install Dependencies

Using Bun:

```bash
bun install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add the required URLs:

```bash
cp .env.example .env
```

Example `.env`:

```
PUBLIC_API_URL=http://localhost:3000
PUBLIC_DASHBOARD_URL=https://dashboard.1ce.example
```

Ensure the [1ce Backend](https://github.com/redi-b/1ce-backend) is running and accessible at the specified `PUBLIC_API_URL`.

### 4. Run the Development Server

```bash
bun run dev
```

This starts the SvelteKit development server, usually at `http://localhost:5173`. Open this URL in your browser to access shortened links.

### 5. Build for Production

```bash
bun run build
```

### 6. Preview the Production Build

```bash
bun run preview
```

This serves the production build locally for testing.

---

## Notes

- This frontend is only for accessing links. For link creation or management, use the [1ce Frontend Dashboard](https://github.com/redi-b/1ce-frontend-dashboard).
- Make sure the backend API is running and properly configured before starting the frontend.

# Kinetic Logic Labs

Kinetic Logic Labs is an independent engineering portfolio documenting CAD, fabrication, and science research. The current site is a React and Vite single-page portfolio with an editorial cobalt, ivory, and coral visual system.

## Local development

Requires Node.js 24.

```bash
npm ci
npm run dev
```

The local development server prints the preview URL when it starts.

## Production build

```bash
npm run build
```

The static production files are written to `dist/`.

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

After the repository is pushed to GitHub:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` to build and publish the site.

The portfolio uses hash-based routes, so direct links to pages such as `/#/projects` work on GitHub Pages without server-side routing rules.

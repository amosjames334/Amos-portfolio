# Portfolio Redirect Page

This repository hosts a lightweight redirect service for GitHub Pages that forwards traffic from this domain/repository to **[portfolio.amosjaimes.com](https://portfolio.amosjaimes.com)**.

## Features

- **Instant JS Redirect**: Uses `window.location.replace()` for smooth client-side redirection without clogging browser history.
- **HTML Meta Refresh Fallback**: Ensures redirection even if JavaScript is disabled.
- **Canonical Meta Tag**: Preserves SEO rankings and points search engines to the target canonical URL.
- **Deep Link Handling (`404.html`)**: Catches requests to sub-paths and forwards visitors smoothly to the target site.
- **Automated Deployment**: GitHub Actions workflow (`deploy.yml`) automatically builds and deploys updates on push to `main`.

## GitHub Pages Configuration

To host this page on GitHub Pages using GitHub Actions:

1. Go to your repository settings on GitHub: **Settings** > **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push changes to the `main` branch. The `.github/workflows/deploy.yml` action will deploy the site automatically.

# Octofit Tracker Frontend

## Environment variables

`VITE_CODESPACE_NAME` must be defined when running in GitHub Codespaces.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API endpoints using:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This avoids invalid URLs like `https://undefined-8000.app.github.dev/...`.

## Development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

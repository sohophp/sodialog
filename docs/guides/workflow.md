# 文档运维流程（Docs Operations Workflow）

## 1. Daily Development Loop

```bash
npm run dev
npm run test:run
npm run lint
npm run docs:build
```

`npm run dev` runs `build:demo` first and then starts VitePress, which keeps live docs and embedded demos in sync.

## 2. Content Update Rules

When code changes, update docs in the same PR with this order:

1. Update the relevant component guide in `docs/components/*.md`.
2. Update API reference pages in `docs/api/*.md`.
3. Update demo pages under `docs/public/components/*.html` if behavior changed.
4. Update migration or troubleshooting guide when compatibility changes.

## 3. Pre-merge Quality Gate

```bash
npm run test:run
npm run lint
npm run docs:build
npm run docs:test:smoke:ci
```

Merge only when tests, lint, docs build, and docs smoke pass together.

## 4. Release Workflow (Tag-driven)

```bash
npm run release:check -- vX.Y.Z
npm run test:run
npm run lint
npm run build
npm run build:demo
npm run docs:build
npm run docs:test:smoke:ci
git add -A
git commit -m "release: vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push --follow-tags
```

## 5. Post-release Documentation Tasks

1. Update `CHANGELOG.md` with release notes.
2. Confirm homepage highlights match the new feature set.
3. Validate API examples and quick start snippets against published package.
4. If there are breaking changes, update `docs/guides/migration-guide.md`.

## 6. CI Deployment Gate

- `.github/workflows/pages.yml` now runs `npm run docs:test:smoke:ci` before uploading Pages artifacts.
- `.github/workflows/npm-publish.yml` now runs `npm run release:verify` before npm publish.
- If smoke tests fail in CI, download the uploaded `docs-smoke-report-*` artifact and open `index.html`.
- Local report viewer: `npx playwright show-report playwright-report/docs-smoke`.
- Both workflows enforce job timeouts to avoid hanging runners (`pages: 20m/10m`, `npm-publish: 25m`).

## 7. Recommended Team Convention

1. API change requires API doc update.
2. Component behavior change requires at least one live demo update.
3. New feature is not complete until docs and changelog are updated.

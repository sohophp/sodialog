---
description: Use SoDialog from jsDelivr or UNPKG with fixed versions.
---

# CDN

<VersionBadge />

Use fixed versions in production. Avoid `@latest` for production pages.

<CdnExamples />

## Docs Example Versions

Runnable HTML examples under `/components/` resolve the CDN version through a shared loader. The default is maintained in `/components/sodialog-loader.js`, and you can temporarily override it with URL parameters:

- `?sodialogVersion=latest`
- `?sodialogVersion=0.3.8`

Use this for verification or CDN troubleshooting. Production pages should still copy a fixed-version URL from the snippets above.

## Notes

- jsDelivr is the recommended CDN.
- UNPKG is a useful fallback.
- Self-host the files when your CSP blocks external scripts.

# Guides

Guides collect workflow-oriented documentation for adopting, styling, migrating, troubleshooting, and releasing SoDialog. API details stay in the API reference; this area helps you choose the right path.

## Adoption

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/en/installation"><h3>Installation</h3><p>npm install, ESM imports, and stylesheet entry.</p></a>
  <a class="sod-doc-tile" href="/en/cdn"><h3>CDN</h3><p>Fixed CDN versions, ESM/UMD entries, and example version overrides.</p></a>
  <a class="sod-doc-tile" href="/en/frameworks"><h3>Frameworks</h3><p>Client lifecycle guidance for React, Vue, Nuxt, and Next.js.</p></a>
  <a class="sod-doc-tile" href="/en/themes"><h3>Themes</h3><p>CSS variables, host page coexistence, and Bootstrap compatibility boundaries.</p></a>
</div>

## Maintenance

<div class="sod-doc-grid-compact">
  <a class="sod-doc-tile" href="/en/migration"><h3>Migration</h3><p>Move from legacy dialogs or in-house wrappers to SoDialog.</p></a>
  <a class="sod-doc-tile" href="/en/troubleshooting"><h3>Troubleshooting</h3><p>Debug style, focus, CDN, queue, and lifecycle issues.</p></a>
  <a class="sod-doc-tile" href="/en/faq"><h3>FAQ</h3><p>Common usage questions and design boundaries.</p></a>
  <a class="sod-doc-tile" href="/en/guides/workflow"><h3>Development Workflow</h3><p>Release verification, version checks, and CI paths.</p></a>
</div>

## Adapter Design

- [Adapter Guidelines](/en/guides/adapter-guidelines): unified entry points, trace diagnostics, logging, and anti-patterns.
- Framework adapters should remain thin wrappers outside the core runtime.

---
title: Documentation IA and Inner Page UX Refresh
description: Notes on restructuring SoDialog docs, Labs, API Reference, changelog, and version center.
tags:
  - docs
  - ux
  - api
  - release
  - quality
---

# Documentation IA and Inner Page UX Refresh

`2026-06-23 · docs · ux · api · release · quality`

This refresh focused on turning the docs from a polished project site into a more practical component-library workstation.

## What Changed

- Split navigation into Docs, Components, API, Examples, Guides, Changelog, Versions, and Notes.
- Kept Blog notes out of component, API, and guide sidebars.
- Added reusable page headers, version metadata, quick actions, and short runnable examples.
- Added Labs as the examples hub, with Modal Lab as the first interactive implementation.
- Added API indexes for methods, types, global config, adapters, and lifecycle hooks.
- Added installation, CDN, framework, theme, migration, troubleshooting, FAQ, changelog, and version pages.

## Tradeoffs

Historical documentation snapshots are not copied yet. Existing demos remain available while Labs are migrated gradually.

## Verification

The documentation uses the package version from `package.json`; CDN examples and version badges no longer hardcode separate versions.

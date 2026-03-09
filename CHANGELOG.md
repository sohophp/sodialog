# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog and generated from git tags/commits.

## [Unreleased]

### Added
- adapter-first APIs: `configureAdapter`, `openDialog`, `bindDialogContextMenu`, `pushMessage`
- dialog `onLayoutStable` hook and timing controls (`layoutStableFrames`, `layoutStableOnRefit`)
- optional `traceId` passthrough for dialog/toast/context-menu lifecycle and action contexts
- scoped `.legacy-skin` compat styles for legacy UI alignment
- migration docs: `adapter-guidelines.md`, `migration-guide.md`, `troubleshooting.md`
- implementation plan document: `IMPLEMENTATION_PLAN_0.2.md`
- a11y focus restore: dialog/context-menu close now restores focus to trigger element
- a11y semantics: dialog now links title/body via `aria-labelledby` and `aria-describedby`; context-menu syncs `aria-controls` and `aria-expanded` on trigger
- global configure APIs: `configureDialog` and `configureContextMenu`
- public CSS tokens for dialog/button/toast/context-menu theme customization
- scenario playbook entries in troubleshooting docs for migration and behavior tuning
- context-menu keyboard navigation and activation support (`ArrowUp/ArrowDown/Home/End/Tab/Enter/Space`)
- dedicated `ContextMenu Lab` examples page with basic binding, close strategy, and close-first-open-next dialog flow demo
- context-menu first-character typeahead navigation for faster keyboard selection
- context-menu `onFocusItem` callback for observing keyboard/script-driven focus changes via public API
- context-menu `onTypeahead` callback for observing typeahead query/match results via public API

### Changed
- package version bumped to `0.2.0` for major capability upgrade line
- tests expanded for adapter behavior, layout-stable callback, and trace propagation
- API reference page synced with global configure APIs and related type definitions
- examples synced with runnable global-config demo scenario
- tests expanded with context-menu keyboard interaction coverage
- examples hub and shared lab navigation now include `ContextMenu Lab`
- API and examples docs now describe typeahead behavior in context-menu keyboard interactions
- context-menu keyboard handling now avoids double key processing and keeps `closeOnEsc: false` behavior intact
- context-menu focused item now has visible focus ring for script-driven focus movement
- context-menu "关闭策略与键盘交互" demo now matches the displayed source snippet (multi-item policy menu)
- context-menu demo now includes keyboard feedback panels for current focused item and latest action
- fixed context-menu typeahead matching for mixed labels like `删除 Delete` and improved forward cycling across matched items
- API/README/ContextMenu Lab docs now explicitly describe mixed-label matching and same-letter cycling behavior
- ContextMenu Lab now surfaces close reason feedback (`esc/outside/item/blur/scroll/resize/...`) for easier interaction-path diagnosis
- ContextMenu Lab focus feedback now uses public `onFocusItem` callback instead of internal custom event wiring
- ContextMenu Lab now shows typeahead feedback panel (query + matched/missed item) using `onTypeahead`

## [0.1.20] - 2026-03-09

### Commits
- feat(docs): add standalone API page and pinned header UX
- feat(context-menu): add bindContextMenu API with lifecycle hooks and handle controls
- feat(context-menu): support menu item icons and Bootstrap Icons class rendering
- feat(context-menu): harden close and destroy behavior (esc/outside/blur/scroll/resize)
- docs(api): add context menu API reference and icon field documentation
- docs(examples): add context menu demo sections for examples and legacy demo pages
- feat(demo): add modal-internal context menu demo with icon actions and cleanup
- test(context-menu): cover open/close behavior and icon rendering
- chore(eslint): ignore dist-pages generated assets during lint

## [0.1.19] - 2026-03-08

### Commits
- chore(release): prepare v0.1.19
- docs(changelog): update unreleased entries
- feat(docs): add standalone API page and pinned header UX
- docs(changelog): update for v0.1.18

## [0.1.18] - 2026-03-08

### Commits
- feat(modal): add form modal API with docs and examples
- chore(lockfile): sync package-lock for v0.1.17
- docs(changelog): update for v0.1.17

## [0.1.17] - 2026-03-08

### Commits
- feat(docs): add detailed examples page and unify header navigation
- docs(changelog): update for v0.1.16

## [0.1.16] - 2026-03-08

### Commits
- test: add vitest coverage for toast and modal core flows
- feat(dialog): add promise-based confirm and prompt APIs
- feat(lifecycle): unify modal/offcanvas/toast lifecycle hooks
- docs(changelog): update for v0.1.15

## [0.1.15] - 2026-03-08

### Commits
- docs: enhance README and docs homepage
- docs(changelog): update for v0.1.14

## [0.1.14] - 2026-03-07

### Commits
- feat(toast): add duplicate strategies and window-blur timer pause
- feat(demo): add interactive toast controls and migration showcase
- feat(toast): add queue, placement migration, and progress countdown
- docs(toast): add implementation planning document
- style(docs): smooth anchor scroll and target focus animation
- style(docs): replace pill nav links with squared tabs
- revert(docs): restore original hero navigation
- fix(docs): keep only one section navigation
- feat(docs): add sticky section nav and active scroll highlighting
- style(docs): enhance hero branding and visual polish
- feat(docs): add local logo and refresh docs homepage style
- fix(pages): add favicon.ico for docs and demo pages
- fix(pages): use lowercase repo base path
- docs: embed legacy demo into docs homepage
- docs: clarify GitHub Pages source uses GitHub Actions
- docs: build GitHub Pages homepage for docs and usage
- docs(changelog): update for v0.1.13

## [0.1.13] - 2026-03-07

### Commits
- docs(changelog): update for v0.1.12

## [0.1.12] - 2026-03-07

### Commits
- feat: enhance footer API and multi drag handles
- fix: satisfy lint in changelog generator
- docs: add changelog generation and auto-update workflow
- docs: align npm token guidance with granular tokens

## [0.1.11] - 2026-03-07

### Commits
- fix: add repository metadata for npm provenance

## [0.1.10] - 2026-03-07

### Commits
- ci: prefer automation token publish with oidc fallback

## [0.1.9] - 2026-03-07

### Commits
- ci: enforce trusted publishing to avoid otp

## [0.1.8] - 2026-03-07

### Commits
- fix: workflow secret condition

## [0.1.7] - 2026-03-07

### Commits
- ci: support token-first npm publish with OIDC fallback

## [0.1.6] - 2026-03-07

### Commits
- ci: switch npm publish to trusted publishing

## [0.1.5] - 2026-03-07

### Commits
- ci: fix bash quoting in npm publish workflow

## [0.1.4] - 2026-03-07

### Commits
- docs: add npm auto-publish guide for tag release

## [0.1.3] - 2026-03-07

### Commits
- No user-facing commit messages recorded in this range.

## [0.1.2] - 2026-03-07

### Commits
- No user-facing commit messages recorded in this range.

## [0.1.1] - 2026-03-07

### Commits
- release: prepare v0.1.1
- feat: build reusable SoDialog npm library

[Unreleased]: https://github.com/sohophp/sodialog/compare/v0.1.20...HEAD
[0.1.20]: https://github.com/sohophp/sodialog/releases/tag/v0.1.20
[0.1.19]: https://github.com/sohophp/sodialog/releases/tag/v0.1.19
[0.1.18]: https://github.com/sohophp/sodialog/releases/tag/v0.1.18
[0.1.17]: https://github.com/sohophp/sodialog/releases/tag/v0.1.17
[0.1.16]: https://github.com/sohophp/sodialog/releases/tag/v0.1.16
[0.1.15]: https://github.com/sohophp/sodialog/releases/tag/v0.1.15
[0.1.14]: https://github.com/sohophp/sodialog/releases/tag/v0.1.14
[0.1.13]: https://github.com/sohophp/sodialog/releases/tag/v0.1.13
[0.1.12]: https://github.com/sohophp/sodialog/releases/tag/v0.1.12
[0.1.11]: https://github.com/sohophp/sodialog/releases/tag/v0.1.11
[0.1.10]: https://github.com/sohophp/sodialog/releases/tag/v0.1.10
[0.1.9]: https://github.com/sohophp/sodialog/releases/tag/v0.1.9
[0.1.8]: https://github.com/sohophp/sodialog/releases/tag/v0.1.8
[0.1.7]: https://github.com/sohophp/sodialog/releases/tag/v0.1.7
[0.1.6]: https://github.com/sohophp/sodialog/releases/tag/v0.1.6
[0.1.5]: https://github.com/sohophp/sodialog/releases/tag/v0.1.5
[0.1.4]: https://github.com/sohophp/sodialog/releases/tag/v0.1.4
[0.1.3]: https://github.com/sohophp/sodialog/releases/tag/v0.1.3
[0.1.2]: https://github.com/sohophp/sodialog/releases/tag/v0.1.2
[0.1.1]: https://github.com/sohophp/sodialog/releases/tag/v0.1.1

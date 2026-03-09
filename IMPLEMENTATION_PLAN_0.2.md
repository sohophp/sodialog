# SoDialog 0.2.x Implementation Plan

## Goal
Deliver adapter-first integration, compat theme, lifecycle stability hooks, observability, and migration docs based on `prompts/sable1.md` feedback.

## Phases

### Phase 1 (P0 foundation)
- Add adapter-first public APIs:
  - `configureAdapter`
  - `openDialog`
  - `bindDialogContextMenu`
  - `pushMessage`
- Keep backward compatibility with existing APIs.
- Add trace support on adapter level (`traceId` passthrough).

### Phase 2 (P0 experience consistency)
- Add layout stability callback for dialog:
  - `onLayoutStable`
  - optional `layoutStableFrames` for timing tuning
- Add compat/legacy skin class support:
  - scoped by `.legacy-skin`
  - map footer alignment and button styling deltas

### Phase 3 (P1 collaboration and docs)
- Add close-first-open-next context menu to dialog guidance and helper path.
- Add docs:
  - `adapter-guidelines.md`
  - `migration-guide.md`
  - `troubleshooting.md`
- Update README links and examples.

### Phase 4 (quality gate)
- Add/extend tests:
  - adapter behavior and default override
  - layout stable hook firing
  - trace id passthrough
  - compat skin class usage snapshot-level checks
- Run `npm run test:run`, `npm run lint`, `npm run build`.

### Phase 5 (release prep)
- Bump version to `0.2.0`.
- Add changelog notes for breaking-scale improvements (while keeping API compatibility).
- Create git tag `v0.2.0` after validation.

## Exit Criteria
- P0 items complete and verified.
- New docs exist and are linked.
- Version upgraded to 0.2.x and release checks pass.

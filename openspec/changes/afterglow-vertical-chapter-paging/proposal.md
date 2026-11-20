# Proposal

## Why

[Issue #25](https://github.com/dvale94/kyrshas-app/issues/25) authorizes Phase 04B following merged Afterglow design PR #24. The stacked home feed needs a finite full-screen chapter foundation that proves vertical navigation and reliable overflow reading before artwork or visual refinement.

## What Changes

- Present five mounted viewport-height chapters in exact order: `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`.
- Add native vertical snapping, settled chapter position, location progress and accessible bounded Previous/Next actions.
- Measure actual viewport and reading content; disable outer swipe navigation for an overflowing chapter and provide a bounded inner reading region with explicit navigation.
- Preserve independent initial requests, scoped refresh/retry, duplicate/stale protection, last-good content and successful-revision trivia visibility semantics.
- Add synthetic paging/state/overflow tests, run unchanged verification, attempt the existing external unsigned Debug/XCUITest acceptance workflow, and deliver a report, additive handoff and draft PR.

## Capabilities

### New Capabilities

- `chapter-navigation`: Finite accessible five-chapter navigation, settled location, overflow reading and retained content presentation state.

### Modified Capabilities

None. Main specs are empty. Prior unarchived changes remain historical contracts; this pilot implements the paging portion of the approved Afterglow design without changing provider contracts or previous artifacts.

## Impact

Base is fetched main `ca1230ae2ce28d424a3452d169390c67521a48b4`; owner worktree/index clean. Scope: modern `src/home/HomeScreen.tsx`, focused new pager/reading components/helpers, minimal ContentCard/CardText integration if required, modern tests/fixtures, this change, `docs/migration/afterglow-vertical-chapter-paging.md`, `.agentic/reports/issue-25-afterglow-paging.md` and additive `.agentic/handoff.md`. Existing behavior assertions stay covered when layout assertions change.

Keep the existing provider/hook, Expo SDK 58, portrait iPhone-only identity `com.dvale1994.kyrshasapp`, mock default/production and explicit local-only live mode. No final artwork/fonts, rich animation, new packages, backend, persistence, birthday, remote media, config/security/CI/native changes or real API calls. Preserve both native trees, owner backup, credentials and any owner work. No prebuild, reset, stash, Pods/signing, merge, deployment, publishing, archive or main-spec sync. Any material design departure or built-in paging limitation requires owner review with evidence.

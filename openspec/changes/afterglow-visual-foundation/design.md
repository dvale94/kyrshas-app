# Design

## Context

See proposal.md for motivation and issue #27 for authorization. Main e0ba950 contains the merged Afterglow design specification and 04B pager. HomeScreen owns one useHomeContent session; ChapterPager measures fixed page extent; ChapterReading arbitrates overflow and retains offsets; ContentCard/CardText own presentation and revision-keyed trivia. Existing green styles and bright image placeholders conflict with the approved dark direction. The manifest contains no theme, gradient or safe-area package.

Authoritative references: docs/design/afterglow/{visual-specification,interaction-model,feasibility-accessibility,implementation-roadmap}.md and docs/migration/afterglow-{design-audit,vertical-chapter-paging}.md. Their numerical values are recommendations. Issue #27 supersedes historical manual assistive-testing acceptance gates; older records stay intact.

## Goals / Non-Goals

**Goals:** coherent dark hierarchy and generous reading type, subtle category framing, compact chrome, concrete contrast evidence and real simulator review. Keep existing mounting, request, overflow and trivia ownership intact.

**Non-Goals:** final illustrated worlds, custom font files, complex graphics/motion, new dependencies, native/security/config changes, provider refactoring, persistence or birthday. Do not alter App entry, scripts, locks or previous OpenSpec artifacts.

## Decisions

- A small presentation-owned tokens.ts exports canvas #0B1026, surface #161D3D, elevated #24224D, text #FFF8F5/#D8D2EC, inactive #8E88B2 and the approved five accents. Spacing/radii/touch/type roles are shared. Keep data fixtures unchanged. Inline repeated colors and a theme package were considered; tokens keep concrete contrast auditable without dependencies.
- Use opaque reading/answer surfaces, never rely on an illustration overlay for readability. Keep optional placeholder semantics but quiet its colors in the presentation. Simple noninteractive accent geometry is optional, with no production-art claim. Removing media contracts was rejected.
- Use iOS Georgia for expressive body/answer only if verified on the simulator; use platform system serif/sans fallbacks. Functional UI stays system sans. Body 28/37, answer 26/35, author/status 17/25, category/position 16/22. No text clipping/shrinking. Long content uses leading alignment. Custom fonts need later approval.
- Canonical category identity is independent of provider text. Preserve a differing supplied title as secondary complete text; do not uppercase or truncate arbitrary provider titles. Refresh remains a 48-point target. Existing outcome announcements and hidden-page filtering remain.
- Keep all paging/reading algorithms and callback signatures unchanged. Restyle the existing five-segment progress with a longer/thicker selected accent, quiet Previous/Next with explicit boundaries and native safe-area padding applied once. Move repetitive cue below reading content; retain honest mode caption on Quote.
- Retain React Native SafeAreaView for reliable native insets. No demonstrated dependency-free replacement exists in this scope. Suppressing warnings or hard-coding notch heights was rejected; document deprecation and defer replacement.
- Use an isolated Git worktree; Gortex tracks that instance for guarded edits. Capture native metadata only, not native file contents; do not access backup or private credentials. Safe test environment strips inherited EXPO_PUBLIC_*/EAS_* values and disables dotenv/telemetry.

## Risks / Trade-offs

- Larger expressive type increases overflow → retain measured inner reader and visible chapter controls; review compact/long/large-text captures.
- System serif availability differs → verify iOS family in actual simulator and keep platform fallback; final brand font is deferred.
- Opaque panels reduce cinematic immersion → favor guaranteed legibility now; final art/crops need separate evidence.
- Gortex dependency coverage is a lower bound → keep signatures unchanged and run all existing regressions plus focused contrast/chrome tests.
- Native deprecation warning remains → disclose; no new package/native configuration adopted.

## Migration Plan

Strictly validate this complete change and all active specs before source edits. Apply only presentation and focused tests, run full unchanged verify and preservation checks, capture disposable-simulator evidence using an existing verified unsigned Debug app and external runner. No application native build or signing. Rollback is reverting this scoped PR; no data migration. Deliver draft PR only; no merge/archive.

## Open Questions

Owner review remains for exact visual/type tuning and future rights-cleared illustrations or bundled fonts. These do not change this static foundation's behavior or acceptance. Safe-area replacement belongs to a separately approved compatibility change.

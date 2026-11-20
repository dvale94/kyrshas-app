# Design

## Context

See [proposal](proposal.md) and [capability spec](specs/chapter-navigation/spec.md). The approved [interaction model](../../../docs/design/afterglow/interaction-model.md) and [roadmap](../../../docs/design/afterglow/implementation-roadmap.md) authorize a built-in paging shell first. Current HomeScreen owns one `useHomeContent(provider)` call and renders five stable keyed ContentCards. ContentCard retains last-good content and keys CardText by successful revision, preserving answer state through failure and resetting even identical successes. Tests already cover independent loads, stale/duplicate work, safe errors and synthetic transport.

Legacy architecture/product/verification notes describe historical source. Later approved design and issue #25 control modern iPhone portrait/no-birthday scope. Do not rewrite historical records. Gortex reports incomplete reference resolution for HomeScreen; empty impact is not proof of no consumers.

## Goals / Non-Goals

**Goals:** Stable measured page geometry, semantic settled selection, unambiguous vertical reading, retained mounted data/presentation state and executable evidence.

**Non-Goals:** Provider/transport/schema changes, virtualizing five lightweight chapters, routes, final visual tokens/fonts/artwork, entrance effects or new native integration. Existing readable temporary colors/placeholders are sufficient.

## Decisions

1. **Keep ownership above presentation.** HomeScreen keeps its existing hook, passes five cards to a focused pager, and never keys a provider by chapter. Preserve stable chapter mounts. A provider-session change resets reading/answer through the existing idle/revision lifecycle, retaining active position. Alternative virtualization adds unnecessary state restoration obligations.
2. **Native bounded vertical snapping.** Use React Native ScrollView with measured viewport height, five fixed child heights, snap offsets, fast deceleration and disabled interval momentum. Keep one drag transaction with its origin and latest offset; publish a clamped, adjacent index only at settlement. Correct any unexpected native overshoot to the bounded destination. Ignore repeated navigation during settlement. Include idle/no-momentum fallback and cancellation handling. Explicit buttons jump without additional animation, so reduced-motion users need no smooth programmatic travel. No custom gesture recognizer/package.
3. **Safe geometry.** Use existing built-in safe-area support, once, around the shell. Persistent compact position/progress and wrapping navigation controls reserve their own space; measure the remaining pager viewport rather than use screen constants. Layout/type changes cancel transient navigation, retain settled ID and realign. Put category, status, mode caption and refresh inside the scrollable reading region so chrome cannot crowd them out. Use flex/minHeight zero reading containment, not fixed text heights.
4. **Measured reading mode.** Each mounted chapter has a bounded inner ScrollView. Compare natural content extent with available reading height after layout and every content/answer/type change; unknown geometry conservatively prevents paging. Enable reading and disable the outer swipe pager for active overflow. Keep explicit navigation outside reading. Native read offset stays across revisits/failure; clamp after layout/answer shrink, reset only on successful revision/session. Text and controls never truncate or shrink. Keep optional existing local placeholder support; no art additions.
5. **Accessibility.** Progress exposes one name/position summary and five decorative segments with a distinct selected shape. Previous/Next expose destination and disabled state, minimum 48-point targets and wrapping scalable text. Supply equivalent accessibility actions; hide inactive page descendants without unmount. After a deliberate chapter change, focus the position summary once rather than separately announcing it. Keep current explicit refresh outcome feedback and quiet startup. Screen-reader mode disables outer swipe paging, retaining inner reading and explicit chapter actions. Actual speech ordering remains a manual review limit.
6. **Tests and evidence.** Add synthetic layout/scroll events for geometry, short/aborted/fast drags, bounds, progress/actions, overflow/answer changes and provider/state retention; keep existing provider/local-content assertions. Adapt previous feed tests to inspect mounted hidden pages explicitly where they test data rather than accessibility navigation; a separate pager suite checks visibility defaults. Use the pinned Node/npm, dotenv-disabled unchanged verify, strict active/all specs, harness, policy/native/scope/whitespace checks and hosted CI. Snapshot only metadata of original native trees and preserve the clean index until intentional scoped staging. Never read credentials or owner backup.
7. **Simulator acceptance.** Reuse the established matching external unsigned Debug binary with localhost Metro serving a filtered synthetic source copy; generate/build only an external standalone UI runner. Use a disposable compact iPhone, default and largest Dynamic Type, screenshots and assertions for reading versus navigation, finite traversal and trivia revisit. Keep all artifacts external and preserve failed attempts. If required existing tooling/binary cannot be reused safely, report BLOCKED/NOT RUN and provisional interaction acceptance; do not repair native/config/Pods scope.

## Risks / Trade-offs

- Nested vertical scroll ownership → active measured overflow disables the outer pager completely, including reading edges; real compact-iPhone test is decisive.
- Scroll events/native momentum vary → native snap settings plus adjacent settlement correction, cancellation/idle fallback and real swipe acceptance; stop for material built-in limitations.
- Largest text reduces space → scroll all variable chapter chrome with body, keep brief global navigation and position, and verify positive reading extent on compact iPhone.
- Mounted five pages retain memory → lightweight existing views only; no heavy new artwork.
- Test renderer cannot prove native arbitration or VoiceOver speech → report automated and simulator evidence independently, retain manual owner review limits.

## Migration Plan

No persistent migration or deployment. Validate complete planning before source edits; implement/test bounded slices and review as a draft against main. Rollback is a scoped revert of this change after owner review, never a worktree reset. Previous OpenSpec changes/main specs/native trees remain untouched and unarchived.

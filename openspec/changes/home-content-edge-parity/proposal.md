# Proposal

## Why

Issue #15 follows merged PR #14: the synthetic asynchronous feed works, but content edge cases need explicit presentation acceptance and every card currently announces routine iOS startup transitions. Refine readability and accessibility without replacing the existing provider/hook or claiming real-image production parity.

## What Changes

- Specify and test short, very long, multiline and Unicode content, optional/blank attribution, long trivia prompt/answer and long headings.
- Retain optional locally authored label/color placeholders with text-only fallback; reject malformed media through existing per-card normalization/error/retry.
- Make minimal layout corrections demonstrated by edge tests/native screenshots, preserve green hierarchy and 48px controls, hide decorative accessibility children.
- Silence routine startup announcements; explicitly announce only settled user-requested outcomes, leaving accessible loading/error semantics.
- Retain all 40 tests, add meaningful offline presentation/announcement cases and actual disposable iPhone edge/normal acceptance; record preservation and separate local/native/hosted evidence with workflow metrics.

## Capabilities

### New Capabilities

- `home-content-presentation`: synthetic content-specific media/text layout and restrained accessible feedback. Main spec inventory is empty; prior unarchived changes define the retained UI/orchestration contracts.

### Modified Capabilities

None.

## Impact

Only modern home presentation/types as needed, synthetic test fixtures, Jest/native smoke, OpenSpec and delivery documentation. Existing async provider, successful revision/trivia identity, last-good/stale/duplicate protections remain authoritative. No dependency, lockfile, config, permissions, transport, persistence or native project changes. Preserve original app, both ignored native trees (baseline 20,437/30,193 entries), backup and owner files. No live provider, remote/base64 image, private birthday assets, redesign, merge, deployment, release or archive. Future real-media/security decisions remain #03F.

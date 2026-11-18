# Design

## Context

See proposal.md for motivation and issue authorization. Main at ed9cf95 has five fixtures with legacy IDs including spaces, card-local variant/timer/error state, and 17 functional tests. Legacy starts five calls with Promise.all; a rejection can block startup. Existing accepted OpenSpec changes retain the presentation and strict Release/default ATS, with Debug localhost only. Native trees are ignored and protected; baseline fingerprints and clean owner/index inventory precede execution.

## Goals / Non-Goals

**Goals:** Centralize content ownership and independent request lifecycle without changing layout. Make races/failures reproducible with deferred providers. Keep all fixtures and mock timing local.

**Non-Goals:** Transport DTOs, live integration, persistence, global state library, new dependencies, production imagery, birthday flow, native generation/build repair or policy changes.

## Decisions

1. **Small typed seam.** Add CardContent as a discriminated union keyed by the exact legacy IDs and a ContentProvider.load(cardId, context) promise contract. Context carries the last successful variant position; the deterministic mock is otherwise stateless. Normalize/validate identity, required text/answer and optional local image at the orchestration boundary; drop extraneous fields and empty optional attribution. This avoids coupling presentation to response envelopes. Moving fixtures into a network-style DTO or global store adds no value.
2. **Home hook owns requests.** Independent async requests start together in one effect and update only their slot with functional state. A request map suppresses duplicate in-flight actions synchronously, including rapid presses before rerender. Each effect generation owns its map and active flag; replacement/unmount invalidates it. Per-request identity is checked before both success and error updates. No actual cancellation is needed for these in-process promises; stale work can finish safely.
3. **Explicit slot lifecycle.** Each slot has idle/loading/ready/error status, optional last-good content and a successful revision. Loading with content is refresh; loading without it is startup/retry. A failed attempt never advances the mock variant cursor. Errors are generic, with a labeled Retry action. Revision changes only on success and keys CardText locally so failed or unrelated updates preserve trivia visibility. A provider replacement resets slots and starts a new lifecycle.
4. **Mock-only latency.** Default mock delay remains 650ms for observable startup/refresh; tests inject a wait function or deferred provider. No wall-clock data, randomness, HTTP or provider endpoints. The app's default provider is created once outside render. A deterministic failure provider is injected only in an external simulator validation copy, followed by normal-source smoke; no hidden production failure switch.
5. **Native proof without native mutation.** JS-only changes can reuse the prior patched unsigned Debug simulator binary over localhost Metro, recording its hash/provenance. Check source/synchronizer and existing independently processed Debug/Release policies. Do not claim a new native build if none is needed. Generate standalone XCTest outside Git and install only on a newly created disposable iPhone. Extend the smoke source for startup/status and controlled failure/retry; keep screenshots/logs/xcresult outside Git.

## Risks / Trade-offs

- Mock timing can hide races → deferred-promise tests resolve/reject in reverse order and during replacement/unmount; no real sleeps in unit tests.
- Stateful trivia might reset too often → key only by that card's successful revision; verify unrelated refresh and failed refresh.
- In-process work is not cancellable → cleanup prevents obsolete writes; future transport cancellation requires a separate approved design.
- Native app and hosted CI prove different things → report each separately, including reused binary provenance and limits of production visual/physical-device coverage.
- Native/owner changes outside Git → compare full path/type/content fingerprints before/after; backup remains untouched.

## Migration Plan

Validate this complete change strictly before source edits. Implement seam/mock, hook/UI and expanded tests as one bounded change. Run clean external npm ci and unchanged verify plus existing policy/sync/harness/spec checks; troubleshoot within issue boundaries. Execute disposable simulator normal and controlled-failure smoke, restore normal source in the validation copy and repeat. Verify preservation, update task tracking/reports/handoff, push scoped commits and open a draft PR against main. Rollback is the scoped source diff only; no native reset, destructive operation, merge or OpenSpec archive.

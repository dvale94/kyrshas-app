# Proposal

## Why

Issue [#13](https://github.com/dvale94/kyrshas-app/issues/13) moves the accepted five-card home from card-local fixture timers to typed asynchronous content ownership. Independent failure and request identity establish a testable seam for a separately approved future integration.

## What Changes

- Add a discriminated content model, injectable asynchronous provider contract and deterministic in-process mock variants with configurable mock-only timing.
- Centralize five concurrent initial loads and isolated refresh/retry state; retain last-good content, suppress duplicates and discard obsolete completions.
- Preserve the accepted green UI, legacy IDs/order, artwork/text/author variants, accessible trivia controls and portrait scrolling. Add accessible initial loading and actionable safe errors. New trivia success resets its answer; unrelated updates and failed refresh preserve it.
- Expand deferred-promise functional coverage and actual disposable iPhone smoke, record locked verification, hosted CI and preservation/workflow metrics.

## Capabilities

### New Capabilities

- `home-content-orchestration`: Typed offline asynchronous home content with independent loading, failure recovery and concurrency safety.

### Modified Capabilities

None. `openspec list --specs` returns no archived main capabilities; prior accepted changes remain unarchived and their presentation/policy contracts remain applicable.

## Impact

Scoped to `modernization/expo-next/src/home`, its tests and disposable smoke source, this OpenSpec change, migration documentation, issue report and handoff. No dependency/config/lock, legacy/native project, identity, ATS, persistence, live API, credentials, birthday, signing, deployment or release changes. Start at fetched main `ed9cf953f25c4e6a4aa8189c230a34c500b0567f` on `pilot/03c-content-orchestration`. Issue/user authorization covers implementation after the strict planning gate; no merge or archive.

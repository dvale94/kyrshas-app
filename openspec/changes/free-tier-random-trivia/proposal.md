# Proposal

## Why

[Issue #21](https://github.com/dvale94/kyrshas-app/issues/21) reports that Free-tier API Ninjas rejects the premium-only trivia category parameter. The owner approves a minimal local-development compatibility fix while preserving random questions on load and refresh.

## What Changes

- Request exact `https://api.api-ninjas.com/v1/trivia` without query parameters and remove obsolete trivia topic selection.
- Replace topic URL expectations with fake-transport regressions for query-free requests, response mapping, refresh and repeated content; retain existing UI/error/guard coverage.
- Explain Free unfiltered random trivia and its limited catalog/repeats in the local-development runbook and architecture note.

## Capabilities

### New Capabilities

- `local-development-content`: reuse the capability path introduced in the unarchived `local-random-api-development` change. Because no main spec exists, this delta uses ADDED with the full updated five-route requirement. It supersedes only the prior four-topic trivia rule; historical artifacts remain intact.

### Modified Capabilities

- None in `openspec/specs/`; this issue neither synchronizes nor archives specs.

## Impact

Product edits are limited to `modernization/expo-next/src/home/localApiNinjas.ts`; affected tests are `__tests__/LocalContent.test.tsx`. Docs, this bounded OpenSpec change, handoff and issue report record acceptance. Other four routes, mock/default/production gates and all card behaviors are preserved. No credentials/private env/native-project access, live API requests, configuration/dependency changes, photo backgrounds, birthday, merge, deployment, release or OpenSpec archive. Strict validation precedes source edits; full unchanged verify runs in an isolated copy and one draft PR targets latest main.

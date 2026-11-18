# Proposal

## Why

Issue #11 approves Pilot 03B: the isolated Expo 58 app currently demonstrates only trivia, while the legacy home presents five independently refreshable cards. Migrate the observed normal-day presentation using deterministic synthetic fixtures so the UI can be tested without private content or provider credentials.

## What Changes

- Render the single green-branded home and five cards in canonical order with the original stable IDs, conditional imagery, attribution, trivia toggle and accessible refresh/loading controls.
- Use typed, local fixture variants and authored geometric image placeholders; rotate only the selected card. Clear busy state in finally and retain content on failure.
- Replace the single-trivia tests with stronger five-card coverage and update the standalone native smoke to exercise scrolling, Show/Hide, refresh, portrait and relaunch through the approved Metro loop.
- Record legacy parity, deliberate differences, actual local/hosted verification, preservation and workflow metrics.

## Capabilities

### New Capabilities

- `home-feed`: Synthetic normal-day home/card presentation and scoped interactions. There are no archived/main specs yet; the earlier unarchived offline-demo change remains compatible (a deterministic trivia question with accessible show/hide).

### Modified Capabilities

None.

## Impact

Application and test changes are confined to `modernization/expo-next/`; planning, migration docs, issue report and handoff are also updated. No dependency, navigation package, provider, credentials, persistence, security policy, identity, native project, backup, signing or release changes. October 3 birthday behavior/assets are deferred to Pilot 03E. Issue #11 and the initiating user instruction approve planning and implementation within this scope; no additional scope decision is required. Deliver one draft PR against freshly fetched main, without merging or archiving.

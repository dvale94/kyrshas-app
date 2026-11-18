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

Application and test changes are confined to `modernization/expo-next/`; planning, migration docs, issue report and handoff are also updated. The original UI delivery excluded dependency changes. The separately authorized patch continuation permits only expo58.0.25→supported~58.0.26 and jest-expo58.0.14→supported~58.0.15, npm-generated lock updates and required compatible transitives. Preserve SDK58 major/minor, React/RN/all other direct dependencies, native plugins, identity/security/signing/release configuration and both native trees. No navigation package, provider, credentials, persistence, native regeneration or backup change. October 3 birthday behavior/assets are deferred to Pilot 03E. Issue #11 and the initiating user instruction approve planning and implementation within this scope; no additional scope decision is required. Deliver one draft PR against freshly fetched main, without merging or archiving.

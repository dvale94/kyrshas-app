# Proposal

## Why

The owner replaced issue #19's backend plan on November 19, 2026 with a personal, local Expo development experiment. Restore fresh random API-backed content through the existing five-card provider seam while keeping offline mocks and production network exclusion.

## What Changes

- Add an explicitly enabled development-only direct API Ninjas provider and bounded injectable HTTPS transport; preserve independent async loading, refresh, retry, last-good content, trivia and accessibility.
- Keep deterministic mock mode by default; require development runtime, `EXPO_PUBLIC_CONTENT_MODE=live-local` and a new local key together. Show the active mode honestly.
- Exempt placeholder-only `.env.example` from the existing app `.env*` ignore rule; verify the exact `modernization/expo-next/.env.local` remains ignored, absent and untracked. The owner alone creates and populates it privately.
- Add a local-only ADR addendum superseding proposed ADR0002 for this scenario, setup/rollback documentation and synthetic test/verification evidence.
- Preserve historical plans, both ignored native trees, ATS policy, dependencies and all legacy source/configuration.

## Capabilities

### New Capabilities

- `local-development-content`: Explicit local-only five-category random provider behavior, transport bounds, credential handling and preserved UI behavior. No main specs currently exist; existing changes remain unarchived.

### Modified Capabilities

None.

## Impact

Limited to the isolated Expo app's provider selection, new adapter/tests, small mode caption, ignore/sample files, OpenSpec and delivery documents. No backend/Worker/gateway, hosting, birthday, remote media, dependency, identity, permission, native generation, deployment, release, merge or archive. Live-provider acceptance remains NOT RUN until the owner privately supplies a new key and explicitly authorizes testing; no credential/account access is authorized. A future distributed release requires a separate server-side proxy/Worker and new scoped credential with owner approval.

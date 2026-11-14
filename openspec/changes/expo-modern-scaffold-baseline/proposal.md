# Proposal

## Why

The SDK 49 application lacks a reproducible executable test baseline and has inventoried native/config drift. GitHub [issue #5](https://github.com/dvale94/kyrshas-app/issues/5) approves a small isolated iPhone scaffold to prove specification-to-PR delivery without replacing the legacy app.

## What Changes

- Add `modernization/expo-next/`, a minimal supported Expo/TypeScript app using synthetic trivia and an answer visibility interaction; no feature port or provider dependency.
- Pin a coherent official Expo SDK/toolchain baseline and deterministic npm lockfile, behavioral tests, typecheck, compatibility/config diagnostics and, once local checks pass, independent CI.
- Configure iPhone-only portrait/light behavior, strict transport defaults and disabled OTA updates. Document preservation of bundle identifier, slug, name intent, scheme and EAS association without registration, credentials or signing actions.
- Record name/version baseline and unresolved native/release authority, asset provenance, generated-metadata confidence, exact checks, limitations and future migration slices.
- Preserve legacy app/config/lockfiles, ignored iOS tree and separate backup; add task report and handoff pointer.

## Capabilities

### New Capabilities

- `offline-demo`: Deterministic synthetic trivia with accessible answer visibility controls in an isolated iPhone app.
- `isolated-expo-baseline`: Reproducible supported scaffold, identity/native configuration preservation mapping, verification and delivery evidence.

### Modified Capabilities

None. No existing capability specs are present (`openspec list --specs --json`).

## Impact

Only new files under `modernization/expo-next/`, this OpenSpec change, `docs/migration/expo-next-baseline.md`, `.agentic/reports/issue-5-expo-scaffold.md`, one new isolated CI workflow and the existing `.agentic/handoff.md` pointer. Root `App.js`, `src/`, `package.json`, `yarn.lock`, `app.json`, `eas.json`, existing harness CI and ignored `ios/` remain untouched. Dependencies install only in the isolated app. No live API calls, private data, credential remediation, persistent model, auth, signing, registration, full UI migration, native replacement, deployment, publishing, merge or automatic archive. The issue and kickoff explicitly authorize implementation after validated scope alignment.

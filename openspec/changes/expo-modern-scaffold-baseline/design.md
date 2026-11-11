# Design

## Context

See proposal.md for motivation and the two capability deltas for acceptance. Main at `7283632c4a7d7f415c9a5c7e6b1927aa7902e44e` contains the merged native inventory. The legacy runtime and its SDK 49 dependency tree remain independent. Issue #5 resolves the earlier tablet/ATS planning gates for this scaffold: iPhone only and secure defaults are explicitly approved. Release name/version authority, asset parity and installed-state continuity remain unverified.

## Goals / Non-Goals

**Goals:** Minimal bootstrap, a synthetic trivia interaction, reproducible local tests/config checks and isolated CI. Keep identity mapping reviewable without accessing accounts. Use Expo config metadata for comparison without generating or replacing native projects.

**Non-Goals:** Legacy feature equivalence, provider transport, personal fixtures, persistence, new architecture beyond the supported SDK defaults, native build/signing, publishing, account queries, credential remediation or automatic spec archival.

## Decisions

1. **Supported SDK verified now.** Official Expo docs list SDK 58 with RN 0.88/React 19.3 and Node >=22.13.x; npm's official Expo publisher metadata reports stable `expo@58.0.23` and blank TypeScript template `58.0.32` pairing React `19.3.0`, RN `0.88.1`, TypeScript `~6.0.3`. Use those stable versions, never canary. Pin actual resolutions in package-lock.json and record all tooling. Node `22.23.4` already installed is compatible; the default Node `20.18.0` is not. A legacy multi-step root upgrade would violate isolation. Sources: https://docs.expo.dev/versions/latest/ and https://docs.expo.dev/get-started/create-a-project/ plus `npm view expo dist-tags --json` and `npm view expo-template-blank-typescript ...`.
2. **Minimal explicit scaffold.** Author the small equivalent of the official blank TypeScript bootstrap via guarded edits (no generator overwrites). Use Expo registerRootComponent and a React Native component. No router, UI library, backend, development client or root workspace changes. Match SDK packages through official metadata/Expo compatibility diagnostics.
3. **Behavioral baseline.** A synthetic trivia card renders hidden answer state and toggles through an accessible control. Use the SDK's Jest preset with a matching React test renderer/component test tool; run real press interactions, assert initial/revealed/hidden content, and disable network dependencies. Strict TypeScript supplies the static check; extra lint tooling is unnecessary for this bounded surface.
4. **Config and mapping.** Use iOS-only platforms, supportsTablet false, portrait/light, existing bundle ID/slug/EAS project ID and explicit identity-derived scheme. Set OTA updates disabled. Do not add arbitrary-load exemptions or provider env/config. Preserve app.json's `kyrsha's App` and `1.0.0` as a provisional scaffold baseline and local inventory build `1`; this does not resolve native build-setting override or shipped release authority. Document that owner decision before accepting migration/release.
5. **Assets.** Reference the existing tracked root icon/splash read-only and retain green/contain intent through the supported splash config plugin. Record root icon 200×200 vs native 1024×1024, differing splash hashes and unresolved visual/source authority. Do not export native/personal assets or invent approved replacements. Metadata checks do not prove production icon quality.
6. **Verification boundary.** Commit npm lockfile and pinned Node/npm versions with `npm ci` inside the new directory. Run interaction tests, typecheck, `expo install --check`, pinned expo-doctor and local config comparison without login. Set `EXPO_NO_DOTENV=1`, disable Expo telemetry, and never run legacy CLI or load .env/eas credentials. A separate path-filtered CI workflow uses the same versions and commands only after they work locally; retain harness CI byte-for-byte. Optional iOS JS bundling can validate Metro without native generation, but is not simulator evidence.
7. **Preservation evidence.** Start on dedicated branch from fetched main with clean initial status; fingerprint all ignored ios file/link contents before/after without printing them. Diff allowlist and protected-path review establish tracked preservation. Never access or mutate the separate backup; rely on issue #3's backup evidence and label that limit.

## Risks / Trade-offs

- New SDK defaults change native toolchain/architecture and minimum OS → document supported defaults and defer actual native parity acceptance; do not force old Pod settings.
- Expo doctor includes network-backed metadata checks → report connectivity failures honestly and keep local SDK checks distinguishable.
- Device rendering, splash, links, entitlements, signing, effective display name and installed-data upgrade are unverified → explicit future gates, no build/release claim.
- Shared tracked icon is below recommended size and native asset provenance differs → record read-only source choice and require future owner review.
- Previously exposed legacy credential remains compromised → do not load/copy/use it; recommend separate owner remediation.

## Migration Plan

Land only the isolated scaffold/spec/docs after review. Revert the scoped new files and handoff pointer if needed; legacy app/native state requires no rollback. No deployment, replacement or release step belongs to this change.

## Open Questions

Before a future migration/release, the owner must establish effective installed display name, highest distributed version/build, approved icon/splash source, native/runtime parity and storage continuity. These do not block the isolated scaffold because issue #5 explicitly permits recording ambiguous authority and unverified native settings.

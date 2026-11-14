# Design

## Context

See proposal.md for motivation. Main at `ed7039b1806908e1ff23a87970a865e2e621399c` contains the isolated Expo58/RN0.88 baseline, a synthetic answer-toggle test and config introspection assertions. `ios/` inside that scaffold is absent; the legacy ignored tree has 20,437 fingerprinted entries. No main capability specs exist yet. The repository's original API credential is compromised and must never be consumed.

## Goals / Non-Goals

**Goals:** Produce independent generated-native evidence, preserve source/state, execute simulator smoke if compatible, and document precise blocked outcomes otherwise.

**Non-Goals:** App migration, production acceptance, system upgrades/runtime installation, native signing, transport-policy changes, or selecting final name/version/artwork. No changes to existing CI or dependencies are planned.

## Decisions

1. Use the scaffold's pinned Node22/npm10 toolchain and clean `npm ci`, followed by unchanged `npm run verify`. Generate a new ignored native directory using the local Expo CLI, `prebuild --platform ios --no-install`, dotenv/telemetry disabled. Install Pods separately only if needed and compatible. Avoid `--clean`, root native commands and legacy environment loading. This makes generation independent of CocoaPods availability and avoids installing legacy dependencies.
2. Add a standalone read-only native checker under the isolated scripts directory. Inspect generated Xcode target settings, Info.plist, Expo.plist, entitlements and resource references/catalogs. Use selected safe fields only, never whole native/environment/signing dumps. Missing generated output is BLOCKED, inconsistent settings are FAIL; introspection remains a separate check. No additional library is needed; macOS plist tools and the scaffold's existing parser dependencies can be used.
3. Keep generation reproducible and ignored rather than committing generated sources/Pods/build output. Document exact command, SDK, template provenance/output and effective settings limitations. An unbuilt generated project does not prove an executable, built plist or visual parity.
4. Simulator runtime availability is a hard execution gate. Preflight already found Xcode26.3 but no simulator runtimes/devices. A read-only simctl discovery unexpectedly initiated Xcode package initialization; report this intervention without claiming a runtime was installed. Do not attempt system changes. If compatible resources become available without intervention, use a fresh disposable simulator and Debug/local bundle with signing disabled. Never overwrite an existing installed app with the same bundle ID.
5. Keep strict ATS defaults unchanged. Prefer a bundled local JS path if Metro networking cannot run under the existing policy; request owner approval before any policy weakening. Record runtime interactions individually; unit tests are not substitute evidence.
6. Deliver a comparison/status table, safe reproduction commands, manual smoke checklist and ordered proposal-only feature slices. Keep earlier reports intact, update handoff pointer, review changed-path allowlist and before/after original-native fingerprints, then open a PR against main. No macOS CI: runtime provisioning and costs are not reproducible here.

## Risks / Trade-offs

- [Missing runtime/Xcode component initialization] → Stop native execution, record exact observations and owner-provided compatible toolchain/runtime prerequisites; continue authorized static preparation.
- [CocoaPods1.13 reports ffi extension warning] → Diagnose only if contained Pods work is needed; no system gem repair or upgrade without approval.
- [Generated output differs from introspected defaults] → Expose mismatch; do not weaken tests/security just to pass.
- [Shared public bundle ID] → Require an isolated simulator with no existing user app; no device-installed upgrade.
- [Artwork and name/version uncertainty] → Preserve provisional baseline; distinguish generated resources from binary/visual and production authority.
- [Uncommitted generated tree] → Native evidence depends on explicit reproducible generation and exact dependencies; never report a clean checkout as already native-ready.

## Migration Plan

No deployment or persistent-data migration occurs. Reproduce in the isolated scaffold after satisfying prerequisites. Revert tracked tooling/docs through normal review if needed; existing native directories remain protected and are never automatically cleaned. Future feature slices require separate specifications and owner decisions where identified.

# Proposal

## Why

Issue #9 follows merged pilot02C: the synthetic iPhone app builds and runs with embedded Debug JavaScript, but strict ATS rejects HTTP Metro at localhost. Establish an evidence-based local feedback workflow without silently changing native security policy.

## What Changes

- Inspect supported tools, existing simulator/app and generated native Debug/Release transport settings; preserve owner index/content and native fingerprints.
- Add contained development-loop diagnostics and verification tooling with reproducible commands and tests, using existing dependencies.
- Attempt a harmless synthetic UI edit through the native Metro loop under unchanged policy; distinguish host bundling from actual simulator refresh.
- If live reload requires a policy change, deliver BLOCKED evidence, a reproducible embedded fallback and a concrete unapplied Debug-only proposal with Release proof and rollback, then request approval before applying it.
- Deliver development-loop documentation, issue9 report/handoff and a scoped PR against current main. Preserve previous pilot reports and unarchived changes.

## Approved continuation — 2026-11-16

The owner now authorizes implementing only the previously previewed Debug localhost exception. Add a committed shared policy, Expo config plugin and drift-checked explicit synchronizer for the existing native tree, without prebuild or regeneration. Derive `Info.Debug.plist` from the unchanged strict base and select it only for the application Debug configuration. Debug adds exactly `NSExceptionDomains.localhost` with `NSExceptionAllowsInsecureHTTPLoads: true` and `NSIncludesSubdomains: false`; both global allowances stay false. Release/default retain the original strict policy. Independently inspect actual Debug/Release build outputs and prove a live JavaScript edit through Metro without subsequent native rebuild/reinstall. Stop if this exact permission does not solve transport. No additional policy, trust or signing approval is implied.

## Capabilities

### New Capabilities

- `ios-development-feedback`: Reproducible native development feedback validation, strict policy checks and an explicit security approval boundary with an embedded fallback.

### Modified Capabilities

None. No main capability specs exist; prior changes remain intact and unarchived.

## Impact

Only new isolated scaffold scripts/tests, temporary harmless UI probes restored before delivery, new OpenSpec artifacts, supporting docs/report and handoff. No new dependencies, services, signing, app identity, credentials, root app/native/backup edits, production ATS changes, existing native-tree deletion/regeneration, merge/deployment/release or archive. Issue9/user approve implementation after strict validation within this non-security scope; any ATS/native security change requires a separate owner decision.

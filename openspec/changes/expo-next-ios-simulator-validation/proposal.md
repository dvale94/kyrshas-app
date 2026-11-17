# Proposal

## Why

The merged SDK 58 scaffold has passing JavaScript/config checks but no generated native or iPhone simulator evidence. Issue #7 authorizes a contained validation pilot to distinguish actual native behavior from static confidence before selective migration.

## What Changes

- Record toolchain, preservation fingerprints and native environment prerequisites without secrets or system upgrades.
- Generate a new ignored iOS project only inside `modernization/expo-next/`; inspect generated settings/resources through reproducible verification tooling.
- Build/install/launch the synthetic demo on a compatible iPhone simulator and exercise answer visibility, portrait intent and relaunch when possible. Otherwise report precise BLOCKED/NOT RUN evidence and complete safe static preparation.
- Deliver native comparison, reproduction/smoke instructions, proposal-only ordered feature slices, task report, agent handoff and a scoped PR against main.

## Capabilities

### New Capabilities

- `ios-simulator-validation`: Contained native configuration verification and repeatable synthetic iPhone simulator acceptance with explicit environment-blocked outcomes.

### Modified Capabilities

None. The earlier baseline change remains unarchived; no main capability specs currently exist. Existing demo behavior, provisional identity/artwork and secure ATS defaults remain unchanged.

## Impact

Only isolated scaffold verification tooling/config/demo fixes if necessary, this OpenSpec change, supporting migration documentation, issue-7 report and handoff. No new dependencies/services or macOS CI. Original root application/config/dependencies/native tree and independent backup are protected. No credential use, live API, signing/accounts, installed upgrades, system toolchain/runtime installation, production metadata/artwork decisions, merge/deploy/release or automatic archive. Issue #7 authorizes implementation after strict specification validation without another scope prompt.

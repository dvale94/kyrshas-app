# Agent handoff

## Current task — issue #3, pilot 02A

- [Task report: local iOS inventory](reports/issue-3-ios-inventory.md) — checks, constraints, tool contribution and pilot metrics.
- [Native inventory and preservation recommendation](../docs/migration/ios-native-inventory.md).
- [GitHub issue #3](https://github.com/dvale94/kyrshas-app/issues/3); branch `audit/issue-3-ios-native-inventory`, PR target `main`.
- Baseline: fetched `main` at `25122c389fa766a0c6019e93057b4d77dc90a9dc`; audit date November 10, 2026 (America/New_York).

Real ignored `ios/` was inspected read-only. A separate local backup matches all inventoried file/link contents and has independent regular-file inodes. Native code appears generated-like; preserve identity/signing, resolve native/config differences and represent confirmed settings in Expo config/plugins before a separately approved isolated scaffold. Tablet targeting, display-name/version authority, ATS policy and asset provenance remain migration gates. Source inspection does not establish shipped-binary, storage or runtime parity.

Only the inventory, task report and this pointer are changed. No app/config/lockfile/CI/native/backup changes, installs, regeneration, account changes or merge are authorized. Final delivery outcomes are recorded in the task report. User interventions after kickoff: **0**.

## Previous task — pilot audit 01

[Audit PR #2](https://github.com/dvale94/kyrshas-app/pull/2) delivered the [architecture](../docs/architecture.md), [legacy Expo audit](../docs/migration/expo-audit.md), [verification contract](../docs/verification.md) and [product brief](../docs/product/brief.md) for [issue #1](https://github.com/dvale94/kyrshas-app/issues/1). Its full handoff remains in Git history before this issue's branch.

That audit proposed a conditional fresh scaffold and documented credential exposure, dependency drift and missing runtime verification. Its findings remain applicable except where the new inventory supplies previously unknown local native evidence. It did not approve modernization, credential architecture, native deletion/regeneration or deployment.

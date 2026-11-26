# Issue #31 — safe-area migration

Branch: `fix/issue-31-safe-area-migration`. Scope and acceptance: [issue #31](https://github.com/dvale94/kyrshas-app/issues/31); [OpenSpec change](../../openspec/changes/closeout-safe-area-migration/proposal.md).

## Implementation

Expo install was completed under the pinned toolchain before this continuation. The lock diff adds only `react-native-safe-area-context` 5.11.1 and the direct dependency; no unrelated lock upgrades. The app root supplies `SafeAreaProvider`, and the existing inset boundary uses the library `SafeAreaView`, with artwork outside that boundary. The App test uses the library's Jest mock; existing behavioral assertions remain intact.

## Verification

- PASS: unchanged `npm run verify`, Node 22.23.4/npm 10.9.9, dotenv disabled: TypeScript, 140 Jest tests in seven suites, config check, online Expo dependency check, Expo Doctor 20/20, and 38 policy tests.
- The first run after migration failed nine App tests because the native provider had no Jest layout metrics; the library mock corrected the test environment. A subsequent sandboxed run passed tests but Expo Doctor failed two online checks due to DNS/network access. The unchanged network-enabled rerun passed in full.
- PASS: strict validation of this change and all 14 active changes, root `scripts/doctor.py`, Python syntax, and `git diff --check` at the time run. Gortex found only the library safe-area import in modern source. Gortex contract retains a high-risk lower-bound warning and incomplete coverage graph; executable tests above are separate evidence.
- OWNER CONFIRMED: on a physical iPhone in Expo Go, the SafeAreaView warning is gone and the modern application's appearance is unchanged. This confirmation does not establish every compact/notched layout, interaction, text-fitting, trivia, or native-module check. The earlier simulator attempt remained blocked because Expo Go was absent from the checked simulator.
- NOT VERIFIED: the GitHub pull-request workflow lookup found no runs for `e3babc0` (it does not cover push-triggered runs), and the final native preservation comparison was not established. No prebuild, Pods, native regeneration or standalone app build was performed in that continuation.

## Delivery reconciliation

Commit `e3babc0` was created on `fix/issue-31-safe-area-migration`. Automatic security approval rejected the attempted remote push because destination trust could not be established. The owner then pushed the commit to `main` manually. This was a security safeguard followed by human intervention, not a branching failure. There was no retrospective PR. Keep the OpenSpec change unarchived; unperformed checks remain open. Do not use the prior unsigned Debug binary to validate the new native module.

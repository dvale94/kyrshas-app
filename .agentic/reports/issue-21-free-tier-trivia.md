# Issue #21 — Free-tier random trivia

## Outcome and scope

Local verification **PASS**. [Issue #21](https://github.com/dvale94/kyrshas-app/issues/21) was fetched directly with its comments (none). Started from freshly fetched main `59b3457` (merged PR #20), with a clean owner index/worktree, on `fix/issue-21-free-tier-trivia`. No extra scope decision was required. This is the owner-approved minimal bug fix, not a new API architecture.

Product diff: remove `TRIVIA_TOPICS` and change the local trivia URL to exact `https://api.api-ninjas.com/v1/trivia`, without any query parameters. Other four routes and quote topics are unchanged. Provider randomization supplies the question on every load/refresh; there is no daily endpoint, uniqueness filter, automatic retry or paid fallback.

Tests replace obsolete premium URL/topic expectations and add a fake-transport regression for query-free initial load, changed answers and repeated catalog content across sequential refreshes. Existing mapping, Show/Hide, successful-answer reset, failed-refresh last-good content, isolated errors, pending sharing, production/mock guards, accessibility and transport bounds remain covered. All fixtures and credentials are synthetic; global fetch, XHR, expo/fetch and logging sentinels remain intact.

The runbook and architecture addendum explain unfiltered Free trivia and limited catalog/repeats. [Official documentation](https://api-ninjas.com/api/trivia), read November 19, 2026, identifies category, limit and safe as premium-only and a Free catalog of 100 questions. No actual provider request or entitlement check was made. Photo backgrounds are optional separate future scope; birthday is excluded.

## OpenSpec and Gortex

New bounded [proposal](../../openspec/changes/free-tier-random-trivia/proposal.md), design, delta spec and tasks passed strict validation **before source changes**. The initial validation found an introductory-text warning; it was corrected. Since no main specs exist, the delta uses ADDED under the existing unarchived capability path and explicitly supersedes only the earlier trivia topic rule. Historical OpenSpec is retained; no sync or archive.

Gortex task exploration, source/context review, impact, guarded edits, detect, tests, guards and contract were used. Focused requestUrl impact is complete: two direct/five transitive dependents, MEDIUM risk. Graph test discovery reports no test edges for requestUrl/QUOTE_TOPICS and no configured guard rules; the contract remains WARN for static high-risk scoring. QUOTE_TOPICS is included due to adjacency with the removed constant; its bytes/behavior are unchanged. This is not a test failure or a claim of graph-proven coverage: executable Jest tests and the narrow source diff establish acceptance. No public signature changed; guarded writes introduced no parse errors.

## Exact local verification

External evidence/workspace: `/private/tmp/kyrshas-issue21-20261119/`. Created using `git archive HEAD modernization/expo-next assets/icon.png assets/splash.png`, then copied only the changed test/source files into that external tree. No original env/native contents were copied or inspected. Node `22.23.4`, npm `10.9.9`; manifests/lock and verify script unchanged.

Commands run in the isolated app root with inherited `EXPO_PUBLIC_API_KEY` and `EXPO_PUBLIC_CONTENT_MODE` removed, `EXPO_NO_DOTENV=1`, `EXPO_NO_TELEMETRY=1`, `CI=1` and the pinned Node bin on PATH. The final verify also removes inherited `EXPO_OFFLINE` to permit normal Expo metadata diagnostics.

| Check | Outcome |
|---|---|
| Locked `npm ci` | PASS, 990 packages; existing upstream deprecation warnings only |
| Reproducer: updated local tests against original source | Expected FAIL: two query-free URL assertions, 54 other cases passed; 56 total |
| `npm run verify`, final online diagnostic retry | PASS, exit 0: TypeScript; 118/118 Jest, four suites; config/introspection; online dependency compatibility; Doctor 20/20; 38 policy checks |
| First sandboxed full verify | FAIL at network-dependent diagnostics, after TypeScript/118 Jest/config passed; offline compatibility warning and Doctor 18/20 due to unavailable Expo/Directory metadata. Corrected by diagnostic network permission; no source or guard workaround |
| `node --test scripts/check-development-policy.test.cjs scripts/ios-debug-policy.test.cjs` | PASS, 51/51 executions (includes shared imported cases), using synthetic temporary native fixtures only |
| `python3 scripts/doctor.py` | PASS; starter harness explicitly does not run app tests |
| External-cache `python3 -m py_compile scripts/doctor.py` | PASS |
| `openspec validate free-tier-random-trivia --strict` | PASS before product edits |
| `openspec validate --all --strict` | PASS, 9/9 changes |
| `git diff --check` | PASS after removing one extra documentation EOF blank line |
| Changed/untracked path allowlist | PASS: source/test, runbook/architecture, current change artifacts, report/handoff only |
| Tested source/test/manifest/lock hashes vs worktree | PASS; exact bytes match |
| Ignore/index/history metadata | PASS: env and both native trees ignored/untracked; app-root `.env.local` has no Git history. No contents accessed |
| Native source/build/processed plist/simulator smoke | NOT RUN: URL-only JS change; original native projects intentionally left alone. Policy fixtures/config checks do not certify native runtime |
| Live API/provider, credentials/account, actual Free entitlement | NOT RUN, explicitly outside authorization |

## Preservation and review

No private `.env.local`, credential-bearing legacy EAS config, original iOS contents, backup or private birthday asset was accessed. Verification copy excludes all of them. No env/native/config/dependency/lock/CI/legacy source changes; protected tracked paths excluded from diff. Original ignored native trees were not fingerprinted/read during this issue, so no fresh native-content hash claim is made. No Metro, prebuild, Pods, native generation, builds, smoke runner or simulator was started. Existing owner processes/state were left alone.

Independent acceptance review against issue criteria: **PASS** for the scoped fix and local synthetic verification. No blocking code finding. Provider availability and repeated/unfiltered content remain external limitations, accurately documented. Workflow repairs: one OpenSpec formatting/schema correction, one documentation whitespace correction, and one network-permission retry; no test or product correction after the source fix. No additional human clarification/scope decisions, no automatic approval rejection. Git metadata writes/network access use the environment approval mechanism.

## GitHub delivery

Draft [PR #22](https://github.com/dvale94/kyrshas-app/pull/22) targets main with implementation commit `f1b865f9578f711b8c047bf301146129c4ccf6b8`. Independently observed hosted [Expo CI PASS](https://github.com/dvale94/kyrshas-app/actions/runs/44641027381) and [harness CI PASS](https://github.com/dvale94/kyrshas-app/actions/runs/44641027317). Expo job logs independently confirm 118/118 Jest tests in four suites, dependencies up to date, Doctor 20/20 and policy 38/38; harness steps confirm structure/Python syntax. All four OpenSpec tasks complete, change unarchived. Final documentation-only commit status is recorded in the PR description to avoid an endless evidence-commit cycle. No code/test/config/package changes follow the passing implementation head. No merge, deploy, release or archive performed; no remaining local code blocker or approval request.

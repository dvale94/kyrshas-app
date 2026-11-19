# Issue #19 — local random API development adapter

November 19, 2026 (America/New_York). Scope: directly fetched [updated issue #19](https://github.com/dvale94/kyrshas-app/issues/19), updated2026-11-19T22:43:45Z. Owner replaced the prior Worker/backend plan entirely. Branch `pilot/03fb1-local-random-api` from freshly fetched main `ebe1167e1e6c37802cab01a02692f5a69d6b99e3`; kickoff worktree/index clean. No owner edits were overwritten.

**Local and hosted acceptance PASS; live-provider acceptance NOT RUN.** Draft [PR #20](https://github.com/dvale94/kyrshas-app/pull/20) targets main; implementation c2ae547 has independent hosted Expo/harness PASS linked below. The owner alone must privately issue a new key, create the local env and separately authorize real-provider testing. Neither legacy credential values nor a real local env were accessed, copied, created or populated. No provider/account request was made.

## Scope and planning gate

Created fresh complete `local-random-api-development` OpenSpec: metadata, proposal, design, six tracked tasks and a new local-development-content capability delta. Strict validation passed **before any product edits**; `/private/tmp/kyrshas-issue19-20261119/openspec-before-code.log` retains the result. All8 repository changes strictly validate. Existing changes remain unarchived.

The user explicitly authorized strict planning then implementation within the updated issue scope; this controls over the proposal skill's usual planning-only stop. Used OpenSpec proposal/apply, deliver-feature and verify-delivery workflows. Existing ADR/roadmap approval language is retained as historical evidence, preceded by the explicit local-only superseding owner decision. No new architecture/provider/distribution scope was inferred.

## Delivered behavior and files

| Area | Paths and result |
|---|---|
| Selection | `modernization/expo-next/src/home/contentSource.ts`, `App.tsx`: gate before configuration access/module loading; require `__DEV__`, exact live-local mode and header-safe key. Mock default and production exclusion. Adapter itself repeats the dev gate. |
| Adapter | `src/home/localApiNinjas.ts`: fixed HTTPS five-route selection, typed injectable streamed transport, runtime mapping/validation,8s whole-operation deadline,16KiB accepted body,2000-character display bounds, redirect rejection and final-URL check, same-card pending deduplication, no automatic retries/logs/images/persistence. Uses existing installed expo/fetch with native redirect enforcement. |
| UI | `src/home/HomeScreen.tsx`: small optional mode-caption prop; live development is honestly labeled. Existing hook, content normalizer, cards, fixtures and accessibility implementation unchanged. |
| Tests | `__tests__/LocalContent.test.tsx`:55 new synthetic cases. Five mappings/topics, request counts, mode/default/production gates, missing key, safe failures, statuses incl429, stream/timeout/cancellation, same-card deduplication, UTF-8, log/network sentinels, existing UI loading/retry/last-good/trivia/a11y and obsolete provider replacement. Original62 tests unchanged. |
| Local env | App `.gitignore` adds only `!.env.example`; placeholder-only `.env.example` uses mock. Exact `.env.local` remains absent, ignored, untracked and has no Git history. No source-controlled credential. |
| Docs | `docs/migration/expo-next-local-content.md`, app README, ADR0002 addendum and secure-content roadmap pointer: private owner setup, dotenv-enabled direct CLI vs safe npm start, rollback, provider reconciliation/entitlements/terms, readable bundle key and future server-proxy requirement. |
| Delivery | This report, handoff and new OpenSpec artifacts; no dependencies/locks/config/scripts/CI or native project changes. |

Public documentation checked November19: random quote route is `/v2/randomquotes` with plural categories. Preserved courage/happiness/inspirational/life/love; historic dreams is absent from current docs and deliberately excluded. Trivia retains entertainment/general/historyholidays/fooddrink, but category filtering is premium-only: owner entitlement is an explicit smoke prerequisite. Fact/joke default to one-item arrays, bucket list returns an item object. See [linked primary docs and exact mapping](../../docs/migration/expo-next-local-content.md#endpoint-reconciliation-and-behavior). No undocumented fallback, image request or paid provisioning. Random results can repeat; provider rights/content suitability are not established by tests.

## Exact verification outcomes

Pinned Node22.23.4/npm10.9.9. App commands remove inherited public key/mode and set `EXPO_NO_DOTENV=1`, `EXPO_NO_TELEMETRY=1`; CI also sets dotenv off. Verification copy contains only scoped tracked/new app files and required icon/splash assets, excluding all local env/native/legacy config. No full environment/config dump.

| Check | Outcome / evidence |
|---|---|
| Clean external locked `npm ci` | PASS exit0,990 packages; upstream deprecation warnings retained, no dependency or lock edit. |
| Workspace TypeScript and full Jest | PASS exit0;115/115 tests in4 suites before final two key-validation cases; final external suite below passes117/117. Original62 unchanged. |
| External unchanged `CI=1 npm run verify` | PASS exit0: TypeScript,117 Jest/4 suites, config/introspection, online Expo install --check, Doctor20/20,38 policy/sync fixture checks. `verify-final.log` (previous `verify.log` also passed115). No offline exclusion or weakened check. |
| Explicit `node --test scripts/ios-debug-policy.test.cjs scripts/check-development-policy.test.cjs` | PASS exit0,51 executions (includes13 imported repeat cases),0 failures. `all-policy.log`. |
| `node scripts/check-native-ios.cjs` and `node scripts/sync-ios-debug-policy.cjs --check` | PASS exit0, generated-source assertions and zero drift. `native-source.log`, `policy-sync.log`; source checks are separate from runtime. |
| `check-development-policy.cjs` on prior distinct actual Debug/Release processed plists | PASS exit0. Same prior validated SDK58 unsigned build artifacts in issue11-patches derived output; Debug localhost-only, default/Release false/false strict. No new app build performed. `processed-policy.log`. |
| `python3 scripts/doctor.py`; Python syntax with external pycache | PASS exit0. Starter harness only; application verification is separately recorded above. |
| `openspec validate local-random-api-development --strict`; `openspec validate --all --strict` | PASS exit0 before coding and final checks;8/8 active changes, no archive. |
| Exact Git ignore/tracking/history/scope and whitespace | PASS: exact local env ignored by app `.env*`, sample exempted, real env absent/untracked/no history; native trees ignored/untracked; no unrelated changes; `git diff --check` exit0. Final staged check repeated before push. |
| Hosted harness and isolated Expo CI on c2ae547 | **PASS**: [harness44635492865](https://github.com/dvale94/kyrshas-app/actions/runs/44635492865), [Expo44635492788](https://github.com/dvale94/kyrshas-app/actions/runs/44635492788). Both completed success; independently fetched job logs confirm117 Jest/4 suites, config/online compatibility/Doctor20/20/38 policy checks and root structure/Python syntax. |
| Live API Ninjas authentication/entitlement/content | **NOT RUN**: requires owner-private new key/setup and explicit later smoke authorization. Synthetic transport success is not live-provider acceptance. |
| Physical device, VoiceOver auditory audit, signed/release/distribution/upgrade | **NOT RUN**, outside scope. No production visual or release-safety claim. |

Intermediate failures are retained honestly: first unit run failed53/53 because the new test attempted to spy on an absent XHR global; initial typecheck found test-only Buffer references. Second run passed51/53 with two overbroad global timer assertions; third full run retained original62 passes but failed53 then-new cases because React act itself scheduled a timer during cleanup. Three autonomous test-harness corrections replaced Buffer with TextEncoder, installed/restored an XHR sentinel and separated adapter timer assertions from RN accessibility cleanup. Fourth workspace run and first clean external full verification passed115/115. Independent final review then removed an undocumented key-alphabet assumption: bounded printable ASCII rejects control characters, and the sample placeholder is explicitly rejected. Added two regression cases; repeated external full unchanged verify passed117/117. No product requirement or existing test was weakened. Safe temporary logs `unit-second.log`, `unit-third.log`, `unit-final.log` retain later attempts.

One processed-policy invocation used an incorrect external Release directory and failed ENOENT; corrected to the existing distinct Release product in the same derived tree and passed. Unsupported synchronizer `--dry-run` was rejected without mutation; documented `--check` passed. Sandboxed fetch/simulator discovery/attachment export initially hit environment permissions; bounded authorized retries succeeded. These are not live/native functional failures.

## Actual simulator acceptance and preservation

Known disposable iPhone SE3 `6E92159C-60F3-41F0-9E7F-106D00080D58`, iOS27.2 build24B8117; Xcode27.2 build27B52. Other existing booted devices were untouched. Reused the previously installed synthetic unsigned Debug app; inspected only its selected plist/binary hashes, matching prior issue15 provenance and original issue11-patches product. No app rebuild, reinstall, native generation, Pods, signing or project edit. No embedded main.jsbundle; fresh JS came from dotenv-disabled localhost Metro in the isolated clean verification copy, with inherited provider key/mode removed.

Generated only an external standalone XCTest runner using the existing Ruby helper. Ran the **unchanged** `SmokeTests/testSyntheticIPhoneSmoke` via xcodebuild test with signing disabled and only that test selected: **PASS1 test/0 failures,34.572s**, one attempt, no retries. Asserted offline caption, first/final card, quote/trivia refresh, Show/Hide/reset, scrolling, portrait after landscape request and relaunch. Eight synthetic screenshots retained; first-card and new-trivia-answer screenshots visually inspected for correct fallback, readable content and controls. This verifies mock fallback, not live transport/provider success. Native smoke preceded the final key-alphabet/placeholder correction; its selected absent-key mock branch and UI are unchanged. Final117-test/full verification covers that correction, so no additional native run was warranted. Metro stopped and only the test phone shut down afterward.

`native-provenance.json` records UUID899C03AA-134D-32D6-9B0C-909A333A3F54 and matching binary/dylib/plist hashes. Metadata snapshots (mode, size, mtime_ns, inode and symlink target; no native content reads for fingerprinting) match **all20,437 legacy and30,193 modern entries**, with no additions/removals. Native source/policy checker reads were restricted to the modern policy verification. Backup never accessed. No resets/stashes, native regeneration/clean, legacy source/config/credential reads, native security/identity/permission changes or private assets.

Temporary evidence root: `/private/tmp/kyrshas-issue19-20261119/`: planning/verify/install/unit/policy logs, preservation snapshots, provenance, standalone test runner/products, mock-smoke.log/xcresult and8 attachments. Artifacts remain local and can expire; no binary, Pods, screenshots, bundle or credential is uploaded in the PR.

## Independent acceptance review and limitations

PASS against all locally testable issue/spec criteria: production/default exclusions; exact env protection; five fixed mappings and no media; preserved async UI; full unchanged checks and mock simulator evidence; local-only supersession and future proxy requirement. Verification used the actual final product source copied into a clean locked environment, independently of the worktree installation. Native originals and unrelated tracked scope remain unchanged. No known unresolved product failure.

Gortex pre-edit impact/signature verification and post-edit detect/tests/guards/contract used. Signature check clean; no guard rules configured. Graph initially reports incomplete/lower-bound coverage; post-edit test lookup identifies the new suite but does not resolve all known App/HomeScreen tests. Contract remains **WARN**, high heuristic risk score100/blast10 (lower-bound final check including the transport operation; earlier narrower check blast6), recommending function extraction and covering tests. Treat graph result as advisory incomplete coverage, not a passing safety certificate; reviewed bounded provider/UI blast and independently executed all4 suites/native smoke instead of broadening to an unrelated refactor.

Limits: provider contracts/entitlements may differ in the owner's account; trivia categories require a suitable plan; native streaming can buffer before JS reads, so16KiB is accepted-body scope, not a hard process-memory cap. Client credentials remain recoverable from local Metro JS/network/device access. The experiment is **not release-safe**. Any future distributed release requires a separately approved server-side proxy/Worker, new scoped credential and provider rights/quota/security review.

## Workflow metrics

- Follow-up human scope/clarification decisions:0; user authorized the complete bounded task at kickoff. No real key requested.
- OpenSpec:5 planning files (metadata+4 artifact groups),6 implementation tasks; strict before-code gate and8/8 repository strict checks.
- Tests:62 original +55 new =117;6 local Jest executions including two external verifies (3 failed harness iterations,3 passes). Initial test-only typecheck correction;1 final product compatibility/placeholder correction,0 dependency changes.
- Native:1 mock XCTest attempt,1 pass/0 failures,34.572s;0 app builds/reinstalls,0 native regeneration/Pods/signing actions. Eight safe screenshots,2 visually inspected.
- External installation:1 clean locked990-package install. Full unchanged verify:2 external passes, repeated for the final key-validation correction. No automated real-provider requests, live smokes or credential reads.
- Gortex: native MCP navigation/impact/verify/edit/detect/tests/guards/contract; advisory WARN disclosed above. Tool-schema corrections did not justify bypassing to CLI source mutation.
- One draft PR; implementation hosted workflows2/2 PASS with independently inspected job logs. Through initial implementation push:17 automatically approved environment escalation requests,0 rejections; final documentation Git metadata requests are counted separately in the PR. No merge, deployment, release or archive.

## Submission evidence

Draft [PR #20](https://github.com/dvale94/kyrshas-app/pull/20), implementation `c2ae5470cbf2d59b3a0a4b93da13a2994748b9df`, against main `ebe1167`. Hosted [Expo PASS](https://github.com/dvale94/kyrshas-app/actions/runs/44635492788) and [harness PASS](https://github.com/dvale94/kyrshas-app/actions/runs/44635492865) are independent evidence on that code commit, with job logs inspected. Final evidence-only commit changes this report, handoff and the sixth task checkbox; its exact-head hosted outcomes are linked separately in the PR to distinguish code verification from subsequent documentation.

All6 implementation tasks complete, OpenSpec unarchived. Owner review and separate private live-smoke authorization remain acceptance follow-ups; no key value should be posted. No merge, distribution, backend, deployment or release.

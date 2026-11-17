# Issue #9 — secure local iPhone development-loop diagnosis

November16,2026 (America/New_York). [Issue9](https://github.com/dvale94/kyrshas-app/issues/9) fetched directly through GitHub; confirmed PR8 merged as main08406d6837a1add0bd33527b5dd6bb09a2bfb55b. Branch: pilot/03a-local-ios-development-loop, created from freshly fetched main. Used deliver-feature, OpenSpec proposal/apply and verify-delivery. The explicit issue/user implementation authorization supersedes the proposal skill's generic planning-only pause within the non-security scope; the separate security gate is preserved.

**Result: native Metro edit/refresh BLOCKED by existing ATS; embedded Debug fallback PASS.** No policy change applied. The issue explicitly accepts a scoped diagnosis/proposal PR with a concrete approval request and reproducible fallback; this is not a Fast Refresh pass.

## Scope and specification gate

New OpenSpec ios-local-development-loop proposal/design/behavioral scenarios/tasks created with Gortex guarded writes following installed spec-driven CLI instructions. CLI1.17.0/root resolved; strict validation PASS/exit0 before implementation, zero findings. Earlier changes remain unarchived and unmodified by this work. Stage snapshots preserve the owner's five pre-existing entries: root package.json/yarn.lock/tsconfig.json and two baseline spec2 files. No reset/stash/unstage of owner work.

[Development-loop documentation](../../docs/migration/expo-next-development-loop.md) contains exact diagnosis, alternatives, reproduction and an inert Debug-only localhost-policy preview with Release proof/source-of-truth/rollback. That preview remains documentation only, with no new Info.Debug.plist, config plugin, security synchronizer or native patch.

## Actual command and device evidence

| Check | Actual outcome |
|---|---|
| Toolchain / existing phone preflight | PASS: macOS27.2.1/26B131 arm64, Xcode27.2/27B52 full developer directory; existing iOS27.2/24B8117 phone; selected Node22.23.4/npm10.9.9, CocoaPods1.17.0/Ruby4.0.9 with no ffi warning |
| Existing app identity before probes | PASS: prior disposable iPhone17 UUID2579B852-10AA-47D1-A556-736E20487A0F already booted; com.dvale1994.kyrshasapp, kyrsha's App1.0.0/build1, strict installed ATS and embedded bundle; native UUID0C8FE3A1-BE6F-30B7-9CEB-839CD0426278 matches pilot02C |
| Clean isolated npm ci --no-audit | PASS, exit0,990 packages; existing Node22 selected, cache external. Upstream deprecation warnings retained; no audit/security-pass claim |
| Unsigned Debug and Release simulator configurations | PASS, both xcodebuild exit0. Built an external copy of the existing generated project plus matching tracked scaffold/assets and existing node_modules, preserving both original native trees. No prebuild, clean, native regeneration, Pods installation or signing |
| Effective Debug/Release settings | PASS, underlying xcodebuild exit0: shared kyrshasApp/Info.plist, preprocessing/generation NO, no ATS override keys; same public identity |
| Actual processed Debug/Release policy checker | PASS, exit0: strict false arbitrary/local networking in both distinct simulator plists, expected identity/platform. These are built artifacts, not introspected guesses |
| Metro status / host bundle | PASS: localhost8081/status reports running; native iOS bundle response contains edited marker,3,952,596 bytes recorded. Metro watch mode uses CI unset |
| Native localhost / IPv4 transport | FAIL at policy: app-only logs show NSURLErrorDomain -1022 for http://localhost:8081/status and http://127.0.0.1:8081/status despite healthy host responses |
| IPv6 Debug-host probe | INCONCLUSIVE: no working live loop or IPv6-specific failing endpoint established. Not a claimed workaround/pass |
| Temporary caption -> actual native marker acceptance | FAIL, xcodebuild/XCTest exit65. One live-loop test waits15s for Offline demo · Metro probe 03A; actual screenshot shows old embedded Offline demo · synthetic content. No edited marker reached the simulator |
| Native binary during live-loop probe | PASS unchanged: original0C8FE3A1-BE6F-30B7-9CEB-839CD0426278 after probes; no native replacement/rebuild of the tested installed app during marker attempt. Separate policy builds do not certify refresh |
| Interactive Metro r refresh | ATTEMPTED; CLI prints Reloading apps; no edited marker observed. Initial redirected terminal wrapper did not expose keyboard UI, so restarted with a real PTY; no live-loop PASS inferred |
| Source restoration / Metro cleanup | PASS: temporary App.tsx caption exact-restored; hash matches start. Both started Metro instances stopped; no startup/PATH-file modifications |
| embed-ios-debug helper negative/positive checks | PASS: rejects repository/native and Release destinations before writes; valid temporary Debug export exit0, only external built app affected |
| Unchanged existing embedded native smoke | PASS, xcodebuild exit0:1 test/0 failures,16.675s; real rendering/show/hide/portrait/relaunch on reused synthetic phone after restored-source export/install. Separate from failed marker test |
| Full npm run verify | PASS, exit0: existing TypeScript,1 Jest interaction test, config/introspection, online packages up to date, Doctor20/20; appended14 Node policy fixtures all PASS |
| npm ls / original native-source checker | PASS, exit0; dependency versions/lock and native/default policy unchanged. Native checker is source evidence only |
| Root harness / Python syntax / strict OpenSpec / whitespace | PASS; harness alone does not run app tests |

A local simulator Release **configuration** build verifies policy; it is not a signed distribution, deployment or product release. Local native outcomes are Codex-observed execution; independent hosted CI is reported separately after PR delivery. No real provider/API call or Expo/Apple account login.

## Diagnosis and bounded implementation

The same committed strict Expo policy flows into the shared generated plist, effective Debug settings and actual processed Debug binary. ATS blocks the packager status request before JavaScript can load. It is not explained by server downtime or a localhost-only binding mistake; IPv4 also receives -1022. No Metro host tweak was reported as a security repair.

Added check-development-policy.cjs and14 meaningful fixtures rejecting either configuration's arbitrary loads, local networking, domain exceptions, web exceptions, missing policy, malformed/changed identity, physical-device artifacts and reused inputs. npm verify appends those fixtures without weakening any previous check. Graph coverage does not recognize these Node fixtures; their executable results are the evidence.

Added embed-ios-debug.cjs: validates a temporary external Debug simulator artifact and strict synthetic metadata, filters inherited EXPO_PUBLIC_/EAS_ environment from the bundling child, disables dotenv/telemetry, and exports only to temporary built output. It neither installs an app nor changes policy/project settings. Its actual rejection and positive paths were executed. Added explicit MetroProbeTests.swift separately from the unchanged embedded smoke so a healthy stale fallback cannot falsely satisfy live feedback acceptance.

No permanent App.tsx change, dependency version/lock/config edit, native-source edit, new dependency/service or CI workflow change. Only the isolated verification command is extended. Actual tests preserve strict assertions; failing live acceptance remains failing rather than being excluded from the report or renamed as success.

## Concrete owner approval boundary

[The unapplied preview](../../docs/migration/expo-next-development-loop.md#approval-request--inert-preview-not-applied) proposes only a dedicated generated Debug plist and Debug INFOPLIST_FILE reference containing a localhost insecure-HTTP domain exception. Release/default remain strict. ATS does not restrict a domain exception to8081, so other localhost ports would also be allowed in Debug. No broad arbitrary/local networking or LAN/IP exemption.

A later approved implementation must add committed source-of-truth plugin/shared tooling plus explicit drift-checked synchronization into the existing tree without regeneration; prove actual unsigned Debug/Release processed policies, including Release negative checks; observe real marker refresh without changing the tested binary; rerun verification/preservation and document rollback. No such policy tooling is executable in this PR. HTTPS native trust/certificates and new client/runtime provisioning were not authorized or performed. Development-loop docs cite current Expo/Apple documentation and distinguish web HTTPS guidance from native evidence.

**Required decision pending:** approve that narrow Debug-only localhost exception and the contained source-of-truth/synchronization plan before applying any native-policy change. The blocked live-loop alternative is delivered under issue9; future approved live-loop execution is not marked complete or tested.

## Preservation and review

Fresh fingerprints: **PASS**, all20,437 legacy entries and all30,192 existing modern native entries match before/after (path/type/content/link targets; no symlink traversal). Original native project is never a build target; an external copy isolates build-time Pods/codegen mutations. Existing ignored modern project is preserved byte-for-byte, not cleaned/refreshed. Independent backup never accessed. Historical UI-state file remains untouched within the legacy match; no restoration or attribution claim.

Root protected application/config hashes match. Owner's five worktree contents and staged blob/mode identities match initial snapshot. Scaffold App.tsx/app.json/package-lock hashes match; modern package.json changes only the verify script. Earlier OpenSpec changes are not part of this work's commit; pre-existing staged duplicate specs remain owner work. Commits use explicit path-limited Git operations, never the whole staged index.

Gortex impact/detect/tests/guards/contract performed. No configured guards. Contract WARN/high lower-bound persists for new tooling; follow-up impact is complete/LOW with1 direct dependent limited to the new tooling. Actual14 policy fixtures, guard rejections, successful export and native smoke were reviewed. Warning is retained for PR review, not represented as cleared or proof of native behavior; no merge/landing action is authorized here.

Evidence is local/temporary under /private/tmp/kyrshas-issue9-20261116/: owner/index and native snapshots, external build-input/DerivedData, Debug/Release logs/effective settings, Metro host proof/native ATS logs, failed metro-probe.xcresult and actual screenshot, passing fallback-smoke.xcresult and logs, verify.log and preservation-result.json. Temporary paths can expire; committed tooling/docs permit reproduction. No generated outputs, app binaries, Pods, private desktop/device content, original tree or backup uploaded.

## Workflow metrics and delivery

Extra clarification prompts/scope decisions before delivery:0. Security decision:1 pending approval request, not granted. Sandbox escalation requests through validation:14 (Git preservation/branch, read-only simulator inspection, locked install/spec staging, copied native builds, two Metro starts, host probes, marker XCTest, native log inspection, result export, post-reload evidence, full verify/index intent, fallback smoke and effective settings). Automatic approval-review rejections:0. No sub-agents.

Autonomous retries/tool repairs:1 OpenSpec instructions call corrected to include --change;1 terminal-control adjustment from redirected Metro logging to a real PTY. Native builds:2 successful configurations, no build repair/retry. Native acceptance:1 failed marker test retained;1 passing embedded smoke. No policy/identity/trust/version change used to obtain a pass. Issue-number handoff supplied bounded scope; it cannot authorize the separately gated security decision.

## Delivered PR and independent CI

[Draft PR #10](https://github.com/dvale94/kyrshas-app/pull/10) targets main from pilot/03a-local-ios-development-loop. Implementation commit `abad575c273c738476e103020097ea38d00cb707` is pushed: exactly13 scoped paths, with the five owner index entries/content verified unchanged after a path-limited commit. No root/native/config/lock or old-spec change was committed. Additional report/task evidence is a separate scoped follow-up commit.

Independent hosted **PASS** on that implementation commit: [Expo workflow44006411336](https://github.com/dvale94/kyrshas-app/actions/runs/44006411336), job133782741925, locked install and full verification steps successful; [harness workflow44006411215](https://github.com/dvale94/kyrshas-app/actions/runs/44006411215), job133782741863, structure/Python checks successful. These workflows do not execute Xcode or native refresh. Local failed marker and passing native fallback evidence above remain independent observations.

All four OpenSpec tasks complete through issue9's explicit BLOCKED-with-proposal alternative; strict validation passes. **This does not mark Fast Refresh or the unapproved security implementation complete.** The owner approval request is the next step, with no permission presumed. PR remains draft/unmerged and all OpenSpec changes remain unarchived.

Final sandbox escalation requests:14 through validation +1 implementation Git stage/path-limited commit/push +1 final evidence Git operation =16 on successful delivery. Extra clarification/scope decisions:0; one security decision pending, not granted; automatic approval-review rejections:0. Native build attempts2 successful configurations;1 negative live test and1 positive fallback test; the two tool/terminal corrections are retained above. Final owner index/content and native preservation review passed. Do not merge, deploy, publish, release or archive this or prior changes.

# Issue #7 — isolated iPhone native validation

November 14, 2026 (America/New_York). [Issue #7](https://github.com/dvale94/kyrshas-app/issues/7) fetched directly using the GitHub connector, including its empty comments collection. [PR #6](https://github.com/dvale94/kyrshas-app/pull/6) independently confirmed merged. Dedicated branch: `pilot/02c-native-iphone-validation`, from freshly fetched main `ed7039b1806908e1ff23a87970a865e2e621399c`. Initial worktree clean.

**Current resumed result: native Debug build/install/launch and iPhone rendering/interaction/orientation/relaunch smoke PASS; unchanged isolated verification PASS (Doctor20/20).** This supersedes the environment blockers below. Production artwork/signing, installed-upgrade continuity and general HTTP Metro development remain outside the accepted native result.

## Resumed native execution after owner environment repair

November14,2026, approximately16:50–17:10 America/New_York. Directly retrieved issue#7 and existing draft PR#8, including empty PR discussion; local/remote branch head matched `d619f8735c67e1b2c0474a3d1bcb835a3c38bdbd`. Continued `pilot/02c-native-iphone-validation`; no checkout/reset of owner changes. Used deliver-feature, openspec-apply-change and verify-delivery. Re-read approved planning artifacts, native report/comparison, repository instructions and verification context. Strict OpenSpec validation passed before Pods; historical5/5 tracking was extended with four explicit authorized resumption tasks.

### Actual environment and executable results

- macOS27.2.1/build26B131 arm64; Xcode27.2/build27B52 at `/Applications/Xcode.app/Contents/Developer`, first-launch check PASS. Simulator SDK27.2/build24B8118. Approximately732GiB free. CLT receipt remains16.4; active compiler/SDK comes from full Xcode, not that old receipt.
- Existing Node22.23.4/npm10.9.9 explicitly selected, rather than shell20.18.0. CocoaPods1.17.0 at `/opt/homebrew/bin/pod` uses Homebrew Ruby4.0.9/RubyGems4.0.23; version/env checks PASS without ffi warning. No toolchain/runtime/system installation or startup-file change in this resumption.
- New disposable iPhone17: `2579B852-10AA-47D1-A556-736E20487A0F`, iOS27.2/build24B8117. Boot/status PASS; target bundle absent before first install. No existing app/data was overwritten, no existing simulator erased.
- Isolated `npm ci --no-audit` PASS, exit0/990 packages. Unchanged `CI=1 npm run verify` PASS: TypeScript,1 Jest test, config introspection, online package check and Doctor20/20. `npm ls --depth=0` PASS. No package/version/lock/config/test-policy edits.
- `pod install --project-directory=ios` PASS, exit0,169s:100 dependencies/99 Pods. Script phases inspected before build; generated notices include an internal Expo CoreModule autolinking warning and per-build script-phase notes. No force flags, prebuild/clean/native regeneration or system gem repair.
- Existing `ios/kyrshasApp.xcworkspace` Debug simulator build PASS, underlying xcodebuild exit0, signing disabled. Effective build-settings retrieval now PASS, exit0. DerivedData stays external. Debug dylib UUID `0C8FE3A1-BE6F-30B7-9CEB-839CD0426278` arm64.
- Built and installed plist PASS: bundle `com.dvale1994.kyrshasapp`, display `kyrsha's App`, version1.0.0/build1, family[1], portrait/Light, minimum16.4, no arbitrary/local-network ATS exemptions, updates false. Effective marketing setting remains1.0, distinct from plist1.0.0. Native source checker PASS before and after build, including empty source entitlements/no capabilities. Production/signed entitlement/account evidence NOT RUN.

### Runtime diagnosis and final smoke evidence

The first native app install/launch exited0 but rendered a red missing-script-URL error. App-only logs established ATS error-1022 for `http://localhost:8081/status`; host Metro itself was healthy. **Initial runtime FAIL and first UI test FAIL/exit65**, not a rendering pass. No ATS relaxation, localhost exception, signing or app-identity change was made.

Used design decision5's authorized local bundle alternative: stopped the isolated Metro process; ran `expo export:embed --entry-file index.ts --platform ios --dev true --bundle-output <external-built-app>/main.jsbundle --assets-dest <external-built-app>`. **PASS**, exit0,724 modules/5 assets. The existing Debug delegate's fallback loads this embedded bundle without a native-source edit. Reinstalled only our disposable synthetic app; built/installed ATS remains strict. Embedded-bundle SHA256 `e03dc4252fe6a39a60914bcd674702b379b113bcc18c415683d765de4c14dfc3`. This is temporary simulator Debug packaging, not a signed/release artifact or a permanent change to ordinary Metro development.

Added isolated verification tooling only: `scripts/ios-smoke/SmokeTests.swift` and `create-runner.rb`. Existing CocoaPods xcodeproj gem generates a new standalone UI-test project outside the repository; it never adds a target to either native app project. No new app/test dependency. Two intermediate bundled UI runs failed during rotation: immediate hittability check, then an ambiguous React Native hierarchy with nested same-label StaticText nodes. A bounded accessibility-settling wait and `.firstMatch` selectors repair the test harness while retaining its hittability/portrait and actual-tap assertions. No synthetic App.tsx/native-delegate changes.

**Final xcodebuild XCTest PASS**, exit0 at17:06:42-05:00:1 native UI test/0 failures,18.252s. Six retained screenshot attachments show rendered initially hidden answer, answer shown, hidden again, portrait after landscape-left request, relaunched hidden state, and Home transition. A separate settled Home screenshot confirms icon/label. Cold-launch video was also captured separately after the passing test.

| Actual device checklist | Outcome |
|---|---|
| Fresh simulator / native build / install / launch | PASS; explicit UUID/runtime/build and absent-app check above |
| Synthetic caption and triangle question rendered | PASS, XCTest plus inspected simulator screenshot |
| Initial answer hidden; Show Answer reveals Three sides.; Hide Answer hides | PASS, actual device taps and screenshots |
| Landscape-left request retains portrait app window / visible question; return to portrait | PASS, native UI test, retained assertions and screenshot |
| Terminate/relaunch resets answer; running foreground / no native crash in smoke | PASS, observed native execution; not a long-duration stability claim |
| Installed identity / provisional metadata | PASS against selected built/installed fields and Home label; production authority unresolved |
| Icon appearance | OBSERVED: two green hearts on white; source/production parity not approved |
| Splash appearance | OBSERVED: sampled final bundled Debug video black at1.0–2.0s, synthetic content by2.5s; configured green artwork not visible. Production appearance UNRESOLVED |
| HTTP Metro under current strict ATS | BLOCKED by policy; embedded Debug validation PASS without any exception |
| iPad compatibility, URL handling, legacy native-hook parity, installed upgrade, signing/accounts/release | NOT RUN / outside pilot |

[Native-validation documentation](../../docs/migration/expo-next-native-validation.md) contains exact passing reproduction commands and the current MATCH/INTENTIONAL DIFFERENCE/UNRESOLVED comparison. [Expo documents development splash limitations](https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/); no production appearance is inferred from this Debug run. Nonfatal Debug warning overlays with Metro stopped remain visible and were not suppressed.

### Preservation investigation and scope review

Fresh before/after legacy snapshots: **PASS, all20,437 entries match** including UI state; protected root application/config and owner-modified package.json/yarn.lock/tsconfig.json hashes match. Backup never accessed. Existing36 modern entries all remain; project.pbxproj and Info.plist changed through contained integration/Debug tooling (RCTMetroPort8081 present), other34 match. Pods/workspace/codegen outputs were added under the ignored modern tree; none were staged. This is expected integration, not full modern-tree equality or native regeneration.

Historical UI-state exception investigated read-only: `ios/kyrshasApp.xcodeproj/project.xcworkspace/xcuserdata/.../UserInterfaceState.xcuserstate` is a binary NSKeyedArchiver archive with441 objects and editor/navigation-history classes. SHA256 `39928894add5668d3f227cee949d5fe93812eb1f8a8f1ee90e24e7631828346c`; mtime/ctime14:36:13-05:00, before resumed execution. No current open handle found by lsof; earlier temporary snapshots not available. The prior writer cannot be established or inferred from that absence. Current file was not altered/restored; the earlier mismatch remains disclosed, while today's before/after equality passes.

Root package.json/yarn.lock modifications and untracked tsconfig.json were present at kickoff. Additional untracked historical `spec 2.md` files in the earlier baseline change appeared in later status; they were preserved and excluded without assuming their provenance. Scope review/staging uses an explicit allowlist for only current report/handoff/native-validation/tasks and the two new smoke-tool files. No legacy source, root config, existing CI, credentials, signing or native generated file belongs in the commit.

Evidence directory: `/private/tmp/kyrshas-issue7-resume-20261114/`. Logs include `verify.log`, `pods.log`, `native-build.log`; actual failed/successful native tests remain in `smoke.xcresult`, `smoke-bundled.xcresult`, `smoke-synced.xcresult`, `smoke-final.xcresult` and matching logs. Final screenshots are exported under `attachments-final/`; `home-icon-settled.png`, `bundled-cold-launch.mov`, sampled frames, selected effective/built/installed metadata and preservation JSON are external. Artifacts are local/temporary and may expire; no build/Pods/private data or backup uploaded. Reports and reproducible tests are the committed evidence, not independent hosted native validation.

### Resumed workflow metrics and delivery

Owner resumption authorization:1 explicit request, after separately owner-managed system/runtime provisioning and approved Homebrew repair. **Additional scope decisions/clarification prompts:0; automatic approval-review rejections:1; sub-agents:0.** Through native evidence capture,25 sandbox escalation requests covered network install/checks, CoreSimulator/build/test/cache access and process diagnostics; final Git delivery totals are recorded below. They are sandbox tool permission requests, not extra human design decisions.

Native build attempts:1, PASS. Pods install attempts:1, PASS. Native UI smoke attempts:4 (three retained FAIL, final PASS). Two substantive autonomous diagnosis categories: ATS/runtime bundle fallback and React Native/XCTest rotation selectors. Supporting tool repairs: simctl OpenStep output required plutil rather than Python plistlib; early result export waited for xcodebuild finalization and then needed local TestReport-cache access; video decoding needed unsandboxed VideoToolbox. Gortex path/schema corrections and one vendor-regex hook false positive were navigation/tool issues, not product changes. No task clarification, policy weakening, version churn, system installation or native regeneration was used to obtain the pass.

Full unchanged JS verification, native source checker, repository harness/Python syntax and strict OpenSpec passed. Final before/after scan again matched all20,437 legacy entries and protected root hashes; scoped added-diff/common-credential-shape scan and whitespace checks passed. Six authorized paths were staged/committed; generated output and owner changes excluded. Gortex staged detect/tests/guards/contract: native XCTest identified, no configured guard violations, contract ALLOW with medium/lower-bound impact and a long-test extraction suggestion. No graph result replaces the actual native run.

Validation implementation/evidence commit `4f9f0364a8baa43adb457676268a38e998f7d65f` is pushed to existing PR#8. Independently retrieved hosted **PASS** on that exact commit: [Expo CI43647186388](https://github.com/dvale94/kyrshas-app/actions/runs/43647186388), job132607489279 with locked install/full verification steps successful; [harness CI43647186377](https://github.com/dvale94/kyrshas-app/actions/runs/43647186377), job132607490023 structure/Python steps successful. These are JS/harness checks, not hosted native execution. Historical hosted results below remain tied to their original commits.

Issue#7 now contains an appended current validation report while preserving its original scope/checklist and open state. PR#8 title/body now describe actual native success, failed/recovered attempts, hosted CI and residual artwork/Metro limits; it remains open/draft/unmerged. One automatic approval review rejected `add_comment_to_issue(pr_number:7)` as a potentially misdirected PR comment; no message was posted. Re-fetched/verified the actual issue7 URL/title and used the issue-specific `update_issue(issue_number:7)` to append the authorized report safely. No bypass or extra owner permission was needed; rejection is included in the workflow count.

Sandbox escalation requests:28 through implementation push, plus1 for final scoped evidence/tracking commit/push (29 total on successful delivery). They cover25 through native evidence, Git fetch/staging, a separate unsandboxed read-only lsof confirmation, and two Git delivery operations. Zero scope/clarification prompts beyond the explicit resumption request. OpenSpec resumption tracking completes9/9 with strict validation. No merge, archive, signed build, deployment or release.

## Historical blocked-environment delivery and patch repair

The original results below remain historical. They must not be read as the current native outcome.

**Historical result after the authorized patch fix: isolated verification PASS (Doctor20/20); native build/install/launch/smoke BLOCKED.** The original drift failure and initial delivery evidence below are retained as history; see “Expo patch-drift recovery” for current dependency verification. The issue explicitly permits safe static preparation and PR delivery with precise environment blockers. No native/runtime acceptance is implied by completed tracking.

## Delivered work and acceptance

- OpenSpec `expo-next-ios-simulator-validation`: proposal/design/behavioral scenarios/tasks, strictly validated with zero findings before any native implementation; no archive or main-spec synchronization.
- Standalone read-only `modernization/expo-next/scripts/check-native-ios.cjs`: actual generated target/plist/security/entitlements/resource checks, both configurations, missing-prerequisite exit2 and mismatch exit1. No added dependency, app/config/lockfile/test changes or CI changes.
- New native project generated only at `modernization/expo-next/ios/`, initially absent. It remains ignored/uncommitted, without Pods/build outputs. A clean checkout depends on explicit reproducible generation.
- [Native validation document](../../docs/migration/expo-next-native-validation.md): tested environment, comparison with inventory/baseline, commands, device checklist and ordered proposal-only feature slices.
- This report and a new handoff pointer preserve earlier reports.

| Issue acceptance | Outcome / evidence |
|---|---|
| Direct issue, merged baseline, spec gate | PASS: issue and PR fetched, required docs and actual scaffold config/test/scripts inspected; strict OpenSpec validation exit0 before native implementation |
| Contained native generation or precise blocker | PASS generation: pinned official template58.0.34, new isolated tree, no-clean/no-install, original native fingerprint unchanged |
| Generated configuration comparison | PASS for source evidence: doc covers every requested setting and MATCH/INTENTIONAL DIFFERENCE/UNRESOLVED confidence. Effective build/binary fields remain UNRESOLVED |
| Real simulator build/install/launch/interaction | BLOCKED: Xcode26.3 is below documented26.4 minimum and no runtime/device is available. All device smoke observations NOT RUN |
| Existing tests/checks and preservation | TypeScript/component/config PASS; full verify/Doctor FAIL on online patch drift, recorded below. Protected source/lock/config/CI paths unchanged; original native fingerprint PASS |
| Reproduction/checklist/future slices/report/handoff | PASS: linked document and report; final delivery review/PR evidence appended below |
| Scoped PR/main, no prohibited actions | PR delivery recorded below. No merge/deploy/signing/release/archive |

Used `deliver-feature`, OpenSpec proposal/apply and `verify-delivery` skills. Issue/user authorization explicitly supersedes the proposal skill's generic planning-only pause; no repeated approval was required. Gortex supplied indexed context, guarded edits, impact/detect/tests/guards/contract; it does not establish native execution. Generated ignored-native evidence came from read-only plist/project/XML/catalog inspection and the executed checker.

## Exact local verification evidence

Isolated application commands used existing Node22.23.4/npm10.9.9 via PATH. EXPO_NO_DOTENV=1 and EXPO_NO_TELEMETRY=1 disabled legacy dotenv consumption/telemetry; online checks were not replaced with offline checks. npm cache: `/private/tmp/kyrshas-issue7-npm-cache`. No legacy EAS configuration/credential, provider, login or backup was read.

| Command/check | Result and limit |
|---|---|
| `git fetch origin main`; `git switch -c pilot/02c-native-iphone-validation origin/main` | PASS after authorized Git sandbox escalation; base above |
| `openspec list/context`, CLI schema instructions, status/apply | PASS, installed1.17.0/spec-driven; scoped planning root resolved, no existing main capability specs |
| `openspec validate expo-next-ios-simulator-validation --strict --json` | PASS, exit0, zero issues before implementation and during delivery review |
| `npm ci --cache /private/tmp/kyrshas-issue7-npm-cache` | PASS, exit0;991 packages, lock unchanged. Upstream inflight/whatwg-encoding/glob deprecation warnings; no security-audit claim |
| `CI=1 npm run verify` | FAIL, exit1 at online check:expo; earlier three stages passed, Doctor not reached in this command |
| `npm run typecheck` within verify | PASS, strict tsc exit0 |
| `npm test` within verify | PASS,1 suite/1 test/0 snapshots; real synthetic component renders, show/hide and no-fetch assertions |
| `npm run check:config` within verify | PASS, preserved public config and introspected plist assertions; not native/runtime evidence |
| `npm run check:expo` within verify | FAIL, exit1; expected Expo~58.0.25/splash~58.0.14/status-bar~58.0.5, installed58.0.23/58.0.13/58.0.4 |
| `CI=1 npm run doctor` separately | FAIL, exit1;19/20 checks pass, only the same package-version check fails |
| `npm view expo-template-bare-minimum@sdk-58 version dist.integrity --json` | PASS, official template58.0.34 and integrity recorded in reproduction doc |
| Local `expo prebuild --help` | PASS after clean install; confirms --no-clean/no-install/template/skip-dependency-update flags |
| `expo prebuild --platform ios --no-clean --no-install --template expo-template-bare-minimum@58.0.34 --skip-dependency-update expo,expo-splash-screen,expo-status-bar,react,react-native` | PASS, exit0, guarded isolated cwd and absent tree. package.json reported no changes. No npm/Pods installation in generation |
| `node --check scripts/check-native-ios.cjs` | PASS syntax check |
| `node scripts/check-native-ios.cjs` before generation | Expected BLOCKED, exit2; no native tree |
| `node scripts/check-native-ios.cjs` after inspected-output correction | PASS, exit0: both target families1, identity/plist metadata, portrait/Light, strict ATS, updates false, empty entitlements/capabilities, deployment16.4, linked catalogs/storyboard and PNG dimensions |
| `xcodebuild -project ios/kyrshasApp.xcodeproj -scheme kyrshasApp -configuration Debug -sdk iphonesimulator -showBuildSettings -json CODE_SIGNING_ALLOWED=NO` | FAIL, underlying exit64: `Found no destinations for the scheme 'kyrshasApp' and action build`. No effective-settings or binary claim. Diagnostic wrapper printed selected fields only and returned0 after recording underlying failure |
| `python3 scripts/doctor.py` | PASS, exit0; repository harness structure only |
| `PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue7-pycache python3 -m py_compile scripts/doctor.py` | PASS, exit0; syntax only |
| Diff/allowlist/preservation checks | PASS during review; final outcomes below |
| Gortex tests/guards/contract | No graph coverage found for checker; no configured guards. Initial contract allowed; final contract warns about high change risk and suggests extracting the long assertion function, with lower-bound traversal. Follow-up impact finds no direct/transitive dependents but is truncated. Scoped diff review confirms standalone tooling only; warning retained for PR review, not presented as a cleared guard. Actual checker execution and existing Jest results are the verification evidence |

Online patch recommendations changed since pilot02B. This pilot preserves the pinned baseline; it does not add exclusions, loosen tests or silently upgrade dependencies to turn diagnostics green. A reviewed patch update remains next work. No native build failure is inferred from package advice alone.

## Native environment and smoke blockers

Preflight commands: `sw_vers`, `uname -m`, `xcode-select -p`, `xcodebuild -version`, `xcrun --find simctl`, `simctl list runtimes -j`, `simctl list devices available -j`, CLT `pkgutil` receipt, Node/npm/Pods versions, `df -h .` and simulator SDK version. Safe output recorded in the migration doc.

Observed macOS15.8.1/build24H32 arm64; Xcode26.3/build17C529 selected at `/Applications/Xcode.app/Contents/Developer`; simulator SDK26.2; CLT receipt16.4; approximately756GiB free. CocoaPods1.13.0 exits0 but reports unbuilt ffi1.16.2 extensions. Existing supported Node/npm were selected without installation. [Expo's SDK58 requirements](https://docs.expo.dev/versions/v58.0.0/) specify Xcode26.4+ and iOS16.4+. Owner must provide a compatible Mac/Xcode environment, completed setup, healthy Pods installation and a compatible installed runtime/new iPhone simulator; check [Apple's macOS support matrix](https://developer.apple.com/xcode/system-requirements). No toolchain/runtime upgrade is authorized in this pilot.

Native build, Pods resolution, installation, launch, crash-free rendering, show/hide interactions, physical rotation, relaunch, observed app label and icon/splash appearance: **NOT RUN** under the **BLOCKED** environment. No screenshots or build identifiers exist; no visual/device success invented. The generated deployment target, metadata and resources are source evidence only. Existing strict ATS is unchanged; debug-only Metro transport remains untested and would need approval before weakening policy.

**Unexpected environment intervention / low-oversight limitation:** sandboxed simctl discovery failed (CoreSimulator connection/log permission errors). Both authorized unsandboxed list commands unexpectedly initiated Xcode package initialization. One printed Install Succeeded then empty runtimes; the other printed authorization-required installation failure then no available devices, with a stale CoreSimulator version-change diagnostic. Attempted `pkill -INT -x simctl` returned1/no match. No explicit installer/runtime-download/system-setting/account command was run. Component identity/system effects are unverified, so zero environmental mutation cannot be claimed. Owner review of Xcode setup is a prerequisite; further automatic setup was not attempted.

## Preservation and review

All20,437 original ignored iOS relative path/type/file-content/link-target entries match before/after. Aggregate SHA256 of canonical fingerprint JSON: `1bb7d6f92857be391ee059cb4c52c9e319431aefcc71d02c1fa91355895579aa`. This matches the earlier entry count; no claim is made that this new aggregate equals the earlier pilot's differently stored fingerprint. Links were hashed as target text without traversing external destinations. Fingerprint data stayed outside Git; no original native writes or backup access occurred.

Protected-path diff versus origin/main passed for root App.js/src/package.json/yarn.lock/app.json/eas.json/.gitignore, existing harness/scaffold CI and isolated package/config/lock files. New native sources are ignored and not staged. No Pods, build products, credentials, environment files, personal content or backup data belong in this PR. A boolean-only common secret-shape scan of added diff passed without reading the compromised credential; this is not an exhaustive secret audit.

`verify-delivery` review distinguishes generated checks from native acceptance and current metadata-diagnostic failures. The authorized blocked-environment delivery path is satisfied by precise limitations and reviewable preparation; supported native execution remains outstanding.

## Expo patch-drift recovery

Follow-up request on November14,2026 explicitly authorized fixing the three recommended SDK58 patches. Reproducer: online `npm run check:expo` still exited1 before the edit, recommending Expo58.0.25, splash58.0.14 and status-bar58.0.5. Updated only those isolated direct declarations and their npm-generated lock resolution; React19.3.0, RN0.88.1 and test/typecheck/Doctor tooling versions remain unchanged. The amended design/task tracking strictly validated before dependency work. No compatibility exclusions or security changes.

`npm install --package-lock-only --ignore-scripts --cache /private/tmp/kyrshas-issue7-npm-cache` **PASS**, exit0; clean `npm ci` **PASS**, exit0 (990 packages); unchanged `CI=1 npm run verify` **PASS**, exit0: strict TypeScript,1 interaction test, config introspection, online dependencies up to date and Doctor20/20. `npm ls --depth=0` **PASS**, exit0. Existing generated-native checker **PASS**, exit0; no native generation/build/Pods/simulator action was performed. npm deprecation warnings remain upstream observations, not a failed test or security-audit result.

Lock audit:59 changed entries including the root declaration, transitive version/metadata changes and removal of getenv. Expo58.0.25's official npm dependency metadata requires newer modules/autolinking~58.1.0, modules-cli~0.5.0 and matching CLI/config/assets packages; remaining Babel/build-tool changes are generated compatible resolutions. No new application dependency, SDK major, RN/React change, override or manual integrity edit. Preservation comparison: all36 generated scaffold entries match. In the original tree,20,436 of20,437 entries match; one pre-existing Xcode workspace user-interface state file (`project.xcworkspace/xcuserdata/.../UserInterfaceState.xcuserstate`) changed during the follow-up. Its writer/provenance was not established; no intentional native write or Xcode command was performed, and current user state was left untouched. All other original source/project/Pods/signing-related fingerprints match. Full original-tree equality is therefore **FAIL for this follow-up**, with this isolated UI-state exception disclosed instead of hidden or restored. Protected tracked root application/config/lock and CI paths remain unchanged; backup untouched.

Current status: dependency drift **RESOLVED** locally and in hosted CI. Patch commit `94cd0666f2b568d6087d732058e4eb67c9e73bbb` is pushed to PR#8. Independent [Expo CI](https://github.com/dvale94/kyrshas-app/actions/runs/43627473144) **PASS** (job132546487743: locked install and full verification step success); [harness CI](https://github.com/dvale94/kyrshas-app/actions/runs/43627473097) **PASS**. Original hosted failure links below remain historical. OpenSpec follow-up tracking is5/5 complete, with strict validation passing. The patch changes7 scoped paths; the overall PR now contains11 approved paths including isolated package/config tooling and supporting docs/specs. This repair used11 additional sandbox permission requests (npm/network and two rounds of Git staging/commit/push), no additional clarification, no dependency repair retry and one investigation of the UI-state fingerprint exception. Native runtime and new native dependency resolution/build acceptance remain **BLOCKED/NOT RUN** under the original environment gates. The preserved generated project is the pre-patch generation; its source checks do not certify a native build against updated packages. A clean checkout must generate with its installed dependencies; do not overwrite the existing local trees to refresh that evidence.

This follow-up adds no owner decision beyond the explicit patch-fix request and no task-specific clarification. Initial pilot intervention counts below are historical; this repair uses ordinary contained npm/network/Git permissions and no Xcode/system initialization.

## Delivery and workflow metrics

[Draft PR #8](https://github.com/dvale94/kyrshas-app/pull/8) is open against main and links issue7, with implementation commit `7276bcacec92755f928f5f952c4e32a35660cfe4`. The PR remains draft because native execution is blocked and current online diagnostics fail. Existing hosted CI is unchanged; no macOS CI, paid service or remote build added. A documentation/task-tracking follow-up records this delivery evidence without changing the implementation.

Independent GitHub evidence on that implementation commit: [PR harness CI](https://github.com/dvale94/kyrshas-app/actions/runs/43625422053) **PASS** (also [push harness CI](https://github.com/dvale94/kyrshas-app/actions/runs/43625373637) PASS); [Expo workflow](https://github.com/dvale94/kyrshas-app/actions/runs/43625422091) **FAIL**. Retrieved job132540044198 logs independently confirm install/typecheck,1 suite/1 test and config assertions passed, followed by the same three patch recommendations and exit1. No hosted native/Xcode validation runs; CI does not establish simulator success.

Final scope review: **9 approved changed paths**, no generated outputs staged, whitespace/common-secret-shape review passed. Original native fingerprint equality and protected-file checks passed. OpenSpec tracking completes **4/4 tasks** through the issue's explicit blocked-environment alternative; strict validation remains valid with zero findings. This is completed bounded preparation/delivery, not native runtime acceptance. Toolchain/runtime/Pods health, recommended patch review, effective built metadata, device smoke and production authority remain open gates.

Task-specific follow-up prompts after the issue-number kickoff: **0**. Extra human scope/implementation decisions: **0**. Automatic approval-review rejections: **0**. Environment escalation requests: **19** across Git metadata/staging/commit/push operations, two simulator list retries/attempted interrupt, contained registry/install/check/prebuild work and effective Xcode-settings read (16 through the implementation push, plus three final evidence staging/commit/push requests). These are sandbox permission requests, not human scope decisions. No Apple/EAS login, signing, live API, release or production decision was requested.

Autonomous troubleshooting: **4 categories** — sandbox Git fetch retry; sandbox simulator discovery retry (two list commands); a premature CLI-help request before npm finished retried after installation; native checker corrected from an assumed splash catalog name to the actual storyboard-referenced SplashScreenLogo catalog, then passed. Online diagnostic failures were investigated with independent Doctor, not hidden. Xcode destination failure was retained as blocker evidence; native build retries: **0**. Gortex API/schema corrections were tool-call repairs, not product/scope changes.

Issue-number handoff supplied enough scope and boundaries for the bounded preparation/PR without extra owner prompts. It could not supply the missing native environment, and read-only Xcode tooling triggered unexpected initialization. Local command results above are agent-observed; independent hosted GitHub CI evidence is reported separately at delivery. No merge, deployment, publication, signing, release, feature migration, installed-data change or automatic archive.

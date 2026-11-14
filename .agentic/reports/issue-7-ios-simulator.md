# Issue #7 — isolated iPhone native validation

November 14, 2026 (America/New_York). [Issue #7](https://github.com/dvale94/kyrshas-app/issues/7) fetched directly using the GitHub connector, including its empty comments collection. [PR #6](https://github.com/dvale94/kyrshas-app/pull/6) independently confirmed merged. Dedicated branch: `pilot/02c-native-iphone-validation`, from freshly fetched main `ed7039b1806908e1ff23a87970a865e2e621399c`. Initial worktree clean.

**Generated-native source verification PASS. Native build/install/launch/smoke BLOCKED. Current online Expo compatibility diagnostics FAIL.** The issue explicitly permits safe static preparation and PR delivery with precise environment blockers. No native/runtime acceptance is implied by completed tracking.

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

## Delivery and workflow metrics

PR URL, final commit/CI evidence and final task progress are appended at delivery. The PR will remain draft because native execution is blocked and current online diagnostics fail; it targets main and links issue7. Existing hosted CI is left unchanged; no macOS CI, paid service or remote build added.

Task-specific follow-up prompts after the issue-number kickoff: **0**. Extra human scope/implementation decisions: **0**. Automatic approval-review rejections: **0**. Environment escalation requests cover Git metadata access, simulator discovery/attempted interrupt, contained registry/install/check/prebuild work, effective Xcode-settings read and delivery Git writes; final count appended below. No Apple/EAS login, signing, live API, release or production decision was requested.

Autonomous troubleshooting: **4 categories** — sandbox Git fetch retry; sandbox simulator discovery retry (two list commands); a premature CLI-help request before npm finished retried after installation; native checker corrected from an assumed splash catalog name to the actual storyboard-referenced SplashScreenLogo catalog, then passed. Online diagnostic failures were investigated with independent Doctor, not hidden. Xcode destination failure was retained as blocker evidence; native build retries: **0**. Gortex API/schema corrections were tool-call repairs, not product/scope changes.

Issue-number handoff supplied enough scope and boundaries for the bounded preparation/PR without extra owner prompts. It could not supply the missing native environment, and read-only Xcode tooling triggered unexpected initialization. Local command results above are agent-observed; independent hosted GitHub CI evidence is reported separately at delivery. No merge, deployment, publication, signing, release, feature migration, installed-data change or automatic archive.

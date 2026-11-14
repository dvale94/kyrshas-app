# Issue #5 — isolated Expo scaffold delivery

Date: November 10, 2026 (America/New_York). Issue: https://github.com/dvale94/kyrshas-app/issues/5. Branch: `pilot/02b-expo-scaffold-baseline`; base: fetched main `7283632c4a7d7f415c9a5c7e6b1927aa7902e44e` (PR #4 included). Initial worktree was clean.

Implementation and delivery verification: **PASS for the bounded scaffold**. [PR #6](https://github.com/dvale94/kyrshas-app/pull/6) is open against main; native/device/release acceptance is not implied.

## Delivered scope

- Validated OpenSpec change `expo-modern-scaffold-baseline`: proposal, design, two capability requirement/scenario deltas and tracked implementation tasks. No automatic archive.
- `modernization/expo-next/`: supported SDK58 TypeScript bootstrap, deterministic synthetic trivia answer interaction, npm v3 lockfile, pinned Node/npm, component test, typecheck, public/config-mod assertions and Expo diagnostics. No provider, auth or persistence.
- `.github/workflows/expo-next.yml`: independent path-filtered iPhone scaffold checks, pinned Node/npm and isolated npm ci/verify; existing harness workflow unchanged.
- [Migration baseline](../../docs/migration/expo-next-baseline.md): official version evidence, exact commands, identity/native comparison, provisional name/version, asset provenance, risks and proposed next slices.
- This report and an added handoff pointer preserve previous task reports.

No root App.js/src/package.json/yarn.lock/app.json/eas.json edits, native/backup edits, new account registration, signing, API requests, credentials, production actions or full feature port.

## Specification and acceptance review

OpenSpec CLI `1.17.0` worked before scaffold implementation. Used the installed `openspec-propose`, `openspec-apply-change`, `deliver-feature` and `verify-delivery` workflows with `spec-driven` schema. Created all four artifact types in dependency order and validated strictly before starting product code. The installed proposal skill has a planning-only wait, but the kickoff and issue explicitly authorize implementation when valid and aligned; user authorization takes precedence, so no extra approval round was introduced.

| Issue acceptance | Evidence |
|---|---|
| Valid specification aligned with issue | `openspec validate expo-modern-scaffold-baseline --strict --json`: valid, zero findings before implementation and on final review |
| Preserved legacy/native state | Changed-file allowlist/protected-path check; ignored native fingerprint comparison; backup never accessed or modified |
| Reproducible supported isolated app | Official docs/registry metadata; Node22.23.4/npm10.9.9; Expo58.0.23/React19.3.0/RN0.88.1; npm install then clean npm ci; lock unchanged |
| Meaningful test/static/compatibility baseline | Real answer interaction with no-fetch assertion, strict TypeScript, public/introspected config checks, online Expo dependency validation and Doctor20/20 |
| Native confidence honestly distinguished | Baseline comparison table explicitly labels configured/introspected vs Xcode/binary/device unverified, including family, scheme, name/version, ATS and assets |
| No secrets/live provider dependency | No .env or legacy EAS content loaded, copied or used; synthetic fixtures; added-diff secret-shape review and allowed-file review |
| Reviewable delivery to main | Dedicated branch, scoped commit(s) and linked PR; no merge/deploy/publish/archive |
| Pilot interventions recorded | Zero extra user decisions or task-specific follow-up prompts after kickoff; environment retries below |

Name/version baseline is deliberately provisional: root app.json name `kyrsha's App`, version `1.0.0` and inventoried local build `1`. A conflicting native target display-name override and marketing version remain an owner decision before accepting migration/release. Issue #5 explicitly permits recording ambiguous authority. It explicitly resolves phone targeting and secure scaffold defaults; existing historical docs remain preserved as historical evidence.

## Exact checks and outcomes

Application commands ran with working directory `modernization/expo-next/` and the existing Node22.23.4 binary directory first in PATH. npm cache for install/registry reads: `/private/tmp/kyrshas-issue5-npm-cache`. `EXPO_NO_DOTENV=1` and `EXPO_NO_TELEMETRY=1` are embedded in Expo-evaluating scripts; online reruns unset inherited `EXPO_OFFLINE`. No runtime provider or login was used.

| Command/check | Result and evidence |
|---|---|
| `git fetch origin main`; `git switch -c pilot/02b-expo-scaffold-baseline origin/main` | PASS; fetched base above |
| `openspec --version`; `openspec list --json`; `openspec context --json`; `openspec list --specs --json` | PASS; CLI1.17.0, resolved local root, no existing capability specs |
| `openspec new change expo-modern-scaffold-baseline`; `openspec instructions <proposal/specs/design/tasks> --change expo-modern-scaffold-baseline --json` | PASS; schema instructions used and artifacts created through Gortex edits |
| `openspec status --change expo-modern-scaffold-baseline` | PASS; 4/4 planning artifacts present before apply |
| `openspec validate expo-modern-scaffold-baseline --strict --json` | PASS, exit0; valid, no issues |
| `openspec instructions apply --change expo-modern-scaffold-baseline --json` | PASS; tasks checked only after their behavior/evidence was delivered |
| `npm view expo dist-tags --json`; `npm view expo-template-blank-typescript dist-tags version dependencies devDependencies --json`; `npm view expo@58.0.23 engines peerDependencies --json` | PASS; official stable/toolchain evidence summarized in baseline |
| `npm install --cache /private/tmp/kyrshas-issue5-npm-cache` | PASS, exit0; isolated initial resolution, no root install |
| `npm ci --cache /private/tmp/kyrshas-issue5-npm-cache` | PASS, exit0; clean isolated reinstall, no lockfile change; upstream deprecation warnings documented |
| `npm ls --depth=0` | PASS, exit0; resolved versions in baseline |
| `CI=1 npm run typecheck` | PASS, exit0; strict TypeScript including component test |
| `CI=1 npm test` | PASS, exit0; 1 suite/1 behavioral test, 0 snapshots; initial/reveal/hide and no-fetch checks |
| `CI=1 npm run check:config` | PASS, exit0; preserved public identity, phone-only config, splash options and introspected plist scheme/version/orientation/ATS/disabled updates |
| `CI=1 npm run check:expo` (online, EXPO_OFFLINE unset) | PASS, exit0; dependencies up to date |
| `CI=1 npm run doctor` | PASS, exit0; 20/20 checks passed |
| `CI=1 npm run verify` after npm ci | PASS, exit0; all five checks above ran sequentially on clean installation |
| `CI=1 npm run export:ios` | PASS, exit0; Metro compiled618 modules and exported local ignored iOS Hermes bundle/metadata; no upload/native generation |
| `python3 scripts/doctor.py` | PASS, exit0; repository structure only, independent of scaffold tests |
| `PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue5-pycache python3 -m py_compile scripts/doctor.py` | PASS, exit0; cache outside worktree |
| `git diff --check`; `git diff --cached --check` | PASS on reviewed delivery diff |
| Changed-file/protected-path review | Final allowlist review recorded before commit; root app/config/dependency files, existing CI and earlier reports unchanged |
| Native fingerprint | Before:20,437 path/type/file-content/link-target entries; final equality comparison recorded below |
| Added diff secret-shape scan | Final boolean-only review recorded below; no legacy secret value needed for comparison |
| Gortex impact/detect/tests/guards/contract | Contract allow; no guard rules configured. Graph did not identify component-test coverage; the executed Jest result establishes actual testing. Graph evidence is not a test pass. |

**FAIL / recovered environment attempts:** first sandboxed git fetch failed because `.git/FETCH_HEAD` was read-only; authorized escalation succeeded. Initial sandboxed npm metadata query failed DNS (`ENOTFOUND`); public registry retry with network permission succeeded. An initial sandboxed Expo dependency check used the offline SDK map and warned about reliability; the online rerun and Doctor passed. No product/static/test failure remained and no out-of-scope dependency repair was needed.

**NOT RUN:** generated native project/Xcode target, built plist, simulator/device rendering/orientation, URL opening, icon/splash visual parity, signing/entitlements/account checks, installed-data upgrade, backup restore, live API, vulnerability audit, EAS builds, releases, OTA updates, deployment, publish or merge. `actionlint` was unavailable; workflow paths, pinned toolchain and commands were reviewed, with hosted CI status recorded at PR delivery. Root legacy npm/Expo diagnostics were not rerun because they are known drift findings and may load compromised config.

**BLOCKED:** no implementation blocker. Production migration/release remains outside scope pending owner decisions and device/native evidence, not a scaffold verification claim.

## Preservation review and delivery

Final local scope review **PASS**: all **22 changed paths** are within the approved allowlist. Protected root application/config/dependency paths, existing harness CI and earlier issue reports are unchanged. `git diff --cached --check` passed. No generated native/build/dependency outputs or environment files are staged. A boolean-only scan of added diff text for common token/private-key/credential assignment patterns passed; it did not read the legacy credential and is not an exhaustive secret audit.

Ignored native fingerprint **PASS**: all **20,437** path/type/file-content/link-target entries match the pre-implementation snapshot. The separate backup was never accessed or modified; prior inventory evidence is retained, without claiming a new backup restore/content check.

`verify-delivery` acceptance review **PASS** for this bounded scaffold: inspected actual component/test/config/workflow against both requirement deltas and issue acceptance; clean-install verification and compilation evidence support the claims. No material acceptance mismatch or out-of-scope implementation was found. Future device/native/release gates remain explicitly unverified.

PR delivery **PASS**: implementation commit `773a62dcfd22efe756cbeca445a5801951c9e6c0` pushed on the dedicated branch; [PR #6](https://github.com/dvale94/kyrshas-app/pull/6) opened against `main`, linked to issue #5. Hosted [Expo workflow](https://github.com/dvale94/kyrshas-app/actions/runs/42955343766) and [existing harness CI](https://github.com/dvale94/kyrshas-app/actions/runs/42955343646) both completed successfully on that implementation commit. OpenSpec apply reports **6/6 tasks complete**, state `all_done`; strict validation remains valid with zero findings. A documentation-only follow-up commit records these outcomes and completed tracking. No merge/deploy/publish/archive.

## Risks and next work

- Legacy exposed credential remains compromised. Owner-controlled revocation/rotation and an approved server-side boundary are separate work; no value was read, printed, copied, injected or consumed here.
- Existing icon200×200 is below recommended production size; native icon/splash source and visual authority remain unresolved. Sources were referenced read-only, not copied from ignored native resources.
- Public config and in-memory safe mods do not establish generated Xcode target settings, deployed identity/signing, effective release metadata or runtime behavior. Secure ATS policy may need a separately scoped development-client transport decision.
- SDK58 defaults replace obsolete SDK49 toolchain assumptions only in the new app. Native compatibility, minimum OS, storage continuity and feature parity need future slice acceptance.
- Public diagnostic services and hosted runner availability are external dependencies; lockfile reproducibility does not freeze remote metadata services. CI is limited to isolated checks.

See the baseline for proposed slices. No approval request for this bounded implementation is outstanding.

## Pilot prompts and interventions

Issue-number kickoff was the sole task request. Additional task-specific prompts after kickoff: **0**. Additional human scope/implementation decisions: **0**. Runtime sandbox escalations for Git/network/install operations were handled through the environment's approval mechanism without changing approved scope. No account login, secrets or manual fix were requested. Gortex source-navigation/edit API retries and budget truncation required corrected tool calls; they did not change product scope.

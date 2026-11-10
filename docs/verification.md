# Verification contract

Status: observed audit baseline for [issue #1](https://github.com/dvale94/kyrshas-app/issues/1), November 9, 2026 (America/New_York). Passing harness checks do not establish a working application. No packages were installed, application code changed, or native projects generated.

## Executed checks and diagnostics

Environment: macOS workspace; Node `v20.18.0`, npm `10.8.2`, Python `3.9.6`. These are observed local versions, not a validated/pinned toolchain. CI in `.github/workflows/ci.yml` instead selects Python `3.12` and runs only the two harness checks below.

| Command/check | Result | Evidence and limit |
|---|---|---|
| `python3 scripts/doctor.py` | PASS, exit 0 | Required starter files and skill frontmatter pass. The script explicitly states application tests are not configured or run. |
| `PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue1-pycache python3 -m py_compile scripts/doctor.py` | PASS, exit 0 | Syntax-only check equivalent to CI's `python3 -m py_compile scripts/doctor.py`; cache redirected outside the repository. |
| `npm pkg get name version main scripts dependencies devDependencies packageManager engines` | PASS, exit 0 | Reads manifest declarations; establishes scripts/versions, not app compatibility. No `packageManager` or `engines` value returned. |
| `npm ls --depth=0 --json` | FAIL, exit 1 | Captured through a Python subprocess; one reported problem: installed Axios `0.18.0` does not satisfy declared `^1.5.0`. Lock resolves `1.5.0`. No repair attempted. |
| `CI=1 EXPO_OFFLINE=1 node node_modules/expo/bin/cli install --check` | FAIL, exit 1 | Locally installed CLI, no `npx` package download. Flags AsyncStorage `1.19.3` vs `1.18.2`, splash-screen `0.22.0` vs `~0.20.5`, and gesture-handler `2.13.1` vs `~2.12.0`. CLI warns offline validation is unreliable. No `--fix` run. |
| `openspec --version` | BLOCKED, exit 127 | Command not found on this execution PATH. Installed skill files do not prove the CLI is usable. No install/init attempted. |
| `python3 --version`, `node --version`, `npm --version` | PASS, exit 0 | Environment inventory only; versions above. |
| Targeted `python3` metadata/security diagnostics | PASS as inventory; exposure found | Read EAS variable names and presence booleans, HTTPS/hostname, package/lock versions, installed Expo compatibility metadata, native directory/file presence and missing asset/package checks. Credential values suppressed. Findings are in the migration audit. |

The Expo CLI reported loading local `.env` and exporting public variable names, without printing values. Offline checking did not make app/API requests. Do not rerun application commands against the compromised credential.

Safe credential-presence check used in the metadata diagnostics (prints no value):

```python
import json
from pathlib import Path
config = json.loads(Path("eas.json").read_text())
preview_env = config.get("build", {}).get("preview", {}).get("env", {})
print("credential present:", bool(preview_env.get("EXPO_PUBLIC_API_KEY")))
```

Presence is **true** in tracked `eas.json`; this is a security finding, not a passing security gate. Validity/revocation was not tested. See [migration audit](migration/expo-audit.md).

## Existing application commands: NOT RUN

These are actual `package.json` scripts, not passing verification checks. Local dependencies exist but fail the consistency checks above.

| Command | Actual script | Status and reason |
|---|---|---|
| `npm start` | `expo start` | NOT RUN — starts Metro/app workflow and may use exposed API configuration. Requires a safe reproduction setup. |
| `npm run android` | `expo run:android` | NOT RUN — can prebuild/create native files and compile/install the app; outside this audit. No local Android directory. |
| `npm run ios` | `expo run:ios` | NOT RUN — can prebuild/modify native artifacts and compile/install; ignored local iOS state must first be preserved. |
| `npm run web` | `expo start --web` | NOT RUN — no declared/installed React DOM or React Native Web; configured favicon target also missing. Web support is unverified. |

No lint, typecheck, build, unit-test, integration-test, or E2E script is defined in `package.json`. No tracked test files or test-runner/typecheck/lint configuration were found in the Git file inventory. Do not invent commands such as `npm test` or claim JavaScript checks pass. No bundling, simulator/device run, live API contract test, EAS build, or vulnerability scan was performed.

## Proposed checks: NOT RUN; require a separately approved baseline

| Layer | Proposed check | Prerequisites and success evidence |
|---|---|---|
| Reproduction | Frozen-lockfile install in an isolated workspace using a deliberately selected Yarn version | Approval for dependency work, preserved native state and synthetic/safe API config. Then compare manifest/lock/install and run dependency diagnostics. Never install as part of this audit. |
| Expo metadata | `npx expo-doctor`; `npx expo install --check` | NOT RUN in these forms. `expo-doctor` is not locally installed; `npx` could download it. Pin/provision tools in an approved phase, inspect installed SDK support and network needs. Record actual exit codes and warnings. |
| Formatting/static checks | Define a suitable lint/static-analysis baseline | No existing configuration. Tool/dependency choices need an approved scope; do not report speculative checks as configured. |
| Unit/integration | Synthetic API-response tests and hook/component checks | Verify empty/malformed responses, rejected initial request, per-card refresh failures, card order, answer visibility, and October 3 vs other dates. Select test tooling under the baseline proposal. |
| Bundle/native | Target-SDK bundle and iOS/Android development builds | Approved compatibility fixes/toolchain, safe variables, identity/signing review. Build success must be followed by runtime checks. Avoid printing config/bundles that contain secrets. |
| Device/manual | Home load, splash completion, image rendering, each refresh, answer toggle, birthday content, offline/API failure, tablet layout | Record OS/device/build and observed outcomes. Use controlled clock/fixtures for birthday cases. Verify any discovered persisted state survives an app upgrade. |
| Backend/security | Confirm credential revocation and separately approved proxy/credential design | Account owner authorization and provider contract checks; no raw credentials in evidence. |

No `expo install --fix`, package install, prebuild, Pods install, native regeneration, credential rotation, deployment or publish command belongs in the audit workflow. Expo's [upgrade guidance](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) is reference material for a later approved change, not authorization to execute its mutating commands.

## Documentation delivery checks

For this documentation-only PR, run `git diff --check`, rerun the harness checks, verify the diff contains exactly the five issue-approved paths, and compare the diff against the configured credential in memory while printing only pass/fail. Record results in `.agentic/handoff.md` and the PR. Do not print raw EAS configuration or secret-bearing logs to perform the check.

Use distinct PASS, FAIL, NOT RUN and BLOCKED outcomes. A failed dependency diagnostic is an audit finding; it must not be repaired by broadening this issue's scope.

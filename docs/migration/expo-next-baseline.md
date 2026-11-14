# Isolated Expo baseline — pilot 02B

For [issue #5](https://github.com/dvale94/kyrshas-app/issues/5), November 10, 2026 (America/New_York). This is an isolated supported scaffold, **not the migrated application or a release candidate**. Legacy application files and ignored native state remain preserved. Specification: [`expo-modern-scaffold-baseline`](../../openspec/changes/expo-modern-scaffold-baseline/proposal.md).

## Upgrade choice and version evidence

Use `modernization/expo-next/` for a minimal TypeScript Expo bootstrap equivalent to the official blank template, authored directly to avoid generator overwrites. No navigation/UI port, backend, persisted state, personal birthday fixtures, root workspace/dependency changes or new service is introduced. The demo displays one deterministic synthetic trivia question and an accessible answer visibility control.

Verified November 10 against [Expo SDK reference](https://docs.expo.dev/versions/latest/), [project creation guidance](https://docs.expo.dev/get-started/create-a-project/) and official npm publisher metadata. The SDK reference pairs 58 with RN 0.88, React 19.3 and minimum Node 22.13.x. `npm view expo dist-tags --json` reported stable latest `58.0.23`; no canary was selected. `npm view expo-template-blank-typescript dist-tags version dependencies devDependencies --json` reported template `58.0.32`, Expo `~58.0.23`, React `19.3.0`, RN `0.88.1`, status bar `~58.0.4`, TypeScript `~6.0.3`, React types `~19.3.0`. The template is reference evidence, not a runtime dependency or an executed generator.

The [Expo unit-testing guide](https://docs.expo.dev/develop/unit-testing/) recommends Jest/SDK preset and React Native Testing Library; SDK 58 uses Jest 30. Current testing-library metadata requires React >=19 and `test-renderer` rather than deprecated `react-test-renderer`.

| Component | Actual resolved baseline |
|---|---|
| Node / npm | `22.23.4` / `10.9.9` (already installed locally; `.nvmrc`, `engines`, `packageManager`, engine-strict) |
| Expo / React Native / React | `58.0.23` / `0.88.1` / `19.3.0` |
| Splash / status bar | `58.0.13` / `58.0.4` |
| TypeScript / React types | `6.0.3` / `19.3.0` |
| Jest / Jest Expo / Jest types | `30.5.2` / `58.0.14` / `30.0.0` |
| Testing Library / test-renderer | `14.1.0` / `1.3.0` |
| Expo Doctor | `1.21.6` (local pinned dependency, no npx download at check time) |
| OpenSpec | `1.17.0`, installed `spec-driven` schema |

`package-lock.json` v3 pins exact transitive resolutions and integrity metadata; npm `ci` is the reproducible install. Root Yarn Classic and SDK 49 remain untouched. The default shell's Node `20.18.0`/npm `10.8.2` are unsuitable; select the isolated toolchain first. Initial install emitted upstream deprecated `inflight`, `whatwg-encoding` and `glob` warnings; do not mistake compatibility checks for a security audit.

## Reproduce checks

From a clone containing the existing tracked assets:

```sh
cd modernization/expo-next
nvm use                         # Node 22.23.4; install this Node separately if absent
node --version                  # v22.23.4
npm --version                   # 10.9.9
npm ci
CI=1 npm run verify
```

All app/diagnostic scripts that evaluate Expo set `EXPO_NO_DOTENV=1`; telemetry is disabled. No local `.env`, legacy EAS credential, login or live content provider is required. Keep credentials out of the environment. Installs occur **only here**, never at the legacy root. Public registry/Expo metadata access is needed for install and online diagnostics. On this machine, commands selected the existing Node binary directory by `env PATH=/Users/danielvalencia/.nvm/versions/node/v22.23.4/bin:$PATH ...`; npm cache was redirected with `--cache /private/tmp/kyrshas-issue5-npm-cache`. These machine-specific paths are not required in another clone.

Scaffold scripts:

| Command (in isolated app) | Purpose |
|---|---|
| `npm run typecheck` | Strict `tsc --noEmit`, including interaction test |
| `npm test` | Jest CI, one process, Watchman disabled; native mocks through SDK iOS preset |
| `npm run check:config` | Public config plus in-memory Expo introspection assertions; no native directory generated |
| `npm run check:expo` | SDK package-version compatibility |
| `npm run doctor` | Pinned Expo Doctor; network-backed metadata checks |
| `npm run verify` | The five checks above in order; stops on failure |
| `npm run export:ios` | Optional local iOS JavaScript bundle into ignored `dist/`; no upload or native build |
| `npm start` | Optional Metro development server; not a device acceptance check |

The interaction test renders the real demo component with native mocks, checks the initially hidden answer, presses Show Answer and Hide Answer, asserts visible content/accessible expanded state and verifies no fetch was called. It is not a device/E2E test. Config assertions deliberately check public identity and intended policy independently of app rendering.

## Identity and native comparison

Source evidence is root `app.json` and [the merged native inventory](ios-native-inventory.md); the original native project and separate backup are never regenerated or used as scaffold inputs. Exact identifiers below are public configuration, not signing credentials.

| Setting | Legacy/inventory evidence | Scaffold choice and verification confidence |
|---|---|---|
| iOS identity | Bundle ID matches native Debug/Release | `com.dvale1994.kyrshasapp`, public config asserted. No registration/signing/account action; installed upgrade continuity unverified. |
| Slug / EAS association | `kyrshas-app`; existing project UUID | Preserved slug and `1eedc0a6-a315-467a-a326-ce48cba82b2c`, asserted in config. No new EAS project, EAS file, service activation or login. Association ownership not queried. |
| Display name | app.json/plist `kyrsha's App`; a differing nonempty target override exists | Explicit **provisional scaffold baseline** `kyrsha's App`, public config and introspected CFBundleDisplayName asserted. Effective shipped/built override authority remains an owner decision; no release-name claim. |
| Version / build | app.json/plist `1.0.0`, local build `1`, target marketing `1.0` | Provisional `1.0.0` / `1`, asserted in introspected plist. Highest distributed version/build and release management unverified; do not release this baseline without resolution. |
| Device family | app.json supports tablets; native target family `1` | Issue #5 explicitly selects **iPhone only**, `platforms: [ios]`, `supportsTablet: false`. Config asserted; generated Xcode `TARGETED_DEVICE_FAMILY` **NOT RUN**. This does not prohibit iPad compatibility mode. |
| Orientation / style | Portrait/light config; native phone also allows upside-down | Portrait/light config; introspected phone orientations only `UIInterfaceOrientationPortrait`. UI/device orientation and iPad behavior unverified. |
| URL scheme | Native scheme equals bundle ID; none explicit in root config | Explicit `com.dvale1994.kyrshasapp`, asserted in public config and introspected CFBundleURLTypes. URL open/delegate runtime behavior **NOT RUN**. |
| ATS | Native broad arbitrary-loads plus localhost exemption | Explicit false arbitrary loads/local networking; no exception domains. Introspected plist asserted. No functional network requests; Metro/dev-client transport may need later development-specific review. |
| Icon | Root source `assets/icon.png` 200×200; native 1024×1024 differs | Read-only `../../assets/icon.png` reference, config asserted/Doctor asset check passed. Below Expo's recommended 1024×1024; native source/visual authority unresolved, no replacement or upscaling claimed. |
| Splash | Root/native 1284×2778, not byte-identical | Read-only `../../assets/splash.png`, supported splash plugin, contain intent and green `#38761d`; options asserted. Generated resources/actual launch appearance and visual parity **NOT RUN**. |
| Updates | Native EXUpdatesEnabled false, no service established | `updates.enabled: false`, introspected Expo plist false asserted. No OTA URL/runtime identity/service added. |
| Bootstrap / native hooks | Generated-like legacy entry/linking/notification forwarding | SDK registerRootComponent bootstrap; no old AppDelegate/Pods copied. Native hook/delegate parity unverified until an approved native build comparison. |
| Capabilities / signing / storage | Empty inspected entitlements, automatic signing; deployed state unknown | No capabilities, permissions, auth, storage or signing added. Shipped entitlements/account and installed-data continuity **NOT RUN**. |
| Toolchain / OS / architecture | SDK49, RN0.72, iOS13 and old build machinery | Supported SDK58 defaults; no legacy flags forced onto it. Actual generated deployment target, Xcode/Pods and supported device OS comparison **NOT RUN**. |

The name/version uncertainty is recorded as permitted by issue #5, rather than guessed as a release decision. Config/introspection verification is distinct from generated Xcode or binary/runtime verification. `expo config --type introspect` executes supported safe config mods in memory; it does not prove the device-family Xcode build setting or render icon/splash resources.

## Verification outcomes

Executed locally; final integrated results are recorded in [the issue report](../../.agentic/reports/issue-5-expo-scaffold.md). Initial checks: typecheck **PASS**, interaction test **PASS** (1 suite/1 test), config/introspection **PASS**, online `expo install --check` **PASS**, Expo Doctor **PASS** (20/20), `npm ls --depth=0` **PASS**. An earlier sandboxed compatibility run passed against the local map with an offline reliability warning; the online rerun passed without that warning. Root harness and Python syntax checks **PASS**. Clean install and integrated rerun evidence are finalized in the report.

No simulator/device tests, signed/native builds, App Store actions, EAS builds/updates, credential consumption/rotation, live APIs, backend, persistence migration, backup restore or native generation are performed. A local bundle, if reported, is JavaScript compilation only.

## Preservation and next slices

The initial worktree was clean. Branch `pilot/02b-expo-scaffold-baseline` started from fetched main `7283632c4a7d7f415c9a5c7e6b1927aa7902e44e`. Review must include the exact changed-file allowlist: isolated app, new isolated workflow, this OpenSpec change, this doc, issue-5 report and handoff pointer. Root App.js/src/package.json/yarn.lock/app.json/eas.json and harness CI remain unchanged. All 20,437 ignored iOS path/type/content/link entries were fingerprinted before implementation; final comparison is in the report. The separate owner-verified backup was never accessed or modified; its earlier content equivalence is issue #3 evidence, not a new restore test.

Proposed separately approved slices:

1. Owner revokes/rotates the compromised legacy credential and approves any server-side provider boundary. Removing it alone does not revoke it; a new EXPO_PUBLIC key would still be readable in the client. No credential is copied or used here.
2. Resolve effective installed name, distributed version/build, approved icon/splash sources and OS/toolchain/device expectations. Compare a contained generated native project and built plist, scheme and entitlements without replacing the original tree.
3. Port bootstrap/navigation and card presentation one slice at a time with synthetic success/failure fixtures, attribution, card order, answer behavior and birthday/non-birthday cases. Preserve personalized assets without copying them to fixtures.
4. Approve transport and splash/refresh failure handling, then test installed-state upgrade continuity and runtime behavior on iPhone. Review iPad compatibility expectations explicitly.
5. Release/signing/account work only after separate approval. This pilot does not deploy, publish, merge or archive.

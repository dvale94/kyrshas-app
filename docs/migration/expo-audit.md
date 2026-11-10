# Legacy Expo audit (pilot)

Status: audit complete for [issue #1](https://github.com/dvale94/kyrshas-app/issues/1); modernization is proposed, not approved or implemented. Audited November 9, 2026 (America/New_York), from `ac2e11d72b6e1665c80077d21cd67a635f362fe0`. Source inspection and local metadata diagnostics establish this baseline, not a working device build.

## Versions and reproducibility

Exact declarations come from `package.json`; installed values come from local `node_modules/<package>/package.json`. Local installation is machine state, not proof that a clean clone reproduces it.

| Dependency | Exact declaration | Locally installed |
|---|---|---|
| Expo | `~49.0.11` | `49.0.11` |
| React Native | `0.72.4` | `0.72.4` |
| React | `18.2.0` | `18.2.0` |
| AsyncStorage | `^1.19.3` | `1.19.3` |
| React Navigation native | `^6.1.7` | `6.1.7` |
| React Navigation native-stack | `^6.9.13` | `6.9.13` |
| React Navigation stack | `^6.3.17` | `6.3.17` |
| RNEUI base | `^4.0.0-rc.8` | `4.0.0-rc.8` |
| RNEUI themed | `^4.0.0-rc.8` | `4.0.0-rc.8` |
| Axios | `^1.5.0` | **`0.18.0` — invalid against manifest** |
| expo-splash-screen | `^0.22.0` | `0.22.0` |
| expo-status-bar | `~1.6.0` | `1.6.0` |
| react-native-gesture-handler | `^2.13.1` | `2.13.1` |
| react-native-safe-area-context | `4.6.3` | `4.6.3` |
| react-native-screens | `~3.22.0` | `3.22.1` |
| @babel/core (dev dependency) | `^7.20.0` | `7.22.20` |

`yarn.lock` is tracked and has the Yarn Classic v1 header. No npm, pnpm or Bun lockfile is present. Neither `packageManager` nor `engines` is declared. The installed Yarn executable/version was not checked. Selected lock resolutions are Expo `49.0.11`, React `18.2.0`, React Native `0.72.4`, splash-screen `0.22.0`, gesture-handler `2.13.1`, screens `3.22.1`, RNEUI base/themed `4.0.0-rc.8`, and Axios **`1.5.0`**. The local Axios mismatch therefore differs from both manifest intent and lock resolution. `npm ls --depth=0 --json` exits 1 with that one reported problem; it does not prove transitive dependencies are safe.

No packages were installed and no lockfile was regenerated. A future approved reproduction should select/pin a package-manager version and use a frozen lockfile in an isolated checkout. Do not switch package managers or overwrite this installation during the audit.

## Compatibility and native risks

The local offline check, `CI=1 EXPO_OFFLINE=1 node node_modules/expo/bin/cli install --check`, exits 1 and reports:

| Package | Installed | Expo 49 bundled expectation |
|---|---|---|
| AsyncStorage | `1.19.3` | `1.18.2` |
| expo-splash-screen | `0.22.0` | `~0.20.5` |
| react-native-gesture-handler | `2.13.1` | `~2.12.0` |

These expectations were also read from installed Expo's `bundledNativeModules.json`. The CLI warns that offline validation is unreliable: this is evidence of known mismatches, not an exhaustive compatibility or vulnerability assessment. Safe-area-context and screens match the bundled ranges. The installed Axios age/mismatch warrants a separate security review; no CVE scan was performed.

Other observed risks:

- RNEUI uses release-candidate packages. Stack/navigation, gesture-handler, screens, safe areas, splash APIs, and UI image rendering need validation together on a chosen target SDK. Native-stack is declared but the entry point uses the JavaScript stack.
- `ContentContainer.js` and `TextContainer.js` import `prop-types`, but it is not a direct dependency; local `15.8.1` availability may rely on hoisting. No change was made.
- `package.json` offers web startup but declares neither `react-dom` nor `react-native-web`; neither is locally installed. `app.json` references a missing web favicon. Web functionality is unverified.
- `eas.json` development requires a development client, but `expo-dev-client` is neither declared nor installed. No EAS build was attempted.
- No native files are tracked. An ignored local `ios/` directory contains an Xcode project/workspace, Pods, Podfile/lock and build artifacts. `android/` is absent. Custom native changes, signing, entitlements and actual installed binaries were not inspected. Preserve this directory before any later migration; deletion/regeneration requires approval.
- `app.json` has no explicit config plugins, Android application ID, scheme or notification configuration. Absence in this file is not proof of absence from the ignored native project or deployed app.
- SDK 49 is listed among deprecated releases in the [Expo upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). Do not assume the current Expo Go app can run it. Choose a supported target and development-build strategy when modernization is approved.

## API, security and state

**Credential exposure remains present:** a boolean-only inspection confirms a nonempty `EXPO_PUBLIC_API_KEY` in tracked `eas.json` preview configuration. Treat it as compromised; no value was copied into this audit, logs or changes, and no credential was used or rotated. `src/api/axiosConfigs.js` consumes the public key as `X-API-Key`; preview points to HTTPS host `api.api-ninjas.com`.

Owner-controlled revocation/rotation is urgent. Removing a value in a later commit alone does not revoke it or remove prior copies. A replacement embedded through `EXPO_PUBLIC_` would still be readable in client bundles; keeping a private provider credential requires a server-side boundary where necessary. Any proxy/auth/rate-limit design is a separate architecture/security change requiring approval. See [Expo's security guidance](https://docs.expo.dev/guides/environment-variables/). Account permissions, billing/quotas, provider entitlements and revocation status remain unknown. No external account was accessed.

`src/api/ApiProvider.js` depends on quotes, trivia, facts, dad jokes, bucket-list and random-image endpoints. It assumes nonempty arrays for most content, a bucket-list object, and base64-compatible image responses. There is no schema validation, explicit timeout/retry, or offline fallback in the inspected transport/providers. The error interceptor logs whole Axios errors, which may include headers; avoid sharing raw runtime error logs until redaction is addressed.

`useHomescreen.js` commits initial state only after all providers succeed; `HomeScreen.js` hides the splash only when content exists. **Source-based failure hypothesis, not runtime reproduction:** one failed request can prevent initial splash dismissal. `ContentContainer.js` has no `finally` around refresh, so a rejected refresh may leave its spinner active. These are proposed verification targets, not fixes in this issue.

Observed state is React memory. No persistence calls, login, notifications, payments or deep-link handlers appear in the inspected runtime path. AsyncStorage is declared, so existing on-device data must not be presumed disposable. A local `.env` exists and was loaded by the offline CLI; no `.env` file is tracked. Its values were not printed or used for live requests. Development/production EAS environment values may be provided outside the repository and were not queried.

## Preservation contract

Preserve the following until an owner explicitly approves a change:

- Slug `kyrshas-app`, iOS bundle ID `com.dvale1994.kyrshasapp`, EAS project association `1eedc0a6-a315-467a-a326-ce48cba82b2c`, app identity/versioning continuity, and any externally registered Android identity once confirmed. Do not silently create a replacement EAS project or change signing.
- Single home route; quote/trivia/fact/joke/bucket-list card order; per-card refresh; attribution; answer toggle; image treatment; portrait/light presentation, green branding, splash and tablet intent (`App.js`, `app.json`, screen/components).
- October 3 birthday insertion, birthday provider content and ten tracked WebP assets under `src/screens/HomeScreen/birthdayData/`. Personalized text/photo behavior needs comparison on a device; do not copy private content into fixtures.
- Endpoint/category semantics and display-object shape in `src/api/ApiProvider.js`, while treating credential remediation as a separately approved exception to current transport behavior.
- Any installed-user storage, native capabilities, entitlements, links and notifications discovered during reproduction. No data deletion or native regeneration is authorized by this audit.

## Options and recommendation

The following are planning estimates for one experienced engineer after access and a verification baseline are available. They are not measured delivery commitments and exclude account recovery, release review, proxy work and unknown native customization.

| Criterion | Incremental SDK upgrade | Fresh Expo scaffold plus selective port |
|---|---|---|
| Estimated work | Roughly 5–10 engineer-days across multiple SDK transitions; grows with breakages. | Roughly 3–6 engineer-days for the observed one-screen app; native discoveries can invalidate this estimate. |
| Configuration preservation | Retains repository identity/configuration naturally, but native changes still require review. | Must explicitly carry identity, EAS association, assets and any native settings into the new project. |
| Dependencies | Align and validate at each SDK step, retaining legacy constraints longer. | Start with a supported coherent baseline; deliberately select compatible navigation/UI/native packages. |
| Existing local iOS project | Potentially easier to retain manual changes; first establish what they are. | Highest risk of losing untracked customizations unless separately inventoried and preserved. |
| User data | Retains IDs more naturally; still requires storage/upgrade tests. | Safe only if IDs, signing and any storage namespaces/formats remain compatible. |
| Regression/testability | Smaller individual diffs, repeated old-toolchain setup and checks. | Larger first comparison, but a small runtime surface allows porting one verified slice at a time. |

**Preferred approach: a fresh scaffold in a separate approved workspace/branch, preserving identity and porting the observed behavior without redesign.** The small runtime surface, lack of tracked native code, inconsistent local dependencies and existing compatibility drift make a clean baseline attractive. This recommendation is conditional on inventorying/backing up the ignored iOS project and confirming no material custom native behavior or persisted-data contract would be lost. If such behavior exists, revisit the estimate and favor incremental upgrades rather than discarding it.

For the incremental alternative, Expo recommends SDK-by-SDK upgrades to isolate failures; follow each target's release notes rather than treating a large manifest jump as validation. See the [official upgrade walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). The exact target SDK and native-library compatibility matrix must be selected at implementation approval, not inferred from this SDK 49 installation.

## Proposed slices and approval boundary

1. Owner handles credential revocation/rotation; separately approve a safe server-side credential strategy where required. Do not reuse the exposed key for reproduction.
2. Propose an OpenSpec verification-baseline change: preserve local native state; pin reproduction tooling; use synthetic API responses; capture existing success/failure behavior and date-dependent birthday behavior. Add tests only under that approved scope.
3. After the owner approves the migration path and preservation contract, inventory native settings and choose a supported target SDK. Prepare the chosen scaffold or incremental branch without deleting the original native project.
4. Port/upgrade bootstrap/navigation, transport, then each content card, splash/refresh handling and assets in reviewable slices. Any intentional behavior fixes need explicit acceptance criteria rather than silently changing the baseline.
5. Validate on iOS and Android devices/simulators, compare any installed-state upgrade behavior, and evaluate web only if it is a required platform. Confirm account/build configuration without exposing secrets.
6. Release only after separate human approval; this audit authorizes no deployment, signing/account changes, native regeneration or implementation.

Only material owner decisions remain: approve the modernization path/preservation contract and authorize credential remediation/proxy architecture through the responsible account owner. Missing runtime evidence is a next-phase verification requirement, not a reason to block this documentation PR. See [verification](../verification.md) and [handoff](../../.agentic/handoff.md).

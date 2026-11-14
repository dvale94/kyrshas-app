# Isolated iOS native validation — pilot 02C

November 14, 2026 (America/New_York). [Issue #7](https://github.com/dvale94/kyrshas-app/issues/7), following merged [PR #6](https://github.com/dvale94/kyrshas-app/pull/6). Specification: [`expo-next-ios-simulator-validation`](../../openspec/changes/expo-next-ios-simulator-validation/proposal.md). Detailed command/preservation/pilot evidence: [issue report](../../.agentic/reports/issue-7-ios-simulator.md).

**Generated native source validation PASS; native build and simulator smoke BLOCKED.** This is the synthetic scaffold, not a migrated app or release. No simulator binary, built plist, runtime interaction or visual acceptance is claimed. After the authorized patch follow-up, clean isolated verification passes, including online compatibility and Doctor20/20. Expo58.0.25/splash58.0.14/status-bar58.0.5 and their generated npm lock replace the earlier patch baseline; React/RN/test tooling and security defaults are unchanged. Initial failure evidence below remains historical. Both native trees were left unregenerated: all36 scaffold entries match, while one original Xcode UI-state file changed with an unestablished writer (all20,436 other original entries match); see the report.

## Tested environment and blockers

| Preflight | Observed result |
|---|---|
| macOS / architecture / disk | 15.8.1, build24H32; arm64; approximately756GiB available |
| Selected developer directory | `/Applications/Xcode.app/Contents/Developer`; no selection change |
| Xcode / simulator SDK | Xcode26.3 build17C529; `xcrun --sdk iphonesimulator --show-sdk-version` returns26.2 |
| CLT receipt | `com.apple.pkg.CLTools_Executables`16.4.0.0.1.1747106510; selected developer directory is full Xcode |
| Simulator discovery | Authorized unsandboxed `simctl list runtimes -j`: empty runtimes; `list devices available -j`: only an empty iOS16.4 group, no available iPhone |
| CocoaPods | `pod --version`:1.13.0 exit0, with `ffi-1.16.2` native extension warning; dependency installation/build compatibility unverified |
| Shell vs selected Node/npm | Shell20.18.0/10.8.2; existing isolated22.23.4/10.9.9 explicitly selected, no upgrade |
| Selected packages | Expo58.0.23, RN0.88.1, React19.3.0; existing npm lockfile unchanged |
| Native template | Official `expo-template-bare-minimum@58.0.34`, resolved from `sdk-58` then pinned explicitly for generation |

The [Expo SDK58 reference](https://docs.expo.dev/versions/v58.0.0/) specifies iOS16.4+ and Xcode26.4+. This machine's Xcode26.3 is below that requirement. Provide a compatible Mac/Xcode26.4+ environment with completed owner-managed setup, a compatible installed iOS runtime and a disposable iPhone simulator. Check [Apple's Xcode/macOS matrix](https://developer.apple.com/xcode/system-requirements) before provisioning: newer Xcode versions may also require a newer macOS than this machine. No Xcode/macOS/runtime upgrade or system gem repair was attempted.

**Unexpected tool intervention:** sandboxed simulator discovery failed with CoreSimulator/log permission errors. Retrying the two read-only list commands outside the sandbox caused Xcode to print `Install Started`. One returned `Install Succeeded` and empty runtimes; the other printed `Authorization is required to install the packages` and returned an empty device group. An attempted interrupt found no matching simctl process. The installed component identity and extent of system changes were not established. No installer, runtime download, account login or system-setting change was explicitly requested. This automatic initialization means this pilot cannot claim zero tool-induced environment changes; an owner should review Xcode setup before further native work.

## Reproduce generated-source verification

Start from a checkout of this change. Keep the original root `ios/` and independent backup untouched. Commands below run only in the isolated app. Select its existing pinned Node/npm first (`nvm use` when available); never import a legacy `.env` or run root Expo/EAS scripts.

```sh
cd modernization/expo-next
nvm use
node --version                          # v22.23.4
npm --version                           # 10.9.9
npm ci
CI=1 npm run verify
```

The November14 online `verify` result is FAIL at `check:expo`; typecheck, one interaction test and config introspection passed first. Doctor run separately passes19/20 and reports the same patch drift: Expo expected`~58.0.25`, splash`~58.0.14`, status bar`~58.0.5`; found58.0.23/58.0.13/58.0.4. No dependency exclusion, offline fallback, test weakening or upgrade was applied. The subsequent owner-authorized patch fix resolves this drift; these initial failures did not establish a native crash or app-test failure. The original native comparison below describes pre-patch generated sources; the unchanged-tree checker still passes, but a native build/Pods resolution against the updated packages remains unverified.

Run generation only if `ios/` is absent, including no dangling symlink. Existing generated native trees are protected; inspect them instead of rerunning this command. This Python guard is the portable equivalent of the executed machine-path guard:

```sh
EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 CI=1 python3 - <<'PY'
from pathlib import Path
import subprocess
root = Path.cwd().resolve()
assert root.name == 'expo-next' and root.parent.name == 'modernization'
assert not (root / 'ios').exists() and not (root / 'ios').is_symlink(), 'Existing tree is protected'
raise SystemExit(subprocess.run([
    'node', 'node_modules/expo/bin/cli', 'prebuild', '--platform', 'ios',
    '--no-clean', '--no-install', '--template', 'expo-template-bare-minimum@58.0.34',
    '--skip-dependency-update', 'expo,expo-splash-screen,expo-status-bar,react,react-native',
], cwd=root).returncode)
PY
node scripts/check-native-ios.cjs
```

Generation and checker both exit0 locally. `--no-clean` is confirmed by the installed CLI's `prebuild --help`; no `--clean` is used. `--no-install` skips both npm and Pods. See [Expo CNG guidance](https://docs.expo.dev/workflow/continuous-native-generation/). The resolved template integrity is `sha512-FzLiY5fioXLogiAMkzeEH1pYDYjcTumDRS9oOX+v89nY0lRCKGZyB3r9PEPpSKpsoD9IFTn3TQ6WWptH0Z+bvA==`. Native sources are ignored and uncommitted; a fresh checkout must generate them. No Pods/workspace or binary exists from this run. Generation reported package.json unchanged and a harmless explicit-orientation precedence notice.

The standalone macOS checker reads only the contained generated project/plists/catalogs, checks Debug and Release source settings, linked resources, empty entitlements/capabilities and expected identity/security intent. Exit0 means generated-source PASS; exit1 means mismatch/malformed output; exit2 means missing macOS/native prerequisites. It does not invoke Xcode, prebuild, Pods, network, dotenv or a simulator. It is intentionally separate from cross-platform `npm run verify` because CI has no native tree. No new dependency or CI change was needed.

## Native comparison

Comparison sources are the [02A inventory](ios-native-inventory.md), [02B baseline](expo-next-baseline.md), generated `ios/kyrshasApp.xcodeproj/project.pbxproj`, `kyrshasApp/Info.plist`, `Supporting/Expo.plist`, entitlements and linked asset catalogs/storyboard. Confidence below concerns generated source only. Effective Xcode settings retrieval failed; no binary metadata was read.

| Setting | Classification | Generated evidence / comparison and confidence |
|---|---|---|
| Device family | MATCH | Debug/Release `TARGETED_DEVICE_FAMILY=1`; matches original native and approved iPhone baseline. High; iPad compatibility behavior NOT RUN. |
| Bundle identity | MATCH | Both targets`com.dvale1994.kyrshasapp`; plist references`$(PRODUCT_BUNDLE_IDENTIFIER)`. High for source; installed continuity unverified. |
| Display-name source | MATCH | Plist`kyrsha's App`; no generated target display-name override. Matches provisional baseline. High for source. |
| Production/effective display name | UNRESOLVED | Historical target override differs; no built plist or installed label. Owner still chooses production authority. |
| Version/build | MATCH | Plist1.0.0/build1; target CURRENT_PROJECT_VERSION1 and MARKETING_VERSION1.0. Matches provisional baseline and preserves recorded target/plist distinction. High for source. |
| Production version authority | UNRESOLVED | Highest distributed build and effective binary values not verified; no release decision. |
| URL scheme | MATCH | Plist contains identity-derived scheme (generated twice); shared Xcode scheme`kyrshasApp.xcscheme` exists. High for source; URL handling/delegate runtime NOT RUN. |
| Orientation/style | INTENTIONAL DIFFERENCE | Portrait only/Light; matches 02B, differs from legacy phone upside-down and tablet orientations. High for plist; actual rotation NOT RUN. |
| ATS | INTENTIONAL DIFFERENCE | Arbitrary loads=false, local networking=false, no exception domains. Matches secure 02B; differs from broad legacy exemption. High for source; debug Metro transport NOT RUN. No policy weakened. |
| Updates | MATCH | Expo.plist EXUpdatesEnabled=false; no OTA service enabled. High for source. |
| Entitlements/capabilities | MATCH | Empty entitlements in both target references, no project SystemCapabilities; no usage-description/background keys in generated app plist. Matches inspected legacy absence. High locally; account/deployed entitlements unverified. |
| Minimum OS/toolchain | INTENTIONAL DIFFERENCE | Target/project deployment16.4 vs legacy13.0; SDK58 supported default. High for source. Xcode26.3 below published26.4 requirement; native execution BLOCKED. |
| Bootstrap | INTENTIONAL DIFFERENCE | Generated Swift AppDelegate and SceneDelegate linked as sources; scene manifest names SceneDelegate. Uses new template, no legacy native code copied. Runtime hook/linking parity UNRESOLVED. |
| Icon resources | UNRESOLVED | Linked AppIcon catalog has generated1024×1024 PNG from configured200×200 tracked source. This is generated scaling, not new approved high-resolution art. Native legacy1024 source differs; production authority and appearance remain unresolved. High for file/dimensions, no visual claim. |
| Splash resources | UNRESOLVED | Linked SplashScreen.storyboard references SplashScreenLogo; generated100/200/300px square images at1x/2x/3x, `scaleAspectFit`, background#38761d. Configured portrait splash is the input; native legacy source differs. High for generated resources; launch appearance/artwork approval NOT RUN. |
| Effective Xcode/binary metadata | UNRESOLVED | `xcodebuild -showBuildSettings` exit64: no destinations for scheme/action build. No settings/build/install/launch pass inferred from source validation. |

## Native execution procedure — NOT RUN here

After the owner provides a supported toolchain/runtime and healthy contained Pods tooling, use a **new disposable simulator**, since this app shares the legacy bundle ID. Never install over a real existing app or erase an existing simulator. The commands below are a proposed reproduction procedure, not executed build evidence. Resolve actual device-type/runtime identifiers from `simctl list devicetypes` and `simctl list runtimes -j`; ensure that runtime supports the deployment target and chosen Xcode.

```sh
# Still inside modernization/expo-next, with pinned Node/npm and safe environment.
export EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1
pod install --project-directory=ios
# Set these two values from available local inventory; no runtime download here.
task_simulator_id=$(xcrun simctl create kyrshas-issue7-validation "$IPHONE_DEVICE_TYPE_ID" "$IOS_RUNTIME_ID")
xcrun simctl boot "$task_simulator_id"
xcrun simctl bootstatus "$task_simulator_id" -b
xcodebuild -workspace ios/kyrshasApp.xcworkspace -scheme kyrshasApp \
  -configuration Debug -sdk iphonesimulator -destination "id=$task_simulator_id" \
  -derivedDataPath /private/tmp/kyrshas-issue7-derived \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build
xcrun simctl install "$task_simulator_id" /private/tmp/kyrshas-issue7-derived/Build/Products/Debug-iphonesimulator/kyrshasApp.app
```

Start the isolated Metro server with `node node_modules/expo/bin/cli start --localhost`, then in another terminal with the same safe environment run `xcrun simctl launch "$task_simulator_id" com.dvale1994.kyrshasapp`. Use Simulator UI to inspect/tap the synthetic app; do not claim launch-process success proves rendering. If local debug transport is denied by ATS, record the exact denial and stop before any policy change. Debug-only loopback transport and production ATS are separate decisions; no local networking exemption is authorized here. A bundled Debug alternative would require confirming template bundle resolution as well as bundling; no untested fallback is claimed.

After a real build, inspect selected built plist fields (bundle ID, display name, version/build, device family, orientations and ATS), record Xcode/SDK/runtime/device/build identifiers and compare with source. Keep logs/results/build products outside Git. Screenshots may show only synthetic content and sanitized simulator UI, never private desktop/device data. Do not distribute the app or perform signing/account/release actions.

## Device smoke checklist

All cases below are **NOT RUN** locally; build/install/launch are **BLOCKED** by the preflight gates. Component-test results are separate evidence.

- [ ] Record new simulator UUID, iPhone model, OS/runtime, Xcode/SDK and Debug build identifier; confirm no pre-existing app/data is targeted.
- [ ] Build and install without signing, launch, wait for rendered content and inspect native crash/error diagnostics.
- [ ] Observe “Offline demo · synthetic content” and “How many sides does a triangle have?”; no live provider/credentials.
- [ ] Initial answer hidden; tap Show Answer → “Three sides.”; tap Hide Answer → hidden again.
- [ ] Rotate to landscape and back; verify portrait intent and usable content on the tested phone. iPhone-only targeting does not prove iPad compatibility-mode behavior.
- [ ] Terminate only this synthetic process, relaunch, verify question and initially hidden answer; record lack/presence of crash.
- [ ] Record observable installed name/bundle/version/build. Compare built plist; do not turn provisional values into production approval.
- [ ] Observe Home Screen icon and cold-launch splash, capture safe evidence if possible; artwork approval and legacy visual parity remain separate.

## Ordered future migration slices — proposals only

1. Resolve the native environment and recommended SDK patch drift, rerun this checklist, and choose authoritative production name/version/artwork separately. Preserve original native/backup state throughout.
2. Port bootstrap, one route and card layout with synthetic data. Preserve route title, stable IDs, quote/trivia/fact/joke/bucket-list order and attribution; test scrolling, empty content and image failure on iPhone.
3. Port trivia visibility and per-card refresh using deterministic success/rejection/malformed/timeout fixtures. Test independent spinners, hide/show/reset semantics and unrelated-card preservation against existing behavior. Specify any failure-behavior change before implementing it.
4. Port initial orchestration and splash completion against synthetic success/empty/partial failure/offline fixtures. Preserve ordering and define approved behavior when a request rejects; do not inherit a permanent splash accidentally.
5. Port October3/non-birthday branches with a controlled clock and synthetic image fixtures; preserve personalized originals without copying them into tests/reports. Compare birthday-first ordering and other-day absence.
6. Integrate a provider only after owner-controlled legacy credential revocation/rotation and separately approved server-side/security contract. Test sanitized transport/error shapes, rate limits and refresh failures; never embed replacement client secrets.
7. Separately specify installed-state/upgrade continuity, URL/native-hook behavior and device compatibility; verify real persistent state before any model change. Signing, accounts, deployment and releases require separate authorization after those gates.

No feature migration, credential remediation, native replacement, merge, release or spec archive is performed by this pilot.

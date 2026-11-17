# Local iPhone development loop — pilot 03A

November 16, 2026 (America/New_York). [Issue #9](https://github.com/dvale94/kyrshas-app/issues/9), following merged PR #8/main08406d6. Specification: [ios-local-development-loop](../../openspec/changes/ios-local-development-loop/proposal.md). Detailed command/intervention evidence: [issue report](../../.agentic/reports/issue-9-dev-loop.md).

**Live Metro feedback: BLOCKED by existing native ATS; security approval required. Embedded Debug fallback: PASS.** No native security permission, app identity, signing, trust store or generated native project was changed. A host-served bundle is not a simulator refresh pass.

## Observed diagnosis

| Layer | Actual result |
|---|---|
| Environment | macOS27.2.1/build26B131 arm64; Xcode27.2/build27B52, active full Xcode; existing iOS27.2/build24B8117 runtime; Node22.23.4/npm10.9.9 explicitly selected; Homebrew Ruby4.0.9/CocoaPods1.17.0, version/env without ffi warning |
| Existing test phone | Reused pilot02C iPhone17 UUID2579B852-10AA-47D1-A556-736E20487A0F, already booted; matched synthetic ID/name/version and recorded native UUID before use. No new simulator, erase or real app replacement |
| Committed Expo policy | app.json explicitly sets arbitrary loads=false and local networking=false; existing introspection check confirms intended policy |
| Effective Debug/Release settings | Both point at kyrshasApp/Info.plist; INFOPLIST_PREPROCESS=NO, GENERATE_INFOPLIST_FILE=NO, no ATS override keys. No separate Debug policy currently exists |
| Actual processed plists | Both unsigned simulator configurations built successfully from an external copy of the existing native project. Both processed plists contain exactly the strict false/false dictionary and expected simulator identity. These are actual build outputs, not only introspection |
| Metro server | Watch mode enabled with CI unset, loopback8081; /status returns packager-status:running. Native iOS bundle response contains the temporary edited caption marker (3,952,596 bytes in recorded response) |
| Native transport | App logs report NSURLErrorDomain -1022 for http://localhost:8081/status and http://127.0.0.1:8081/status. Host availability therefore does not resolve native rejection |
| IPv6 probe | Ephemeral [::1]:8081 launch argument tested; no successful live feedback or IPv6-specific ATS endpoint was established. Do not infer an address workaround from this inconclusive probe |
| Actual edit/refresh attempt | Caption temporarily changed to “Offline demo · Metro probe 03A”; original tested binary UUID remained0C8FE3A1-BE6F-30B7-9CEB-839CD0426278. Native marker XCTest failed/exit65; screenshot shows the old embedded “Offline demo · synthetic content” caption. Interactive Metro r reload was also attempted; no edited marker observed. Source restored exactly |
| Fallback verification | Guarded embed helper exported restored synthetic source only into temporary Debug.app, then installed on the known synthetic phone. Unchanged pilot02C XCTest PASS:1 test/0 failures,16.675s; rendering/show/hide/portrait/relaunch |

The failure originates in the **effective native ATS policy used by the Debug app**, sourced from the shared generated plist and committed strict Expo config. It is not evidence of a stopped server or an incorrect localhost port: host status/bundling succeeds, while actual native requests are denied before loading. Numeric IPv4 did not fix it. Release uses the same strict policy and remains strict in the built artifact.

Apple documents [NSAllowsLocalNetworking and current IP-address behavior](https://developer.apple.com/documentation/bundleresources/information-property-list/nsapptransportsecurity/nsallowslocalnetworking) and [domain-specific exceptions](https://developer.apple.com/documentation/bundleresources/information-property-list/nsapptransportsecurity/nsexceptiondomains). Older guidance about implicit IP exemptions must not be assumed to apply to iOS27. The recorded error/processed plist is the decisive local evidence.

## Options and tradeoffs

| Option | Assessment under current authorization |
|---|---|
| Supported Expo/Metro development mode | Start Metro with CI unset, --localhost, dotenv/telemetry disabled. Actual native app still enforces its own plist. Expo CLI's default “Using Expo Go” launch label does not mean our independently launched synthetic binary is Expo Go |
| Install expo-dev-client / use Expo Go | A different client/runtime or added native dependency is not a repair of this app's ATS. No install, login or runtime substitution performed; does not prove the current binary's loop |
| Debug-only localhost exception | Narrow practical proposal below, unapplied. Permits localhost HTTP in Debug only, including all localhost ports because ATS domains do not restrict a single port. No LAN hosts, global arbitrary loads or Release exception proposed |
| Local HTTPS | [Expo CLI documents --https as web-only/deprecated](https://docs.expo.dev/more/expo-cli/). The [local HTTPS guide](https://docs.expo.dev/guides/local-https-development/) describes a web proxy and CA installation; it does not establish native Metro/WebSocket interoperability. Native TLS trust/certificates and refresh would need separate validation. No CA, private key, trust change, TLS bypass or external tunnel was provisioned |
| Embedded Debug JavaScript | Working baseline, reverified below. Requires export and simulator reinstallation; **not** Metro refresh/Fast Refresh and does not satisfy a live edit loop |

## Reproduce unchanged-policy checks

All commands run only inside the isolated scaffold. Select its existing pinned Node/npm; do not run root Expo/EAS scripts or import legacy dotenv. Native commands target only the known synthetic simulator or a separately verified disposable one. The original root ios/ and backup must remain untouched.

```sh
cd modernization/expo-next
nvm use
npm ci
CI=1 npm run verify
node scripts/check-native-ios.cjs
# Development server: CI=1 disables watching/Fast Refresh. Keep it unset here.
env -u CI EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 npm start -- --localhost --port 8081
```

For diagnosis, edit only the synthetic caption to the marker in MetroProbeTests.swift, then confirm the host's native bundle contains it. From another terminal, with Metro running, launch the verified synthetic app with an ephemeral RCT_jsLocation argument:

```sh
xcrun simctl launch "$task_simulator_id" com.dvale1994.kyrshasapp \
  -RCT_jsLocation localhost:8081
# Press r in Metro's actual interactive terminal; redirected non-TTY logging
# does not provide the same keyboard controls.
```

`MetroProbeTests.swift` is an explicit native live-loop acceptance test, **not part of the passing embedded smoke or cross-platform npm verify**. It requires the temporary marker and Metro setup. Generate an external runner using the existing helper, replace only the external copied test source with scripts/ios-smoke/MetroProbeTests.swift, then run xcodebuild test with signing disabled. This run exits65 under current policy and retains the real screenshot; do not weaken its assertion or report it as PASS. Restore the caption before other verification or delivery.

The new read-only policy checker accepts two independently processed plists:

```sh
node scripts/check-development-policy.cjs \
  "$task_evidence/derived/Build/Products/Debug-iphonesimulator/kyrshasApp.app/Info.plist" \
  "$task_evidence/derived/Build/Products/Release-iphonesimulator/kyrshasApp.app/Info.plist"
```

It rejects policy drift in either configuration, unexpected identity/platform, missing policy and accidental reuse of the same input path. Its14 cross-platform fixtures run at the end of npm run verify, preserving all earlier stages. A caller still needs actual Xcode build provenance; two arbitrarily named plist files alone do not certify Debug/Release origins. This pilot built both configurations from a byte-preserving external copy of the existing project, with the matching tracked scaffold/assets and existing dependencies; no native generation/clean command was used.

## Reproduce the embedded fallback

Use an existing unsigned Debug simulator build in an external temporary directory. Existing [native validation commands](expo-next-native-validation.md#reproduce-the-passing-bundled-debug-validation) describe the build and standalone smoke runner; reuse a verified synthetic phone instead of creating another by default. Keep generated outputs out of Git.

```sh
# Stop Metro first. task_app must be an existing temporary Debug-iphonesimulator/*.app.
node scripts/embed-ios-debug.cjs "$task_app"
xcrun simctl install "$task_simulator_id" "$task_app"
xcrun simctl launch "$task_simulator_id" com.dvale1994.kyrshasapp
# Run the existing external XCTest runner/SmokeTests.swift, not MetroProbeTests.swift.
```

The helper refuses repository/native output, non-temporary destinations, Release/physical-device output and unexpected identity/policy. It disables dotenv/telemetry, removes inherited EXPO_PUBLIC_/EAS_ variables from its child and bundles only the isolated source. It does not install, launch, alter a native project, or grant transport permission. Expected repository/Release destination refusals and actual valid export were executed successfully. This is a fallback packaging loop, not native Fast Refresh.

## Approval request — inert preview, not applied

**Requested owner decision:** authorize only a Debug localhost insecure-HTTP domain exception for this synthetic scaffold, while retaining the current strict default/Release policy and all native preservation boundaries. No NSAllowsArbitraryLoads=true, broad NSAllowsLocalNetworking=true, LAN/IP exemption, trust installation or identity change is proposed. ATS cannot restrict this domain exception to8081; Debug localhost HTTP on other ports would also be allowed. Approval permits a narrowly scoped implementation and retest, not a promise of Fast Refresh success before observation.

Proposed generated-native diff (documentation only):

```diff
 # App target Debug configuration only
- INFOPLIST_FILE = kyrshasApp/Info.plist;
+ INFOPLIST_FILE = kyrshasApp/Info.Debug.plist;
 # Release remains: INFOPLIST_FILE = kyrshasApp/Info.plist;

 # NEW Info.Debug.plist: derive all fields from the strict base; only ATS delta:
 NSAppTransportSecurity = {
   NSAllowsArbitraryLoads = false;
   NSAllowsLocalNetworking = false;
+  NSExceptionDomains = {
+    localhost = {
+      NSExceptionAllowsInsecureHTTPLoads = true;
+      NSIncludesSubdomains = false;
+    };
+  };
 };
```

Source-of-truth plan after approval: add a committed isolated config plugin/shared transformation and an explicit dry-run/apply synchronizer. The plugin would recreate the dedicated Debug plist/reference during future separately authorized generation; the synchronizer would make only that new file and one Debug build-setting change in the **existing** generated project, guarded against native drift/symlinks. Register the plugin in isolated app.json while leaving its default ios.infoPlist strict. No automatic prebuild or regeneration of the protected tree. Neither plugin, synchronizer, Debug plist nor project-policy patch exists in this PR.

Proof required after approval, before a live-loop PASS:

1. Inspect dry-run scope: only dedicated Debug file/reference and committed source-of-truth tooling; no Release/global ATS override. Default config and strict Release fixture checks remain intact; add explicit tests for exactly the reviewed Debug profile rather than relaxing defaults.
2. Build unsigned Debug and Release simulator artifacts. Assert Release ATS exactly false/false, no NSExceptionDomains, no arbitrary web/media exemptions; assert Debug has only localhost insecure HTTP, with no subdomains/LAN/IP/broad allowance. Prove distinct plist references and no Release path to the Debug file.
3. Launch the actual Debug app against localhost Metro, edit the harmless caption, refresh and observe it on the same simulator binary without reinstallation/native rebuild. Restore the probe, rerun existing checks and native smoke.
4. Recheck legacy/native preservation and scoped generated changes; retain failures and actual binary metadata. No signed or production release is involved.

Rollback after an approved implementation: remove only the dedicated Debug reference/file and its committed plugin/registration/tooling changes using drift-checked edits; restore the Debug pointer to its original base path. Verify both processed configurations are strict again and the embedded fallback still passes. Do not reset entire native projects, owner files, simulator data or backups.

## Evidence and remaining gates

Local artifacts: /private/tmp/kyrshas-issue9-20261116/ (build-input copy, unsigned Debug/Release DerivedData, effective settings, Metro host/native ATS logs, negative marker XCTest/screenshot, passing fallback XCTest and verification logs). Temporary artifacts may expire; source/tests/docs provide reproduction. No Pods, app binary, private image, credentials or backup uploaded.

Full local verify passed: TypeScript,1 component test, config/introspection, online package compatibility, Doctor20/20 and14 policy fixtures. Native source check/harness/strict-spec/preservation and hosted results are finalized in the issue report. Hosted CI cannot certify a native refresh. The owner security decision is pending; no production policy weakening, live provider call, signing/account, merge, deployment, release or OpenSpec archive occurred.

# Issue #11 — Pilot 03B home/card UI delivery

November 17, 2026 (America/New_York). Issue retrieved directly by GitHub connector (`fetch_issue`, issue_number11, dvale94/kyrshas-app); comments empty. [Approved issue](https://github.com/dvale94/kyrshas-app/issues/11). Fetched main equals HEAD/origin/main at kickoff, `abcf6692e3e984b0ec45f6d286586533565f99b1`; PR10 independently confirmed merged. Dedicated branch `pilot/03b-home-card-ui`. No matching open PR existed before delivery.

**Functional/native PASS; aggregate verification FAIL on existing dependency patch recommendations.** The scoped UI is implemented and native acceptance completed. This is a draft delivery with an explicit compatibility gate, not an all-green merge/release recommendation. Issue11 permits explained failures without weakening guards; dependency repair is not silently folded into the presentation migration.

## Approved scope and delivered files

The initiating request and issue approve specifying, implementing, testing, troubleshooting, disposable-simulator acceptance and one draft PR. Followed AGENTS.md, deliver-feature, OpenSpec proposal/apply and verify-delivery workflows. `home-card-ui-migration` proposal/design/home-feed scenarios/tasks passed strict validation before product edits. No archive or main-spec synchronization.

- `modernization/expo-next/App.tsx` delegates to typed `src/home/` presentation: HomeScreen, ContentCard, CardText, ImagePlaceholder and fixtures.
- Five stable legacy IDs/order: quote, trivia, fact, dad joke, bucket list item. Two local deterministic variants each, fictional attribution and authored geometric image placeholders. No provider URL, data URI, clock/randomness, private assets, credentials, storage or content request.
- Card-local refresh delays650ms, disables duplicates, displays busy, advances only on success, preserves other cards and clears busy in finally. Failure retains content/answer with a generic retryable error. Successful trivia refresh hides the old answer. No provider/state framework introduced.
- Existing component suite expanded from1 to17 tests, retaining baseline triangle initial/show/hide coverage and adding card order/IDs, conditional image/author, empty/long content, overlapping refresh/isolation, duplicate prevention, rotation/wrap, failure/retry and fetch/XHR guards.
- Standalone `scripts/ios-smoke/SmokeTests.swift` now tests the five-card feed, actual scrolling, quote/trivia refresh, both answer variants, portrait and relaunch. Existing app native project is never a UI-test host or regenerated.
- Migration guide, this report, handoff and unarchived OpenSpec record evidence. No package/config/lock/plugin/security/CI changes.

## Legacy contract and intentional differences

[Migration comparison table](../../docs/migration/expo-next-home-ui.md) and OpenSpec design cite the inspected normal-day sources: root App.js; HomeScreen.js, ContentContainer.js, TextContainer.js, useHomescreen.js; ApiProvider.js. Green#38761d/white title, #eff3f4 feed,10px margins,2px separators, uppercase headings, image-backed quote/fact/bucket list, text-only trivia/joke and optional attribution are preserved. October3 birthday-first branch is observed but intentionally deferred to03E; no private birthday data/images were read into fixtures or copied to output.

Deliberate bounded differences: local geometric art instead of provider payloads, growing overlays/minimum image heights instead of fixed-height/absolute text clipping,48px minimum controls, explicit synthetic caption, no fragile data-dependent splash block, safe error completion, new question resets its answer. Five mounted ScrollView children preserve offscreen local state. Title scrolls with feed using UIKit automatic insets; the legacy navigator kept its title fixed. This avoids a trial sticky title intersecting the status bar and avoids deprecated SafeAreaView/new native dependencies. No navigation expansion or production artwork authority is claimed.

Legacy runtime/pixel parity is NOT RUN: the old runtime would involve unsafe provider/private-content boundaries. The comparison is against observed code. Locally inspected migrated screenshots show readable initial quote/attribution, correct text-panel and image-backed variants, both matching trivia answers and final bucket-list card. UIKit scroll-edge blur and transient development refresh/status chrome were observable; production launch/visual authority remains unvalidated.

## Actual command outcomes

Pinned Node22.23.4/npm10.9.9 selected explicitly, dotenv/telemetry disabled. Build/Metro commands were run only inside the isolated app or its external copy, never the legacy root.

| Outcome | Command/evidence | Actual result and limit |
|---|---|---|
| PASS | Fresh external `npm ci --cache <external-cache>` |990 packages in10s, exit0, unchanged package-lock. Initial restricted-network attempt stalled and was interrupted; retry used authorized network access. No workspace node_modules cleanup. Existing deprecation notices retained. |
| PASS | `npm run typecheck`, `npm test` | Final fresh-install verification runs TypeScript and17/17 component tests successfully. Initial Jest run failed because XMLHttpRequest is absent in jest-expo; corrected the sentinel setup, not product behavior/assertions. |
| PASS | `npm run check:config` | Strict config/introspection, iPhone/portrait/light identity/preservation mapping. No native/runtime inference from this check. |
| FAIL | Full `CI=1 npm run verify`, both workspace and clean external install | Stops at online `expo install --check`: expo58.0.25 vs expected~58.0.26; jest-expo58.0.14 vs~58.0.15. Final delivery log retains the failure. No version update/exclusion/check weakening. |
| FAIL | Separate `npm run doctor` |19/20; same two patch mismatches, no additional failed check. Since aggregate verify short-circuits, Doctor is independent evidence. |
| PASS | Separate `node --test scripts/check-development-policy.test.cjs` |38/38 policy/synchronizer fixtures,0 failures; also executed against fresh installed dependencies. These do not become an aggregate verify pass. |
| PASS | `node scripts/check-native-ios.cjs`; `node scripts/sync-ios-debug-policy.cjs --check` | Existing source/resources/schemes/identity and exact Debug/Release policy pass; synchronizer reports no drift and performs no apply. |
| PASS | Unsigned external Debug and separate Release xcodebuild | Both build configurations exit0; no clean, prebuild, Pods install, signing or original-native writes. Release refreshed after final JS/layout edits. |
| PASS | `node scripts/check-development-policy.cjs <Debug.app/Info.plist> <Release.app/Info.plist>` | Actual distinct processed plists pass exact approved Debug localhost dictionary and strict Release false/false. iPhoneSimulator identity/family/version preserved. |
| PASS | Native standalone XCTest (delivery run) |1 test/0 failures,25.004s, exit0; actual five-card rendering/scroll/refresh/answers/portrait/relaunch over localhost Metro. Separate from Jest and hosted checks. |
| PASS | `python3 scripts/doctor.py`; redirected-cache `python3 -m py_compile scripts/doctor.py` | Starter harness and Python syntax only. Harness explicitly does not certify application behavior. |
| PASS | `openspec validate home-card-ui-migration --strict`; `openspec validate --all --strict` | Active change valid; all4 changes pass. Historical owner duplicate-file failure is not reproduced; no prior change files edited. |
| PASS | `git diff --check` / staged whitespace, allowlist/hash checks | Source/config/lock/security/native/owner preservation checked separately below. |
| NOT RUN | Legacy/live API/private birthday/physical device/release runtime/installed-upgrade | Excluded from scope; no credential use or private fixtures. |

## Native execution provenance

macOS27.2.1 environment, Xcode27.2/build27B52, iOS27.2 runtime, SDK iphonesimulator27.2. Created new disposable iPhone17 `A07429D0-371B-4E7C-9FA0-7999795FEEFB`; no existing simulator was erased or installed over. Standalone runner generated externally with existing Homebrew Ruby4.0.9/CocoaPods1.17.0_1 xcodeproj gem; no dependency installation.

External build inputs copied only the isolated scaffold/existing modern ios tree and public icon/splash inputs, excluding dotenv. Existing dependencies reused for native build. Clean npm verification uses a separate fresh copy. Build outputs, screenshot/xcresult/logs and fingerprints remain outside Git under `/private/tmp/kyrshas-issue11-20261117/`.

Executed build shape (Debug then separate Release, never concurrently against the same build database):

```sh
xcodebuild -workspace ios/kyrshasApp.xcworkspace -scheme kyrshasApp \
  -configuration Debug -sdk iphonesimulator \
  -destination id=A07429D0-371B-4E7C-9FA0-7999795FEEFB \
  -derivedDataPath /private/tmp/kyrshas-issue11-20261117/derived -jobs 4 \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build
```

Build environment additionally set `EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 CI=1 RCT_NO_LAUNCH_PACKAGER=1`. Only the verified Debug.app was installed on the new phone. Its metadata: com.dvale1994.kyrshasapp, kyrsha's App,1.0.0/build1, family1, portrait; executable UUID `BB44FCF0-6B38-307F-B3A5-1D1AEF8D50A2`, SHA256 `ca2c1dca12f5525b1de36c6cc9fa615b79b845a254bb2add758143a209f692e2`. No embedded main.jsbundle: native UI therefore depends on the actual approved Metro loop.

Started interactive `env -u CI ... npm start -- --localhost --port 8081` with Node22 and dotenv/telemetry disabled. XCTest launches that installed app with `-RCT_jsLocation localhost:8081`. Expo CLI's “Using Expo Go” message is not the independently installed app identity. No native app rebuild/reinstall was used for source UI repairs. Metro stopped after validation; restart it before app relaunch.

Native attempts retained:

1. `native-smoke.xcresult`: FAIL1/1,7.081s. Static attribution was visibly present in screenshot but its isHittable query failed; use accessibility presence for noninteractive text and visual inspection. Original functional assertions retained.
2. `native-smoke-second.xcresult`: PASS1/0,25.787s. Screenshot review found title pinning under status bar; removed pinning, documented scrolling title.
3. `native-smoke-final.xcresult`: FAIL1/1,16.760s. Screenshot captures Metro blue Refreshing overlay during answer interaction. This overlapped final external Release build activity with shared dependency inputs; interference is an inference, not a proven causal trace.
4. `native-smoke-delivery.xcresult`: PASS1/0,25.004s after all builds finished and without source/build activity during acceptance. Eight screenshots exported locally to delivery-attachments and inspected for first/final layout and readability.

Actual assertions cover initial first card/synthetic label/attribution, quote variant change, trivia initial hidden/show/hide, refresh to square question with hidden answer then correct reveal, final-card scrolling, portrait after landscape request and process relaunch restoring initial fixtures/hidden answer/foreground state. Hosted workflows do not execute these assertions.

## Preservation and independent assessment

Pre-build fingerprints outside Git record every native path/type/file SHA256/mode or symlink target: legacy20,437 entries and modern30,193. After builds/simulator acceptance, every entry matches with0 additions/deletions/changes. Historical legacy workspace UI-state file remains untouched/unrestored. Both ios trees remain ignored with0 Git-tracked entries; no native project file is committed. Independent backup was neither accessed nor written; no new backup restore/re-fingerprint claim.

Kickoff worktree/index were clean, unlike historical pilot runs with staged owner files. All existing tracked bytes outside the three approved modern source/test paths and handoff remain identical, including root legacy feature/config/lock, tsconfig, modern package/config/lock, policies/plugins, CI and old OpenSpec artifacts. New files are limited to the approved presentation/planning/docs/report paths. No reset, stash, clean, native generation, credential import, signing/account/trust/ATS/EAS/version change or installed user-data operation.

Independent verify-delivery phase compares scenario coverage, actual final source/test diff and screenshots. Functional/native acceptance PASS; aggregate gate FAIL due online patch recommendations. Gortex supplies graph-grounded localization/impact and guarded edits; staged detection is needed to include newly added files. Tests map5/6 principal symbols to component/native tests; HomeScreen's indirect App rendering is under-resolved. Guards has no rules configured. Earlier contract WARN/high lower-bound included the long linear native smoke method; final focused contract returns ALLOW (score0, medium/lower-bound graph confidence) after the full staged diff review. No unreviewed product fanout or syntax/type failure is found. Graph limits and the extraction suggestion are disclosed, not represented as test passes; actual native/Jest/config checks are independent evidence.

## Delivery and workflow metrics

Delivered one [draft PR#12](https://github.com/dvale94/kyrshas-app/pull/12) against main, unmerged. Implementation commit `8a44902484ba8dcb25ea4e6d0a0cbd592268e009`,16 scoped files. Independent hosted [harness CI PASS](https://github.com/dvale94/kyrshas-app/actions/runs/44209702799) and [Expo CI FAIL](https://github.com/dvale94/kyrshas-app/actions/runs/44209702879) are tied to this code commit (GitHub tested its synthetic PR merge d03501a). Expo job134484625131 installed994 packages on Linux, passed TypeScript17/17 Jest/config, then exited1 at the same two online compatibility recommendations. Hosted Doctor/policy tail were NOT RUN because verify short-circuited; their local standalone outcomes are reported separately. No hosted native run is claimed. Final follow-up changes only docs/task evidence; source/tests/config remain identical to this verified implementation. Final-head hosted status is also recorded in the PR when available.

- Direct issue-number retrieval: yes; PR10 merged-state and duplicate-PR lookup also direct from GitHub.
- OpenSpec gate: strict PASS before product edits;6 tracked tasks, completion evidence updated as executed, unarchived.
- Follow-up human scope decisions / clarification prompts:0 /0. No new owner approval required within issue11 scope.
- Environment permission escalations:35 total, all automatically approved,0 automatic review rejections. Counts are require_escalated invocations, including the final evidence commit/push: Git8 (fetch, branch, staging2, scoped commits2, pushes2); simulator5 (inventory, create, boot, install, diagnostic screenshot); toolchain/build7 (Xcode version, app Debug1/Release3, runner builds2); native smoke4; online verification/install/Metro/process retry8; screenshot export3. Three initial sandbox refusals (fetch, process inventory, attachment export) were recovered; those are not automatic approval-review rejections.
- Autonomous correction iterations:4 (XHR sentinel; attribution query/safe-area warning; sticky-title placement; Metro/build interference retry). No known-bug port or weakened guard.
- Native smoke attempts:4,2 failed/2 passed, final25.004s. App Debug build1, Release builds3 (initial and final-source refreshes); UI runner builds2. Clean-install retry1 after restricted-network stall; screenshot-export permission retry1.
- Additional human handholding: none. No subagents, paid services, provider calls, merges, deployments, releases or OpenSpec archive.

## Subsequent slices

Resolve existing SDK patch recommendations under separately scoped dependency approval; preserve exact-policy gates. Then03C owns provider/state orchestration,03D image/content edge refinements,03E date-injected birthday with separately authorized assets,03F server/provider security after owner key revocation,03G production artwork/launch/release decisions. Current local synthetic UI is not authorization for any of those actions.

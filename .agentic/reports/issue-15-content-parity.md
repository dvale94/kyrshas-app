# Issue #15 — Pilot 03D synthetic content presentation

November 17, 2026 (America/New_York). [Issue #15](https://github.com/dvale94/kyrshas-app/issues/15) and comments retrieved directly through GitHub connector (no comments). Freshly fetched main `347b6c42315be3a0b0277c87c41d59c3d94682e4`, merged PR #14. Dedicated branch `pilot/03d-content-edge-parity`; owner index/worktree clean at kickoff. [OpenSpec](../../openspec/changes/home-content-edge-parity/proposal.md), [design](../../openspec/changes/home-content-edge-parity/design.md), [migration guide](../../docs/migration/expo-next-content-parity.md).

## Result and scope

Local functional and actual native acceptance PASS. Hosted CI is NOT RUN/pending draft delivery at this report revision and will be recorded independently. Complete proposal/spec/design/tasks strictly validated before source edits. All existing40 Jest cases remain unchanged;22 new meaningful presentation/feedback cases bring the suite to62.

Content-provided headings now render, wrap beside a nonshrinking48px refresh action, and retain canonical category action labels. Panels fit available width; long attribution wraps/right-aligns. Optional local placeholder shapes have one accessible image label with hidden decorative children. White text retains tested contrast on green/dark overlays. Default feed, mock delay and all async provider/normalization/hook behavior remain unchanged. Test-only synthetic fixtures cover short, long, multiline/Unicode/escaped punctuation, optional blank author, long title/prompt/answer, local image/no-image and malformed-media recovery. No generalized media pipeline or real-image parity claim.

Explicit iOS startup/loading announcements are removed. User refresh/retry settles with one useful announcement; repeated immediate errors also work when React batches loading with the identical final state. Provider replacement clears pending intent. Android keeps live-region semantics. Initial Retry hints describe loading; retained-content Retry hints explain preservation. Trivia hints and expanded states remain accessible. Actual auditory VoiceOver review is NOT RUN.

No dependency, lock/config, permissions, native/security/identity/signing, persistent data, original app, backup, live-provider, private/birthday-media or production change. No prebuild/clean/Pods/native regeneration, merge, release, deployment or archive. Final source and clean validation copy match; external edge entry restored byte-for-byte and temporary fixture removed, Metro stopped and disposable phone shut down.

## Verification ledger

| Gate / exact command | Actual outcome |
|---|---|
| `openspec validate home-content-edge-parity --strict` before product edits | PASS, all4 planning artifacts; saved `openspec-before-code.log` |
| Existing Node22.23.4/npm10.9.9, clean external `npm ci --no-audit` | PASS,990 packages; upstream deprecation warnings retained; no lock edit |
| Exact delivery `CI=1 npm run verify` | PASS: TypeScript,62 Jest/3 suites, config/introspection, online Expo compatibility, Doctor20/20,38 policy fixtures; `verify-delivery.log` |
| Earlier complete unchanged verify runs | PASS twice: first61 Jest, then62 after repeated-retry correction; separately retained `verify.log`/`verify-final.log` |
| Retained40 tests | PASS, original files unchanged; independent loading/retry/last-good, overlapping/duplicate requests, obsolete provider/unmount results, trivia identity/reset and offline behavior retained |
| New22 cases | PASS: all category edge fixtures, image/no-image for quote/fact/bucket, optional authors,7 malformed-media shapes and Retry, last-good media failure/revision, startup silence/user outcomes/repeated failures/provider replacement/Android, complete growing text, contrast and48px controls; fetch/XHR traps remain uncalled |
| `node scripts/check-native-ios.cjs` | PASS, native source only; unchanged Debug/Release identity, resources, phone/portrait and ATS |
| `node scripts/sync-ios-debug-policy.cjs --check` | PASS, exact source policy drift check, no mutation |
| `node --test scripts/check-development-policy.test.cjs scripts/ios-debug-policy.test.cjs` | PASS,51 executions/0 failures (13 imported cases repeated); full verify's38 is separate |
| `node scripts/check-development-policy.cjs <prior Debug.app/Info.plist> <prior Release.app/Info.plist>` | PASS, actual separate processed outputs from issue11 patched builds; Debug only approved localhost, default/Release strict; no new application build claimed |
| `python3 scripts/doctor.py`; external-cache `python3 -m py_compile scripts/doctor.py` | PASS; harness explicitly does not establish application behavior |
| `openspec validate --all --strict`; `git diff --check` | PASS,6/6 changes and no whitespace error; no archive |
| Actual normal iPhone XCTest | PASS final1/0,24.352s; baseline first run also PASS1/0,25.869s |
| Actual edge iPhone XCTest, standard text | PASS1/0,17.288s; long image quote/author, long heading/prompt/answer, short no-image fact and image bucket |
| Actual final edge iPhone XCTest, accessibility-medium | PASS1/0,36.639s; same content with larger native typography and bounded direction-aware traversal |
| Preservation / validation parity | PASS, all20,437 legacy and30,193 modern native entries identical; original index preserved before scoped staging, original app/config/assets and all unrelated tracked bytes unchanged; external normal source matches |
| Hosted Expo/harness | NOT RUN/pending PR at this revision; separate hosted ledger added after actual observation |
| Application native rebuild | NOT RUN, unchanged native inputs and previously verified unsigned binary reused; external XCTest runner alone compiled |
| VoiceOver auditory/focus walkthrough, physical device, production artwork/pixels/launch, installed upgrade, real providers, signing/release | NOT RUN; not established by synthetic component/native tests |

## Native provenance, commands and visual observations

New disposable iPhone SE(3rd generation),375×667 logical points/750×1334 screenshot pixels, iOS27.2 build24B8117, UUID `6E92159C-60F3-41F0-9E7F-106D00080D58`. Xcode27.2 build27B52, SDK27.2. No pre-existing app/user data targeted. Reused copied unsigned Debug application from `/private/tmp/kyrshas-issue11-patches-20261117/derived/Build/Products/Debug-iphonesimulator/kyrshasApp.app`, with no embedded JS. Bundle `com.dvale1994.kyrshasapp`, version1.0.0/build1, portrait/Light/family1. Debug dylib UUID `899C03AA-134D-32D6-9B0C-909A333A3F54`, SHA256 `86f7f17f47ede3e76df0ee513039c317cf593303c0d74a7d9e779ec01196628d`; processed Info.plist SHA256 `aebc844ebcaa2cd12d465999b2191b191c4a4e84049dc908a78ae1f01a65d898`. Complete provenance saved externally.

From isolated validation scaffold, start `EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 CI=1 node node_modules/expo/bin/cli start --localhost --port 8081` with pinned Node selected. Generate external runner using `GEM_HOME=/opt/homebrew/opt/cocoapods/libexec /opt/homebrew/opt/ruby/bin/ruby scripts/ios-smoke/create-runner.rb /private/tmp/kyrshas-issue15-20261117/ui-runner`. Run:

```sh
xcodebuild -project /private/tmp/kyrshas-issue15-20261117/ui-runner/KyrshaSmoke.xcodeproj \
  -scheme KyrshaSmoke -configuration Debug -sdk iphonesimulator \
  -destination id=6E92159C-60F3-41F0-9E7F-106D00080D58 \
  -derivedDataPath /private/tmp/kyrshas-issue15-20261117/ui-derived \
  -resultBundlePath <new-external-result.xcresult> -parallel-testing-enabled NO \
  -only-testing:KyrshaSmoke/SmokeTests/testSyntheticIPhoneSmoke \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO test
```

For edge runs select `testSyntheticContentEdges` and use the documented external-only fixture copy/injection. For larger type, `xcrun simctl ui <id> content_size accessibility-medium`; restored to `large` before final normal smoke. Screenshots were exported with `xcrun xcresulttool export attachments --path <result> --output-path <external-dir>` and inspected locally.

Visual review confirms preserved green hierarchy and white attribution, complete story ending/attribution, wrapped heading with separated refresh action, readable long answer ending/Hide control, no-image multiline fact and final image bucket. At accessibility-medium, text grows substantially and remains reachable through scrolling. Collapsing a long answer changes content height; the test navigates back toward targets now above the viewport. No fixed scroll-position/production-pixel equivalence is claimed. A final retry-hint wording refinement followed native acceptance; its initial/retained-content cases are covered by exact-source62-test verification, with no layout/normal-smoke path change.

Six native attempts retained: normal-first PASS25.869s; edge-first FAIL66.376s (Metro fixture resolution); edge-second PASS17.288s; edge-scaled FAIL39.357s (one-direction harness missed fact above viewport after collapse); edge-scaled-final PASS36.639s; normal-final PASS24.352s. Four pass/two fail; failures were not overwritten or reported as passes. App build/reinstall was not needed for source corrections.

## Preservation evidence

All path/type/content entries match initial manifests after shutdown:

| Tree | Entries | SHA256 of sorted manifest, before = after |
|---|---:|---|
| Original `ios/` |20,437| `3678bfbda5b7ef24e3cf370564d14e990d383b1c98540f3bc0f8c0b034bf28b5` |
| Modern ignored `modernization/expo-next/ios/` |30,193| `cb45f1703054e4e015fc5308369e4c57b7869f1db74ecf40764b585d8a97a142` |

Independent backup was neither accessed nor written. Original index bytes match before scoped staging; original tracked application/native-policy/identity/config/package/lock/assets and async provider/hook files remain unchanged. Only5 existing presentation/smoke files differ before documentation updates; new tests/fixtures/spec/docs are scoped. No native outputs/screenshots/xcresult or private assets are committed.

## Workflow metrics and independent assessment

- Direct issue retrieval1 plus comment retrieval1; human follow-up scope decisions/clarification prompts0; architectural/security/destructive boundaries reached0; subagents0.
- Autonomous correction iterations4: spinner/query + test-harness repair, external Metro fixture placement, repeated-identical-retry announcement correction driven by a failing regression test, scaled native traversal direction. No dependency/security/native-project repair.
- Development Jest runs4: first40 pass/21 fail; second61/61; targeted repeated-retry21 pass/1 fail; final62/62. Clean install1. Full unchanged verification3, all pass (61/62/62 respectively). Native runs6,4 pass/2 fail. Explicit policy51/51, separate from verify38/38.
- Environment escalation requests38 through verification, all automatically approved; automatic approval rejections0; extra human permission responses0. Delivery Git metadata requests will be counted in the final revision. Initial sandboxed Git fetch was denied filesystem access; authorized escalation passed. Gortex field/path corrections and two unexecuted JavaScript orchestration syntax errors were tool overhead, not approval-policy rejections or application failures.
- Gortex used for recall/discovery/source/impact/guarded edits/detect/tests/guards/contracts. Final graph test mapping covers5/5 selected executable symbols. No configured guard rules. Contract remains WARN/high score100, blast6/lower-bound; reviewed against actual caller paths,62 passing cases and native behavior. No unrelated aesthetic refactor was added to chase the heuristic. Stable public signatures require no migration.

Independent scoped assessment: local PASS against every presentation/media/feedback/preservation criterion, with actual native acceptance and disclosed auditory/production limits. Hosted/draft delivery remains pending at this revision. Evidence is local-only under `/private/tmp/kyrshas-issue15-20261117/`: install/three verify logs, development failures, native provenance/fingerprints/index/source parity, six xcresult/logs and normal/edge/scaled screenshot attachments. Temporary artifacts may expire; tracked fixtures/tests and migration guide provide reproduction.

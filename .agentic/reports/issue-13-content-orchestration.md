# Issue #13 — Pilot 03C asynchronous home content

November 17, 2026 (America/New_York). [Issue](https://github.com/dvale94/kyrshas-app/issues/13) fetched directly with GitHub connector, including comments (none). Branch `pilot/03c-content-orchestration` starts at freshly fetched main `ed9cf953f25c4e6a4aa8189c230a34c500b0567f`. Owner index/worktree clean at kickoff. [OpenSpec](../../openspec/changes/home-content-orchestration/proposal.md), [design](../../openspec/changes/home-content-orchestration/design.md), [migration guide](../../docs/migration/expo-next-content-orchestration.md).

## Result and scope

Local functional/native verification PASS. Hosted CI is pending until the draft PR is created; it is not inferred from local success. Typed discriminated content, runtime normalization and a stateless asynchronous fixture provider now feed a home-owned hook. All five requests start independently, keep exact legacy slots/IDs, retain last-good refresh content, expose safe Retry, suppress duplicate requests and ignore obsolete generations after provider replacement/unmount. Only successful trivia revisions reset its answer. Card-local delay/index orchestration was removed; accepted presentation/styles/artwork remain.

No new dependency, lock/config/native project, ATS/identity/signing, credential, persistent model, private/birthday, live API or production change. Mock-only default delay650ms remains configurable. The external-only native failure wrapper was removed and normal App.tsx verified byte-for-byte before final smoke. No merge/archive/deployment/release.

## Verification ledger

| Gate | Actual outcome |
|---|---|
| Complete OpenSpec before source | PASS, strict `home-content-orchestration`, evidence `openspec-before-code.log`; all proposal/design/spec/tasks existed before coding |
| Clean isolated install | PASS, existing Node22.23.4/npm10.9.9, `npm ci --no-audit`,990 packages; existing upstream deprecation warnings retained |
| Unchanged full `CI=1 npm run verify` in clean external copy | PASS: TypeScript,40 Jest tests/2 suites, config/introspection, online Expo compatibility, Doctor20/20,38 policy/sync tests |
| Retained functional coverage | PASS:17 adjusted cases retain order/IDs, image/text/author, trivia, scoped refresh/duplicates/overlap/rejection, long/optional content and fetch/XHR prohibition |
| Expanded async coverage | PASS:23 added cases cover deferred startup/order/independence, one/multiple failure/retry, same-tick duplicate suppression, provider replacement during initial/refresh, unmount,11 invalid-response cases,3 missing/empty trivia answers, normalization and controllable mocks |
| Both existing policy fixture files explicitly executed | PASS,51 executions/0 failures (13 cases repeated through imports); full verify's38 remains separately counted |
| Native source checker and synchronizer `--check` | PASS; no policy source drift or native mutation |
| Separately processed Debug/Release policy | PASS using prior issue11 patched build outputs; Debug only approved localhost, default/Release strict false/false; no new application native build is claimed |
| Harness and Python syntax | PASS, `python3 scripts/doctor.py` and external-cache `py_compile` |
| Repository-wide strict OpenSpec | PASS,5/5 active changes; no archive |
| Whitespace/scope/external source parity | PASS; only approved modern source/tests/smoke plus new specs/docs/report/handoff; packages/config/entry match clean validation copy after injection removal |
| Final normal iPhone XCTest | PASS,1 test/0 failures,26.402s, real localhost Metro on restored source |
| Controlled mock iPhone XCTest | PASS,1 test/0 failures,44.020s; actual startup spinner/disabled control, isolated quote initial failure/retry and trivia last-good refresh error/retry |
| Preservation | PASS,20,437 legacy and30,193 modern native entries identical path/type/content; original index unchanged before scoped staging, unrelated tracked contents unchanged; backup never accessed/written |
| Hosted Expo/harness | PENDING draft PR; record independent URLs/conclusions after GitHub execution |
| Application Debug/Release rebuild this issue | NOT RUN; native application packages/config unchanged and verified prior patched binary reused |
| Physical device, live provider, production pixels/launch, installed-upgrade continuity, VoiceOver auditory review, signing/release | NOT RUN; outside this pilot |

## Actual native provenance and smoke

Disposable iPhone17, iOS27.2 build24B8117, UUID `271817B5-37EC-4B3E-88B0-3BD886BCCA37`; Xcode27.2 build27B52/SDK27.2 build24B8118. No pre-existing app/data targeted. Installed only the copied prior unsigned patched Debug binary from `/private/tmp/kyrshas-issue11-patches-20261117/derived/Build/Products/Debug-iphonesimulator/kyrshasApp.app`; no embedded JS. Bundle `com.dvale1994.kyrshasapp`, version1.0.0/build1, portrait/Light, family1. Debug dylib UUID `899C03AA-134D-32D6-9B0C-909A333A3F54`, SHA256 `86f7f17f47ede3e76df0ee513039c317cf593303c0d74a7d9e779ec01196628d`. Actual binary/plist hashes and prior build paths are in `native-provenance.json`; the current processed-policy check reads distinct original Debug/Release build outputs. The only native compilation here is the disposable standalone XCTest runner outside both protected app projects.

Normal smoke observes branded home, first/final cards, quote refresh, trivia Show/Hide, new question/answer reset, native scrolling, portrait after landscape request and hidden answer after process relaunch. Local screenshot review confirms readable green/image/text/author hierarchy and preserved growing layout. Controlled smoke observes five visible startup spinners/statuses, disabled loading control, quote failure alongside usable trivia, quote Retry success, revealed old trivia answer retained during/after refresh rejection, and Retry success with the new answer initially hidden. Failure injection uses a stable in-process wrapper with8000ms mock-only latency, first quote initial rejection and first trivia refresh rejection; normal product code has no test-mode switch.

Four native attempts retained: normal-first FAIL1/1 in18.012s (XCTest idleness/polling missed650ms status), normal-second PASS1/0 in27.162s, controlled-first PASS1/0 in44.020s, normal-final PASS1/0 in26.402s. Transient assertions moved to the longer-delay controlled run, which verifies both startup and refresh statuses. No product failure guard or default timing was weakened.

## Troubleshooting, graph review and workflow metrics

- Human scope decisions/clarification prompts after kickoff:0. No new approval boundary reached; user's request explicitly authorizes validated planning followed by implementation. No subagents used.
- Autonomous correction iterations:2 — one unit harness repair (await two async fireEvent calls; first run13 failures/27 passes became40/40), one native harness repair (transient assertions use controlled delay; first normal native failure retained). No dependency/security/native/product repair was needed.
- Native attempts4:3 passed/1 failed. Clean installs1. Full unchanged locked verify1, passed. Unit development runs2: first failed, second passed; the separate full verify reran40/40. Policy explicit run51/51.
- Gortex used for discovery/context/impact/signature verification/edits and post-edit tests/guards/contracts. Signature review identified the HomeScreen/test callers and both were migrated. Graph contract reports WARN/high lower-bound risk (score100/blast12); this is disclosed, not represented as a clear graph verdict. No configured guard rules. Graph underreports direct HomeScreen test coverage; executable40-test suites and actual native checks supply stronger evidence. Tool field/path corrections and one temporary evidence-log text-routing warning were resolved without raw indexed-source fallback. Gortex cannot write outside tracked roots, so the temporary external simulator wrapper was generated with native tooling; all repository mutations use Gortex.
- Environment escalation requests and automated-review outcomes are finalized with delivery below. Initial sandbox Git fetch metadata and xcresult export cache attempts failed; their bounded escalated retries passed. These are distinct from automatic approval-review rejection (none so far).

## Evidence and delivery

Local-only artifacts: `/private/tmp/kyrshas-issue13-20261117/` holds native fingerprints/index/tracked inventory, clean validation copy, npm/verify/policy logs, source parity/scope evidence, prior contract snapshots, native provenance and four xcresult/logs. Eight normal and five controlled synthetic screenshots exported outside Git; no app binary, Pods, private image or credentials uploaded. Temporary artifacts may expire; tracked tests and migration guide explain reproduction.

Final PR/hosted CI and permission metrics will be recorded after actual remote execution. Draft must target main. Remaining human action is normal draft review/acceptance; merge and archive remain unauthorized.

# Issue #27 — Afterglow visual foundation delivery

## Result and scope

**PASS local functional, visual and preservation acceptance. Draft delivery; owner controls merge.** Implements [issue #27](https://github.com/dvale94/kyrshas-app/issues/27), Phase 04C, from fetched main `e0ba950d3566e27c874ecb0a94c043f1dfb4bedb` (merged PR #26). Branch `feat/issue-27-afterglow-visual-foundation`; isolated worktree `/private/tmp/kyrshas-issue27/source`. Owner checkout remains clean on main at its original commit and its index hash matches kickoff.

Complete [OpenSpec](../../openspec/changes/afterglow-visual-foundation/proposal.md) proposal/design/spec/tasks passed strict change and all-active validation **before source edits**: 12/12. Historical changes remain intact and unarchived. Issue #27 and this request explicitly authorize planning and implementation together, and supersede historical formal assistive-technology acceptance gates. [Implementation/reproduction guide](../../docs/migration/afterglow-visual-foundation.md), [screenshots and evidence index](../../docs/design/afterglow/evidence/issue-27/README.md).

The five exact chapter IDs/order and full-screen vertical pager remain. Presentation now uses midnight canvas, opaque indigo/elevated reading surfaces, category accents, scalable system typography, canonical category pills, complete natural-case provider titles, optional attribution, a labeled trivia answer surface, safe status/error/Retry and comfortable refresh controls. Native status icons are light. Progress retains settled location and selected shape; Previous/Next remain explicit and finite. At font scales above 1.5 navigation stacks into full-width rows to avoid splitting Previous across narrow columns.

## Changed files

- `modernization/expo-next/src/home/tokens.ts`: small semantic palette/category/type/spacing/radius/touch vocabulary.
- `HomeScreen.tsx`, `ContentCard.tsx`, `CardText.tsx`, `ChapterPager.tsx`, `ChapterReading.tsx`, `ImagePlaceholder.tsx` in that directory: scoped presentation, chrome, dark indicators and restrained local geometry. No public callback/signature changes.
- `__tests__/App.test.tsx` and `Presentation.test.tsx`: only intentional title/color/surface expectations updated; existing functional assertions retained. New `Afterglow.test.tsx`: five focused framing/contrast-linked styles/progress/answer/retry/large-text navigation regressions.
- New OpenSpec change, migration guide, this report, additive handoff and 12 unmodified simulator PNGs with evidence index. PNGs are review artifacts, never app production assets/imports.

App entry is byte-for-byte restored after external fixture acceptance. `useHomeContent`, content/provider/normalizer/source/transport, fixtures, dependencies/locks/scripts/config/CI/native/security and legacy source are unchanged. No completion, birthday, persistence, backend, production art/custom fonts or rich animation.

## Automated checks

Pinned Node **22.23.4** / npm **10.9.9**; dotenv/telemetry disabled and inherited EXPO_PUBLIC_*/EAS_* settings removed without printing values. Dependencies were cloned from the prior isolated locked install; no package install or manifest/lock modification in this task. No provider calls or private credential reads.

| Check | Result / evidence |
|---|---|
| Unchanged final `CI=1 npm run verify` | **PASS exit 0**, `verify-refined-final.log`: TypeScript; **138/138 Jest, 6 suites** (all prior 133 plus 5 focused cases); config; online Expo compatibility; **Doctor 20/20**; **38/38** development-policy fixtures |
| Explicit policy files | **PASS exit 0**, `policy.log`: `node --test scripts/check-development-policy.test.cjs scripts/sync-ios-debug-policy.test.cjs`, 51/51 |
| New change strict OpenSpec | **PASS exit 0**, before source and final |
| All active strict OpenSpec | **PASS exit 0**, 12/12 before source and final |
| Root `python3 scripts/doctor.py` | **PASS exit 0**, starter harness only; application verification is separately established above |
| Python syntax, external pycache | **PASS exit 0** |
| Whitespace, exact scope and preservation | **PASS**, described below |
| Gortex impact/detect/tests/guards/contract | Executed. Guards: no rules/violations. Contract remains **WARN**, score100/lower-bound graph blast; coverage edges miss known pager tests. No parse rejection on final writes. Relevant actual callers and all six test suites reviewed/executed; no unrelated Extract Method refactor was added merely to clear a graph heuristic |
| Optional packaged Gortex review | **UNAVAILABLE**: worktree prefix rejected by active-workspace filter. File-targeted edits/detection/gates worked. Not reported as a passing packaged review |

First full verify attempt: **FAIL exit 1**, public Expo metadata DNS/network unavailable, Doctor18/20. TypeScript/137 tests/config passed; offline compatibility was not treated as online evidence. Network-enabled unchanged rerun passed all checks. Restored production entry then passed full verify again; the final large-text refinement passed final full verify with138 tests. Failed attempt logs remain external. No test removed and no script weakened.

## Actual iPhone simulator acceptance

Reused the already verified unsigned Debug app and existing standalone external XCTest runner; **no application native build, prebuild, Pods, signing or native config edit**. Localhost Metro8085 served only isolated synthetic/mock source, with dotenv/telemetry disabled. No owner simulator was erased, reinstalled or changed. Devices created only for this task:

- iPhone SE3 / iOS27.2: `7167C7B8-AA9F-4AA4-8C3C-FBD2AFBF6452`, 375×667pt.
- iPhone17 / iOS27.2: `8151519E-8D38-40AC-8556-C6936026233C`, 402×874pt.

Both used dark appearance. Actual system setting for the largest run was queried as `accessibility-extra-extra-extra-large`. Runner element lookup is automation, not a manual assistive audit.

| Actual native run | Result |
|---|---|
| Compact default mock, all-five chrome | **PASS 1/0**, 25.523s; all categories, positive reading area, reachable ≥48pt navigation, finite boundary |
| Standard default mock/revisit + all-five chrome | **PASS 2/0**, 34.914s; shown trivia survives leave/return; notched safe-area framing |
| Compact synthetic long-content/trivia + short traversal | **PASS 2/0**, 99.159s; Unicode/full answer/body/author end markers; actual inner scrolling and reading-edge arbitration; retained answer/read position on revisit/failure; identical successful Retry resets answer; fast/cancelled/boundary swipes |
| Compact largest text, initial review | **PASS 1/0**, 17.793s; review spotted unattractive split Previous label despite passing functional geometry |
| Compact largest text, refined full-width controls | **PASS 1/0**, 17.950s; all five chapters retain positive reader height and reachable navigation; labels no longer split into narrow columns |

**31 captures exported; 12 selected unmodified PNGs committed (1,320,493 bytes).** Inspected all five compact defaults, standard quote/answer, long answer/fact/error and representative largest captures. Readable serif rendered on iOS, clear concrete surfaces/accents, native status and bottom clearance, optional text and complete long reading are demonstrated. Default captures predate only the fontScale>1.5 refinement; their layout/source behavior is unchanged at default scale. Largest captures committed are from the refined run. No pixel parity with conceptual boards is claimed.

The external worktree's App entry temporarily exported `PagingFixture` for synthetic acceptance; it never touched the owner's App and was restored exactly before final verify/commit. Task Metro stopped and both task phones shut down. Complete logs/results/manifests/hash mappings remain at `/private/tmp/kyrshas-issue27/`; screenshot provenance is in the evidence index.

## Contrast and basic usability

[Measured pairs](../../docs/migration/afterglow-visual-foundation.md#contrast) use sRGB arithmetic. Primary text/surface15.66:1, secondary/surface11.23:1, weakest category accent/elevated8.30:1. Worst tested text pair across all semantic resting/pressed backgrounds is trivia/pressed7.07:1; inactive functional progress/stroke minimum3.81:1. The inactive token is not body text. Tests tie actual body/answer/error/progress styles to concrete tokens. No unverified art/scrim contrast claim.

Text remains fully scalable with no line count, forced shrinking or clipping heights. Controls retain minimum48-point geometry and disabled/busy/expanded labels/states. Hidden pages remain filtered, startup stays quiet and explicit refresh outcomes retain existing behavior. All existing basic accessibility regressions remain.

## Preservation and boundaries

Final metadata matches kickoff exactly: **20,437 legacy native entries / 30,193 modern native entries** (path/mode/size/mtime/symlink target); no native file contents read for the snapshot. Owner main HEAD and clean worktree unchanged; owner index SHA-256 unchanged. Separate backup not accessed. No reset/stash/clean, native generation, protected config change, credentials/private env, historic exposed key or personal assets read. Original scripts/policies and all non-allowlisted tracked paths unchanged. The new screenshot files contain only synthetic app content.

## Limits and owner decisions

- **Deferred:** built-in SafeAreaView deprecation warning remains. Its native insets work on compact and notched simulators; a reliable dependency-free replacement was not demonstrated. No warning suppression or extra package/native integration was adopted.
- **NOT RUN, not blockers:** manual VoiceOver, Switch Control and formal assistive audits, per explicit owner priority. Physical iPhone, separate 430pt large-device capture, largest-type manual long reading, Bold Text/preference toggles and formal memory/frame/performance profiling are also not claimed.
- **NOT RUN/out of scope:** live-provider calls, final illustration overlays/asset licensing, custom fonts, release/signing/deployment or installed-upgrade acceptance.
- **Owner review:** exact Georgia/system type, spacing and color tuning, whether future approved illustrations replace the quiet fallback, and a separately scoped safe-area replacement. Existing system font choice introduces no asset rights decision. No implementation blocker remains within issue27.

Owner controls final visual acceptance, merge and later artwork/font/native/release approvals. This change stays unarchived; no main-spec sync.

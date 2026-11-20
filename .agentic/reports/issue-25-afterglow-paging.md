# Issue #25 — Afterglow vertical chapter paging

November 19, 2026 (America/New_York). [Issue](https://github.com/dvale94/kyrshas-app/issues/25), branch `feat/issue-25-afterglow-vertical-paging`, base freshly fetched main `ca1230ae2ce28d424a3452d169390c67521a48b4` (merged PR #24). [OpenSpec](../../openspec/changes/afterglow-vertical-chapter-paging/proposal.md), [migration/reproduction guide](../../docs/migration/afterglow-vertical-chapter-paging.md).

**Automated/source acceptance PASS. Actual compact-iPhone native acceptance PASS at default and largest accessibility text size.** This report separates actual simulator observations from synthetic Jest scroll events. Draft PR and hosted CI evidence will be recorded after delivery; no merge or archive is authorized.

## Delivered behavior and bounded files

The modern home now presents five viewport-height chapters in exact ID order `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`. Native React Native snapping, settled location/progress and explicit Previous/Next replace the stacked feed. Progress is location, never completion. Drag transactions bound settlement to one adjacent chapter, preserve the previous location during travel, handle short/cancelled/no-momentum gestures and ignore navigation while settling. Geometry/font changes realign the settled ID without requests. Buttons jump without added animation.

Measured overflow enables bounded reading and disables outer swipe navigation completely. Category/refresh/status/body/author/trivia live inside the reader; position and chapter controls remain outside. Unknown geometry starts conservatively in reading mode. Read position survives revisits/failure, clamps on shrink and starts at zero for successful revision/session replacement. Inactive chapter accessibility descendants are hidden without unmounting. Position exposes increment/decrement actions, controls expose destination/disabled state and minimum 48-point targets, and screen-reader mode disables swipe paging.

The original hook/provider remain mounted above presentation. Existing independent startup, duplicate/stale protection, scoped loading/error/retry, last-good content and safe announcements are retained. Trivia resets only on successful revision/session replacement, including identical returned content. No navigation-driven refetch or answer reset is introduced.

| Files | Responsibility |
|---|---|
| `modernization/expo-next/src/home/HomeScreen.tsx` | Keep original data ownership; compose stable chapter presentation |
| New `src/home/ChapterPager.tsx`, `ChapterReading.tsx` | Native paging, settled position, accessible navigation, geometry and reading ownership |
| New `__tests__/Paging.test.tsx` | 15 synthetic paging/overflow/state/accessibility/geometry cases, explicit imperative-scroll mock and network sentinels |
| Existing App, Orchestration, Presentation and LocalContent test suites | Explicitly inspect hidden mounted slots for existing data/presentation assertions; allow fixed chapter viewport while retaining no-truncation assertions for text |
| New `scripts/ios-smoke/ChapterPagingTests.swift`, `PagingFixture.tsx` | Standalone external acceptance and synthetic short/long/Unicode/failure fixture; production entry never imports fixture |
| New OpenSpec change, migration guide, this report and additive handoff | Planning gate, contract, reproduction, evidence and remaining acceptance |

App.tsx, content/provider/hook/transport/validation, CardText/ContentCard, fixtures used by the default app, manifests/lock/config/CI/security and all legacy/native source are unchanged. No final artwork, fonts, rich motion, dependency, backend, persistence, birthday or remote media was added.

## Planning and preservation gate

Fetched issue #25 and comments (none), fresh main, repository instructions, relevant deliver-feature/OpenSpec propose/apply/Gortex safe-edit skills, approved Afterglow audit/design/interaction/roadmap/accessibility documents and existing source/tests. Legacy community skill was inspected and found to describe legacy HomeScreen, so its paths were not used for this modern change. Historical product/architecture/verification records remain unchanged; later approved modern/no-birthday constraints control this pilot.

Kickoff worktree and index were clean. Created the complete new `afterglow-vertical-chapter-paging` proposal, design, capability spec and tasks. `openspec status` reported all four planning artifacts done, active strict validation passed and all 11 changes passed strict validation **before any application source edit**. The recorded tracked diff was empty at that gate; only this new OpenSpec directory existed. Evidence: `planning-status.json`, `openspec-before-source.log`, `tracked-before-source.txt` in the external task directory.

Both original native trees were inventoried using metadata only: 20,437 legacy entries and 30,193 modern entries. Before scoped staging, all metadata matched exactly and the full original staged index listing matched byte-for-byte. The owner's separate backup was not accessed. No private env or historic credential was opened, compared, printed or reused. The original index was changed only by intentional staging of this pilot's paths after preservation checks.

## Automated verification

Pinned Node `22.23.4` / npm `10.9.9`, dotenv/telemetry disabled. External source copy preserved the original directory shape and only copied modern tracked/scoped source plus public icon/splash; no native trees, private env or legacy configuration. Frozen `npm ci --offline --no-audit --no-fund` installed the existing 990-package lock successfully. No dependency files changed.

| Check | Outcome and evidence |
|---|---|
| Complete planning gate | PASS, active strict and all 11 changes before app edits |
| Final unchanged `CI=1 npm run verify` from the modern workspace | PASS/exit 0: TypeScript, **133 Jest tests / five suites**, config/introspection, online compatibility, **Expo Doctor 20/20**, **38 policy fixtures**; `verify-owner-final.log` |
| Clean external full unchanged verify | PASS/exit 0 with 132 tests before the additional font-size case; same application source; `verify-complete.log` |
| Focused final paging suite | PASS, 15/15; `paging-third.log` |
| Explicit policy/synchronizer test invocation | PASS, 38 executed fixtures, zero failures; `all-policy.log` |
| Native source and policy sync drift checks | PASS/exit 0; generated source only, no mutation |
| Existing distinct processed Debug/Release plist checks | PASS/exit 0; Debug only localhost exception, Release/default strict false/false, expected identity/platform |
| Root doctor and Python syntax | PASS/exit 0; syntax cache external; root harness does not itself execute app tests |
| Whitespace, final strict specs, scoped staging and preservation | PASS/exit 0: active strict and all 11 changes; 18-path allowlist, unchanged outside-scope index entries and native metadata; final results below |

The 15 new cases cover exact order/five positions, selected progress, active-only focus filtering, button/action bounds, short/cancelled/fast/duplicate gestures, idle fallback, measured viewport and font-scale changes, unknown/overflow gating and reading edges, answer-size changes, retained/clamped/reset reading commands, no navigation requests, failed refresh/last-good visibility, identical-success trivia reset, provider replacement, screen-reader alternatives and complete Unicode text/author/answer. Existing 118 cases and their behavioral assertions remain covered. All fetch/XHR sentinels and mocked local transport assertions pass; no real API Ninjas calls were made.

Development failures were retained externally and corrected within scope: initial RN 0.88 component ref typings; fixture discriminated-union typing; obsolete test-renderer ref access; exact-string matcher behavior; module-spy placement and mock call reset for additional focus/geometry assertions. The first full verify failed on sandbox DNS (Doctor 18/20), then network access exposed an external flattened-copy asset-path error (19/20). Correcting the copy's directory layout, without configuration edits, produced the complete passing runs. These earlier failures are not reported as passes.

## Actual iPhone simulator evidence

Disposable **iPhone SE (3rd generation), 375×667 logical points / 750×1334 pixels, iOS 27.2**, UUID `F0E46F40-DC83-420B-9473-B19993572AFC`. Reused the existing authorized unsigned Debug app from the issue-11 patch build, installed only on this new test phone. No app native build, prebuild, Pods or signing occurred. Only the external standalone XCTest runner was generated/built. Localhost Metro used port 8085 from the isolated dotenv-free copy with inherited `EXPO_PUBLIC_*`/`EAS_*` settings removed. Original App entry was used first; synthetic fixture entry was injected only in the external copy.

Installed launcher, Debug dylib and Info.plist hashes match the reused source artifact; no `main.jsbundle` exists. Dylib SHA256 `86f7f17f47ede3e76df0ee513039c317cf593303c0d74a7d9e779ec01196628d`. This establishes actual Metro-loaded JS on the matching native baseline. It does not claim a newly built Release or signed application.

| Actual XCTest run | Observed outcome |
|---|---|
| Default mock home | PASS, 1 test/0 failures, 13.989s: original synthetic content, boundary controls, trivia reveal, navigation away/back and retained answer |
| Initial short-chapter harness | FAIL, 12.173s: query assumed disabled reading views had ScrollView accessibility type; changed test to query the exact ID across element types |
| Corrected default-size fixture | PASS, 2 tests/0 failures, 67.637s total (38.256s overflow, 29.380s traversal): fast one-step swipes, short drag, first/last bounds, explicit navigation, reading-edge isolation, complete body/attribution/answer, read-position revisit, failed trivia refresh and identical successful retry reset |
| Initial largest-type fixture | FAIL, 72.640s: offset captured before an additional reading swipe; fixed assertion to capture the final offset immediately before leaving |
| Final largest-type fixture | PASS, 1 test/0 failures, 272.321s: long answer/read-position revisit, retained answer after failed refresh, identical-success reset, full long fact/attribution reading, reading-edge swipes stay at Fact, explicit navigation exits with positive reader height and reachable controls |
| Supplemental largest-type default mock, all five chapters | PASS, 1 test/0 failures, 17.755s: positive reading height, visible 48-point controls, wrapping long final label, finite last boundary and Previous return; five unobstructed captures |

Largest preset is `accessibility-extra-extra-extra-large`, set and read back only on the disposable phone. Native swipes, XCTest assertions and captures are actual observations, independently of Jest. Default and long-reading captures include RN's Debug SafeAreaView deprecation banner, whose close affordance is not reliably in XCTest's accessibility tree. A supplemental all-five largest-type chrome run uses its known compact-iPhone close coordinates and asserts it did not advance a chapter, while retaining the warning in Metro logs. It never suppresses errors or relaxes assertions. The built-in primitive avoids an unauthorized new package; replacing it later needs separate dependency review.

Evidence root: `/private/tmp/kyrshas-issue25-20261119/`. Keep `default-smoke.xcresult`, `short-paging.xcresult`, `fixture-default.xcresult`, `fixture-largest.xcresult`, `fixture-largest-final.xcresult`, runner logs, exported screenshot manifests and native provenance JSON. Temporary artifacts can expire; committed Swift/fixture and migration instructions reproduce the workflow. Exported 21 named XCTest captures (10 default fixture, six largest reading, five largest mock chrome). Visually reviewed six representative exported captures plus two interim largest-reading screenshots: readable temporary presentation, native status-safe top inset, complete text reached through reading, wrapped Previous label and final chapter label, and unobstructed persistent controls after Debug banner dismissal. These establish the observed compact-iPhone cases, not final visual approval. Seven executed native case attempts total: five PASS and two corrected harness FAIL, retained externally.

## Gortex and independent acceptance limits

Used native Gortex for source/doc inspection, pre-edit impact, guarded mutations, post-edit detection and tests/guards/contract. HomeScreen reference resolution was incomplete. Final staged detection sees new files but reports a lower-bound blast; tests operation reports 0/3 coverage edges even though executable tests exercise the components. Contract identifies Paging.test.tsx and retains a high-risk WARN (score 100, blast 3, lower bound); no guard rules are configured. Impact was reviewed and acknowledged; a rerun still warns. This is disclosed, not treated as proof of zero impact or a passing coverage metric. TypeScript, executable suites, native evidence and narrow diff establish the practical validation.

The verify-delivery review checks the bounded spec against source, retained state, test assertions, native observations, security/native preservation and final scope. Human review still owns merge. Actual VoiceOver auditory/focus ordering, Switch Control, physical device, notched/large-iPhone layouts, installed upgrade continuity, production visual fidelity, final artwork/fonts, performance budgets and release/signing are NOT RUN. No test-prop assertion is presented as auditory accessibility proof.

## Delivery, cleanup and required approvals

Local delivery checks PASS: strict active/all 11 specs, whitespace, local linked paths (10 checked), scoped 18-path staging and native/index preservation. External App entry restored from the original; all 16 compared entry/source/package/config files match the tested workspace, and final tests/runner fixture are synchronized. This task's Metro stopped and disposable phone shut down; no owner simulator/server was stopped. No product changes followed the passing native/133-test source checks. Draft PR URL and hosted CI are recorded in the delivery follow-up below. No merge, deployment, publication, release, main-spec sync or OpenSpec archive is performed.

Required owner decisions: review this bounded functional pilot and remaining manual assistive/device acceptance; approve any eventual merge. Final visuals/fonts/artwork rights, rich motion, third-party paging/safe-area packages, native/security expansion and release remain separate future scopes, not implicitly approved by this delivery.

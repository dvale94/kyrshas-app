# Afterglow visual foundation — Phase 04C

[Issue #27](https://github.com/dvale94/kyrshas-app/issues/27), following main `e0ba950`/merged PR #26. [Planning](../../openspec/changes/afterglow-visual-foundation/proposal.md), [delivery report](../../.agentic/reports/issue-27-afterglow-visual-foundation.md). This is a static foundation, not final illustration or concept-board pixel parity.

## Presentation

`modernization/expo-next/src/home/tokens.ts` owns concrete canvas/surface/elevated/pressed, primary/secondary/error/stroke/progress colors; category labels/accents; spacing, radii, 48-point targets and system typography. Body uses iOS Georgia 28/37, answer 26/35, with platform system fallbacks. Functional text remains system sans. All text scales, wraps and stays complete; body is leading-aligned for long reading. No custom font, asset or dependency is added.

Each canonical category is a restrained accent pill independent of provider title. A differing title is preserved in natural case as complete supporting text. Refresh stays a 48-point target; errors show explicit Retry text and the retained safe message. Optional local-image semantics remain, but placeholder colors are quiet presentation-owned indigo geometry. Text uses an opaque surface even with an image. The optional answer has its own labeled elevated surface. No text is baked into art, truncated or inferred from joke punctuation.

Progress is still settled location: a longer/thicker selected accent plus canonical text, never completion. Previous/Next retain explicit destination labels and disabled bounds. Above font scale 1.5 they stack into full-width rows so large labels do not split across narrow columns. Content, category/action/status/mode and the contextual cue scroll together when needed; fixed global navigation remains outside reading. The first chapter retains product identity and honest offline-demo/live-local messaging. Light native status icons sit on midnight canvas.

Native SafeAreaView remains applied once around the existing shell. Its RN deprecation warning is deferred: no reliable demonstrated dependency-free replacement was introduced, no hard-coded notch geometry or warning suppression, and no package/native configuration change. Existing pager algorithms, provider/hook/transport, exact IDs/order, revision resets, read offsets, stale/duplicate suppression and mock/live-local boundaries are retained.

## Contrast

sRGB luminance and `(lighter+.05)/(darker+.05)`, rounded to two decimals. Primary/secondary/error and all five accents exceed 4.5:1 against canvas, surface, elevated and pressed; inactive/stroke exceed 3:1 on those backgrounds. Automated tests bind actual body/answer/error/progress styles to these tokens. No arbitrary-art overlay contrast is claimed.

| Foreground | Canvas #0B1026 | Surface #161D3D | Elevated #24224D |
|---|---:|---:|---:|
| Primary #FFF8F5 | 17.91 | 15.66 | 14.17 |
| Secondary/stroke #D8D2EC | 12.85 | 11.23 | 10.17 |
| Inactive progress #8E88B2 | 5.66 | 4.94 | 4.48 |
| Quote #DAB7FF | 10.93 | 9.55 | 8.65 |
| Trivia #F3A6FF | 10.49 | 9.17 | 8.30 |
| Fact #6EE7EF | 12.85 | 11.23 | 10.16 |
| Joke/error #FFAF9E | 10.64 | 9.30 | 8.42 |
| Bucket #FFD18A | 13.20 | 11.54 | 10.45 |

Inactive progress is not a text token. Decorative low-opacity rules are not functional boundaries. Pressed background #302D5C is included in the executable contrast matrix. These checks establish concrete color arithmetic, not legal certification or contrast over future artwork.

## Reproduce checks

Use Node 22.23.4/npm 10.9.9. Remove inherited EXPO_PUBLIC_*/EAS_* settings without printing values, disable dotenv/telemetry and use mock/synthetic content. Never read private env or historic credential config. From `modernization/expo-next`:

```sh
CI=1 EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 npm run verify
node --test scripts/check-development-policy.test.cjs scripts/sync-ios-debug-policy.test.cjs
```

From the repository root:

```sh
openspec validate afterglow-visual-foundation --strict
openspec validate --all --strict
python3 scripts/doctor.py
PYTHONPYCACHEPREFIX=/private/tmp/kyrshas-issue27-pycache python3 -m py_compile scripts/doctor.py
git diff --check
```

The full verify script is unchanged. The new Afterglow suite checks canonical/provider-title separation, all-five accents/progress, opaque complete answers and safe error/busy/retry controls. All previous functional and basic accessibility regressions remain. Manual VoiceOver/Switch Control/formal assistive audits are NOT RUN and are not delivery gates per owner instruction.

## Reproduce visual review

Follow the [04B external simulator procedure](afterglow-vertical-chapter-paging.md#reproduce-external-simulator-acceptance). Serve the isolated modern source via dotenv-disabled localhost Metro8085. Reuse the existing verified unsigned Debug binary and standalone external XCTest runner, with disposable iPhone SE3 and standard iPhone simulators. Do not build/prebuild the application, alter original native trees or use the owner backup.

Run `testLargestChapterChrome` at default text to capture all five canonical mock chapters (its historical name does not determine the actual setting), and `testDefaultMock` to check trivia revisit. For synthetic long Unicode body/attribution/answer, inject PagingFixture only in a separate external Metro copy and run `testOverflowAndTrivia`; never commit a changed production entry. Repeat compact chrome at largest text where feasible. Set dark appearance only on task devices. Export xcresult attachments and inspect actual PNGs; record device, text setting, source parity and outcomes in the delivery report. Stop task Metro and shut down only task devices after review.

Owner review remains for exact serif/color/spacing tuning, final illustrations/crops and any future custom fonts. Safe-area replacement, rich motion, packages, backend, persistence and release remain separate scope.

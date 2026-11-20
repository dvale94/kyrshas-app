# Afterglow vertical chapter paging — Phase 04B

[Issue #25](https://github.com/dvale94/kyrshas-app/issues/25), following merged design PR #24/main `ca1230ae`. [OpenSpec](../../openspec/changes/afterglow-vertical-chapter-paging/proposal.md), [approved interaction model](../design/afterglow/interaction-model.md), [delivery evidence](../../.agentic/reports/issue-25-afterglow-paging.md). This is the functional navigation foundation; existing readable colors, system type and local placeholders remain temporary.

## Navigation and reading

HomeScreen keeps one mounted `useHomeContent(provider)` above ChapterPager. Five stable pages retain the exact IDs/order Quote, Trivia, Fact, Dad Joke, Bucket List Item. Each page occupies the measured available viewport between a safe-area position strip and Previous/Next controls. Native ScrollView paging uses viewport snap offsets, fast deceleration and disabled interval momentum. There is no wrap, auto-advance, pull-to-refresh, completion status or persisted position.

Progress shows the last settled chapter during a drag. A drag transaction records its origin; settlement clamps the target to that origin or its immediate neighbors and corrects native fractional/overshoot offsets. Buttons jump directly without additional animation. Navigation is ignored while a drag is settling; momentum-end or a 160ms scroll-idle fallback releases the transaction. Cancellation returns to its origin. Viewport/window/type changes cancel transient travel and align the last settled chapter to the new measured boundary. Navigation never requests data.

Each ChapterReading owns a bounded inner ScrollView containing category, refresh/retry, mode information where shown, body, attribution, status and trivia controls/answer. Unknown or overflowing geometry disables outer swipe paging. Overflow enables the inner reader, including at its first/last reading edge; use visible Previous/Next to change chapters. Content-size and viewport changes recalculate this policy. No text is intentionally truncated or shrunk. Mounted native read offsets survive revisits and failed refreshes; layout/content shrink clamps them, and successful revision/provider replacement starts at the beginning.

All five initial requests remain independent. Existing busy/duplicate/stale protections, safe errors, Retry and last-good behavior are unchanged. ContentCard/CardText remain mounted across page changes. Successful trivia revision resets the answer, including identical content; unrelated updates, navigation and failed refresh preserve it. Provider replacement resets content/reading/answer sessions while retaining the mounted home's selected chapter.

## Accessibility

Progress exposes one canonical name/position summary and increment/decrement actions. Five visual segments represent location, with a larger selected shape; they are not buttons. Previous/Next expose destination names, disabled bounds and at least 48×48 targets. Labels scale and wrap. Inactive pages hide their accessibility descendants without losing state. Deliberate navigation focuses the position summary once; it does not also explicitly announce it. Screen-reader mode disables outer swipe paging; chapter controls/actions and inner reading remain available. Startup and existing per-refresh outcome behavior remain unchanged.

The built-in React Native SafeAreaView is used to avoid a new dependency/native integration. RN 0.88 emits a deprecation warning; adopting a replacement package is separate approval scope. [ScrollView](https://reactnative.dev/docs/scrollview) and [accessibility](https://reactnative.dev/docs/accessibility) documentation informed the implementation; native acceptance, rather than prop presence, establishes the observed gesture behavior. Actual VoiceOver speech/focus ordering, Switch Control and physical-device review remain separate manual acceptance.

## Reproduce automated checks

Use the existing pinned Node `22.23.4` / npm `10.9.9`; disable dotenv and telemetry, remove inherited `EXPO_PUBLIC_*`/`EAS_*` settings without printing them. No real provider request is needed.

```sh
cd modernization/expo-next
CI=1 EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 npm run verify
node --test scripts/check-development-policy.test.cjs scripts/sync-ios-debug-policy.test.cjs
# From repository root:
openspec validate afterglow-vertical-chapter-paging --strict
openspec validate --all --strict
python3 scripts/doctor.py
git diff --check
```

Paging.test.tsx supplies synthetic layout/scroll events and recorded imperative scroll commands; these are not native gesture observations. Existing suites explicitly inspect hidden mounted slots where they test data/presentation contracts. Paging tests use default visibility filtering to check active-only accessibility and cover navigation/state behavior separately. Fixed chapter viewport height is allowed by the old growing-text helper; text/reading content still has no fixed text height or truncation.

For a clean external verification copy, preserve `modernization/expo-next/` beneath an external root and copy only its tracked/scoped files plus public `assets/icon.png` and `assets/splash.png`. Exclude native trees, private env, legacy configuration and personal assets. Keeping this directory structure is necessary for unchanged relative asset paths. Run locked `npm ci` in that copy; do not edit configuration to accommodate a flattened copy.

## Reproduce external simulator acceptance

Use the established [development loop](expo-next-development-loop.md) and an existing verified unsigned Debug simulator `.app` with localhost-only Debug policy and no embedded JS bundle. Preserve original native trees/Pods and owner backup. Create a disposable compact iPhone; never erase or replace an owner's simulator/app. Build only the standalone UI runner using `scripts/ios-smoke/create-runner.rb` from the real repository location (its containment guard derives the repository root from its own path).

Copy `scripts/ios-smoke/ChapterPagingTests.swift` over the generated external runner's `SmokeTests.swift`. Start Metro from the isolated source copy with CI unset, dotenv/telemetry disabled and inherited public/EAS settings removed, using `--localhost --port 8085`. This port avoids the owner's default server; the existing approved Debug policy permits localhost ports. Install the existing Debug binary only on the disposable phone. Tests launch `com.dvale1994.kyrshasapp` with `-RCT_jsLocation localhost:8085`.

1. Build the external runner with `build-for-testing`, signing disabled; run only `SmokeTests/testDefaultMock` against the unchanged copied App entry.
2. In the external copy only, save App.tsx then replace it with `export { default } from './scripts/ios-smoke/PagingFixture';`. The production entry never imports this fixture. The fixture has short no-image chapters, multiline Unicode long fact/author/answer, a failed trivia refresh and identical successful retry; it has no transport.
3. Run `testShortChapterTraversal` and `testOverflowAndTrivia` with `test-without-building`, unique external result bundles and the disposable destination. The reading region may expose an accessibility type other than ScrollView when disabled; query its test ID across all element types.
4. Set only that disposable simulator's content size to `accessibility-extra-extra-extra-large` with `simctl ui`, relaunch via the runner and run `testOverflowAndTrivia` again. Record screenshots, actual reader height/control reachability and reading-edge swipes retaining the chapter.
5. Restore the original external App entry and run `testLargestChapterChrome` at largest type to check all five mock chapters, their long category labels, positive reader space and visible controls. The known Debug warning close button may require the documented compact-iPhone coordinate fallback; the test asserts no accidental chapter change.
6. Export screenshot attachments from xcresult, inspect representative captures, verify restored source-byte parity, stop this task's Metro and shut down only this task's phone.

Keep failed attempts, logs, results and screenshots external; record actual outcomes in the report. Do not describe a unit-test scroll event as a simulator observation. No application native build, prebuild, clean, Pods, signing, security relaxation or real API call is required by this procedure.

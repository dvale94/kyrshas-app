# Home and content cards — Pilot 03B

[Issue #11](https://github.com/dvale94/kyrshas-app/issues/11), November 17, 2026 (America/New_York). Approved [OpenSpec change](../../openspec/changes/home-card-ui-migration/proposal.md), branch `pilot/03b-home-card-ui`, fetched main `abcf6692e3e984b0ec45f6d286586533565f99b1` (merged PR #10). Planning passed strict validation before application edits. Detailed execution evidence: [issue report](../../.agentic/reports/issue-11-home-ui.md).

## Observed legacy contract and comparison

This table records inspected code, not a successful legacy runtime comparison. Legacy app startup could invoke exposed provider configuration and private birthday assets; it is not run for this pilot.

| Surface | Observed source contract | Migrated presentation / deliberate difference |
|---|---|---|
| Route/header | App.js has one route, Kyrsha's App, #38761d header, white title | Same title/colors; title scrolls with the feed using UIKit automatic safe-area insets, no navigation package. Legacy navigator kept its header fixed |
| Feed | HomeScreen.js FlatList, stable IDs, #eff3f4 background, 10px margin, green 2px bottom separators | Five mounted ScrollView children with stable keys; preserves card-local state offscreen |
| Order/IDs | useHomescreen.js and ApiProvider.js: quote, trivia, fact, dad joke, bucket list item | Exact same IDs and normal-day ordering; no random selection |
| Card hierarchy | ContentContainer.js uppercase green heading, refresh/spinner, optional image, overlay or green text panel | Same essential hierarchy; locally drawn geometric placeholders for quote/fact/bucket list, no provider images or private artwork |
| Text/author | TextContainer.js white body, optional right-aligned attribution | White readable text and fictional Demo Author attribution; growing content avoids absolute-position clipping |
| Trivia | Initially hidden, Show Answer/Hide Answer, truthy answer controls | Retains baseline triangle fixture and accessible expanded state; new question hides old answer |
| Refresh | Per-card callback replaces one named state entry; spinner awaits completion | Local 650ms fixture rotation only; independent busy/disabled state, duplicate guard, finally cleanup and safe retryable error |
| Known fragility | Rejection may leave spinner stuck; stale callback dependencies; data-dependent splash blocking | Intentionally not copied; no provider startup or blocking splash logic |
| Birthday | October 3 prepends birthday content in legacy hook | Deferred to 03E on every date; no private messages/photos imported |
| Touch/overflow | Legacy compact refresh icon and fixed image height/absolute overlay | At least 48px controls; minimum-height background with growing overlaid text, no text truncation |

The two deterministic variants per category are synthetic examples; all state is in memory and resets on process relaunch. Refreshing one card leaves all other text, IDs, order and trivia visibility unchanged. A failed refresh retains the old variant and displays a generic message without exposing an error payload. Image placeholders are local React Native geometry with image semantics, requiring no URL, data URI, provider or new dependency. They are demonstration artwork, not production visual authority.

## Acceptance strategy

- Component tests retain initial/show/hide baseline coverage and add five-card order/stable IDs, image/text/author variants, empty/long optional content, scoped/overlapping refresh, busy/disabled/duplicate state, deterministic wraparound, trivia reset, rejection/retry, accessibility and forbidden network assertions.
- Run a fresh external locked `npm ci` with pinned Node22.23.4/npm10.9.9, then full `npm run verify` with dotenv/telemetry disabled: TypeScript, Jest, config/introspection, online Expo compatibility, Doctor and existing exact-policy fixtures. Preserve lock/config/security checks unchanged.
- Run native source checker and synchronizer check. Build separate unsigned Debug and Release simulator configurations from an external copy of the existing ignored native project, without prebuild/Pods changes. Check actual distinct processed plists with the existing policy checker.
- Start the approved localhost Metro loop; install only on a new disposable iPhone. Updated standalone XCTest records first/final cards, scrolling, Show/Hide, synthetic refresh, portrait after rotation and relaunch. Inspect safe screenshots locally against the source-derived table; do not claim independent pixel parity.
- Keep screenshots, xcresult, logs, fingerprints and build products outside Git under `/private/tmp/kyrshas-issue11-20261117/`. Compare all 20,437 legacy and 30,193 modern native entries before/after. Independent backup is neither accessed nor written. Existing owner worktree/index is clean at kickoff and must remain preserved.

## Actual results

PASS: external locked npm ci (990 packages), TypeScript, 17 component tests, config/introspection, 38 existing policy/synchronizer fixtures run separately, native source/resource/identity checker, synchronizer drift check, actual unsigned Debug/Release simulator builds and distinct processed exact-policy checks. Default and Release remain exactly false/false; Debug retains only the previously approved localhost exception. Both original native trees compare byte-for-byte/path-for-path unchanged (20,437 legacy; 30,193 modern entries). No native project or independent backup was changed.

FAIL: full npm run verify stops at online compatibility checking: installed Expo58.0.25 versus recommended ~58.0.26, jest-expo58.0.14 versus ~58.0.15. Doctor was run independently:19/20, failing the same patch recommendations. No package/config/lock/check exclusions were changed. The issue explicitly permits explained verification failures; this draft is not an all-green acceptance claim.

PASS: standalone native XCTest through localhost Metro on the new disposable iPhone17/iOS27.2, with actual initial/final cards, Show/Hide, quote and trivia refresh, portrait and relaunch. The first attempt failed an inappropriate static-attribution hittability query; attribution was visibly present. The corrected test asserts its accessibility presence and screenshots are independently inspected for readability. A subsequent run passed1/0 in25.787s; final source acceptance passed1/0 in25.004s after all build activity finished. The intervening failed run captured a Metro Refreshing overlay and is retained. Four attempts total (two failed/two passed); hosted results are recorded in the report.

Visual review: first-card image/overlay/attribution and green header, later green dad-joke panel, final bucket-list image/overlay and matching trivia answers are readable in local screenshots. Automatic insets replaced the deprecated SafeAreaView warning banner; a trial sticky title intersected the status bar, so the final title scrolls naturally with the feed. Layout is source-contract parity with the deliberate differences above, not independently established legacy pixel parity. Production artwork, launch appearance, live providers, private/birthday behavior, physical devices and installed-upgrade continuity are NOT RUN.

PASS: starter harness/Python syntax, active strict OpenSpec and repository-wide strict OpenSpec (4 changes). The historical duplicate-file validation failure is not reproduced in this run; no earlier change is edited. Hosted CI is recorded separately in the report and cannot certify native behavior. Run the existing localhost command from the development-loop guide before relaunching the development app; Metro will be stopped after acceptance.

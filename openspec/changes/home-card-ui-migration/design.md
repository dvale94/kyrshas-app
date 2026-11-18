# Design

## Context

See proposal.md. Fetched main is the merged PR #10 baseline (abcf669); worktree/index are clean. Legacy App.js defines one green #38761d route with white title. HomeScreen uses stable-ID FlatList cards, #eff3f4 background, 10px margin and green 2px separators. ContentContainer has uppercase green titles, per-card refresh/spinner, optional images and a translucent text overlay or green panel. TextContainer renders white text, truthy author/answer and Show/Hide. useHomescreen orders quote/trivia/fact/dad joke/bucket list; October 3 prepends birthday. ApiProvider supplies IDs quote/trivia/fact/dad joke/bucket list item, image-bearing quote/fact/bucket list and per-entry functional refresh. These are observed source contracts, not independent legacy runtime visual proof. No private birthday data or provider credentials are needed.

## Goals / Non-Goals

**Goals:** Preserve normal-day visual hierarchy and scoped interactions in a small typed presentation layer. Make acceptance deterministic and keep the existing development loop and all security/native boundaries intact.

**Non-Goals:** Provider orchestration/failure simulation UI (03C), image edge-case parity (03D), birthday (03E), live API/security (03F), production artwork/release (03G). No navigation dependency for one screen, no native generation or migration of private assets.

## Decisions

1. App delegates to HomeScreen, a single ScrollView mapping five stable keys. With five fixed cards this keeps offscreen card-local state mounted and avoids unnecessary navigation/virtualization complexity. Separate ContentCard, CardText and ImagePlaceholder components own presentation; readonly fixture types model optional image/author and trivia-only answer.
2. Preserve original IDs and order. Two fixed variants per category are authored generic examples. Geometric image placeholders are drawn locally with React Native Views and image accessibility labels; no image URL, data URI, bitmap dependency or network is involved. They preserve the image-backed layout without claiming production art parity.
3. Each ContentCard owns variant index and busy/error state. A local timer creates a visible synthetic refresh interval; a narrow async completion seam permits controlled rejection tests without adopting provider orchestration. Disable duplicate refreshes, rotate only after success, clear busy in finally, retain content on failure and expose a generic retryable error. New trivia hides the prior answer; refreshing another card preserves visibility. The legacy spinner can stick on rejection and stale callback dependencies exist; neither fragility is ported.
4. Preserve colors, uppercase headings, white body, attribution, separators, rounded image surface and overlay hierarchy. Use growing content/minimum image height rather than legacy fixed-height/absolute text positioning to avoid clipping, and at least 48px touch targets. Keep synthetic caption and accessible button expanded/busy/disabled states. No data-dependent splash blocking. UIKit automatic scroll insets avoid deprecated SafeAreaView and its Debug warning banner without a new native dependency. The title scrolls with the feed (legacy navigator fixed its header); this small presentation difference avoids pinning it under the status bar. These are bounded usability/reliability differences within issue #11, not a visual rewrite.
5. Retain the baseline triangle trivia as one fixture and its initial/show/hide assertions, adding order/IDs/image/text/author/long/empty/refresh/isolation/error/no-network tests. Update standalone XCTest to scroll between first and final cards, verify quote refresh and trivia behavior, portrait and relaunch. Screenshots and results stay under /private/tmp outside Git; compare captured migrated UI to source-derived contract because the legacy runtime is not safely reproducible with live/private data.
6. Hash all legacy and modern native path/type/bytes/link entries before builds; build only an external copy of the existing native project. Do not access or write the independent backup. Preserve config/lock/plugins/native policies. Run clean locked isolated npm ci, npm run verify (online compatibility and Doctor included), native source/sync and distinct processed Debug/Release policy checks, starter harness, strict OpenSpec and diff checks. Use unsigned builds and a new disposable simulator; no existing app data is replaced.

## Risks / Trade-offs

- [Legacy screenshots unavailable] → Report source-observed parity and intentional layout differences; do not claim pixel parity or production art approval.
- [Native build phases touch originals] → Copy native inputs externally, retain fingerprints and compare all original entries after validation.
- [Async refresh or list movement resets unrelated state] → Stable mounted keys and controlled overlapping refresh tests.
- [Hosted SDK recommendations drift] → Report actual failures; do not change dependency/security scope merely to pass.

## Migration Plan

Strictly validate planning artifacts before product edits, implement the small presentation slice with tests, run fresh locked full verification, then validate actual disposable iPhone rendering via Metro and the updated external XCTest runner. Document failures/retries and native preservation, update task evidence and deliver one scoped draft PR against main. Changes remain reversible source edits; no deployment, release, merge or OpenSpec archive occurs.

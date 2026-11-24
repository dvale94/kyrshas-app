# Issue #27 — real iPhone simulator evidence

Unmodified PNGs exported from actual XCTest screenshots, not rendered mockups or production artwork. Captured November 19, 2026 (America/New_York), iOS 27.2, dark appearance, synthetic/mock content. Source branch `feat/issue-27-afterglow-visual-foundation`; final change is documented in the [report](../../../../../.agentic/reports/issue-27-afterglow-visual-foundation.md). No app native build, signing, provider calls or owner-device changes.

| Evidence | Device / text | Observation |
|---|---|---|
| [Quote](compact-quote.png), [Trivia](compact-trivia.png), [Fact](compact-fact.png), [Dad Joke](compact-joke.png), [Bucket List Item](compact-bucket.png) | iPhone SE3, 375×667 points / 750×1334 PNG, default text | All five default chapters, accents, full category names, readable panels, native status area and visible navigation |
| [Standard Quote](standard-quote.png) | iPhone17, 402×874 points / 1206×2622 PNG, default text | Notched-device safe-area spacing, product/mode identity and reading hierarchy |
| [Shown answer after revisit](standard-answer-revisit.png) | iPhone17, default text | Labeled answer surface and retained trivia visibility |
| [Complete long answer](compact-long-answer.png) | iPhone SE3, default text, PagingFixture | Answer end marker and Hide Answer reachable; reading-edge swipe stays on Trivia |
| [Complete long fact and author](compact-long-fact.png) | iPhone SE3, default text, PagingFixture | Unicode café/三/🌌, final body marker and attribution reached through reading scroll |
| [Failed refresh retains answer](compact-retry-retained-answer.png) | iPhone SE3, default text, PagingFixture | Safe error, visible Retry and last-good question/answer remain |
| [Largest-text Quote](compact-largest-quote.png), [largest-text Bucket](compact-largest-bucket.png) | iPhone SE3, accessibility-extra-extra-extra-large | Refined full-width navigation labels, wrapped position/category, positive scrollable reading viewport |

All five default compact images, standard Quote/answer and representative long/error/largest captures were visually inspected. Largest-text captures intentionally show only part of the scrollable content; this is a viewport boundary, not text truncation. The native test checks positive reader geometry and usable controls on all five chapters. Manual long-content reading at the largest setting was not rerun in this pilot; default-size long-content native acceptance and automated font-scale/overflow regressions are separate evidence.

The pre-refinement largest-text capture showed a split Previous label; it was corrected to stacked full-width buttons and rerun successfully. Earlier results remain external rather than being silently discarded. Files here are selected final evidence (12 PNGs, 1,320,493 bytes), with no resizing, cropping or image-generation step.

Full logs, xcresult bundles, all 31 exported attachments, manifests and PNG SHA-256/source mappings remain at `/private/tmp/kyrshas-issue27/`. The original external runner is reused from `/private/tmp/kyrshas-issue25-20261119/ui-derived/Build/Products/KyrshaSmoke_iphonesimulator27.2-arm64.xctestrun`. Run instructions are in the [visual-foundation guide](../../../../migration/afterglow-visual-foundation.md).

The historical runner method `testLargestChapterChrome` was run at both default and largest settings; the actual device setting, not its method name, identifies each capture. Native runner accesses the accessibility tree to locate controls; it is not a manual VoiceOver/Switch Control audit. Those audits, physical-device review, final art overlays and formal performance profiling are NOT RUN and are not acceptance gates for issue #27.

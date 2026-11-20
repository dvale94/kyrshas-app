# Afterglow current-state design audit — Phase 04A

[Issue #23](https://github.com/dvale94/kyrshas-app/issues/23), November 19, 2026 (America/New_York). Baseline: fetched main `23a02c686c87d0e6bcb8e8405fd7d41cd5828d9e` (merged PR #22). Kickoff index/worktree clean. [OpenSpec proposal](../../openspec/changes/afterglow-design-specification/proposal.md), design, specs and tasks passed strict validation before these delivery documents were written. This is source/test inspection and design work, not a new device observation.

## Approval and reference evidence

Issue #23 approves **Afterglow — Cinematic Discovery Chapters**: five full-screen vertically swipeable snapping chapters, Quote → Trivia → Fact → Dad Joke → Bucket List Item; automatic subtle content entrance; midnight navy/indigo, sunset accents, immersive illustrated worlds and minimal floating controls. Positioning: **“Five little moments, just for you.”** This direction replaces the planned stacked-card presentation in future pilots. The running UI remains unchanged in 04A.

Both references were available and visually inspected as user attachments in this request:

| Reference | Provenance and visible evidence | Limits |
|---|---|---|
| Ref A: refined five-chapter board, headed “Kyrsha’s App / Afterglow” | Owner-supplied ChatGPT-generated conceptual board. Five phone mockups show lavender horizon quote, cosmic trivia/question mark, teal underwater fact, warm smiling-cloud joke and mountain/adventure bucket item; segmented progress, category pill, refresh and downward cue | No local path, repository asset, generation metadata, font identity, exact color sampling or shipping license established |
| Ref B: companion “Afterglow — Interaction States” board | Owner-supplied ChatGPT-generated conceptual board. Shows refreshing quote with retained text; trivia hidden/revealed answer; fact initial skeleton/loading; joke failed refresh with retained content and Retry | Illustrative state vocabulary, not proof of app behavior, timing, accessibility or backend guarantees |

The phone frames, status bars, board title, reflections and nebula outside each phone are presentation framing, not app UI. No image is copied into the repo and no production artwork is generated. References support composition and mood, not pixel fidelity or production asset rights. Written issue constraints control conflicts: the bucket checkbox does not authorize completion/persistence; the joke's differently colored punchline does not authorize parsing an unstructured provider string; a reference author of “Unknown” does not require inventing attribution.

## Observed implementation and proposed differences

Paths below are relative to `modernization/expo-next/` unless linked otherwise. Gortex identifies `App`, `HomeScreen`, `ContentCard`, `CardText`, `ImagePlaceholder` and `useHomeContent` in their named files; graph relationships aid navigation, actual source establishes behavior.

| Evidence | Observed implementation at baseline | Proposed Afterglow target / preservation |
|---|---|---|
| [App.tsx](../../modernization/expo-next/App.tsx), `App` | Module-level content-source selection; renders HomeScreen; no modern navigation stack | Keep composition/provider seam; five positions within one home, no new routes required |
| [HomeScreen.tsx](../../modernization/expo-next/src/home/HomeScreen.tsx), `HomeScreen` | Green `#38761d` screen/header, white app title 22; `#eff3f4` content; ordinary vertical ScrollView with automatic insets; five mounted keyed cards; honest mock/live-local caption | Midnight chapter canvas, snapping viewport and progress; retain exact five keyed identities and honest mode information without obstructing content |
| [ContentCard.tsx](../../modernization/expo-next/src/home/ContentCard.tsx), `ContentCard` | Uppercase content title/category fallback, 24 green heading; 48×48 minimum refresh; idle/loading busy/disabled; safe Loading/Refreshing/error/Retry copy; content retained during pending/error; optional image surface minimum 320 | Category pill and scoped floating control; preserve all state semantics; provide an opaque readable surface when art cannot support text |
| [CardText.tsx](../../modernization/expo-next/src/home/CardText.tsx), `CardText` | White centered 18/27 text, optional nonblank author 16/24; green panel or dark overlay; local answer visibility and accessible expanded Show/Hide control | Expressive but scalable text, no mandatory opening tap; optional author remains optional; no truncation; retain answer contract |
| [ImagePlaceholder.tsx](../../modernization/expo-next/src/home/ImagePlaceholder.tsx), `ImagePlaceholder` | Local colored View sun/land geometry; one accessible image label; descendants decorative; no remote image renderer | Separate category world from content data; decorative world hidden from assistive tech unless meaningfully labeled; no remote photos or payload-contract expansion |
| [fixtures.ts](../../modernization/expo-next/src/home/fixtures.ts), `HOME_CARDS` | IDs exactly `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`, in that order. Two synthetic variants each. Local image metadata for quote/fact/bucket; no date/randomness | Keep IDs/order and synthetic test data. New worlds can decorate every category without requiring content.image |
| [content.ts](../../modernization/expo-next/src/home/content.ts), `normalizeContent`, `createMockContentProvider` | Typed trivia-only required answer; nonblank title/text; trims author; matching identity; known fields only; validates local label/three six-digit colors; mock 650ms delay owned by provider, revision-based variant rotation | Preserve validated seam and mock-owned delay. Art is presentation-owned; no new text/provider fields needed for layout |
| [useHomeContent.ts](../../modernization/expo-next/src/home/useHomeContent.ts), `useHomeContent` | All five initial loads independently start; per-ID pending token guard; successful revision increments only after normalization; failures retain last-good; effect generation protects replacement/unmount; old-provider data withheld before replacement effect | Keep mounted orchestration above paging; chapter changes must not load data or recreate provider; navigation, reading and answer state are independent |
| ContentCard + CardText revision key | Only successful revision remounts text; new trivia starts hidden. Pending/error and unrelated refresh preserve answer | Revisit keeps answer; successful refresh, including same returned question, resets answer. Do not reset on swipe |
| ContentCard announcement effect | Startup/loading has no explicit iOS announcement; explicit user action announces its settled outcome once; replacement idle discards pending intent | Preserve quiet startup; focused chapter announcements and offscreen outcomes require careful implementation to avoid competing speech |
| [contentSource.ts](../../modernization/expo-next/src/home/contentSource.ts), `createContentSource` | Disk-backed read confirms `__DEV__` guard before settings; exact `live-local` and valid local key opt-in; otherwise mock; production does not read mode/key | Preserve unchanged. Do not read local env or use provider credentials to audit visuals |

No source-observed paging, chapter-progress model, entrance animation, Reduce Motion handling or final illustrated Afterglow design exists in the inspected modern home path. Existing successful historical screenshots are evidence for earlier green UI pilots, not this visual target. New runtime geometry, screen-reader behavior, performance and pixel fidelity are **NOT RUN** in 04A.

## Test evidence and gaps

Inspected test files, not re-executed as part of the audit:

| Test source | Current coverage to preserve | Future evidence needed |
|---|---|---|
| [App.test.tsx](../../modernization/expo-next/__tests__/App.test.tsx) | Exact order, optional media/author, no birthday; Show/Hide; each category refresh; independent/overlapping actions and duplicate guard; failure retains content/answer; successful trivia reset; long text/no empty optional controls; fetch/XHR sentinels | Replace green-layout expectations only in an approved visual pilot; retain behavior assertions and network prohibition |
| [Orchestration.test.tsx](../../modernization/expo-next/__tests__/Orchestration.test.tsx) | All five start before completion, out-of-order success, partial failure, same-tick duplicates, old-provider success/error, unmount, invalid content/media/answer, revision retry/wrap | Same content semantics while paging/revisiting and when inactive content settles |
| [Presentation.test.tsx](../../modernization/expo-next/__tests__/Presentation.test.tsx) | Unicode/multiline/long title/body/author/answer, scaling/no clipping props, local-art semantics, malformed media recovery, 48px controls, white-on-green/overlay contrast, repeated action announcements without startup flood | New token/composite contrast, small-screen full text/control reachability, page focus, overflow reading, VoiceOver/Switch Control and Reduce Motion; prop tests do not prove actual geometry or auditory behavior |
| [LocalContent.test.tsx](../../modernization/expo-next/__tests__/LocalContent.test.tsx) | Synthetic transport and key only; production/mock guards, query-free Free trivia, repeat acceptance, input/stream bounds/redirects/deadlines/errors and existing UI state integration | Presentation must not alter routes, entitlement behavior, mock selection or request counts; no live calls are needed for design QA |

Historical PR #22 report records 118 Jest cases/four suites passing. That result belongs to the prior implementation; it is not a new execution claim. See [04A report](../../.agentic/reports/issue-23-afterglow-design.md) for current check outcomes.

## Dependency and platform baseline

[Modern manifest](../../modernization/expo-next/package.json) declares Expo `~58.0.26`, React `19.3.0`, React Native `0.88.1`, splash-screen `~58.0.14`, status-bar `58.0.5`; Node `22.23.4`, npm `10.9.9`. No pager, gesture, illustration-rendering, custom-font or animation package is directly declared beyond React Native/Expo. Do not infer a transitive package is available for adoption. These are exact declarations, not a new installed/native compatibility check.

Issue #23 retains **iPhone-only portrait**, bundle ID **`com.dvale1994.kyrshasapp`**, SDK 58 and no release infrastructure. This documentation does not re-inspect native configuration or approve device-family/ATS/signing changes. Both ignored native trees and owner's separate backup remain preserved; backup is neither accessed nor written.

## Historical records and security precedence

[Product brief](../product/brief.md), [architecture](../architecture.md) and [legacy audit](expo-audit.md) explicitly describe source-observed legacy behavior. Their October 3 birthday preservation and tablet/Android/light/green notes are historical. Later [03F/local content record](expo-next-local-content.md), prior handoff and **issue #23** permanently exclude birthday from the modern app and establish this pilot's iPhone portrait/Afterglow target. Do not reinstate birthday, import personal content, add date tests or delete legacy messages/assets. Preserve original source and historical records unchanged.

[03B](expo-next-home-ui.md), [03C](expo-next-content-orchestration.md), [03D](expo-next-content-parity.md) and prior unarchived OpenSpec changes establish the green UI and its progressively strengthened contracts. Their old deferred-03E references do not override the later no-birthday decision. Afterglow supersedes green presentation only as a future approved design direction, not by silently rewriting these records.

API Ninjas remains direct only in explicitly enabled **local development `live-local`**, with owner-managed gitignored `.env.local`; default and production remain mock. No proxy/server/database, production credential change, provider call or remote-photo feature belongs here. Never open historic credential-bearing configuration or private env. The verification contract's old credential-comparison procedure is inapplicable because issue #23 explicitly forbids reading private credentials; use a documentation-only allowlist and synthetic/static checks instead.

## Package entry points for review

Read [visual specification](../design/afterglow/visual-specification.md), [interaction model](../design/afterglow/interaction-model.md), [feasibility/accessibility](../design/afterglow/feasibility-accessibility.md) and [implementation roadmap](../design/afterglow/implementation-roadmap.md). Exact palette/type/timing values are implementer recommendations; owner approval attaches to the written Afterglow direction, not an assumed production asset/font/license.

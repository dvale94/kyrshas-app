# Synthetic home content presentation — Pilot 03D

[Issue #15](https://github.com/dvale94/kyrshas-app/issues/15), base main `347b6c4` (merged PR #14). [OpenSpec](../../openspec/changes/home-content-edge-parity/proposal.md) passed strict complete planning before product edits. User authorization covers bounded implementation and draft delivery. This phase refines synthetic presentation; it does not establish production image/pixel parity.

## Legacy reference and deliberate refinements

Legacy ContentContainer renders optional media with text overlay; TextContainer displays white body/author, green answer controls and Show/Hide. Legacy ApiProvider supplies image-backed quote/fact/bucket-list and text-only trivia/joke, and home uses one ordered scrolling screen. Preserve canonical IDs/order, green `#38761d`, white attribution and independent actions. Remote/base64 rendering and personal birthday content are excluded. Modern last-good/retry/stale/duplicate protections and successful-trivia reset remain unchanged in `useHomeContent.ts`/`content.ts`.

Current content titles now display in the heading (default titles are unchanged); action labels retain the canonical category identity. Long headings wrap beside a nonshrinking 48px refresh control. Panels fit available width; attribution wraps within the panel and stays right-aligned. Body/answer/author have no truncation or fixed height, retain font scaling and grow with the scrolling feed. The existing dark overlay provides readable white text even against white synthetic artwork. Plain panels retain brand green. These are minimal readability refinements, not a redesign.

## Local media and test content contract

`PlaceholderImage` is optional `{ label, sky, land, sun }`: a nonblank accessible label and three six-digit `#RRGGBB` colors. It describes locally authored shapes only. Omit `image` for a text-only green panel. Supplied null/wrong-shaped metadata, blank labels or malformed colors are errors, not silent valid images; the unchanged normalizer converts them into the existing isolated safe card error/Retry. Refresh errors retain last-good content. Extra remote URI/base64/transport ingestion is not implemented. Future real-media transport, cache/error behavior and backend/security design belong to #03F.

A compact test-only `__tests__/fixtures/contentEdges.ts` provides Unicode, escaped punctuation, line breaks, very long body/author/title/question/answer, short/no-image fact, joke and local-image bucket variants. Default feed fixtures and650ms mock delay remain familiar. The test fixture is never imported by the normal application. An external-only simulator App.tsx can inject `edgeProvider` through the existing HomeScreen prop; no product test-mode flag or arbitrary latency is introduced.

## Announcement and accessibility policy

- Startup and loading issue no explicit iOS announcements. Accessible polite loading text, busy/disabled action states and safe alert/Retry guidance remain available.
- An explicit user refresh/retry arms only that card. Its settled success or error announces once on iOS; unrelated content, answer toggles and repeated renders do not announce. The pending-action flag is checked after every commit so React batching cannot suppress repeated immediate failures with identical status/revision/message. A provider replacement's idle state discards pending intent. Android uses existing live-region semantics without duplicate explicit iOS calls.
- Refresh/retry retain canonical category labels and helpful hints; trivia retains Show/Hide names and expanded state, with contextual hints.
- Each local illustration exposes one image label. Shape descendants and spinner decoration are non-focusable; actual content remains readable to assistive technology.

Mock assertions establish call policy and accessibility props. Actual auditory VoiceOver review is NOT RUN unless separately recorded. Concurrent user-requested outcomes can each announce; no global queue or initial success flood is added.

## Reproduction and evidence

Use pinned Node22.23.4/npm10.9.9 in a clean external scaffold copy preserving `../../assets`. Run `npm ci --no-audit`, unchanged `CI=1 npm run verify`, native-source checker, synchronizer `--check`, both policy fixture files, root harness/Python syntax, whitespace/scope and strict current/repository-wide OpenSpec. Never run legacy Expo scripts or load legacy dotenv.

Generate the standalone external runner with `scripts/ios-smoke/create-runner.rb`. Normal acceptance selects `-only-testing:KyrshaSmoke/SmokeTests/testSyntheticIPhoneSmoke`; edge acceptance selects `testSyntheticContentEdges` against an external entry importing `edgeProvider` from `./contentEdges.native`. In the external copy only, copy `__tests__/fixtures/contentEdges.ts` to `contentEdges.native.ts` and change its type import to `./src/home/content`. Metro intentionally excludes `__tests__`; importing directly from it fails resolution. Do not weaken Metro configuration or add this copy to product source. Stop Metro before switching the external entry and restore it byte-for-byte afterward. Use a newly created disposable iPhone, the approved localhost Metro loop and the previously verified unsigned native binary only if native inputs match. Native projects are neither regenerated nor changed. Edge smoke checks complete story/attribution, long heading/prompt/answer, control reachability, short no-image multiline fact and final image-backed bucket card. For scaled-text acceptance, set only the disposable device with `xcrun simctl ui <id> content_size accessibility-medium` and rerun the edge method. Restore `large` before normal smoke. The runner chooses bounded scroll direction from target geometry: collapsing a large answer can move the next target above the viewport. Keep logs, screenshots and xcresult external.

Actual command results, native provenance, screenshot observations, preservation hashes, limitations, hosted CI and workflow metrics are recorded separately in the [delivery report](../../.agentic/reports/issue-15-content-parity.md). Physical devices, production artwork/launch/pixel parity, installed upgrade, personal/birthday/live content and signing/release remain outside this phase.

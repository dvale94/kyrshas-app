# Design

## Context

See proposal for motivation. PR #14 already owns asynchronous content validation and five independent slots. Current PlaceholderImage is optional label/sky/land/sun, normalized to nonblank text and six-digit colors. CardText already grows and omits blank authors; image panels have a minimum height, not fixed height. Current ContentCard announces every message on iOS, including startup/loading/ready for all cards. Headings reserve flexible space beside 48px refresh; baseline tests cover long bodies but not long headings/answers or announcements.

Observed legacy ContentContainer conditionally renders media and overlays TextContainer; TextContainer uses white body/author, green trivia control and local answer toggle. Legacy provider assigns images to quote/fact/bucket-list, and home is a single ordered list. Preserve this hierarchy, not its remote/base64 implementation or fixed-layout clipping risks. Current modern hook's failure/stale/last-good improvements remain unchanged.

## Goals / Non-Goals

**Goals:** demonstrate robust content variants with small, reviewable presentation corrections and purposeful feedback; preserve all existing tests and async contracts.

**Non-Goals:** generalized media pipeline, new provider architecture, real-image parity, navigation, live/personal content, native regeneration or security/config/dependency changes.

## Decisions

1. Reuse the existing optional PlaceholderImage and normalizer. Document its local-only semantics and test missing/invalid/valid cases across image categories. Adding a new transport/image union would make future architectural choices prematurely. Remote image transport, caching and security remain #03F.
2. Put a compact synthetic edge set under test fixtures, injectable through the existing provider. Reuse it for external-only simulator entry injection. Do not expand default feed variants or change mock latency.
3. Keep growing text and minimum-height artwork; make heading/control shrink behavior explicit and ensure attribution/panels fit available width. Keep white-on-green text and a consistently dark image overlay independent of placeholder colors. Any correction must be supported by tests/native evidence. Preserve card order/brand and 48px actions.
4. Track a pending user action locally at the card's press handler. On its next nonbusy transition announce the ready/error message once on iOS, clearing the intent; never explicitly announce routine startup or loading. Existing loading live regions and generic alert/retry text remain. This avoids a global announcement scheduler or any hook change. Test startup, refresh, failure/retry, unrelated updates and Android. Provider-generation replacement is tested for absence of stale announcements if a pending intent needs invalidation.
5. Expose one accessible image per placeholder; hide shape descendants and spinner decoration. Keep trivia state/labels and add helpful toggle/action hints without leaking implementation details.
6. Reuse verified prior unsigned Debug application binary because native inputs are unchanged. Run normal smoke and separate edge XCTest through localhost Metro on newly created disposable iPhone(s); external injection only. Expand the standalone runner with an explicit edge method while normal smoke stays valid. Capture representative long image/no-image/answer and scaled text where practical. Record physical/auditory/production acceptance separately.

## Risks / Trade-offs

- Arbitrary very long text increases scrolling → retain natural height, verify bottom content and reachable controls on native iPhone.
- Component tests cannot prove native layout or auditory VoiceOver → separate native screenshots/geometry from mock announcement assertions; auditory review NOT RUN unless actually performed.
- Concurrent user actions can each settle → one announcement per explicit action, no startup flood; no global queue introduced.
- Prior native binary reuse could conceal dependency drift → fingerprint package/config/native inputs, provenance and processed Debug/Release policy; rebuild only on justified changed native inputs.
- Gortex impact is a lower bound → retained executable suites, native smoke and scoped diff review complement graph checks.

## Migration Plan

Strictly validate all four artifacts before product code. Implement presentation and edge tests; run clean external npm ci/full unchanged verify and policy/harness/OpenSpec. Execute normal and edge native acceptance, restore external entry byte-for-byte, stop Metro/shut down disposable phone, repeat fingerprints. Document separate local/native/hosted outcomes and metrics; create one draft PR. Rollback is reverting scoped source/tests/docs only; neither native tree is rewritten. No deployment or archive.

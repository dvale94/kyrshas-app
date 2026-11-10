# Product brief

Status: source-observed baseline for [issue #1](https://github.com/dvale94/kyrshas-app/issues/1), November 9, 2026 (America/New_York). The behaviors below are implemented in inspected source; they have not been verified on a running device. Product intent remains unconfirmed.

## Observed application

The app presents a single personalized home feed with quotes, trivia, facts, dad jokes and bucket-list suggestions. This description follows `App.js`, `src/screens/HomeScreen/useHomescreen.js` and `src/api/ApiProvider.js`; it is not a newly approved MVP specification.

| Source-observed behavior | Evidence |
|---|---|
| One route named `Kyrsha's App` with a vertical list of content cards | `App.js`; `src/screens/HomeScreen/HomeScreen.js` |
| Initial quote, trivia, fact, dad-joke and bucket-list ordering; quote/trivia category randomization | `src/screens/HomeScreen/useHomescreen.js`; `src/api/ApiProvider.js` |
| API-backed content, background images on quote/fact/bucket-list cards, optional quote attribution | `src/api/ApiProvider.js`; `src/screens/HomeScreen/components/ContentContainer.js`; `TextContainer.js` in the same directory |
| Per-card refresh action with loading indicator | `src/screens/HomeScreen/components/ContentContainer.js`; provider callbacks in `src/api/ApiProvider.js` |
| Show/Hide Answer control for trivia | `src/screens/HomeScreen/components/TextContainer.js` |
| Extra birthday content inserted first on October 3, with a birthday-specific image rendering path | `src/screens/HomeScreen/useHomescreen.js`; `src/screens/HomeScreen/birthdayData/data.js` provider reference; `src/screens/HomeScreen/components/ContentContainer.js` |
| Green branding, portrait/light configuration and iPad/tablet support intent | `App.js`; component styles; `app.json` |

Ten personalized WebP photos are tracked under `src/screens/HomeScreen/birthdayData/images/`. Preserve the original birthday content/assets during future work; this audit does not reproduce personal messages or images.

## Unconfirmed intent and boundaries

The name and personalized birthday content suggest a personal-use audience, but intended users, distribution, business purpose and highest-value jobs have not been confirmed. No new features, redesign or product scope are inferred from the source.

The inspected runtime has no user account/login, payment, notification or deep-link flow, and no demonstrated durable-storage use. This is a bounded source finding, not proof about installed binaries or external services. API access and content availability depend on external configuration/provider permissions. Startup and refresh failure behavior need validation; a successful user journey is not established by source inspection alone.

## Preservation and future acceptance

A future approved modernization should preserve the observed route, card behavior/order, trivia toggle, birthday condition and personalized assets unless a separate specification explicitly changes them. Preserve app identity and any existing user/native state once inventoried. Proposed acceptance evidence is an iOS/Android device comparison using safe API fixtures, normal and failed requests, and birthday/non-birthday dates. See [architecture](../architecture.md), [verification](../verification.md) and the [migration preservation contract](../migration/expo-audit.md).

Platform priorities (including whether web is required), intended audience and any behavior changes belong in the next product/specification phase. They do not block delivery of this read-only audit. No implementation or release is approved here.

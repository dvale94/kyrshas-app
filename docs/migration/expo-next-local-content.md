# Local random API content — Pilot 03F-B1

The [updated issue #19](https://github.com/dvale94/kyrshas-app/issues/19) replaces its former Worker/backend plan entirely. This is a personal experiment on the owner's Mac and disposable iPhone simulator, running Expo development mode only. The owner accepts that the new temporary key is readable in the local Metro JavaScript bundle. **Gitignored does not mean encrypted or confidential. Anyone obtaining the bundle or network/device access may recover it.** EAS/dashboard Secret cannot hide an `EXPO_PUBLIC_` value inlined into client JavaScript.

The application stays in deterministic mock mode unless development runtime, exact `EXPO_PUBLIC_CONTENT_MODE=live-local` and a valid nonblank local `EXPO_PUBLIC_API_KEY` are all present. Production selects mocks before reading the credential or initializing live transport. Live cards display “Live local development · API Ninjas”; mock mode displays “Offline demo · synthetic content”. This guard does not make a distributed bundle safe. Never export/share a bundle containing a real key.

## Owner-only setup

These steps are instructions for the owner, **not actions performed by the agent**. No real `.env.local` has been created, populated or read during implementation. Never send a key in chat, a GitHub issue, shell argument, log, screenshot or PR artifact. Never reuse or inspect the historic exposed credential; its owner should revoke it through API Ninjas if it is still active. This task does not access the account or revoke credentials.

1. Select the pinned Node22.23.4/npm10.9.9 environment in `modernization/expo-next` (`nvm use` where installed). Use the existing locked dependencies. Do not run root legacy Expo commands.
2. Before entering any value, run the safe metadata-only checks from the repository root:

   ```sh
   git check-ignore -v modernization/expo-next/.env.local
   git ls-files -- modernization/expo-next/.env.local
   git log --all --format=%h -- modernization/expo-next/.env.local
   ```

   The first must show the app `.env*` ignore rule; the other two must be empty. Never use `git add -f`, `cat`, environment dumps or config dumps on this file. The committed `.env.example` is the only exception to that rule.
3. Privately create `modernization/expo-next/.env.local` using a local editor. Copy the **placeholder-only** `.env.example` structure; replace its key placeholder with a **new account-issued local key** and change mode from `mock` to `live-local`. Do not place the key in any tracked config, EAS profile or shell history. Confirm provider entitlement/terms and quota privately first. Trivia uses the Free-compatible unfiltered random endpoint without premium parameters; no subscription or paid service is provisioned here.
4. From the app root, start the installed CLI directly so Expo standard dotenv loading is enabled:

   ```sh
   env -u CI -u EXPO_NO_DOTENV -u EXPO_PUBLIC_API_KEY -u EXPO_PUBLIC_CONTENT_MODE \
     EXPO_NO_TELEMETRY=1 ./node_modules/.bin/expo start --localhost --port 8081
   ```

   Expo58 loads app-root `.env.local` and substitutes literal `process.env.EXPO_PUBLIC_*` references into development JS. The existing `npm start` deliberately sets `EXPO_NO_DOTENV=1`, so it is the safe mock workflow, not the live setup command. Restart Metro and fully reload the simulator after env edits; Fast Refresh alone is not reliable for changed env values. Use only the verified disposable simulator/existing unsigned Debug app under the [native policy](expo-next-development-loop.md). Do not prebuild/regenerate, change ATS, use a physical owner device or create/distribute EAS/preview/TestFlight/OTA builds.
5. Confirm the mode caption without opening developer network inspectors or recording request headers/bundles. **Actual provider testing still requires a separate explicit owner authorization.** Do not ask for the literal key. Do not collect live screenshots/logs or bundle artifacts containing credentials. Keep temporary credential-bearing Metro caches/device data private.

## Revert to deterministic mocks

Privately set local mode to `mock` (or remove the opt-in/key), stop Metro, restart and fully reload. To force mocks without reading dotenv or changing the private file:

```sh
cd modernization/expo-next
env -u CI -u EXPO_PUBLIC_API_KEY -u EXPO_PUBLIC_CONTENT_MODE \
  EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 ./node_modules/.bin/expo start --localhost --port 8081
```

Confirm the offline synthetic caption and familiar triangle question. Test/verify/export scripts continue to disable dotenv; automated verification also clears inherited public credential/mode variables. Never upload the private env, development caches, native artifacts or Metro bundle.

## Endpoint reconciliation and behavior

Public provider docs checked November19,2026; documentation research makes no authenticated request. The adapter uses fixed `https://api.api-ninjas.com` routes and only the fixed `Accept`/`X-Api-Key` headers. It accepts no configurable base URL, arbitrary header, image route, account operation, binary data or redirect. Each initial load/refresh/retry issues one new request for that card; there are five initial calls, no automatic retries and no uniqueness guarantee. Pending same-card calls share one request. No persistent content cache exists; last-good text stays in memory only.

| Card | Documented request and response | Reconciliation |
|---|---|---|
| Quote | [`/v2/randomquotes?categories=<topic>`](https://api-ninjas.com/api/quotes), one-item array with quote and optional author | Current `/v2/quotes` is deterministic. Random topics: courage, happiness, inspirational, life, love. Historic dreams is absent from current docs and deliberately excluded; no undocumented fallback. |
| Trivia | [`/v1/trivia`](https://api-ninjas.com/api/trivia), one-item array with question and answer | Free-compatible unfiltered random question on every load/refresh. Exact URL has no query: omit premium-only category, limit and safe. The Free catalog is limited (currently 100 questions); repeats are possible and unique/new content is never guaranteed. |
| Fact | [`/v1/facts`](https://api-ninjas.com/api/facts), one-item array with fact | Default single result; omit premium limit parameter. |
| Dad joke | [`/v1/dadjokes`](https://api-ninjas.com/api/dadjokes), one-item array with joke | Default single result. |
| Bucket list | [`/v1/bucketlist`](https://api-ninjas.com/api/bucketlist), object with item | No parameters; deliberately differs from array routes. |

Live cards are text-only. Existing local geometric mock placeholders and all five IDs/order remain unchanged. Normalization bounds display fields to2000 characters. The adapter uses installed [`expo/fetch`](https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api), whose [native redirect implementation](https://github.com/expo/expo/blob/sdk-58/packages/expo/ios/Expo/Fetch/NativeResponse.swift) refuses redirects in error mode; it additionally rejects changed final URLs. It reads at most16KiB of accepted JSON bytes, checks Content-Length/type, and gives the entire request/body operation8seconds before abort/cancel. Native networking may buffer data before JavaScript receives chunks; this is not a hard native-process memory cap against a malicious provider.

Non-200/429, entitlement, timeout, network, empty/malformed/oversized and missing-answer failures become generic per-card errors. Raw provider bodies, headers and exceptions are discarded with no adapter logs. Existing UI loading/refresh/retry, last-good content, trivia answer reset, obsolete-provider protection and accessibility remain covered by tests. Error presentation retains the existing generic example wording. Live mode reports provider failures honestly and never silently substitutes synthetic success.

Review [provider terms](https://api-ninjas.com/terms), [pricing/quotas](https://api-ninjas.com/pricing) and content licensing before any external sharing; local functionality does not establish redistribution rights, attribution clearance or editorial suitability. Quote topic parameters can fail under the owner's plan. Trivia has no topic or safety filter; random text may repeat or be unsuitable. No live success or entitlement has been established here. [Issue #21](https://github.com/dvale94/kyrshas-app/issues/21) corrects only the former premium trivia category request; quote, fact, dad-joke and bucket-list routes retain their existing behavior.

## Verification and future boundary

See the [issue report](../../.agentic/reports/issue-19-local-content.md) for exact local/hosted/simulator outcomes and metrics. Automated tests use synthetic credentials and fake streamed transport with network sentinels; existing CI and full verify remain unchanged and dotenv-disabled. Original native trees/ATS/default/Release/Debug-localhost rules, dependencies and legacy source are preserved. Live-provider acceptance is **NOT RUN** pending private owner setup and explicit authorization.

Random photo backgrounds are optional future scope requiring a separate approved change; no external images are requested here. Birthday content is excluded.

A future distributed release **requires a separate server-side proxy/Worker**, a new scoped provider credential, rights/quotas/security review and explicit owner approval. This change implements no gateway/Worker/backend, deployment infrastructure, public sharing, birthday, native regeneration, production access, merge, release or OpenSpec archive. Historical curated-feed planning remains as evidence; [ADR0002's addendum](../decisions/0002-secure-content-delivery.md#local-only-owner-decision-addendum--november-19-2026) supersedes that recommendation only for this local development scenario.

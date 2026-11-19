# Design

## Context

See proposal.md for the owner-approved local scope. Current `ContentProvider.load(id,{revision})`, normalizer and hook already isolate five independent requests, suppress duplicate actions, retain last-good data, ignore obsolete provider completions and manage trivia revisions. Preserve these contracts and the 62-test baseline. Existing app scripts disable dotenv; the explicitly documented local live command must bypass `npm start` to enable Expo standard dotenv loading. Both original native trees are ignored and must remain unchanged.

## Goals / Non-Goals

**Goals:** Minimal typed adapter and mode selection; bounded HTTPS operations; synthetic integration tests; accurate local setup and verification evidence.

**Non-Goals:** No server/Worker/gateway, distributed builds, birthday, images, provider account access, real credential reads, dependency changes, native regeneration or security-policy changes.

## Decisions

1. Select once at app bootstrap. Evaluate `__DEV__` before reading public environment fields or loading the live module. Require exact `live-local` mode and a nonblank bounded header-safe key. The adapter factory also checks `__DEV__`; production cannot bypass selection to use it. Keep mock as the unchanged default for direct HomeScreen callers/tests. Add an optional live mode caption prop without changing provider/hook contracts.
2. Use the installed Expo 58 `expo/fetch` API via a lazy default transport; its native implementation rejects redirects with `redirect:error` and exposes streamed response bodies. Do not rely on React Native's legacy XHR redirect behavior. Set only fixed method/Accept/X-Api-Key headers and omit cookies. Compare final URL too; never accept arbitrary origin/config overrides. Stream at most16KiB, bound Content-Length and strings, race the full operation against8s, abort/cancel on failure and always clear timers. No automatic retries or persistent response cache. Share only pending same-card promises, releasing them after settlement.
3. Public docs checked November19,2026: quote uses `/v2/randomquotes?categories=<topic>`, preserving courage/happiness/inspirational/life/love. Old dreams is undocumented and omitted explicitly. Trivia `/v1/trivia?category=<topic>` preserves entertainment/general/historyholidays/fooddrink; category is premium-only, so entitlement is an owner smoke prerequisite. Fact `/v1/facts`, dad joke `/v1/dadjokes` each return one-item arrays by default; bucket `/v1/bucketlist` returns an object with item. Require exact single-item arrays, nonblank bounded display fields and trivia answer; ignore all unexpected media/extra fields. Provider results may repeat. Use text-only live cards, no remote image path.
4. Automated tests inject fake transport and synthetic credentials. Exercise real adapter through the existing UI seam, not an imitation implementation; preserve existing hook tests. Verify production selection skips environment key getters and transport module initialization. No real .env.local or legacy secret is created/read. The existing `.env*` rule already protects the exact path; add only `!.env.example`.
5. Append an explicit local-only supersession to ADR0002 and roadmap, retaining historical evidence. Future distributed use requires a separately approved server-side proxy/Worker, new scoped credential and provider rights review. No infrastructure implemented here.

## Risks / Trade-offs

- Readable client key → owner explicitly accepts only local Metro development; do not distribute bundles, screenshots, logs or device/network access containing it. Gitignore is not encryption; EAS Secret cannot hide an inlined key.
- Provider docs and entitlements may differ at runtime → synthetic mapping proves adapter behavior only; owner must privately create a new key and separately authorize live acceptance. No undocumented endpoint fallback or free/premium entitlement claim.
- Native fetch may buffer chunks before JS consumes them → stream/abort limits accepted application data; it is not a hard native-process memory limit against a hostile provider. Fixed HTTPS provider and deadline contain exposure.
- Random topics/results can repeat or include unsuitable content → no uniqueness guarantee or editorial safety claim; inspect only in this private local experiment. No persistence or public redistribution.
- Graph impact coverage is incomplete → run full existing regression checks, policy fixtures and actual disposable simulator mock smoke; disclose graph warnings.

## Migration Plan

Strictly validate all new planning artifacts before product edits. Keep ignored native metadata snapshots before/after; never use backup, clean, prebuild or Pods. Run unchanged locked full isolated verify with pinned Node/npm, root harness, strict repository specs, native source/sync/processed policies and existing simulator smoke using a verified prior unsigned Debug binary plus dotenv-disabled mock Metro. Keep artifacts external. Submit one draft PR to main with hosted CI, report and metrics. Rollback locally by removing live-local flag/key from the owner's private env and restarting/reloading Metro, or use the documented dotenv-disabled mock command. Do not archive.

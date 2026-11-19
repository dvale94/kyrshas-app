# Secure live-content architecture — Pilot 03F-A

**Proposed, documentation only.** [Issue #17](https://github.com/dvale94/kyrshas-app/issues/17), fetched directly with zero comments; main `0c829f354a135b5bfdcfe48fb9412944c2a1e188`. Research accessed November 17, 2026 (America/New_York). No authenticated/content API requests, credential inspection, provisioning or product changes. Complete [OpenSpec](../../openspec/changes/secure-live-content-architecture/proposal.md) and repository-wide strict validation (7/7) passed before this delivery document. [ADR](../decisions/0002-secure-content-delivery.md), [threat model](secure-content-threat-model.md), [roadmap/approval gate](secure-content-roadmap.md), [acceptance plan](secure-content-verification.md).

## Observed baseline and precedence

Safe source evidence: `src/api/ApiProvider.js`; `modernization/expo-next/src/home/{content.ts,useHomeContent.ts,fixtures.ts,HomeScreen.tsx}`; prior orchestration/presentation specs and audits. The provider interface is `load(id, {revision}): Promise<CardContent>`. The revision counts successful loads, not request attempts or a global server cursor. The hook starts five independent requests, suppresses duplicate in-flight requests per card and ignores obsolete provider/unmount completions. Failed refresh retains last-good content; provider error payloads are neither displayed nor logged. Trivia requires an answer and successful replacement resets its visibility; unrelated/failed refresh preserves it. Canonical order and IDs: `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`.

`PlaceholderImage` is a label and three hex colors for locally drawn shapes. It is not URI/base64 transport. No remote-media migration is assumed. Platform remains iPhone only; Release/default ATS denies insecure HTTP; the existing Debug exception is localhost only. No permission, identity, signing or native change is proposed.

The historical [brief](../product/brief.md), [architecture](../architecture.md), [audit](expo-audit.md) and [verification](../verification.md) describe old birthday preservation/testing. **Issue #17 and the current owner instruction supersede that modern behavior: birthday is permanently excluded**, including date checks, personal messages, photos and private assets. This package preserves legacy files/native state and does not import private content. Old deferred-03E handoff wording is historical, not a future task.

## Five-provider inventory: observed code versus public documentation

All five legacy categories depend on one vendor, API Ninjas; they are five adapter methods, not five independent vendors. The audit identifies host `api.api-ninjas.com`; credential-bearing transport/EAS/environment files were deliberately not opened. Relative paths below are observed in `ApiProvider.js`; fully versioned candidate paths come from current public docs. Neither path's live behavior was tested.

| Canonical ID / order | Legacy request, selection and response mapping | Image use | Documented candidate for optional server ingestion |
|---|---|---|---|
| `quote` / 1 | `/quotes?category=...`; uniformly selects one of `courage`, `dreams`, `happiness`, `inspirational`, `life`, `love`; first array element's `quote` → text wrapped in quotation marks; `author` → optional attribution | Extra nature image request before text | [Quotes](https://api-ninjas.com/api/quotes): `/v2/randomquotes`; array with `quote`, `author`, `work`, `categories`. Current categories include five legacy names but omit `dreams`; parameter is `categories`, not legacy singular `category`. `/v2/quotes` is deterministic. Do not silently map dreams or assume v1 compatibility. Owner approves dropping that filter or a curated dreams theme. |
| `trivia` / 2 | `trivia?category=...` (no leading slash); one of `entertainment`, `general`, `historyholidays`, `fooddrink`; first array element `question` → text, `answer` → required answer | Empty string, text-only | [Trivia](https://api-ninjas.com/api/trivia): `/v1/trivia`; array of `category`, `question`, `answer`; those four filters are documented and premium-only. |
| `fact` / 3 | `/facts`; first array element `fact` → text | Extra abstract image after text request | [Facts](https://api-ninjas.com/api/facts): `/v1/facts`; array of `fact`. |
| `dad joke` / 4 | `/dadjokes`; first array element `joke` → text | Empty string, text-only | [Dad Jokes](https://api-ninjas.com/api/dadjokes): `/v1/dadjokes`; array of `joke`; free catalog is smaller. |
| `bucket list item` / 5 | `/bucketlist`; object `item` → text (unlike the four array parsers) | Extra abstract image after text request | [Bucket List](https://api-ninjas.com/api/bucketlist): `/v1/bucketlist`; object `item`, no parameters. |

Legacy first-load fan-out is eight calls: five text plus three image requests at 375×667. Legacy cloning via JSON serialization is not validation. Empty arrays, wrong encodings and malformed data were assumed away. A new adapter must validate before publication and at the mobile seam, rather than copy those assumptions.

[Random Image documentation](https://api-ninjas.com/api/randomimage) marks size/category controls premium-only and requires an image Accept header. It describes binary JPEG and base64 wording inconsistently; encoding must be resolved by provider confirmation/controlled smoke if media is ever approved. No image request or image asset was fetched in this pilot.

## Provider rights, availability and evidence confidence

**Verified documentation, not account entitlement or legal clearance:** [API Ninjas pricing](https://api-ninjas.com/pricing) lists Free at 3,000 calls/month and 100/hour, attribution required, noncommercial, no caching/storage. Developer lists 100,000/month, commercial use, no caching/storage. Business lists 1M/month and permits caching/storage; displayed price pairs are Developer $59/$39 and Business $149/$99, with billing selector unresolved in the retrieved page. Budget conservatively at $149/month for Business; confirm checkout, commitment, taxes and actual account entitlements before purchase. Paid plans list no vendor rate limit; this does not remove our own caps.

[Terms](https://api-ninjas.com/tos), updated November 4, 2026, restrict Free output distribution, competitive API substitutes, and continued output use after paid entitlement ends. **Do not treat a Business subscription alone as permission to redistribute a general feed.** Owner must confirm this bounded application delivery, retention, public accessibility, attribution and termination behavior with the provider. Do not stockpile output or put it in the repo pending that decision. Attribution to an author is separate from vendor/license attribution. Public docs cannot prove copyright ownership of individual quotes.

[Status](https://api-ninjas.com/status) lists all five categories and images operational but displays an older snapshot date. This is a vendor assertion, not a current availability test or SLA verification. Existing account owner, key status, billing, premium access, region/privacy suitability and the old quote endpoint's availability are unknown. Public pricing/terms can change; recheck at the owner gate.

## Options compared

| Option | Security / abuse | Cost and maintenance | Coverage, rights and failure tradeoff |
|---|---|---|---|
| A — direct HTTPS only to genuinely no-secret providers | No private credential in app; each vendor sees device IP. App ID/CORS is no access control. Distributed client refresh can violate vendor limits. | No owned gateway; multiple adapters and evolving contracts to maintain. No guaranteed free SLA. | [Open Trivia DB docs](https://opentdb.com/api_config.php) state no key, free API, CC BY-SA 4.0 and one request per IP/5 seconds. Requires question/correct-answer mapping, HTML entity decoding to plain text, attribution and share-alike review. [icanhazdadjoke docs](https://icanhazdadjoke.com/api) state no auth, JSON Accept and identifying User-Agent; object `joke` maps easily. No numeric quota or comprehensive redistribution entitlement established there. These cover two categories; no verified equivalent full five-category source. Feasible partial path after terms approval, not selected. |
| B — thin HTTPS on-demand proxy holding a new server-only key | Fixes credential custody, not anonymous abuse. Needs atomic global quota, IP limits, allowlisted egress, bounded bodies/timeouts and kill switch. Attackers can burn quota without extracting key. | Small serverless host, provider subscription, secret operations and incident owner. API Ninjas Free/Developer cannot support assumed content caching. | Closest to legacy freshness; one upstream outage or revoked key affects misses. A non-caching Developer path is technically possible only if display/distribution is permitted; would increase spend/abuse coupling. |
| C — reviewed published feed, optional private ingestion | Public reads have no provider capability; known content artifact only. Publishing and optional secrets are separate trust boundaries. Hosting denial-of-wallet remains. | Curated originals: no provider subscription, small host, periodic owner review. Licensed ingestion: provider subscription and controlled job maintenance. No user database/auth service. | All five categories via owner-authored/cleared records; lower novelty and manual editorial work. Provider output only after explicit license clearance. **Recommended.** |

A trial UI labeled “no API key required” is not permission for direct production use; API Ninjas documented endpoints still require keys. No trial/demo submit controls were used.

## Recommended request and publication flows

Text diagram (all components below are proposed):

```text
UNTRUSTED PUBLIC                         OWNER-CONTROLLED DELIVERY
Mobile ContentProvider --HTTPS GET--> edge limits --> read-only gateway
Anonymous scripts ------same route--->     |               |
                                          |          reviewed pool artifact
                                          |          (five fixed categories)
                                          +--> 429/503, never upstream on miss

PRIVILEGED PUBLICATION (separate identity, no public admin URL)
Owner originals/rights record --> review + schema/safety gate --> versioned pool
Optional approved provider --> bounded ingestion job --> quarantine --> review
                                      ^
                            server secret store + atomic quota
Provider, host, publisher and mobile device are distinct trust boundaries.
```

1. A future adapter maps canonical ID to one fixed route. `revision` never becomes a cache-busting URL. No credentials, user IDs, location, birthdays or personal preferences accompany reads.
2. Edge applies trusted-source-IP throttle across all five routes before application selection. Gateway rejects malformed methods/paths/queries/bodies; checks current serving policy, rights expiry and record age, then selects from a validated pool of at most 20 records/category. No outbound fetch occurs.
3. Gateway returns a bounded envelope. Selection may repeat; a cached selection can be identical for five minutes. Do not increment a client success revision on error. The adapter validates metadata/envelope, maps display fields to `CardContent`, omits image or uses existing locally selected artwork, and invokes `normalizeContent`. It never passes a remote image into the local placeholder model.
4. A separately approved publication job can replenish records, but never as a result of public requests. A single writer reserves budget atomically before each attempted provider call, validates/filters into quarantine, and publishes only after review. Provider keys are attached only to fixed provider HTTPS origin requests, never forwarded from client headers. Curated originals need no provider key, job, mutable store or credential.

## Proposed public v1 contract

Illustrative origin `https://content.example.invalid` is reserved and non-deployed. Public routes accept **GET only**:

| Route | Required `data.id` | Candidate upstream if separately licensed |
|---|---|---|
| `/v1/content/quote` | `quote` | `/v2/randomquotes` with approved topic selection |
| `/v1/content/trivia` | `trivia` | `/v1/trivia` with one approved legacy filter |
| `/v1/content/fact` | `fact` | `/v1/facts` |
| `/v1/content/dad-joke` | `dad joke` | `/v1/dadjokes` |
| `/v1/content/bucket-list` | `bucket list item` | `/v1/bucketlist` |

No query string, body, client-selected upstream URL, batch size, pagination, revision or category filter. Unknown route: 404; unsupported version: 404; method other than GET: 405 with `Allow: GET`; invalid/extra query or nonempty body: 400. Body is rejected at edge, with a 1 KiB defensive request limit even before rejection. Request headers capped at 8 KiB by the selected host; header/URL-limit enforcement must be demonstrated or configured there. Route path limit 128 bytes. A future contract change is additive only for documented optional fields; incompatible changes use `/v2`. Clients ignore unknown top-level metadata fields but copy only allowlisted display fields; producer schemas reject unexpected `data` fields.

All following payloads are **wholly synthetic**, not copied from providers or private assets:

```json
{
  "schemaVersion": 1,
  "contentId": "synthetic-trivia-001",
  "publishedAt": "2026-11-17T12:00:00Z",
  "expiresAt": "2026-11-24T12:00:00Z",
  "freshness": "fresh",
  "source": {
    "name": "Synthetic Example Publisher",
    "attribution": "Synthetic example only",
    "rightsRef": "synthetic-rights-001"
  },
  "data": {
    "id": "trivia",
    "title": "trivia",
    "text": "How many corners does an imaginary square have?",
    "answer": "Four imaginary corners."
  }
}
```

The other four synthetic `data` examples use the same envelope and matching unique content IDs:

```json
[
  {"id":"quote","title":"quote","text":"A paper path begins with a pencil mark.","author":"Synthetic Author"},
  {"id":"fact","title":"fact","text":"This synthetic example contains a sentence."},
  {"id":"dad joke","title":"dad joke","text":"Why did the paper rest? It had a fold day."},
  {"id":"bucket list item","title":"bucket list item","text":"Draw an imaginary garden on paper."}
]
```

JSON UTF-8 only; exact ID/title match route; nonblank trimmed text up to 2,000 Unicode code points, trivia answer up to 500, optional author up to 160 (blank becomes absent). Non-string values fail; no `answer` on other categories, no HTML/Markdown execution, links, script evaluation or auto-linking. Envelope: `schemaVersion` exactly 1, contentId restricted to 1–80 ASCII letters/digits/hyphens; UTC RFC3339 timestamps with publishedAt ≤ now < expiresAt and expiresAt ≤ publishedAt + 7 days; clock skew tolerance 5 minutes for future publication only, not expiry. `freshness` is `fresh` up to 24 hours, otherwise `stale`. Source name ≤80, attribution ≤500, rightsRef restricted ASCII ID ≤80; rights metadata must map to a private operator-held clearance record. No personal metadata. Output ≤16 KiB decompressed. Upstream ≤64 KiB decompressed, stream limit before parsing, single requested record; validate array length/first record or bucket object, allowlist mapped fields and discard unknown upstream fields. No image field in v1.

Success headers: `Content-Type: application/json; charset=utf-8`, `X-Content-Type-Options: nosniff`, `Cache-Control: public, max-age=0, s-maxage=300, must-revalidate`, opaque `ETag`, host-provided HTTPS/HSTS (`max-age=31536000` after TLS validation; no unapproved subdomain preload). Gateway recomputes TTL as min(300 seconds, remaining record/rights lifetime, time until the next freshness transition); never extend expired records or cache a `fresh` label across its 24-hour boundary. CDN cache key is exact versioned category path, not caller headers or arbitrary input. No `Set-Cookie`, upstream auth/header forwarding, redirect or permissive credentialed CORS. Mobile does not need browser CORS; any future browser allowlist is separate and is not authentication. Disable public preview/origin aliases that bypass controls.

Example error (synthetic):

```json
{"schemaVersion":1,"error":{"code":"RATE_LIMITED","message":"Please try again later.","retryAfterSeconds":60},"requestId":"synthetic-request-001"}
```

| Status/code | Trigger | Mobile action |
|---|---|---|
| 400 `INVALID_REQUEST`, 404 `NOT_FOUND`, 405 `METHOD_NOT_ALLOWED` | Unsupported input/route/method | Safe failure; no automatic retry |
| 429 `RATE_LIMITED` | Public throttle | `Retry-After: 60`; honor bounded delay, no immediate retry |
| 503 `CONTENT_UNAVAILABLE` | Empty pool, expired rights/data, disabled serving, corrupt artifact or store outage | Preserve prior valid in-memory card under existing hook; safe Retry |
| 503 `SERVICE_UNAVAILABLE` | Internal dependency/host failure | Safe generic error, no provider message/config |

Errors ≤1 KiB, `Cache-Control: no-store`, JSON/nosniff and opaque request ID. Do not forward vendor HTTP body, status detail, stack, account identifier or key. Optional ingestion classifies upstream 401/403 as credential/entitlement failure (stop and alert), 429 as quota/backoff, timeout/5xx as transient, empty/invalid/oversized as rejected publication. These are operator metrics, not public API implementation detail. Transport failure, invalid JSON or unexpected 200 shape is a safe adapter rejection, not an empty success.

## Cache, timeouts, quota and abuse safeguards

Proposed defaults, to be tested and approved rather than represented as measured capacity:

- Reviewed pool: ≤20 records/category, ≤100 total; fresh for 24 hours, stale allowed only through day 7 and only while rights/safety approval remains valid. A manual publisher may deliberately republish an unchanged original after review; no automatic timestamp refresh to evade expiry. Five-minute edge cache, no persistent device cache or background fetch initially. Server-side expiry is independent of cache eviction; min-TTL above prevents TTL overrunning rights. No stale serving after takedown/expiry. On outage, bounded existing artifact or safe 503; never fetch provider on miss.
- Gateway: 2-second processing deadline, bounded in-memory artifact (≤2 MiB), no DB/user writes. Fixed-key cache misses coalesced per category within the runtime; distributed duplicate reads are harmless because no provider call occurs. Cache only validated 200s. No cache on operator/admin paths, errors or publication controls.
- Ordinary throttle: 60 GETs/60 seconds/source IP across routes, with 429/60 seconds; five concurrent card starts fit. Trust only host-overwritten IP metadata, never caller `X-Forwarded-For`. Shared NATs can be unfairly throttled; IPv6 rotation/botnets evade per-IP rules. [Cloudflare rate-limit binding docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) explicitly describe approximate per-location limits. A selected host must enforce limits before cached response delivery or document a separate edge rule; gateway-only throttling does not cover cache hits. Edge limits are not an exact global quota.
- Optional ingestion: disabled by default; one scheduled writer, no public enqueue API; ≤50 provider attempts/UTC day and ≤1,000/calendar month, including failures/retries. Use one authoritative durable atomic counter, reserve before sending, never refund uncertain attempts, fail closed on counter/store failure, and lock out concurrent publishers. This mutable component exists only if that later scope is approved. Budget cannot rely on eventually consistent caches or per-location counters. At most one retry on transient timeout/5xx with full jitter 0.5–2 seconds; 3-second upstream deadline per attempt, 8-second job-item budget, at most two simultaneous upstream requests. Respect provider Retry-After up to 24 hours; do not sleep/requeue without counting it in budget. Never retry 401/403, schema failures or 4xx other than scheduled 429 handling. Three consecutive upstream transient failures open a 15-minute circuit; one half-open probe consumes quota. Always quarantine; failed job cannot replace last-good published pool.
- Mobile proposal: 5-second total deadline per load; at most one jittered retry on transport/5xx inside that same deadline, no retry on schema/4xx/429; otherwise user-triggered retry after cooldown (max 300 seconds for 429). Hook remains the concurrency/state authority; adapter owns abort timers/transport cleanup. No background polling or global retry loop. Identical cached success is valid; refresh novelty is not guaranteed.
- Operator kill switches: independently disable ingestion and serving; test rollback/purge, origin restriction and host spending cutoff. Quota exhaustion returns safe unavailability rather than silently raising limits. Distributed abuse can still deny service or exhaust host quota. [OWASP resource-consumption guidance](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/) supports layered bounds; moving a key alone is insufficient.

## Credential custody, privacy and content operations

Curated-original mode has no provider credential. Conditional licensed ingestion uses a **new**, owner-issued least-privilege credential in the chosen host's secret store, separate staging/production and publisher/read roles. No provider credential in Expo variables, EAS, app bundles, fixtures, URLs, repo, artifacts, CI output or client config. [Expo guidance](https://docs.expo.dev/guides/environment-variables/) confirms public-prefixed values are readable in compiled apps. A host secret-store binding such as [Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/) is an example, not authorization to configure it. Ordinary fork/PR CI uses only mocked upstream and no production secret; later deployment requires protected environment approval, narrow identity and audited access. See the threat model for owner-only incident sequence.

Aggregate metrics: route/status counts, p50/p95 latency, cache hit/stale rate, pool size/age, rejected publication, remaining ingest budget, upstream circuit state and host/provider spend. Avoid high-cardinality request labels. Public request logs opt out of bodies, headers, query strings, IPs, device IDs and content. If abuse triage needs source grouping, use daily keyed pseudonyms with ≤24-hour retention; raw IP may still be processed by hosting edge and needs owner privacy review. Retain minimal sampled error class/timing/request ID at most 7 days and aggregate daily metrics at most 30 days; host default logging/retention must be configured to match before rollout. No analytics SDK or user tracking.

Named operator reviews alerts daily during pilot and receives immediate notification for credential rejection, disabled service, rights expiry, >5% 5xx over 5 minutes with ≥20 requests, upstream circuit trip, and 50/80/100% quota/budget. Host budget alerts are advisory unless demonstrated enforcement exists. Confirm log billing and account-wide service impact before selecting a hard cap.

Every publish has reviewer, provenance/license reference, expiry, content-policy checks and rollback version. Reject personal data, sexual/hateful/violent content, unsafe challenges and unsupported medical/financial claims; scrutinize bucket-list risk and trivia factual accuracy. Premium `safe` filtering is documented for quotes/trivia/facts but is not complete moderation or a substitute for review; do not invent a supported filter for jokes/bucket list. Start with original benign text and allow takedown through the owner contact without collecting personal reports in the app. Attribution text is curated and displayed only within an approved mobile presentation; if a provider requires attribution the current UI cannot satisfy, mobile approval must include that narrow change or that source is not eligible. License withdrawal purges server/CDN content; already delivered text cannot be recalled, and current hook last-good text can remain in memory. Do not claim instantaneous device revocation; select rights compatible with this retention or propose separately approved expiry/UI behavior.

## Image decision

Keep geometric placeholders and text-only variants as implemented. Do not download legacy photos, use private assets or add image permissions. This avoids three legacy calls/feed load, decoding ambiguity, media licensing and tracking.

| Future option, separately approved | Conditions / tradeoff |
|---|---|
| Static curated bundled or owner-hosted media | Lowest runtime risk; explicit redistribution license, no personal photos, accessible descriptions; new image contract and asset review |
| Server-controlled HTTPS media | Allowlisted exact hosts/path prefixes, no userinfo/query secrets/IP literals/custom ports; reject redirects; MIME sniffing JPEG/PNG/WebP only, ≤512 KiB and ≤1024×1024 plus decoded pixel cap; strip EXIF, no SVG/HTML, safe fallback; third-party privacy and availability review |
| Image proxy | Same validation before/after DNS resolution including private/loopback/link-local/metadata ranges, no arbitrary URL parameter or redirects, response/CPU/time/concurrency limits and cache rights; highest maintenance/abuse surface |

None is included in v1. If required later, define a separate media schema with URI, dimensions and alt semantics instead of extending color fields implicitly.

## Cost model and confidence

Planning estimate, USD/month excluding tax/domain registration, labor and incident costs; no purchase or quote accepted. One small host is enough; Cloudflare is an illustrative candidate, not a hosting decision. An equivalent static/serverless host is acceptable only if it demonstrates the same limits, TLS, controls and custody.

Assumed pilot: 100 daily users ×2 sessions ×5 cards ×30 days =30,000 reads/month; 50% refresh allowance gives45,000. At average4 KiB/response, ~176 MiB/month body transfer before headers; maximum16 KiB would be ~703 MiB. These are transparent assumptions, not observed usage. Ingestion at5 records/day/category =750 attempts/month before retries, bounded by1,000 cap; originals use zero upstream calls. Five initial legacy content+image loads would instead make8 provider calls/session.

[Workers runtime pricing](https://developers.cloudflare.com/workers/platform/pricing/) lists Free100,000 requests/day,10 ms CPU; paid $5 base,10M requests/month and30M CPU-ms included, then $0.30/M requests and $0.02/M CPU-ms. At45,000 reads and assumed2 ms CPU/read,90,000 CPU-ms are within either relevant request/CPU allowance if per-invocation limits pass. Free candidate: $0 runtime; paid headroom: ~$5 before optional storage/logging. Caching does not make Worker requests unbilled; paid overages remain possible. Do not treat free static asset pricing as applying to gateway invocations. [Spend management](https://developers.cloudflare.com/workers/platform/spend-management/) documents a cap on Workers usage charges excluding subscription and separate products; verify enforcement delay and product coverage. Cap exhaustion can affect the whole account and deliberately deny availability.

| Path | Provider + illustrative host | Confidence / approval condition |
|---|---|---|
| Recommended original reviewed feed | $0 provider +$0 free runtime candidate, or ~$5 paid | Moderate for pilot volume; labor and host abuse controls not priced; reserve owner budget of≤$10/month hosting if chosen, with a demonstrated hard cutoff or stay on free hard quota |
| Conditional API Ninjas cached ingestion | Conservatively ~$149 provider +$0–5 runtime; separate counter/storage/log charges | Low until billing and distribution rights confirmed; owner must approve a separate provider budget, never imply≤$10 all-in |
| Direct no-secret alternatives | $0 advertised trivia; joke auth-free, no own gateway charge | Partial coverage only, no capacity/rights/SLA guarantee; not equivalent complete implementation |

A strict overall dollar maximum cannot be promised from per-IP limits or alerts. Use the host's demonstrated spend cutoff plus explicit subscription commitments; add every separate storage/domain/log product to approval or keep it absent. Recheck pricing and terms before follow-on implementation and monthly thereafter. If costs/rights do not fit, remain mock-only or curate original text; do not silently switch providers or widen scope.

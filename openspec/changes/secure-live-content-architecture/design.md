# Design

## Context

See proposal.md for motivation and scope. Fetched main is `0c829f3`. `content.ts` validates a discriminated five-card type; `useHomeContent.ts` owns revision, independent requests, last-good refresh and stale completion suppression. Its image type is local colors/shapes, never a URL. `src/api/ApiProvider.js` safely establishes legacy category/response mappings without opening `axiosConfigs.js`, EAS or environment files. Older audit/brief birthday requirements are superseded for modern behavior by issue #17; preserve legacy bytes.

## Goals / Non-Goals

**Goals:** create an evidence-based, deployment-neutral recommendation with synthetic contracts, operational controls, measurable acceptance, costs and explicit owner choices. Runtime requirements in the delta describe a future approved service, not this pilot's implementation.

**Non-Goals:** app/backend/networking code, new dependencies or CI, services/accounts/secrets, provider data requests, native/project/signing/ATS changes, birthday experience, merge/release/archive.

## Decisions

1. Recommend a read-only HTTPS content gateway over a small published pool of owner-authored or explicitly licensed, reviewed records. Public requests never trigger upstream work. Begin future implementation with curated originals; optional licensed ingestion is separate and disabled by default. This preserves a live delivery path without binding anonymous traffic to a paid key. Alternatives: direct no-secret APIs reduce hosting but fragment five-category coverage and terms; an on-demand proxy centralizes a key but remains abusable and incurs provider spend.
2. API Ninjas is a conditional ingestion candidate for all five categories, not an approved provider. Current [pricing](https://api-ninjas.com/pricing) disallows caching/storage on Free/Developer, allows it on Business/Professional; [terms](https://api-ninjas.com/tos) restrict Free redistribution and competing API substitutes. Owner must obtain confirmation for this feed, retention, attribution and distribution before using provider output. Business lists $149/$99 monthly-equivalent figures; billing basis must be confirmed. Curated originals avoid that subscription and rights ambiguity. Public research accessed November 17, 2026, America/New_York; no authenticated or content endpoint calls.
3. Proposed `/v1/content/{quote|trivia|fact|dad-joke|bucket-list}` GET routes return one record and rights/source metadata. Gateway maps transport slugs to exact canonical IDs (spaces included). No client-supplied URLs, categories, revision, query strings or cache-busters. Empty/invalid content is unavailability, never successful blank output. Future mobile adapter strips service metadata and calls the existing normalizer. Revision stays local, successful-load based; random novelty is best effort and repetitions are allowed.
4. Five category pools capped at 20 reviewed records each; per-record response at most 16 KiB, upstream at most 64 KiB decompressed. Freshness is 24 hours from publication with 7-day maximum age, shortened by rights expiry. Edge cache 5 minutes; no browser/app persistent cache initially. License withdrawal/unsafe content overrides stale availability. Edge limits proposed at 60 reads/minute/source IP across five routes; approximate distributed counters are not global budget enforcement. Optional ingestion single-writer quota maximum 50 calls/day and 1,000/month including retries, atomic reserve before request, fail closed if counter unavailable. No upstream work on misses; no public write/admin endpoint.
5. Keep existing local geometric images; no remote image fields in v1. Future curated media or a fixed-origin image service requires its own contract/approval, size/MIME/dimension bounds and URL validation. It must not overload `PlaceholderImage`.
6. Infrastructure shortlist only: a small serverless gateway with static records on a free tier, or a paid ~$5/month runtime for headroom. Cloudflare is a reference mapping, not a selected host. [Pricing](https://developers.cloudflare.com/workers/platform/pricing/) lists 100,000 free requests/day or paid $5 base with 10M requests/30M CPU-ms included, additional usage and storage/log charges. Explicit budget cutoff and host/account ownership required; no provision in this pilot.

## Risks / Trade-offs

- Provider license uncertainty → curated originals default; no provider caching until written/account-owner confirmation.
- Public scraping and denial of wallet → no provider-on-read, bounded records, edge throttling, hosting cap/kill switch; distributed attack can still exhaust availability.
- Modest refresh novelty → small pool and cache intentionally trade uniqueness for predictable cost; refresh has no new-item guarantee.
- Operator/content review work → one named owner and modest pool; no new user database, login or moderation service.
- Credential already compromised → recommend immediate owner revocation if active, separate cleanup authorization; never inspect it to validate this pilot.

## Migration Plan

Deliver and validate planning first; then architecture/ADR, threat model, roadmap/acceptance plan and evidence report in a draft PR. These documents are explicitly authorized by the issue even though this skill normally stops after planning artifacts; no product implementation follows. Owner approval gate remains pending. Subsequent reviews: 03F-B1 offline backend contract/abuse tests and runbook; 03F-B2 authorized host/environment and provider smoke; 03F-B3 replaceable mobile adapter preserving 03C/03D; operational rollout in a separate approval. Mock provider remains default until approved. Rollback: stop ingestion, remove unsafe snapshots/purge edge caches, disable service, select mock provider in a separately reviewed app change. Do not extend ATS exceptions.

## Approval decisions reserved to owner

Provider/rights choice, infrastructure operator and account, spending ceiling, domain/TLS authority, secret-store administrators and production access are explicit approval inputs, not assumptions or authorization to implement. They do not block this planning package. Exact host bindings and current entitlements must be reverified when approved; terms may require a revised follow-on proposal.

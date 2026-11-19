# ADR 0002: Serve reviewed content independently of public demand

Date: November 17, 2026 (America/New_York). Status: **PROPOSED — owner approval required; no implementation authorized**. Scope: [issue #17](https://github.com/dvale94/kyrshas-app/issues/17), Pilot 03F-A. Supersedes no implemented transport. Existing legacy files remain untouched.

## Context

The modern Expo 58 iPhone app uses a mock-only five-card provider. Its independent loading, retry, last-good content, trivia answer handling and stale-request protection must survive a future live adapter. The legacy provider has a compromised publicly embedded credential; it is neither inspected nor reused here. The current geometric image contract cannot carry remote images. See the [inventory, contract and public research](../migration/secure-live-content-architecture.md).

The complete OpenSpec proposal/design/spec scenarios/tasks passed strict validation before this document was authored; repository-wide validation passed 7/7. [Planning change](../../openspec/changes/secure-live-content-architecture/proposal.md) remains unarchived.

## Decision proposed for approval

Use a small anonymous read-only HTTPS gateway over five bounded, reviewed content pools. Start with owner-authored or explicitly rights-cleared records. Serve one matching record per category; public reads never fetch upstream. Keep provider ingestion optional, disabled by default and outside the public request path. Do not add accounts, a user database, device secrets or image processing. Keep the existing mock adapter as the rollback/testing option.

This is a deployment-neutral architecture: a stateless function can select from a versioned content artifact, protected by host quotas/throttling. A later ingestion job, if approved, has separate credentials, a single writer, atomic request budget and human publication review. No new service exists in this pilot.

The same boundary supports API Ninjas only after its owner confirms redistribution, retention, attribution and plan entitlement. Free/Developer caching restrictions make a cheap cached API Ninjas proxy an unsuitable default. The current pricing/terms basis and conditional budget are in the architecture document; this ADR does not approve a subscription or assert legal clearance.

## Alternatives

| Option | Benefit | Cost / maintenance / security tradeoff | Decision |
|---|---|---|---|
| A: direct mobile HTTPS to documented no-secret services | No key or own gateway; fast start for trivia/jokes | Multiple contracts, licensing and per-IP quotas; exposes client IP to each provider; no verified complete five-category replacement | Feasible for selected categories after approval, not recommended for the complete feed |
| B: thin on-demand secret-holding proxy | One contract; provider key stays server-side | Anonymous attackers can spend quota; global budgeting needed; API Ninjas caching needs suitable rights/plan; outages affect cards | Feasible with controls but unnecessary upstream coupling |
| C: curated/versioned feed with optional scheduled ingestion | Five categories, one contract, bounded provider cost, easy rollback; original content can avoid provider subscription | Operator must review content/rights; fewer unique refresh results; hosting can still be attacked | **Recommended** |

## Consequences

Refresh means another valid selection, not guaranteed uniqueness. Content publication is deliberately slower than public demand. A future feed can be delivered live without requiring fresh external-provider content on every tap. If the owner requires unlimited fresh provider results, propose a new scope and budget rather than weaken the quota boundary.

The public endpoint is accessible to scripts; CORS, public app identifiers, installation IDs and attestation do not make it private. Edge rate limits reduce ordinary bursts but cannot guarantee global spend bounds. The architecture prevents public requests from spending provider quota; a host-level hard cutoff and safe outage strategy are still required for hosting charges.

Birthday behavior is permanently excluded from the modern app and every follow-on. Historical audit/brief language preserving that experience is superseded only for modern behavior by issue #17 and the owner's current instruction. Preserve all legacy content and ignored native/backup state without reading private assets.

## Approval and reconsideration

Owner must explicitly approve the provider/content-rights path, hosting account and named operator, recurring and maximum budget, domain/TLS authority, secret-store custody and production access before 03F-B. Credential owner should immediately revoke the exposed key if active through the provider account; this is advice only and no credential action was performed. See the [threat model](../migration/secure-content-threat-model.md), [phased roadmap and approval checklist](../migration/secure-content-roadmap.md), and [acceptance plan](../migration/secure-content-verification.md).

Revisit if provider terms change, original content cannot meet the desired experience, quotas consistently exhaust, a named operator is unavailable, or remote media/user accounts become necessary. Each requires a new review; no merge/deploy/release/archive is authorized here.

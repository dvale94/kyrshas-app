# Proposal

## Why

The modern iPhone app has a validated mock-only five-card seam, while legacy content depends on a compromised client-visible credential. Issue [#17](https://github.com/dvale94/kyrshas-app/issues/17) requires a reviewable security and architecture decision package before any live-service work.

## What Changes

- Deliver a planning-only ADR, provider inventory and alternatives comparison, threat model, versioned synthetic contract, phased roadmap, verification plan, report and handoff.
- Specify prospective secure content delivery behavior; these proposed requirements do not authorize or claim a running service.
- Compare no-secret direct HTTPS, a secret-holding proxy, and curated/cached feeds using public documentation only.
- Recommend a deployment-neutral curated HTTPS feed boundary with optional licensed server-side provider ingestion; quantify why API Ninjas caching requires a suitable plan and terms confirmation.
- Preserve current mock provider, canonical five-card order, independent loading/retry/last-good/stale protection, local artwork and trivia controls.
- Permanently exclude birthday behavior, date checks, personal messages/photos and private assets from the modern architecture and future implementation.
- Stop at explicit owner approval of provider/rights, hosting/operator, budget, domain, secret-storage authority and production access. No credential reading/account actions, application/network/backend/native/CI/dependency changes, infrastructure, merge, deployment, release or archive.

## Capabilities

### New Capabilities

- `secure-content-delivery`: Proposed public content contract and security/reliability boundaries for a future approved five-category delivery service, including the approval boundary itself.

### Modified Capabilities

None. `openspec list --specs --json` reports no archived main specs. Existing unarchived home orchestration/presentation changes remain untouched and retain their behavior.

## Impact

Only this change directory, a new ADR under `docs/decisions/`, architecture/threat/roadmap/acceptance documents under `docs/migration/`, `.agentic/reports/issue-17-secure-content-architecture.md` and `.agentic/handoff.md`. Base is fetched `main` at `0c829f354a135b5bfdcfe48fb9412944c2a1e188`. Branch: `pilot/03fa-secure-content-architecture`. No new dependencies, secrets, services or product changes. Strict complete OpenSpec validation must pass before architecture delivery documents are written. Historical audit birthday-preservation wording applies only to untouched legacy state; issue #17 supersedes it for the modern app.

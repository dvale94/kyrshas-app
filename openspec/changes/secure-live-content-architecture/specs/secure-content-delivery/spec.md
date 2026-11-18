# Spec Delta

## Purpose

Define the proposed public contract and approval boundaries for safe, economical delivery of the modern app's five content categories. Runtime requirements below are prospective and require a separately approved implementation change.

## ADDED Requirements

### Requirement: Owner approval precedes implementation
The delivery workflow MUST remain research and documentation only until the owner approves providers and rights, hosting and operational owner, budget, domain, secret custody and production access. Strict complete OpenSpec validation MUST precede architecture delivery documents.

#### Scenario: Planning pilot finishes
- **WHEN** the architecture package and draft PR are delivered
- **THEN** no service, credential, backend, mobile networking or native change is implemented and the approval gate remains pending

#### Scenario: Planning validation fails
- **WHEN** strict validation of the complete proposal, design, scenarios and tasks fails
- **THEN** architecture delivery documents are not authored until the planning artifacts pass

### Requirement: Credential custody excludes public clients
The proposed service MUST keep provider secrets exclusively in an owner-approved server secret store. Planning MUST NOT read, print, test, copy, reuse, rotate or revoke the exposed legacy credential. Remediation MUST be separately authorized and performed by its owner.

#### Scenario: Client or repository is inspected by an attacker
- **WHEN** public app bundles, requests or repository changes are inspected
- **THEN** future delivery credentials are absent and public identifiers confer no authorization

#### Scenario: Historical credential exposure is recorded
- **WHEN** the planning package addresses the legacy key
- **THEN** it recommends owner revocation and separately approved cleanup without opening credential-bearing files or treating deletion as revocation

### Requirement: Five category compatibility
The proposed contract MUST deliver quote, trivia, fact, dad joke and bucket list item with canonical IDs and order. Trivia MUST require an answer; other cards MUST reject answers. Optional author attribution MUST remain available. Birthday behavior, personal messages, photographs and private assets MUST be permanently excluded from the modern app and follow-ons.

#### Scenario: Successful category selection
- **WHEN** a supported category is requested
- **THEN** exactly one validated item is returned with the matching canonical ID and no other category's data

#### Scenario: Excluded content is proposed
- **WHEN** a plan or payload introduces birthday behavior or private assets
- **THEN** it fails modern-app acceptance regardless of calendar date

### Requirement: Versioned bounded public contract
The proposed read-only HTTPS API MUST define a versioned route per category, synthetic examples, known fields, string and payload limits, source/rights metadata and safe typed errors. It MUST reject unknown paths, query parameters, request bodies, redirects to unapproved origins and non-HTTPS targets.

#### Scenario: Empty or malformed content
- **WHEN** data is empty, oversized, has a wrong ID, invalid JSON, wrong types or missing required answer
- **THEN** it is rejected and never replaces last-good valid content

#### Scenario: Unsupported public input
- **WHEN** a caller supplies arbitrary URLs, category parameters, cache-busting queries or non-read methods
- **THEN** the boundary rejects the request without forwarding it upstream

### Requirement: Public abuse cannot drive provider spending
The proposed anonymous delivery path MUST serve only published, rights-cleared snapshots. Public reads MUST NOT trigger provider fetches. The design MUST specify edge limits, globally bounded ingestion quota, stale TTL, timeouts, retry limits, request coalescing and a kill switch. Device keys, CORS and attestation MUST NOT be described as guaranteed client authentication.

#### Scenario: Distributed request storm
- **WHEN** clients exceed edge limits or ingestion budget is exhausted
- **THEN** public traffic cannot increase provider calls and the system returns bounded cached content, 429 or safe unavailability

#### Scenario: Provider outage or revocation
- **WHEN** upstream fails or license/credential validity is withdrawn
- **THEN** ingestion stops, invalid or unlicensed content is not served, and no retry storm occurs

### Requirement: Preserve independent mobile behavior
A future approved adapter MUST preserve independent per-card loading, safe retry, last-good refresh, duplicate/stale protection, provider replacement handling, trivia visibility behavior and accessibility. It MUST remain replaceable by the mock provider without changing the existing public seam. Local geometric artwork MUST remain separate from any future remote-image contract.

#### Scenario: One card fails offline
- **WHEN** one load fails or completes after provider replacement or unmount
- **THEN** other cards remain usable, prior valid content is retained as appropriate, stale completion is ignored and error payloads are not rendered or logged

#### Scenario: Remote image is supplied prematurely
- **WHEN** a URL or base64 image is supplied to the current local-placeholder contract
- **THEN** it is rejected rather than silently changing that contract

### Requirement: Observable and accountable operation
The proposed service MUST define an operator, license and incident ownership, aggregate monitoring, minimal log retention, secret-safe errors and rollback/takedown procedures. Acceptance MUST distinguish planning checks from unexecuted service/native tests.

#### Scenario: Content or security incident
- **WHEN** harmful content, licensing loss, secret exposure or excess spending is detected
- **THEN** the operator can disable ingestion and serving, purge affected snapshots and caches, retain only redacted incident evidence and restore an approved safe version

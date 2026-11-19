# Local development content

## Purpose

Allow the owner to explore fresh random content privately in local Expo development while preserving deterministic offline behavior and excluding provider access from production.

## ADDED Requirements

### Requirement: Explicit local opt-in

The app SHALL select live content only in a development runtime with explicit `live-local` mode and a nonblank new local key. Otherwise it SHALL use deterministic mocks without provider transport or credential access. Active live mode SHALL display an accurate live-development label.

#### Scenario: Default and missing configuration

- **WHEN** mode is absent, mock, invalid, or the key is absent or invalid
- **THEN** the app shows the offline synthetic label and makes no external request

#### Scenario: Production excludes live access

- **WHEN** production runs even with live-local mode and a configured key
- **THEN** it selects mocks without reading the key or initializing provider transport

#### Scenario: Development opt-in

- **WHEN** development runs with live-local mode and a valid local key
- **THEN** the five cards use live-development mode and no offline synthetic label is shown

### Requirement: Five bounded random categories

The adapter SHALL request one item per initial card load or refresh from fixed HTTPS API Ninjas quote, trivia, fact, dad-joke and bucket-list routes. It SHALL select only documented allowed topics, reject redirects and arbitrary URLs or headers, request no images, and avoid parallel duplicates for the same card.

#### Scenario: Mapping and freshness

- **WHEN** all five cards load and one card is subsequently refreshed
- **THEN** five independent requests followed by exactly one new request map the documented response fields to the same five IDs, order and trivia answer contract
- **AND** repeated provider content is accepted without automatic retries

#### Scenario: Category reconciliation

- **WHEN** quote or trivia content is requested
- **THEN** quote topics exclude undocumented dreams and trivia uses its four documented legacy topics
- **AND** entitlement failures remain local card errors without hidden fallback calls or paid-service provisioning

#### Scenario: Duplicate pending request

- **WHEN** the same card is requested again before completion
- **THEN** at most one transport operation for that card is active and other cards can proceed

### Requirement: Safe bounded failures

The adapter SHALL bound each operation to eight seconds, JSON bodies to 16 KiB and display strings to 2,000 characters. Invalid or empty responses, missing answers, non-200 including 429, redirects, network and deadline failures SHALL produce generic credential-free errors without logs or automatic retries.

#### Scenario: Untrusted response or transport failure

- **WHEN** any bounded transport, JSON, field or status validation fails
- **THEN** only the requested card fails, no raw payload or credential is displayed or logged, and Retry remains available

#### Scenario: Preserve async behavior

- **WHEN** refresh fails or an obsolete provider completes
- **THEN** last-good content and unrelated trivia state survive failures and obsolete data cannot overwrite the current provider
- **AND** successful trivia refresh resets answer visibility and accessibility controls retain existing behavior

### Requirement: Owner-controlled local credentials

The exact app-root `.env.local` SHALL remain ignored and untracked. A committed `.env.example` SHALL contain placeholders only with mock default. Agents and automated checks SHALL neither create/read the real file nor access legacy credentials. Tests SHALL use fake transport and synthetic credentials without provider calls.

#### Scenario: Safe delivery

- **WHEN** automated verification and PR preparation run
- **THEN** dotenv is disabled, ignore/history/staged scope checks expose no credentials, and both original native trees and native security policy remain preserved

### Requirement: Honest local-only acceptance

Documentation SHALL explain readable Metro-bundle credentials, private owner setup, mock rollback, quotas and rights limitations. Future distribution SHALL require separately approved server-side proxy/Worker and a new scoped credential. Live-provider success SHALL require explicit later owner authorization and SHALL never be inferred from synthetic tests.

#### Scenario: Delivered local experiment

- **WHEN** this change is submitted as one draft PR
- **THEN** local and hosted verification and simulator evidence distinguish PASS, FAIL, BLOCKED and NOT RUN with workflow metrics
- **AND** live-provider acceptance remains NOT RUN, and no birthday, backend, deployment, release, merge, archive or native regeneration occurs

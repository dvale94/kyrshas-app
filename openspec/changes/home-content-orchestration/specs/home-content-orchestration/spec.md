# Spec Delta

## Purpose

Provide predictable offline asynchronous home content while keeping each card usable when other cards are pending, fail or complete out of order.

## ADDED Requirements

### Requirement: Typed deterministic offline content

The home SHALL consume injectable asynchronous content with canonical category identity, title, nonempty text, trivia-only nonempty answer and optional author/local image. Default content SHALL use existing synthetic variants predictably with configurable mock-only delay, without network, credentials, clock randomness or birthday content.

#### Scenario: Predictable startup and refresh
- **WHEN** a fresh home loads and a category refreshes repeatedly
- **THEN** the category starts at its first fixture and cycles through its variants in order without fetch or XMLHttpRequest

#### Scenario: Invalid content
- **WHEN** a provider returns empty required text, missing trivia answer, mismatched identity or malformed optional image
- **THEN** the affected card enters a safe retryable error state without rendering the invalid content or raw exception

### Requirement: Independent ordered initial loading

The home SHALL start all five loads concurrently, maintain five stable slots in quote, trivia, fact, dad joke, bucket list item order and expose each card's loading, ready or error state independently. All settled outcomes SHALL clear that card's busy state.

#### Scenario: Out of order completions
- **WHEN** the last category resolves before the first category
- **THEN** it renders in its canonical slot while the first remains visibly loading and every card keeps its stable ID

#### Scenario: One or multiple failures
- **WHEN** one or several initial loads fail while another succeeds or remains pending
- **THEN** each failed card shows a generic accessible error and Retry action, successful content remains usable and pending loads continue

#### Scenario: Initial retry
- **WHEN** the user retries a failed initial card
- **THEN** only that category loads again and successful completion replaces its placeholder

### Requirement: Isolated refresh with last-good content

A refresh SHALL retain previous successful content while pending and on failure. Failure SHALL provide an accessible safe error and actionable Retry. Requests for different cards SHALL overlap; duplicate requests for one pending card SHALL be suppressed.

#### Scenario: Overlapping cards and duplicate press
- **WHEN** quote is refreshed twice while pending and fact is also refreshed
- **THEN** only one quote request starts, fact starts independently and each card clears busy on its own completion

#### Scenario: Refresh failure then recovery
- **WHEN** a refresh rejects synchronously or asynchronously and is retried
- **THEN** last-good content remains, the error reveals no exception details and retry can replace the content successfully

### Requirement: Obsolete completions cannot change current content

After unmount or provider replacement, obsolete request success and failure SHALL be ignored. A newer category lifecycle SHALL retain exclusive ownership of its loading, error and content state.

#### Scenario: Replaced provider resolves in reverse order
- **WHEN** the provider changes while initial or refresh requests are pending and its newer requests finish first
- **THEN** later old successes or failures cannot overwrite newer content, clear newer busy state or add an error

#### Scenario: Unmount with pending requests
- **WHEN** the home unmounts before requests resolve or reject
- **THEN** their completions produce no state updates or unhandled rejections

### Requirement: Retained accessible five-card presentation

The home SHALL preserve the accepted green hierarchy, synthetic labeling, images/text/author variants, canonical IDs/order, minimum 48px controls, scrolling and portrait behavior. Status and safe errors SHALL be accessible. Trivia SHALL hide its answer on new trivia success, and preserve visibility across unrelated updates and failed trivia refresh.

#### Scenario: Trivia identity
- **WHEN** a visible trivia answer survives an unrelated refresh or its own failed refresh
- **THEN** that answer remains visible until successful new trivia content resets it to hidden with the matching Show Answer control

#### Scenario: Loading and native interaction
- **WHEN** the asynchronous home runs on a disposable iPhone over approved localhost Metro
- **THEN** initial loading, refresh busy state, safe failure/retry, trivia Show/Hide, final-card scroll, portrait and relaunch are verified with actual recorded outcomes

### Requirement: Preservation and auditable delivery

Delivery SHALL strictly validate OpenSpec before code and after implementation, run the unchanged locked verification and native source/policy checks, fingerprint both native trees and preserve owner changes and backup. The draft PR SHALL target main and distinguish local unit, native and hosted CI outcomes with workflow metrics. Native/security/dependency scope SHALL remain unchanged.

#### Scenario: Delivery evidence
- **WHEN** the draft PR is prepared
- **THEN** scoped reports record exact passed, failed, blocked or not-run gates, test counts, actual native provenance, preservation results, corrections and human/escalation metrics without merge, archive, deployment or release

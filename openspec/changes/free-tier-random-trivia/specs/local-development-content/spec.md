# Local development content delta

## Purpose

Keep local-development trivia compatible with Free-tier access while preserving random content, existing card behavior and the surrounding development-only boundaries.

## ADDED Requirements

### Requirement: Five bounded random categories

The adapter SHALL request one item per initial card load or refresh from fixed HTTPS API Ninjas quote, trivia, fact, dad-joke and bucket-list routes. It SHALL use exact `https://api.api-ninjas.com/v1/trivia` without query parameters for unfiltered random trivia, preserve documented quote topics, reject redirects and arbitrary URLs or headers, request no images, and avoid parallel duplicates for the same card.

#### Scenario: Mapping and freshness

- **WHEN** all five cards load and one card is subsequently refreshed
- **THEN** five independent requests followed by exactly one new request map the documented response fields to the same five IDs, order and trivia answer contract
- **AND** repeated provider content is accepted without automatic retries

#### Scenario: Category reconciliation

- **WHEN** quote or trivia content is requested
- **THEN** quote topics exclude undocumented dreams and trivia uses exact `/v1/trivia` with no category, limit, safe or other query parameter
- **AND** entitlement failures remain local card errors without hidden fallback calls or paid-service provisioning

#### Scenario: Duplicate pending request

- **WHEN** the same card is requested again before completion
- **THEN** at most one transport operation for that card is active and other cards can proceed

#### Scenario: Free random catalog on refresh

- **WHEN** a trivia load or refresh completes using a synthetic Free-compatible response
- **THEN** its question and answer are displayed using the existing Show/Hide and answer-reset behavior
- **AND** each sequential refresh makes one query-free request, even if the provider repeats content from its limited Free catalog

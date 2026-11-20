# Chapter presentation

## Purpose

Give the five discovery chapters a coherent Afterglow identity with complete readable content and practical navigation on compact portrait iPhones.

## ADDED Requirements

### Requirement: Afterglow foundation
The app SHALL present all five chapters on a midnight-indigo canvas with opaque readable surfaces, distinct lavender, pink, teal, coral and amber category accents and a consistent system typography hierarchy.

#### Scenario: View any chapter without artwork
- **WHEN** the user visits Quote, Trivia, Fact, Dad Joke or Bucket List Item
- **THEN** its canonical category, complete content and controls use the dark foundation and matching accent without requiring an illustration, font download or network media

### Requirement: Complete readable content
The app SHALL retain complete scalable Unicode and multiline body, optional provider title, attribution and trivia answer, without forced shrinking or truncation. Text SHALL meet 4.5:1 contrast on concrete fallback surfaces and meaningful controls SHALL meet 3:1.

#### Scenario: Read long content on a compact iPhone
- **WHEN** text or expanded trivia exceeds the reading viewport
- **THEN** all text and answer controls remain reachable through the existing reading region, and Previous/Next remain available outside it

#### Scenario: Omit optional attribution
- **WHEN** a content item has no nonblank author
- **THEN** no invented author or empty attribution is shown

### Requirement: Restrained usable chapter chrome
The app SHALL show settled five-segment location progress, canonical chapter position, visible Previous/Next and scoped refresh/retry. Controls SHALL wrap text, retain at least 48-point touch geometry and preserve disabled boundary/busy semantics. Functional chrome SHALL remain within native safe areas.

#### Scenario: Navigate finite chapters
- **WHEN** a user navigates with swipes or explicit buttons
- **THEN** progress retains the settled location and only one adjacent chapter is selected, with no wrap at either boundary

#### Scenario: Use controls with large text
- **WHEN** labels grow or the iPhone is compact
- **THEN** navigation and category labels wrap without overlapping the refresh target, and complete content remains scrollable

### Requirement: Preserve independent content and session behavior
The visual transformation SHALL preserve exact chapter IDs/order, independent initial loading, refresh/retry, last-good data, duplicate/stale suppression, read offsets and trivia visibility. Only successful trivia revision or provider replacement SHALL reset its answer. Default/production SHALL remain mock and live-local SHALL remain explicit local-development-only.

#### Scenario: Refresh fails while answer is visible
- **WHEN** the user refreshes trivia and the request fails
- **THEN** its question and shown answer remain, a safe scoped error and Retry appear, and navigation/other chapters remain usable

#### Scenario: Revisit or successfully replace trivia
- **WHEN** the user returns to the same revision or commits a successful replacement including identical text
- **THEN** revisit retains the answer and read offset while successful replacement resets them according to existing contracts

### Requirement: Bounded visual delivery evidence
Delivery SHALL include unchanged full verification, strict active/all OpenSpec, preservation evidence and real compact/standard iPhone screenshots where feasible, honestly labeling unavailable evidence. Existing basic accessibility and automated regressions SHALL remain; manual VoiceOver, Switch Control and formal assistive audits SHALL NOT be delivery gates.

#### Scenario: Review this foundation pilot
- **WHEN** the draft PR is prepared
- **THEN** its report distinguishes automated assertions, actual simulator observations and unavailable evidence, and records remaining font/art/color approvals without claiming concept-board pixel parity

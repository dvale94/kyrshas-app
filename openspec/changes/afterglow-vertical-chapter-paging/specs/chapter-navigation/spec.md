# Chapter navigation

## Purpose

Provide finite, accessible navigation through the five Afterglow discovery chapters while preserving complete reading and existing in-memory content behavior.

## ADDED Requirements

### Requirement: Finite viewport chapters
The home SHALL show five full-height chapters in exact ID order `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`, opening at Quote on a fresh mount. Vertical gestures SHALL snap to measured viewport boundaries and advance at most one chapter without wrap or pull-to-refresh.

#### Scenario: Traverse the sequence
- **WHEN** a user swipes deliberately through short chapters in either direction
- **THEN** each settled destination is at most one position away and the first and last positions remain bounded
- **AND** short or aborted gestures retain the current chapter without a request or trivia reset

### Requirement: Settled location and geometry
Progress SHALL represent the settled current location, not completion or fractional drag position. Geometry and text-size changes SHALL retain the current chapter and realign its boundary without reloading data.

#### Scenario: Resize while navigating
- **WHEN** viewport or text size changes during a drag or while a later chapter is active
- **THEN** navigation retains the last settled ID, recalculates page extent and aligns that chapter
- **AND** rapid triggers during settlement are ignored or coalesced without skipping chapters

### Requirement: Accessible navigation alternatives
Previous/Next SHALL remain visible, have at least 48 by 48 point targets, label their destination, expose disabled boundaries, and support large text. Progress SHALL expose chapter name and position; only active chapter content SHALL participate in sequential accessibility focus.

#### Scenario: Navigate without a swipe
- **WHEN** a user invokes a chapter button or equivalent accessibility action
- **THEN** navigation moves by one within the bounds and exposes the new name and position once
- **AND** inactive chapter state remains mounted without exposing its controls to sequential focus

### Requirement: Complete overflow reading
Overflowing content, attribution, status, trivia controls and answer SHALL be completely readable in a bounded reading region. Reading swipes SHALL NOT navigate chapters; visible chapter actions SHALL remain available. Text SHALL scale without intentional truncation or shrinking.

#### Scenario: Read long text on a compact iPhone
- **WHEN** body, author, error, answer or larger Dynamic Type exceeds available reading space
- **THEN** reading scrolls within the chapter, including at its edges, while explicit Previous/Next leaves it
- **AND** layout and answer changes recalculate overflow, with reachable controls and no negative reading space

#### Scenario: Revisit and replace content
- **WHEN** a chapter is revisited, refresh fails, or geometry changes
- **THEN** its reading position is retained or clamped to the closest valid position
- **AND** successful replacement or provider-session replacement starts reading the replacement at its beginning

### Requirement: Content lifecycle preservation
Navigation SHALL retain independent initial loads, scoped refresh/retry, busy and duplicate prevention, stale-request protection, safe errors, last-good content and honest mock/live-local messaging. Swiping or revisiting SHALL NOT load or refetch content.

#### Scenario: Pending and failed refresh during navigation
- **WHEN** independent requests resolve out of order or an explicit refresh fails
- **THEN** successful slots remain usable, last-good content stays, and busy/error/retry remain scoped
- **AND** active position stays unchanged, obsolete results are ignored and no raw provider details appear

### Requirement: Trivia successful revision semantics
Trivia SHALL begin hidden, retain its visibility across navigation, failed refresh and unrelated category updates, and reset only for successful trivia revision or provider-session replacement, including identical returned content.

#### Scenario: Answer survives a revisit and failure
- **WHEN** a shown answer is revisited and its refresh fails
- **THEN** the same question and answer remain shown with Retry available
- **AND** a later successful trivia refresh hides the answer even when returned content is identical

### Requirement: Bounded delivery evidence
This pilot SHALL retain existing platform, security, mock/live-local and native preservation boundaries, use only synthetic automated content, and distinguish tests from actual simulator observations. It SHALL add no dependencies, backend, persistence, birthday, production art or rich animation.

#### Scenario: Review implementation acceptance
- **WHEN** the draft PR is delivered
- **THEN** complete OpenSpec validation predates source edits, existing verification and preservation checks have recorded outcomes, and report/handoff identify remaining approvals
- **AND** simulator acceptance is recorded as actual observations or explicitly NOT RUN/BLOCKED, with no merge or archive

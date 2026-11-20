# Afterglow experience design

## Purpose

Provide a source-grounded, reviewable visual and interaction contract for the five Afterglow discovery chapters, with explicit preservation boundaries and acceptance evidence for later implementation pilots. Phase 04A delivers this contract as documentation; it does not change the running application.

## ADDED Requirements

### Requirement: Evidence and approval boundaries
The design package SHALL distinguish observed implementation, owner-approved direction, proposed implementation choices and unresolved approvals, with source traceability and visual-reference provenance.

#### Scenario: Review current versus target
- **WHEN** a reviewer reads the audit
- **THEN** it identifies the current green scrolling cards and existing tests separately from the target full-screen illustrated chapters
- **AND** it records both owner-supplied conceptual boards as references without claiming production rights or pixel fidelity

### Requirement: Five chapter visual identities
The specification SHALL define foundations, semantic colors, typography, spacing, safe areas, readable artwork layers and detailed layouts for Quote, Trivia, Fact, Dad Joke and Bucket List Item in that order.

#### Scenario: Design a chapter
- **WHEN** a future implementer selects any of the five chapters
- **THEN** the package supplies its hierarchy, palette, illustration world, controls, short and long text treatment and optional attribution behavior
- **AND** text remains independent of artwork and optional content creates no empty placeholders

### Requirement: Accessible chapter navigation and automatic entrance
The specification SHALL define full-screen vertical snapping, index and boundary behavior, progress semantics, non-gesture alternatives, automatic content entrance and revisits without requiring a tap to open content.

#### Scenario: Traverse and revisit
- **WHEN** a user moves forward and backward through chapters
- **THEN** the target specifies bounded paging in exact ID order `quote`, `trivia`, `fact`, `dad joke`, `bucket list item`, selected progress and accessible Previous/Next actions
- **AND** revisits preserve in-memory content and trivia visibility without an automatic reload or entrance delay

#### Scenario: Read overflowing content
- **WHEN** text or Dynamic Type exceeds one viewport
- **THEN** the target provides complete scrollable text and reachable controls, with deliberate chapter navigation that cannot steal reading gestures
- **AND** no text truncation or font shrinking is used to preserve the illustration

### Requirement: Independent loading and recovery
The specification SHALL preserve per-category independent asynchronous loading, duplicate suppression, stale-request protection, last-good content, safe errors and explicit scoped retry, without changing content validation or provider architecture.

#### Scenario: Failed refresh
- **WHEN** a chapter refresh fails after a previous success
- **THEN** the target retains that chapter's last-good content and answer visibility, clears busy state and offers labeled Retry
- **AND** other chapters, active index and progress remain unchanged and raw provider details remain hidden

#### Scenario: Partial initial success and obsolete work
- **WHEN** some initial loads fail or an obsolete provider completes
- **THEN** successful categories remain usable, failed slots remain retryable and obsolete work cannot replace current content
- **AND** no global loading gate, hidden retry or synthetic success fallback is specified

### Requirement: Trivia revision semantics
The specification SHALL define accessible Show Answer and Hide Answer, initially hidden answers, visibility retained through failed refresh or revisit, and reset only after a successful new trivia revision or a new content-provider session.

#### Scenario: Same content returns successfully
- **WHEN** a successful trivia refresh returns even an identical question and answer
- **THEN** its answer is hidden for the new successful revision
- **AND** unrelated category refreshes do not affect trivia visibility

### Requirement: Motion artwork and accessibility feasibility
The package SHALL compare built-in and focused-package approaches, static and layered illustration approaches, and define Reduce Motion, contrast, touch, focus, Dynamic Type and performance acceptance without installing dependencies or generating production art.

#### Scenario: Motion or art unavailable
- **WHEN** Reduce Motion is enabled or artwork is absent
- **THEN** the target remains fully understandable and operable with static readable surfaces, immediate content and no parallax or decorative loop
- **AND** production art sourcing, licensing and package adoption remain later approval gates

### Requirement: Historical and security preservation
The package SHALL exclude birthday from the modern app and preserve historical source and assets, iPhone portrait identity, mock default and production, and existing explicitly enabled local-only live content restrictions.

#### Scenario: Assess historical instructions
- **WHEN** a reviewer encounters October 3 birthday or broader platform language in the legacy product brief
- **THEN** the audit labels it historical source evidence with no authority to reinstate birthday or change the modern platform target
- **AND** Phase 04A reads no private credentials and changes no application, native, configuration, dependency, test or CI files

### Requirement: Bounded roadmap and honest delivery evidence
The package SHALL define separate future pilots for paging, visual foundation, chapter screens, state UX, motion, approved artwork and iPhone visual/accessibility QA, each with acceptance evidence and approval gates.

#### Scenario: Deliver Phase 04A
- **WHEN** the documentation package is submitted
- **THEN** complete proposal, design, specs and tasks have passed strict validation before delivery-document work, and final checks distinguish PASS, FAIL, NOT RUN and BLOCKED
- **AND** a report, handoff and draft PR against main identify unresolved decisions and the next recommended pilot without merge, deployment or OpenSpec archive

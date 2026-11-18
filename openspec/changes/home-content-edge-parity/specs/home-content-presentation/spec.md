# Spec Delta

## Purpose

Keep the offline five-card home readable and accessible across realistic synthetic text and optional local illustration variants while preserving independent asynchronous interactions.

## ADDED Requirements

### Requirement: Complete content-specific text
The home SHALL display complete short, long, multiline and Unicode text without truncation or fixed text heights, including optional attribution and long trivia prompts/answers. Blank optional attribution SHALL create no empty row. Headings and controls SHALL fit the available width with readable text and minimum 48px touch targets.

#### Scenario: Long image-backed quote
- **WHEN** a synthetic quote contains multiline Unicode text and a long attribution over local artwork
- **THEN** the complete body and attribution remain readable and scrollable without clipping

#### Scenario: Long trivia and heading
- **WHEN** a long-titled trivia card has a long prompt and its answer is revealed
- **THEN** the full heading, prompt and answer wrap within the card, and Show/Hide remains accessible with the matching expanded state

#### Scenario: Short and absent optional fields
- **WHEN** a card contains very short text and missing or blank attribution
- **THEN** its complete text is visible without an empty attribution or irrelevant answer control

### Requirement: Optional synthetic illustration contract
Image-backed quote, fact and bucket-list content SHALL accept optional locally authored placeholder labels and six-digit colors. Missing media SHALL use a green text-only panel. Invalid supplied metadata SHALL produce a safe per-card error through existing validation with actionable Retry. No remote URI, base64, image transport or personal media SHALL be introduced.

#### Scenario: Image and no-image variants
- **WHEN** quote, fact or bucket-list content is supplied with valid local artwork or without media
- **THEN** artwork has its descriptive accessible image label when present, decoration is hidden, and absent media leaves complete readable text

#### Scenario: Invalid media and recovery
- **WHEN** supplied image metadata has a blank label, invalid color or wrong shape and the card is retried with valid content
- **THEN** only that card reports a safe error, last-good content is preserved where available, and Retry recovers without exposing raw payloads or requesting network content

### Requirement: Purposeful accessible feedback
Routine startup loading and success SHALL NOT issue five explicit iOS announcements. Settled outcomes of user-requested refresh/retry SHALL announce once on iOS. Loading/busy/disabled, generic errors with retry guidance, image labels and trivia expanded states SHALL remain accessible; purely decorative artwork/spinners SHALL not add redundant focus targets.

#### Scenario: Initial and user-requested transitions
- **WHEN** all five initial requests settle and the user refreshes or retries one card
- **THEN** startup issues no explicit iOS announcements, and the requested settled success or failure issues one useful announcement without a separate loading announcement

#### Scenario: Accessible errors and controls
- **WHEN** a card loads, fails or reveals its trivia answer
- **THEN** controls expose descriptive names and appropriate busy/disabled/expanded states, loading and error text remains readable, and the error identifies the Retry action

### Requirement: Retained orchestration and native workflow
The feed SHALL preserve five-card identity/order, independent refresh/retry, duplicate/stale protection, last-good content and successful-trivia answer reset. Content SHALL remain synthetic and offline. Both native projects, original app, backup, identity/security and owner changes SHALL remain intact.

#### Scenario: Existing behavior remains valid
- **WHEN** retained orchestration tests and normal disposable iPhone smoke run alongside edge acceptance
- **THEN** existing behavior passes without native regeneration, native dependency/config changes or live provider access

### Requirement: Auditable acceptance
Delivery SHALL strictly validate planning before product edits and distinguish actual Jest, disposable iPhone and hosted CI evidence. Reports SHALL record commands, preservation hashes, failures/fixes, limitations and human/escalation metrics. The sole PR SHALL be draft against main with no merge, release, deployment or OpenSpec archive.

#### Scenario: Reviewable delivery
- **WHEN** implementation is ready for draft review
- **THEN** locked unchanged verification, policy/harness/OpenSpec checks and actual normal/edge native outcomes are recorded separately, with local-only synthetic screenshots and auditory VoiceOver marked NOT RUN unless performed

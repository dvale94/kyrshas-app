# Spec Delta

## Purpose

Provide an offline, non-private home feed that preserves the legacy normal-day card hierarchy and allows deterministic presentation and interaction verification on iPhone.

## ADDED Requirements

### Requirement: Normal-day home presentation
The app SHALL display one green-branded home titled Kyrsha's App with five scrollable cards in quote, trivia, fact, dad joke, bucket list order, retaining stable identities through refresh.

#### Scenario: Initial offline home
- **WHEN** the app opens without provider configuration
- **THEN** the five cards appear in canonical order with uppercase green headings, green separators and a light background
- **AND** the demo is labeled synthetic and contains no birthday card on any date

### Requirement: Conditional card content
Cards SHALL render readable white text, optional attribution and locally authored synthetic image placeholders for quote, fact and bucket list. Trivia and dad joke SHALL use green text panels. Content SHALL grow without truncating long text or requiring optional fields.

#### Scenario: Image and text variants
- **WHEN** the five fixture cards render
- **THEN** quote, fact and bucket list show image placeholders behind legible text, quote shows fake attribution, and trivia and dad joke show text panels

#### Scenario: Long content and absent optional fields
- **WHEN** a card contains long text and empty or absent author, answer or image fields
- **THEN** the complete text remains available through scrolling and no empty attribution, answer control or image is rendered

### Requirement: Trivia visibility
Trivia SHALL initially hide its answer and expose an accessible Show Answer button that changes to Hide Answer when expanded. Other cards SHALL have no answer control.

#### Scenario: Show and hide
- **WHEN** the user presses Show Answer and then Hide Answer
- **THEN** the matching answer appears and disappears and the button's accessible name and expanded state follow its next action

#### Scenario: Refresh trivia
- **GIVEN** the current trivia answer is visible
- **WHEN** a successful refresh advances that card
- **THEN** the new question's answer starts hidden

### Requirement: Independent deterministic refresh
Each card SHALL offer an accessible refresh control with a visible busy state and prevent duplicate refreshes while busy. Successful refresh SHALL rotate only that card through fixed local variants, retaining its ID and other cards' content and answer state. Busy state SHALL clear on success or failure.

#### Scenario: Refresh one card
- **GIVEN** the trivia answer is visible
- **WHEN** the quote refresh starts and completes
- **THEN** only quote shows busy/disabled state then advances to its next fixture
- **AND** trivia content and visible answer, other cards and ordering remain unchanged

#### Scenario: Refresh rejection and retry
- **WHEN** a refresh callback rejects
- **THEN** the previous content is retained, a safe accessible error is shown and the busy state clears
- **AND** the card can be retried successfully without changing another card

### Requirement: Offline and platform boundaries
The presentation SHALL use only deterministic synthetic local content without provider requests, credentials, private assets, persistence or birthday content. Existing app identity, strict default/Release policy and approved Debug localhost policy SHALL remain unchanged.

#### Scenario: Render and interactions without network
- **WHEN** the home renders and all fixture interactions run with provider requests forbidden
- **THEN** no network request occurs and the home remains usable

### Requirement: Observable iPhone acceptance
The migrated home SHALL be validated on a disposable iPhone simulator through the existing localhost Metro loop with local-only screenshots or XCTest evidence. Local, native and hosted outcomes SHALL be reported separately.

#### Scenario: Real simulator smoke
- **WHEN** the installed synthetic app launches through Metro
- **THEN** the first and final cards, scrolling, Show/Hide, fixture refresh, portrait after rotation and hidden answer after relaunch are observed
- **AND** both original native trees, independent backup and owner changes remain preserved

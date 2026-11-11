# Spec Delta

## Purpose

Provide a small deterministic offline demonstration that exercises an interactive content surface without using personal content or an external provider.

## ADDED Requirements

### Requirement: Synthetic offline trivia
The app SHALL display a clearly identified demonstration question and answer using deterministic synthetic content, without credentials, personal fixtures, network requests or persistent storage.

#### Scenario: Offline initial render
- **WHEN** the app renders with no provider configuration
- **THEN** a synthetic trivia question and an accessible Show Answer button are visible
- **AND** its answer is initially hidden and no provider request is required

### Requirement: Answer visibility interaction
The app SHALL let the user reveal and hide the answer using an accessible button with a label reflecting the next action.

#### Scenario: Reveal answer
- **WHEN** the user presses Show Answer
- **THEN** the matching answer becomes visible and the button is labeled Hide Answer

#### Scenario: Hide answer again
- **GIVEN** the answer is visible
- **WHEN** the user presses Hide Answer
- **THEN** the answer becomes hidden and the button is labeled Show Answer

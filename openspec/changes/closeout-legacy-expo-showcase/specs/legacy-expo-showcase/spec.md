# Spec Delta

## Purpose

Enable an independently runnable, safe comparison of the original experience with the approved modern application.

## ADDED Requirements

### Requirement: Faithful legacy showcase
The showcase SHALL preserve the original experience's visual identity, content structure, navigation and representative interactions, subject to documented compatibility and synthetic-data differences. It SHALL exclude the historical birthday feature.

#### Scenario: Reviewer explores the showcase
- **WHEN** a reviewer opens and interacts with the showcase
- **THEN** the presentation and interactions reflect the documented historical source baseline and deviations are disclosed

### Requirement: Safe deterministic content
The showcase SHALL use safe deterministic local content without historical credentials, live provider calls or remote photo downloads by default.

#### Scenario: Showcase starts offline
- **WHEN** the showcase starts without network access to content providers
- **THEN** its representative content is available from local synthetic fixtures

### Requirement: Independent local operation
The legacy showcase and modern application SHALL be independently runnable in compatible Expo Go clients, with documented clean-install and launch commands and distinct Metro ports when run concurrently.

#### Scenario: Both applications are started
- **WHEN** a developer follows the documented commands for both applications
- **THEN** each application uses its own workspace and Metro port

### Requirement: Preservation and evidence
The historical and modern application source SHALL remain unchanged by this showcase, and the delivery SHALL distinguish verified results from unavailable runtime or hosted checks.

#### Scenario: Reviewer evaluates delivery
- **WHEN** the reviewer inspects the report
- **THEN** it identifies the historical source baseline, differences, verification outcomes and pending owner visual approval

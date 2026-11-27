# Spec Delta

## Purpose

Enable independently runnable original and modern applications for an owner-reviewed comparison.

## ADDED Requirements

### Requirement: Faithful legacy experience
The original root app SHALL retain its visual identity, content structure, navigation and representative interactions, subject to documented compatibility and synthetic-data differences. It SHALL exclude the historical birthday feature.

#### Scenario: Reviewer explores the original app
- **WHEN** a reviewer opens and interacts with the root app
- **THEN** the presentation and interactions reflect the documented historical source baseline and deviations are disclosed

### Requirement: Local text and live images
The root app SHALL use synthetic local text and retrieve random images from the original image provider using the owner's locally configured key. It SHALL not use historical credentials.

#### Scenario: Image cards load
- **WHEN** the app displays an image-backed card with a configured key and an available provider
- **THEN** it requests a random image from the provider while keeping card text local

#### Scenario: Image provider unavailable
- **WHEN** an image cannot be retrieved
- **THEN** the app remains usable without exposing the key or provider error details

### Requirement: Independent local operation
The root legacy app and modern application SHALL be independently runnable in compatible Expo Go clients with documented clean-install commands and distinct Metro ports when concurrent.

#### Scenario: Both applications are started
- **WHEN** a developer follows the documented commands for both applications
- **THEN** each application uses its own workspace and Metro port

### Requirement: Preservation and evidence
The modern application and existing native projects SHALL remain unchanged, and delivery SHALL distinguish verified results from unavailable runtime or hosted checks.

#### Scenario: Reviewer evaluates delivery
- **WHEN** the reviewer inspects the report
- **THEN** it identifies the historical baseline, differences, verification outcomes and pending owner visual approval

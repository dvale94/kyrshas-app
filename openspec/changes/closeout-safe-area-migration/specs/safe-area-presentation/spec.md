# Safe-area presentation

## Purpose

Preserve the approved Afterglow presentation across device safe areas while avoiding deprecated native APIs.

## ADDED Requirements

### Requirement: Safe-area presentation remains stable
The modern app SHALL retain its approved full-bleed artwork and safe-area positioning across supported screen sizes.

#### Scenario: Notched or compact device
- **WHEN** the app is displayed on a compact or notched device
- **THEN** artwork remains full bleed and inset content retains its existing positioning without duplicate padding

### Requirement: Reading and navigation remain intact
The modern app SHALL preserve adaptive text fitting, vertical swipes, taps, trivia controls, and content-provider behavior.

#### Scenario: Navigate and read chapters
- **WHEN** a user reads and navigates the chapters using swipe or tap controls
- **THEN** the existing content, navigation, and adaptive reading behavior remain available

### Requirement: Deprecated safe-area warning is resolved
The modern app SHALL render without the React Native SafeAreaView deprecation warning or a missing native module error, without suppressing the warning.

#### Scenario: Run in compatible Expo Go
- **WHEN** the app starts and its chapters are exercised in SDK-compatible Expo Go
- **THEN** neither the deprecation warning nor a missing native module error appears

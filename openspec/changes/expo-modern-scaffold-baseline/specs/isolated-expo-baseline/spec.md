# Spec Delta

## Purpose

Supply a reproducible isolated iPhone scaffold and evidence that enables later migration decisions while preserving the original application and native state.

## ADDED Requirements

### Requirement: Isolated reproducible installation
The scaffold SHALL install within `modernization/expo-next/` using a committed deterministic lockfile, a documented supported toolchain and officially verified stable SDK compatibility information.

#### Scenario: Clean install
- **WHEN** a contributor uses the recorded Node/package-manager versions and clean-install command in the isolated directory
- **THEN** the lockfile resolves the recorded Expo, React and React Native baseline without installing legacy root dependencies or requiring account credentials

### Requirement: Legacy and native preservation
The change MUST preserve the root application, its dependency/config files, existing harness CI, ignored iOS tree and separate backup, with an explicit changed-file review and native preservation evidence.

#### Scenario: Delivery scope review
- **WHEN** the change is reviewed against its fetched main base
- **THEN** only the isolated scaffold, new isolated CI, change artifacts, baseline/report documentation and handoff pointer are changed
- **AND** the ignored native tree fingerprint is unchanged and the separate backup is untouched

### Requirement: iPhone presentation and identity preservation
The scaffold SHALL configure iOS-only, iPhone-only portrait/light presentation and document preservation of existing bundle identifier, slug, EAS association, naming intent and identity-derived URL scheme without registration or signing changes.

#### Scenario: Metadata comparison
- **WHEN** local Expo metadata is evaluated without login or credentials
- **THEN** configuration expresses iPhone-only portrait behavior and the preserved identity/scheme mapping
- **AND** documentation distinguishes configured, metadata-verified and device-unverified settings

### Requirement: Explicit baseline and secure defaults
The scaffold SHALL document its display-name/version baseline, unresolved release/native override authority and icon/splash provenance. It MUST omit broad arbitrary-load ATS exemptions, live provider configuration and update-service activation.

#### Scenario: Compare inventoried settings
- **WHEN** scaffold configuration is compared with app.json and the native inventory
- **THEN** differences in name/version, phone targeting, ATS, scheme, assets and updates are recorded
- **AND** ambiguous release settings remain an owner decision before migration acceptance

### Requirement: Executable verification
The scaffold SHALL offer a meaningful automated interaction test, static checks and available Expo compatibility diagnostics without requiring live app services. A separate CI workflow SHALL be added only after local checks work reproducibly, leaving existing harness CI unchanged.

#### Scenario: Verification run
- **WHEN** the documented checks run after a clean isolated install
- **THEN** tests exercise the visible answer interaction and static/compatibility checks report their actual outcomes
- **AND** isolated CI uses the same pinned toolchain and commands if local verification succeeds

### Requirement: Honest delivery evidence
The delivery SHALL include the migration baseline, issue report, handoff pointer and PR targeting main linked to issue #5, recording exact commands, outcomes, limitations, next slices and human interventions. It MUST NOT claim unexecuted device checks or perform merge, deployment, publishing or automatic archive.

#### Scenario: Reviewer assesses readiness
- **WHEN** the PR is opened
- **THEN** evidence separates PASS, FAIL, NOT RUN and BLOCKED, lists unresolved native/runtime/release gates and recommends separate compromised-credential remediation without exposing or using the credential
- **AND** task-specific prompts and extra human interventions after kickoff are recorded

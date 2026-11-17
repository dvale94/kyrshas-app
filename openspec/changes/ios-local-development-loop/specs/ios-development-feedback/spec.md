# Spec Delta

## Purpose

Provide repeatable native iPhone development feedback evidence while preserving the application's strict transport policy and explicitly gating security changes.

## ADDED Requirements

### Requirement: Observe native transport boundaries
Diagnostics SHALL distinguish Metro host availability, built native policy, actual app transport and simulator rendering. They MUST NOT infer native refresh from a host bundle or config introspection alone.

#### Scenario: Metro runs but native HTTP is rejected
- **WHEN** Metro responds on loopback but the native app rejects its request
- **THEN** the report records the native error, effective Debug/Release policy evidence and blocked live-loop outcome
- **AND** host bundling is reported separately from simulator feedback

### Requirement: Demonstrate actual development feedback
A live-loop PASS SHALL require a harmless synthetic UI edit to appear on the simulator through Metro refresh without rebuilding native code, under approved policy.

#### Scenario: Native refresh is available
- **WHEN** an edited synthetic marker reaches the simulator through Metro
- **THEN** the report identifies the edit, refresh action and unchanged native binary
- **AND** temporary probe content is restored before delivery

#### Scenario: Native refresh remains unavailable
- **WHEN** unchanged policy prevents the live loop
- **THEN** live refresh is BLOCKED or NOT RUN with evidence
- **AND** the embedded Debug fallback is reproduced and distinguished from Fast Refresh

### Requirement: Gate security changes
Any ATS exception, transport permission, trust/signing/capability, identity or material native-policy change MUST remain unapplied until separate owner approval.

#### Scenario: A Debug allowance is proposed
- **WHEN** a policy change is necessary to enable native Metro
- **THEN** a concrete unapplied preview identifies Debug-only scope, committed/generated authority, strict Release verification and rollback
- **AND** the owner is asked before application, with no blanket arbitrary-loads exception

### Requirement: Contain the approved Debug policy
The implementation SHALL add only a localhost insecure-HTTP domain exception to Debug, with subdomains disabled and arbitrary loads/local networking false. Default and Release SHALL remain exactly strict. Committed shared plugin/tooling SHALL support drift-checked application to the existing native tree without cleaning or regeneration.

#### Scenario: Apply the owner's narrow approval
- **WHEN** the recorded owner approval is implemented
- **THEN** the dedicated Debug plist is derived from the unchanged base and only the Debug reference changes
- **AND** input drift, unknown policy or symlink escapes are rejected before mutation
- **AND** fixture checks reject every unapproved exception and actual independent Debug/Release processed plists demonstrate separation

#### Scenario: Exact exception is insufficient
- **WHEN** native Metro transport still requires broader permission after applying the approved localhost exception
- **THEN** the agent stops and reports actual failure without broadening policy
- **AND** no unavailable live-refresh or smoke outcome is reported as passing

### Requirement: Preserve work and deliver evidence
The workflow SHALL preserve legacy/native/backup state, credentials, signing and owner changes; existing checks, outcome limits and interventions SHALL be recorded in a scoped PR without merge or archive.

#### Scenario: Delivery under an approval boundary
- **WHEN** authorized diagnosis and safe checks finish with live reload blocked
- **THEN** a reviewable PR contains the report, proposal, fallback commands and actual PASS/FAIL/BLOCKED/NOT RUN outcomes
- **AND** prior changes remain unarchived and protected files/index entries remain preserved

# Spec Delta

## Purpose

Provide repeatable, contained native iPhone scaffold validation and distinguish generated configuration evidence from actual simulator behavior before selective feature migration.

## ADDED Requirements

### Requirement: Contained native validation
Validation SHALL operate only on the isolated scaffold and preserve legacy source, original ignored native state and the independent backup. It MUST NOT use credentials, live providers, signing accounts or release services.

#### Scenario: New native generation
- **WHEN** native generation is requested with no isolated native tree present
- **THEN** generation targets only the isolated scaffold, without cleaning or replacing any existing tree
- **AND** original native path/type/content/link fingerprints remain identical

#### Scenario: Existing native tree
- **WHEN** a native tree already exists in the scaffold
- **THEN** it is inspected and protected from deletion or regeneration without separate approval

### Requirement: Native configuration evidence
Validation SHALL compare generated device family, identity, effective display name/version/build, scheme, orientation, ATS, updates, entitlements/capabilities, minimum OS and icon/splash resources with the inventory and baseline. Each comparison MUST state MATCH, INTENTIONAL DIFFERENCE or UNRESOLVED with evidence/confidence.

#### Scenario: Generated resources are available
- **WHEN** generation succeeds
- **THEN** checks inspect actual generated project/plists/resources rather than claiming config introspection proves native output
- **AND** provisional metadata and artwork authority remain unresolved for production

#### Scenario: Built resources are unavailable
- **WHEN** no native build succeeds
- **THEN** effective binary metadata, entitlements and visual appearance are explicitly unverified

### Requirement: Synthetic simulator smoke
On a compatible available iPhone simulator, the synthetic app SHALL build, install, launch without native crash, render its question, reveal and hide the answer, honor portrait intent and relaunch. Evidence MUST identify simulator/OS/build and distinguish observable identity and artwork from production approval.

#### Scenario: Runnable environment
- **WHEN** compatible tools/runtime and an isolated test simulator are available
- **THEN** build/install/launch and each smoke step receive observed outcomes with sanitized evidence
- **AND** no real installed user data is overwritten

#### Scenario: Environment unavailable
- **WHEN** compatible Xcode, Pods or iPhone runtime/device is unavailable
- **THEN** native execution is BLOCKED with precise requirements and unexecuted smoke steps are NOT RUN
- **AND** safe static preparation, existing checks, documentation and PR delivery continue without automatic system upgrades or runtime installs

### Requirement: Repeatable verification and delivery
Delivery SHALL record clean isolated dependency installation, existing verification outcomes, preservation review, reproduction commands, a device smoke checklist and proposal-only ordered migration slices. The report, handoff and PR MUST distinguish local command evidence, hosted CI, failures, blockers and owner interventions.

#### Scenario: Completed bounded pilot
- **WHEN** all feasible checks finish
- **THEN** a scoped PR targets main with acceptance evidence and remaining gates
- **AND** no merge, deployment, release or OpenSpec archive occurs

#### Scenario: Transport or production decision required
- **WHEN** execution requires weaker ATS, signing, production metadata/artwork authority or an incompatible toolchain change
- **THEN** that action stops for owner approval and existing security defaults remain intact

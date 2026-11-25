## ADDED Requirements

### Requirement: Scenic chapter presentation
The app SHALL render the five canonical chapters over their matching bundled illustrations, including behind safe-area chrome, with editable system typography, slim segmented location, illuminated category icons and circular refresh targets.

#### Scenario: Read a short chapter
- **WHEN** a short quote, trivia question, fact, dad joke or bucket-list suggestion is ready
- **THEN** its complete text appears in the upper scenery without an opaque reading card, the lower artwork remains visible, and optional attribution is displayed only when supplied.

#### Scenario: Artwork fails
- **WHEN** the bundled illustration cannot display or content image metadata is absent
- **THEN** content, location and actions remain available on a readable midnight fallback or the chapter's canonical scene independently of provider metadata.

### Requirement: Legible reading and bounded navigation
The app SHALL preserve settled five-chapter paging, mounted state and existing scroll arbitration while providing reachable chapter controls and sufficient contrast for complete content.

#### Scenario: Short content fits
- **WHEN** the measured chapter fits the viewport
- **THEN** normal navigation offers a restrained swipe cue with explicit tap targets, advancing one chapter at a time within the existing bounds.

#### Scenario: Content grows
- **WHEN** a long body, attribution, title or revealed answer exceeds the reading area, including at large text sizes
- **THEN** reading can scroll independently over a protected background, the active chapter is retained, and labeled navigation remains reachable outside the reader.

### Requirement: Interaction states respect content ownership
The app SHALL keep last-good text and answer visibility on pending or failed refresh while exposing clear loading, retry and answer controls.

#### Scenario: Trivia disclosure
- **WHEN** a question appears
- **THEN** the answer is absent until Show Answer is activated, a luminous labeled surface precedes Hide Answer, and each successful revision resets disclosure.

#### Scenario: Failed refresh
- **WHEN** a chapter refresh fails
- **THEN** safe feedback and retry remain local to the chapter and the previous content is still readable.

### Requirement: Measured visual evidence
Delivery SHALL preserve the seven supplied originals, record asset provenance, dimensions, hashes, bytes and decoded estimates, and compare simulator captures to the two supplied boards.

#### Scenario: Prepare visual review
- **WHEN** the draft is submitted
- **THEN** evidence identifies fixture, device, implementation revision, five chapter views, hidden and revealed trivia, loading, refresh, error and long reading, with visual differences and remaining owner decisions recorded.

# Design

## Context

The root legacy app and modern Afterglow are separate runnable applications. Delivery records contain both successful checks and unresolved limitations; the README currently provides launch instructions and historical previews. See the proposal for scope.

## Goals / Non-Goals

**Goals:** Make a traceable, concise portfolio and accurately distinguish historical evidence from current verification.

**Non-Goals:** Product behavior, dependencies, visual redesign, release, archive or fabricated evidence.

## Decisions

- Reference approved existing screenshots and document a capture checklist if no verified current legacy capture exists; do not create mock evidence or duplicate assets.
- Link to existing technical and historical documents, with concise synthesis rather than duplicating their detail. Preserve historical records and explicitly identify unchecked tasks.
- Use a documentation-only OpenSpec change with no product requirement delta. Validate it before portfolio edits.

## Risks / Trade-offs

- Stale or conflicting reports → distinguish observations, historical results and open verification; cite evidence.
- Missing legacy screenshot → leave a clear placeholder and capture checklist for owner review.
- External delivery may require security approval → do not bypass review; report a blocked push.

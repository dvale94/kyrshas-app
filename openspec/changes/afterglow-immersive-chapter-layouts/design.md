## Context

Issue #29 advances artwork integration and replaces the 04C default panel and navigation styling. The merged 04A interaction model and 04B pager still define behavior. The actual concept boards are under `docs/design/afterglow/references/`.

## Goals / Non-Goals

Reconstruct all five compositions on compact and standard portrait iPhones using supplied art and dynamic content. Preserve the underlying data, paging, reading offsets and action contracts. Motion polish, asset generation, native work and new services are outside scope.

## Decisions

1. Map the canonical chapter ID to one local JPEG per scene. Retain original PNGs for provenance and use static imports of only derivatives. Render a midnight canvas under the illustration. Keep safe-area controls over the artwork and imagery outside reading measurement.
2. Put the heading and circular refresh above the primary serif text. Place the quote in italic with a separate optional credit. Preserve intact joke text. Use a lower illuminated answer panel and toggle for trivia, yielding decorative space before adding overflow. Use opaque protection when reading exceeds the scenic space. Text remains complete at large sizes.
3. Retain all five mounted slots, the existing measured pager and its settled location. Keep small explicit bounded navigation targets, replacing them with labeled navigation for overflow or assistive use. Distinguish mock/live-local quietly. No inferred punchline, invented attribution, completion marker or status embodied in artwork.
4. Exercise the existing external unsigned Debug binary on disposable simulators. Use an external synthetic fixture entry for board-like text and controlled action states. Keep production entry and fixtures intact. Compare screenshots against both boards; record cropping, bytes, footprint and residual differences.

## Risks / Trade-offs

Different aspect ratios crop scene edges. Short copy can share natural negative space, while long copy needs stronger contrast and scrolling. A settled background can transition at page settlement; no new animation is required. Static estimated decoded bytes exclude caching and native overhead. Human visual approval follows draft review.

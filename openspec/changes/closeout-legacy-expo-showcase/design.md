# Design

## Context

The historical source at baseline `e3babc05ee077da1f95439353fe9e2b4184f260b` uses Expo 49, React Navigation's JavaScript stack, RNEUI images/icons and a FlatList with five content types. The last commit touching the examined legacy entry, screen or provider files is `5a6dc07e5caca78495128253df8c1e69229aedea`. The provider downloads random images and text; the birthday data path is excluded. The existing audit documents native package mismatches and the risk of historical configuration. The modern workspace uses SDK 58 and Node 22.23.4.

## Goals / Non-Goals

**Goals:** Retain the original component structure, styling and interactions in a self-contained workspace with safe fixtures, and record every necessary deviation.

**Non-Goals:** Production data, account access, native regeneration, birthday content, release, or changes to either existing app.

## Decisions

- Copy the original entry and home component implementation into an isolated workspace and adapt only what SDK compatibility and offline deterministic data require. This avoids the fidelity risk of a visual reimplementation. Keep the original files unchanged.
- Replace the provider and birthday path with deterministic local records preserving IDs, ordering, attribution, answer toggles and refresh callbacks. Use safe bundled imagery with documented substitutions; no provider requests or historical configuration. Retaining live endpoints would require credentials and network availability.
- Align Expo, React and React Native with the established SDK 58 modern workspace where compatible; use an independent lockfile and verify navigation/UI library compatibility. Expo Go requires a matching SDK; an SDK 49 bundle cannot be assumed runnable on a current iPhone. Retain original navigation and UI libraries if compatible; document any necessary substitute.
- Keep separate Metro ports, 8082 for legacy and 8081 for modern. Disable dotenv loading in scripts. Verification must distinguish package checks, bundles, simulator/device observations, and owner visual acceptance.

## Risks / Trade-offs

- [SDK and third-party compatibility] → run Expo compatibility and doctor checks, test navigation and rendering, and document unresolved runtime limitations.
- [Random remote images cannot be reproduced] → bundle safe substitutes and disclose their source and visual differences.
- [Expo Go runtime not available] → record blocked status and provide physical-iPhone instructions; do not claim visual fidelity.
- [Historic native state and credentials] → leave original files and native trees untouched; do not inspect private environments or import legacy configuration.

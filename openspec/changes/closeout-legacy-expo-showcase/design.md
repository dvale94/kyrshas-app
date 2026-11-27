# Design

## Context

The owner explicitly authorizes compatibility changes to the original root app and removal of the separate showcase. Baseline `e3babc05ee077da1f95439353fe9e2b4184f260b` preserves the historical implementation in Git. The root app uses a stack navigator, five cards and a remote provider. Birthday content remains excluded.

## Goals / Non-Goals

**Goals:** Run the original root app in compatible Expo Go alongside unchanged Afterglow, retaining its presentation and interactions with live random text and images.

**Non-Goals:** Native regeneration, deployment, historical credential reuse, modern application changes, or redesign.

## Decisions

- Adapt original root components in place and retain their visual styles, rather than maintaining a third workspace. Preserve native trees and app identity configuration.
- Restore API Ninjas random text and image requests using the owner's local Expo public environment key. The key is client-readable in Expo bundles and must not be reused from historical configuration or printed. Keep the app usable if images fail; the owner selected unfiltered requests because category and dimension parameters require a paid tier.
- Align root Expo and native packages with a compatible SDK and use the verified Navigation 7 stack. Maintain an independent root lockfile and use port 8082; Afterglow remains on 8081.
- Remove the redundant showcase only after its needed behavior, tests and assets are available at root. Preserve prior source in Git history and record intentional differences.

## Risks / Trade-offs

- [Root compatibility updates affect historical working files] → preserve historical baseline in Git and restrict changes to the authorized runnable legacy scope.
- [Native trees and app identity] → never prebuild, regenerate, delete or alter existing native trees; document unknown installed-user compatibility.
- [Runtime and visual fidelity] → verify in Expo Go when available and leave owner approval pending otherwise.

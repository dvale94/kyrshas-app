# Design

## Context

The chapter pager currently imports React Native's deprecated SafeAreaView. The approved scene and inset chrome must retain their layout. See the proposal and safe-area-presentation spec.

## Goals / Non-Goals

**Goals:** Replace the deprecated primitive with the SDK-compatible supported library, with stable root context and equivalent inset behavior.

**Non-Goals:** Redesign, backend or provider changes, native regeneration, new builds, unrelated upgrades, or warning suppression.

## Decisions

- Use Expo install under the pinned toolchain to select the SDK-compatible direct dependency. An arbitrary latest version risks native incompatibility.
- Place SafeAreaProvider at the app root and the library view at the existing inset boundary; keep background artwork outside that boundary. Avoid manual or doubled insets.
- Adapt test and external fixture wrappers where necessary. Exercise the actual native implementation in compatible Expo Go, not the old unsigned Debug binary.

## Risks / Trade-offs

- Insets can differ between implementations → verify compact and notched layouts and preserve edge behavior.
- Expo Go or simulator may be unavailable → report runtime checks as blocked rather than assuming success.
- Dependency installation may alter unrelated lock entries → inspect and stop if broader policy changes are required.

## Migration Plan

Validate the change strictly before implementation, install the single dependency, make the focused replacement, run the full verification contract and runtime checks, and document results. Revert the focused commit to roll back if needed.

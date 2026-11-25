# Proposal

## Why

React Native warns that its SafeAreaView is deprecated. Resolve the warning while retaining the owner-approved Afterglow experience.

## What Changes

- Install the Expo SDK-compatible safe-area library and provide its context at the modern app root.
- Replace the deprecated view while preserving existing layout and behavior, and verify without warning suppression.
- Record verification and remaining runtime limitations, and prepare a draft PR.

## Capabilities

### New Capabilities

- `safe-area-presentation`: Safe-area behavior and warning-free rendering of the modern Afterglow experience.

### Modified Capabilities

None.

## Impact

The isolated Expo app, its direct dependencies and lockfile, test setup, and delivery documentation. No backend, native project, visual redesign, or unrelated dependency change is in scope.

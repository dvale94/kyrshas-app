# Proposal

## Why

The owner wants two runnable experiences, with the original app at the repository root and Afterglow in its existing workspace. The original SDK 49 requires compatibility changes. The owner wants the original live content and image provider with a locally configured key.

## What Changes

- Adapt the original root application for Expo Go with owner-authorized live random content and images, retaining its visual identity and interactions.
- Remove the separate legacy showcase after moving necessary compatibility work into the root app.
- Preserve the modern workspace and native trees; historical root source remains available in Git history.
- Document compatibility differences, launch instructions and actual verification; owner retains final visual approval.

## Capabilities

### New Capabilities

- `legacy-expo-showcase`: Independently runnable legacy and modern experiences.

### Modified Capabilities

None.

## Impact

Root legacy runtime, configuration, dependencies, lockfile, tests and documentation; removal of the redundant showcase. No modern app changes, native regeneration, historical credential use or release.

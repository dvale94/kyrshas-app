# Proposal

## Why

The owner approved Afterglow and wants a runnable before-and-after portfolio comparison. The original Expo 49 application cannot be assumed compatible with a current Expo Go client, and its live content configuration must not be reused.

## What Changes

- Create a separately runnable legacy Expo Go showcase grounded in the original source and assets, using safe deterministic content and documented compatibility changes.
- Keep the original and modern application source unchanged, exclude the historical birthday feature, and provide independent launch instructions.
- Reconcile issue #31 evidence, including the owner's iPhone confirmation and the security-review block followed by the owner's manual push.
- Validate both workspaces and document actual runtime and hosted-check limitations; seek owner visual approval before merge.

## Capabilities

### New Capabilities

- `legacy-expo-showcase`: A safe, independently runnable and historically grounded legacy experience alongside Afterglow.

### Modified Capabilities

None.

## Impact

Adds an isolated workspace and its dependencies, lockfile, tests, documentation, and evidence. Does not change root or modern runtime code, native projects, production services, or credentials. Final dependency and compatibility decisions require direct source and installed-toolchain assessment before implementation.

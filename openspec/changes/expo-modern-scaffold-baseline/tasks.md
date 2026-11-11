# Tasks

## 1. Reproducible isolated scaffold

- [x] 1.1 Add minimal Expo/TypeScript bootstrap and pinned tooling/dependencies under modernization/expo-next; verify an isolated npm install and npm ci succeed and record resolved versions/commands in the baseline doc.
- [x] 1.2 Configure iPhone-only portrait/light, preserved identity/scheme, disabled OTA, secure ATS defaults and tracked icon/splash references; add executable metadata assertions and document inventory comparison, provisional name/version and unresolved native/release authority; verify metadata checks and Expo diagnostics.

## 2. Synthetic interactive surface

- [x] 2.1 Implement accessible offline trivia answer reveal/hide with deterministic synthetic content; add component interaction tests and strict typecheck, document the demo boundary, and verify initial/revealed/hidden states with no network dependency.
- [x] 2.2 After local checks pass, add a separate path-filtered CI workflow with the pinned toolchain, clean install and the same checks; verify workflow paths/commands and retain existing harness CI unchanged.

## 3. Integrated delivery review

- [x] 3.1 Validate OpenSpec strictly, rerun available repository harness and isolated app checks, perform changed-file/secret-shape review and compare ignored native fingerprint; record exact PASS/FAIL/NOT RUN/BLOCKED outcomes, native confidence, risks and next slices in the baseline and issue report; update handoff while preserving prior reports.
- [x] 3.2 Review acceptance coverage and final diff, commit and push the dedicated branch, and open a PR against main linked to issue #5; record PR and human-intervention evidence without merging, deploying, publishing or archiving.

## Workflow follow-up

- Owner/reviewer accepts the PR; future native/runtime/asset/release and credential remediation work needs separate approval.
- Archive only if later explicitly requested.

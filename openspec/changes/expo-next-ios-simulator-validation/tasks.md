# Tasks

## 1. Specification and preflight

- [x] 1.1 Consume issue #7 and merged baseline, preserve clean status/original-native fingerprint, record toolchain/runtime preflight and strictly validate all planning artifacts before native implementation; verify with issue retrieval, fingerprint count and `openspec validate expo-next-ios-simulator-validation --strict --json`.

## 2. Generated native evidence

- [x] 2.1 Run isolated `npm ci` and unchanged `npm run verify`, attempt new contained iOS generation without cleaning, add a read-only native checker and validate actual generated settings/resources or record precise generation blockers; document commands/outcomes and comparison in the native-validation doc.
- [x] 2.2 Evaluate native build/install/launch and question/show/hide/portrait/relaunch/identity/artwork smoke on a compatible isolated iPhone simulator, or document environment BLOCKED and every unexecuted case NOT RUN; verify through runtime/build evidence or exact prerequisite diagnostics and deliver a repeatable device checklist.

## 3. Delivery review

- [ ] 3.1 Deliver ordered proposal-only feature slices, issue-7 report and handoff with risks/intervention counts; verify acceptance mapping, rerun strict spec/harness/diff checks, compare original native fingerprints and review changed-path allowlist, then open a scoped PR against main and distinguish local from hosted CI evidence.

## Workflow follow-up

- Owner separately resolves toolchain/runtime provisioning, production metadata/artwork, credential remediation, feature specifications and future migration/release gates.
- Do not merge, deploy, publish, release or archive this change.

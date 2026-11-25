# Tasks

## 1. Safe-area migration

- [x] 1.1 Strictly validate this change before source or package edits.
- [x] 1.2 Install the SDK-compatible library with Expo install under the pinned toolchain and review the lock diff for unrelated upgrades.
- [x] 1.3 Add the root provider and replace the deprecated view, adapt test and fixture wrappers as needed, and verify existing behavioral tests.
- [x] 1.4 Document implementation and verification results in the report and handoff, including any blocked runtime checks.

## 2. Integration verification

- [ ] 2.1 Run the full pinned verification contract, strict active/all OpenSpec validation, root harness, and scope, security, and native preservation checks.
- [ ] 2.2 Exercise compatible Expo Go on compact/notched layout, navigation, fitting, trivia and warning/native-module behavior; record actual results.
- [ ] 2.3 Open a draft PR and verify hosted CI without merging.

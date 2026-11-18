# Tasks

## 1. Approved contract and preservation

- [x] 1.1 Record observed legacy contract, deliberate differences and acceptance strategy in docs/migration/expo-next-home-ui.md; verify active change with openspec validate home-card-ui-migration --strict before product edits and preserve pre-build fingerprints.

## 2. Home presentation and interactions

- [x] 2.1 Implement typed local fixtures and reusable home/card/text/image presentation inside the isolated app; verify five-card order, stable IDs, conditional imagery/author, long content, empty optional fields, accessible controls and retained baseline trivia with component tests and TypeScript.
- [x] 2.2 Implement deterministic per-card refresh and error-safe completion; verify busy/disabled state, duplicate prevention, rotation, trivia reset, unrelated-card state retention, overlapping refresh, rejection/retry and zero network requests with controlled component tests; document interaction semantics.

## 3. Integrated iPhone acceptance

- [x] 3.1 Run clean locked isolated npm ci and full npm run verify with online compatibility/Doctor, source/config/sync/exact-policy checks, starter harness and strict OpenSpec; record actual outcomes without weakening checks.
- [x] 3.2 Update standalone native smoke and run on a disposable iPhone through approved localhost Metro; capture local first/final cards, scrolling, Show/Hide, synthetic refresh, portrait/relaunch, independent processed Debug/Release policy checks and compare original native fingerprints.

## 4. Delivery evidence

- [x] 4.1 Independently assess acceptance and scoped diff, update migration guide/report/handoff with PASS/FAIL/BLOCKED/NOT RUN, actual local/native/hosted evidence, preservation and intervention/debugging metrics; open one draft PR against main referencing issue #11 and record hosted CI outcomes.

## 5. Authorized SDK 58 patch alignment

- [x] 5.1 Verify current supported recommendations, generate only the authorized expo/jest-expo patch and required compatible transitive lock updates with pinned npm, and verify the direct-dependency/script allowlist and native package delta.
- [x] 5.2 Run clean npm ci, full unchanged verify/Doctor/all Jest and policy tests, existing native source/security/preservation checks; evaluate and execute a contained rebuild/simulator smoke if native compatibility changes require it, recording PASS/FAIL/BLOCKED/NOT RUN separately.
- [ ] 5.3 Update the existing report/migration docs/handoff and PR12 with exact package changes and continuation metrics; verify both hosted CI workflows on the final head and strict OpenSpec without merge/release/archive.

## Workflow follow-up

- Keep this change unarchived for owner review. Subsequent slices 03C–03G require their own approved scopes; no merge, deployment or release.

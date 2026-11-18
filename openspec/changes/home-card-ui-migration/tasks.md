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

- [ ] 4.1 Independently assess acceptance and scoped diff, update migration guide/report/handoff with PASS/FAIL/BLOCKED/NOT RUN, actual local/native/hosted evidence, preservation and intervention/debugging metrics; open one draft PR against main referencing issue #11 and record hosted CI outcomes.

## Workflow follow-up

- Keep this change unarchived for owner review. Subsequent slices 03C–03G require their own approved scopes; no merge, deployment or release.

---
name: deliver-feature
description: Implement a bounded, approved feature or OpenSpec change autonomously, with tests, repair, and documented completion evidence. Use after scope is approved.
---

1. Read `AGENTS.md`, approved `openspec/changes/<change>/` artifacts (or equivalent spec), and `docs/verification.md`. Confirm scope is approved and acceptance criteria are testable.
2. Inspect relevant code and dependency impact; consult Gortex when it adds value.
3. Plan a small sequence of vertical slices; do not expand beyond approved scope.
4. Execute, test, correct failures, and repeat within the allowed scope. Prefer deterministic, repo-native commands.
5. Don't invent passing tests; record exact outcomes, environment limitations, and manual checks required.
6. Pause for security, auth, persistence, architecture, destructive changes, new major dependencies, deployment, publishing, or material ambiguity.
7. Update docs/spec task tracking and `.agentic/handoff.md` with evidence. Don't merge, deploy, or publish autonomously.

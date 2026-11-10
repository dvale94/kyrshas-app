---
name: audit-project
description: Inspect a legacy or unfamiliar repository, assess technical debt and modernization options without editing application code. Use for onboarding, audits, and migration planning.
---

1. Read `AGENTS.md`, `docs/architecture.md`, `docs/verification.md`, and `git status`.
2. Inventory versions and exact dependency declarations from files; do not infer framework versions from memory.
3. Map entry points, high-risk features, external dependencies, and existing tests. Use Gortex if available and useful; cite actual file paths.
4. Run only read-only or non-destructive diagnostics explicitly allowed by project rules; identify commands that could modify the lockfile before invoking them.
5. Compare realistic options with evidence, costs, risks, preservation constraints, and an explicit recommendation.
6. Write a concise audit under `docs/migration/` and questions that truly require product-owner decisions.
7. Do not edit application code, dependencies, package lockfiles, generated native folders, or CI. Stop with a proposed plan awaiting approval.

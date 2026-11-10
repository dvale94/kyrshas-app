# Agentic Engineering Starter — repository instructions

## Source of truth
- Code and passing checks establish current behavior.
- `docs/product/brief.md` defines the product intent; `docs/architecture.md` and `docs/decisions/` record durable engineering decisions.
- `openspec/` (after initialization) contains approved feature/change specifications. Do not treat ChatGPT conversation history as an authoritative requirement.
- In conflicts, report the contradiction before making a behavior-changing choice.

## Standard workflow
1. Read the relevant specs, documentation, and affected code before editing.
2. For nontrivial or ambiguous changes, prepare an OpenSpec proposal and obtain approval of scope. For a small bug, define a reproducer and expected result.
3. Within an approved scope, work autonomously: inspect, implement, test, repair, and re-test.
4. Prefer the smallest coherent change. Preserve existing public contracts unless explicitly approved.
5. Use Gortex for relationship/impact questions **when configured and useful**; verify claims against actual code.
6. Run checks defined in `docs/verification.md`; do not report an unavailable check as passing.
7. Produce a final report: summary, changed files, checks with outcomes, risks, blockers, and approval requests.

## Stop and ask approval for
- Scope expansion or a material architecture change.
- New paid services, major dependencies, auth/permission/security changes, or changes to persistent data models.
- Database migrations affecting existing data, deleting/regenerating native projects, destructive commands, force pushes, production secrets, deployments, publishing or releases.
- Conflicting requirements or absent evidence needed to safely proceed.

## Allowed without repeated approval (within approved scope)
- Read source and existing docs; create/edit scoped code and tests; run non-destructive local builds and tests; fix test failures; update feature docs and reports.
- Make reversible implementation choices consistent with architecture and existing conventions.

## Engineering principles
- Avoid unrelated changes, unnecessary abstractions, and new dependencies without a specific reason.
- Never commit secrets; avoid printing tokens or private customer data.
- Keep test fixtures synthetic. Preserve existing Git changes: inspect `git status` before work and never reset another person's modifications.
- Separate 'passed', 'failed', 'not run', and 'blocked' in the final report.

## Navigation
- Product intent: `docs/product/brief.md`
- Architecture: `docs/architecture.md`
- Decisions: `docs/decisions/`
- Verification commands: `docs/verification.md`
- Workflows: `.agents/skills/`
- Agent handoffs: `.agentic/handoff.md`
- Legacy Expo modernization: `docs/migration/expo-audit.md`

<!-- Gortex/OpenSpec may add managed sections here. Preserve them on updates. -->

<!-- gortex:communities:start -->
## Community Skills

| Area | Description | Explore |
|------|-------------|---------|
| Screens Homescreen 1 Dirs | 6 symbols | `analyze(operation:"communities", id:"community-6")` |
| 2 Dirs | 5 symbols | `analyze(operation:"communities", id:"community-5")` |
| 1 Dirs Errorhandler | 3 symbols | `analyze(operation:"communities", id:"community-2")` |
| 1 Dirs Parseapiresponse | 3 symbols | `analyze(operation:"communities", id:"community-1")` |

<!-- gortex:communities:end -->

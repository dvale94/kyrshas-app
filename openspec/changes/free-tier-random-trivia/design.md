# Design

## Context

See proposal.md for the reported error and approved scope. Latest fetched main is `59b3457` (merged PR #20). The local adapter selects one of four trivia topics before each request; its existing tests require those premium URLs. The earlier unarchived spec's category rule is superseded only for trivia by issue #21. No main specs exist yet.

## Goals / Non-Goals

**Goals:** Change the trivia URL and remove its topic list; keep the existing provider seam and UI untouched. Prove compatibility using fake streamed transport with synthetic credentials and unchanged network sentinels.

**Non-Goals:** No other route, production/default gate, UI, dependency, configuration, native project, image or birthday change. No credential/private env access, live provider request or OpenSpec archive.

## Decisions

- Use `/v1/trivia` without queries. API Ninjas handles randomness; no client topic choice, paid fallback, daily endpoint, retry or uniqueness filter is needed. Public provider documentation confirms category, limit and safe are premium-only.
- Keep quote randomization unchanged. Replace only obsolete trivia topic expectations and add a sequential-refresh regression accepting changed and repeated synthetic answers. Retain existing Show/Hide, answer reset, last-good failures, per-card isolation and production/mock tests.
- Update the runbook and add an architecture addendum; keep legacy architecture observations and historical OpenSpec intact. Explain the limited Free catalog and no guaranteed unique or filtered question.
- Run the full unchanged `npm run verify` with pinned Node22.23.4/npm10.9.9 in an external tracked-file copy excluding private env/native trees. Check source/scope/whitespace, policy fixtures, harness and strict OpenSpec. Native smoke is unnecessary for a URL-only JS fix and prohibited original-native mutations remain excluded.

## Risks / Trade-offs

- Limited Free catalog and unfiltered provider text can repeat or be unsuitable: document accurately; no new filtering behavior.
- Synthetic tests cannot establish live account entitlement or provider availability: report live acceptance NOT RUN.
- Gortex impact includes inferred/transitive edges and a lower-bound warning: use executable regressions and a bounded diff for acceptance.

## Migration Plan

No persisted-data or native migration. The owner can revert to deterministic mocks using the existing runbook; any code rollback is a reviewed Git revert. This task opens a draft PR only.
